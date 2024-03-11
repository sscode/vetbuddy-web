import { type ClassValue, clsx } from "clsx"
import jsPDF from "jspdf";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const copyToClipboard = (text:string) => {
  navigator.clipboard.writeText(text)
};

export const downloadPDF = (text:string) => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Add text to PDF
  doc.text(text, 10, 30); // Adjust the position as needed

  //get date in format DDMMYYYY
  const date = new Date();
  let day = date.getDate();

  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  let zero = "";
  if (day < 10) {
    zero = `0`;
  }
  const dateString = `${zero}${day}${month}${year}`;

  // Save the PDF
  doc.save(`vetbuddy-${dateString}.pdf`);
};

export function formatConsultTextForAPI(
  sections: Array<{ name: string; isChecked: boolean }>
) {
  // Transform each section with its index and name. Prepend special instructions if isChecked is true.
  const formattedSections = sections.map((section, index) => {
    const prefix = section.isChecked ? "**SPECIAL INSTRUCTIONS**\n" : "";
    return `${prefix}${index + 1}. ${section.name}`;
  });

  // Join all transformed strings together with a newline character
  return formattedSections.join("\n");
}

export function formatConsultTextRender(APIText: string) {
  //add a newline after each section. each section ends with \n
  return APIText.split("\n").join("\n\n");
}