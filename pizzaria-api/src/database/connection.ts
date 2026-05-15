import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

// URL do banco
const MONGO_URL = process.env.MONGO_URL as string

// função que conecta ao banco
export async function connectDatabase() {
  try {
    // tenta conectar
    await mongoose.connect(MONGO_URL)
    
    // se der certo
    console.log('Conectado ao MongoDB 🍃')
  } catch (error) {
    // se der erro
    console.log('Erro ao conectar no banco', error)
  }
}
