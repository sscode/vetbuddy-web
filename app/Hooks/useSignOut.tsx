import { supabase } from "../Lib/supabase/client";
import { useRouter } from "next/navigation";

export default function useSignOut() {
  const { refresh } = useRouter();
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      return;
    }
    refresh()
  }

  return signOut;
}
