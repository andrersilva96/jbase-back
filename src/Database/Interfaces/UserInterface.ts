export interface UserInterface {
  [x: string]: any;
  email: string,
  name: string,
  apiToken?: string,
  tables: Array<string>
  comparePassword(password: string): boolean
}
