/**
 * Playable character behavior
 * Player can swim around and attack other fishes
 * They have also a lot of unlockable useless-but-fun powers
 */
class SharkBehavior extends Sup.Behavior {
  maxVelocity = 0.2;
  
  private _solidBodies: Sup.ArcadePhysics2D.Body[] = [];

  /** state during dialogs where the shark can't move */
  private _frozen: boolean = false;
  private _biting: boolean = false;

  // available transformations
  private transformations = ['jellyfish', 'salmon', 'crab', 'betta', 'tang', 'clownfish', 'seahorse', 'angler'];
  private morphIndex = 0;
  private transformed = false;

  // Warp points
  private warpPoints = [
    {x: 46, y: 73},
    {x: 14, y: 10},
    {x: 75, y: 83},
    {x: 82, y: 27},
    {x: 14, y: 65}
  ]
  private warpIndex = 0;

  /** sunglasses */
  private sunglasses: Sup.Actor;
  // various special states
  private gravity = false;
  private accelerate = false;

  // Note playing
  private pitches = [0,1,0.42, -0.42, 0.58, -0.58];

  // Speaking (rock power)
  private textBox: Sup.Actor;
  private speaking: boolean = false;
  private speakIndex: number = 0;
  talkPhrases: Array<string> = ['Hello!', `I'm a rock!`];
  // It should be noted that "real" talking is completely handled by BigFishBehavior  

  awake() {
    // Store obstacles' bodies
    let solidActors = Sup.getActor('solids').getChildren();
    for (let solid of solidActors) {
      this._solidBodies.push(solid.arcadeBody2D);
    }
    
    // Prepare sunglasses and textBox
    this.sunglasses = this.actor.getChild('glasses');
    this.sunglasses.spriteRenderer.setOpacity(0);
    this.textBox = this.actor.getChild('textBox');
    this.textBox.textRenderer.setText('');
    this.textBox.getChild('textBackground').spriteRenderer.setOpacity(0);
    
    // Default animation
    this.actor.spriteRenderer.setAnimation('default');
    this.sunglasses.spriteRenderer.setAnimation('default');
  }

  update() {
    // store current velocity
    let velocityBeforeImpact = this.actor.arcadeBody2D.getVelocity();
    // collides
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this._solidBodies);
    
