import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center gap-5 p-10">
      <Button asChild>
        <Link href="/worker">Продолжить как работник</Link>
      </Button>
      <Button asChild>
        <Link href="/driver">Продолжить как вузковый </Link>
      </Button>
      <Button asChild>
        <Link href="/admin">Продолжить как админ</Link>
      </Button>
    </main>
  );
}
