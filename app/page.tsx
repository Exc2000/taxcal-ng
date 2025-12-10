import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FiUser,
  FiTrendingUp,
  FiBarChart2,
  FiHome,
  FiBriefcase,
} from "react-icons/fi";

export default function Home() {
  return (
    <div className="space-y-16 max-w-6xl mx-auto">
      {/* HERO SECTION */}
      <section className="text-center py-16 px-6 bg-linear-to-b from-slate-50 to-white rounded-2xl shadow-lg">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          🇳🇬 Nigeria Tax Calculator
        </h1>
        <p className="text-slate-600 max-w-3xl mx-auto text-lg md:text-xl mb-8">
          Calculate Nigeria’s 2026 Personal Income Tax (PIT) and Corporate
          Income Tax (CIT) instantly in your browser. No data is stored —
          everything is processed securely on your device.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button size="lg" asChild className="w-full md:w-auto">
            <Link href="/pit">Calculate PIT</Link>
          </Button>

          <Button
            size="lg"
            variant="secondary"
            asChild
            className="w-full md:w-auto"
          >
            <Link href="/cit">Calculate CIT</Link>
          </Button>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-xl transition-shadow duration-300 rounded-xl">
          <CardHeader className="flex items-center gap-3">
            <FiUser className="text-2xl text-blue-500" />
            <CardTitle>Enter Your Figures</CardTitle>
          </CardHeader>
          <CardContent>
            Provide your income sources (salary, freelance, rental) and
            deductions — pension, NHF, NHIS, rent relief, etc.
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-300 rounded-xl">
          <CardHeader className="flex items-center gap-3">
            <FiTrendingUp className="text-2xl text-green-500" />
            <CardTitle>We Apply the 2026 Reform</CardTitle>
          </CardHeader>
          <CardContent>
            Our calculator applies the official 2026 PIT & CIT tax brackets,
            relief caps, and progressive rules automatically.
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-300 rounded-xl">
          <CardHeader className="flex items-center gap-3">
            <FiBarChart2 className="text-2xl text-purple-500" />
            <CardTitle>Instant Results</CardTitle>
          </CardHeader>
          <CardContent>
            View detailed tax breakdowns, effective rates, monthly payments, and
            company obligations instantly.
          </CardContent>
        </Card>
      </section>

      {/* FEATURE CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-xl transition-shadow duration-300 rounded-xl">
          <CardHeader className="flex items-center gap-3">
            <FiHome className="text-2xl text-orange-500" />
            <CardTitle>For Individuals</CardTitle>
          </CardHeader>
          <CardContent>
            Calculate taxable income under the 2026 PIT reform. Includes updated
            reliefs: rent relief, pension cap, NHF, NHIS, and progressive tax
            brackets up to 25%.
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-300 rounded-xl">
          <CardHeader className="flex items-center gap-3">
            <FiBriefcase className="text-2xl text-teal-500" />
            <CardTitle>For Businesses</CardTitle>
          </CardHeader>
          <CardContent>
            Estimate corporate tax liability, check small & medium company
            rates, and compute development levy. See how much your business owes
            in real-time.
          </CardContent>
        </Card>
      </section>

      {/* footer*/}
      <div className="text-center py-6 text-sm text-muted-foreground bg-slate-50 border rounded-lg">
        Built with ❤️ using Next.js, Shadcn UI and NTA Bill.
      </div>
    </div>
  );
}
