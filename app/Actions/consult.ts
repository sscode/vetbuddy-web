"use server";

import { Template } from "../store";
import { createClient } from "../Lib/supabase/server";
import { formatConsultTextForAPI } from "../Lib/utils";
import { revalidatePath } from "next/cache";

export const createConsult = async (formData: FormData) => {
  try {
    const name = formData.get("name");
    const audioBlob = formData.get("audioBlob");
    const template_id = formData.get("template_id");
    const rawTemplates = formData.get("templates") as string;
    const templates: Template[] = JSON.parse(rawTemplates) || [];
    const consultText = formData.get("consultText");

    const selected = templates.find(
      (template) => template.id === template_id
    ) as Template;

    // Uploading Audio
    const response = await fetch(
      "https://vetbuddy.onrender.com/generate-upload-url"
    );
    const { uploadURL, key } = await response.json();

    await fetch(uploadURL, {
      method: "PUT",
      headers: {
        "Content-Type": "audio/wav",
      },
      body: audioBlob,
    });

    const fileAccessURL = `https://vetbuddy.s3.us-west-2.amazonaws.com/${key}`;

    // Transcripting Audio
    const deepgramRes = await fetch(
      `https://vetbuddy.onrender.com/deepgram?url=${encodeURIComponent(
        fileAccessURL
      )}`
    );
    const deepgramdata = await deepgramRes.json();
    const transcript =
      deepgramdata.results.channels[0].alternatives[0].transcript;

    const textForAPI = formatConsultTextForAPI(selected.sections);
    console.log("textForAPI", textForAPI);

    // Generating AI response
    const openaiRes = await fetch("https://vetbuddy.onrender.com/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transcript, textForAPI }),
    });
    const openaiData = await openaiRes.json();
    console.log("data:", openaiData.text);

    // Updating Database
    const supabase = createClient();

    const { data, error } = await supabase
      .from("consults")
      .insert({
        template_id: selected?.id,
        name: name,
        audio_url: fileAccessURL,
        transcript,
        content: openaiData.text,
      })
      .select("*");

    if (error) {
      throw error;
    }

    revalidatePath("/history");

    return data[0];
  } catch (error) {
    console.error("Error: ", error)
  }
};
