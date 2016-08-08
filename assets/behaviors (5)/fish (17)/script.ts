/**
 * Fish has a specie (with a representant to befriend), and mostly get killed
 */
class FishBehavior extends Sup.Behavior {
  /** Each fish belongs to a specie, set by specific behavior */
  _specie:string = '';
  
  /** A fish have an amount of PV that go down when they are attacked */
  _life: number = 1;
  /** Minimum of points when killed */
  _price: number = 1;

  /** Distance at which the shark can kill */
  woundDistance: number = 1;
  /** Prevent to be bitten on successive frames */
  _invulnerable: boolean = false;

  private _shark: Sup.Actor;
  private _scoreManager: ScoreManager;

  awake() {
    this._shark = Sup.getActor('shark');
    this._scoreManager = globalScoreManager;
  }

  setLife(value: number) {
    this._life = value;
  }

  setPrice(value: number) {
    this._price = value;
  }

  getSpecie() {
    return this._specie;
  }

  setSpecie(specie: string) {
    this._specie = specie;
  }

  update() {
    // Calculate distance between fish and player
    let fishPosition = this.actor.getPosition();
    let sharkPosition = this._shark.getPosition();
    // let distance = Math.sqrt(Math.pow(fishPosition.x - sharkPosition.x, 2) + Math.pow(fishPosition.y - sharkPosition.y, 2))
    let distance = fishPosition.distanceTo(sharkPosition);
    
    // If close enough and shark is biting, get bitten
    if (this._shark.getBehavior(SharkBehavior).isBiting() && distance <= this.woundDistance && !this._invulnerable)
      this.getBitten();
  }

  getBitten() {
    // Suffer damages
    this._life--;
    Sup.Audio.playSound('sfx/bitten');
    
    // Shark made a new enemy
    this._scoreManager.setEnemy(this._specie);
    
    // Destroy if dead
    if (this._life === 0) {
      // New points!
      this._scoreManager.addPoints(this._price);
      Sup.Audio.playSound('sfx/dead', 0.4);
      this.actor.destroy();
    }
    else  {
      // Else blink in red
      this.actor.spriteRenderer.setColor(new Sup.Color(parseInt('0xe80a0a')));
      // Invulnerability frames
      this._invulnerable = true;
      Sup.setTimeout(300, ()=> {
        this.actor.spriteRenderer.setColor(new Sup.Color(parseInt('0xffffff')));
        this._invulnerable = false;
      });
    }
  }
}
Sup.registerBehavior(FishBehavior);

/**
 * Special class to trick a rock into behaving like a talking fish.
 */
class RockBehavior extends FishBehavior {
  /** The bonus dialog is displayed at the end */
  bonusDialogs = ['Still talking!', 'Still a rock!'];
  bonusActivated: boolean = false;
  private bonusIndex: number = 0;
  _specie = 'rock';
  private bonusText: Sup.Actor;
  private talkInterval: number;

  awake() {
    super.awake();
    
    // Child TextBox
    this.bonusText = this.actor.getChild('bonusText');
  }

  start() {
    // Ending bonus: repeat what is in bonusDialog
    if (this.bonusActivated && this.bonusText) {
      // Set the text opacity acording to sprite opacity
      let opacity = this.actor.spriteRenderer.getOpacity();
      this.bonusText.textRenderer.setOpacity(opacity);
      
      // Automatically switch sentences
      this.sayNext();
      this.talkInterval = Sup.setInterval(2000, () => {
        this.sayNext();
      });
    }
  }

  update() {
    // It's a rock, it doesn't do much
  }

  /** Display next bonus sentence */
  private sayNext() {
    this.bonusText.textRenderer.setText(this.bonusDialogs[this.bonusIndex]);
    this.bonusIndex = (this.bonusIndex + 1) % this.bonusDialogs.length;
  }

  onDestroy() {
    // Clean up the interval
    Sup.clearInterval(this.talkInterval);
  }
}

Sup.registerBehavior(RockBehavior);