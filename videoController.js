const fs = require('fs');
const path = require('path');
const videoService = require('../services/videoService');

/**
 * Get all videos
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await videoService.getAllVideos();
    
    res.status(200).json({
      success: true,
      count: videos.length,
      data: videos
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching videos',
      error: error.message
    });
  }
};

/**
 * Get video by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getVideoById = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await videoService.getVideoById(videoId);
    
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching video',
      error: error.message
    });
  }
};

/**
 * Delete a video
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const result = await videoService.deleteVideo(videoId);
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting video',
      error: error.message
    });
  }
};

/**
 * Download a video
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.downloadVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await videoService.getVideoById(videoId);
    
    if (!video || !video.filePath) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }
    
    const filePath = path.join(__dirname, '../../', video.filePath);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Video file not found'
      });
    }
    
    // Set headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${video.title}.mp4"`);
    res.setHeader('Content-Type', 'video/mp4');
    
    // Stream the file to the client
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error downloading video:', error);
    res.status(500).json({
      success: false,
      message: 'Error downloading video',
      error: error.message
    });
  }
};

/**
 * Get all background music options
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getBgMusicOptions = async (req, res) => {
  try {
    const bgMusicPath = path.join(__dirname, '../../data/bg_music');
    
    // Check if directory exists
    if (!fs.existsSync(bgMusicPath)) {
      return res.status(200).json({
        success: true,
        data: [
          { id: 'upbeat', name: 'Upbeat', description: 'Energetic and positive music' },
          { id: 'relaxing', name: 'Relaxing', description: 'Calm and soothing music' },
          { id: 'corporate', name: 'Corporate', description: 'Professional business music' },
          { id: 'inspirational', name: 'Inspirational', description: 'Motivational and inspiring music' }
        ]
      });
    }
    
    // Get background music options from service
    const bgMusic = await videoService.getBgMusicOptions();
    
    res.status(200).json({
      success: true,
      data: bgMusic
    });
  } catch (error) {
    console.error('Error fetching background music options:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching background music options',
      error: error.message
    });
  }
};