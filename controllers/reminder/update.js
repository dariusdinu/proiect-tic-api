const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { username } = req.user;
  if (!id || !username) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const remindersRef = db.collection('reminders').doc(id);
  const doc = await remindersRef.get();
  if (!doc.exists) {
    throw error(404, 'Reminder not found');
  }

  const payload = {};
  const { name, type, startDate, numberOfTimeUnits, timeUnit } = req.body;
  if (name) {
    payload.name = name;
  }
  if (type) {
    payload.type = type;
  }
  if (startDate) {
    payload.startDate = startDate;
  }
  if (numberOfTimeUnits) {
    payload.numberOfTimeUnits = numberOfTimeUnits;
  }
  if (timeUnit) {
    payload.timeUnit = timeUnit;
  }

  await remindersRef.update(payload);
  const data = (await remindersRef.get()).data();

  return res.status(200).json({ data, message: 'Reminder updated' });
};
