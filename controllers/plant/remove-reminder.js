const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { id, reminderId } = req.params;
  const { username } = req.user;
  if (!id || !reminderId || !username) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const plantsRef = db.collection('plants').doc(id);
  let doc = await plantsRef.get();
  if (!doc.exists) {
    throw error(404, 'Plant not found');
  }
  const plant = doc.data();
  const { reminders } = plant;
  const reminder = reminders.find((reminder) => reminder.id === reminderId);
  const remindersRef = db.collection('reminders').doc(reminderId);
  doc = await remindersRef.get();
  if (!reminder || !doc.exists) {
    throw error(404, 'reminder not found');
  }

  await remindersRef.delete();
  const index = reminders.findIndex((reminder) => reminder.id === reminderId);
  reminders.splice(index, 1);
  await plantsRef.update(plant);

  return res.status(200).json({ data: plant, message: 'Reminder removed' });
};
