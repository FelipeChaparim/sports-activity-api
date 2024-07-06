/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('activities').del()
  await knex('activities').insert([
    { name: "Running", description: "Jogging or running outdoors", type: "Outdoor", Km: 10, effort: "High" },
    { name: "Cycling", description: "Riding a bicycle", type: "Outdoor", Km: 15, effort: "Medium" },
    { name: "Swimming", description: "Swimming in a pool or open water", type: "Water", Km: 5, effort: "High" },
    { name: "Hiking", description: "Walking in natural environments", type: "Outdoor", Km: 8, effort: "Medium" },
    { name: "Rock Climbing", description: "Climbing natural or artificial rock walls", type: "Outdoor", Km: 12, effort: "High" },
    { name: "Surfing", description: "Riding waves on a surfboard", type: "Water", Km: 18, effort: "High" },
    { name: "Yoga", description: "Physical, mental, and spiritual practice", type: "Indoor", Km: 1, effort: "Low" },
    { name: "Tennis", description: "Racquet sport played individually or in pairs", type: "Outdoor", Km: 3, effort: "Medium" },
    { name: "Basketball", description: "Team sport played on a court", type: "Outdoor", Km: 7, effort: "Medium" },
    { name: "Golf", description: "Playing golf on a course", type: "Outdoor", Km: 14, effort: "Low" }
  ]);
};