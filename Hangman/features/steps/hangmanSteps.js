var {Given} = require('cucumber'); 
var {When} = require('cucumber'); 
var {Then} = require('cucumber'); 
var assert = require('assert'); 
var hangman = require('../../js/hangman'); 

var sentence, words;  
var answers = new Map(); 
var guesses = new Map([["total",8],["wrong",0],["right",0]]); 
Given(/^a formatted sentence (.*)$/, function (new_sentence) {
    sentence = new_sentence; 
});

When(/^I load the hangman words$/, function () {
    [sentence,words] = hangman.processSentence(sentence,answers); 
});

When(/^I guess the following letters$/, function(dataTable) {
    var letters = dataTable["rawTable"];
    for (letter of letters) {
        sentence = hangman.handleGuess(letter,answers,guesses,sentence); 
    }
}); 

Then(/^the list of words should be (.*)$/, function (correct_words) {
    if (correct_words == 'n/a') assert.equal(words,null); 
    else {
        correct_words = correct_words.split(';'); 
        words.forEach(function(word,i) {
            assert.equal(word,correct_words[i]); 
        })
    }
});

Then(/^I should see (.*)$/, function(check) {
    assert.equal(check, "Wrong Guesses: " + guesses.get("wrong") + " of " + guesses.get("total")); 
});

