
```js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('@elastic/elasticsearch');

const app = express();
app.use(bodyParser.json());

const client = new Client({
  node: process.env.ELASTIC_URL,
  auth: {
    username: process.env.ELASTIC_USER,
    password: process.env.ELASTIC_PASSWORD
  }
});

// Create Index (run once)
async function createIndex() {
  const indexExists = await client.indices.exists({ index: 'videos' });
  if (!indexExists) {
    await client.indices.create({
      index: 'videos',
      body: {
        mappings: {
          properties: {
            title: { type: 'text' },
            description: { type: 'text' },
            tags: { type: 'keyword' },
            uploadedAt: { type: 'date' }
          }
        }
      }
    });
    console.log('Index "videos" created!');
  }
}
createIndex();

// Add a video
app.post('/videos', async (req, res) => {
  const video = req.body; // { title, description, tags, uploadedAt }
  const result = await client.index({
    index: 'videos',
    document: video
  });
  res.json(result);
});

// Search videos
app.get('/search', async (req, res) => {
  const { q } = req.query;
  const result = await client.search({
    index: 'videos',
    query: {
      multi_match: {
        query: q,
        fields: ['title^3', 'description']
      }
    },
    size: 20
  });
  const videos = result.hits.hits.map(hit => hit._source);
  res.json(videos);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
```