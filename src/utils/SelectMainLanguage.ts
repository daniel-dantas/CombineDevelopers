import { RepositorieType } from '../models/User'
import { modeFast } from 'simple-statistics'

export default function SelectMainLanguage(repositories: RepositorieType[]){

  const languages: string[] = repositories.map(repositorie => {
    return repositorie.language
  })

  const mainLanguage: string = modeFast(languages)

  return mainLanguage

}
