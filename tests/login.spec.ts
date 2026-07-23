import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;
let checkoutOverviewPage: CheckoutOverviewPage;
let checkoutCompletePage: CheckoutCompletePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
  checkoutOverviewPage = new CheckoutOverviewPage(page);
  checkoutCompletePage = new CheckoutCompletePage(page);

  await loginPage.open();

  await loginPage.login("standard_user", "secret_sauce");
});
test("User Completes checkout", async ({ page }) => {
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  //     // For Inventory Page
  //     await inventoryPage.addProductToCart(
  //     "Sauce Labs Backpack"
  // );

  // await inventoryPage.addProductToCart(
  //     "Sauce Labs Bike Light"
  // );

  // await inventoryPage.addProductToCart(
  //     "Sauce Labs Bolt T-Shirt"
  // );

  const products = [
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
    "Sauce Labs Bolt T-Shirt",
  ];

  for (const product of products) {
    await inventoryPage.addProductToCart(product);
  }

  const count = await inventoryPage.getCartCount();
  expect(count).toBe("3");

  await inventoryPage.goToCart();

  // CartPage
  await cartPage.removeProduct("Sauce Labs Backpack");
  const productVisible = await cartPage.isProductVisible("Sauce Labs Backpack");
  expect(productVisible).toBe(false);
  await cartPage.checkout();

  // Checkout Page
  await checkoutPage.fillCheckoutInformation("James", "Tamang", "15424");
  await checkoutPage.continue();
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-two.html",
  );
  // Checkout Overview Page
  // await checkoutoverviewpage.cancel();
  await checkoutOverviewPage.finish();
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-complete.html",
  );

  // Checkout Complete Page
  await expect(checkoutCompletePage.getConfirmationMessage()).toBeVisible();
  await checkoutCompletePage.backHome();
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});

