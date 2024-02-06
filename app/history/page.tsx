"use client";

import { Card, CardContent } from "../Components/ui/card";
import { H2, H3, P } from "../Components/Typography";

import { Button } from "../Components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MOCK_HISTORY } from "../Constants/mockData";
import dayjs from "dayjs";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type Record = {
  date: Date;
  name: string;
  animal?: string,
  audio: unknown;
  consult: unknown;
};

type GroupedRecord = {
  title: string;
  data: Record[];
};

export default function History() {
  const [sectionText] = useState(
    "Consult: 1. Patient Information: - Name: Brian - Species: Fish 2. Reason for Visit: - Closed eyes for three days"
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sectionText).then(
      () => {
        // Optionally show a notification or change the icon to indicate success
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const groupRecordsByDate = (unsortedRecords: Record[]): GroupedRecord[] => {
    const records: Record[] = unsortedRecords.sort((a, b) => {
      if (a?.date > b?.date) {
        return -1;
      } else if (a?.date < b?.date) {
        return 1;
      } else {
        return 0;
      }
    });
    const groupedRecords: GroupedRecord[] = Object.values(
      records.reduce(
        (grouped: { [key: string]: GroupedRecord }, record: Record) => {
          const dateKey = new Date(record.date).toLocaleDateString();
          if (!grouped[dateKey]) {
            grouped[dateKey] = {
              title: `${dayjs(record.date).format("dddd, MMMM D, YYYY")}`,
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
    <main className="bg-white py-12 w-[90vw] max-w-5xl mx-auto">
      <H2 className="mb-12">Consult History</H2>
      {groupRecordsByDate(MOCK_HISTORY)?.length ? (
        <div className="flex flex-col gap-10 my-4">
          {groupRecordsByDate(MOCK_HISTORY).map((groupRecord, index) => (
            <div key={index} className="flex flex-col gap-2">
              <H2>{groupRecord.title}</H2>
              <div className="flex flex-col gap-2">
                {groupRecord.data.map((record, index) => (
                  <Card
                    key={index}
                    className="bg-slate-50 p-4 flex justify-between items-center"
                  >
                    <div>
                      <P className="text-sm font-medium">{record.name}{record.animal && " - "+record.animal}</P>
                      <P className="text-sm text-neutral-500 font-medium">
                        {dayjs(record.date).format("h:mma")}
                      </P>
                    </div>
                    <div className="flex flex-row gap-2">
                      <Button size="sm" variant="ghost" className="text-neutral-500">
                        Audio
                      </Button>
                      <Button size="sm" variant="ghost" className="text-neutral-500">
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
          <P className="font-medium text-neutral-600">No Records Found</P>
          <Button variant="outline">New Consult</Button>
        </div>
      )}
    </main>
  );
}
