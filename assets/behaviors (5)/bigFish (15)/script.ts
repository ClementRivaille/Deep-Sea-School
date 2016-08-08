/**
 * BigFish can talk to player, become friend with them, and give them a power
 * They also each have an unique theme song
 * Requires FishBehavior and a child TextBox to work
 */
class BigFishBehavior extends Sup.Behavior {
  
  private _textBox: TextBoxBehavior;
  private _shark: Sup.Actor;
  private _scoreManager: ScoreManager;
  private timer: TimerBehavior;
  private _fishBehavior: FishBehavior;
  private _talking: boolean = false;
  private _angry: boolean = false;

  /** Index of the upcomig dialog */
  private _nextDialog: number = 0;
  /** Number of dialogs required to befriend */
  friendshipIndex: number = 1;
  
  /** Lines of dialog */
  dialogs:Array<Array<{text: string, speed?: number}>>;
  /** Proximity required to activate talking */
  talkDistance: number = 2.5;
  
  awake() {
    // Obtain actor and global objects
    this._textBox = this.actor.getChild('textBox').getBehavior(TextBoxBehavior);
    this._shark = Sup.getActor('shark');
    this._scoreManager = globalScoreManager;
    this.timer = Sup.getActor('timer').getBehavior(TimerBehavior);
    
    // Initialize text box with dialogs
    this.dialogs = dialogsVendor.getTexts(this.actor.getName());
    this._textBox.init(this.dialogs[0]);
    
    // Set special PV and price to actor's fish
    this._fishBehavior = this.actor.getBehavior(FishBehavior);
    this._fishBehavior.setLife(4);
    this._fishBehavior.setPrice(10);
  }

  start() {
    // Declare itself representant of fish specie
    this._scoreManager.setRepresentant(this._fishBehavior.getSpecie(), this.actor.getName());
  }

  update() {
    // Calculate distance between fish and player
    let fishPosition = this.actor.getPosition();
    let sharkPosition = this._shark.getPosition();
    // let distance = Math.sqrt(Math.pow(fishPosition.x - sharkPosition.x, 2) + Math.pow(fishPosition.y - sharkPosition.y, 2));
    let distance = fishPosition.distanceTo(sharkPosition);
    
    if (distance <= this.talkDistance) {
      // If distance allows talking (and not already talking), wait for player input
      if (Sup.Input.wasKeyJustPressed('Z') && !this._textBox.isActive() && !this._shark.getBehavior(SharkBehavior).isTalking()) {
        this.initTalking(fishPosition, sharkPosition);
      }
    }
    
    // Detect when we stop talking
    // Note: Might be improved with promises
    if (this._talking && !this._textBox.isActive()) {
      this.stopTalking();
    }
    
  }

  /**
  * When the fish is angry, he'll only talk agressively and never befriend
  * We thus start a new set of dialogs
  */
  makeAngry() {
    // New dialogs
    this._nextDialog = 0;
    this.dialogs = dialogsVendor.getAngryTexts(this.actor.getName());
    this._textBox.init(this.dialogs[0]);
    
    // Never befriend anymore
    this._angry = true;
  }
   
  /**
   * Launch a dialog
   */
  private initTalking(fishPosition: Sup.Math.Vector3, sharkPosition: Sup.Math.Vector3) {
    // Center camera on itself
    let camera = Sup.getActor('camera');
    camera.getBehavior(CameraBehavior).centerOn(this.actor.getPosition());

    //Talk animation
    this.actor.spriteRenderer.setAnimation('talk');
    let movement = this.actor.getBehavior(MovementBehavior);
    if (movement) {
      movement.freeze(true);
    }
    // Make the fish face the shark
    this.actor.spriteRenderer.setHorizontalFlip(sharkPosition.x < fishPosition.x);
    this._shark.getBehavior(SharkBehavior).freeze(true, fishPosition.x < sharkPosition.x);
    // Freeze time
    this.timer.freeze(true);

    // Start its music
    if (!this._scoreManager.isEnemy(this._fishBehavior.getSpecie())) {
      globalJukebox.activate(this._fishBehavior.getSpecie());
    }

    // Start talking
    this._textBox.startDialog();
    this._talking = true;
  }

  /** Stop the dialog state once the dialog is over and TextBox is closed */
  private stopTalking() {
    // Unfreeze shark and fish
    this._shark.getBehavior(SharkBehavior).freeze(false);
    let movement = this.actor.getBehavior(MovementBehavior);
    // Well, rock doesn't have any movement, it's the only exception
    if (movement) {
      movement.freeze(false);
    }
    // Unfreeze timer
    this.timer.freeze(false);
    this._talking = false;

    // Default animation
    this.actor.spriteRenderer.setAnimation('default');

    // Prepare next dialog
    this._nextDialog = Math.min(this._nextDialog + 1, this.dialogs.length - 1);
    this._textBox.init(this.dialogs[this._nextDialog]);

    // If enough dialogs have been done, become friend
    if (this._nextDialog === this.friendshipIndex && !this._angry) {
      this._scoreManager.setFriend(this._fishBehavior.getSpecie());
    }

    // Stop music if still not friend
    if (!this._scoreManager.isFriend(this._fishBehavior.getSpecie())) {
      globalJukebox.deactivate(this._fishBehavior.getSpecie());
    }
  }
}
Sup.registerBehavior(BigFishBehavior);
