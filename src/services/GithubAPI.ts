import API from './config/APIConfig'
import { UserType, RepositoriesType } from '../models/User'

class GithubAPI{
  static searchUser = async (github_username: string) => {
    return await API.get(`${github_username}`).then(async(response):Promise<UserType> => {
      let user = response.data as UserType
  
      user.repositories = await API.get(`${github_username}/repos`).then((response):[RepositoriesType] => {
        return response.data as [RepositoriesType]
      })
  
      return user as UserType
    }).catch( err => {
      return false
    })
  }
}

export default GithubAPI
