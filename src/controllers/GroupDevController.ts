import GroupDev, { GroupDevType } from '../models/GroupDev'
import { Request, Response } from 'express'

class GroupDevController {
  static create = async (req: Request, res: Response) => {
    const groupdev = req.body as GroupDevType

    await GroupDev.create(groupdev).then(groupdev => {
      return res.status(200).send({message: 'Created GroupDev', groupdev})
    }).catch(err => {
      return res.status(404).send({message: 'Erro in created GroupDev', err})
    })

  }

  static read = async (req: Request, res: Response) => {
    
    GroupDev.find().then(groups => {
      return res.status(200).send(groups)
    }).catch(err => {
      return res.status(404).send({message: 'Not read GropDevs', err})
    })

  }

  static search = async (req: Request, res: Response) => {
    
    const { projectName } = req.params

    GroupDev.find({projectName}).then(groups => {
      return res.status(200).send({message: 'search completed', groups})
    }).catch(err => {
      return res.status(400).send({message: 'error in search', err})
    })

  }

}

export default GroupDevController