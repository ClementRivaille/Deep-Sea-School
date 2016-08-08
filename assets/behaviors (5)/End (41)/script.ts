/**
 * The End display messages, score, and show fishes that have been befriended
 */
class EndBehavior extends Sup.Behavior {
  awake() {
    // look at score and friends
    let score = globalScoreManager.getScore()
    let friends = globalScoreManager.getFriends();
    
    // Get text boxes;
    let congratulation = this.actor.getChild('congratulation').textRenderer;
    let scoreText = this.actor.getChild('score').textRenderer;
    let friendsText = this.actor.getChild('friends').textRenderer;
    let restart = this.actor.getChild('restart').textRenderer;
    
    let numbersWords = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    
    scoreText.setText('SCORE:\n' + score);
    friendsText.setText('You made ' + numbersWords[friends.length] + ' new friends!');
    if (friends.length === 0 || score > 400) {
      // Worse end, have a game over with just score
      congratulation.setText('GAME OVER');
      scoreText.setOpacity(1);
      friendsText.setOpacity(0);
      restart.setText('Press R to try again');
    }
    else if(friends.length < 4 && score > 150) {
      // Meh ending, you see friends, but also your score
      congratulation.setText('Playtime is over')
      scoreText.setOpacity(1);
      friendsText.setOpacity(1);
      restart.setText('If you want to play again, press R');
    }
    else {
      // Good ending: you see only friends!
      congratulation.setText('CONGRATULATIONS');
      scoreText.setOpacity(0);
      friendsText.setOpacity(1);
      restart.setText('If you want to play again, press R');
    }
    
    // set all fishes Opacity to 0
    for (let fish of this.actor.getChild('fishes').getChildren()) {
      fish.spriteRenderer.setOpacity(0);
    }
    // Display friend fishes
    for (let specie of friends) {
      this.actor.getChild('fishes').getChild(specie).spriteRenderer.setOpacity(1);
    }
  }
  

  update() {
    // Player restarts the game by pressing R
    if (Sup.Input.wasKeyJustPressed('R')) {
      Sup.destroyAllActors();
      globalScoreManager.init();
      globalJukebox.start();
      Sup.loadScene('Main');
      this.actor.destroy();
    }
  }
}
Sup.registerBehavior(EndBehavior);
