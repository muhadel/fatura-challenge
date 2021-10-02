import 'dotenv/config';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DatabaseService } from '../src/modules/database/database.service';
import { usersStub } from '../src/seeders/stubs/user.stub';
import { config } from '../src/config/app.config';
import { role } from './stubs/role.stub';
import { authenticate } from 'passport';

describe('RoleController (e2e)', () => {
  let app: INestApplication;
  let dbConnection: Connection;
  let httpServer: any;
  let authToken: string;

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
  });

  afterAll(async () => {
    await app.close();
    await dbConnection.close();
  });

  beforeEach(async () => {
    const { username, plainTextPassword } = usersStub[0];
    const { body } = await request(httpServer)
      .post('/auth/signin')
      .send({ username, password: plainTextPassword });
    const { tokenType, accessToken } = body;
    authToken = `${tokenType} ${accessToken}`;
  });

  describe('/api/role (POST)', () => {
    it('Sould create a new role', async () => {
      return request(httpServer)
        .post('/role')
        .send(role)
        .set('Authorization', authToken)
        .expect(({ body }) => {
          expect(body.message).toBeDefined();
          expect(body.data.name).toEqual(role.name);
          expect(body.data.resource).toEqual(role.resource);
          expect(body.data.actions).toEqual(role.actions);
        })
        .expect(HttpStatus.CREATED);
    });
  });

  describe('/api/role (GET)', () => {
    it('Sould return all roles', async () => {
      return (
        request(httpServer)
          .get('/role')
          .send(role)
          .set('Authorization', authToken)
          // .expect(({ body }) => {
          //   expect(body.message).toBeDefined();
          //   expect(body.data.name).toEqual(role.name);
          //   expect(body.data.resource).toEqual(role.resource);
          //   expect(body.data.actions).toEqual(role.actions);
          // })
          .expect(HttpStatus.OK)
      );
    });
  });
});
