<template>
  <div class="container">
    <h1 class="page-title mb-4">Text to Video</h1>
    
    <div class="row">
      <div class="col-12 col-md-8">
        <div class="card mb-4">
          <div class="card-body">
            <form @submit.prevent="generateVideo">
              <div class="form-group">
                <label for="scriptText" class="form-label">Enter your script</label>
                <textarea 
                  id="scriptText" 
                  v-model="formData.text" 
                  class="form-control" 
                  placeholder="Type or paste your script here..."
                  required
                ></textarea>
              </div>
              
              <div class="row">
                <div class="col-12 col-md-6">
                  <div class="form-group">
                    <label for="voiceType" class="form-label">Voice Type</label>
                    <select id="voiceType" v-model="formData.voice" class="form-control">
                      <option value="male_1">Male Voice 1</option>
                      <option value="male_2">Male Voice 2</option>
                      <option value="female_1">Female Voice 1</option>
                      <option value="female_2">Female Voice 2</option>
                    </select>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="form-group">
                    <label for="templateStyle" class="form-label">Template Style</label>
                    <select id="templateStyle" v-model="formData.template" class="form-control">
                      <option value="professional">Professional</option>
                      <option value="casual">Casual</option>
                      <option value="explainer">Explainer Video</option>
                      <option value="storytelling">Storytelling</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label class="form-label">Customization Options</label>
                <div class="customization-options">
                  <div class="option">
                    <label for="fontStyle" class="option-label">Font Style</label>
                    <select id="fontStyle" v-model="formData.fontStyle" class="form-control">
                      <option value="modern">Modern</option>
                      <option value="classic">Classic</option>
                      <option value="playful">Playful</option>
                    </select>
                  </div>
                  
                  <div class="option">
                    <label for="textColor" class="option-label">Text Color</label>
                    <input type="color" id="textColor" v-model="formData.textColor" class="form-control color-picker">
                  </div>
                  
                  <div class="option">
                    <label for="bgColor" class="option-label">Background Color</label>
                    <input type="color" id="bgColor" v-model="formData.bgColor" class="form-control color-picker">
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label class="form-label">Background Music</label>
                <div class="music-options">
                  <div 
                    v-for="(music, index) in backgroundMusic" 
                    :key="index"
                    class="music-option"
                    :class="{ 'selected': formData.music === music.id }"
                    @click="formData.music = music.id"
                  >
                    <div class="music-icon">
                      <span class="icon">♫</span>
                    </div>
                    <div class="music-info">
                      <h4>{{ music.name }}</h4>
                      <p>{{ music.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn btn-primary btn-lg" :disabled="isGenerating">
                  <span v-if="isGenerating">Generating Video...</span>
                  <span v-else>Generate Video</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div class="col-12 col-md-4">
        <div class="ad-placeholder mb-4">
          Advertisement Space
        </div>
        
        <div class="card tips-card">
          <div class="card-header">
            <h3 class="mb-0">Tips for Great Videos</h3>
          </div>
          <div class="card-body">
            <ul class="tips-list">
              <li>Keep your script concise and focused</li>
              <li>Use simple language for better voice synthesis</li>
              <li>Choose a template that matches your content's tone</li>
              <li>Add pauses with commas and periods</li>
              <li>Preview before finalizing to ensure quality</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="generatedVideo" class="video-result mt-5">
      <h2 class="mb-4">Your Generated Video</h2>
      <div class="video-player mb-4">
        <video controls>
          <source :src="generatedVideo.url" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div class="video-actions">
        <button @click="downloadVideo" class="btn btn-primary btn-lg mr-3">
          <span class="icon">↓</span> Download Video
        </button>
        <button @click="shareVideo" class="btn btn-secondary btn-lg">
          <span class="icon">↗</span> Share Video
        </button>
      </div>
    </div>
    
    <div v-if="isGenerating" class="loading-overlay">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p class="loading-text">Generating your video...</p>
        <p class="loading-subtext">This may take a minute or two</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextToVideo',
  data() {
    return {
      formData: {
        text: '',
        voice: 'female_1',
        template: 'professional',
        fontStyle: 'modern',
        textColor: '#ffffff',
        bgColor: '#3B82F6',
        music: 'upbeat'
      },
      backgroundMusic: [
        { id: 'upbeat', name: 'Upbeat', description: 'Energetic and positive' },
        { id: 'relaxed', name: 'Relaxed', description: 'Calm and soothing' },
        { id: 'corporate', name: 'Corporate', description: 'Professional and clean' },
        { id: 'inspirational', name: 'Inspirational', description: 'Motivational and uplifting' }
      ],
      isGenerating: false,
      generatedVideo: null,
      error: null
    }
  },
  methods: {
    async generateVideo() {
      this.isGenerating = true
      this.error = null
      
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        // Mock response
        this.generatedVideo = {
          id: 'video_' + Date.now(),
          url: 'https://example.com/sample-video.mp4',
          duration: '00:30',
          created: new Date().toISOString()
        }
        
        // Save to history/gallery
        this.saveToGallery(this.generatedVideo)
      } catch (err) {
        this.error = 'Failed to generate video. Please try again.'
        console.error(err)
      } finally {
        this.isGenerating = false
      }
    },
    
    downloadVideo() {
      // In a real app, this would trigger the actual download
      alert('Downloading video: ' + this.generatedVideo.url)
    },
    
    shareVideo() {
      // In a real app, this would open sharing options
      alert('Share options for: ' + this.generatedVideo.url)
    },
    
    saveToGallery(video) {
      // In a real app, this would save to local storage or user account
      console.log('Saved to gallery:', video)
    }
  }
}
</script>

<style scoped>
.page-title {
  font-size: 2rem;
  color: #1F2937;
}

.customization-options {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.option {
  flex: 1;
  min-width: 150px;
}

.option-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.color-picker {
  height: 40px;
  padding: 0;
  border: none;
}

.music-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.music-option {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
}

.music-option:hover {
  border-color: #3B82F6;
  background-color: #F9FAFB;
}

.music-option.selected {
  border-color: #3B82F6;
  background-color: #EFF6FF;
}

.music-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #3B82F6;
  border-radius: 50%;
  margin-right: 1rem;
  color: white;
  font-size: 1.25rem;
}

.music-info h4 {
  margin: 0;
  font-size: 1rem;
}

.music-info p {
  margin: 0;
  font-size: 0.875rem;
  color: #6B7280;
}

.form-actions {
  margin-top: 2rem;
}

.tips-list {
  padding-left: 1.5rem;
}

.tips-list li {
  margin-bottom: 0.75rem;
}

.video-actions {
  display: flex;
  gap: 1rem;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-content {
  text-align: center;
}

.loading-text {
  margin-top: 1rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: #1F2937;
}

.loading-subtext {
  color: #6B7280;
}

@media (max-width: 768px) {
  .customization-options,
  .video-actions {
    flex-direction: column;
  }
  
  .video-actions .btn {
    width: 100%;
  }
}
</style>