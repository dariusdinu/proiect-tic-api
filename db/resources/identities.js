const chance = require('../../lib/chance');
const { hashSync } = require('bcryptjs');
const { randomUsername } = require('../../functions');

module.exports = async () => {
  const roles = ['admin', 'client'];

  return [
    {
      email: 'darius@email.com',
      name: 'Darius Dinu',
      password: hashSync('supersecretpassword'),
      role: 'admin',
      username: 'dinudarius',
    },
    {
      email: chance.email(),
      name: chance.name(),
      password: hashSync('supersecretpassword'),
      role: chance.pickone(roles),
      username: randomUsername(),
    },
    {
      email: chance.email(),
      name: chance.name(),
      password: hashSync('supersecretpassword'),
      role: chance.pickone(roles),
      username: randomUsername(),
    },
  ];
};
