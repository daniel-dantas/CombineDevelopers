import { Schema, model, Document } from 'mongoose'

interface RepositorieType{
  language: string,
  name: string
}

interface DevType extends Document{
  avatar_url?: string,
  login: string,
  blog?: string,
  bio?: string,
  mainLanguages?: string[],
  repositories: RepositorieType[]
}

const DevSchema = new Schema({
  avatar_url: {
    type: String,
  },
  login: {
    type: String,
    required: true,
  },
  blog: {
    type: String
  },
  mainLanguages: {
    type: [String]
  },
  bio: {
    type: String
  },
  repositories: [
    {
      language: {
        type: String,
      },
      name: {
        type: String,
        required: true
      }
    }
  ]
})

export default model('Dev', DevSchema)
export {
  DevType,
  RepositorieType
}