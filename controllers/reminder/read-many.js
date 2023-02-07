const { initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const db = initializeFirestore();
  const remindersRef = db.collection('reminders');
  const snapshot = await remindersRef.get();
  const data = snapshot.docs.map((doc) => {
    const reminder = doc.data();
    reminder.id = doc.id;
    return reminder;
  });

  return res.status(200).json(data);
};
