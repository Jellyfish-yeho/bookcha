
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {updateBook} from "@/lib/api/books";

type BookEditFormProps = {
    id: number;
    initialTitle: string;
    initialAuthor: string | null;
    initialStatus: string;
    initialMemo: string | null;
};

export default function BookEditForm({
                                         id,
                                         initialTitle,
                                         initialAuthor,
                                         initialStatus,
                                         initialMemo,
                                     }: BookEditFormProps) {
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    const [author, setAuthor] = useState(initialAuthor ?? "");
    const [status, setStatus] = useState(initialStatus);
    const [memo, setMemo] = useState(initialMemo ?? "");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await updateBook(id, {
                title,
                author,
                status,
                memo,
            })

            setIsEditing(false);
            setMessage("수정되었습니다!");

            router.refresh();
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "책 수정에 실패했습니다."
            );
        } finally {
            setLoading(false);
        }
    }

    function handleCancel() {
        setTitle(initialTitle);
        setAuthor(initialAuthor ?? "");
        setStatus(initialStatus);
        setMemo(initialMemo ?? "");
        setMessage("");
        setIsEditing(false);
    }

    if (!isEditing) {
        return (
            <div className="mt-3">
                <button
                    type="button"
                    onClick={() => {
                        setMessage("");
                        setIsEditing(true);
                    }}
                    className="rounded border px-3 py-1 text-sm hover:bg-gray-100"
                >
                    수정
                </button>

                {message && (
                    <p role="status" className="mt-2 text-sm">
                        {message}
                    </p>
                )}
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-4 space-y-3 rounded-lg border p-4"
        >
            <h3 className="font-semibold">책 정보 수정</h3>

            <div>
                <label
                    htmlFor={`title-${id}`}
                    className="mb-1 block text-sm"
                >
                    책 제목 *
                </label>
                <input
                    id={`title-${id}`}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                    maxLength={255}
                    className="w-full rounded border p-2"
                />
            </div>

            <div>
                <label
                    htmlFor={`author-${id}`}
                    className="mb-1 block text-sm"
                >
                    작가
                </label>
                <input
                    id={`author-${id}`}
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                    maxLength={100}
                    className="w-full rounded border p-2"
                />
            </div>

            <div>
                <label
                    htmlFor={`status-${id}`}
                    className="mb-1 block text-sm"
                >
                    독서 상태
                </label>
                <select
                    id={`status-${id}`}
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    className="w-full rounded border p-2"
                >
                    <option value="NOT_STARTED">읽기 전</option>
                    <option value="READING">읽는 중</option>
                    <option value="COMPLETED">완독</option>
                </select>
            </div>

            <div>
                <label
                    htmlFor={`memo-${id}`}
                    className="mb-1 block text-sm"
                >
                    메모
                </label>
                <textarea
                    id={`memo-${id}`}
                    value={memo}
                    onChange={(event) => setMemo(event.target.value)}
                    maxLength={5000}
                    rows={4}
                    className="w-full rounded border p-2"
                />
            </div>

            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                >
                    {loading ? "저장 중..." : "저장"}
                </button>

                <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="rounded border px-4 py-2 disabled:opacity-50"
                >
                    취소
                </button>
            </div>

            {message && (
                <p role="status" aria-live="polite" className="text-sm">
                    {message}
                </p>
            )}
        </form>
    );
}
