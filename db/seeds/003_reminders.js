const { initializeFirestore } = require('../../functions');
const reminders = require('../resources/reminders');

exports.seed = async () => {
  try {
    console.log('Planting seeds for reminders');

    const seeds = await reminders();
    const db = initializeFirestore();
    for (const seed of seeds) {
      await db.collection('reminders').add(seed);
    }

    console.log('✓');
  } catch (err) {
    console.warn('Error! Cannot add reminders');
    console.error(err);
  }
};
