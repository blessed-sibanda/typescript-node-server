import request from 'supertest';
import app from '../src/app';

describe('App should work', () => {
  it('should return 200', async () => {
    let res = await request(app).get('/api/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({ message: 'Welcome to My-app' });
  });
});
