
import { Suspense } from "react";

type Book = {
    id: number;
    title: string;
    author: string | null;
    status: string;
};

async function BookList() {
    const response = await fetch("http://localhost:8080/api/books");

    if (!response.ok) {
        throw new Error("책 목록을 불러오지 못했습니다.");
    }

    const books: Book[] = await response.json();

    return (
        <>
            {books.length === 0 ? (
                <p>아직 등록된 책이 없어요.</p>
            ) : (
                <ul className="space-y-4">
                    {books.map((book) => (
                        <li
                            key={book.id}
                            className="rounded-lg border p-4"
                        >
                            <h2 className="text-lg font-semibold">
                                {book.title}
                            </h2>

                            <p className="text-gray-600">
                                {book.author ?? "작가 미상"}
                            </p>

                            <p className="mt-2 text-sm">
                                독서 상태: {book.status}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default function BooksPage() {
    return (
        <main className="p-10">
            <h1 className="mb-6 text-2xl font-bold">
                나의 책장
            </h1>

            <Suspense fallback={<p>책 목록 불러오는 중...</p>}>
                <BookList />
            </Suspense>
        </main>
    );
}
