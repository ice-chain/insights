import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateInstagramDto } from './dto/create-instagram.dto';
import { decrypt, encrypt } from 'lib/enctypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { FacebookAdsApi, IGUser, InstagramInsightsResult } from 'facebook-nodejs-business-sdk';

enum InstagramInsightsMetrics {
  impressions = 'impressions',
  reach = 'reach',
  follower_count = 'follower_count',
  email_contacts = 'email_contacts',
  phone_call_clicks = 'phone_call_clicks',
  text_message_clicks = 'text_message_clicks',
  get_directions_clicks = 'get_directions_clicks',
  website_clicks = 'website_clicks',
  profile_views = 'profile_views',
  audience_gender_age = 'audience_gender_age',
  audience_locale = 'audience_locale',
  audience_country = 'audience_country',
  audience_city = 'audience_city',
  online_followers = 'online_followers',
  accounts_engaged = 'accounts_engaged',
  total_interactions = 'total_interactions',
  likes = 'likes',
  comments = 'comments',
  shares = 'shares',
  saves = 'saves',
  replies = 'replies',
  engaged_audience_demographics = 'engaged_audience_demographics',
  reached_audience_demographics = 'reached_audience_demographics',
  follower_demographics = 'follower_demographics',
  follows_and_unfollows = 'follows_and_unfollows',
  profile_links_taps = 'profile_links_taps',
}

type InstagramInsightsDto = { period: { since: number, until: number }, userId:string, id:string };

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

  private

  private checkPermissions(accountUserId: string, currentUserId: string) {
    if(accountUserId !== currentUserId) {
      throw new ForbiddenException();
    }

    return true;
  }

  private async getAccountData(id: string) {
    const account = await this.prisma.socialAccount.findUnique({
      where: { id },
      select : {
        token: true,
        userId: true,
      }
    });

    const token = decrypt(account.token, this.CIPHER_KEY);

    return {
      token,
      userId: account.userId,
    };
  }


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

  async findInsightsOverview({ period, userId, id }: InstagramInsightsDto) {
    const accountData = await this.getAccountData(id);

    this.checkPermissions(accountData.userId, userId);

    FacebookAdsApi.init(accountData.token);

    const insightsCursor = await new IGUser(id).getInsights(
      [
        InstagramInsightsResult.Fields.name,
        InstagramInsightsResult.Fields.title,
        InstagramInsightsResult.Fields.description,
        InstagramInsightsResult.Fields.total_value,
      ],
      {
          metric: [
            InstagramInsightsMetrics.reach,
            InstagramInsightsMetrics.impressions,
            InstagramInsightsMetrics.profile_views,
            InstagramInsightsMetrics.accounts_engaged,
          ],
          since: period.since,
          until: period.until,
          period: InstagramInsightsResult.Period.day,
          metric_type: InstagramInsightsResult.MetricType.total_value,
      }
    );

    const result = insightsCursor.map(metric => {
      return {
        id: metric.id,
        name: metric.name,
        description: metric.description,
        title: metric.title,
        totalValue: metric.total_value.value,
      };
    });

    const previous = await insightsCursor.previous();

    const grouped = previous.reduce((res, metric) => ({...res, [metric.id]: metric._data}) , {});

    return result.map(metric => {
      return {
        ...metric,
        diff: Number((
          (metric.totalValue / grouped[metric.id].total_value.value) - 1
        ).toFixed(4)),
      };
    });
  }

  async findInsightsFollowersOnline({ period, userId, id }: InstagramInsightsDto) {
    const accountData = await this.getAccountData(id);

    this.checkPermissions(accountData.userId, userId);

    FacebookAdsApi.init(accountData.token);

    const [onlineFollowerRes] = await new IGUser(id).getInsights(
      [
        InstagramInsightsResult.Fields.name,
        InstagramInsightsResult.Fields.title,
        InstagramInsightsResult.Fields.description,
        InstagramInsightsResult.Fields.values,
      ],
      {
        metric: [
          InstagramInsightsMetrics.online_followers,
        ],
        since: period.since,
        until: period.until,
        period: InstagramInsightsResult.Period.lifetime,
      }
    );

    return {
      id: onlineFollowerRes.id,
      name: onlineFollowerRes.name,
      description: onlineFollowerRes.description,
      title: onlineFollowerRes.title,
      values: onlineFollowerRes.values,
    }
  }
}
