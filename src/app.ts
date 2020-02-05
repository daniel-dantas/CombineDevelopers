import express, { Request, Response } from 'express'

const app = express()

const PORT = 8000

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my life typescript')
})

app.listen(PORT, () => {
  console.log(`Server is open in port ${PORT}`)
})