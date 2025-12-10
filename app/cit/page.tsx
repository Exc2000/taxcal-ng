"use client";
import CITForm from "../../components/CITForm";

export default function CITPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Corporate Income Tax (CIT) Calculator
      </h1>
      <CITForm />
    </div>
  );
}
