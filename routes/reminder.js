const { Reminder } = require('../controllers');
const { Router } = require('express');

const router = Router();

router.delete('/admin/reminders/:id', Reminder.remove);
router.get('/reminders', Reminder.readMany);
router.get('/reminders/:id', Reminder.readOne);
router.post('/admin/reminders', Reminder.create);
router.put('/admin/reminders/:id', Reminder.update);

module.exports = router;
