import { H2, P } from "@/app/Components/Typography";

import { Button } from "@/app/Components/ui/button";
import { Card } from "@/app/Components/ui/card";
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

const getHistory = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("consults")
    .select("*, template:templates(*)");

  const consults = data as Record[];

  return consults;
};

export default async function HistoryPage() {
  const consults = await getHistory();

  const groupRecordsByDate = (unsortedRecords: Record[]): GroupedRecord[] => {
    const records: Record[] = unsortedRecords.sort((a, b) => {
      if (a?.created_at > b?.created_at) {
        return -1;
      } else if (a?.created_at < b?.created_at) {
        return 1;
      } else {
        return 0;
      }
    });
    const groupedRecords: GroupedRecord[] = Object.values(
      records.reduce(
        (grouped: { [key: string]: GroupedRecord }, record: Record) => {
          const dateKey = new Date(record.created_at).toLocaleDateString();
          if (!grouped[dateKey]) {
            grouped[dateKey] = {
              title: `${dayjs(record.created_at).format("dddd, MMMM D, YYYY")}`,
              data: [],
            };
          }
          grouped[dateKey].data.push(record);
          return grouped;
        },
        {}
      )
    );
    return groupedRecords;
  };
  return (
    <>
      <H2 className="mb-12">Consult History</H2>
      {groupRecordsByDate(consults)?.length ? (
        <div className="flex flex-col gap-10 my-4">
          {groupRecordsByDate(consults).map((groupRecord, index) => (
            <div key={index} className="flex flex-col gap-2">
              <H2>{groupRecord.title}</H2>
              <div className="flex flex-col gap-2">
                {groupRecord.data.map((record, index) => (
                  <Card
                    key={index}
                    className="bg-slate-50 p-4 flex justify-between items-center"
                  >
                    <div>
                      <P className="text-sm font-medium">
                        {record.name}
                        {record?.template && " - " + record.template.name}
                      </P>
                      <P className="text-sm text-neutral-500 font-medium">
                        {dayjs(record.created_at).format("h:mma")}
                      </P>
                    </div>
                    <div className="flex flex-row gap-2">
                      {/* <HistoryAudioButton audioURL={record.audio_url} /> */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-neutral-500"
                      >
                        Audio
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-neutral-500"
                      >
                        Consult
                      </Button>
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
