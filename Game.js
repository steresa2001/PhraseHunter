/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

/**
 * Creates Game class.
 * @class
 * @property {number} missed
 * @property {array} phrases
 * @property {string} activePhrase
 */
class Game {
  constructor() {
    this.missed = 0;
    this.phrases = [
      { phrase: new Phrase("Good Luck") },
      { phrase: new Phrase("Happy Coding") },
      { phrase: new Phrase("Times Up") },
      { phrase: new Phrase("High Five") },
      { phrase: new Phrase("Nailed It") },
    ];
    this.activePhrase = null;
    this.overlay = document.querySelector("#overlay");
    this.phraseLetterContainer = document.querySelector("#phrase ul");
    this.startButton = document.querySelector("#btn__reset");
  }

  /**
   * Starts game
   * @returns {function} activePhrase
   */
  startGame() {
    this.overlay.style.display = "none";
    this.overlay.className = "start";
    this.activePhrase = this.getRandomPhrase();
    return this.activePhrase.phrase.addPhraseToDisplay();
  }

  /**
   * Returns random phrase
   * @returns {array} currentPhrase
   */
  getRandomPhrase() {
    const phrase = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[phrase];
  }

  /**
   * Handle click action for letter buttons
   * Check if chosen letter is in the phrase
   * Remove a life if wrong letter is chosen
   * Check if user won the game
   * @param {object} event
   */
  handleInteraction(event) {
    let button = event.currentTarget;
    let letter = event.currentTarget.textContent;
    let letterMatch = this.activePhrase.phrase.checkLetter(letter);
    button.disabled = true;

    if (!letterMatch) {
      button.classList.add("wrong");
      return this.removeLife();
    }
    button.classList.add("chosen");
    this.checkForWin();
  }

  /**
   * Track how many lives are left
   * Reset live hert image with lost heart image
   * Check for game over
   * @returns {bool} this.gameOver
   */
  removeLife() {
    let miss = this.missed++;
    if (miss === 4) {
      return this.gameOver(false);
    }
    const heart = document.querySelectorAll(".tries img");
    heart[miss].src = "images/lostHeart.png";
  }
  /**
   * Get all letters in phrase
   * Filter the letters by getting all hidden letters and ignore spaces
   * If there are no hidden letters then user has won
   */
  checkForWin() {
    const letters = document.querySelectorAll("#phrase ul li");
    const lettersShown = [...letters].filter(
      (element) =>
        !element.classList.contains("show") &&
        !element.classList.contains("space")
    );
    const lettersShownLength = lettersShown.length;
    if (lettersShownLength === 0) {
      this.gameOver(true);
    }
  }

  /**
   * Check for game over
   * Show the overlay
   * If game is won, set winning message and set overlay class to win
   * If game is lost, set loosing message and set overlay class to lose
   * Reset the game
   * @param {bool} win
   */
  gameOver(win) {
    const gameOverMessage = document.querySelector("#game-over-message");
    this.overlay.style.display = "inherit";

    if (win) {
      gameOverMessage.textContent = "Winner!";
      this.overlay.className = "win";
    } else {
      gameOverMessage.textContent = "Game Over!";
      this.overlay.className = "lose";
    }
    this.reset();
  }

  /**
   * Reset game
   * Reset number of missed letters
   * Clear the phrase
   * Reset classes for all letter buttons
   * Remove disabled attribute
   * Reset lost heart images back to live hearts
   */
  reset() {
    this.missed = 0;
    this.phraseLetterContainer.innerHTML = "";
    const letterButtons = document.querySelectorAll(".key");
    letterButtons.forEach((element) => {
      element.className = "key";
      element.disabled = false;
    });

    const heart = document.querySelectorAll(".tries img");
    heart.forEach((element) => {
      element.src = "images/liveHeart.png";
    });
    helpMessageContainer.classList.add("hide");
  }
}
