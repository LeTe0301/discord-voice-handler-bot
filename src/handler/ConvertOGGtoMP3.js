import { spawn } from "child_process";
import ffmpegPath from "ffmpeg-static";
import path from "path";
import fs from "fs";
import speech from "@google-cloud/speech";

export default async function convertOGGtoMP3(oggFilePath) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(oggFilePath)) {
      reject(new Error(`OGG file not found at ${oggFilePath}`));
      return;
    }

    const oggFileName = path.basename(oggFilePath);
    const mp3FilePath = path.join(
      path.dirname(oggFilePath),
      oggFileName.replace(".pcm", ".mp3")
    );

    console.log("ogg file path:", oggFilePath);
    console.log("mp3 file path:", mp3FilePath);

    const sffmpegCommand = [
      "-f",
      "s16le",
      "-ar",
      "44100",
      "-ac",
      "2",
      "-i",
      oggFilePath,
      mp3FilePath,
    ];

    // const ffmpeg = spawn(ffmpegPath, ["-i", oggFilePath, mp3FilePath]);
    const ffmpeg = spawn(ffmpegPath, sffmpegCommand);

    ffmpeg.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    ffmpeg.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });
    // hellu ist
    // perfekt danke
    ffmpeg.on("close", (code) => {
      if (code === 0) {
        console.log(`MP3 file saved at: ${mp3FilePath}`);
        resolve(mp3FilePath);
        const client = new speech.SpeechClient();
      } else {
        reject(new Error(`Failed to convert ${oggFilePath}`));
      }
    });

    ffmpeg.on("error", (error) => {
      console.error("error:", error);
      reject(error);
    });
  });
}
