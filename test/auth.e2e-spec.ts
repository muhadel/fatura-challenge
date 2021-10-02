import 'dotenv/config';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DatabaseService } from '../src/modules/database/database.service';
import { usersStub } from '../src/seeders/stubs/user.stub';
import { config } from '../src/config/app.config';
import { user } from './stubs/user.stub';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let dbConnection: Connection;
  let httpServer: any;
  //   let userAccessToken: string;
  //   let channelId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    httpServer = app.getHttpServer();
    // Rest collection
    // await dbConnection.collection('users').deleteMany({});
    // // Create verified user
    // await dbConnection.collection('users').insertOne({
    //   ...verifiedUser,
    //   password: bcrypt.hashSync(
    //     verifiedUser.password,
    //     bcrypt.genSaltSync(config.salt),
    //   ),
    // });
  });

  afterAll(async () => {
    // await dbConnection.collection('users').deleteMany({});
    // await dbConnection.collection('verificationcodes').deleteMany({});
    // await dbConnection.collection('checkers').deleteMany({});
    await app.close();
    await dbConnection.close();
  });

  describe('/api/auth/signup (POST)', () => {
    it('Sould create a new user', async () => {
      return request(httpServer)
        .post('/auth/signup')
        .send(user)
        .expect(({ body }) => {
          expect(body.message).toBeDefined();
          expect(body.data.name).toEqual(user.name);
          expect(body.data.username).toEqual(user.username);
        })
        .expect(HttpStatus.CREATED);
    });
  });

  describe('/api/auth/signin (POST)', () => {
    it('Sould Return invalid credenitals as user password is not correct', async () => {
      return request(httpServer)
        .post('/auth/signin')
        .send({
          username: user.username,
          password: 'WrongP@ssw0rdHere',
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('/api/auth/signin (POST)', () => {
    it('Sould Authenticate and return accessToken and tokenType', () => {
      return request(httpServer)
        .post('/auth/signin')
        .send({ username: user.username, password: user.password })
        .expect(({ body }) => {
          expect(body.tokenType).toBeDefined();
          expect(body.accessToken).toBeDefined();
        })
        .expect(HttpStatus.CREATED);
    });
  });

  describe('/api/auth/revoke-token (POST)', () => {
    it('Sould revoke token', async () => {
      const { username, plainTextPassword } = usersStub[0];
      const { body } = await request(httpServer)
        .post('/auth/signin')
        .send({ username, password: plainTextPassword });
      const { tokenType, accessToken } = body;
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTg2MWE5ZDEzOTFjOTczMDFhNTk4ZiIsIm5hbWUiOiJzeXN1c2VyIiwidXNlcm5hbWUiOiJzeXN1c2VyIiwiaWF0IjoxNjMzMTgyMTMwLCJleHAiOjE2MzMyNjg1MzB9.etaIpERldYFXUMLgAftLvvWz9CMwTwTrIGd_sFPD3IA';
      return request(httpServer)
        .post('/auth/revoke-token')
        .send({ token })
        .set('Authorization', `${tokenType} ${accessToken}`)
        .expect(({ body }) => {
          expect(body.message).toBeDefined();
          expect(body.data.token).toEqual(token);
          expect(body.data.expireIn).toBeDefined();
          expect(body.data.user).toBeDefined();
          expect(body.data.createdAt).toBeDefined();
          expect(body.data.updatedAt).toBeDefined();
        })
        .expect(HttpStatus.CREATED);
    });
  });
});
