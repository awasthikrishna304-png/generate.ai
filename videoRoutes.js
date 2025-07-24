const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// @route   GET /api/videos
// @desc    Get all videos
// @access  Public
router.get('/', videoController.getAllVideos);

// @route   GET /api/videos/:id
// @desc    Get video by ID
// @access  Public
router.get('/:id', videoController.getVideoById);

// @route   DELETE /api/videos/:id
// @desc    Delete a video
// @access  Public
router.delete('/:id', videoController.deleteVideo);

// @route   GET /api/videos/download/:id
// @desc    Download a video
// @access  Public
router.get('/download/:id', videoController.downloadVideo);

// @route   GET /api/videos/bg-music
// @desc    Get all background music options
// @access  Public
router.get('/bg-music', videoController.getBgMusicOptions);

module.exports = router;