/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import pitRules from "../data/pitRules.json";
import { calculatePIT } from "@/lib/taxEngine";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CurrencyInput } from "@/components/CurrencyInput";

export default function PITForm() {
  const [salary, setSalary] = useState(0);
  const [freelance, setFreelance] = useState(0);
  const [rentalIncome, setRentalIncome] = useState(0);
  const [rentPaid, setRentPaid] = useState(0);
  const [pension, setPension] = useState(0);
  const [nhf, setNhf] = useState(0);
  const [other, setOther] = useState(0);

  const [result, setResult] = useState<any | null>(null);

  // REAL-TIME CALCULATION
  useEffect(() => {
    const timer = setTimeout(() => {
      const gross = (salary || 0) + (freelance || 0) + (rentalIncome || 0);

      // If everything is empty, clear results
      if (
        gross === 0 &&
        pension === 0 &&
        nhf === 0 &&
        rentPaid === 0 &&
        other === 0
      ) {
        setResult(null);
        return;
      }

      const res = calculatePIT(
        {
          grossAnnualIncome: gross,
          pensionContribution: pension,
          nhf,
          otherDeductions: other,
          rentPaid,
        },
        pitRules
      );

      setResult(res);
    }, 0); // Using setTimeout with 0 delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, [salary, freelance, rentalIncome, rentPaid, pension, nhf, other]);

  // RESET FORM
  function resetAll() {
    setSalary(0);
    setFreelance(0);
    setRentalIncome(0);
    setRentPaid(0);
    setPension(0);
    setNhf(0);
    setOther(0);
    setResult(null);
  }

  return (
    <div className="space-y-6">
      {/* INPUT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <CurrencyInput
          label="Annual Salary"
          value={salary}
          onChange={setSalary}
          placeholder="e.g. 1,200,000"
        />
        <CurrencyInput
          label="Freelance / Side Income"
          value={freelance}
          onChange={setFreelance}
          placeholder="e.g. 350,000"
        />
        <CurrencyInput
          label="Rental Income"
          value={rentalIncome}
          onChange={setRentalIncome}
          placeholder="e.g. 500,000"
        />
        <CurrencyInput
          label="Rent Paid (for rent relief)"
          value={rentPaid}
          onChange={setRentPaid}
          placeholder="e.g. 600,000"
        />
        <CurrencyInput
          label="Pension Contribution"
          value={pension}
          onChange={setPension}
          placeholder="e.g. 150,000"
        />
        <CurrencyInput
          label="NHF"
          value={nhf}
          onChange={setNhf}
          placeholder="e.g. 30,000"
        />
        <CurrencyInput
          label="Other Deductions"
          value={other}
          onChange={setOther}
          placeholder="e.g. 20,000"
        />
      </div>

      <Button variant="ghost" onClick={resetAll}>
        Reset
      </Button>

      {/* REAL-TIME RESULT */}
      {result && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <h3 className="font-semibold">
                Result (rules effective: {pitRules.effectiveFrom})
              </h3>
              <p>Taxable Income: ₦{result.taxableIncome.toLocaleString()}</p>
              <p>Total Annual Tax: ₦{result.totalTax.toLocaleString()}</p>
              <p>Monthly Tax: ₦{result.monthlyTax.toLocaleString()}</p>
            </div>

            <div>
              <h4 className="font-medium">Breakdown</h4>
              <table className="w-full text-sm mt-2">
                <thead>
                  <tr className="text-left text-xs text-slate-600">
                    <th>Bracket</th>
                    <th>Taxable</th>
                    <th>Tax</th>
                  </tr>
                </thead>
                <tbody>
                  {result.breakdown.map((b: any, i: number) => (
                    <tr key={i} className="border-t">
                      <td>
                        {b.bracket.from} – {b.bracket.to ?? "∞"} @{" "}
                        {(b.bracket.rate * 100).toFixed(1)}%
                      </td>
                      <td>₦{b.taxable.toLocaleString()}</td>
                      <td>₦{Math.round(b.taxInBracket).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
