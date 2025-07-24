<template>
  <div class="container">
    <h1 class="page-title mb-4">Your Video Gallery</h1>
    
    <div class="gallery-controls mb-4">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search videos..."
          class="form-control"
        >
      </div>
      
      <div class="filter-options">
        <select v-model="filterType" class="form-control">
          <option value="all">All Videos</option>
          <option value="text">Text to Video</option>
          <option value="image">Image to Video</option>
        </select>
      </div>
      
      <div class="sort-options">
        <select v-model="sortBy" class="form-control">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="duration">Duration</option>
        </select>
      </div>
    </div>
    
    <div v-if="filteredVideos.length === 0" class="empty-gallery">
      <div class="empty-gallery-content">
        <div class="empty-icon">🎬</div>
        <h2>No Videos Yet</h2>
        <p>Create your first video using our Text to Video or Image to Video tools!</p>
        <div class="empty-actions">
          <router-link to="/text-to-video" class="btn btn-primary mr-3">Text to Video</router-link>
          <router-link to="/image-to-video" class="btn btn-secondary">Image to Video</router-link>
        </div>
      </div>
    </div>
    
    <div v-else class="gallery-grid">
      <div 
        v-for="video in filteredVideos" 
        :key="video.id"
        class="video-card"
      >
        <div class="video-thumbnail" @click="previewVideo(video)">
          <img :src="video.thumbnail" :alt="video.title">
          <div class="video-duration">{{ video.duration }}</div>
          <div class="video-play-button">
            <span class="play-icon">▶</span>
          </div>
        </div>
        
        <div class="video-info">
          <h3 class="video-title">{{ video.title }}</h3>
          <p class="video-date">{{ formatDate(video.created) }}</p>
          <div class="video-type-badge" :class="video.type">
            {{ video.type === 'text' ? 'Text to Video' : 'Image to Video' }}
          </div>
        </div>
        
        <div class="video-actions">
          <button @click="downloadVideo(video)" class="btn btn-sm btn-primary">
            Download
          </button>
          <button @click="shareVideo(video)" class="btn btn-sm btn-secondary">
            Share
          </button>
          <button @click="deleteVideo(video)" class="btn btn-sm btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
    
    <div class="ad-placeholder mt-5">
      Advertisement Space
    </div>
    
    <div v-if="selectedVideo" class="video-preview-modal">
      <div class="modal-backdrop" @click="closePreview"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ selectedVideo.title }}</h3>
          <button class="close-button" @click="closePreview">×</button>
        </div>
        <div class="modal-body">
          <div class="video-player">
            <video controls>
              <source :src="selectedVideo.url" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
          
          <div class="video-details mt-3">
            <p><strong>Created:</strong> {{ formatDate(selectedVideo.created) }}</p>
            <p><strong>Duration:</strong> {{ selectedVideo.duration }}</p>
            <p><strong>Type:</strong> {{ selectedVideo.type === 'text' ? 'Text to Video' : 'Image to Video' }}</p>
          </div>
          
          <div class="modal-actions mt-4">
            <button @click="downloadVideo(selectedVideo)" class="btn btn-primary mr-3">
              Download Video
            </button>
            <button @click="shareVideo(selectedVideo)" class="btn btn-secondary">
              Share Video
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  data() {
    return {
      videos: [
        // Sample data - in a real app, this would come from localStorage or an API
        {
          id: 'video1',
          title: 'Company Introduction',
          thumbnail: 'https://via.placeholder.com/300x200',
          url: 'https://example.com/sample-video1.mp4',
          duration: '00:45',
          type: 'text',
          created: '2023-07-15T10:30:00Z'
        },
        {
          id: 'video2',
          title: 'Summer Vacation Memories',
          thumbnail: 'https://via.placeholder.com/300x200',
          url: 'https://example.com/sample-video2.mp4',
          duration: '01:20',
          type: 'image',
          created: '2023-07-20T14:15:00Z'
        },
        {
          id: 'video3',
          title: 'Product Showcase',
          thumbnail: 'https://via.placeholder.com/300x200',
          url: 'https://example.com/sample-video3.mp4',
          duration: '00:30',
          type: 'text',
          created: '2023-07-25T09:45:00Z'
        }
      ],
      searchQuery: '',
      filterType: 'all',
      sortBy: 'newest',
      selectedVideo: null
    }
  },
  computed: {
    filteredVideos() {
      let result = [...this.videos]
      
      // Apply search filter
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase()
        result = result.filter(video => 
          video.title.toLowerCase().includes(query)
        )
      }
      
      // Apply type filter
      if (this.filterType !== 'all') {
        result = result.filter(video => video.type === this.filterType)
      }
      
      // Apply sorting
      result.sort((a, b) => {
        if (this.sortBy === 'newest') {
          return new Date(b.created) - new Date(a.created)
        } else if (this.sortBy === 'oldest') {
          return new Date(a.created) - new Date(b.created)
        } else if (this.sortBy === 'duration') {
          return a.duration.localeCompare(b.duration)
        }
        return 0
      })
      
      return result
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    },
    
    previewVideo(video) {
      this.selectedVideo = video
    },
    
    closePreview() {
      this.selectedVideo = null
    },
    
    downloadVideo(video) {
      // In a real app, this would trigger the actual download
      alert(`Downloading video: ${video.title}`)
    },
    
    shareVideo(video) {
      // In a real app, this would open sharing options
      alert(`Share options for: ${video.title}`)
    },
    
    deleteVideo(video) {
      if (confirm(`Are you sure you want to delete "${video.title}"?`)) {
        // In a real app, this would remove from storage
        this.videos = this.videos.filter(v => v.id !== video.id)
      }
    }
  },
  mounted() {
    // In a real app, this would load videos from localStorage or an API
    console.log('Gallery component mounted')
  }
}
</script>

<style scoped>
.page-title {
  font-size: 2rem;
  color: #1F2937;
}

.gallery-controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-box {
  flex: 2;
  min-width: 200px;
}

.filter-options,
.sort-options {
  flex: 1;
  min-width: 150px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.video-card {
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.video-thumbnail {
  position: relative;
  aspect-ratio: 16 / 9;
  background-color: #000;
  cursor: pointer;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-duration {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
}

.video-play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background-color: rgba(59, 130, 246, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.video-thumbnail:hover .video-play-button {
  opacity: 1;
}

.play-icon {
  color: white;
  font-size: 1.5rem;
}

.video-info {
  padding: 1rem;
}

.video-title {
  font-size: 1.125rem;
  margin: 0 0 0.5rem 0;
  color: #1F2937;
}

.video-date {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0 0 0.5rem 0;
}

.video-type-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.video-type-badge.text {
  background-color: #EFF6FF;
  color: #3B82F6;
}

.video-type-badge.image {
  background-color: #F0FDF4;
  color: #10B981;
}

.video-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0 1rem 1rem 1rem;
}

.btn-danger {
  background-color: #EF4444;
  color: white;
}

.btn-danger:hover {
  background-color: #DC2626;
}

.empty-gallery {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.empty-gallery-content {
  text-align: center;
  padding: 2rem;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.video-preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #E5E7EB;
}

.modal-header h3 {
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6B7280;
}

.modal-body {
  padding: 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
}

@media (max-width: 768px) {
  .gallery-controls {
    flex-direction: column;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .modal-actions .btn {
    width: 100%;
  }
  
  .empty-actions {
    flex-direction: column;
  }
  
  .empty-actions .btn {
    width: 100%;
  }
}
</style>