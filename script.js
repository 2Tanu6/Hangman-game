const wordEl = document.getElementById('word');
const wrongLettersEL = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'intermission', 'renaissance', 'copulation','wizard','consequences','campaign','isolation','annotation','aryasarkar'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord(){
    wordEl.innerHTML = 
    `${selectedWord
    .split('')
    .map(letter => 
    `<span class= "letter">${correctLetters.includes(letter) ? letter : ''} </span>`)
    .join('')}`;

    const innerword = wordEl.innerText.replace(/\n/g, '');

    if(innerword === selectedWord){
        finalMessage.innerText = 'Wow i did not expect you to win, Congrats I guess 🙂';
        popup.style.display = 'flex';
    }
}

// Update the wrong letters
function updateWrongLettersEl(){
    // Display wrong letters
    wrongLettersEL.innerHTML = `
    ${wrongLetters.length > 0 ? `<p>Wrong</p>`: ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // Display parts
    figureParts.forEach((part,index) => {
        const errors = wrongLetters.length;

        if(index < errors){
            part.style.display = 'block';
        } else{
            part.style.display = 'none';
        }
    });

    // Check if lost
    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'HaHa you noob I knew you would loose bish 😂';
        popup.style.display = 'flex';
    }
}

// Show notification
function showNotification(){
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
    // we are trying to add only letters as event hence using keycodes, every character has keycode, alphabet A-Z has a key code ranging from 65-90
    if (e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord();
            } else{
                showNotification();
            }
        } else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else{
                showNotification();
            }
        }
    }
});

// Restart the game and play again
playAgainBtn.addEventListener('click', () => {
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
});


displayWord();