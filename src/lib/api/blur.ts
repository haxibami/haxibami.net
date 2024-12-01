import sharp from "sharp";

export const getBlur = async (
  buffer: Buffer,
  size: number,
  format: keyof sharp.FormatEnum,
) => {
  return sharp(buffer)
    .resize(size, size, { fit: "inside" })
    .toFormat(format, { quality: 60 })
    .modulate({
      brightness: 1,
      saturation: 1.2,
    })
    .normalise()
    .toBuffer()
    .then((data) => `data:image/${format};base64,${data.toString("base64")}`);
};
