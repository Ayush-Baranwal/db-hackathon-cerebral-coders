const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Optional: Set FFmpeg path if needed
// ffmpeg.setFfmpegPath('/path/to/ffmpeg'); // For Linux/macOS
ffmpeg.setFfmpegPath('C:\\Users\\Suhas\\Downloads\\ffmpeg\\ffmpeg\\bin\\ffmpeg.exe'); // For Windows
// "C:\Users\Suhas\Downloads\ffmpeg\ffmpeg\bin\ffmpeg.exe"

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('uploads'));

// Endpoint to generate video based on text
app.post('/generate-video', (req, res) => {
  const { text } = req.body;
  const outputPath = path.join(__dirname, 'uploads', `video-${Date.now()}.mp4`);
  
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  ffmpeg()
    .input('color=c=black:s=1280x720:d=10') // Black background
    .inputFormat('lavfi')
    .outputOptions([
      `-vf drawtext=text='${text}':fontcolor=white:fontsize=48:x=(w-tw)/2:y=(h-th)/2`
    ])
    .on('end', () => {
      console.log('Video generation complete');
      res.json({ videoUrl: `http://localhost:${port}/uploads/${path.basename(outputPath)}` });
    })
    .on('error', (err) => {
      console.error('Error generating video:', err);
      res.status(500).json({ error: 'Error generating video' });
    })
    .save(outputPath);
});

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
