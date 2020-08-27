var generateBtn = document.querySelector("#generate");
var passLengthSlider = document.getElementById("passwordLength");
var passLenghtLabel = document.getElementById("passLengthLabel");
var submitButton = document.getElementById("submitButton");
var lowercaseCheckbox = document.getElementById("lowercase");
var uppercaseCheckbox = document.getElementById("uppercase");
var numbersCheckbox = document.getElementById("numbers");
var symbolsCheckbox = document.getElementById("symbols");
var noCharacterAlert = document.getElementById("noCharacterChosen");

// Write password to the #password input
function writePassword(password) {
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Take an array of 4 booleans as input, and return a string which includes all the characters that a user would like to include in her password

function createCharacterSet(passwordElements) {

  var charactersArray = ["abcdefghijklmnopqrstuvwxyz", "ABCEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", ' !#$%&\'()*+,-./:;<=>?@[]^_`{|}~\\"'];
  var chosenCharacters = "";
  for (var i = 0; i < passwordElements.length; i++) {
    if (passwordElements[i]) {
      chosenCharacters = chosenCharacters + charactersArray[i];
    }
  }
  return chosenCharacters;
}

//Take a string as an input, and return a random character from that string.     
function generateRandomCharacter(chosenCharacters) {
  var randomIndex = Math.floor(Math.random() * chosenCharacters.length);
  return chosenCharacters[randomIndex];
}

//Take desired characters and length, and returns a password using those parameters. 

function generatePassword(passwordElements, passwordLength) {
  var chosenCharacters = createCharacterSet(passwordElements);
  var password = "";

  for (var i = 0; i < passwordLength; i++) {
    password = password + generateRandomCharacter(chosenCharacters);

  }
  return password;
}

// Updates the slider label with the current value, as the slider moves 
function updateSliderLabel() {
  passLenghtLabel.innerHTML = passLengthSlider.value;
}

// Validate the input and pass it as parameters to password generator


function validateInput(event) {
  event.preventDefault();
  params = [false, false, false, false];

  if (lowercaseCheckbox.checked) {
    params[0] = true;
  }
  if (uppercaseCheckbox.checked) {
    params[1] = true;
  }
  if (numbersCheckbox.checked) {
    params[2] = true;
  }
  if (symbolsCheckbox.checked) {
    params[3] = true;
  }

  if (!params.includes(true)) {
    alert("At least one character type must be selected");
  }

  else {
    var password = generatePassword(params, passLengthSlider.value);
    $('#passwordModal').modal('hide');
    writePassword(password);
  }
}

// Events

passLengthSlider.addEventListener("change", updateSliderLabel);
submitButton.addEventListener("click", validateInput);
