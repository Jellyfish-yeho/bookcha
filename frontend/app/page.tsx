
"use client";

import { useState } from "react";

export default function Home() {
    const [message, setMessage] = useState("아직 응답을 받지 않았어요.");
    const [loading, setLoading] = useState(false);

    async function callBackend() {
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/api/hello");

            if (!response.ok) {
                throw new Error(`HTTP 오류: ${response.status}`);
            }

            const data = await response.text();
            setMessage(data);
        } catch (error) {
            console.error(error);
            setMessage("백엔드 호출 실패! 개발자 도구 콘솔을 확인해 주세요.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="p-10">
            <h1 className="text-2xl font-bold">프론트엔드 ↔ 백엔드 연결 테스트</h1>

            <button
                onClick={callBackend}
                disabled={loading}
                className="mt-5 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
            >
                {loading ? "요청 중..." : "백엔드 호출하기"}
            </button>

            <p className="mt-5">응답 결과: {message}</p>
        </main>
    );
}
