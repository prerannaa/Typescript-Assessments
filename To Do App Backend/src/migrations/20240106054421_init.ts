import type { Knex } from "knex";
const TABLE_NAME = "users";

/**
 * Create table "users"
 * @param {Knex} knex
 * @returns {Promise} 
 * 
 */

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table)=>{
        table.bigIncrements("id");
        table.string("username", 200).notNullable().unique();
        table.string("password",200).notNullable();
        table
        .bigInteger("created_by")
        .unsigned()
        .nullable()
        .references("id")
        .inTable(TABLE_NAME);

        table.timestamp("updated_at").nullable();

        table
        .bigInteger("updated_by")
        .unsigned()
        .references("id")
        .inTable(TABLE_NAME)
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
    return knex.schema.dropTable("users");
};

