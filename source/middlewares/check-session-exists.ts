import { FastifyRequest } from 'fastify'

export const checkSessionExists = async (request: FastifyRequest) => {
    const { session } = request.cookies

    if (!session) {
        throw new Error('Deu ruim')
    }
}
