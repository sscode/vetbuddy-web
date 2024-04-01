export default async function ConsultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col w-full flex-grow">{children}</div>;
}
