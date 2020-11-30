import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';

describe('Users GraphQL(e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a new user', () => {
    const mutationData = `{
      createUser(
        createUserInput:{
          firstname: "John",
          email: "john.doe@test.com",
          username: "john.doe@test.com",
          password: "password",
        }
      ) {
        id,
        firstname,
        lastname,
        email,
        username,
      }
    }`
    const response = mutation(mutationData);
    
  });

  afterEach(async () => {
    // select All users
    const queryData = `
      {
        users { id }
      }`;
    const response = query(queryData);  
    
    await app.close();
  });

  async function query(query: {}) {
    const response = await request(app.getHttpServer())
    .post('/admin')
    .send({
      operationName: null,
      variables: {},
      query: `
        ${query}
      `,
    })
    .expect(200);
    return response.body.data;
  } 

  async function mutation(mutation: {}) {
    const response = await request(app.getHttpServer())
    .post('/admin')
    .send({
      operationName: null,
      variables: {},
      mutation: `
        ${mutation}
      `,
    })
    .expect(200);
    return response.body.data;
  }
});
