type code = 100 | 101 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 426 | 500 | 501 | 502 | 503 | 504 | 505 | 102 | 207 | 226 | 308 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 506 | 507 | 511;
const codes = { 100: 'Continue', 101: 'Switching Protocols', 102: 'Processing', 200: 'OK', 201: 'Created', 202: 'Accepted', 203: 'Non-Authoritative Information', 204: 'No Content', 205: 'Reset Content', 206: 'Partial Content', 207: 'Multi-Status', 226: 'IM Used', 300: 'Multiple Choices', 301: 'Moved Permanently', 302: 'Found', 303: 'See Other', 304: 'Not Modified', 305: 'Use Proxy', 307: 'Temporary Redirect', 308: 'Permanent Redirect', 400: 'Bad Request', 401: 'Unauthorized', 402: 'Payment Required', 403: 'Forbidden', 404: 'Not Found', 405: 'Method Not Allowed', 406: 'Not Acceptable', 407: 'Proxy Authentication Required', 408: 'Request Timeout', 409: 'Conflict', 410: 'Gone', 411: 'Length Required', 412: 'Precondition Failed', 413: 'Payload Too Large', 414: 'URI Too Long', 415: 'Unsupported Media Type', 416: 'Range Not Satisfiable', 417: 'Expectation Failed', 418: "I'm a teapot", 422: 'Unprocessable Entity', 423: 'Locked', 424: 'Failed Dependency', 426: 'Upgrade Required', 428: 'Precondition Required', 429: 'Too Many Requests', 431: 'Request Header Fields Too Large', 451: 'Unavailable For Legal Reasons', 500: 'Internal Server Error', 501: 'Not Implemented', 502: 'Bad Gateway', 503: 'Service Unavailable', 504: 'Gateway Time-out', 505: 'HTTP Version Not Supported', 506: 'Variant Also Negotiates', 507: 'Insufficient Storage', 511: 'Network Authentication Required' }

const DEBUG = true;

export function createResponse(response: any[] = [], statusCode: code = 200, error?: string): Response {
  return new Response(
    JSON.stringify({
      status: statusCode === 200,
      data: response,
      error: error || false
    }, null, DEBUG && 2),
    {
      status: statusCode,
      statusText: codes[statusCode],
      headers: {
        "Content-Type": "text/json",
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Origin': 'https://selfservice.austincc.edu', // 'chrome-extension://mcoocjgnophphekdkhpggfjhfddnpgde',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })
}