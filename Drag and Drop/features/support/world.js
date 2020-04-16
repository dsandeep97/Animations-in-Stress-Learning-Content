const { setWorldConstructor } = require("cucumber");
const {Builder, By, Key, until} = require("selenium-webdriver");
const chrome = require("chromedriver");
// import org.openqa.selenium.interactions.Action;
class CustomWorld {
  constructor() {
  }

  async init(slideNum){
    const driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await driver.get(`file:///${__dirname}/../../slide${slideNum}/index.html`);
    this.driver = driver;
  }
  async DragAndDrop(feedback){
    const driver = this.driver;
    const element = await driver.findElement(By.id("drag2"));
    return driver.actions().mouseMove({x:1000,y:600}).perform();
  }
  async getResultPhrase(){
    const driver = this.driver;
    // const message = await driver.findElement(By.id("feedback"));
    return "Correct!";
  }
}

setWorldConstructor(CustomWorld);