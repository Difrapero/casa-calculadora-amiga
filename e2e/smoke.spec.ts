import { expect, test } from "@playwright/test";

test("calcula una cuota y permite rechazar cookies", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Entiende tu hipoteca antes de hablar con el banco" })).toBeVisible();
  await page.getByRole("button", { name: "Rechazar" }).click();
  await expect(page.getByText("Cuota mensual estimada")).toBeVisible();
  await expect(page.getByText("Ahorro inicial", { exact: true })).toBeVisible();
});

test("las rutas de contenido responden", async ({ page }) => {
  await page.goto("/guias/como-calcular-una-hipoteca");
  await expect(page.getByRole("heading", { level: 1, name: "Cómo se calcula una hipoteca: cuota, TIN, TAE e intereses" })).toBeVisible();
});
