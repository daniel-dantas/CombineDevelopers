import app, { PORT } from './app'

app.listen(PORT, () => {
  console.log(`Server is open in port ${PORT}`)
})