import API from './config/APIConfig'
import { DevType, RepositorieType } from '../models/Dev'
import SelectLanguagesStack from '../utils/SelectLanguagesStack'

class GithubAPI{
  static searchUser = async (github_username: string) => {
    return await API.get(`${github_username}`).then(async(response):Promise<DevType> => {
      let user = response.data as DevType
  
      user.repositories = await API.get(`${github_username}/repos`).then((response):RepositorieType[] => {
        return response.data as RepositorieType[]
      })
      
      let repositories: RepositorieType[] = user.repositories.map((repositor):RepositorieType => {
        return {
          name: repositor.name,
          language: repositor.language
        }
      })

      const mainLanguages: string[] = SelectLanguagesStack(repositories)

      return {
        login: user.login,
        avatar_url: user.avatar_url,
        bio: user.bio,
        blog: user.blog,
        mainLanguages,
        repositories
      } as DevType
      
    }).catch( err => {
      return false
    })
  }
}

export default GithubAPI
