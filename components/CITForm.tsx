/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CurrencyInput } from "./CurrencyInput";
import { calculateCIT } from "@/lib/taxEngine";
import citRules from "../data/citRules.json";

export default function CITForm() {
  const [turnover, setTurnover] = useState<number>(0);
  const [assets, setAssets] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [capitalAllowances, setCapitalAllowances] = useState<number>(0);

  const [result, setResult] = useState<any | null>(null);

  // Real-time calculation
  useEffect(() => {
    const timer = setTimeout(() => {
      const noInput =
        turnover === 0 &&
        assets === 0 &&
        revenue === 0 &&
        expenses === 0 &&
        capitalAllowances === 0;

      if (noInput) {
        setResult(null);
        return;
      }

      const res = calculateCIT(
        {
          turnover,
          fixedAssets: assets,
          revenue,
          expenses,
          capitalAllowances,
        },
        citRules
      );

      setResult(res);
    }, 0); // Using setTimeout with 0 delay
    return () => clearTimeout(timer); // Cleanup the timer
  }, [turnover, assets, revenue, expenses, capitalAllowances]);

  function reset() {
    setTurnover(0);
    setAssets(0);
    setRevenue(0);
    setExpenses(0);
    setCapitalAllowances(0);
    setResult(null);
  }

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <CurrencyInput
          label="Turnover (last 12 months)"
          value={turnover}
          onChange={setTurnover}
          placeholder="Turnover"
        />
        <CurrencyInput
          label="Fixed Assets Value"
          value={assets}
          onChange={setAssets}
          placeholder="Fixed assets"
        />
        <CurrencyInput
          label="Total Revenue"
          value={revenue}
          onChange={setRevenue}
          placeholder="Revenue"
        />
        <CurrencyInput
          label="Allowable Expenses"
          value={expenses}
          onChange={setExpenses}
          placeholder="Expenses"
        />
        <CurrencyInput
          label="Capital Allowances"
          value={capitalAllowances}
          onChange={setCapitalAllowances}
          placeholder="Capital Allowances"
        />
      </div>

      {/* Reset */}
      <Button variant="ghost" onClick={reset}>
        Reset
      </Button>

      {/* Results */}
      {result && (
        <Card>
          <CardContent className="p-4 space-y-3">
            {result.exempt ? (
              <p className="font-semibold text-green-600">
                Classified as a <strong>Small Company</strong> — therefore{" "}
                <strong>exempt from CIT</strong>.
              </p>
            ) : (
              <>
                <p>
                  <span className="font-semibold">Assessable Profit:</span> ₦
                  {result.profit.toLocaleString()}
                </p>

                <p>
                  <span className="font-semibold">
                    CIT ({(result.rate * 100).toFixed(0)}%):
                  </span>{" "}
                  ₦{result.cit.toLocaleString()}
                </p>

                <p>
                  <span className="font-semibold">
                    Development Levy (4% of profit):
                  </span>{" "}
                  ₦{result.levy.toLocaleString()}
                </p>

                <p className="mt-3 font-medium">
                  <strong>Total Payable:</strong> ₦
                  {(result.cit + result.levy).toLocaleString()}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
