const { error, initializeFirestore, toDateString } = require('../../functions');
const { types, timeUnits } = require('../../constants');

module.exports = async (req, res) => {
  const { username } = req.user;
  const { name, type, startDate, numberOfTimeUnits, timeUnit } = req.body;
  if (
    !name ||
    !type ||
    !startDate ||
    !numberOfTimeUnits ||
    !timeUnit ||
    !username
  ) {
    throw error(404, 'Missing required params');
  }
  if (!types.includes(type)) {
    throw error(400, 'Invalid type');
  }
  if (!timeUnits.includes(timeUnit)) {
    throw error(400, 'Invalid time unit');
  }

  const payload = {
    name: name.trim(),
    type,
    startDate: startDate,
    numberOfTimeUnits: numberOfTimeUnits,
    timeUnit,
  };

  const db = initializeFirestore();
  const remindersRef = db.collection('reminders');
  const response = await remindersRef.add(payload);
  if (!response.id) {
    throw error(500, 'Failed to create reminder');
  }
  const data = (await response.get()).data();
  data.id = response.id;

  return res.status(200).json({ data, message: 'Reminder created' });
};
