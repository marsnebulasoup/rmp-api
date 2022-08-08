/// <reference types="jest-extended" />
import { NewDetailedProfessorSearch, Rating } from '../src/interfaces';
import { handleRequest } from '../src/handler'
import makeServiceWorkerEnv from 'service-worker-mock'

declare const global: any

describe('handle professor details page', () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv())
    jest.resetModules()
  })

  test('blank professor route', async () => {
    const result = await handleRequest(new Request('/professor-details', { method: 'GET' }));
    expect(result.status).toEqual(200);
    const json = await result.json();

    expect(json).toEqual(
      expect.objectContaining<{
        status: boolean;
        data: NewDetailedProfessorSearch[];
        error: boolean | string;
      }>({
        status: true,
        data: expect.arrayContaining<NewDetailedProfessorSearch>([
          expect.objectContaining<NewDetailedProfessorSearch>({
            avgDifficultyRounded: expect.any(Number),
            avgRatingRounded: expect.any(Number),
            department: expect.any(String),
            firstName: expect.any(String),
            id: expect.any(String),
            lastName: expect.any(String),
            legacyId: expect.any(Number),
            ratings: expect.arrayContaining<Rating>([
              expect.objectContaining<Rating>({
                attendanceMandatory: expect.toBeOneOf(["", "mandatory", "non mandatory"]) as unknown as "" | "mandatory" | "non mandatory",
                clarityRatingRounded: expect.any(Number),
                class: expect.any(String),
                comment: expect.any(String),
                // courseType: string
                date: expect.any(String),
                difficultyRatingRounded: expect.any(Number),
                // flagStatus: "FLAGGED" | "UNFLAGGED"
                grade: expect.any(String),
                helpfulRatingRounded: expect.any(Number),
                iWouldTakeAgain: expect.toBeOneOf([null, true, false]) as unknown as null | boolean,
                id: expect.any(String),
                isForOnlineClass: expect.toBeOneOf([true, false]) as unknown as boolean,
                legacyId: expect.any(Number),
                qualityRating: expect.any(Number),
                ratingTags: expect.any(String),
                textbookIsUsed: expect.toBeOneOf([true, false]) as unknown as boolean,
                thumbsDownTotal: expect.any(Number),
                thumbsUpTotal: expect.any(Number),
              })
            ]),
            school: {
              // avgRatingRounded: number
              // city: string
              id: expect.any(String),
              legacyId: expect.any(Number),
              name: expect.any(String),
            },
            // wouldTakeAgainCount: number
            wouldTakeAgainPercentRounded: expect.any(Number),
          })
        ]),
        error: false,
      }));
  })

  test('professor details route w/ query', async () => {
    const result = await handleRequest(new Request('/professor-details?schoolID=U2Nob29sLTE3MDQ=&query=Kristopher%20Marcus', { method: 'GET' }));
    expect(result.status).toEqual(200);
    const json = await result.json();

    expect(json).toEqual(
      expect.objectContaining<{
        status: boolean;
        data: NewDetailedProfessorSearch[];
        error: boolean | string;
      }>({
        status: true,
        data: expect.arrayContaining<NewDetailedProfessorSearch>([
          expect.objectContaining<NewDetailedProfessorSearch>({
            avgDifficultyRounded: expect.any(Number),
            avgRatingRounded: expect.any(Number),
            department: expect.any(String),
            firstName: expect.any(String), //expect.stringContaining("Kristopher"),
            id: expect.any(String),
            lastName: expect.any(String), //expect.stringContaining("Marcus"),
            legacyId: expect.any(Number),
            ratings: expect.arrayContaining<Rating>([
              expect.objectContaining<Rating>({
                attendanceMandatory: expect.toBeOneOf(["", "mandatory", "non mandatory"]) as unknown as "" | "mandatory" | "non mandatory",
                clarityRatingRounded: expect.any(Number),
                class: expect.any(String),
                comment: expect.any(String),
                // courseType: string
                date: expect.any(String),
                difficultyRatingRounded: expect.any(Number),
                // flagStatus: "FLAGGED" | "UNFLAGGED"
                grade: expect.any(String),
                helpfulRatingRounded: expect.any(Number),
                iWouldTakeAgain: expect.toBeOneOf([null, true, false]) as unknown as null | boolean,
                id: expect.any(String),
                isForOnlineClass: expect.toBeOneOf([true, false]) as unknown as boolean,
                legacyId: expect.any(Number),
                qualityRating: expect.any(Number),
                ratingTags: expect.any(String),
                textbookIsUsed: expect.toBeOneOf([true, false]) as unknown as boolean,
                thumbsDownTotal: expect.any(Number),
                thumbsUpTotal: expect.any(Number),
              })
            ]),
            school: {
              // avgRatingRounded: number
              // city: string
              id: expect.any(String),
              legacyId: expect.any(Number),
              name: expect.any(String),
            },
            // wouldTakeAgainCount: number
            wouldTakeAgainPercentRounded: expect.any(Number),
          })
        ]),
        error: false,
      }));
  })
})
