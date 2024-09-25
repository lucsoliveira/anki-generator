"use client";
import { HealthStatus } from "@/shared/components/HealthStatus";
import { WordsForm } from "@/shared/components/WordsForm";
import { HomeStyle } from "./styles";

export default function Home() {
  return (
    <HomeStyle>
      <WordsForm />
      <HealthStatus />
    </HomeStyle>
  );
}
