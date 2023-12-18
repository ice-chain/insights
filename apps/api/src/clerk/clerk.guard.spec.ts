import { INestApplication } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { Test } from "@nestjs/testing";
import * as request from 'supertest';
import { AppModule } from '../app/app.module';
import { AuthGuard } from './clerk.guard';
import * as cookieParser from 'cookie-parser';

jest.mock('@clerk/clerk-sdk-node', () => ({
  Clerk: () => {
    return {
      authenticateRequest: () => ({
        isSignedIn: true,
        toAuth: () => {}
      })
    };
  }
}));

function createTestModule(guard) {
  return Test.createTestingModule({
    imports: [AppModule],
    providers: [
      {
        provide: APP_GUARD,
        useValue: guard,
      }
    ],
  })
  .compile();
}

describe('Clerk guard', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await createTestModule(new AuthGuard());
    app = moduleRef
      .createNestApplication()
      .use(cookieParser());

    await app.init();
  });

  it(`should prevent access (unauthorized)`, async () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(401);
  });

  it(`should allow access (authorized)`, async () => {
    return request(app.getHttpServer())
      .get('/')
      .set('Cookie', '__session=12345')
      .expect(200);
  });
});