import { Injectable } from '@nestjs/common';
import { CreateInstagramDto } from './dto/create-instagram.dto';
import { UpdateInstagramDto } from './dto/update-instagram.dto';
import { decrypt, encrypt } from 'lib/enctypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { FacebookAdsApi, IGUser } from 'facebook-nodejs-business-sdk';

type FacebookAccount = {
  data: {
      instagram_business_account?: {
        id: string;
      }
  }[]
};

type IGUserData = {
  id: string;
  name: string;
  username: string;
  profile_picture_url: string;
  followers_count: string;
  follows_count: string;
  media_count: string;
}


@Injectable()
export class InstagramService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) {}

  private CIPHER_KEY = process.env.CIPHER_KEY || '';
  private FB_APP_ID = process.env.FB_APP_ID || '';
  private FB_APP_SECRET = process.env.FB_APP_SECRET || '';


  private async getLongLivedToken(shortTermToken: string) {
    const requestUrl = new URL('https://graph.facebook.com/v18.0/oauth/access_token');

    requestUrl.searchParams.append('grant_type', 'fb_exchange_token');
    requestUrl.searchParams.append('fb_exchange_token', shortTermToken);
    requestUrl.searchParams.append('client_id', this.FB_APP_ID || '');
    requestUrl.searchParams.append('client_secret', this.FB_APP_SECRET || '');

    try {
      const result = await fetch(requestUrl.toString());

      const json = await result.json();

      if (json.error) {
        throw json.error;
      }

      const { access_token, expires_in } = json;

      return { access_token, expires_in };
    } catch (error) {
      throw error;
    }
  }

  async create(createInstagramDto: CreateInstagramDto) {
    const { token, userId } = createInstagramDto;

    const { access_token, expires_in } = await this.getLongLivedToken(token);

    const requestUrl = new URL('https://graph.facebook.com/v18.0/me/accounts');

    requestUrl.searchParams.append('fields', 'instagram_business_account');
    requestUrl.searchParams.append('access_token', access_token);

    try {
      const result = await fetch(requestUrl.toString());

      const json =  await result.json();

      if (json.error) {
          throw json.error;
      }

      const { data }: FacebookAccount = json;

      const instagramAccounts = data
        .reduce(
            (res, { instagram_business_account }) => instagram_business_account ? [...res, instagram_business_account] : res,
            [] as { id: string }[]
        );

      // this.userService.update
      await this.prisma.user.update({
          where: { id: userId },
          data: {
              socialAccounts: {
                  create: instagramAccounts.map(acc => {
                      return {
                          id: acc.id,
                          provider: 'instagram',
                          token: encrypt(access_token, this.CIPHER_KEY),
                          tokenExpires: expires_in || 5183944,
                      };
                  })
              }
          }
      });

      return instagramAccounts;
    } catch (error) {
        throw error;
    }
  }

  async findAll(userId: string) {
    const accounts = await this.prisma.socialAccount.findMany({
      where: { userId },
      select : {
        id: true,
      }
    })

    return Promise.all(
      accounts.map(({ id }) => this.findOne(id))
    );
  }


  async findOne(id: string) {
    const account = await this.prisma.socialAccount.findUnique({
      where: { id },
      select : {
        token: true,
      }
    });

    const token = decrypt(account.token, this.CIPHER_KEY);

    FacebookAdsApi.init(token);

    const result = await new IGUser(id).get([
      IGUser.Fields.id,
      IGUser.Fields.name,
      IGUser.Fields.username,
      IGUser.Fields.profile_picture_url,
      IGUser.Fields.followers_count,
      IGUser.Fields.follows_count,
      IGUser.Fields.media_count,
    ]) as unknown as IGUserData;

    return {
      provider: 'instagram',
      id: result.id,
      name: result.name,
      username: result.username,
      pictureUrl: result.profile_picture_url,
      posts: result.media_count,
      follows: result.follows_count,
      followers: result.followers_count,
    };
  }

  update(id: number, updateInstagramDto: UpdateInstagramDto) {
    return `This action updates a #${id} instagram`;
  }

  remove(id: number) {
    return `This action removes a #${id} instagram`;
  }
}
