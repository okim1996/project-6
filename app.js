var playerButtons = document.querySelector('#qwerty');
var phrase = document.querySelector('#phrase');
var missed = 0;
const phrases = ['The cat chased the mouse relentlessly',
'No one has been in more movies than Kevin Bacon',
'The word racecar is the same spelled backwards',
'There are over five hundred trees inside of this park',
'Mcdonalds has sold over one hundred billion burgers worldwide']
var currentLives = document.querySelectorAll('.tries');
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

function removePlayerButtons (button) {
    for (let keyrow = 0 ; keyrow < 3 ; keyrow++ ){
        for (let i = 0 ; i < playerButtons.children[keyrow].children.length ; i++){
            if (playerButtons.children[keyrow].children[i].textContent === button) {
                playerButtons.children[keyrow].children[i].style.display = 'none';
            }        
        }
    }
}

function resetPlayerButtons () {
    for (let keyrow = 0 ; keyrow < 3 ; keyrow++ ){
        for (let i = 0 ; i < playerButtons.children[keyrow].children.length ; i++){
            playerButtons.children[keyrow].children[i].style.display = 'inline-block';
        }
    }
}

function clearPhrase () {
    let removeItem;
    while (phrase.children.length !== 1 ) {
        removeItem = phrase.children[1];
        phrase.removeChild(removeItem);
    }
}

function startGame() {
    const startButton = document.querySelector('.btn__reset');
    startButton.addEventListener('click', function (){        
        document.querySelector('#overlay').style.display = 'none';
    })

};

function getRandomPhraseAsArray (phraseArr) {
    const chosenPhrase = phraseArr[Math.floor(Math.random() * 5)]; 
    let characterArray = []; 
    for (let i = 0 ; i < chosenPhrase.length ; i++) { 
        if (chosenPhrase.charAt(i) !== " ") {
            characterArray.push(chosenPhrase.charAt(i));
        } else {
            characterArray.push('*');
        }                                       
    }
    return characterArray;
}

function addPhraseToDisplay(charArr) {    
    let li;
    for (let i = 0 ; i < charArr.length ; i++){        
        li = document.createElement('li');
        li.textContent = charArr[i];
        li.className = 'letter';
        if (charArr[i] === '*'){
            li.className += ' show chosen';
        }
        phrase.appendChild(li);     
    }
    
}

function checkLetter (clickedButton) {    
    if (phraseArray.includes(clickedButton.toLowerCase()) ||
    phraseArray.includes(clickedButton.toUpperCase())) {
        for (let i = 1 ; i < phrase.children.length ; i++) {            
            if (phrase.children[i].textContent.toLowerCase() === clickedButton
            &&  !phrase.children[i].className.includes('chosen')){
                phrase.children[i].className += ' show chosen';
                removePlayerButtons(clickedButton.toLowerCase());
            } 
        }
    } else {
        removePlayerButtons(clickedButton.toLowerCase());
        missed++;
        return null;
    }
}

function updateLives(misses){
    if(misses < 6){
    for (let i = 4 ; i > 4 - misses ; i--){
        currentLives[i].firstChild.setAttribute("src", "images/lostHeart.png")
    }
}
}

function checkWin() {
    const show = document.querySelectorAll('.show');
    const letter = document.querySelectorAll('.letter');
    if (show.length === letter.length)
    {
        document.querySelector('#overlay').style.display = 'flex';
        document.querySelector('#overlay').className = 'win';
        document.querySelector('.title').textContent = 'You Win!';
        document.querySelector('.btn__reset').textContent = 'Try Again?';
    } else if (missed >= 5) {
        document.querySelector('#overlay').style.display = 'flex';
        document.querySelector('#overlay').className = 'lose';
        document.querySelector('.title').textContent = 'You Lose!';
        document.querySelector('.btn__reset').textContent = 'Try Again?';
    }
}

function resetGame() {
    alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    missed = 0;
    clearPhrase ();
    resetPlayerButtons();
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray); 
}

function resetLives () {
    for (let i = 0 ; i < 5 ; i++){
        currentLives[i].firstChild.setAttribute("src", "images/liveHeart.png")
    }
}

startGame();
var phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

playerButtons.addEventListener('click' , function (event){
    let clickValue = event.target.textContent;
    if (alphabet.includes(clickValue)){
        checkLetter(clickValue);
        updateLives(missed);
        checkWin();
        alphabet.splice(alphabet.indexOf(clickValue),1);
    }
});

document.addEventListener('keyup' , function(event) {
    let keyValue = String.fromCharCode(event.which).toLowerCase();
    if (alphabet.includes(keyValue)) { 
        checkLetter(keyValue);
        updateLives(missed);
        checkWin()
        alphabet.splice(alphabet.indexOf(keyValue),1);
    }
})

document.addEventListener('click' , function(event) {
    if(event.target.textContent === "Try Again?"){
        resetLives();
        resetGame();    
    } 
})


