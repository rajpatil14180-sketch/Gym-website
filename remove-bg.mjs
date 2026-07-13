import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function maxChannel(data, idx) {
  const o = idx * 4;
  return Math.max(data[o], data[o + 1], data[o + 2]);
}

function findLargestComponent(mask, width, height) {
  const labels = new Int32Array(mask.length);
  const sizes = new Map();
  let nextLabel = 1;

  for (let i = 0; i < mask.length; i++) {
    if (!mask[i] || labels[i]) continue;

    const label = nextLabel++;
    let size = 0;
    const stack = [i];
    labels[i] = label;

    while (stack.length) {
      const idx = stack.pop();
      size++;

      const x = idx % width;
      const y = (idx / width) | 0;

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
          const ni = ny * width + nx;
          if (mask[ni] && !labels[ni]) {
            labels[ni] = label;
            stack.push(ni);
          }
        }
      }
    }

    sizes.set(label, size);
  }

  let bestLabel = 0;
  let bestSize = 0;
  for (const [label, size] of sizes) {
    if (size > bestSize) {
      bestSize = size;
      bestLabel = label;
    }
  }

  const keep = new Uint8Array(mask.length);
  for (let i = 0; i < mask.length; i++) {
    keep[i] = labels[i] === bestLabel ? 1 : 0;
  }

  return keep;
}

function dilateMask(mask, data, width, height, iterations = 2) {
  let current = mask;
  const FRINGE_MIN = 1;

  for (let pass = 0; pass < iterations; pass++) {
    const next = new Uint8Array(current);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        if (current[idx]) continue;
        if (maxChannel(data, idx) <= FRINGE_MIN) continue;

        let touches = false;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
            if (current[ny * width + nx]) {
              touches = true;
              break;
            }
          }
          if (touches) break;
        }

        if (touches) next[idx] = 1;
      }
    }

    current = next;
  }

  return current;
}

function buildAlpha(mask, data, width, height) {
  const alpha = new Uint8Array(mask.length);
  const EDGE_LOW = 2;
  const EDGE_HIGH = 24;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (!mask[idx]) continue;

      let isEdge = false;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || nx >= width || ny < 0 || ny >= height || !mask[ny * width + nx]) {
            isEdge = true;
            break;
          }
        }
        if (isEdge) break;
      }

      const maxCh = maxChannel(data, idx);
      if (!isEdge || maxCh > EDGE_HIGH) {
        alpha[idx] = 255;
      } else if (maxCh <= EDGE_LOW) {
        alpha[idx] = 0;
      } else {
        alpha[idx] = Math.round(((maxCh - EDGE_LOW) / (EDGE_HIGH - EDGE_LOW)) * 255);
      }
    }
  }

  return alpha;
}

async function removeBlackBackground() {
  const inputPath = path.join(__dirname, 'png_image_black_background_2K_202607131611.png');
  const outputPath = path.join(__dirname, 'public', 'assets', 'img', 'hero-athlete.png');

  const image = sharp(inputPath).ensureAlpha();
  const metadata = await image.metadata();
  const { width, height } = metadata;

  console.log(`Processing image: ${width}x${height}`);

  const { data } = await image.raw().toBuffer({ resolveWithObject: true });
  const totalPixels = width * height;

  // Generous foreground mask — keep any pixel that isn't pure black.
  const FOREGROUND_MIN = 2;
  const initialMask = new Uint8Array(totalPixels);
  for (let i = 0; i < totalPixels; i++) {
    initialMask[i] = maxChannel(data, i) > FOREGROUND_MIN ? 1 : 0;
  }

  // Keep only the athlete silhouette (largest connected region).
  const subjectMask = findLargestComponent(initialMask, width, height);

  // Recover anti-aliased hair fringe pixels connected to the subject.
  const dilatedMask = dilateMask(subjectMask, data, width, height, 1);

  const alphaMap = buildAlpha(dilatedMask, data, width, height);

  const output = Buffer.alloc(totalPixels * 4);
  let transparentCount = 0;
  let opaqueCountFinal = 0;

  for (let i = 0; i < totalPixels; i++) {
    const offset = i * 4;
    const finalAlpha = Math.min(alphaMap[i], data[offset + 3]);

    output[offset] = data[offset];
    output[offset + 1] = data[offset + 1];
    output[offset + 2] = data[offset + 2];
    output[offset + 3] = finalAlpha;

    if (finalAlpha === 0) transparentCount++;
    else opaqueCountFinal++;
  }

  console.log(`Transparent: ${transparentCount} (${((transparentCount / totalPixels) * 100).toFixed(1)}%)`);
  console.log(`Opaque/semi: ${opaqueCountFinal} (${((opaqueCountFinal / totalPixels) * 100).toFixed(1)}%)`);

  await sharp(output, {
    raw: { width, height, channels: 4 },
  })
    .png({ compressionLevel: 6 })
    .toFile(outputPath);

  console.log('Done!');
}

removeBlackBackground().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
