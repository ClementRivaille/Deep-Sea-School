/**
 * Start is a title screen and an introductory text
 * The title move from up to down while a message blink bellow
 * Then the introduction is just displayed full screen
 */
class StartBehavior extends Sup.Behavior {
  private title: Sup.Actor;
  private message: Sup.Actor;
  private introduction: Sup.Actor;

  private intervalLength:number = 1000;
  private titleVerticalLimit: number = 0.2;
  private up:boolean = true;
  private speed: number = 0.005;
  private turning: number = 0;

  private interval: number;

  private soundPlayer: Sup.Audio.SoundPlayer;
  
  awake() {
    // Get texts actors
    this.title = this.actor.getChild('title');
    this.message = this.actor.getChild('message');
    this.introduction = this.actor.getChild('introduction');
    
    // Hide introduction
    this.introduction.textRenderer.setOpacity(0);
    
    // Interval to make the bottom message blink
    this.message.textRenderer.setOpacity(0);
    this.interval = Sup.setInterval(this.intervalLength, () => {
      this.message.textRenderer.setOpacity(this.message.textRenderer.getOpacity() === 0 ? 1 : 0);
    });
    
    this.soundPlayer = new Sup.Audio.SoundPlayer('sfx/intro', 1, {loop: true});
    this.soundPlayer.play();
  }

  update() {
    // If title too high or too low, change its direction
    if (Math.abs(this.title.getPosition().y) >= this.titleVerticalLimit) {
      // Little decelerating effect to turn back
      this.turning = Math.min(this.turning + 0.0001, this.speed * 2);
      this.title.moveY((this.speed - this.turning) * (this.up ? 1 : -1));
    }
    else {
      // Once we finished our turn, we reinitialize
      if (this.turning != 0) {
        this.turning = 0;
        this.up = !this.up;
      }
      // Just move normally
      this.title.moveY(this.speed * (this.up ? 1 : -1));
    }
    
    // Player press Z to start
    if (Sup.Input.wasKeyJustPressed('Z')) {
      // First time, show introduction
      if (this.introduction.textRenderer.getOpacity() === 0) {
        // hide everything
        Sup.clearInterval(this.interval);
        this.title.spriteRenderer.setOpacity(0);
        this.message.textRenderer.setOpacity(0);
        this.actor.getChild('background').spriteRenderer.setOpacity(0);
        this.soundPlayer.stop();
        
        // Show introduction text
        this.introduction.textRenderer.setOpacity(1);
      }
      else {
        // Then, start the game
        Sup.destroyAllActors();
        globalScoreManager.init();
        globalJukebox.start();
        Sup.loadScene('Main');
        this.actor.destroy();
      }
    }
  }
}
Sup.registerBehavior(StartBehavior);
