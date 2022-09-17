export interface IUser {
  uid: string | null;
  displayName: string;
  loading?: boolean;
  error?: string;
}

export class User {
  constructor(public uid: string | null, public displayName: string) {}
}
