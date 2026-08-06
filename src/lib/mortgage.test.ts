import { describe, expect, it } from "vitest";
import {
  buildAmortizationSchedule,
  calculateMaxPurchase,
  calculateMortgage,
  monthlyPayment,
} from "./mortgage";

describe("monthlyPayment", () => {
  it("calcula una cuota francesa conocida", () => {
    expect(monthlyPayment(200_000, 3.5, 30)).toBeCloseTo(898.09, 1);
  });

  it("admite préstamos al cero por ciento", () => {
    expect(monthlyPayment(120_000, 0, 10)).toBe(1_000);
  });
});
describe("calculateMortgage", () => {
  it("diferencia entrada, impuestos y capital financiado", () => {
    const result = calculateMortgage({
      purchasePrice: 250_000,
      downPaymentPercent: 20,
      annualInterestRate: 3,
      termYears: 30,
      purchaseType: "used",
      transferTaxRate: 8,
      vatRate: 10,
      ajdRate: 1.5,
      otherCosts: 3_000,
      agencyFeeRate: 0,
      bonusPoints: 0.25,
    });

    expect(result.loanAmount).toBe(200_000);
    expect(result.taxes).toBe(20_000);
    expect(result.cashNeeded).toBe(73_000);
    expect(result.adjustedMonthlyPayment).toBeLessThan(result.baseMonthlyPayment);
  });
});

describe("calculateMaxPurchase", () => {
  it("limita el precio por ahorros cuando son insuficientes", () => {
    const result = calculateMaxPurchase({
      monthlyNetIncome: 3_000,
      otherMonthlyDebts: 0,
      effortRate: 35,
      annualInterestRate: 3,
      termYears: 30,
      maxLoanToValue: 80,
      availableSavings: 35_000,
      purchaseCostsRate: 10,
    });

    expect(result.limitingFactor).toBe("savings");
    expect(result.recommendedMaxPrice).toBeCloseTo(116_666.67, 1);
  });
});

describe("buildAmortizationSchedule", () => {
  it("termina con saldo cero", () => {
    const schedule = buildAmortizationSchedule(100_000, 3, 20);
    expect(schedule).toHaveLength(240);
    expect(schedule.at(-1)?.balance).toBeCloseTo(0, 2);
  });
});
