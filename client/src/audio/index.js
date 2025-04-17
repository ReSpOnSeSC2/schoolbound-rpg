import { Howl, Howler } from 'howler';

export class AudioManager {
  constructor() {
    this.sounds = {};
    this.music = null;
    this.currentMusic = '';
    this.isMuted = false;
    
    // Set global volume
    Howler.volume(0.7);
  }
  
  loadSounds() {
    // Sound effects
    this.sounds.menuSelect = new Howl({
      src: ['assets/audio/menu_select.mp3'],
      volume: 0.5
    });
    
    this.sounds.attack = new Howl({
      src: ['assets/audio/attack.mp3'],
      volume: 0.6
    });
    
    this.sounds.damage = new Howl({
      src: ['assets/audio/damage.mp3'],
      volume: 0.5
    });
    
    this.sounds.victory = new Howl({
      src: ['assets/audio/victory.mp3'],
      volume: 0.7
    });
    
    // Music tracks
    this.music = {
      title: new Howl({
        src: ['assets/audio/title_theme.mp3'],
        loop: true,
        volume: 0.4
      }),
      
      overworld: new Howl({
        src: ['assets/audio/overworld_theme.mp3'],
        loop: true,
        volume: 0.4
      }),
      
      battle: new Howl({
        src: ['assets/audio/battle_theme.mp3'],
        loop: true,
        volume: 0.4
      })
    };
  }
  
  playSound(soundName) {
    if (this.sounds[soundName] && !this.isMuted) {
      this.sounds[soundName].play();
    }
  }
  
  playMusic(trackName) {
    if (this.currentMusic === trackName) return;
    
    // Stop current music if playing
    if (this.currentMusic && this.music[this.currentMusic]) {
      this.music[this.currentMusic].stop();
    }
    
    if (this.music[trackName] && !this.isMuted) {
      this.music[trackName].play();
      this.currentMusic = trackName;
    }
  }
  
  stopMusic() {
    if (this.currentMusic && this.music[this.currentMusic]) {
      this.music[this.currentMusic].stop();
      this.currentMusic = '';
    }
  }
  
  toggleMute() {
    this.isMuted = !this.isMuted;
    
    if (this.isMuted) {
      Howler.volume(0);
    } else {
      Howler.volume(0.7);
    }
    
    return this.isMuted;
  }
}

// Singleton instance
export const audioManager = new AudioManager();