const { Given, When, Then, setDefaultTimeout} = require("cucumber");
const { expect } = require("chai");
// const { sleep } = require("./util");

setDefaultTimeout(10 * 1000);
Given("I am on slide {int}", async function(slideNum) {
  await this.init(slideNum);
});

When("I drag and drop words to the blanks {string}", async function(feedback) {
  await this.DragAndDrop(feedback == "correctly");
});

Then("I should see {string}", async function(message) {
  const result = await this.getResultPhrase();
  expect(result).to.eql(message);
});
// Then("I should not see the feedback after {int} seconds", async function(time){
//     await sleep(time * 2000 + 10);
//     const result = await this.getResultPhrase();
//     expect(result).to.eql("");
// })