"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  getDocs,
} from "firebase/firestore";
import fireStore from "@/firebase/firestore";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [frameCount, setFrameCount] = useState(0);
  const [fishCount, setFishCount] = useState(0);

  useEffect(() => {
    // 쿠키에서 사용자 식별자 확인
    let userId = Cookies.get("user_id");

    if (!userId) {
      // 새로운 사용자인 경우
      userId = uuidv4();
      Cookies.set("user_id", userId, { expires: 365 });

      // Firebase에 새로운 사용자 추가
      const addNewUser = async () => {
        try {
          await addDoc(collection(fireStore, "fishedUsers"), {
            userId,
            timestamp: new Date(),
          });
        } catch (error) {
          console.error("Error adding user:", error);
        }
      };
      addNewUser();
    }

    // 실시간으로 낚인 사람 수 업데이트
    const unsubscribe = onSnapshot(
      collection(fireStore, "fishedUsers"),
      (snapshot) => {
        setFishCount(snapshot.size);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "paintWorklet" in CSS) {
      try {
        (CSS as any).paintWorklet.addModule("/houdini.js");

        let animationFrameId: number;
        const animate = () => {
          setFrameCount((prev) => prev + 1);
          animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }
        };
      } catch (error) {}
    } else {
      console.log("Paint worklet을 지원하지 않는 브라우저입니다.");
    }
  }, []);

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0"
        style={
          {
            background: "paint(magic-particle-effect)",
            "--animation-offset": frameCount,
          } as React.CSSProperties
        }
      ></div>
      <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="w-full h-full"></div>
        <div className="w-full max-w-8xl">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center ">
            🤭 토스 링크로 낚시 해보면 재밌겠다 ㅋㅋ
            <br />
            현재 낚인 사람 수 {fishCount}명
          </h1>
        </div>
        <div className="w-full h-full"></div>
      </div>
    </div>
  );
}
