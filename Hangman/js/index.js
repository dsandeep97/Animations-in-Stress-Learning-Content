var sentence = "The peripheral nervous system is made up of ?nerves? and has two divisions: the ?autonomic? and ?somatic?."
var sentence_display = "";
words = []; 

var alphabet = ['a','b','c','d','e','f','g','h','i',
                    'j','k','l','m','n','o','p','q','r',
                    's','t','u','v','w','x','y','z'];
var answer_map = new Map(); 
var guess_map = new Map([["total",8],["wrong",0],["right",0]]); 

function loadSentence() {
    prev =-1; 
    if (sentence.indexOf('?') != -1) {
        var word_start = sentence.indexOf('?') + 1; 
        var word_end = sentence.indexOf('?',word_start+1); 
        var num_letters = 0; 
        while (word_end != -1) {
            word = sentence.slice(word_start,word_end);
            words.push(word); 
            sentence = sentence.slice(0,word_start-1) + "_ ".repeat(word_end-word_start) + sentence.slice(word_end+1); 
            var index = word_start-1; 
            word.split('').forEach(letter => {
                num_letters++; 
                if (answer_map.get(letter) == undefined) {
                    answer_map.set(letter,[index]); 
                } else {
                    answer_map.get(letter).push(index);  
                }
                index+=2; 
            });
            word_start = sentence.indexOf('?',word_end+1);
            if (word_start == -1) break; 
            else word_start += 1;
            word_end = sentence.indexOf('?',word_start+1); 
        }
        sentence_display = sentence; 
        document.getElementById('sentenceToFill').innerHTML = sentence_display; 
    }
}

function generateButtons() {
    let buttons = alphabet.map(letter =>
        `
        <button class="btn btn-lg btn-primary m-2" 
                id='` + letter + `'  
                onclick="handleGuess('` + letter + `')">
            ` + letter + `
        </button>
        `
        ).join(''); 
    document.getElementById('keyboard').innerHTML = buttons; 
}

function handleGuess(letter) {
    document.getElementById(letter).setAttribute('disabled',true);  
    if (answer_map.get(letter) != undefined) {
        guess_map.set("right",guess_map.get("right")+1); 
        var blanks = answer_map.get(letter); 
        var idx; 
        for (idx of blanks) {
            sentence_display = sentence_display.slice(0,idx) + letter + sentence_display.slice(idx+1); 
        }
        document.getElementById('sentenceToFill').innerHTML = sentence_display; 
        if (guess_map.get("right") == answer_map.size) {
            document.getElementById('hangmanPic').src = "./img/win.png"; 
            document.getElementById('keyboard').innerHTML = "You win!"; 
        }
    } else {
        guess_map.set("wrong",guess_map.get("wrong")+1); 
        document.getElementById('incorrect').innerHTML = guess_map.get("wrong"); 
        if (guess_map.get("wrong") == guess_map.get("total")) {
            document.getElementById('hangmanPic').src ="./img/lose.png";
            document.getElementById('keyboard').innerHTML = "You lose! Click reset to try again";  
            guess_map.set("wrong",0); 
        } else {
            document.getElementById('hangmanPic').src = "./img/wrong" + guess_map.get("wrong").toString() + ".png"; 
        }
    }
}

function hangman_init() {
    document.getElementById('totalGuesses').innerHTML = guess_map.get("total"); 
    loadSentence(); 
    generateButtons();
}

function reset() {
    guess_map.set("right",0);
    guess_map.set("wrong",0); 
    document.getElementById('incorrect').innerHTML = 0; 
    document.getElementById('hangmanPic').src ="./img/wrong0.png"; 
    sentence_display = sentence; 
    document.getElementById('sentenceToFill').innerHTML = sentence_display; 
    generateButtons(); 
}