"use client";
import { HealthStatus } from "@/shared/components/HealthStatus";
import { WordsForm } from "@/shared/components/WordsForm";

export default function Home() {
  return (
    <div>
      <WordsForm />
      <HealthStatus />
    </div>
  );
}
