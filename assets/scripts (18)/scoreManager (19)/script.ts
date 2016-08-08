/**
 * This entity manages score and friendships
 * When the shark kills a fish, it adds some points, and the species become enemy
 * When the shark talks enough to a big fish without having attacked its specie, it becomes friend
 */
class ScoreManager {
  _score: number = 0;
  _friends: Array<string> = [];
  private powers: Array<string> = [];
  _enemies: Array<string> = [];
  /** Associate an actor name talking for a specie */
  _representants: Object = {};

  _gui: GUIBehavior;

  /** Begin a new game */
  init() {    
    this._score = 0;
    this._friends = [];
    this.powers = [];
    this._enemies = [];
    this._representants = {};
  }

  /** Set current instance of GUI */
  connectGUI(gui: GUIBehavior) {
    this._gui = gui;
  }

  /** Declare a fish actor as representant of a specie */
  setRepresentant(specie: string, actorName: string) {
    this._representants[specie] = actorName;
  }

  /** Add points to the global score */
  addPoints(min:number = 0) {
    this._score += Math.floor(Math.random()*20 + min);
    this._gui.updateScore(this._score);
  }

  getScore() {
    return this._score;
  }

  getFriends() {
    return this._friends;
  }

  hasPower(specie: string): boolean {
    return this.powers.indexOf(specie) !== -1;
  }

  /**
  * Register specie as enemy
  */
  setEnemy(specie:string) {
    // Add specie to enemies
    if (this._enemies.indexOf(specie) === -1) {
      this._enemies.push(specie);
      
      // The representant is now angry
      let representantFish = Sup.getActor(this._representants[specie]);
      if (representantFish) {
        representantFish.getBehavior(BigFishBehavior).makeAngry();
      }
    }
    
    // Immediately unfriend
    let friendIndex = this._friends.indexOf(specie);
    if (friendIndex !== -1)
      this._friends.splice(friendIndex, 1);
    
    // Stop music
    globalJukebox.deactivate(specie);
  }

  /**
  * Add a new friend
  */
  setFriend(specie: string) {
    if (this._friends.indexOf(specie) === -1)
      this._friends.push(specie);
      // New friend means new power obtained (permanent)
      this.powers.push(specie);
  }

  isEnemy(specie: string) {
    return this._enemies.indexOf(specie) !== -1;
  }

  isFriend(specie: string) {
    return this._friends.indexOf(specie) !== -1;
  }
}

const globalScoreManager = new ScoreManager();