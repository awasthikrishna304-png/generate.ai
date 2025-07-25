const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const imageToVideoService = require('../services/imageToVideoService');

/**
 * Generate video from uploaded images
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.generateVideo = async (req, res) => {
  try {
    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No images uploaded'
      });
    }

    // Get uploaded file paths and other options from request
    const imagePaths = req.files.map(file => file.path);
    const { transitionStyle, bgMusic, duration, customOptions } = req.body;
    
    // Generate a unique ID for this video
    const videoId = uuidv4();
    
    // Call the service to generate the video
    const result = await imageToVideoService.generateVideo({
      videoId,
      imagePaths,
      transitionStyle: transitionStyle || 'fade',
      bgMusic,
      duration: duration || 5, // Default 5 seconds per image if not specified
      customOptions: customOptions ? JSON.parse(customOptions) : {}
    });
    
    res.status(201).json({
      success: true,
      message: 'Video generated successfully',
      data: result
    });
  } catch (error) {
    console.error('Error generating video from images:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating video from images',
      error: error.message
    });
  }
};

/**
 * Get available transition options
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getTransitionOptions = async (req, res) => {
  try {
    // Default transition options
    const transitions = [
      { id: 'fade', name: 'Fade', description: 'Smooth fade transition between images' },
      { id: 'slide', name: 'Slide', description: 'Slide from one image to the next' },
      { id: 'zoom', name: 'Zoom', description: 'Zoom in/out between images' },
      { id: 'dissolve', name: 'Dissolve', description: 'Dissolve effect between images' },
      { id: 'wipe', name: 'Wipe', description: 'Wipe effect from one image to the next' }
    ];
    
    res.status(200).json({
      success: true,
      data: transitions
    });
  } catch (error) {
    console.error('Error fetching transition options:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching transition options',
      error: error.message
    });
  }
};