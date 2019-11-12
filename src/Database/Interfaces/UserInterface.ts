export interface UserInterface {
  id: string,
  email: string
  name: string,
  // password: string,
  apiHash?: string,
  tables?: Array<string>
  comparePassword(password: string): boolean
}
