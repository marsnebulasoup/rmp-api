import urlParse from 'url-parse';
import { createResponse } from "./misc";
import { Params } from "./interfaces";
import { professor, professorDetails, school } from "./routes";

const DEBUG = true;

export async function handleRequest(request: Request): Promise<Response> {
  try {
    const url = urlParse(request.url, true)
    const path = url.pathname.replaceAll('/', '').toLowerCase()
    const params: Params = url.query as unknown as Params

    switch(path) {
      case "school": {
        return school(params)
      }
      case "professor": {
        return professor(params)
      }
      case "professor-details": {
        return professorDetails(params)
      }
      default: {
        return createResponse([], 404, 'Route not found.')
      }
    }
    
  }
  catch (e: any) {
    console.error(e)
    return createResponse([], 500, DEBUG ? e : 'Error')
  }
}