const { initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const plantsRef = db.collection('plants').doc(id);
  const doc = await plantsRef.get();
  if (!doc.exists) {
    throw error(404, 'Resource not found');
  }
  const data = doc.data();

  return res.status(200).json(data);
};
