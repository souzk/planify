import { FastifyInstance } from 'fastify'
import { nanoid } from 'nanoid'
import { z } from 'zod'

import { knex } from '@me/connection'
import { checkSessionExists } from '@me/middlewares/check-session-exists'

export const transactionsRoutes = async (route: FastifyInstance) => {
    route.post('/', async (request, reply) => {
        const _schema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['income', 'outcome']),
            category: z.string()
        })

        const { title, amount, type, category } = _schema.parse(request.body)

        let { session } = request.cookies

        if (!session) {
            session = nanoid()

            reply.cookie('session', session, {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 7
            })
        }

        await knex('transactions').insert({
            id: nanoid(),
            title,
            amount: type === 'income' ? amount : -amount,
            type,
            category,
            session
        })

        return reply.status(201).send()
    })

    route.get(
        '/summary',
        { preHandler: checkSessionExists },
        async (request) => {
            const { session } = request.cookies

            const summary = await knex('transactions')
                .where('session', session)
                .sum('amount', {
                    as: 'balance'
                })
                .first()

            return { summary }
        }
    )

    route.get('/', { preHandler: checkSessionExists }, async (request) => {
        const { session } = request.cookies

        const transactions = await knex('transactions')
            .where('session', session)
            .select()

        return { transactions }
    })
}
