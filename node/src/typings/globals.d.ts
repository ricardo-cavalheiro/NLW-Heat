declare namespace Express {
  export interface Response {
    locals: {
      user_id: number;
    };
  }
}
