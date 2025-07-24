const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const textToVideoController = require('../controllers/textToVideoController');

// @route   POST /api/text-to-video
// @desc    Generate video from text
// @access  Public
router.post(
  '/',
  [
    check('script', 'Script is required').not().isEmpty(),
    check('voiceType', 'Voice type is required').not().isEmpty(),
    check('templateStyle', 'Template style is required').not().isEmpty()
  ],
  textToVideoController.generateVideo
);

// @route   GET /api/text-to-video/voices
// @desc    Get available voice options
// @access  Public
router.get('/voices', textToVideoController.getVoiceOptions);

// @route   GET /api/text-to-video/templates
// @desc    Get available template options
// @access  Public
router.get('/templates', textToVideoController.getTemplateOptions);

module.exports = router;