import {Page} from "@playwright/test"; 

export class CheckoutOverviewPage {
    readonly page : Page ; 
    constructor (page : Page) {
        this.page = page ; 
    }
    async cancel () { 
        await this.page.getByRole("button", {name : "Cancel"}).click();
    }
    async finish () { 
        await this.page.getByRole("button", {name : "Finish"}).click();
    }
}