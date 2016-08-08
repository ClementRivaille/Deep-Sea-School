/**
 * We'll define fishes movement here. Each specie has a different one.
 */
class MovementBehavior extends Sup.Behavior {
  actor: Sup.Actor;
  specie: string;
  sprite: string;
  _frozen: boolean;

  _solidBodies: Sup.ArcadePhysics2D.Body[] = [];
  awake() {
    // Set specie
    let fishB = this.actor.getBehavior(FishBehavior)
    if (fishB) {
      fishB.setSpecie(this.specie);
    }
    // this.actor.spriteRenderer.setSprite(this.sprite);
    
    // Store obstacles' bodies
    let solidActors = Sup.getActor('solids').getChildren();
    for (let solid of solidActors) {
      this._solidBodies.push(solid.arcadeBody2D);
    }
    
    // Default animation
    this.actor.spriteRenderer.setAnimation('default');
  }

  /** Freeze when dialoging */
  freeze(activate: boolean) {
    this.actor.arcadeBody2D.setVelocity({x: 0, y: 0});
    this._frozen = activate;
  }
}

/**
 * Salmon goes left and right as fast as it can, and turn around when it collides with a wall.
 */
class SalmonBehavior extends MovementBehavior {
  specie = 'salmon';
  sprite = 'sprites/salmon';
  direction: number = 1;

  update() {
    // collides
    let colliding = Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this._solidBodies);
    if (colliding && !this._frozen) {
      // Turn around and loose all speed
      let touches = this.actor.arcadeBody2D.getTouches();
      this.direction = touches.left ? 1 : -1;
      
      // Slight Y
      let yVelocity = Math.random() * 0.1 - 0.05;
      this.actor.arcadeBody2D.setVelocity({x: 0, y: yVelocity});
    }
    
    if (!this._frozen) {
      // Keep sprite in correct direction
      this.actor.spriteRenderer.setHorizontalFlip(this.direction === -1);
      // Speed up
      this.actor.arcadeBody2D.addVelocityX(this.direction * 0.004);
    };
  }
}
Sup.registerBehavior(SalmonBehavior);

/**
 * Angler fish slowly goes around in random directions, and turn at random intervals
 */
class AnglerBehavior extends MovementBehavior {
  specie = 'angler';
  sprite = 'sprites/angler'
  turning: boolean = true;
  speed:number = 0.01;
  private waiting: boolean = false;

  update() {
    // collides
    let colliding = Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this._solidBodies);
    this.turning = this.turning || !!colliding;
    
    if (this.turning && !this._frozen) {
      // Take a nex direction
      this.turn();
      this.turning = false;
      // Don't start another timer if the turn is due to a collision
      if (!colliding || !this.waiting) {
        // Wait before going elsewhere
        this.waiting = true;
        let nextTurnDelay = Math.random() * 4000 + 1000;
        Sup.setTimeout(nextTurnDelay, () => {
          this.turning = true;
          this.waiting = false;
        });
      }
    }
  }

  turn() {
    let velocity = new Sup.Math.Vector2();
    velocity.setFromAngle(Math.random() * 2 * Math.PI - Math.PI);
    velocity.multiplyScalar(this.speed);
    this.actor.arcadeBody2D.setVelocity(velocity);
    // Flip sprite
    this.actor.spriteRenderer.setHorizontalFlip(velocity.x < 0);
  }
}
Sup.registerBehavior(AnglerBehavior);

/**
 * Clownfish swim briefly in a direction, then let itself slow down a little before swimming again.
 */
class ClownBehavior extends MovementBehavior {
  specie = 'clown';
  sprite = 'sprites/clownfish';
  swiming: boolean = true;
  speed: number = 0.2;

  update() {
    let currentVelocity = this.actor.arcadeBody2D.getVelocity();
    let colliding = Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this._solidBodies);
    
    if (this.swiming && !this._frozen) {
      // Give a tin impulse
      this.swim();
      currentVelocity = this.actor.arcadeBody2D.getVelocity();
      this.swiming = false;
      let nextTurnDelay = Math.random() * 1000 + 1000;
        Sup.setTimeout(nextTurnDelay, () => {
          this.swiming = true;
        });
    }
    
    // Slow down
    currentVelocity.multiplyScalar(0.95);
    
    // Bounce on walls
    if (colliding) {
      let touches = this.actor.arcadeBody2D.getTouches();
      if (touches.top || touches.bottom) {
        currentVelocity.y = Math.abs(currentVelocity.y) * (touches.bottom ? 1 : -1);
      }
      else if (touches.left || touches.right) {
        currentVelocity.x = Math.abs(currentVelocity.x) * (touches.left ? 1 : -1);
      }
    }
    
