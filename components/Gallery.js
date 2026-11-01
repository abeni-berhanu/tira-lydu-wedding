import fs from 'fs';
import path from 'path';
import GalleryClient from './GalleryClient';

// Drop your photos into /public/gallery, every image there is shown
// automatically (sorted by filename, e.g. 01.jpg, 02.jpg, ...).
const EXTENSIONS = /\.(jpe?g|png|webp|avif)$/i;

// Shown only while /public/gallery is empty, so the section is never blank.
const FALLBACK = [
  'https://picsum.photos/seed/tl01/700/900',
  'https://picsum.photos/seed/tl02/700/560',
  'https://picsum.photos/seed/tl03/700/820',
  'https://picsum.photos/seed/tl04/700/700',
  'https://picsum.photos/seed/tl05/700/960',
  'https://picsum.photos/seed/tl06/700/600',
].map((src) => ({ src, caption: '' }));

function loadPhotos() {
  try {
    const dir = path.join(process.cwd(), 'public', 'gallery');
    const files = fs
      .readdirSync(dir)
      .filter((f) => EXTENSIONS.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    if (files.length) {
      return files.map((f) => ({ src: `/gallery/${encodeURIComponent(f)}`, caption: '' }));
    }
  } catch (e) {
    // folder missing, fall through to placeholders
  }
  return FALLBACK;
}

export default function Gallery() {
  return <GalleryClient photos={loadPhotos()} />;
}
