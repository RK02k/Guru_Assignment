const express = require('express');
const router = express.Router();
const flowController = require('../controllers/flowController');

router.post('/initialize', flowController.initializeAstrologers);
router.post('/distribute', flowController.distributeFlow);

module.exports = router;