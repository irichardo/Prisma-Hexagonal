import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import configRoutes from './routes/router.handler'
import { RouteVersion } from './types/types'
import cookieParser from 'cookie-parser'

// const { PORT } = process.env
const corsOptions = {
  origin: 'http://localhost:3100',
  methods: 'GET,HEAD,PUT,PATH,POST,DELETE',
  credentials: true,
  optionSuccessStatus: 204
}

const server = express()
server.use(cors(corsOptions))
server.use(cookieParser())
server.options('*', cors(corsOptions))
server.use(express.json())
server.use(logger('dev'))
server.use(express.urlencoded({ extended: true }))

configRoutes(server, RouteVersion.v1)
