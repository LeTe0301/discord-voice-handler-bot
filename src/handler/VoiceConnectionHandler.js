import {
  StreamType,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from "@discordjs/voice";
import { createWriteStream } from "fs";
import { finished } from "node:stream/promises";
import * as prism from "prism-media";
import convertOGGtoMP3 from "./ConvertOGGtoMP3.js";
import { sendMP3toGSTT } from "./SendMP3toGSTT.js";
let oVoiceConnection;
let oAudioReceiveStream;
let receiver;
export function createVoiceConnection(oVoiceParams) {
  oVoiceConnection = joinVoiceChannel(oVoiceParams);
}

export function destroyVoiceConnection() {
  oVoiceConnection.destroy();
  oVoiceConnection == null;
}

export function getVoiceConnection() {
  return oVoiceConnection;
}

export async function listen(userId) {
  receiver = oVoiceConnection.receiver;
  oAudioReceiveStream = receiver.subscribe(userId);
  console.log("Aufzeichnung gestartet.");

  const oggStream = new prism.opus.Decoder({
    channels: 2,
    rate: 48000,
    frameSize: 960,
  });
  const out = createWriteStream("output.pcm");
  await finished(oAudioReceiveStream.pipe(oggStream).pipe(out));
}
export async function stfu() {
  if (!oAudioReceiveStream) {
    return;
  }
  oAudioReceiveStream.pause();
  console.log("Aufzeichnung gestoppt.");
  await convertOGGtoMP3("output.pcm")
    .then((mp3FilePath) => {
      console.log(`Conversion successful. MP3 file saved at: ${mp3FilePath}`);
    })
    .catch((error) => {
      console.error("Error during conversion:", error);
    });

  const oAudioResource = createAudioResource("output.mp3", {
    inlineVolume: true,
    inputType: StreamType.Opus,
  });
  await sendMP3toGSTT("output.mp3");
  oAudioResource.volume.setVolume(0.5);
  const audioPlayer = createAudioPlayer({
    behaviors: {
      noSubscriber: "play",
    },
  });
  audioPlayer.play(oAudioResource);
}
