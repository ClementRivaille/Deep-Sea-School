/**
 * Global manager of music
 * Each fish play its own melody, each being in sync
 * The Jukebox starts the music, then fade in and out separate melodies
 */
class Jukebox  {
  private instruments: {property?: Sup.Audio.SoundPlayer} = {};
  private species = [
    'clown',
    'betta',
    'angler',
    'crab',
    'jellyfish',
    'salmon',
    'seahorse',
    'tang',
    'rock'
  ];
  
  private shark: Sup.Audio.SoundPlayer;
  private intro: Sup.Audio.SoundPlayer;

  // We don't want to fade in and out at the same time, so we put tasks in a queue
  private taskQueue: Array<number> = [];

  constructor() {
    // Prepare all instruments
    for (let specie of this.species) {
      this.instruments[specie] = new Sup.Audio.SoundPlayer('musics/' + specie, 0, {loop: true});
    }
    
    // Prepare shark (main beat)
    this.shark = new Sup.Audio.SoundPlayer('musics/shark', 1, {loop: true});
  }

  start() {
    // Stop all instruments
    this.shark.stop();
    
    // Put all volumes to 0
    for (let instrKey in this.instruments) {
      this.instruments[instrKey].stop();
      this.instruments[instrKey].setVolume(0);
    }
    
    // Start them all
    this.shark.play();
    for (let instrKey in this.instruments) {
      this.instruments[instrKey].play();
    }
  }
                        
  activate(instrument: string) {
    if (this.instruments[instrument].getVolume() < 1) {
      // Create an ID to insert this task in the queue
      let taskId = Math.random();
      this.taskQueue.push(taskId);
      // Fade in
      this.fade(this.instruments[instrument], true, taskId);
    }
  }
                        
  deactivate(instrument: string) {
    if (this.instruments[instrument].getVolume() > 0) {
      // Create an ID to insert this task in the queue
      let taskId = Math.random();
      this.taskQueue.push(taskId);
      // fade out
      this.fade(this.instruments[instrument], false, taskId);
    }
  }
                        
  private fade(instrument: Sup.Audio.SoundPlayer, upward: boolean, taskId: number) {
    // Check if first in queue
    let volume = instrument.getVolume();
    if (this.taskQueue.indexOf(taskId) === 0) {
      // Increment or decrement volume
      volume += 0.02 * (upward ? 1 : -1);
      instrument.setVolume(volume);
    }
    
    if ((upward && volume < 1) || (!upward && volume > 0)) {
      // If not done, call again
      Sup.setTimeout(10, () => this.fade(instrument, upward, taskId));
    }
    else {
      // Leave queue
      this.taskQueue.shift();
    }
  }
                        
}

let globalJukebox = new Jukebox();

