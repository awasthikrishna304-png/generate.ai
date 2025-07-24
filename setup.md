# Tejas AI Video Creator - Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v14.x or higher)
- npm (v6.x or higher) or yarn (v1.22.x or higher)
- FFmpeg (for video processing)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tejas-ai-video-creator
```

### 2. Install Dependencies

```bash
# Install server dependencies
npm install

# Install client dependencies
cd frontend
npm install
cd ..
```

Alternatively, you can use the scripts in package.json:

```bash
npm run install-all
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Server Configuration
PORT=5000
NODE_ENV=development

# API Keys (Replace with your actual API keys)
GEMINI_API_KEY=your_gemini_api_key_here
DEEPSEEK_API_KEY=your_deepseek_api_key_here

# File Storage Configuration
MAX_FILE_SIZE=50mb
VIDEO_STORAGE_PATH=./videos
TEMPLATE_PATH=./data/templates
BG_MUSIC_PATH=./data/bg_music
VOICES_PATH=./data/voices
```

### 4. Create Required Directories

Ensure the following directories exist in your project:

```bash
mkdir -p videos data/bg_music data/templates data/voices
```

### 5. Install FFmpeg

FFmpeg is required for video processing. Install it based on your operating system:

#### Windows

1. Download FFmpeg from [ffmpeg.org](https://ffmpeg.org/download.html)
2. Extract the files to a location on your computer
3. Add the FFmpeg `bin` directory to your system PATH

#### macOS

Using Homebrew:

```bash
brew install ffmpeg
```

#### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install ffmpeg
```

## Running the Application

### Development Mode

To run the application in development mode with hot reloading:

```bash
# Run both frontend and backend concurrently
npm run dev

# Or run them separately
npm run server  # Backend only
npm run client  # Frontend only
```

### Production Mode

To build and run the application in production mode:

```bash
# Build the frontend
npm run build

# Start the server (which will serve the built frontend)
npm start
```

## Accessing the Application

Once the application is running, you can access it at:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000/api](http://localhost:5000/api)

## API Documentation

For detailed API documentation, refer to the [API Documentation](./api.md) file.

## Troubleshooting

### Common Issues

#### FFmpeg Not Found

If you encounter an error related to FFmpeg not being found, ensure that FFmpeg is properly installed and added to your system PATH.

#### API Key Issues

If you encounter errors related to the Gemini or DeepSeek APIs, verify that you have set the correct API keys in your `.env` file.

#### File Upload Issues

If you encounter issues with file uploads, check the following:

- Ensure the `MAX_FILE_SIZE` in your `.env` file is set appropriately
- Verify that the upload directories have the correct permissions
- Check that the file types being uploaded are supported

## Next Steps

After setting up the application, you may want to:

1. Add your own background music files to the `data/bg_music` directory
2. Create custom templates in the `data/templates` directory
3. Add voice samples to the `data/voices` directory
4. Customize the frontend UI to match your branding