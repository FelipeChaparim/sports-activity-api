/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("activities", (tbl) => {
        tbl.increments("id");
        tbl.string("name", 128).notNullable();
        tbl.string("description", 128).notNullable();
        tbl.string("type", 128).notNullable();
        tbl.integer("Km").notNullable();
        tbl.string("effort").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("activities");
};