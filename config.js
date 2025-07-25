/**
 * Configuration module for the application
 * Loads environment variables and provides configuration values
 */

require('dotenv').config();

module.exports = {
  // Server configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // API keys
  geminiApiKey: process.env.GEMINI_API_KEY,
  deepseekApiKey: process.env.DEEPSEEK_API_KEY,
  
  // File storage configuration
  maxFileSize: process.env.MAX_FILE_SIZE || '50mb',
  videoStoragePath: process.env.VIDEO_STORAGE_PATH || './videos',
  templatePath: process.env.TEMPLATE_PATH || './data/templates',
  bgMusicPath: process.env.BG_MUSIC_PATH || './data/bg_music',
  voicesPath: process.env.VOICES_PATH || './data/voices',
  
  // CORS configuration
  corsOrigin: process.env.CORS_ORIGIN || '*'
};