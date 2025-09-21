# YouTube Companion Dashboard

A minimal YouTube video management dashboard built with Next.js, Express, and MongoDB.

## Features

- Fetch and display YouTube video details
- Edit video title and description
- Add comments to videos
- Personal notes section for improvement ideas
- Event logging for all actions

## Tech Stack

- **Frontend**: Next.js + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB

## Project Setup

### Prerequisites

- Node.js (v18+)
- MongoDB running locally or MongoDB Atlas
- YouTube Data API v3 key

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Add your YouTube API key and MongoDB URI to `.env`:
```
YOUTUBE_API_KEY=your_youtube_api_key_here
MONGODB_URI=mongodb://localhost:27017/youtube-dashboard
PORT=5000
CLIENT_URL="http://localhost:3000"
```

5. Start the server:
```bash
npm start
```

### Frontend Setup

1. Navigate to web directory:
```bash
cd web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/video/:id` | Fetch video details |
| PUT | `/api/video/:id/update` | Update video title/description |
| POST | `/api/video/:id/comment` | Post a new comment |
| POST | `/api/video/:id/comment/:commentId/reply` | Reply to a comment |
| DELETE | `/api/video/:id/comment/:commentId/delete` | Delete a comment |
| GET | `/api/notes` | Get all notes (or filter by videoId) |
| POST | `/api/notes` | Create a new note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |
| GET | `/api/logs` | Fetch event logs (or filter by videoId) |

## Database Schema

### Notes Collection
```javascript
{
  "_id": ObjectId,
  "videoId": String,
  "content": String,
  "createdAt": Date
}
```

### Logs Collection
```javascript
{
  "_id": ObjectId,
  "eventType": String,
  "timestamp": Date,
  "videoId": String,
  "details": Object
}
```

## Usage

1. Get a YouTube Data API v3 key from Google Cloud Console
2. Upload an unlisted video to YouTube
3. Copy the video ID from the YouTube URL
4. Enter the video ID in the dashboard
5. Use the dashboard to manage your video and add notes

## Event Types

- `VIDEO_FETCHED` - When video details are loaded
- `VIDEO_UPDATED` - When video title/description is updated
- `COMMENT_ADDED` - When a new comment is posted
- `COMMENT_REPLIED` - When replying to a comment
- `COMMENT_DELETED` - When a comment is deleted
- `NOTE_ADDED` - When a personal note is added
- `NOTE_UPDATED` - When a note is updated
- `NOTE_DELETED` - When a note is deleted