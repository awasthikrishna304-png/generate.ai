<template>
  <div class="text-to-video-page py-8">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold mb-4">Text to Video Creator</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Transform your script into a professional video with AI-generated visuals and voiceovers.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form Section -->
        <div class="lg:col-span-2">
          <div class="card p-6">
            <form @submit.prevent="generateVideo" class="space-y-6">
              <!-- Script Input -->
              <div class="form-group">
                <label for="script" class="form-label">Your Script</label>
                <textarea 
                  id="script" 
                  v-model="formData.script" 
                  rows="6" 
                  class="form-textarea" 
                  placeholder="Enter your video script here..."
                  required
                ></textarea>
                <p class="text-sm text-gray-500 mt-1">{{ formData.script.length }}/1000 characters</p>
              </div>

              <!-- Voice Selection -->
              <div class="form-group">
                <label for="voice" class="form-label">Voice Type</label>
                <select id="voice" v-model="formData.voice" class="form-select" required>
                  <option value="" disabled>Select a voice type</option>
                  <option v-for="voice in voiceOptions" :key="voice.id" :value="voice.id">
                    {{ voice.name }}
                  </option>
                </select>
              </div>

              <!-- Template Selection -->
              <div class="form-group">
                <label for="template" class="form-label">Template Style</label>
                <select id="template" v-model="formData.template" class="form-select" required>
                  <option value="" disabled>Select a template style</option>
                  <option v-for="template in templateOptions" :key="template.id" :value="template.id">
                    {{ template.name }}
                  </option>
                </select>
              </div>

              <!-- Background Music Selection -->
              <div class="form-group">
                <label for="bgMusic" class="form-label">Background Music</label>
                <select id="bgMusic" v-model="formData.bgMusic" class="form-select">
                  <option value="">None</option>
                  <option v-for="music in bgMusicOptions" :key="music.id" :value="music.id">
                    {{ music.name }}
                  </option>
                </select>
              </div>

              <!-- Submit Button -->
              <div class="form-group">
                <button 
                  type="submit" 
                  class="btn btn-primary w-full" 
                  :disabled="isGenerating"
                >
                  <span v-if="isGenerating" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Video...
                  </span>
                  <span v-else>Generate Video</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Preview Section -->
        <div class="lg:col-span-1">
          <div class="card p-6 h-full">
            <h3 class="text-xl font-semibold mb-4">Preview</h3>
            
            <div v-if="generatedVideo" class="space-y-4">
              <div class="aspect-video bg-gray-100 rounded overflow-hidden relative">
                <video 
                  ref="videoPlayer" 
                  class="w-full h-full" 
                  controls
                  :src="`/api/videos/${generatedVideo.id}`"
                ></video>
              </div>
              
              <div class="space-y-2">
                <h4 class="font-medium">{{ generatedVideo.title }}</h4>
                <p class="text-sm text-gray-500">Created: {{ formatDate(generatedVideo.createdAt) }}</p>
                <p class="text-sm text-gray-500">Duration: {{ formatDuration(generatedVideo.duration) }}</p>
              </div>
              
              <div class="flex space-x-2">
                <a 
                  :href="`/api/videos/${generatedVideo.id}/download`" 
                  class="btn btn-primary btn-sm"
                  download
                >
                  Download
                </a>
                <button 
                  @click="resetForm" 
                  class="btn btn-secondary btn-sm"
                >
                  Create New
                </button>
              </div>
            </div>
            
            <div v-else-if="isGenerating" class="flex flex-col items-center justify-center space-y-4 py-8">
              <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p class="text-gray-600">{{ generationStatus }}</p>
            </div>
            
            <div v-else class="flex flex-col items-center justify-center space-y-4 py-8 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p class="text-center">Fill out the form and generate a video to see the preview here</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recently Created Videos -->
      <div v-if="recentVideos.length > 0" class="mt-16">
        <h2 class="text-2xl font-bold mb-6">Your Recent Videos</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="video in recentVideos" :key="video.id" class="card overflow-hidden shadow-hover">
            <div class="aspect-video bg-gray-100 relative overflow-hidden">
              <img 
                :src="`/api/videos/${video.id}/thumbnail`" 
                :alt="video.title" 
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button 
                  @click="playVideo(video)" 
                  class="bg-white bg-opacity-90 rounded-full p-3 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-medium text-truncate">{{ video.title }}</h3>
              <p class="text-sm text-gray-500">{{ formatDate(video.createdAt) }}</p>
              <div class="mt-3 flex justify-between">
                <a 
                  :href="`/api/videos/${video.id}/download`" 
                  class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  download
                >
                  Download
                </a>
                <button 
                  @click="deleteVideo(video.id)" 
                  class="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Video Modal -->
    <div v-if="selectedVideo" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg overflow-hidden max-w-4xl w-full">
        <div class="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 class="font-medium">{{ selectedVideo.title }}</h3>
          <button @click="selectedVideo = null" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="aspect-video bg-black">
          <video 
            ref="modalVideoPlayer" 
            class="w-full h-full" 
            controls 
            autoplay
            :src="`/api/videos/${selectedVideo.id}`"
          ></video>
        </div>
        <div class="p-4 border-t border-gray-200 flex justify-end space-x-2">
          <a 
            :href="`/api/videos/${selectedVideo.id}/download`" 
            class="btn btn-primary btn-sm"
            download
          >
            Download
          </a>
          <button @click="selectedVideo = null" class="btn btn-secondary btn-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

