import { SpeechClient } from "@google-cloud/speech";
import fs from "fs";

export async function sendMP3toGSTT(mp3FilePath) {
  const keyFilePath = "google-speech-to-text-api-authentication.json";
  const speechClient = new SpeechClient({ keyFilename: keyFilePath });
  const mp3File = fs.readFileSync(mp3FilePath);
  try {
    const [response] = await speechClient.recognize({
      audio: {
        content: mp3File.toString("base64"),
      },
      config: {
        encoding: "MP3",
        sampleRateHertz: 44100, // Set to the sample rate of your MP3 file
        languageCode: "de-DE", // Change this to the appropriate language code
      },
    });

    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");

    console.log("Transcription:", transcription);
    // Do something with the transcription (e.g., send it back to Discord)
  } catch (error) {
    console.error("Error:", error);
  }
}
