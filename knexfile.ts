import { Knex } from 'knex'
import process from 'node:process'

import { env } from '@me/environment'

if (!process.env.URL) {
    throw new Error('URL is not defined')
}

const options: Knex.Config = {
    client: env.CLIENT,
    connection: env.CLIENT === 'sqlite' ? { filename: env.URL } : env.URL,
    migrations: {
        extension: 'ts',
        directory: 'coredata/migrations'
    },
    useNullAsDefault: true
}

export default options