    this.actor.arcadeBody2D.setVelocity(currentVelocity);
  }

  swim() {
    let velocity = new Sup.Math.Vector2();
    velocity.setFromAngle(Math.random() * 2 * Math.PI - Math.PI);
    velocity.multiplyScalar(this.speed);
    this.actor.arcadeBody2D.setVelocity(velocity);
    // Flip sprite
    this.actor.spriteRenderer.setHorizontalFlip(velocity.x < 0);
  }
}
Sup.registerBehavior(ClownBehavior);

/**
 * Tang goes left and right, and slighlty up and down
 */
class TangBehavior extends MovementBehavior {
  specie = 'tang';
  sprite = 'sprites/tang';
  verticalDirection = {
    speed: 0.03,
    direction: -1,
    turning: true,
    axis: 'y'
  };
  horizontalDirection = {
    speed: 0.045,
    direction: -1,
    turning: true,
    axis: 'x'
  };
  private waiting: boolean = false;

  update() {
    // collides
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this._solidBodies);
    let touches = this.actor.arcadeBody2D.getTouches();
    
    // Horizontal turning
    this.horizontalDirection.turning = this.horizontalDirection.turning || touches.left || touches.right;
    if (this.horizontalDirection.turning && !this._frozen) {
      this.amorceTurn(this.horizontalDirection, touches.left || touches.right, Math.random() * 7000 + 3000);
    }
    // Vertical turning
    this.verticalDirection.turning = this.verticalDirection.turning || touches.bottom || touches.top;
    if (this.verticalDirection.turning && !this._frozen) {
      this.amorceTurn(this.verticalDirection, touches.top || touches.bottom, Math.random() * 2000 + 1000);
    }
  }

  amorceTurn(directionData, colliding: boolean, nextTurnDelay: number) {
    // Take a new direction
    directionData.direction = -directionData.direction;
    this.turn(directionData.axis, directionData.direction, directionData.speed);
    directionData.turning = false;
    // Don't start another timer if the turn is due to a collision
    if (!colliding || !this.waiting) {
      // Wait before going elsewhere
      this.waiting = true;
      Sup.setTimeout(nextTurnDelay, () => {
        directionData.turning = true;
        this.waiting = false;
      });
    }
  }

  turn(axis: string, direction: number, speed: number) {
    let velocityValue = speed * direction;
    let velocity = this.actor.arcadeBody2D.getVelocity();
    velocity[axis] = velocityValue;
    this.actor.arcadeBody2D.setVelocity(velocity);
    // Flip sprite
    this.actor.spriteRenderer.setHorizontalFlip(velocity.x < 0);
  }
}
Sup.registerBehavior(TangBehavior);


/**
 * Jellyfish, goes up and down, with a slight side push.
 */
class JellyfishBehavior extends MovementBehavior {
  specie = 'jellyfish';
  sprite = 'sprites/jellyfish';
  force: number = 0.1;
  swimming: boolean = true;

  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this._solidBodies);
    
    // Push up
    if (this.swimming && !this._frozen) {
      this.swim();
      this.swimming = false;
      // Wait for another swim
      Sup.setTimeout(Math.random() * 3000 + 2000, () => {
        this.swimming = true;
      });
    }
    
    // Custom gravity in water
    if (!this._frozen) {
      this.actor.arcadeBody2D.setVelocityY(Math.max(this.actor.arcadeBody2D.getVelocityY() - 0.001, -0.04));
      
        // Set sprite to upward or downward
      if (this.actor.arcadeBody2D.getVelocityY() === -0.04 || this.actor.arcadeBody2D.getTouches().bottom) {
        this.actor.spriteRenderer.setAnimation('descend');
      }
      else {
        this.actor.spriteRenderer.setAnimation('default');
      }
    }
    
  }

  swim() {
    let velocity = new Sup.Math.Vector2();
    velocity.y = this.force;
    velocity.x = Math.random() * 0.02 - 0.01;
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(JellyfishBehavior);

/**
 * Seahorse is like jellyfish, with more side push and less time
 */
class SeahorseBehavior extends MovementBehavior {
  specie = 'seahorse';
  sprite = 'sprites/seahorse';
  force: number = 0.06;
  swimming: boolean = true;

  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this._solidBodies);
    
    // Push up
    if (this.swimming && !this._frozen) {
      this.swim();
      this.swimming = false;
      // Wait for another swim
      Sup.setTimeout(Math.random() * 3000 + 1000, () => {
        this.swimming = true;
      });
    }
    
    // Custom gravity in water
    if (!this._frozen) {
      this.actor.arcadeBody2D.setVelocityY(Math.max(this.actor.arcadeBody2D.getVelocityY() - 0.001, -0.02));
    }
    
  }

  swim() {
    let velocity = new Sup.Math.Vector2();
    velocity.y = this.force;
    velocity.x = Math.random() * 0.08 - 0.04;
    
    // Prevent this dummy to swim into a wall
    let touches = this.actor.arcadeBody2D.getTouches();
    if (touches.left || touches.right) {
      velocity.x = Math.abs(velocity.x) * (touches.left ? 1 : -1);
    }
    
    this.actor.arcadeBody2D.setVelocity(velocity);
    // Flip sprite
    this.actor.spriteRenderer.setHorizontalFlip(velocity.x < 0);
  }
}
Sup.registerBehavior(SeahorseBehavior);

