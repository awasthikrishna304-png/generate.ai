<template>
  <div class="container">
    <section class="hero mb-5">
      <div class="row">
        <div class="col-12 col-md-6">
          <h1 class="hero-title">Create Amazing Videos with AI</h1>
          <p class="hero-subtitle mb-4">
            Transform your text and images into professional-quality videos in minutes. No coding or design skills required.
          </p>
          <div class="hero-buttons">
            <router-link to="/text-to-video" class="btn btn-primary btn-lg mr-3">Text to Video</router-link>
            <router-link to="/image-to-video" class="btn btn-secondary btn-lg">Image to Video</router-link>
          </div>
        </div>
        <div class="col-12 col-md-6 mt-4 mt-md-0">
          <div class="hero-image">
            <img src="../assets/hero-image.svg" alt="Tejas AI Video Creator" />
          </div>
        </div>
      </div>
    </section>

    <section class="features mb-5">
      <h2 class="section-title text-center mb-4">How It Works</h2>
      <div class="row">
        <div class="col-12 col-md-4 mb-4">
          <div class="feature-card">
            <div class="feature-icon">
              <span class="icon">1</span>
            </div>
            <h3>Input Your Content</h3>
            <p>Enter your text or upload images that you want to transform into a video.</p>
          </div>
        </div>
        <div class="col-12 col-md-4 mb-4">
          <div class="feature-card">
            <div class="feature-icon">
              <span class="icon">2</span>
            </div>
            <h3>Customize Options</h3>
            <p>Select voice, style, music, and other options to personalize your video.</p>
          </div>
        </div>
        <div class="col-12 col-md-4 mb-4">
          <div class="feature-card">
            <div class="feature-icon">
              <span class="icon">3</span>
            </div>
            <h3>Generate & Download</h3>
            <p>Our AI creates your video in minutes. Preview and download in high quality.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="use-cases mb-5">
      <h2 class="section-title text-center mb-4">Perfect For</h2>
      <div class="row">
        <div class="col-6 col-md-3 mb-4">
          <div class="use-case-card">
            <h4>Social Media</h4>
            <p>Create engaging content for Instagram, TikTok, and more.</p>
          </div>
        </div>
        <div class="col-6 col-md-3 mb-4">
          <div class="use-case-card">
            <h4>Marketing</h4>
            <p>Produce professional ads and promotional videos.</p>
          </div>
        </div>
        <div class="col-6 col-md-3 mb-4">
          <div class="use-case-card">
            <h4>Education</h4>
            <p>Create instructional and educational content.</p>
          </div>
        </div>
        <div class="col-6 col-md-3 mb-4">
          <div class="use-case-card">
            <h4>Presentations</h4>
            <p>Turn your slides and notes into dynamic presentations.</p>
          </div>
        </div>
      </div>
    </section>

    <div class="ad-placeholder">
      Advertisement Space
    </div>

    <section class="cta mb-5">
      <div class="card">
        <div class="card-body text-center">
          <h2 class="mb-3">Ready to Create Your First Video?</h2>
          <p class="mb-4">No credit card required. Start creating amazing videos today.</p>
          <router-link to="/text-to-video" class="btn btn-primary btn-lg">Get Started Now</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.hero {
  padding: 3rem 0;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1F2937;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #4B5563;
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image img {
  max-width: 100%;
  height: auto;
}

.section-title {
  font-size: 2rem;
  color: #1F2937;
}

.feature-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  height: 100%;
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: #EFF6FF;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.feature-icon .icon {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3B82F6;
}

.use-case-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  height: 100%;
  transition: transform 0.3s, box-shadow 0.3s;
}

.use-case-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.use-case-card h4 {
  color: #3B82F6;
  margin-bottom: 0.5rem;
}

.cta .card {
  background-color: #EFF6FF;
  border: none;
  padding: 2rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .hero-buttons .btn {
    width: 100%;
  }
}
</style>