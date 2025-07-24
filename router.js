import { createRouter, createWebHistory } from 'vue-router'

// Import pages
import Home from './pages/Home.vue'
import TextToVideo from './pages/TextToVideo.vue'
import ImageToVideo from './pages/ImageToVideo.vue'
import Gallery from './pages/Gallery.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/text-to-video',
    name: 'TextToVideo',
    component: TextToVideo
  },
  {
    path: '/image-to-video',
    name: 'ImageToVideo',
    component: ImageToVideo
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router