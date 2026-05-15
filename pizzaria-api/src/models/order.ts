import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({

  customerName: {
    type: String,
    required: true
  },

  block: {
    type: String,
    required: true
  },

  apartment: {
    type: String,
    required: true
  },

  items: [
    {
      name: {
        type: String,
        required: true
      },

      quantity: {
        type: Number,
        required: true,
        default: 1
      },

      price: {
        type: Number,
        required: true
      },

      observation: {
        type: String,
        default: ''
      }
    }
  ],

  total: {
    type: Number,
    required: true
  },

  paymentMethod: {
    type: String,
    default: 'PIX'
  },

  status: {
    type: String,

    enum: [
      'PENDENTE',
      'EM_PREPARO',
      'FINALIZADO',
      'CANCELADO'
    ],

    default: 'PENDENTE'
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  finishedAt: {
    type: Date
  },

  canceledAt: {
    type: Date
  }

})

export const Order = mongoose.model(
  'Order',
  OrderSchema
)