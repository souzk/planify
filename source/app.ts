import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { transactionsRoutes } from '@me/routes/transactions'

export const app = fastify()

app.register(cookie)
app.register(transactionsRoutes, { prefix: 'transactions' })