// State
const formData = ref({
  script: '',
  voice: '',
  template: '',
  bgMusic: ''
});

const voiceOptions = ref([]);
const templateOptions = ref([]);
const bgMusicOptions = ref([]);
const isGenerating = ref(false);
const generationStatus = ref('');
const generatedVideo = ref(null);
const recentVideos = ref([]);
const selectedVideo = ref(null);
const videoPlayer = ref(null);
const modalVideoPlayer = ref(null);

// Fetch options on component mount
onMounted(async () => {
  try {
    const [voicesRes, templatesRes, bgMusicRes, videosRes] = await Promise.all([
      axios.get('/api/text-to-video/voices'),
      axios.get('/api/text-to-video/templates'),
      axios.get('/api/videos/bg-music'),
      axios.get('/api/videos')
    ]);
    
    voiceOptions.value = voicesRes.data;
    templateOptions.value = templatesRes.data;
    bgMusicOptions.value = bgMusicRes.data;
    
    // Filter only text-to-video type videos
    recentVideos.value = videosRes.data.filter(video => video.type === 'text-to-video');
  } catch (error) {
    console.error('Error fetching options:', error);
  }
});

// Watch for selected video changes to handle video player
watch(selectedVideo, (newVal) => {
  if (newVal) {
    // Wait for DOM update before playing
    setTimeout(() => {
      if (modalVideoPlayer.value) {
        modalVideoPlayer.value.play();
      }
    }, 100);
  } else {
    // Stop video when modal is closed
    if (modalVideoPlayer.value) {
      modalVideoPlayer.value.pause();
    }
  }
});

// Methods
async function generateVideo() {
  if (!formData.value.script || !formData.value.voice || !formData.value.template) {
    alert('Please fill out all required fields');
    return;
  }
  
  isGenerating.value = true;
  generationStatus.value = 'Generating video content...';
  
  try {
    // Simulate generation stages
    await new Promise(resolve => setTimeout(resolve, 1000));
    generationStatus.value = 'Creating voiceover...';
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    generationStatus.value = 'Assembling video...';
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    generationStatus.value = 'Finalizing...';
    
    // Send request to API
    const response = await axios.post('/api/text-to-video/generate', {
      script: formData.value.script,
      voiceId: formData.value.voice,
      templateId: formData.value.template,
      bgMusicId: formData.value.bgMusic || null
    });
    
    generatedVideo.value = response.data;
    
    // Add to recent videos
    if (!recentVideos.value.find(v => v.id === response.data.id)) {
      recentVideos.value.unshift(response.data);
    }
    
    // Refresh videos list
    const videosRes = await axios.get('/api/videos');
    recentVideos.value = videosRes.data.filter(video => video.type === 'text-to-video');
  } catch (error) {
    console.error('Error generating video:', error);
    alert('Failed to generate video. Please try again.');
  } finally {
    isGenerating.value = false;
  }
}

function resetForm() {
  formData.value = {
    script: '',
    voice: '',
    template: '',
    bgMusic: ''
  };
  generatedVideo.value = null;
}

function playVideo(video) {
  selectedVideo.value = video;
}

async function deleteVideo(id) {
  if (!confirm('Are you sure you want to delete this video?')) return;
  
  try {
    await axios.delete(`/api/videos/${id}`);
    
    // Remove from recent videos
    recentVideos.value = recentVideos.value.filter(v => v.id !== id);
    
    // Close modal if the deleted video is currently selected
    if (selectedVideo.value && selectedVideo.value.id === id) {
      selectedVideo.value = null;
    }
    
    // Reset generated video if it's the one being deleted
    if (generatedVideo.value && generatedVideo.value.id === id) {
      generatedVideo.value = null;
    }
  } catch (error) {
    console.error('Error deleting video:', error);
    alert('Failed to delete video. Please try again.');
  }
}

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>