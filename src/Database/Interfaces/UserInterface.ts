export interface UserInterface {
  email: string
  name: string,
  password: string,
  apiHash?: string,
  tables?: Array<string>
  comparePassword(password: string): boolean
}
