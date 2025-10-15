"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FetchUsers() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id, email, nickname, positions(name), careers(name)");

      if (error) {
        console.error("테이터 블러오기 오류", error);
      } else {
        console.log("데이터 블러오기", data);
        setUsers(data);
      }
    };
    fetchUsers();
  }, []);

  return (
    <main className="flex flex-col gap-5 bg-pink-200">
      <h1 className="text-7">Supabase 연결 테스트</h1>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id} className="border">
              <div>
                <b>이메일:</b> {user.email}
              </div>
              <div>
                <b>닉네임:</b> {user.nickname}
              </div>
              <div>
                <b>포지션:</b> {user.positions.name}
              </div>
              <div>
                <b>경력:</b> {user.careers.name}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>불러올 유저 데이터가 없습니다.</p>
      )}
    </main>
  );
}
