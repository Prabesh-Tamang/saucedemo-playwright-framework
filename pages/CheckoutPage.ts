import {Page} from "@playwright/test"; 
 
export class CheckoutPage { 
    readonly page : Page; 
    constructor(page:Page){
        this.page = page ; 

    }

    async fillCheckoutInformation(firstName:string , lastName : string , postalcode : string)  {
        await this.page
        .getByPlaceholder("First Name").fill(firstName);

        await this.page 
        .getByPlaceholder("Last Name").fill(lastName);

        await this.page
        .getByPlaceholder("Zip/Postal Code").fill(postalcode);

    }

    async continue(){
  await this.page
        .getByRole("button" , {
            name : "Continue"
        })
        .click() ;
    }
    
    async cancel(){
        await this.page.getByRole("button", {name : "Cancel"}).click();
    }

    
}