import express from 'express'
import cors from "cors"
import './db/index.js'
import questionRoutes from "./routes/questionRoutes.js"

const app = express()
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/api/questions', questionRoutes)

app.listen(3000)