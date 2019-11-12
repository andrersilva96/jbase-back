import { User } from '../Database/Schemas/User'
import { UserInterface } from '../Database/Interfaces/UserInterface'

export abstract class UserService {
  public static async create (data:any) :Promise<UserInterface> {
    let user = await User.findOne({ email: data.email })
    if (!user) {
      user = await User.create({
        name: data.name,
        email: data.email,
      })
    }
    return user
  }
}
