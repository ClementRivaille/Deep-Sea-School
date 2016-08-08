/**
 * Display informations on screen
 * Score on top left
 * Timer on top right
 * Debug informations below
 */
class GUIBehavior extends Sup.Behavior {
  _scoreDisplay: Sup.TextRenderer;
  _lowerText: Sup.TextRenderer;
  private timer: Sup.TextRenderer;

  awake() {
    this._scoreDisplay = this.actor.getChild('scoreDisplay').textRenderer;
    this._lowerText = this.actor.getChild('lowerText').textRenderer;
    this.timer = this.actor.getChild('timerDisplay').textRenderer;
    
    // Call the global ScoreManager so that it can use this instance of GUI
    globalScoreManager.connectGUI(this);
  }
  
  updateScore(score: number) {
    this._scoreDisplay.setText(score);
  }

  setTimer(time: number) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    
    this.timer.setText(minutes + ':' + ('0' + seconds).slice(-2));
  }

  debug(value: string) {
    this._lowerText.setText(value);
  }
}
Sup.registerBehavior(GUIBehavior);
