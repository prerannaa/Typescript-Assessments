import type { Knex } from "knex";
const TABLE_NAME = "todos";

/**
 * Create table "users"
 * @param {Knex} knex
 * @returns {Promise} 
 * 
 */

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table)=>{
        table.bigIncrements("id");
        table.string("title", 200).notNullable().defaultTo(false);
        table.boolean("completed").notNullable();
        table.timestamp("created_at").notNullable().defaultTo(knex.raw('now()'));
        table
        .bigInteger("created_by")
        .unsigned()
        .nullable()
        .references("id")
        .inTable("users");

        table
        .timestamp("updated_at")
        .nullable();
    });
};

/**
 * Roll back table "users"
 * 
 * @param {Knex} knex
 * @return {Promise}
 */ 

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TABLE_NAME);
};

