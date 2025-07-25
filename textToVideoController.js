const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const textToVideoService = require('../services/textToVideoService');

/**
 * Generate video from text script
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.generateVideo = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { script, voiceType, templateStyle, bgMusic, customOptions } = req.body;
    
    // Generate a unique ID for this video
    const videoId = uuidv4();
    
    // Call the service to generate the video
    const result = await textToVideoService.generateVideo({
      videoId,
      script,
      voiceType,
      templateStyle,
      bgMusic,
      customOptions
    });
    
    res.status(201).json({
      success: true,
      message: 'Video generated successfully',
      data: result
    });
  } catch (error) {
    console.error('Error generating video:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating video',
      error: error.message
    });
  }
};

/**
 * Get available voice options
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getVoiceOptions = async (req, res) => {
  try {
    const voicesPath = path.join(__dirname, '../../data/voices');
    
    // Check if directory exists
    if (!fs.existsSync(voicesPath)) {
      return res.status(200).json({
        success: true,
        data: [
          { id: 'male1', name: 'Male Voice 1', gender: 'male' },
          { id: 'female1', name: 'Female Voice 1', gender: 'female' },
          { id: 'male2', name: 'Male Voice 2', gender: 'male' },
          { id: 'female2', name: 'Female Voice 2', gender: 'female' }
        ]
      });
    }
    
    // Get voice options from service
    const voices = await textToVideoService.getVoiceOptions();
    
    res.status(200).json({
      success: true,
      data: voices
    });
  } catch (error) {
    console.error('Error fetching voice options:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching voice options',
      error: error.message
    });
  }
};

/**
 * Get available template options
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getTemplateOptions = async (req, res) => {
  try {
    const templatesPath = path.join(__dirname, '../../data/templates');
    
    // Check if directory exists
    if (!fs.existsSync(templatesPath)) {
      return res.status(200).json({
        success: true,
        data: [
          { id: 'modern', name: 'Modern', description: 'Clean and modern style' },
          { id: 'corporate', name: 'Corporate', description: 'Professional business style' },
          { id: 'creative', name: 'Creative', description: 'Artistic and creative style' },
          { id: 'minimal', name: 'Minimal', description: 'Simple and minimalistic style' }
        ]
      });
    }
    
    // Get template options from service
    const templates = await textToVideoService.getTemplateOptions();
    
    res.status(200).json({
      success: true,
      data: templates
    });
  } catch (error) {
    console.error('Error fetching template options:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching template options',
      error: error.message
    });
  }
};