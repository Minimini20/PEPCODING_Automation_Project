const pup = require("puppeteer");

async function sendRequest(id,password,company,requestNumber){
    let browser = await pup.launch({ // opens the browser
        headless: false,
        defaultViewport: false,
        args: ["--start-maximized"]// fullscreen
    });
    let pages = await browser.pages();// browser ke andar opened tabs ko ek array mien leke aana
    tab = pages[0];
    await tab.goto("https://www.linkedin.com/");
    await tab.click(".nav__button-secondary");
    await tab.waitForTimeout(2000);
    await tab.waitForSelector(".login__form_action_container",{visible:true, setTimeout:3000});
    await tab.type("#username",id);
    await tab.type("#password",password);
    await tab.click(".login__form_action_container");
    await tab.waitForNavigation({waitUntil:"networkidle2"});
    await tab.waitForSelector("input[placeholder='Search']",{visible:true, setTimeout:3000});
    await tab.type("input[placeholder='Search']",company);
    await setTimeout(function(){

    },2000);
    //await tab.keyboard.press("ArrowDown");
    await tab.keyboard.press("Enter");
    await tab.waitForSelector(".pv2.ph0.mb2.artdeco-card",{visible:true,setTimeout:3000})
    let companyName = await tab.$(".entity-result__title-text.entity-result__title-text--overflowed.t-16 a");
    let companyHref = await tab.evaluate(function(ele){
        return ele.getAttribute("href");
    },companyName);
    await tab.goto(companyHref);
    await tab.waitForSelector(".org-page-navigation__items",{visible:true,setTimeout:3000});
    let listButtons = await tab.$$(".org-page-navigation__item.m0");
    await listButtons[listButtons.length-3].click();
    await tab.waitForSelector(".artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view.full-width",{visible:true,setTimeout:3000});
    let connections = await tab.$$(".artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view.full-width");
    //console.log(connections);
    for(let i=0;i<requestNumber;i++){
        await connections[i].click();
        await tab.waitForSelector(".mr1.artdeco-button.artdeco-button--muted.artdeco-button--3.artdeco-button--secondary.ember-view",{visible:true,setTimeout:3000});
        let addNote = await tab.$(".mr1.artdeco-button.artdeco-button--muted.artdeco-button--3.artdeco-button--secondary.ember-view");
        await addNote.click();
        await tab.waitForSelector("textarea[name='message']",{visible:true});
        let msg = await tab.$("textarea[name='message']");
        await msg.type("Looking forward to making a connection with you!");
        //let send = await tab.$("button[arai-label='Send now']");
        await tab.click(".ml1.artdeco-button.artdeco-button--3.artdeco-button--primary.ember-view");
        await tab.waitForTimeout(1000);
    }
}

sendRequest("aasthasaxena2000@gmail.com","Aastha#1","Amazon","3");