module.exports = {
    processSentence: function(sentence,answers) {
        var words = []; 
        prev = -1; 
        if (sentence.indexOf('?') != -1) {
            var word_start = sentence.indexOf('?') + 1; 
            var word_end = sentence.indexOf('?',word_start+1); 
            var num_letters = 0; 
            while (word_end != -1) {
                var word = sentence.slice(word_start,word_end);
                words.push(word); 
                sentence = sentence.slice(0,word_start-1) + "_ ".repeat(word_end-word_start) + sentence.slice(word_end+1); 
                var index = word_start-1; 
                word.split('').forEach(letter => {
                    num_letters++; 
                    if (answers.get(letter) == undefined) {
                        answers.set(letter,[index]); 
                    } else {
                        answers.get(letter).push(index);  
                    }
                    index+=2; 
                });
                word_start = sentence.indexOf('?',word_end+1);
                if (word_start == -1) break; 
                else word_start += 1;
                word_end = sentence.indexOf('?',word_start+1); 
            }
            return [sentence,words]; 
        } else { return [null,null]; }
    },

    handleGuess: function(letter,answers,guesses,display) {
        // document.getElementById(letter).setAttribute('disabled',true);  
        if (answers.get(letter) != undefined) {
            guesses.set("right",guesses.get("right")+1); 
            var blanks = answers.get(letter); 
            var idx; 
            // var sentence = document.getElementById('sentenceToFill').innerHTML; 
            for (idx of blanks) {
                display = display.slice(0,idx) + letter + display.slice(idx+1); 
            }
            // document.getElementById('sentenceToFill').innerHTML = sentence; 
            // if (guesses.get("right") == answers.size) {
            //     document.getElementById('hangmanPic').src = "./img/win.png"; 
            //     document.getElementById('keyboard').innerHTML = "You win!"; 
            // }
            return display; 
        } else {
            guesses.set("wrong",guesses.get("wrong")+1); 
            // document.getElementById('incorrect').innerHTML = guesses.get("wrong"); 
            // if (guesses.get("wrong") == guesses.get("total")) {
            //     document.getElementById('hangmanPic').src ="./img/lose.png";
            //     document.getElementById('keyboard').innerHTML = "You lose! Click reset to try again";  
            //     wrong_guesses = 0; 
            // } else {
            //     document.getElementById('hangmanPic').src = "./img/wrong" + guesses.get("wrong").toString() + ".png"; 
            // }
        }
    }
}