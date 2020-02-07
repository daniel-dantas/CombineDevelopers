import { Schema, model, Document } from 'mongoose'

interface RepositoriesType{
  language?: string,
  name?: string
}

interface UserType extends Document{
  avatar_url ?: string,
  login ?: string,
  repositories?: [RepositoriesType]
}

const UserSchema = new Schema({
  avatar_url: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  repositories: [
    {
      language: {
        type: String,
      },
      name: {
        type: String
      }
    }
  ]
})

export default model('User', UserSchema)
export {
  UserType,
  RepositoriesType
}