import request from 'supertest';
import app from '../server';  // Adjust the import path as needed

describe('Static Assets', () => {
  it('should respond with 200 for known static files', async () => {
    const res = await request(app).get('/path-to-your-static-asset.ext');  // Replace 'path-to-your-static-asset.ext' with the path to an actual static file you know exists, e.g., '/css/styles.css'

    expect(res.statusCode).toEqual(200);
  });
});
