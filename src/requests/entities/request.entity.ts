export class Request {
  id: number;

  request_id: number;

  posted_role_id: number;

  doc_id: number;
}
export class RequestDetails {
  id: number;

  request_id: number;

  next_role_id: number;

  status: number; //0 for pending
}

export class Logs {
  id: number;
  request_id: number;
  role_id: number;
}
