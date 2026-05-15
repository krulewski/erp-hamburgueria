import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3000'

type Order = {
  _id: string
  customerName: string
  block: string
  apartment: string
  total: number
  status: string
  createdAt: string

  items: {
    name: string
    quantity: number
    observation?: string
  }[]
}

function Admin() {

  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {

    try {

      const response = await axios.get(
        `${API_URL}/orders`
      )

      setOrders(response.data)

    } catch (error) {

      console.error(error)

    }
  }

  const updateStatus = async (
    id: string,
    status: string
  ) => {

    try {

      await axios.put(
        `${API_URL}/orders/${id}`,
        { status }
      )

      const response = await axios.get(
        `${API_URL}/orders`
      )

      setOrders(response.data)

    } catch (error) {

      console.error(error)

      alert('Erro ao atualizar status')

    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">

      <div className="w-full max-w-5xl mx-auto">

        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
          🍔 Painel FlaFla
        </h1>

        {orders.length === 0 && (
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <p className="text-gray-500 text-lg">
              Nenhum pedido encontrado 🍔
            </p>
          </div>
        )}

        <div className="space-y-4">

          {orders.map(order => (

            <div
              key={order._id}
              className="bg-white rounded-2xl shadow p-5"
            >

              <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-start">

                <div>

                  <h2 className="text-xl md:text-2xl font-bold">
                    {order.customerName}
                  </h2>

                  <p className="text-gray-500">
                    Bloco {order.block || '-'} • Ap {order.apartment || '-'}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    Pedido feito às{' '}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleTimeString(
                          'pt-BR',
                          {
                            hour: '2-digit',
                            minute: '2-digit'
                          }
                        )
                      : '--:--'}
                  </p>

                </div>

                <div>

                  {order.status === 'PENDENTE' && (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">
                      PENDENTE
                    </span>
                  )}

                  {order.status === 'EM_PREPARO' && (
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                      EM PREPARO
                    </span>
                  )}

                  {order.status === 'FINALIZADO' && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                      FINALIZADO
                    </span>
                  )}

                  {order.status === 'CANCELADO' && (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
                      CANCELADO
                    </span>
                  )}

                </div>

              </div>

              {/* ITENS */}
              <div className="mt-4 space-y-3">

                {order.items?.map((item, index) => (

                  <div
                    key={index}
                    className="border rounded-xl p-3"
                  >

                    <p className="font-semibold">
                      {item.quantity}x {item.name}
                    </p>

                    {item.observation && (
                      <p className="text-orange-500 text-sm mt-1">
                        Obs: {item.observation}
                      </p>
                    )}

                  </div>

                ))}

              </div>

              {/* TOTAL */}
              <div className="mt-4 flex flex-col md:flex-row gap-4 md:justify-between md:items-center">

                <p className="text-2xl font-bold text-green-600">
                  R$ {(order.total || 0).toFixed(2)}
                </p>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">

                  <button
                    onClick={() =>
                      updateStatus(
                        order._id,
                        'EM_PREPARO'
                      )
                    }
                    className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
                  >
                    Preparar
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        order._id,
                        'FINALIZADO'
                      )
                    }
                    className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition"
                  >
                    Finalizar
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        order._id,
                        'CANCELADO'
                      )
                    }
                    className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                  >
                    Cancelar
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default Admin