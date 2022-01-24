/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

/**
 * Create Phrase class
 * @class
 * @property {string} phrase
 */
class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /**
   * Adds phrase to display
   * Creates <li> for each letter in the phrase
   * Adds phrase to screen
   * @returns {object} <li>
   */
  addPhraseToDisplay() {
    const letters = this.phrase.split("");
    letters.forEach((element) => {
      let node = document.createElement("li");
      node.textContent = element;
      node.className = "hide";
      if (element === " ") {
        node.classList.add("space");
      } else {
        node.classList.add("letter");
      }
      document.querySelector("#phrase ul").append(node);
    });

    return letters;
  }

  /**
   * Set guess to false by default
   * Get all letters in phrase and check if chosen letter is in phrase
   * If letter is in phrase, show the letter and set guess to true
   *
   * @param {string} letter
   * @returns {bool} guess
   */
  checkLetter(letter) {
    let guess = false;
    const lettersInPhrase = document.querySelectorAll("#phrase ul li");
    lettersInPhrase.forEach((element) => {
      if (element.textContent === letter) {
        this.showMatchedLetter(element);
        guess = true;
      }
    });
    return guess;
  }

  /**
   * Remove hide class from letter
   * Add show class to letter
   * @param {string} letter
   */
  showMatchedLetter(letter) {
    letter.classList.remove("hide");
    letter.classList.add("show");
  }
}
