import express from 'express'
import { connectDatabase } from './database/connection'
import orderRoutes from './routes/orderRoutes'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

// 🔥 CORS LIBERADO (resolve erro do Vercel)
app.use(cors({
  origin: '*'
}))

app.use(express.json())

// rotas
app.use('/orders', orderRoutes)

// rota teste
app.get('/', (req, res) => {
  return res.json({ message: 'API da Pizzaria rodando 🍕' })
})

// conecta no banco
connectDatabase()

// porta dinâmica (Render)
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})