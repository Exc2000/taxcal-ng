export default function RulesPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-4">Tax Rules Overview</h1>
        <p className="text-muted-foreground">
          Below is a clear summary of the Personal Income Tax (PIT) and
          Corporate Income Tax (CIT) rules implemented in this calculator,
          based on the 2026 Nigerian Tax Reform Bill.
        </p>
      </section>

      {/* PIT Rules */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Personal Income Tax (PIT)</h2>
        <p>
          PIT is calculated using progressive tax brackets, along with allowable
          reliefs such as pension, health funds, and rent relief.
        </p>

        <div className="border rounded-lg p-5 space-y-4 bg-white shadow-sm">
          <h3 className="font-semibold text-lg">📌 PIT Tax Brackets (2026)</h3>

          <ul className="space-y-2">
            <li>₦0 – ₦800,000 → <strong>0%</strong></li>
            <li>₦800,000 – ₦3,000,000 → <strong>15%</strong></li>
            <li>₦3,000,000 – ₦12,000,000 → <strong>18%</strong></li>
            <li>₦12,000,000 – ₦25,000,000 → <strong>21%</strong></li>
            <li>₦25,000,000 – ₦50,000,000 → <strong>23%</strong></li>
            <li>Above ₦50,000,000 → <strong>25%</strong></li>
          </ul>

          <h3 className="font-semibold text-lg mt-6">📌 Allowable Reliefs</h3>
          <ul className="space-y-2">
            <li>Rent Relief: 20% of rent, capped at <strong>₦500,000</strong></li>
            <li>Pension Contribution Cap: <strong>₦200,000</strong></li>
            <li>National Housing Fund (NHF) Cap: <strong>₦50,000</strong></li>
            <li>NHIS / Health Insurance Cap: <strong>₦50,000</strong></li>
          </ul>
        </div>
      </section>

      {/* CIT Rules */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Corporate Income Tax (CIT)</h2>
        <p>
          CIT rates depend on company size, based on turnover and asset limits.
        </p>

        <div className="border rounded-lg p-5 bg-white shadow-sm space-y-6">
          <h3 className="font-semibold text-lg">📌 Company Categories</h3>

          <ul className="space-y-3">
            <li>
              <strong>Small Companies</strong>  
              <br />Turnover ≤ ₦50,000,000 AND fixed assets ≤ ₦250,000,000  
              <br />→ <span className="font-medium text-green-600">Exempt from CIT</span>
            </li>

            <li>
              <strong>Medium Companies</strong>  
              <br />Turnover ₦50,000,001 – ₦250,000,000  
              <br />→ CIT Rate: <strong>20%</strong>
            </li>

            <li>
              <strong>Large Companies</strong>  
              <br />Turnover ≥ ₦250,000,001  
              <br />→ CIT Rate: <strong>30%</strong>
            </li>
          </ul>

          <h3 className="font-semibold text-lg">📌 Development Levy</h3>
          <p>
            All companies pay a development levy of <strong>4%</strong> of CIT
            payable (after determining the CIT amount).
          </p>
        </div>
      </section>

      <footer className="pt-6 text-sm text-muted-foreground">
        These rules are automatically applied in all calculations within the
        application. Updated to reflect the 2026 Nigerian Tax Reform Bill.
      </footer>
    </div>
  );
}
