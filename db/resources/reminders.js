const { randomDate } = require('../../functions');
const chance = require('../../lib/chance');
const { timeUnits, types } = require('../../constants');

module.exports = async () => {
  return [
    {
      name: chance.name(),
      type: chance.pickone(types),
      startDate: randomDate(),
      numberOfTimeUnits: chance.integer({ min: 0 }),
      timeUnit: chance.pickone(timeUnits),
    },
    {
      name: chance.name(),
      type: chance.pickone(types),
      startDate: randomDate(),
      numberOfTimeUnits: chance.integer({ min: 0 }),
      timeUnit: chance.pickone(timeUnits),
    },
    {
      name: chance.name(),
      type: chance.pickone(types),
      startDate: randomDate(),
      numberOfTimeUnits: chance.integer({ min: 0 }),
      timeUnit: chance.pickone(timeUnits),
    },
  ];
};
