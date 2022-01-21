export interface OldSchoolSearch {
  data: {
    newSearch: {
      schools: {
        edges: [
          {
            node: {
              city: string;
              id: string;
              legacyId: number;
              name: string;
              state: string;
            }
          }
        ]
      }
    }
  }
}

export interface NewSchoolSearch {
  city: string;
  id: string;
  legacyId: number;
  name: string;
  state: string;
}

export interface OldProfessorSearch {
  data: {
    newSearch: {
      teachers: {
        edges: [
          {
            node: {
              id: string;
              legacyId: number;
              firstName: string;
              lastName: string;
              school: {
                name: string
                id: string
                legacyId: number
              }
              department: string
            }
          }
        ]
      }
    }
  }
}

export interface OldDetailedProfessorSearch {
  data: {
    newSearch: {
      teachers: {
        edges: [
          {
            node: {
              // avgDifficulty: number
              avgDifficultyRounded: number
              avgRatingRounded: number
              department: string
              firstName: string
              id: string
              lastName: string
              legacyId: number
              ratings: {
                edges: [
                  {
                    node: {
                      attendanceMandatory: "" | "mandatory" | "non mandatory"
                      clarityRatingRounded: number
                      class: string
                      comment: string
                      // courseType: string
                      date: string
                      difficultyRatingRounded: number
                      // flagStatus: "FLAGGED" | "UNFLAGGED"
                      grade: string
                      helpfulRatingRounded: string
                      iWouldTakeAgain: null | boolean
                      id: string
                      isForOnlineClass: boolean
                      legacyId: number
                      qualityRating: number
                      ratingTags: string
                      textbookIsUsed: boolean
                      thumbsDownTotal: number
                      thumbsUpTotal: number
                    }
                  }
                ]
              }
              school: {
                // avgRatingRounded: number
                // city: string
                id: string
                legacyId: number
                name: string
              }
              // wouldTakeAgainCount: number
              wouldTakeAgainPercentRounded: number
            }
          }
        ]
      }
    }
  }
}

export interface NewProfessorSearch {
  id: string;
  legacyId: number;
  firstName: string;
  lastName: string;
  school: {
    name: string;
    legacyId: number;
    id: string;
  }
  department: string
}

export interface NewDetailedProfessorSearch {
  // avgDifficulty: number
  avgDifficultyRounded: number
  avgRatingRounded: number
  department: string
  firstName: string
  id: string
  lastName: string
  legacyId: number
  ratings: [
    {
      attendanceMandatory: "" | "mandatory" | "non mandatory"
      clarityRatingRounded: number
      class: string
      comment: string
      // courseType: string
      date: string
      difficultyRatingRounded: number
      // flagStatus: "FLAGGED" | "UNFLAGGED"
      grade: string
      helpfulRatingRounded: string
      iWouldTakeAgain: null | boolean
      id: string
      isForOnlineClass: boolean
      legacyId: number
      qualityRating: number
      ratingTags: string
      textbookIsUsed: boolean
      thumbsDownTotal: number
      thumbsUpTotal: number
    }
  ]
  school: {
    // avgRatingRounded: number
    // city: string
    id: string
    legacyId: number
    name: string
  }
  // wouldTakeAgainCount: number
  wouldTakeAgainPercentRounded: number
}

export interface Params {
  schoolID?: string;
  query: string;
}