export type PurchaseType = "used" | "new";

export interface MortgageInput {
  purchasePrice: number;
  downPaymentPercent: number;
  annualInterestRate: number;
  termYears: number;
  purchaseType: PurchaseType;
  transferTaxRate: number;
  vatRate: number;
  ajdRate: number;
  otherCosts: number;
  agencyFeeRate: number;
  bonusPoints: number;
}

export interface MortgageResult {
  loanAmount: number;
  downPayment: number;
  taxes: number;
  agencyFee: number;
  cashNeeded: number;
  loanToValue: number;
  baseMonthlyPayment: number;
  adjustedMonthlyPayment: number;
  effectiveInterestRate: number;
  totalInterest: number;
  totalRepayment: number;
}

export interface MaxPurchaseInput {
  monthlyNetIncome: number;
  otherMonthlyDebts: number;
  effortRate: number;
  annualInterestRate: number;
  termYears: number;
  maxLoanToValue: number;
  availableSavings: number;
  purchaseCostsRate: number;
}

export interface MaxPurchaseResult {
  maxMonthlyPayment: number;
  maxLoanByIncome: number;
  maxPriceByFinancing: number;
  maxPriceBySavings: number;
  recommendedMaxPrice: number;
  estimatedLoan: number;
  estimatedCashNeeded: number;
  limitingFactor: "income" | "savings";
}

const assertFiniteNonNegative = (value: number, field: string) => {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${field} debe ser un número válido igual o mayor que cero.`);
  }
};

export const monthlyPayment = (
  principal: number,
  annualInterestRate: number,
  termYears: number,
) => {
  assertFiniteNonNegative(principal, "El capital");
  assertFiniteNonNegative(annualInterestRate, "El interés");

  if (!Number.isFinite(termYears) || termYears <= 0) {
    throw new Error("El plazo debe ser mayor que cero.");
  }

  const months = Math.round(termYears * 12);
  if (principal === 0) return 0;
  if (annualInterestRate === 0) return principal / months;

  const monthlyRate = annualInterestRate / 100 / 12;
  const factor = Math.pow(1 + monthlyRate, months);
  return principal * ((monthlyRate * factor) / (factor - 1));
};

export const calculateMortgage = (input: MortgageInput): MortgageResult => {
  Object.entries(input).forEach(([field, value]) => {
    if (field !== "purchaseType") assertFiniteNonNegative(value as number, field);
  });

  if (input.purchasePrice <= 0) throw new Error("Introduce un precio de compra válido.");
  if (input.termYears < 1 || input.termYears > 50) throw new Error("El plazo debe estar entre 1 y 50 años.");
  if (input.downPaymentPercent > 100) throw new Error("La entrada no puede superar el 100 %.");

  const downPayment = input.purchasePrice * (input.downPaymentPercent / 100);
  const loanAmount = Math.max(input.purchasePrice - downPayment, 0);
  const taxes = input.purchaseType === "new"
    ? input.purchasePrice * ((input.vatRate + input.ajdRate) / 100)
    : input.purchasePrice * (input.transferTaxRate / 100);
  const agencyFee = input.purchasePrice * (input.agencyFeeRate / 100);
  const cashNeeded = downPayment + taxes + agencyFee + input.otherCosts;
  const effectiveInterestRate = Math.max(input.annualInterestRate - input.bonusPoints, 0);
  const baseMonthlyPayment = monthlyPayment(
    loanAmount,
    input.annualInterestRate,
    input.termYears,
  );
  const adjustedMonthlyPayment = monthlyPayment(
    loanAmount,
    effectiveInterestRate,
    input.termYears,
  );
  const totalRepayment = adjustedMonthlyPayment * input.termYears * 12;

  return {
    loanAmount,
    downPayment,
    taxes,
    agencyFee,
    cashNeeded,
    loanToValue: input.purchasePrice === 0 ? 0 : (loanAmount / input.purchasePrice) * 100,
    baseMonthlyPayment,
    adjustedMonthlyPayment,
    effectiveInterestRate,
    totalInterest: Math.max(totalRepayment - loanAmount, 0),
    totalRepayment,
  };
};

export const calculateMaxPurchase = (input: MaxPurchaseInput): MaxPurchaseResult => {
  Object.entries(input).forEach(([field, value]) => assertFiniteNonNegative(value, field));

  if (input.monthlyNetIncome <= 0) throw new Error("Introduce los ingresos netos mensuales.");
  if (input.effortRate <= 0 || input.effortRate > 100) throw new Error("El esfuerzo debe estar entre 1 % y 100 %.");
  if (input.maxLoanToValue <= 0 || input.maxLoanToValue > 100) throw new Error("La financiación debe estar entre 1 % y 100 %.");

  const maxMonthlyPayment = Math.max(
    input.monthlyNetIncome * (input.effortRate / 100) - input.otherMonthlyDebts,
    0,
  );
  const paymentPerEuro = monthlyPayment(1, input.annualInterestRate, input.termYears);
  const maxLoanByIncome = paymentPerEuro === 0 ? 0 : maxMonthlyPayment / paymentPerEuro;
  const ltv = input.maxLoanToValue / 100;
  const costs = input.purchaseCostsRate / 100;
  const maxPriceByFinancing = maxLoanByIncome / ltv;
  const cashShare = 1 - ltv + costs;
  const maxPriceBySavings = cashShare <= 0
    ? Number.POSITIVE_INFINITY
    : input.availableSavings / cashShare;
  const recommendedMaxPrice = Math.max(
    Math.min(maxPriceByFinancing, maxPriceBySavings),
    0,
  );

  return {
    maxMonthlyPayment,
    maxLoanByIncome,
    maxPriceByFinancing,
    maxPriceBySavings,
    recommendedMaxPrice,
    estimatedLoan: recommendedMaxPrice * ltv,
    estimatedCashNeeded: recommendedMaxPrice * cashShare,
    limitingFactor: maxPriceBySavings < maxPriceByFinancing ? "savings" : "income",
  };
};

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export const buildAmortizationSchedule = (
  principal: number,
  annualInterestRate: number,
  termYears: number,
): AmortizationRow[] => {
  const payment = monthlyPayment(principal, annualInterestRate, termYears);
  const monthlyRate = annualInterestRate / 100 / 12;
  const months = Math.round(termYears * 12);
  let balance = principal;

  return Array.from({ length: months }, (_, index) => {
    const interest = balance * monthlyRate;
    const principalPaid = Math.min(payment - interest, balance);
    balance = Math.max(balance - principalPaid, 0);

    return {
      month: index + 1,
      payment: index === months - 1 ? principalPaid + interest : payment,
      principal: principalPaid,
      interest,
      balance,
    };
  });
};

export const formatCurrency = (value: number, maximumFractionDigits = 0) =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits,
  }).format(Number.isFinite(value) ? value : 0);
