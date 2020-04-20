// features/support/steps.js
const { Given, When, Then, After } = require("cucumber");
const { expect } = require("chai");

const { sleep } = require("./util");

After(async function () {
    return this.driver.quit();
});

var wordSelect = require('../../slide33/js/wordSelect');


Given('I am on slide {int}', {timeout: 10*1000}, async function (slideNum) {
    await this.init(slideNum);
});

When('I select the {string} answers and submit', async function (correctness) {
    await this.selectActivity(correctness === "correct");
});


Then('I should recieve feedback that I am {string}', async function (correctness) {
    const resultText = await this.getResultPhrase();

    if (correctness === "correct") {
        expect(resultText).to.eql("Correct!");
    } else {
        expect(resultText).to.eql("One or more choices are incorrect.");
    }
});

Then('clicking a new choice removes the feedback', async function () {
    await this.selectOne();
    const resultText = await this.getResultPhrase();
    expect(resultText).to.eql("");
});