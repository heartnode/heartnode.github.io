/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game;

// Exceed Expectation listen for Keyboard event
const keyHandler = (e)=>{
    //Accepts a-z keys only
    if (/^[a-z]$/i.test(e.key)){
        //Find the key in the corresponding letter button on the UI and triggers the click event.
        const keyed = e.key.toLowerCase();
        const simulateButton = [...document.querySelectorAll('#qwerty .key')].find(key=>key.textContent === keyed);
        simulateButton.click();
    }
};

//When "Start Game" is pushed game will start
document.getElementById('btn__reset').addEventListener('click',()=>{
    //Instantiate a game object to keep track of all the game states
    game = new Game();
    
    //Start the game UI
    game.startGame();

    //Enable keyboard
    document.addEventListener('keyup',keyHandler);
});

// Enable click event on the on screen keyboard
document.getElementById('qwerty').addEventListener('click',(event)=>game.handleInteraction(event));
   

// Enable listening for keyboard event
