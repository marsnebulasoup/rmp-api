import { OldRatingInfo, NewRatingInfo } from './interfaces';
/* eslint-disable @typescript-eslint/ban-types */
import { NewDetailedProfessorSearch, NewProfessorSearch, NewSchoolSearch, OldDetailedProfessorSearch, OldProfessorSearch, OldSchoolSearch } from "./interfaces";
import sanitizeHtml from 'sanitize-html';
import fetch from "./fetch";

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
    catch (e) {
      console.error(e)
      console.error(JSON.stringify(resp, null, 4))
      return false
    }
  }

  async searchProfessors(query: string): Promise<NewProfessorSearch[] | false> {
    query = query.trim().replaceAll(',', ' ');
    const body = {
      "query": `query NewSearchTeachersQuery($query:TeacherSearchQuery!){newSearch{teachers(query:$query){edges{node{firstName lastName id legacyId department avgRatingRounded numRatings wouldTakeAgainPercentRounded avgDifficultyRounded school{id legacyId name}}}}}}`,
      "variables": {
        "query": {
          "text": query,
          "schoolID": this.schoolID
        }
      }
    }
    const resp = await this.#fetch(body) as OldProfessorSearch;
    try {
      const professors: NewProfessorSearch[] = [];
      for (const professor of resp.data.newSearch.teachers.edges) {
        professors.push({
          ...professor.node,
          ...await this.getProfessorRatingInfo(professor.node.id)
        })
      }
      return professors
    }
    catch (e) {
      console.error(e)
      console.error(JSON.stringify(resp, null, 4))
      return false
    }
  }

  async getProfessorRatingInfo(id: string): Promise<NewRatingInfo> {
    const body = {
      "query": `query RatingsListQuery($id:ID!){node(id:$id){... on Teacher{avgRatingRounded numRatings wouldTakeAgainPercentRounded avgDifficultyRounded}}}`,
      "variables": {
        "id": id
      }
    }
    const resp = await this.#fetch(body) as OldRatingInfo;
    try {
      const ratingInfo: NewRatingInfo = resp.data.node;
      return ratingInfo
    }
    catch (e) {
      console.error(e)
      console.error(JSON.stringify(resp, null, 4))
      return {
        avgRatingRounded: 0,
        numRatings: 0,
        wouldTakeAgainPercentRounded: 0,
        avgDifficultyRounded: 0
      }
    }
  }

  async getProfessorDetails(query: string, numReviews = 1): Promise<false | NewDetailedProfessorSearch[]> {
    query = query.trim().replaceAll(',', ' ');   
    numReviews = parseInt(String(numReviews));
    if (isNaN(numReviews)) numReviews = 1;

    const body = {
      "query": `query NewSearchTeachersQuery($query:TeacherSearchQuery!){newSearch{teachers(query:$query){edges{node{firstName lastName id legacyId department avgRatingRounded numRatings wouldTakeAgainPercentRounded avgDifficultyRounded ratings(first:${numReviews}){edges{node{qualityRating difficultyRatingRounded clarityRatingRounded class isForCredit helpfulRatingRounded attendanceMandatory isForOnlineClass iWouldTakeAgain grade id legacyId ratingTags textbookIsUsed comment thumbsUpTotal thumbsDownTotal date}}}school{id legacyId name}}}}}}`,
      "variables": {
        "query": {
          "text": query,
          "schoolID": this.schoolID
        }
      }
    }
    const resp = await this.#fetch(body) as OldDetailedProfessorSearch;
    try {
      const professors: NewDetailedProfessorSearch[] = [];
      for (const professor of resp.data.newSearch.teachers.edges) {
        const cleanProf: any = professor.node;
        cleanProf.ratings = professor.node.ratings.edges.map(rating => {
          rating.node.comment = sanitizeHtml(rating.node.comment, {
            allowedTags: false,
            allowedAttributes: false
          })
          return rating.node
        });
        professors.push({
          ...cleanProf,
          ...await this.getProfessorRatingInfo(professor.node.id)
        })
      }
      return professors
    }
    catch (e) {
      console.log(`${e}`)
      console.error(JSON.stringify(resp, null, 4))
      return false
    }
  }
}

