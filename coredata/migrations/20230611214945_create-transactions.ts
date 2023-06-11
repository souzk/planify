import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('transactions', (column) => {
        column.uuid('id').unique().primary()
        column.string('title', 25).notNullable()
        column.decimal('amount', 10, 2).notNullable()
        column.enu('type', ['income', 'outcome'])
        column.enu('category', ['house', 'buy', 'transport', 'job'])
        column.uuid('session').unique().after('id').index()
        column.timestamp('create').defaultTo(knex.fn.now())
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('transactions')
}
