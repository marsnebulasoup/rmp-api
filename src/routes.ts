import { Params } from './interfaces';
import { createResponse } from './misc';
import { RMP } from './rmp';

const DEBUG = true

export async function school(params: Params): Promise<Response> {
  const rmp = new RMP();
  const schools = await rmp.searchSchools(params.query)
  if (schools) return createResponse(schools, 200)
  else return createResponse([], 500, "Error searching for schools.")
}

export async function professor(params: Params): Promise<Response> {
  const rmp = new RMP(params.schoolID)
  const professors = await rmp.searchProfessors(params.query)
  if (professors) return createResponse(professors, 200)
  else return createResponse([], 500, "Error searching for professors.")
}

export async function professorDetails(params: Params): Promise<Response> {
  const rmp = new RMP(params.schoolID)
  const professors = await rmp.getProfessorDetails(params.query, params.numRatings)
  if (professors) return createResponse(professors, 200)
  else return createResponse([], 500, "Error searching for professor details.")
}