/* eslint-disable no-console */
const { initializeFirestore } = require('../../functions');
const plants = require('../resources/plants');

exports.seed = async () => {
  try {
    console.log('Planting seeds for plants');

    const seeds = await plants();
    const db = initializeFirestore();
    for (const seed of seeds) {
      await db.collection('plants').add(seed);
    }

    console.log('✓');
  } catch (err) {
    console.warn('Error! Cannot add plants');
    console.error(err);
  }
};
