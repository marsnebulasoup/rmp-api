import { handleRequest } from '../src/handler'
import makeServiceWorkerEnv from 'service-worker-mock'

declare const global: any

describe('handle main page', () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv())
    jest.resetModules()
  })

  test('home route', async () => {
    const result = await handleRequest(new Request('/', { method: 'GET' }));
    expect(result.status).toEqual(404);
    const json = await result.json();
    expect(
      json
    ).toEqual(
      {
        "status": false,
        "data": [],
        "error": "Route not found."
      }
    );
  })
})
