import { Schema, model, Document } from 'mongoose'
import { UserType } from './User'

interface GroupDevType extends Document{
  nameProject: string,
  languagesStack: string[],
  description: string,
  devs?: UserType[]
}

const groupSchema = new Schema({
  nameProject: {
    type: String,
    required: true
  },
  languagesStack: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  devs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

export default model('GroupDev', groupSchema)
export {
  GroupDevType
}