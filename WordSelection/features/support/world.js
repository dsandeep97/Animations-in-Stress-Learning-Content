// features/support/world.js
const { setWorldConstructor } = require("cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("chromedriver");
const firefox = require("geckodriver");

class browserBuild {
  constructor() { }

  async init(slideNum) {
    const driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await driver.get(`file:///${__dirname}/../../slide${slideNum}/index.html`);

    this.driver = driver;
    this.config = require(`../fixtures/slide${slideNum}`);
  }

  async selectActivity(correctness) {
    const driver = this.driver;

    if (correctness) {
      // select all of the correct ones
      driver.findElement(By.id("endocrine")).click()
      driver.findElement(By.id("chemical")).click()
      driver.findElement(By.id("hormones")).click()
      driver.findElement(By.id("slowly")).click()
      driver.findElement(By.id("submit")).click()

    } else {
      //select incorrect ones
      driver.findElement(By.id("nervous")).click()
      driver.findElement(By.id("electrical")).click()
      driver.findElement(By.id("impulses")).click()
      driver.findElement(By.id("quickly")).click()
      driver.findElement(By.id("submit")).click()
    }

  }

  async selectOne(){
    const driver = this.driver;
    driver.findElement(By.id("endocrine")).click();
  }

  async getResultPhrase() {
    const driver = this.driver;
    const elem = await driver.findElement(By.id("result"));
    return elem.getText();
  }
}

setWorldConstructor(browserBuild);
