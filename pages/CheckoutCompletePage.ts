import { Page } from "@playwright/test";

export class CheckoutCompletePage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }




getConfirmationMessage() {
    return this.page.getByRole("heading", {
        name: "Thank you for your order!"
    });
}
    async backHome() {
        await this.page.getByRole("button" , {name : "Back Home"}).click();
    }
}