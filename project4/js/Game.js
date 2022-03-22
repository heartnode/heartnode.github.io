/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game{
    constructor(){
        //Track missed gusesses
        this.missed = 0;
        
        //Phrases use in the game
        this.phrases = [
            "How are you",
            "Good game my friend",
            "Want some cheese",
            "Matching phrase game",
            "Play more play often"
        ].map(phrase => new Phrase(phrase));
        
        //Prase that is currently playing
        this.activePhrase = null;
    }
    /**
     * Initialize the game
     */
    startGame(){
        //Hides the start message overlay
        document.querySelector('.start').style.display='none';

        //Gets a random phase from the phrases property
        const phrase = this.getRandomPhrase();

        //Set the currently playing phrase to the choosen phrase
        this.activePhrase = phrase;

        //Display the phrase to the UI
        this.activePhrase.addPhraseToDisplay();
    }
    /**
     * Randomly choosing a phrase from the phrases property
     * @return {string} returns a phase
     */
    getRandomPhrase(){
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }
    /**
     * Handles the click event of the on screen keyboard and checks game winning status
     */
    handleInteraction(event){
        // The click event handler is used in this method and in resetGame method
     
            //Make sure the button with key class is clicked ignore others
            if (event.target.classList.contains('key')){
                //Disable the clicked character button
                const buttonClicked = event.target;
                buttonClicked.setAttribute('disabled','');
                
                //Check the clicked letter against the active phrase
                const keyed = event.target.textContent;
                if (this.activePhrase.checkLetter(keyed)){
                    // If the letter is in the playing phrase the character is set to be chosen
                    buttonClicked.classList.add('chosen');
                    // The place holder is now show the letter
                    this.activePhrase.showMatchedLetter(keyed);
                    
                    // Check if this finish the game
                    if (this.checkForWin()){
                        // If finish the game update the UI to show win 
                        this.gameOver('win');
                    }
                } else {
                    // The letter is not in the phrase the key is set to wrong and perform animation of shaking
                    buttonClicked.classList.add('wrong','animated','shake');
                    // Remove a life from the available lives
                    this.removeLife();
                }
            }
        

    }
    /**
     * Remove life from score board and determines if is lose
     */
    removeLife(){
        // Remove Life from in the order of from right to left
        const tries = [...document.querySelectorAll(".tries")];
        const removingLife = tries.reverse().find(tryElem => tryElem.querySelector('img[src$="liveHeart.png"]') !== null);
        if (removingLife){
            //Update the UI with lost heart image
            removingLife.firstChild.src = 'images/lostHeart.png';
            //Increase the missed guess count
            this.missed++;
        } 

        if (this.missed >= 5){
            // No more lives game over
            this.gameOver('lose');
        }
    }
    /**
     * To win the game all letters have to be shown
     * @return {bool} Determine if all letters have reveal
     */
    checkForWin(){
        return (document.querySelectorAll('#phrase .hide').length === 0);
    }
    /**
     * Shows the original start screen overlay and a message corrsponding to the status
     * @param {string} status either "win" or "lose"
     */
    gameOver(status){
        const start = document.querySelector('.start');
        const gameOverMessage = document.getElementById('game-over-message');
    
        //Show the original start screen overlay
        start.removeAttribute('style');
    
        switch(status){
            case 'lose':
                // When the status is lose make sure show message "You lose!"
                start.classList.remove('win');
                start.classList.add('lose');
                gameOverMessage.textContent = 'You lose!';
                break;
            case 'win':
                // show "You win!" message
                start.classList.remove('lose');
                start.classList.add('win');
                gameOverMessage.textContent = 'You win!';
                break;
        }
        
        //resets the game UI
        this.resetGame();
    }

    /**
     * Reset the game board 
     */
    resetGame (){
        //Empty the phrase in UI
        const ul = document.querySelector('#phrase ul');
        ul.innerHTML = '';
    
        //Reset onscreen keyboard to enable all keys
        const keys = [...document.querySelectorAll('#qwerty .key')];
        keys.forEach(key=>{key.className="key";key.removeAttribute('disabled')});
    
        //Reset all the lives with proper images
        const hearts = [...document.querySelectorAll('.tries img')];
        hearts.forEach(heart=>heart.src="images/liveHeart.png");

        //Remove listening on keyboard prevent permature gaming
        document.removeEventListener('keydown',keyHandler);
    }
}