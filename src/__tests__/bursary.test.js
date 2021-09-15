const request = require('supertest');
const app = require('../main');

describe('POST /bursary', () => {
  test('should return a 200 OK response.', async () => {
    await request(app)
        .post('/bursaries')
        .send({month: 'september'})
        .set('Accept', 'application/json')
        .expect(200);
  }, 7000);
});

