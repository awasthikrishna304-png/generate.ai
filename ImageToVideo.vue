<template>
  <div class="container">
    <h1 class="page-title mb-4">Image to Video</h1>
    
    <div class="row">
      <div class="col-12 col-md-8">
        <div class="card mb-4">
          <div class="card-body">
            <form @submit.prevent="generateVideo">
              <div class="form-group">
                <label class="form-label">Upload Images</label>
                <div class="image-upload-container">
                  <div 
                    class="image-upload-box"
                    @click="triggerFileInput"
                    @dragover.prevent="onDragOver"
                    @dragleave.prevent="onDragLeave"
                    @drop.prevent="onDrop"
                    :class="{ 'dragging': isDragging }"
                  >
                    <input 
                      type="file" 
                      ref="fileInput" 
                      multiple 
                      accept="image/*" 
                      @change="onFileSelected"
                      class="file-input"
                    >
                    <div class="upload-icon">+</div>
                    <p class="upload-text">Drag & drop images here or click to browse</p>
                    <p class="upload-hint">Supports JPG, PNG, GIF (max 10 images)</p>
                  </div>
                </div>
              </div>
              
              <div v-if="selectedImages.length > 0" class="selected-images mb-4">
                <h3 class="mb-3">Selected Images ({{ selectedImages.length }})</h3>
                <div class="image-preview-container">
                  <div 
                    v-for="(image, index) in selectedImages" 
                    :key="index"
                    class="image-preview-item"
                  >
                    <div class="image-preview">
                      <img :src="image.preview" :alt="`Image ${index + 1}`">
                    </div>
                    <div class="image-preview-controls">
                      <input 
                        type="number" 
                        v-model="image.duration" 
                        min="1" 
                        max="10"
                        class="duration-input"
                      >
                      <span class="duration-label">sec</span>
                      <button 
                        type="button" 
                        class="remove-btn" 
                        @click="removeImage(index)"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
                <div class="image-order-controls mt-3">
                  <button type="button" class="btn btn-secondary btn-sm" @click="reorderImages('up')">
                    Move Up
                  </button>
                  <button type="button" class="btn btn-secondary btn-sm" @click="reorderImages('down')">
                    Move Down
                  </button>
                </div>
              </div>
              
              <div class="form-group">
                <label class="form-label">Transition Style</label>
                <div class="transition-options">
                  <div 
                    v-for="(transition, index) in transitions" 
                    :key="index"
                    class="transition-option"
                    :class="{ 'selected': formData.transition === transition.id }"
                    @click="formData.transition = transition.id"
                  >
                    <div class="transition-preview">
                      <span class="transition-icon">{{ transition.icon }}</span>
                    </div>
                    <div class="transition-name">{{ transition.name }}</div>
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
              
              <div class="form-group">
                <label for="customAudio" class="form-label">Or Upload Your Own Audio (Optional)</label>
                <input 
                  type="file" 
                  id="customAudio" 
                  @change="onAudioSelected"
                  accept="audio/*"
                  class="form-control"
                >
              </div>
              
              <div class="form-actions">
                <button 
                  type="submit" 
                  class="btn btn-primary btn-lg" 
                  :disabled="isGenerating || selectedImages.length === 0"
                >
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
            <h3 class="mb-0">Tips for Great Slideshows</h3>
          </div>
          <div class="card-body">
            <ul class="tips-list">
              <li>Use high-quality images for best results</li>
              <li>Arrange images to tell a cohesive story</li>
              <li>Adjust duration based on image complexity</li>
              <li>Choose music that matches the mood of your images</li>
              <li>Use consistent image dimensions when possible</li>
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
  name: 'ImageToVideo',
  data() {
    return {
      formData: {
        transition: 'fade',
        music: 'upbeat',
        customAudio: null
      },
      selectedImages: [],
      transitions: [
        { id: 'fade', name: 'Fade', icon: '⟿' },
        { id: 'slide', name: 'Slide', icon: '→' },
        { id: 'zoom', name: 'Zoom', icon: '⊕' },
        { id: 'dissolve', name: 'Dissolve', icon: '∿' }
      ],
      backgroundMusic: [
        { id: 'upbeat', name: 'Upbeat', description: 'Energetic and positive' },
        { id: 'relaxed', name: 'Relaxed', description: 'Calm and soothing' },
        { id: 'corporate', name: 'Corporate', description: 'Professional and clean' },
        { id: 'inspirational', name: 'Inspirational', description: 'Motivational and uplifting' }
      ],
      isDragging: false,
      isGenerating: false,
      generatedVideo: null,
      error: null
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    
    onDragOver(e) {
      this.isDragging = true
    },
    
    onDragLeave(e) {
      this.isDragging = false
    },
    
    onDrop(e) {
      this.isDragging = false
      const files = e.dataTransfer.files
      if (files.length) {
        this.processFiles(files)
      }
    },
    
    onFileSelected(e) {
      const files = e.target.files
      if (files.length) {
        this.processFiles(files)
      }
    },
    
    processFiles(files) {
      // Convert FileList to Array and filter for images
      const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'))
      
      // Limit to 10 images
      const totalImages = this.selectedImages.length + imageFiles.length
      const imagesToAdd = imageFiles.slice(0, Math.max(0, 10 - this.selectedImages.length))
      
      // Create preview URLs and add to selectedImages
      imagesToAdd.forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.selectedImages.push({
            file: file,
            preview: e.target.result,
            duration: 3 // Default duration in seconds
          })
        }
        reader.readAsDataURL(file)
      })
      
      // Reset file input
      this.$refs.fileInput.value = ''
    },
    
    removeImage(index) {
      this.selectedImages.splice(index, 1)
    },
    
    reorderImages(direction) {
      // This would be implemented to allow reordering of images
      // For now, just a placeholder
      console.log(`Reorder images ${direction}`)
    },
    
    onAudioSelected(e) {
      const file = e.target.files[0]
      if (file && file.type.startsWith('audio/')) {
        this.formData.customAudio = file
        this.formData.music = 'custom' // Switch to custom audio
      }
    },
    
    async generateVideo() {
      if (this.selectedImages.length === 0) {
        this.error = 'Please select at least one image'
        return
      }
      
      this.isGenerating = true
      this.error = null
      
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        // Mock response
        this.generatedVideo = {
          id: 'video_' + Date.now(),
          url: 'https://example.com/sample-slideshow.mp4',
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

.image-upload-container {
  margin-bottom: 1.5rem;
}

.image-upload-box {
  border: 2px dashed #D1D5DB;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.image-upload-box:hover,
.image-upload-box.dragging {
  border-color: #3B82F6;
  background-color: #F9FAFB;
}

.file-input {
  display: none;
}

.upload-icon {
  font-size: 2.5rem;
  color: #9CA3AF;
  margin-bottom: 1rem;
}

.upload-text {
  font-size: 1.125rem;
  color: #4B5563;
  margin-bottom: 0.5rem;
}

.upload-hint {
  font-size: 0.875rem;
  color: #6B7280;
}

.selected-images {
  margin-top: 1.5rem;
}

.image-preview-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.image-preview-item {
  border: 1px solid #E5E7EB;
  border-radius: 0.375rem;
  overflow: hidden;
}

.image-preview {
  height: 120px;
  overflow: hidden;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-preview-controls {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: #F9FAFB;
}

.duration-input {
  width: 40px;
  padding: 0.25rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.25rem;
  text-align: center;
}

.duration-label {
  margin-left: 0.25rem;
  font-size: 0.875rem;
  color: #6B7280;
}

.remove-btn {
  margin-left: auto;
  background: none;
  border: none;
  color: #EF4444;
  font-size: 1.25rem;
  cursor: pointer;
}

.image-order-controls {
  display: flex;
  gap: 0.5rem;
}

.transition-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.transition-option {
  border: 1px solid #E5E7EB;
  border-radius: 0.375rem;
  padding: 1rem 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.transition-option:hover {
  border-color: #3B82F6;
  background-color: #F9FAFB;
}

.transition-option.selected {
  border-color: #3B82F6;
  background-color: #EFF6FF;
}

.transition-preview {
  margin-bottom: 0.5rem;
}

.transition-icon {
  font-size: 1.5rem;
  color: #3B82F6;
}

.transition-name {
  font-size: 0.875rem;
  color: #4B5563;
}

.music-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
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
  .video-actions {
    flex-direction: column;
  }
  
  .video-actions .btn {
    width: 100%;
  }
}
</style>