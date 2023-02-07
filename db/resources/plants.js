const { initializeFirestore, randomDate } = require('../../functions');
const chance = require('../../lib/chance');

module.exports = async () => {
  const db = initializeFirestore();
  const reminders = await db.collection('reminders').get();
  const remindersData = reminders.docs.map((reminder) => {
    const data = reminder.data();
    data.id = reminder.id;
    return data;
  });

  return [
    {
      name: chance.name(),
      species: chance.string(),
      room: chance.string(),
      sunExposure: chance.string(),
      soilType: chance.string(),
      toxicityLevel: chance.integer({ min: 0 }),
      color: chance.color({ format: 'hex' }),
      maxHeight: chance.integer({ min: 0 }),
      reminders: [remindersData[0]],
    },
    {
      name: chance.name(),
      species: chance.string(),
      room: chance.string(),
      sunExposure: chance.string(),
      soilType: chance.string(),
      toxicityLevel: chance.integer({ min: 0 }),
      color: chance.color({ format: 'hex' }),
      maxHeight: chance.integer({ min: 0 }),
      reminders: [remindersData[1]],
    },
    {
      name: chance.name(),
      species: chance.string(),
      room: chance.string(),
      sunExposure: chance.string(),
      soilType: chance.string(),
      toxicityLevel: chance.integer({ min: 0 }),
      color: chance.color({ format: 'hex' }),
      maxHeight: chance.integer({ min: 0 }),
      reminders: [remindersData[2]],
    },
  ];
};
