import express, { Request, Response, Express, json } from 'express'
import Mongoose from 'mongoose'
import Routes from './routes'
import Cors from 'cors'

const app: Express = express()

const PORT: number = 8000

app.use(Cors())
app.use(json())
app.use('/',Routes)
// Connect MongoDB
Mongoose.connect('mongodb://localhost/combinedevelopers', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(`MongoDB server is open!`)
}).catch( err => {
  console.log(`Erro: ${err}`)
})

app.listen(PORT, () => {
  console.log(`Server is open in port ${PORT}`)
})