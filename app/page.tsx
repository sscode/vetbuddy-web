import { Button } from "./Components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-12 flex flex-col justify-center gap-4">
      <Link href="/templates" className="w-full">
        <Button className="w-full" variant="outline">Create a Consult Template</Button>
      </Link>
      <Link href="/consult" className="w-full">
        <Button className="w-full" variant="outline">Begin A Consult</Button>
      </Link>
    </div>
  );
}
