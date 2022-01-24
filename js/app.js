/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

/**
 * Creates a new Game.
 * @class
 */
let game = new Game();

// Global vars
const body = document.querySelector("body");
const startButton = document.querySelector("#btn__reset");
const letterButtons = document.querySelectorAll("#qwerty button");
const helpMessageContainer = document.querySelector("#help-message-container");

/**
 * Returns true or false if element is visible or not
 * @param {object} el
 * @returns {bool}
 */
const isElementVisible = (el) => el.offsetParent === null;

/**
 * Help message control
 * Gets DOM elements
 * Sets help message
 * Removes hide class
 * Adds click event for close button which adds hide class
 */
const helpMessageControl = () => {
  const helpMessage = document.querySelector("#help-message");
  const closeHelpMessage = document.querySelector("#close-help-message");
  helpMessage.textContent =
    "Please only type letters and make sure capslock is off";
  helpMessageContainer.classList.remove("hide");

  closeHelpMessage.onclick = () => {
    helpMessageContainer.classList.add("hide");
  };
};

/**
 * Add keyboard control fro selecting letters
 * If typed letter is in phrase trigger manual click on that letter button
 * Check if user types anything other than a letter and show help message
 * @param {object} event
 * @returns {bool} Returns true if start button is hidden
 */
body.addEventListener("keyup", (event) => {
  const isStartButtonVisible = isElementVisible(startButton);
  if (!isStartButtonVisible) return true;
  const filteredLetterButtons = [...letterButtons].filter(
    (element) => element.textContent === event.key
  );
  if (filteredLetterButtons.length !== 0) {
    filteredLetterButtons[0].click();
  } else {
    helpMessageControl();
  }
});

/**
 * Adds click event to all letter buttons for handleInteraction function
 * @param {object} element
 */
letterButtons.forEach((element) => {
  element.addEventListener("click", (event) => {
    game.handleInteraction(event);
  });
});

/**
 * Triggers start of game
 */
startButton.addEventListener("click", () => game.startGame());
