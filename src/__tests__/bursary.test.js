const request = require('supertest');
const app = require('../main');

describe('POST /bursary', () => {
  test('should return a data object with bursaries keys', async () => {
    await request(app)
        .post('/bursaries')
        .send({month: 'september'})
        .set('Accept', 'application/json')
        .expect(200);
  });
});

