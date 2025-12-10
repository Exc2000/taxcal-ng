/* eslint-disable @typescript-eslint/no-explicit-any */

export type Bracket = { from: number; to: number | null; rate: number };

export function calculatePIT(
  input: {
    grossAnnualIncome: number;
    pensionContribution?: number;
    nhf?: number;
    otherDeductions?: number;
    rentPaid?: number;
  },
  cfg: any
) {
  // apply caps
  const pension = Math.min(input.pensionContribution || 0, cfg.reliefs?.pensionCap ?? Infinity);
  const nhf = Math.min(input.nhf || 0, cfg.reliefs?.nhfCap ?? Infinity);
  const other = input.otherDeductions || 0;

  // rent relief (if provided) = min(rentPaid * rentReliefRate, rentReliefCap)
  let rentRelief = 0;
  if (input.rentPaid && cfg.reliefs?.rentReliefRate) {
    rentRelief = Math.min(input.rentPaid * (cfg.reliefs.rentReliefRate ?? 0), cfg.reliefs.rentReliefCap ?? Infinity);
  }

  const deductions = pension + nhf + other + rentRelief;
  const taxableIncome = Math.max(0, input.grossAnnualIncome - deductions);

  let remaining = taxableIncome;
  let totalTax = 0;
  const breakdown: any[] = [];

  // assume cfg.brackets is ordered by from ascending
  for (const b of cfg.brackets as Bracket[]) {
    if (remaining <= 0) break;
    const lower = b.from;
    const upper = b.to ?? Infinity;
    const bracketSpan = upper - lower;
    const taxableInBracket = Math.max(0, Math.min(remaining, bracketSpan));
    const taxInBracket = taxableInBracket * b.rate;
    if (taxableInBracket > 0) {
      breakdown.push({ bracket: b, taxable: taxableInBracket, taxInBracket });
      totalTax += taxInBracket;
      remaining -= taxableInBracket;
    }
  }

  return {
    taxableIncome: Math.round(taxableIncome),
    totalTax: Math.round(totalTax),
    monthlyTax: Math.round(totalTax / 12),
    breakdown,
  };
}

export function calculateCIT(
  input: {
    turnover: number;
    fixedAssets: number;
    revenue: number;
    expenses: number;
    capitalAllowances: number;
  },
  cfg: any
) {
  const small = cfg.smallCompany;
  if (input.turnover <= small.turnoverMax && input.fixedAssets <= small.fixedAssetsMax) {
    return { exempt: true };
  }

  const profit = Math.max(0, input.revenue - input.expenses - input.capitalAllowances);

  // determine rate
  let rate = cfg.largeCompany?.rate ?? cfg.citRate ?? 0.3;
  const medium = cfg.mediumCompany;
  if (medium && input.turnover >= (medium.turnoverMin ?? 0) && input.turnover <= (medium.turnoverMax ?? Infinity)) {
    rate = medium.rate;
  } else if (cfg.largeCompany && input.turnover >= (cfg.largeCompany.turnoverMin ?? 0)) {
    rate = cfg.largeCompany.rate;
  }

  const cit = Math.round(profit * rate);
  const levy = Math.round(profit * (cfg.developmentLevyRate ?? 0));

  return { exempt: false, profit, cit, levy, rate };
}
