import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  {
    url: 'https://picsum.photos/800/800?random=1',
    filename: 'mens-jeans.jpg'
  },
  {
    url: 'https://picsum.photos/800/800?random=2',
    filename: 'mens-tshirt.jpg'
  },
  {
    url: 'https://picsum.photos/800/800?random=3',
    filename: 'womens-dress.jpg'
  },
  {
    url: 'https://picsum.photos/800/800?random=4',
    filename: 'womens-yoga-pants.jpg'
  },
  {
    url: 'https://picsum.photos/800/800?random=5',
    filename: 'mens-formal-shirt.jpg'
  },
  {
    url: 'https://picsum.photos/800/800?random=6',
    filename: 'womens-leather-jacket.jpg'
  }
];

const downloadImage = (url, filename) => {
  const dir = path.join(path.dirname(__dirname), 'public', 'images', 'products');
  
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }

  const filepath = path.join(dir, filename);
  const file = fs.createWriteStream(filepath);

  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${filename}`);
    });
  }).on('error', (err) => {
    fs.unlink(filepath);
    console.error(`Error downloading ${filename}:`, err.message);
  });
};

images.forEach(image => {
  downloadImage(image.url, image.filename);
}); 