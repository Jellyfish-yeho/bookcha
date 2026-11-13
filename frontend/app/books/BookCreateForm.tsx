
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {createBook} from "@/lib/api/books";

export default function BookCreateForm() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState("NOT_STARTED");
    const [memo, setMemo] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            await createBook({
                title,
                author,
                status,
                memo,
            })

            setTitle("");
            setAuthor("");
            setStatus("NOT_STARTED");
            setMemo("");
            setMessage("책이 등록되었습니다!");

            // 서버 컴포넌트의 데이터를 다시 가져오도록 요청
            router.refresh();
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "책 등록에 실패했습니다."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="mb-8 rounded-lg border p-5">
            <h2 className="mb-4 text-xl font-bold">새 책 등록</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="mb-1 block">
                        책 제목 *
                    </label>
                    <input
                        id="title"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                        required
                        maxLength={255}
                        className="w-full rounded border p-2"
                    />
                </div>

                <div>
                    <label htmlFor="author" className="mb-1 block">
                        작가
                    </label>
                    <input
                        id="author"
                        value={author}
                        onChange={(event) =>
                            setAuthor(event.target.value)
                        }
                        maxLength={100}
                        className="w-full rounded border p-2"
                    />
                </div>

                <div>
                    <label htmlFor="status" className="mb-1 block">
                        독서 상태
                    </label>
                    <select
                        id="status"
                        value={status}
                        onChange={(event) =>
                            setStatus(event.target.value)
                        }
                        className="w-full rounded border p-2"
                    >
                        <option value="NOT_STARTED">읽기 전</option>
                        <option value="READING">읽는 중</option>
                        <option value="COMPLETED">완독</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="memo" className="mb-1 block">
                        메모
                    </label>
                    <textarea
                        id="memo"
                        value={memo}
                        onChange={(event) =>
                            setMemo(event.target.value)
                        }
                        maxLength={5000}
                        rows={3}
                        className="w-full rounded border p-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                >
                    {loading ? "등록 중..." : "책 등록"}
                </button>

                {message && (
                    <p role="status" aria-live="polite">
                        {message}
                    </p>
                )}
            </form>
        </section>
    );
}
