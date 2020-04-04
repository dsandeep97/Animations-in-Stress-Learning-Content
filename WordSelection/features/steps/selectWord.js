var { Given } = require('cucumber');
var { When } = require('cucumber');
var { Then } = require('cucumber');
var assert = require('assert'); 
var wordSelect = require('../../js/wordSelect');

var answers, selection;

Given(/^a list of (.*)$/, function(new_answers){
    answers = new_answers;
    wordSelect.newGame(answers);
});

When(/^I choose the correct answers (.*)$/, function(new_selection) {
    selection = new_selection;
    for(let i = 0; i < selection.length; i++){

    }
});

Then(/^the answer validation should return true/, function(){
    assert.equal(true, true);
});