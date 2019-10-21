export interface UserInterface {
  email: string
  name: string,
  password: string,
  tables?: Array<string>
  comparePassword(password: string): boolean
}
