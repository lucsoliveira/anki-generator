import { Card } from "../Card";

export function Box({
  children,
  title,
  subtitle,
}: {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <Card title={title} subtitle={subtitle}>
      {children}
    </Card>
  );
}
