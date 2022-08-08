import { NewSchoolSearch } from './../src/interfaces';
import { handleRequest } from '../src/handler'
import makeServiceWorkerEnv from 'service-worker-mock'

declare const global: any

describe('handle school page', () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv())
    jest.resetModules()
  })

  test('blank school route', async () => {
    const result = await handleRequest(new Request('/school', { method: 'GET' }));
    expect(result.status).toEqual(200);
    const json = await result.json();

    expect(json).toEqual(
      expect.objectContaining<{
        status: boolean;
        data: NewSchoolSearch[];
        error: boolean | string;
      }>({
        status: true,
        data: expect.arrayContaining<NewSchoolSearch>([
          expect.objectContaining<NewSchoolSearch>({
            city: expect.any(String),
            id: expect.any(String),
            legacyId: expect.any(Number),
            name: expect.any(String),
            state: expect.any(String),
          })
        ]),
        error: false,
      }));
  })

  test('school route w/ query', async () => {
    const result = await handleRequest(new Request('/school?query=Austin%20Community%20College', { method: 'GET' }));
    expect(result.status).toEqual(200);
    const json = await result.json();

    expect(json).toEqual(
      expect.objectContaining<{
        status: boolean;
        data: NewSchoolSearch[];
        error: boolean | string;
      }>({
        status: true,
        data: expect.arrayContaining<NewSchoolSearch>([
          expect.objectContaining<NewSchoolSearch>({
            city: expect.any(String),
            id: expect.any(String),
            legacyId: expect.any(Number),
            name: expect.stringContaining('Austin Community College'),
            state: expect.any(String),
          })
        ]),
        error: false,
      }));
  })
})
