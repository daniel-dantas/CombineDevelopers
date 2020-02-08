import API from './config/APIConfig'
import { UserType, RepositoriesType } from '../models/User'

class GithubAPI{
  static searchUser = async (github_username: string) => {
    return await API.get(`${github_username}`).then(async(response):Promise<UserType> => {
      let user = response.data as UserType
  
      user.repositories = await API.get(`${github_username}/repos`).then((response):[RepositoriesType] => {
        return response.data as [RepositoriesType]
      })
      
      let repositories: RepositoriesType[] = user.repositories.map<RepositoriesType>(repositor => {
        return {
          name: repositor.name,
          language: repositor.language
        } as RepositoriesType
      })

      return {
        login: user.login,
        avatar_url: user.avatar_url,
        bio: user.bio,
        blog: user.blog,
        repositories
      } as UserType
      
    }).catch( err => {
      return false
    })
  }
}

export default GithubAPI
