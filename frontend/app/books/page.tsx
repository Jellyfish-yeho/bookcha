
import { Suspense } from "react";
import BookCreateForm from "@/app/books/BookCreateForm";
import BookEditForm from "@/app/books/BookEditForm";
import BookDeleteButton from "@/app/books/BookDeleteButton";
import {getBooks} from "@/lib/api/books";
import Link from "next/link";

async function BookList() {
    const books = await getBooks()

    if (books.length === 0) {
        return <p>아직 등록된 책이 없어요.</p>;
    }

    return (
        <ul className="space-y-4">
            {books.map((book) => (
                <li
                    key={book.id}
                    className="rounded-lg border p-4"
                >
                    <h2 className="text-lg font-semibold">
                        <Link
                            href={`/books/${book.id}`}
                            className="hover:underline"
                        >
                            {book.title}
                        </Link>
                    </h2>

                    <p className="text-gray-600">
                        {book.author ?? "작가 미상"}
                    </p>

                    <p className="mt-2 text-sm">
                        독서 상태: {book.status}
                    </p>

                    {book.memo && (
                        <p className="mt-2 whitespace-pre-wrap text-sm text-gray-700">
                            {book.memo}
                        </p>
                    )}

                    <BookEditForm
                        id={book.id}
                        initialTitle={book.title}
                        initialAuthor={book.author}
                        initialStatus={book.status}
                        initialMemo={book.memo}
                    />

                    <BookDeleteButton
                        id={book.id}
                        title={book.title}
                    />
                </li>
            ))}
        </ul>
    );
}

export default function BooksPage() {
    return (
        <main className="p-10">
            <h1 className="mb-6 text-2xl font-bold">
                나의 책장
            </h1>

            <BookCreateForm />

            <Suspense fallback={<p>책 목록 불러오는 중...</p>}>
                <BookList />
            </Suspense>
        </main>
    );
}