/**
 * Crab is bound to gravity. They go left and right, and sometime stop.
 */
class CrabBehavior extends MovementBehavior {
  specie = 'crab';
  sprite = 'sprites/crab';
  speed:number = 0.05;
  moving = true;
  private waiting: number = 0;
  
  awake() {
    super.awake();
    this.actor.arcadeBody2D.setCustomGravityY(-0.02);
  }

  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this._solidBodies);
    
    // Are we hitting a wall?
    let touches = this.actor.arcadeBody2D.getTouches();
    this.moving = touches.left || touches.right || this.moving;
    
    if(this.moving && !this._frozen) {
      // Will we go left, right, or stop?
      let direction;
      if (touches.left || touches.right) {
        // If colliding, we just turn away
        direction = touches.left ? 1 : -1;
      }
      else {
        // We decide randomly
        let decision = Math.random() * 3;
        direction = decision < 1 ? - 1 : decision < 2 ? 0 : 1;
      }
      this.move(direction); 
      this.moving = false;
      
      if (!touches.left && !touches.right || this.waiting === 0) {
        // Wait for next turn
        this.waiting = Sup.setTimeout(Math.random() * 1000 + 500, () => {
          this.moving = true;
          
          // Sometime the crab will hit themself while turning, causing them to never launch the timer again
          // This is here to prevent it
          this.waiting = 0;
        });
      }
    }
    
    // When crab is falling, they are slower
    if (this.actor.arcadeBody2D.getVelocityY() < 0) {
      let currentDirection = this.actor.arcadeBody2D.getVelocityX() / (Math.abs(this.actor.arcadeBody2D.getVelocityX()) || 1);
      let newSpeed = this.speed * 0.2 * currentDirection;
      this.actor.arcadeBody2D.setVelocityX(newSpeed)
    }
  }

  move(direction: number) {
    this.actor.arcadeBody2D.setVelocityX(this.speed * direction);
  }
}
Sup.registerBehavior(CrabBehavior);

/**
 * Betta swim slowly in one direction, then stop before swimming in another
 */
class BettaBehavior extends MovementBehavior {
  specie = 'betta';
  sprite = 'sprites/betta';
  turning: boolean = true;
  speed:number = 0.03;
  stopping:boolean = true;
  private waiting: boolean = false;

  update() {
    // collides
    let colliding = Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this._solidBodies);
    this.turning = this.turning || !!colliding;
    
    if (this.turning && !this._frozen) {
      // Take a new direction if colliding or stopping
      if (colliding || this.stopping) {
        this.turn();
        this.stopping = false;
      }
      // Otherwise, meditate a little
      else {
        this.stopping = true;
      }
      this.turning = false;
      // Don't start another timer if the turn is due to a collision
      if (!colliding || !this.waiting) {
        // Wait before going elsewhere
        let nextTurnDelay = Math.random() * 2500 + 1000;
        this.waiting = true;
        Sup.setTimeout(nextTurnDelay, () => {
          this.turning = true;
          this.waiting = false;
        });
      }
    }
    
    // Stopping means decelerating slowly
    if (this.stopping) {
      let pausingVelocity = this.actor.arcadeBody2D.getVelocity().multiplyScalar(0.95);
      this.actor.arcadeBody2D.setVelocity(pausingVelocity);
    }
  }

  turn() {
    let velocity = new Sup.Math.Vector2();
    velocity.setFromAngle(Math.random() * 2 * Math.PI - Math.PI);
    velocity.multiplyScalar(this.speed);
    this.actor.arcadeBody2D.setVelocity(velocity);
    // Flip sprite
    this.actor.spriteRenderer.setHorizontalFlip(velocity.x < 0);
  }

  pause() {
    this.actor.arcadeBody2D.setVelocity(new Sup.Math.Vector2());
  }
}
Sup.registerBehavior(BettaBehavior);