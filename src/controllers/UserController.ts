import { Request, Response } from 'express'
import GithubAPI from '../services/GithubAPI'
import User, {UserType} from '../models/User'

class UserController {
  static create = async(req: Request, res: Response) => {
  
    const github_username: string = req.body.github_username
  
    const userResponse: UserType = await GithubAPI.searchUser(github_username) as UserType
  
    if(userResponse){
      await User.create({
        login: userResponse.login,
        avatar_url: userResponse.avatar_url,
        repositories: userResponse.repositories
      } as UserType).then((user) => {
        return res.send(user)
      }).catch( err => {
        return res.send({status: 'failed'})
      })
    }else{
      return res.send({status: 'github not found'})
    }
  }

  static read = async(req: Request, res: Response) => {
    const users: UserType[] = await User.find() as UserType[]

    return res.send(users)

  }

}

export default UserController