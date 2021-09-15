const request = require('supertest');
const app = require('../main');

describe('GET /bursary', () => {
  test('should return a 200 OK response.', async () => {
    const exampleText = 'Bursaries that are closing in September';
    await request(app)
        .get(`/bursaries/?searchText=${exampleText}`)
        .set('Accept', 'application/json')
        .expect(200);
  }, 10000);
});

