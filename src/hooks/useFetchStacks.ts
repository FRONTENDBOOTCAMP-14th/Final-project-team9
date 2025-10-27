import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export const useFetchStacks = () => {
  const [stacks, setStacks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStacks = async () => {
      setLoading(true);
      setError(null);

      const { data, error: dbError } = await supabase
        .from("tech_stacks")
        .select("name");

      if (dbError) {
        console.error("Error fetching stacks:", dbError);
        setError("기술 스택 목록 로딩 실패");
        setStacks([]);
      } else if (data) {
        setStacks(data.map((stack) => stack.name));
      }
      setLoading(false);
    };

    void fetchStacks();
  }, []);

  return { stacks, loading, error };
};
