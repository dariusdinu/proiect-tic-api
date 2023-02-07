const { pick } = require('lodash');
const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
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
  const { username } = req.user;
  if (!username) {
    throw error(404, 'Missing required params');
  }

  const payload = {
    name: name.trim(),
    species: species.trim(),
    room: room.trim(),
    sunExposure: sunExposure.trim(),
    soilType: soilType.trim(),
    toxicityLevel: Number(toxicityLevel),
    color: color.trim(),
    maxHeight: Number(maxHeight),
    reminders: [],
  };

  const db = initializeFirestore();
  const plantsRef = db.collection('plants');
  const response = await plantsRef.add(payload);

  if (!response.id) {
    throw error(500, 'Failed to create plant');
  }
  const data = (await response.get()).data();
  data.id = response.id;

  return res.status(200).json({ data, message: 'Plant created' });
};
