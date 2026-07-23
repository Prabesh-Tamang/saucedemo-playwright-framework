import {Page } from "@playwright/test"; 
export class CartPage { 
    readonly page : Page ; 

    constructor (page : Page) {
        this.page = page ; 
    }

    async removeProduct(productName:string) { 
        // await this.page.locator(".cart_item")  
        await this.page.locator("[data-test='inventory-item']")
        .filter({hasText : productName})
        .getByRole("button" , {name : "Remove"})
        .click();
    }
    async isProductVisible(productName:string){
        return await this.page 
        .locator("[data-test='inventory-item']")
        .filter({hasText : productName})
        .isVisible();
    }

    async checkout(){
        await this.page
        .getByRole("button",{name : "Checkout"})
        .click();
    }
    async continueShopping() { 
        // await this.page.locator("[data-test='continue-shopping']")
        await this.page.locator("#continue-shopping").click();
    }
}