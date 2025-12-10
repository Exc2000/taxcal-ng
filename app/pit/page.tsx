"use client";
import PITForm from "../../components/PITForm";

export default function PITPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Personal Income Tax (PIT) Calculator
      </h1>
      <PITForm />
    </div>
  );
}
