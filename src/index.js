const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(express.json())

const customers = []

app.post('/account', (request, response) => {
  const { cpf, name} = request.body

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  )

  if (customerAlreadyExists) {
    return response.status(400).json({ error: 'Customer already exists' })
  }

  const id = uuidv4()

  customers.push({
    id: uuidv4(),
    cpf,
    name,
    statement: []
  })

  return response.status(201).send()
})

app.listen(3333, () => {
  console.log('🚀Server started on port 3333!...')
})