import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

// create server with express
const api = express()

api.use(express.json())

// test api
api.get('/', (req, res) => res.json({status: 'running', apiName: 'Api Rest - HoyTrabajas', dev: 'Daniel Merchan'}))

const PORT = process.env.PORT || 4000
api.listen(PORT, () => {
  console.log(`API running on port ${PORT}`)
})