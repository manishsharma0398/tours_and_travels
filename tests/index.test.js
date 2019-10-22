const request = require('supertest');
const app = require('../app');

describe('Index endpoint', () => {
  it('should show some content', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBe('Hi, Index is working fine.')
  })
  it('should show status 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  })
})