    // Movement
    if (!this._frozen) {
      this.move('x', 'RIGHT', 'LEFT');
      this.move('y', 'UP', 'DOWN');
      this.setOrientation();
      
      // ACTIONS
      // attack
      if (Sup.Input.wasKeyJustPressed('X') && !this._biting)
        this.bite();
      
      // POWERS
      // sun glasses
      if (Sup.Input.wasKeyJustPressed('A') && globalScoreManager.hasPower('betta')) {
        this.sunglasses.spriteRenderer.setOpacity(this.sunglasses.spriteRenderer.getOpacity() === 0 ? 1 : 0);
      }
      // Rotation
      if (Sup.Input.wasKeyJustPressed('D') && globalScoreManager.hasPower('tang')) {
        this.actor.rotateEulerZ(Math.PI/2);
        Sup.Audio.playSound('sfx/rotate');
        // Sup.getActor('camera').rotateEulerZ(Math.PI/2);  // For dev fun only
      }
      // Transform
      if (globalScoreManager.hasPower('jellyfish')) {
        if (Sup.Input.wasKeyJustPressed('Q')) {
          // Change sprite when Q is pressed
          this.actor.spriteRenderer.setSprite('sprites/' + this.transformations[this.morphIndex]);
          Sup.Audio.playSound('sfx/transform', 0.3);
          this.transformed = true;
        }
        if (Sup.Input.wasKeyJustReleased('Q') || (!Sup.Input.isKeyDown('Q') && this.transformed)) {
          // Return to shark one after it's released
          this.actor.spriteRenderer.setSprite('sprites/shark');
          this.morphIndex = (this.morphIndex + 1) % this.transformations.length;
          this.transformed = false;
        }
      }
      // Crab gravity
      if (Sup.Input.wasKeyJustPressed('G') && globalScoreManager.hasPower('crab')) {
        this.gravity = !this.gravity;
        this.actor.arcadeBody2D.setCustomGravityY(this.gravity ? -0.015 : 0);
      }
      // Teleport
      if (Sup.Input.wasKeyJustPressed('T') && globalScoreManager.hasPower('seahorse')) {
        this.actor.arcadeBody2D.warpPosition(this.warpPoints[this.warpIndex]);
        Sup.Audio.playSound('sfx/teleport');
        this.warpIndex = (this.warpIndex + 1) % this.warpPoints.length;
      }
      
      // Play a note
      if (Sup.Input.wasKeyJustPressed('B') && globalScoreManager.hasPower('angler')) {
        Sup.Audio.playSound('sfx/note', 0.5, {pitch: this.pitches[Math.floor(Math.random()* this.pitches.length)]});
      }
      
      // Speak
      if (Sup.Input.wasKeyJustPressed('R') && !this.speaking && globalScoreManager.hasPower('rock')) {
        this.speaking = true;
        // Display phrase
        this.textBox.getChild('textBackground').spriteRenderer.setOpacity(0.8);
        this.textBox.textRenderer.setText(this.talkPhrases[this.speakIndex]);
        this.speakIndex = (this.speakIndex + 1) % this.talkPhrases.length;
        // Wait before hiding phrase
        Sup.setTimeout(1000, () => {
          this.speaking = false;
          this.textBox.getChild('textBackground').spriteRenderer.setOpacity(0);
          this.textBox.textRenderer.setText('');
        })
      }
    }
    // those can work even frozen
    // Bounce
    if (globalScoreManager.hasPower('clown')) {
      let touches = this.actor.arcadeBody2D.getTouches();
      // this is were the velocity before impact allows to inverse the velocity (instead of stopping)
      // Vertical (don't apply if sticked to the ground because of gravity)
      if ((touches.top || touches.bottom) && Math.abs(velocityBeforeImpact.y) > 0.05) {
        this.actor.arcadeBody2D.setVelocityY(Math.abs(velocityBeforeImpact.y) * (touches.bottom ? 1 : -1));
        Sup.Audio.playSound('sfx/bump', 0.3);
      }
      // Horizontal
      else if (touches.left || touches.right) {
        this.actor.arcadeBody2D.setVelocityX(Math.abs(velocityBeforeImpact.x) * (touches.left ? 1 : -1));
        Sup.Audio.playSound('sfx/bump', 0.3);
      }
    }
    // speed up
    if (Sup.Input.wasKeyJustPressed('SHIFT') && globalScoreManager.hasPower('salmon')) {
      this.maxVelocity = this.maxVelocity * 2;
      this.accelerate = true;
    }
    if (Sup.Input.wasKeyJustReleased('SHIFT') && this.accelerate) {
      this.maxVelocity = this.maxVelocity / 2;
      this.accelerate = false;
    }
  }

  /**
  * Move the shark
  * @param axis [string] - axis of the movement, X or Y
  * @param forwardKey [string] - input keys for going forward on this axis
  * @param backwardKey [string] - input keys for going backward on this axis
  */
  private move(axis:string, forwardKey:string, backwardKey:string) {
    // Detect directional key pressed
    if (Sup.Input.isKeyDown(forwardKey) || Sup.Input.isKeyDown(backwardKey)) {
      // Going "forward" or "backward" ? If both, keep current velocity
      let direction = Sup.Input.isKeyDown(backwardKey) ? (Sup.Input.isKeyDown(forwardKey) ? 0 : -1) : 1;
      // Get current velocity on this direction
      let axisVelocity = this.actor.arcadeBody2D.getVelocity()[axis] * direction;
      if (axisVelocity < this.maxVelocity) {
        // If maximum speed not reached, accelerate
        let addedVelocity = new Sup.Math.Vector2();
        addedVelocity[axis] = 0.02 * direction;
        this.actor.arcadeBody2D.addVelocity(addedVelocity);
      }
    }
    // Lose progressively velocity
    else {
      let velocity = this.actor.arcadeBody2D.getVelocity();
      velocity[axis] *= 0.9;
      this.actor.arcadeBody2D.setVelocity(velocity);
    }
  }

  /** Shift the sprite's orientation, according to inputs */
  private setOrientation() {
    if (Sup.Input.wasKeyJustPressed('LEFT') || Sup.Input.wasKeyJustPressed('RIGHT') || Sup.Input.wasKeyJustPressed('UP') || Sup.Input.wasKeyJustPressed('DOWN')){
      // Determine the shark's rotation (tang fish power)
      let keys = {
        backward: 'LEFT',
        forward: 'RIGHT'
      };
      switch(Math.round(this.actor.getEulerZ() / (Math.PI / 2))) {
        case 0:
          break;
        case 1:
          keys.backward = 'DOWN';
          keys.forward = 'UP';
          break;
        case 2:
        case -2:
          keys.backward = 'RIGHT';
          keys.forward = 'LEFT';
          break;
        case -1:
          keys.backward = 'UP';
          keys.forward = 'DOWN';
          break;
      }
      
      if (Sup.Input.wasKeyJustPressed(keys.backward) || Sup.Input.wasKeyJustPressed(keys.forward)) {
        this.actor.spriteRenderer.setHorizontalFlip(Sup.Input.wasKeyJustPressed(keys.backward));
        this.sunglasses.spriteRenderer.setHorizontalFlip(Sup.Input.wasKeyJustPressed(keys.backward));
      }
    }
  }

  /**
   * Stop the shark, or unfreeze it
   * @param value [boolean] : true to freeze, false to unfreeze
   * @param flip [boolean] : (when freezing) true if shark must face left, false for right
   */
  freeze(value: boolean, flip: boolean = false) {
    this._frozen = value;
    
    // We don't really want gravity to interfer during dialog
    if (this.gravity) {
      this.actor.arcadeBody2D.setCustomGravityY(value ? 0 : -0.015);
    }
    
    // Freeze the actor
    if(this._frozen) {
      this.actor.arcadeBody2D.setVelocity({x: 0, y: 0});
      
      // Orientation might be reversed if shark is upside down
      flip = [2, -2].indexOf(Math.round(this.actor.getEulerZ() / (Math.PI / 2))) === -1 ? flip : !flip;
      this.actor.spriteRenderer.setHorizontalFlip(flip);
      this.sunglasses.spriteRenderer.setHorizontalFlip(flip);
    }
  }

  /** Attack other fishes */
  private bite() {
    // While biting, every fishes around detect that they are attacked
    this._biting = true;
    
    // sprite
    if (this.transformed) {
      this.actor.spriteRenderer.setSprite('sprites/shark');
    }
    this.actor.spriteRenderer.setAnimation('bite');
    this.sunglasses.spriteRenderer.setAnimation('bite');
    
    // SFX
    Sup.Audio.playSound('sfx/attack', 0.5);
    
    // Biting doesn't last
    Sup.setTimeout(300, ()=> {
      this._biting = false;
      
      // sprite
      if (this.transformed) {
        this.actor.spriteRenderer.setSprite('sprites/' + this.transformations[this.morphIndex]);
      }
      this.actor.spriteRenderer.setAnimation('default');
      this.sunglasses.spriteRenderer.setAnimation('default');
    });
  }

  /** Notify other fishes of the attack */
  isBiting() : boolean {
    return this._biting;
  }

  /** Indiate if talking to a fish */
  isTalking(): boolean {
    return this._frozen;
  }
}
Sup.registerBehavior(SharkBehavior);
