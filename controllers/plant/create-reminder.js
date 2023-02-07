const { toNumber } = require('lodash');
const { error, initializeFirestore, toDateString } = require('../../functions');

module.exports = async (req, res) => {
  const { name, type, startDate, numberOfTimeUnits, timeUnit } = req.body;
  const { id } = req.params;
  const { username } = req.user;
  if (
    !name ||
    !type ||
    !startDate ||
    !numberOfTimeUnits ||
    !timeUnit ||
    !id ||
    !username
  ) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const plantsRef = db.collection('plants').doc(id);
  const doc = await plantsRef.get();
  if (!doc.exists) {
    throw error(404, 'Plant not found');
  }
  const data = doc.data();

  const reminder = {
    name: name.trim(),
    type,
    startDate: toDateString(startDate),
    numberOfTimeUnits: toNumber(numberOfTimeUnits),
    timeUnit,
  };

  const remindersRef = db.collection('reminders');
  const response = await remindersRef.add(reminder);
  if (!response.id) {
    throw error(500, 'Failed to create reminder');
  }

  reminder.id = response.id;
  data.reminders.push(reminder);
  await plantsRef.update(data);

  return res.status(200).json(data);
};
