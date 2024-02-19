import {
  StreamType,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from "@discordjs/voice";
import { createWriteStream } from "fs";
import * as prism from "prism-media";
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

export function listen(userId) {
  receiver = oVoiceConnection.receiver;
  oAudioReceiveStream = receiver.subscribe(userId);
  console.log("Aufzeichnung gestartet.");

  const oggStream = new prism.opus.Decoder({
    channels: 2,
    rate: 48000,
    frameSize: 960,
  });
  const out = createWriteStream("output.ogg");
  oAudioReceiveStream.pipe(oggStream).pipe(out);
}
export async function stfu() {
  if (!oAudioReceiveStream) {
    return;
  }
  oAudioReceiveStream.pause();
  console.log("Aufzeichnung gestoppt.");
  const oAudioResource = createAudioResource("test.mp3", {
    inlineVolume: true,
    inputType: StreamType.Opus,
  });
  oAudioResource.volume.setVolume(0.5);
  const audioPlayer = createAudioPlayer({
    behaviors: {
      noSubscriber: "play",
    },
  });
  audioPlayer.play(oAudioResource);
}
