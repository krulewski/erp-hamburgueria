import { useState } from 'react'
import axios from 'axios'
import { products } from './data/products'

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  selectedOption?: string
  observation?: string
}

const API_URL = 'https://erp-hamburgueria.onrender.com'

function App() {

  const [cart, setCart] = useState<CartItem[]>([])

  const [customerName, setCustomerName] = useState('')
  const [block, setBlock] = useState('')
  const [apartment, setApartment] = useState('')

  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string
  }>({})

  const [observations, setObservations] = useState<{
    [key: number]: string
  }>({})

  const addToCart = (product: any) => {

    const selectedOption = selectedOptions[product.id]
    const observation = observations[product.id]

    if (product.options && !selectedOption) {
      alert('Selecione o tipo de pão')
      return
    }

    const existingItem = cart.find(
      item =>
        item.id === product.id &&
        item.selectedOption === selectedOption &&
        item.observation === observation
    )

    if (existingItem) {

      setCart(
        cart.map(item =>
          item.id === product.id &&
          item.selectedOption === selectedOption &&
          item.observation === observation
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )
      )

    } else {

      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          selectedOption,
          observation
        }
      ])
    }
  }

  const increaseQuantity = (index: number) => {

    const updatedCart = [...cart]

    updatedCart[index].quantity += 1

    setCart(updatedCart)
  }

  const decreaseQuantity = (index: number) => {

    const updatedCart = [...cart]

    if (updatedCart[index].quantity > 1) {

      updatedCart[index].quantity -= 1

    } else {

      updatedCart.splice(index, 1)
    }

    setCart(updatedCart)
  }

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const finalizeOrder = async () => {

    if (!customerName || !block || !apartment) {
      alert('Preencha nome, bloco e apartamento')
      return
    }

    if (cart.length === 0) {
      alert('Carrinho vazio')
      return
    }

    try {

      await axios.post(`${API_URL}/orders`, {

        customerName,
        block,
        apartment,

        items: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          observation:
            `${item.selectedOption || ''} ${item.observation || ''}`
        })),

        total

      })

      alert('Pedido realizado com sucesso 🍔')

      setCart([])
      setCustomerName('')
      setBlock('')
      setApartment('')

    } catch (error) {

      console.error(error)
      alert('Erro ao finalizar pedido')

    }
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-black text-white p-6 text-center shadow-lg">
        <h1 className="text-4xl font-bold">
          🍔 Hamburgueria
        </h1>

        <p className="text-gray-300 mt-2">
          Delivery do condomínio
        </p>
      </div>

      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">

        {/* PRODUTOS */}
        <div className="md:col-span-2">

          <h2 className="text-2xl font-bold mb-4">
            Cardápio
          </h2>

          <div className="grid gap-4">

            {products.map(product => (

              <div
                key={product.id}
                className="bg-white rounded-2xl shadow overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-cover"
                />

                <div className="p-4">

                  <p className="text-sm text-orange-500 font-semibold">
                    {product.category}
                  </p>

                  <h3 className="text-2xl font-bold">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {product.description}
                  </p>

                  {/* OPÇÕES */}
                  {product.options && (

                    <div className="mt-4">

                      <p className="font-semibold mb-2">
                        Escolha o pão:
                      </p>

                      <div className="flex gap-2 flex-wrap">

                        {product.options.map((option: string) => (

                          <button
                            key={option}
                            onClick={() =>
                              setSelectedOptions({
                                ...selectedOptions,
                                [product.id]: option
                              })
                            }
                            className={`px-3 py-1 rounded-full border transition ${
                              selectedOptions[product.id] === option
                                ? 'bg-black text-white'
                                : 'bg-white'
                            }`}
                          >
                            {option}
                          </button>

                        ))}

                      </div>

                    </div>

                  )}

                  {/* OBSERVAÇÃO */}
                  <div className="mt-4">

                    <p className="font-semibold mb-2">
                      Observações
                    </p>

                    <textarea
                      placeholder="Ex: sem cebola, molho à parte..."
                      value={observations[product.id] || ''}
                      onChange={(e) =>
                        setObservations({
                          ...observations,
                          [product.id]: e.target.value
                        })
                      }
                      className="w-full border rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-black"
                    />

                  </div>

                  <div className="mt-4 flex items-center justify-between">

                    <span className="text-2xl font-bold text-green-600">
                      R$ {product.price.toFixed(2)}
                    </span>

                    <button
                      onClick={() => addToCart(product)}
                      className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
                    >
                      Adicionar
                    </button>

                  </div>
                </div>
              </div>

            ))}

          </div>
        </div>

        {/* CARRINHO */}
        <div className="bg-white rounded-2xl shadow p-4 h-fit sticky top-6">

          <h2 className="text-2xl font-bold mb-4">
            🛒 Carrinho
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">
              Seu carrinho está vazio
            </p>
          ) : (
            <div className="space-y-3">

              {cart.map((item, index) => (
                <div
                  key={index}
                  className="border-b pb-3"
                >

                  <div className="flex justify-between">

                    <div>

                      <p className="font-semibold">
                        {item.name}
                      </p>

                      {item.selectedOption && (
                        <p className="text-sm text-gray-500">
                          {item.selectedOption}
                        </p>
                      )}

                      {item.observation && (
                        <p className="text-sm text-orange-500">
                          Obs: {item.observation}
                        </p>
                      )}

                    </div>

                    <p className="font-bold">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>

                  </div>

                  {/* QUANTIDADE */}
                  <div className="flex items-center gap-3 mt-3">

                    <button
                      onClick={() => decreaseQuantity(index)}
                      className="bg-red-500 text-white w-8 h-8 rounded-full"
                    >
                      -
                    </button>

                    <span className="font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(index)}
                      className="bg-green-500 text-white w-8 h-8 rounded-full"
                    >
                      +
                    </button>

                  </div>

                </div>
              ))}

              <div className="pt-4 border-t">

                <p className="text-xl font-bold">
                  Total: R$ {total.toFixed(2)}
                </p>

                <div className="mt-4 space-y-3">

                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
                  />

                  <input
                    type="text"
                    placeholder="Bloco"
                    value={block}
                    onChange={(e) => setBlock(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
                  />

                  <input
                    type="text"
                    placeholder="Apartamento"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
                  />

                  <button
                    onClick={finalizeOrder}
                    className="w-full bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition"
                  >
                    Finalizar Pedido
                  </button>

                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  )
}

export default App