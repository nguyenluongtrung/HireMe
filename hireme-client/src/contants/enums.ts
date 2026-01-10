export enum ServerStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  ALREADY_EXISTS = 409,
  UNPROCESSABLE_ENTITY = 422,
  LOCKED = 423,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}

export enum SessionStatus {
  LOADING = "loading",
  AUTHENTICATED = "authenticated",
  UNAUTHENTICATED = "unauthenticated",
}

export enum ModalMode {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}

export enum ApplicationStatus {
  PENDING = "PENDING",
  APPLIED = "APPLIED",
  INTERVIEWED = "INTERVIEWED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}
