
import {Page } from "@playwright/test" ; 
export class InventoryPage {
    readonly page : Page ; 
    constructor (page : Page) {
        this.page = page ; 
    }


    async addProductToCart(productName : string ) { 
        await this.page 
        .locator(".inventory_item")
        .filter({ hasText : productName})
        .getByRole("button" , {
            name : "Add to cart"
        })
        .click() ; 
    }
// hardCoded just for Reference
/* async addProductToCart() { 
        await this.page 
        .locator(".inventory_item")
        .filter({ hasText : "Sauce Labs Bike Light"})
        .getByRole("button" , {
            name : "Add to cart"
        })
        .click() ; 
    }*/
    
async goToCart () {
    await this.page.locator("[data-test='shopping-cart-link']").click() 
}


async getCartCount() {
    return await this.page.locator("[data-test='shopping-cart-badge']").textContent();
}

}
