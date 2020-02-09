import { Schema, model, Document } from 'mongoose'

interface RepositorieType{
  language: string,
  name: string
}

interface UserType extends Document{
  avatar_url : string,
  login : string,
  blog: string,
  bio: string,
  mainLanguage: string,
  repositories: RepositorieType[]
}

const UserSchema = new Schema({
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
  maingLanguage: {
    type: String
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

export default model('User', UserSchema)
export {
  UserType,
  RepositorieType
}