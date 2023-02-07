const plants = require('./seeds/002_plants');
const identities = require('./seeds/001_identities');
const reminders = require('./seeds/003_reminders');

const seed = async () => {
  await identities.seed();
  await reminders.seed();
  await plants.seed();
};

(async () => {
  try {
    await seed();
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

module.exports = seed;
