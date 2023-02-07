const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { username } = req.user;
  if (!id || !username) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const plantRef = db.collection('plants').doc(id);
  const doc = await plantRef.get();
  if (!doc.exists) {
    throw error(404, 'Resource not found');
  }

  const payload = {};
  const {
    name,
    species,
    room,
    sunExposure,
    soilType,
    toxicityLevel,
    color,
    maxHeight,
  } = req.body;
  if (name) {
    payload.name = name;
  }
  if (species) {
    payload.species = species;
  }
  if (sunExposure) {
    payload.sunExposure = sunExposure;
  }
  if (room) {
    payload.room = room;
  }
  if (soilType) {
    payload.soilType = soilType;
  }
  if (toxicityLevel) {
    payload.toxicityLevel = toxicityLevel;
  }
  if (color) {
    payload.color = color;
  }
  if (maxHeight) {
    payload.maxHeight = maxHeight;
  }
  await plantRef.update(payload);
  const data = (await plantRef.get()).data();

  return res.status(200).json({ data, message: 'Plant updated' });
};
