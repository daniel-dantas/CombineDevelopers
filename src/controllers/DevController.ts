import { Request, Response } from 'express'
import GithubAPI from '../services/GithubAPI'
import Dev, {DevType} from '../models/Dev'

class UserController {
  static create = async(req: Request, res: Response) => {
  
    const github_username: string = req.body.github_username
  
    const userResponse: DevType = await GithubAPI.searchUser(github_username) as DevType
  
    if(userResponse){
      await Dev.create(userResponse).then((user) => {
        return res.status(200).send(user)
      }).catch( err => {
        return res.status(404).send({message: 'User already registered'})
      })
      
    }else{
      return res.status(404).send({message: 'github not found'})
    }
  }

  static read = async(req: Request, res: Response) => {
    let users: DevType[] = await Dev.find() as DevType[]

    users = users.map((user)=> {
      return {
        login: user.login,
        avatar_url: user.avatar_url,
        blog: user.blog,
        bio: user.bio,
        mainLanguages: user.mainLanguages,
      } as DevType
    })

    return res.status(200).send(users)

  }

  static delete = async(req: Request, res: Response) => {
    
    const github_username: string = req.body.github_username

    await Dev.deleteOne({login: github_username}).then( response => {
      return res.status(200).send({message: 'Excluded user'})
    }).catch( err => {
      return res.status(404).send({message: 'Not excluded user'})
    })
  }

  static update = async(req: Request, res: Response) => {
    const github_username: string = req.body.github_username

    const user: DevType = await GithubAPI.searchUser(github_username) as DevType

    if(user){

      await Dev.updateOne({login: github_username}, user).then(response => {

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

  static search = async (req: Request, res: Response) => {

    const { github_username } = req.params

    await Dev.findOne({login: github_username}).then(async (user) => {
      
      if(user){
        return res.status(200).send(user)
      }
      
      const userResponse: DevType =  await GithubAPI.searchUser(github_username) as DevType
      
      if(userResponse){
        return res.status(200).send({
          message: 'not registered in the database, data directly from github',
          response: {
            user: userResponse
          } 
        })
      }else{
        return res.status(404).send({message: 'github not found'})
      }

      

    })

  }

}

export default UserController