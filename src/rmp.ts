/* eslint-disable @typescript-eslint/ban-types */
import { NewDetailedProfessorSearch, NewProfessorSearch, NewSchoolSearch, OldDetailedProfessorSearch, OldProfessorSearch, OldSchoolSearch } from "./interfaces";
import sanitizeHtml from 'sanitize-html';

export class RMP {
  schoolID?: string;
  constructor(schoolID?: string) {
    this.schoolID = schoolID
  }

  async #fetch(body: Record<string, unknown>): Promise<object> {
    const resp = await fetch("https://www.ratemyprofessors.com/graphql", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "authorization": "Basic dGVzdDp0ZXN0",
        "content-type": "application/json",
      },
      "body": JSON.stringify(body),
      "method": "POST",
      // "mode": "cors",
      // "credentials": "include"
    })

    const json = await resp.json() as object;
    return json
  }

  async searchSchools(query: string): Promise<NewSchoolSearch[] | false> {
    const body = {
      "query": `query NewSearchSchoolsQuery($query:SchoolSearchQuery!){newSearch{schools(query:$query){edges{node{id legacyId name city state}}}}}`,
      "variables": {
        "query": {
          "text": query
        }
      }
    }
    const resp = await this.#fetch(body) as OldSchoolSearch;
    try {
      const schools: NewSchoolSearch[] = resp.data.newSearch.schools.edges.map((school) => school.node)
      return schools
    }
    catch(e) {
      console.error(e)
      return false
    }
  }

  async searchProfessors(query: string): Promise<NewProfessorSearch[] | false> {
    const body = {
      "query": `query NewSearchTeachersQuery($query:TeacherSearchQuery!){newSearch{teachers(query:$query){edges{node{firstName lastName id legacyId department avgRatingRounded numRatings school{id legacyId name}}}}}}`,
      "variables": {
        "query": {
          "text": query,
          "schoolID": this.schoolID
        }
      }
    }
    const resp = await this.#fetch(body) as OldProfessorSearch;
    try {
      const professors: NewProfessorSearch[] = resp.data.newSearch.teachers.edges.map((professor) => professor.node)
      return professors
    }
    catch(e) {
      console.error(e)
      return false
    }
  }

  async getProfessorDetails(query: string): Promise<false | NewDetailedProfessorSearch[]> {
    const body = {
      "query": `query NewSearchTeachersQuery($query:TeacherSearchQuery!){newSearch{teachers(query:$query){edges{node{avgDifficulty avgDifficultyRounded avgRatingRounded department firstName id lastName legacyId numRatings ratings{edges{node{attendanceMandatory clarityRatingRounded class comment courseType createdByUser date difficultyRatingRounded flagStatus grade helpfulRatingRounded iWouldTakeAgain id isForCredit isForOnlineClass legacyId qualityRating ratingTags textbookIsUsed thumbsDownTotal thumbsUpTotal}}}school{avgRatingRounded city id legacyId name}wouldTakeAgainCount wouldTakeAgainPercentRounded}}resultCount}}}`,
      "variables": {
        "query": {
          "text": query,
          "schoolID": this.schoolID
        }
      }
    }
    const resp = await this.#fetch(body) as OldDetailedProfessorSearch;
    try {
      const professors: NewDetailedProfessorSearch[] = resp.data.newSearch.teachers.edges.map((professor) => {
        const prof: any = professor.node;
        prof.ratings = professor.node.ratings.edges.map(rating => {
          rating.node.comment = sanitizeHtml(rating.node.comment, {
            allowedTags: false,
            allowedAttributes: false
          })
          return rating.node
        })
        return prof
      })
      return professors
    }
    catch(e) {
      console.log(`${e}`)
      return false
    }
  }
}

