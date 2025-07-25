<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="hero-content animate-slide-up">
            <h1 class="text-4xl md:text-5xl font-bold mb-6">Create Amazing Videos with AI</h1>
            <p class="text-xl mb-8 text-blue-100">
              Transform your text and images into professional-quality videos in minutes with our AI-powered video creator.
            </p>
            <div class="flex flex-wrap gap-4">
              <router-link to="/text-to-video" class="btn btn-lg bg-white text-blue-700 hover:bg-blue-50">
                Create from Text
              </router-link>
              <router-link to="/image-to-video" class="btn btn-lg bg-blue-700 text-white border border-white hover:bg-blue-600">
                Create from Images
              </router-link>
            </div>
          </div>
          <div class="hero-image hidden md:block">
            <div class="relative">
              <div class="absolute -top-6 -left-6 w-12 h-12 bg-blue-400 rounded-full opacity-50"></div>
              <div class="absolute -bottom-6 -right-6 w-12 h-12 bg-blue-400 rounded-full opacity-50"></div>
              <div class="bg-white p-4 rounded-lg shadow-lg">
                <div class="aspect-video bg-gray-100 rounded overflow-hidden relative">
                  <div class="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div class="mt-4">
                  <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform offers everything you need to create professional videos without any technical skills.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="feature-card card p-6 shadow-hover">
            <div class="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Text to Video</h3>
            <p class="text-gray-600">
              Turn your scripts into engaging videos with AI-generated visuals and professional voiceovers.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="feature-card card p-6 shadow-hover">
            <div class="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Image to Video</h3>
            <p class="text-gray-600">
              Transform your photos and images into dynamic videos with smooth transitions and background music.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="feature-card card p-6 shadow-hover">
            <div class="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Background Music</h3>
            <p class="text-gray-600">
              Choose from a variety of background music tracks to enhance the mood and engagement of your videos.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works-section py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Creating professional videos has never been easier. Follow these simple steps to get started.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="step-card relative">
            <div class="step-number absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">1</div>
            <div class="card p-6 pt-8">
              <h3 class="text-xl font-semibold mb-2">Choose Your Method</h3>
              <p class="text-gray-600">
                Select whether you want to create a video from text or from your images.
              </p>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="step-card relative">
            <div class="step-number absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">2</div>
            <div class="card p-6 pt-8">
              <h3 class="text-xl font-semibold mb-2">Customize Your Video</h3>
              <p class="text-gray-600">
                Add your content, select templates, voices, or transitions, and choose background music.
              </p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="step-card relative">
            <div class="step-number absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">3</div>
            <div class="card p-6 pt-8">
              <h3 class="text-xl font-semibold mb-2">Generate & Download</h3>
              <p class="text-gray-600">
                Let our AI create your video, then preview and download the final result.
              </p>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <router-link to="/text-to-video" class="btn btn-primary btn-lg">
            Get Started Now
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section py-16 bg-blue-600 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Create Amazing Videos?</h2>
        <p class="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
          Start creating professional-quality videos in minutes with our AI-powered platform.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link to="/text-to-video" class="btn btn-lg bg-white text-blue-700 hover:bg-blue-50">
            Create from Text
          </router-link>
          <router-link to="/image-to-video" class="btn btn-lg bg-blue-700 text-white border border-white hover:bg-blue-600">
            Create from Images
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Home component logic can be added here if needed
</script>

<style scoped>
.hero-section {
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('data:image/svg+xml;charset=utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"%3E%3Cpath fill="%23ffffff" fill-opacity="0.05" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"%3E%3C/path%3E%3C/svg%3E');
  background-size: cover;
  background-position: center;
  opacity: 0.1;
}

.feature-card:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}

.step-card {
  transition: transform 0.3s ease;
}

.step-card:hover {
  transform: translateY(-5px);
}
</style>