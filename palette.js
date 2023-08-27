class Palette {
  constructor(entries, drawFunc) {
    this.entries = entries;
    this.drawFunc = drawFunc;
  }

  addEntry(entry) {
    this.entries.push(entry);
  }

  draw(paletteIndex, ctx, width, height) {
    // a method to draw the specified palette index
    try {
      this.drawFunc(ctx, this.entries[paletteIndex], width, height);
    } catch (e) {
      console.error("Error in palette draw function!", e);
    }
  }
}

class PixelPalette extends Palette {
  // Draws a solid color
  constructor(entries) {
    super(entries);
    this.drawFunc = this.drawPixel;
  }

  getRGB([r, g, b]) {
    try {
      return `rgb(${r} ${g} ${b})`;
    } catch (e) {
      console.warn("Can't destructure palette entries to RGB");
      return `rgb(0 0 0)`;
    }
  }

  getRGBA(index) {
    try {
      const [r, g, b, a] = this.entries[index];
      return `rgb(${r} ${g} ${b} / ${a})`;
    } catch (e) {
      console.warn("Can't destructure palette entries to RGBA");
      return `rgb(0 0 0 / 0)`;
    }
  }

  drawPixel(ctx, value, width, height) {
    ctx.fillStyle = this.getRGB(value);
    ctx.fillRect(0, 0, width, height);
  }
}

class ImagePalette extends Palette {
  // Draws a symbol
  constructor(entries) {
    super(entries);
    this.drawFunc = this.drawImageTile;
  }

  drawImageTile(ctx, image, width, height) {
    ctx.drawImage(image, 0, 0, width, height);
  }
}

const p8 = [
  [0, 0, 0],
  [255, 0, 0],
  [0, 255, 0],
  [0, 0, 255],
  [255, 0, 255],
  [255, 255, 0],
  [0, 255, 255],
  [255, 255, 255],
];

async function getImages() {
  const knit = new Image();
  knit.src = "/stitchSymbols/knit.png";
  await knit.decode();
  const slip = new Image();
  slip.src = "/stitchSymbols/slip.png";
  await slip.decode();
  const tuck = new Image();
  tuck.src = "/stitchSymbols/tuck.png";
  await tuck.decode();
  const purl = new Image();
  purl.src = "/stitchSymbols/purl.png";
  await purl.decode();
  return [knit, purl, slip, tuck];
}
const pixel8 = new PixelPalette(p8);
const stitchPalette = new ImagePalette(await getImages());

export { pixel8, stitchPalette };
