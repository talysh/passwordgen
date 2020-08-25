// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = returnPassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
  passwordText.append(password);
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Ask user to enter password characteristics and passes the arguments into password generator function.
function returnPassword() {

  var passwordLength = getPasswordLength();
  var params = getPasswordCharacters();

  var password = generatePassword(params, passwordLength);
  return password;

}

//Keep prompting the user to enter a password length until she enters a valid argument, and returns that value as integer. 

function getPasswordLength() {
  var passwordLength = parseInt(prompt("Please, enter password length between [8-128] characters:"));
  while (passwordLength < 8 || passwordLength > 128 || !Number.isInteger(passwordLength)) {
    passwordLength = parseInt(prompt("Please, enter a valid input - a whole number between 8-128:"))
  }
  return passwordLength;
}

//Prompt user if he would like to include certain characters in the password 

function getPasswordCharacters() {
  var params = [];

  params.push(confirm("Would you like lowercase characters in your password?"));
  params.push(confirm("Would you like uppercase characters in your password?"));
  params.push(confirm("Would you like numbers in your password?"));
  params.push(confirm("Would you like specials characters in your password?"));

  //Because the character '"' had to be handled separately from the other special characters, the final BOOLEAN value in the array is duplicated 
  params.push(params[params.length - 1]);

  //If the user does not pick at least one type of character to be included in the password, prompt him to pick characters again
  if (!params.includes(true)) {
    alert("Please, select at least one type of character");
    params = getPasswordCharacters();
  }
  return params;

}


// Take an array of 5 booleans as input, and return a string which includes all the characters that a user would like to include in her password

function createCharacterSet(passwordElements) {

  var charactersArray = ["abcdefghijklmnopqrstuvwxyz", "ABCEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", " !#$%&'()*+,-./:;<=>?@[\]^_`{|}~", '"',];
  var chosenCharacters = "";
  for (var i = 0; i < passwordElements.length; i++) {
    if (passwordElements[i]) {
      chosenCharacters = chosenCharacters + charactersArray[i];
    }
  }
  return chosenCharacters;
}

//Take a string as an input, and return a random character from that string back.
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
  console.log("Your password is: " + password);
}
