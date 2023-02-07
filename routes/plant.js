const { Router } = require('express');
const { Plant } = require('../controllers');

const router = Router();

router.post('/admin/plants', Plant.create);
router.get('/plants', Plant.readMany);
router.get('/plants/:id', Plant.readOne);
router.put('/admin/plants/:id', Plant.update);
router.delete('/admin/plants/:id', Plant.remove);

router.delete('/admin/plants/:id/reminders/:reminderId', Plant.removeReminder);
router.get('/plants/:id/reminders', Plant.readReminders);
router.get('/plants/:id/reminders/:reminderId', Plant.readReminder);
router.post('/admin/plants/:id/reminders', Plant.createReminder);
router.put('/admin/plants/:id/reminders/:reminderId', Plant.updateReminder);

module.exports = router;
