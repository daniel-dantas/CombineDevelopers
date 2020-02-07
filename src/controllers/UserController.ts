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
        return res.status(200).send(user)
      }).catch( err => {
        return res.status(404).send({message: 'User already registered'})
      })
      
    }else{
      return res.status(404).send({message: 'github not found'})
    }
  }

  static read = async(req: Request, res: Response) => {
    const users: UserType[] = await User.find() as UserType[]

    return res.status(200).send(users)

  }

  static delete = async(req: Request, res: Response) => {
    
    const github_username: string = req.body.github_username

    await User.deleteOne({login: github_username}).then( response => {
      return res.status(200).send({message: 'Excluded user'})
    }).catch( err => {
      return res.status(404).send({message: 'Not excluded user'})
    })
  }

  static update = async(req: Request, res: Response) => {
    const github_username: string = req.body.github_username

    const user: UserType = await GithubAPI.searchUser(github_username) as UserType

    if(user){
      await User.updateOne({login: github_username}, {
        login: user.login,
        avatar_url: user.avatar_url,
        repositories: user.repositories
      } as UserType).then(response => {

        if(response.n){
          return res.status(200).send({message: 'updated user'})
        }else{
          UserController.create(req, res)
        }

      }).catch( err => {
        UserController.create(req, res)
      })
    }else{
      return res.status(404).send({message: 'github not found'})
    }


  }

}

export default UserController