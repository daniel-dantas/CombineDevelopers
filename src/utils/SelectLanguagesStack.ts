import { RepositorieType } from '../models/User'
import { modeFast } from 'simple-statistics'

export default function SelectLanguagesStack(repositories: RepositorieType[]){

  let languagesStack: string[] = []
  let language: string

  repositories = repositories.filter(repositor => {
    return repositor.language !== null
  })

  let languages: string[] = repositories.map(repositorie => {
    return repositorie.language
  })

  while (languagesStack.length !== 3){

    language = modeFast(languages)

    languagesStack.push(language)

    languages = languages.filter(languageFilter => {
      return languageFilter !== language
    })

  }
  
  return languagesStack
}
