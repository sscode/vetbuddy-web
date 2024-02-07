import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-12 flex flex-col justify-center">
      <Link
        className="text-black border border-black p-2 rounded-md hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
        href="/templates"
      >
        Create a Consult Template
      </Link>
      <Link
        className="mt-8 text-black border border-black p-2 rounded-md hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
        href="/consult"
      >
        Begin A Consult
      </Link>
    </div>
  );
}
