const create = require('./create');
const readMany = require('./read-many');
const readOne = require('./read-one');
const update = require('./update');
const remove = require('./remove');

const createReminder = require('./create-reminder');
const readReminder = require('./read-reminder');
const readReminders = require('./read-reminders');
const removeReminder = require('./remove-reminder');
const updateReminder = require('./update-reminder');

module.exports = {
  create,
  readMany,
  readOne,
  remove,
  update,
  createReminder,
  readReminder,
  readReminders,
  removeReminder,
  updateReminder,
};
