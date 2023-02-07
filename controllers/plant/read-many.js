const { initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const db = initializeFirestore();

  const plantsRef = db.collection('plants');
  const data = await plantsRef.get();
  const docs = data.docs.map((doc) => {
    const plant = doc.data();
    plant.id = doc.id;
    return plant;
  });

  return res.status(200).json(docs);
};
