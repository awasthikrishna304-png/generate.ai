 Tejas AI Video Creator API Documentation#

This document provides information about the API endpoints available in the Tejas AI Video Creator application.

## Base URL

All API endpoints are relative to the base URL:

```
http://localhost:5000/api
```

## Authentication

Currently, the API does not require authentication. This may change in future versions.

## Endpoints

### Text to Video

#### Generate Video from Text

```
POST /text-to-video
```

**Request Body:**

```json
{
  "script": "Your video script text here",
  "voiceType": "male1",
  "templateStyle": "modern",
  "bgMusic": "upbeat",
  "customOptions": {
    "title": "My Custom Video",
    "textColor": "#333333",
    "backgroundColor": "#ffffff",
    "font": "Arial"
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Video generated successfully",
  "data": {
    "id": "video-uuid",
    "title": "My Custom Video",
    "type": "text-to-video",
    "createdAt": "2023-07-15T10:30:00.000Z",
    "duration": 30,
    "filePath": "videos/video-uuid.mp4",
    "thumbnailPath": "videos/video-uuid_thumbnail.jpg"
  }
}
```

#### Get Voice Options

```
GET /text-to-video/voices
```

**Response:**

```json
{
  "success": true,
  "data": [
    { "id": "male1", "name": "Male Voice 1", "gender": "male" },
    { "id": "female1", "name": "Female Voice 1", "gender": "female" },
    { "id": "male2", "name": "Male Voice 2", "gender": "male" },
    { "id": "female2", "name": "Female Voice 2", "gender": "female" }
  ]
}
```

#### Get Template Options

```
GET /text-to-video/templates
```

**Response:**

```json
{
  "success": true,
  "data": [
    { "id": "modern", "name": "Modern", "description": "Clean and modern style" },
    { "id": "corporate", "name": "Corporate", "description": "Professional business style" },
    { "id": "creative", "name": "Creative", "description": "Artistic and creative style" },
    { "id": "minimal", "name": "Minimal", "description": "Simple and minimalistic style" }
  ]
}
```

### Image to Video

#### Generate Video from Images

```
POST /image-to-video
```

**Request Body:**

This endpoint expects a `multipart/form-data` request with the following fields:

- `images`: Multiple image files (up to 20)
- `transitionStyle`: Type of transition between images (e.g., "fade", "slide")
- `bgMusic`: Background music option (e.g., "upbeat")
- `duration`: Duration for each image in seconds (default: 5)
- `customOptions`: JSON string with custom options

**Response:**

```json
{
  "success": true,
  "message": "Video generated successfully",
  "data": {
    "id": "video-uuid",
    "title": "Image Video",
    "type": "image-to-video",
    "createdAt": "2023-07-16T14:45:00.000Z",
    "duration": 25,
    "filePath": "videos/video-uuid.mp4",
    "thumbnailPath": "videos/video-uuid_thumbnail.jpg"
  }
}
```

#### Get Transition Options

```
GET /image-to-video/transitions
```

**Response:**

```json
{
  "success": true,
  "data": [
    { "id": "fade", "name": "Fade", "description": "Smooth fade transition between images" },
    { "id": "slide", "name": "Slide", "description": "Slide from one image to the next" },
    { "id": "zoom", "name": "Zoom", "description": "Zoom in/out between images" },
    { "id": "dissolve", "name": "Dissolve", "description": "Dissolve effect between images" },
    { "id": "wipe", "name": "Wipe", "description": "Wipe effect from one image to the next" }
  ]
}
```

### Videos

#### Get All Videos

```
GET /videos
```

**Response:**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "sample-text-video-1",
      "title": "Sample Text to Video",
      "type": "text-to-video",
      "createdAt": "2023-07-15T10:30:00.000Z",
      "duration": 30,
      "filePath": "videos/sample-text-video-1.mp4",
      "thumbnailPath": "videos/sample-text-video-1_thumbnail.jpg"
    },
    {
      "id": "sample-image-video-1",
      "title": "Sample Image to Video",
      "type": "image-to-video",
      "createdAt": "2023-07-16T14:45:00.000Z",
      "duration": 25,
      "filePath": "videos/sample-image-video-1.mp4",
      "thumbnailPath": "videos/sample-image-video-1_thumbnail.jpg"
    }
  ]
}
```

#### Get Video by ID

```
GET /videos/:id
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "sample-text-video-1",
    "title": "Sample Text to Video",
    "type": "text-to-video",
    "createdAt": "2023-07-15T10:30:00.000Z",
    "duration": 30,
    "filePath": "videos/sample-text-video-1.mp4",
    "thumbnailPath": "videos/sample-text-video-1_thumbnail.jpg"
  }
}
```

#### Delete Video

```
DELETE /videos/:id
```

**Response:**

```json
{
  "success": true,
  "message": "Video deleted successfully"
}
```

#### Download Video

```
GET /videos/download/:id
```

This endpoint streams the video file as a download.

#### Get Background Music Options

```
GET /videos/bg-music
```

**Response:**

```json
{
  "success": true,
  "data": [
    { "id": "upbeat", "name": "Upbeat", "description": "Energetic and positive music" },
    { "id": "relaxing", "name": "Relaxing", "description": "Calm and soothing music" },
    { "id": "corporate", "name": "Corporate", "description": "Professional business music" },
    { "id": "inspirational", "name": "Inspirational", "description": "Motivational and inspiring music" }
  ]
}
```

### Health Check

#### Check Server Status

```
GET /health
```

**Response:**

```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Error Responses

All endpoints return a standard error format in case of failure:

```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error information (only in development mode)"
}
```

Common HTTP status codes:

- `400`: Bad Request - Invalid input data
- `404`: Not Found - Resource not found
- `500`: Internal Server Error - Server-side error