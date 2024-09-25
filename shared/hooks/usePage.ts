import { usePathname } from "next/navigation";

export function usePage() {
  const pathname = usePathname();

  return {
    pathname,
  };
}
