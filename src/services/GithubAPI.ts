import API from './config/APIConfig'
import { UserType, RepositorieType } from '../models/User'

class GithubAPI{
  static searchUser = async (github_username: string) => {
    return await API.get(`${github_username}`).then(async(response):Promise<UserType> => {
      let user = response.data as UserType
  
      user.repositories = await API.get(`${github_username}/repos`).then((response):RepositorieType[] => {
        return response.data as RepositorieType[]
      })
      
      let repositories: RepositorieType[] = user.repositories.map(repositor => {
        return {
          name: repositor.name,
          language: repositor.language
        } as RepositorieType
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
