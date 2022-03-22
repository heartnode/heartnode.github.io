/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

/**
 * The Phrase class takes a phrase and display various states of guessing the phrase to UI. 
 * It also checks an character is part of the phrase and reveals matched letters.
 */
class Phrase{
    /**
     * Phrase class accepts a phrase
     * @param {string} phrase 
     */
    constructor(phrase){
        // Adds property phrase and the unordered list that holds the phrase
        this.phrase = phrase.toLowerCase();
        this.ul = document.querySelector('#phrase ul');
    }
    /**
     * Add Phrase To Display
     * Adds place holder (empty box) for Phrase in the UI
     */
    addPhraseToDisplay(){
        //For each character in the phrase creates the corresponding place holder
        this.phrase.split('').forEach((character) =>{
           const li = document.createElement('li');
           //When encounter space character have its own class
           if (character === ' '){
            li.setAttribute('class','space');
           } else {
            // For other characters (a-z) set the class to hide, as a letter and the character.
            li.setAttribute('class', `hide letter ${character}`);
            li.textContent = character;
           }
           //Add the current character place holder to the the unordered list UI element
           this.ul.appendChild(li);
        })
    }
    /**
     * Checkes the given letter is part of the phrase
     * @param {string} letter 
     * @return {bool} returns true if the letter is found in the phrase
     */
    checkLetter(letter){
        return this.ul.querySelector(`li.${letter}`) !== null;
    }
    /**
     * Show the matched letter by convert all the matched place holder to display the character
     * @param {string} letter 
     */
    showMatchedLetter(letter){
        //Find all instances of the letter from the array of place holder elements
        const allMatched = this.ul.querySelectorAll(`li.${letter}`);
        
        //Function to convert existing Place Holder to show the matched letter
        const revealLetter = node => {
            node.classList.remove('hide');
            //Show and perform zoomIn animation
            node.classList.add('show','animate','zoomIn');
        };
        //Iterate overall all instances of matching letter in the phrase and reveal the letter
        [...allMatched].forEach(match=>revealLetter(match));
    }
}