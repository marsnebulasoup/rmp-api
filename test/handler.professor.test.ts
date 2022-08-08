import { NewProfessorSearch } from './../src/interfaces';
import { handleRequest } from '../src/handler'
import makeServiceWorkerEnv from 'service-worker-mock'

declare const global: any

describe('handle professor page', () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv())
    jest.resetModules()
  })

  test('blank professor route', async () => {
    const result = await handleRequest(new Request('/professor', { method: 'GET' }));
    expect(result.status).toEqual(200);
    const json = await result.json();

    expect(json).toEqual(
      expect.objectContaining<{
        status: boolean;
        data: NewProfessorSearch[];
        error: boolean | string;
      }>({
        status: true,
        data: expect.arrayContaining<NewProfessorSearch>([
          expect.objectContaining<NewProfessorSearch>({
            id: expect.any(String),
            legacyId: expect.any(Number),
            firstName: expect.any(String),
            lastName: expect.any(String),
            avgRatingRounded: expect.any(Number),
            numRatings: expect.any(Number),
            wouldTakeAgainPercentRounded: expect.any(Number),
            avgDifficultyRounded: expect.any(Number),
            school: {
              name: expect.any(String),
              legacyId: expect.any(Number),
              id: expect.any(String),
            },
            department: expect.any(String),
          })
        ]),
        error: false,
      }));
  })

  test('professor route w/ query', async () => {
    const result = await handleRequest(new Request('/professor?schoolID=U2Nob29sLTE3MDQ=&query=Kristopher%20Marcus', { method: 'GET' }));
    expect(result.status).toEqual(200);
    const json = await result.json();

    expect(json).toEqual(
      expect.objectContaining<{
        status: boolean;
        data: NewProfessorSearch[];
        error: boolean | string;
      }>({
        status: true,
        data: expect.arrayContaining<NewProfessorSearch>([
          expect.objectContaining<NewProfessorSearch>({
            id: expect.any(String),
            legacyId: expect.any(Number),
            firstName: expect.stringContaining("Kristopher"),
            lastName: expect.stringContaining("Marcus"),
            avgRatingRounded: expect.any(Number),
            numRatings: expect.any(Number),
            wouldTakeAgainPercentRounded: expect.any(Number),
            avgDifficultyRounded: expect.any(Number),
            school: {
              name: expect.any(String),
              legacyId: expect.any(Number),
              id: expect.any(String),
            },
            department: expect.any(String),
          })
        ]),
        error: false,
      }));
  })
})
