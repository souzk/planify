import { config } from 'dotenv'
import process from 'node:process'
import { z } from 'zod'

if (process.env.MODE === 'test') {
    config({ path: '.env.test' })
} else {
    config()
}

const environment = z.object({
    MODE: z.enum(['development', 'production', 'test']).default('production'),
    CLIENT: z.enum(['sqlite', 'pg']).default('sqlite'),
    URL: z.string(),
    HOST: z.string().default('0.0.0.0'),
    PORT: z.coerce.number().default(3333)
})

const satisfies = environment.safeParse(process.env)

if (!satisfies.success) {
    throw new Error('Invalid environment variables')
}

export const env = satisfies.data
