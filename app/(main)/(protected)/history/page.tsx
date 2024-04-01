import { H3, P } from "@/app/Components/Typography";

import { Button } from "@/app/Components/ui/button";
import { Card } from "@/app/Components/ui/card";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Template } from "@/app/store";
import { createClient } from "@/app/Lib/supabase/server";
import dayjs from "dayjs";

type Record = {
  id: string;
  created_at: Date;
  name: string;
  template?: Template;
  audio_url: string;
  consult: unknown;
};

type GroupedRecord = {
  title: string;
  data: Record[];
};

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const searchQuery = searchParams?.search;

  const supabase = createClient();

  const { data, error } = await supabase
    .from("consults")
    .select("*, template:templates(*)")
    .ilike("name", `%${searchQuery || ""}%`)
    .or(`name.ilike.%${searchQuery || ""}%`, { referencedTable: "templates" });

  const consults = data as Record[];

  const groupRecordsByDate = (unsortedRecords: Record[]): GroupedRecord[] => {
    const now = dayjs();
    const today = now.format("YYYY-MM-DD");
    const yesterday = now.subtract(1, "day").format("YYYY-MM-DD");
    const lastMonth = now.format("YYYY-MM");

    const groupedRecords: { [key: string]: GroupedRecord } =
      unsortedRecords.reduce(
        (grouped: { [key: string]: GroupedRecord }, record: Record) => {
          const createdAt = dayjs(record.created_at);
          let dateKey: string;

          if (createdAt.format("YYYY-MM-DD") === today) {
            dateKey = `Today, ${createdAt.format("ddd D MMM")}`;
          } else if (createdAt.format("YYYY-MM-DD") === yesterday) {
            dateKey = `Yesterday, ${createdAt.format("ddd D MMM")}`;
          } else if (createdAt.format("YYYY-MM") === lastMonth) {
            dateKey = "Last Month";
          } else {
            dateKey = createdAt.format("MMMM YYYY");
          }

          if (!grouped[dateKey]) {
            grouped[dateKey] = {
              title: dateKey,
              data: [],
            };
          }
          grouped[dateKey].data.push(record);
          return grouped;
        },
        {}
      );

    const sortedKeys = Object.keys(groupedRecords).sort((a, b) => {
      if (a.includes("Today")) return -1;
      if (b.includes("Today")) return 1;
      if (a.includes("Yesterday")) return -1;
      if (b.includes("Yesterday")) return 1;
      if (a === "Last Month" && b !== "Today" && b !== "Yesterday") return -1;
      if (b === "Last Month" && a !== "Today" && a !== "Yesterday") return 1;
      const dateA = dayjs(a, "MMMM YYYY");
      const dateB = dayjs(b, "MMMM YYYY");
      return dateB.diff(dateA);
    });

    const sortedGroupedRecords = sortedKeys.map((key) => groupedRecords[key]);

    return sortedGroupedRecords;
  };

  return (
    <>
      {groupRecordsByDate(consults)?.length ? (
        <div className="flex flex-col gap-10 my-4">
          {groupRecordsByDate(consults).map((groupRecord, index) => (
            <div key={index} className="flex flex-col gap-2">
              <H3>{groupRecord.title}</H3>
              <div className="flex flex-col">
                {groupRecord.data.map((record, index) => (
                  <Card
                    key={index}
                    className="bg-slate-50 p-4 flex justify-between items-center rounded-none text-neutral-500"
                  >
                    <P className="md:indent-8 text-sm font-medium w-60 overflow-hidden">
                      {record?.template && record.template.name}
                    </P>

                    <div className="flex gap-4 items-center w-fit">
                      <P className="whitespace-nowrap text-sm text-neutral-500 font-medium md:w-48">
                        <span className="hidden md:block">
                          {dayjs(record.created_at).format(
                            "ddd, MMM D, YYYY H:mm"
                          )}
                        </span>
                        <span className="block md:hidden">
                          {dayjs(record.created_at).format("d/M/YY[-]H:mm")}
                        </span>
                      </P>

                      <Link href={`/consult/${record.id}`}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-neutral-500 space-x-2"
                        >
                          <Eye className="hidden md:block" /> <span>View</span>
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 gap-4">
          <P className="font-medium text-neutral-500">No Records Found</P>
          <Link href="/consult" passHref legacyBehavior>
            <Button variant="outline">New Consult</Button>
          </Link>
        </div>
      )}
    </>
  );
}
