export interface UserInterface {
  [x: string]: any;
  email: string,
  name: string,
  apiHash?: string,
  tables: Array<string>
  comparePassword(password: string): boolean
}
