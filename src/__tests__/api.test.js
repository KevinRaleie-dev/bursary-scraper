const request = require('supertest');
const app = require('../main');

describe('GET /', () => {
  test('should respond with json object and 200 ok', async () => {
    const response = await request(app).get('/');
    expect(response.body).toEqual({hello: 'world'});
    expect(response.statusCode).toEqual(200);
  });
});

