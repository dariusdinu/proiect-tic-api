const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { id, reminderId } = req.params;
  if (!id) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const plantsRef = db.collection('plants').doc(id);
  const doc = await plantsRef.get();
  if (!doc.exists) {
    throw error(404, 'Plant not found');
  }
  const { reminders } = doc.data();
  const reminder = reminders.find((reminder) => reminder.id === reminderId);
  if (!reminder) {
    throw error(404, 'Reminder not found');
  }

  return res.status(200).json(reminder);
};
