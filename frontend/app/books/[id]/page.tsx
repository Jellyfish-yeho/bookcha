
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookById } from "@/lib/api/books";

type BookDetailPageProps = {
    params: Promise<{ id: string }>;
};

async function BookDetailContent({ params }: BookDetailPageProps) {
    const { id } = await params;
    const bookId = Number(id);

    if (!Number.isInteger(bookId) || bookId <= 0) {
        notFound();
    }

    let book;

    try {
        book = await getBookById(bookId);
    } catch {
        notFound();
    }

    const statusLabels: Record<string, string> = {
        NOT_STARTED: "읽기 전",
        READING: "읽는 중",
        COMPLETED: "완독",
    };

    return (
        <>
            <Link
                href="/books"
                className="text-sm text-blue-600 hover:underline"
            >
                ← 나의 책장으로
            </Link>

            <article className="mt-6 rounded-lg border p-6">
                <h1 className="text-2xl font-bold">
                    {book.title}
                </h1>

                <p className="mt-2 text-gray-600">
                    작가: {book.author ?? "작가 미상"}
                </p>

                <p className="mt-4">
                    독서 상태:{" "}
                    {statusLabels[book.status] ?? book.status}
                </p>

                <section className="mt-6">
                    <h2 className="font-semibold">독서 메모</h2>

                    <p className="mt-2 whitespace-pre-wrap text-gray-700">
                        {book.memo || "작성된 메모가 없습니다."}
                    </p>
                </section>

                <p className="mt-6 text-sm text-gray-500">
                    책 ID: {book.id}
                </p>
            </article>
        </>
    );
}

export default function BookDetailPage({
                                           params,
                                       }: BookDetailPageProps) {
    return (
        <main className="mx-auto max-w-2xl p-10">
            <Suspense
                fallback={<p>책 정보를 불러오는 중...</p>}
            >
                <BookDetailContent params={params} />
            </Suspense>
        </main>
    );
}
