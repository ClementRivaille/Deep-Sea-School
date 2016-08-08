/**
 * Camera following the player
 */
class CameraBehavior extends Sup.Behavior {
  
  // The camera move when player cross a line before the camera actual depth, defined by "limit"
  depth:number;
  limit:number = 3;
  private player:Sup.Actor;

  /** Sometime, the camera will move to a specific target */
  private _target: Sup.Math.Vector2;
  
  awake() {
    this.player = Sup.getActor('shark');
    this.depth = this.actor.camera.getOrthographicScale();
  }

  update() {
    // Read actors positions
    let position = this.actor.getPosition();
    let playerPosition = this.player.getPosition();

    // Calculate vertical and horizontal adjustements to make to follow the player
    let adjustY = this.getAdjustedPosition(position.y, playerPosition.y, this.depth);
    if (adjustY)
      this.actor.moveY(adjustY);
    let adjustX = this.getAdjustedPosition(position.x, playerPosition.x, this.depth);
    if (adjustX)
      this.actor.moveX(adjustX);
    
    // Move the camera to a target if there is one
    if (this._target) {
      // This is what you write when you don't know that there is a "distanceTo" function
      if (Math.sqrt(Math.pow(this._target.x - position.x, 2) + Math.pow(this._target.y - position.y, 2)) >= 0.2) {
        // Make a nice movement until we're aproximately at the center
        let moveVector = new Sup.Math.Vector2().set(this._target.x - position.x, this._target.y - position.y);
        moveVector = moveVector.multiplyScalar(1 / moveVector.length()).multiplyScalar(0.2);
        this.actor.move(moveVector);
      }
      else {
        // Movement done
        this._target = undefined;
      }
    }
  }

  /**
  * Adjust the camera position according to a limit
  */
  private getAdjustedPosition(position:number,playerPosition:number, depth:number) {
    // Difference between camera position and player position
    let relativePosition = playerPosition - position;
    // Difference between vector result and limit line (abs)
    let adjustement = Math.abs(relativePosition) - (depth/2 - this.limit);
    
    // If adjustement needed, change its sign acordingly to relative position
    if (adjustement > 0)
      adjustement = Math.abs(relativePosition)/relativePosition * adjustement;
    else
      adjustement = 0;
    
    return adjustement;
  }

  /** Init centering on a specific point */
  centerOn(position: {x: number, y: number}) {    
    this._target = new Sup.Math.Vector2().set(position.x, position.y)
  }
}
Sup.registerBehavior(CameraBehavior);
