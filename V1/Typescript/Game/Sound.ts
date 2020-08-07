namespace V1 {

  export interface Sounds {
    [id: string]: HTMLAudioElement;
  }

  export class Sound {
    static sounds: Sounds = {};

    public static init(): void {
      let audioElements: NodeListOf<HTMLAudioElement> = document.querySelectorAll("audio");
      for (let element of audioElements)
        Sound.sounds[element.id] = element;
    }
    public static play(_id: string): void {
        Sound.sounds[_id].volume = 0.1;
        Sound.sounds[_id].play();
    }
    public static playMusic(): void {
        Sound.sounds["gameMusic"].loop = true;
        Sound.sounds["gameMusic"].volume = 0.3;
        Sound.sounds["gameMusic"].play();
        console.log("music on");
    }
    public static stopMusic(): void {
      Sound.sounds["gameMusic"].muted = true;
    }
  }
}