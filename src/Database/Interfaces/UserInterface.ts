export interface UserInterface {
  email: string
  name: string,
  password: string,
  comparePassword(password: string): boolean
}
