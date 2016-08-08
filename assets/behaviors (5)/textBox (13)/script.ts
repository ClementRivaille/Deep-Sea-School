const DEFAULT_SPEED = 50;

/**
 * TextBox displays an array of sentences one character at a time
 */
class TextBoxBehavior extends Sup.Behavior {
  texts:Array<{text: string, speed?: number}>;
  
  private _currentSpeed:number;
  private _currentText:number;
  private _waiting:boolean;
  private _active:boolean = false;
  private _started: boolean = true;
  
  /**
   * Prepare for a new dialog
   */
  init(texts: Array<{text: string, speed?: number}>) {
    this.texts = texts;
  }

  /** Check for user inputs while displaying */
  update() {
    // On 'Z pressed'
    if (Sup.Input.wasKeyJustPressed('Z')) {
      if (this._active) {
        // If waiting for next dialog, continue
        if (this._waiting) {
          this._currentText += 1;
          // display next text
          if (this._currentText < this.texts.length) {
            this.displayText(this._currentText);
          }
          // or close dialog
          else {
            this.close();
          }
        }
        // If text isn't finished, set speed to 0 to skip it
        else if (!this._started) {
          this._currentSpeed = 0;        
        }
        else {
          // Stop ignoring input
          this._started = false;
        }
      }
    }
    
  }

  /** Begin the entire dialog*/
  startDialog() {
    // Display a black box
    this.actor.getChild('boxSquare').spriteRenderer.setOpacity(0.8);
    
    // Init active and current text
    this._active = true;    
    this._currentText = 0;
    
    // Show the first text
    this.displayText(0);
    
    // Ignore input for one frame
    this._started = true;
  }

  /** Display one of the text from the dialog
  * @param index [number] : Index of text in dialog
  */
  private displayText(index: number) {
    // Init speed, from text option or default one
    this._currentSpeed = this.texts[index].speed !== undefined ? this.texts[index].speed : DEFAULT_SPEED;
    // Stop waiting
    this._waiting = false;
    
    // Call displayLetter to begin
    this.actor.textRenderer.setText('');
    this.displayLetters(this.texts[index].text, 0);
  }

  /** Display text letter by letter. This method is called recursively until the given text is entirely displayed.
  * @param text [string] : Text to display
  * @param index [number] : Index of letter in text
  */
  private displayLetters(text:string, index:number) {
    // Wait according to speed
    Sup.setTimeout(this._currentSpeed, ()=> {
      // display next letter
      if (index < text.length && this._currentSpeed != 0) {
        let displayed = this.actor.textRenderer.getText();
        displayed += text[index];
        this.actor.textRenderer.setText(displayed);
        this.displayLetters(text, index+1);
      }
      // Or begin to wait for an input
      else {
        this.actor.textRenderer.setText(text);
        this._waiting = true;
      }
    });
  }

  /** Close dialog and do not display anything */
  private close() {
    this._active = false;
    this.actor.getChild('boxSquare').spriteRenderer.setOpacity(0);
    this.actor.textRenderer.setText('');
  }

  /** Textbox users need to know when they are talking */
  isActive() {
    return this._active;
  }
}
Sup.registerBehavior(TextBoxBehavior);


/**
 * Instruction apearing just a few seconds at the beginning
 */
class CommandsInstructions extends Sup.Behavior {
  timeFade: number = 4000;
  fadeInterval: number;
  private fading: boolean = false;
  
  awake() {
    // Fade out after some time
    Sup.setTimeout(this.timeFade, () => this.fading = true);
  }

  update() {
    if (this.fading) {
      
      this.fading = false;
      
      // Start fading (only once)
      this.fadeInterval = Sup.setInterval(100, () => {
        // Decrease text's opacity
        let opacity = this.actor.textRenderer.getOpacity() - 0.1;
        this.actor.textRenderer.setOpacity(opacity);
      });
    }
    
    if (this.actor.textRenderer.getOpacity() === 0) {
      // When done fading, destroy itself
      Sup.clearInterval(this.fadeInterval);
      this.actor.destroy();
    }
  }
}

Sup.registerBehavior(CommandsInstructions);