/**
 * The game Timer redirect to the Ending screen when it's over
 */
class TimerBehavior extends Sup.Behavior {
  time: number = 180;
  private tick: boolean = true;
  private gui: GUIBehavior;
  private interval: number;
  private frozen: boolean = false;
  
  awake() {
    // Get GUI actor that will display remaining time 
    this.gui = Sup.getActor('GUI').getBehavior(GUIBehavior);
  
    // Activate a tick every second
    this.interval = Sup.setInterval(1000, () => {
      this.tick = true;
    });
  }

  update() {
    if (this.tick && !this.frozen) {
      // When a tick is activated, we update remaining time
      this.tick = false;
      this.gui.setTimer(this.time);
      this.time -= 1;
      
      if (this.time <0) {
        // On -1, clear interval, destroy everything, and go to End
        Sup.clearInterval(this.interval);
        Sup.destroyAllActors();
        Sup.loadScene('End');
      }
    }
  }

  /** Time is frozen during dialogs */
  freeze(value: boolean) {
    this.frozen = value;
  }
}
Sup.registerBehavior(TimerBehavior);
