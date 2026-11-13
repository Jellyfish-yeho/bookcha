
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {deleteBook} from "@/lib/api/books";

type BookDeleteButtonProps = {
    id: number;
    title: string;
};

export default function BookDeleteButton({
                                             id,
                                             title,
                                         }: BookDeleteButtonProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleDelete() {
        const confirmed = window.confirm(
            `"${title}" 책을 삭제할까요?`
        );

        if (!confirmed) {
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            await deleteBook(id)

            setMessage("삭제되었습니다!");

            // 서버 컴포넌트의 책 목록을 갱신
            router.refresh();
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "책 삭제에 실패했습니다."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mt-3">
            <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="rounded border border-red-500 px-3 py-1 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
                {loading ? "삭제 중..." : "삭제"}
            </button>

            {message && (
                <p role="status" aria-live="polite" className="mt-2 text-sm">
                    {message}
                </p>
            )}
        </div>
    );
}
