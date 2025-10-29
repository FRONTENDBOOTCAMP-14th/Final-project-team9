"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import LabeledInput from "@/components/common/LabeledInput";
import PasswordInput from "@/components/common/PasswordInput";
import { supabase } from "@/lib/supabase";
import { sanitizeHTML, normalizeWhitespace } from "@/utils/sanitize";
import { useToastStore } from "@/store/toast-store";

const LoginForm = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const showToast = useToastStore((state) => state.showToast);

  const handleLogin = async (username: string, password: string) => {
    try {
      const { data: users, error: fetchError } = await supabase
        .from("users")
        .select("email")
        .eq("username", username)
        .single();

      if (fetchError || !users) {
        throw new Error("아이디 또는 비밀번호가 잘못되었습니다.");
      }

      const email = users.email;

      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) throw signInError;

      showToast("로그인되었습니다.", "success");
      router.push("/");
    } catch (error: unknown) {
      showToast("아이디 또는 비밀번호가 잘못되었습니다.", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleLogin(id, password);
  };

  return (
    <div className="w-full max-w-[615px]">
      <form
        onSubmit={(e) => {
          void handleSubmit(e);
        }}
        className="flex flex-col"
      >
        <LabeledInput
          id="login-id"
          label="아이디를 입력하세요"
          type="text"
          value={id}
          onChange={(e) => {
            const sanitized = normalizeWhitespace(sanitizeHTML(e.target.value));
            setId(sanitized);
          }}
          containerClassName="w-full h-[80px]"
        />

        <div className="mt-[20px]">
          <PasswordInput
            id="login-password"
            label="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            containerClassName="w-full h-[80px]"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full h-[80px] text-[24px] mt-[40px] cursor-pointer"
        >
          로그인
        </Button>
      </form>
    </div>
  );
};
export default LoginForm;
