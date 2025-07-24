<template>
  <div class="app">
    <header class="header">
      <div class="container">
        <div class="logo">
          <router-link to="/">
            <h1>Tejas</h1>
            <span>AI Video Creator</span>
          </router-link>
        </div>
        <nav class="nav">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/text-to-video" class="nav-link">Text to Video</router-link>
          <router-link to="/image-to-video" class="nav-link">Image to Video</router-link>
          <router-link to="/gallery" class="nav-link">Gallery</router-link>
        </nav>
      </div>
    </header>

    <main class="main">
      <router-view />
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; 2023 Tejas AI Video Creator. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.logo a {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: #3B82F6;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.logo span {
  font-size: 0.875rem;
  color: #6B7280;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #4B5563;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #3B82F6;
}

.main {
  flex: 1;
  padding: 2rem 0;
}

.footer {
  background-color: #F3F4F6;
  padding: 1.5rem 0;
  text-align: center;
  color: #6B7280;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (max-width: 768px) {
  .header .container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav {
    width: 100%;
    justify-content: space-between;
  }
}
</style>