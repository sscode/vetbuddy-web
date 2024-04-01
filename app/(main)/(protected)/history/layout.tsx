import { H2 } from "@/app/Components/Typography";
import SearchHistory from "./_components/SearchHistory";

export default async function HistoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="py-12 max-w-7xl w-[calc(100%-40px)] mx-auto">
      <div className="mb-12">
        <H2 className="mb-4">Consult History</H2>
        <SearchHistory />
      </div>
      {children}
    </div>
  );
}
