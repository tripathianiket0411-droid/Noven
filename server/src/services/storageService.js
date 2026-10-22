import ImageKit, { toFile } from "@imagekit/nodejs";
import config from "../config/config.js";

console.log("PRIVATE KEY EXISTS:", !!config.IMAGEKIT_PRIVATE_KEY);
console.log("PRIVATE KEY START:", config.IMAGEKIT_PRIVATE_KEY?.slice(0, 15));

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

export async function uploadFile({ buffer, fileName }) {
  try {


    const response = await client.files.upload({
      file: await toFile(buffer, fileName),
      fileName: fileName,
      folder:"Noven"
    });

    console.log("IMAGEKIT RESPONSE:", response);

    return response;
  } catch (error) {
    console.log("IMAGEKIT ERROR MESSAGE:", error.message);
    console.log("IMAGEKIT ERROR STATUS:", error.status);
    console.log("IMAGEKIT ERROR HEADERS:", error.headers);
    console.log("IMAGEKIT ERROR:", error);

    throw error;
  }
}
