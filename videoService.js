const fs = require('fs');
const path = require('path');

/**
 * Get all videos
 * @returns {Array} - List of all videos
 */
exports.getAllVideos = async () => {
  try {
    const metadataPath = path.join(__dirname, '../../data/videos.json');
    
    // Check if metadata file exists
    if (!fs.existsSync(metadataPath)) {
      return [];
    }
    
    // Read metadata file
    const data = fs.readFileSync(metadataPath, 'utf8');
    const videos = JSON.parse(data);
    
    // Sort videos by creation date (newest first)
    return videos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error('Error getting all videos:', error);
    throw new Error(`Failed to get videos: ${error.message}`);
  }
};

/**
 * Get video by ID
 * @param {string} videoId - Video ID
 * @returns {Object|null} - Video object or null if not found
 */
exports.getVideoById = async (videoId) => {
  try {
    const metadataPath = path.join(__dirname, '../../data/videos.json');
    
    // Check if metadata file exists
    if (!fs.existsSync(metadataPath)) {
      return null;
    }
    
    // Read metadata file
    const data = fs.readFileSync(metadataPath, 'utf8');
    const videos = JSON.parse(data);
    
    // Find video by ID
    return videos.find(video => video.id === videoId) || null;
  } catch (error) {
    console.error(`Error getting video with ID ${videoId}:`, error);
    throw new Error(`Failed to get video: ${error.message}`);
  }
};

/**
 * Delete a video
 * @param {string} videoId - Video ID
 * @returns {boolean} - True if video was deleted, false if not found
 */
exports.deleteVideo = async (videoId) => {
  try {
    const metadataPath = path.join(__dirname, '../../data/videos.json');
    
    // Check if metadata file exists
    if (!fs.existsSync(metadataPath)) {
      return false;
    }
    
    // Read metadata file
    const data = fs.readFileSync(metadataPath, 'utf8');
    let videos = JSON.parse(data);
    
    // Find video by ID
    const videoIndex = videos.findIndex(video => video.id === videoId);
    if (videoIndex === -1) {
      return false;
    }
    
    const video = videos[videoIndex];
    
    // Delete video file
    if (video.filePath) {
      const videoFilePath = path.join(__dirname, '../../', video.filePath);
      if (fs.existsSync(videoFilePath)) {
        fs.unlinkSync(videoFilePath);
      }
    }
    
    // Delete thumbnail file
    if (video.thumbnailPath) {
      const thumbnailPath = path.join(__dirname, '../../', video.thumbnailPath);
      if (fs.existsSync(thumbnailPath)) {
        fs.unlinkSync(thumbnailPath);
      }
    }
    
    // Remove video from metadata
    videos.splice(videoIndex, 1);
    
    // Write updated metadata
    fs.writeFileSync(metadataPath, JSON.stringify(videos, null, 2));
    
    return true;
  } catch (error) {
    console.error(`Error deleting video with ID ${videoId}:`, error);
    throw new Error(`Failed to delete video: ${error.message}`);
  }
};

/**
 * Get background music options
 * @returns {Array} - List of background music options
 */
exports.getBgMusicOptions = async () => {
  try {
    const bgMusicPath = path.join(__dirname, '../../data/bg_music');
    
    // Check if directory exists
    if (!fs.existsSync(bgMusicPath)) {
      return [
        { id: 'upbeat', name: 'Upbeat', description: 'Energetic and positive music' },
        { id: 'relaxing', name: 'Relaxing', description: 'Calm and soothing music' },
        { id: 'corporate', name: 'Corporate', description: 'Professional business music' },
        { id: 'inspirational', name: 'Inspirational', description: 'Motivational and inspiring music' }
      ];
    }
    
    // Read directory and get music files
    const files = fs.readdirSync(bgMusicPath);
    
    // Filter out non-audio files and .gitkeep
    const audioFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.mp3', '.wav', '.ogg'].includes(ext) && file !== '.gitkeep';
    });
    
    // Map files to options
    return audioFiles.map(file => {
      const id = path.basename(file, path.extname(file));
      return {
        id,
        name: id.charAt(0).toUpperCase() + id.slice(1).replace(/_/g, ' '),
        description: `Background music: ${id}`,
        filePath: `data/bg_music/${file}`
      };
    });
  } catch (error) {
    console.error('Error getting background music options:', error);
    throw new Error(`Failed to get background music options: ${error.message}`);
  }
};