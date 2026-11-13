
const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export type Book = {
    id: number;
    title: string;
    author: string | null;
    status: string;
    memo: string | null;
};

export type BookInput = {
    title: string;
    author: string;
    status: string;
    memo: string;
};

// API 오류 응답에서 메시지를 가져오는 공통 함수
async function getErrorMessage(
    response: Response,
    defaultMessage: string
): Promise<string> {
    try {
        const data = await response.json();
        return data.message ?? defaultMessage;
    } catch {
        return defaultMessage;
    }
}

// 책 전체 조회
export async function getBooks(): Promise<Book[]> {
    const response = await fetch(`${API_BASE_URL}/api/books`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(
            await getErrorMessage(response, "책 목록을 불러오지 못했습니다.")
        );
    }

    return response.json();
}

// 책 한 권 조회
export async function getBookById(id: number): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/api/books/${id}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(
            await getErrorMessage(response, "책 정보를 불러오지 못했습니다.")
        );
    }

    return response.json();
}

// 책 등록
export async function createBook(input: BookInput): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/api/books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    });

    if (!response.ok) {
        throw new Error(
            await getErrorMessage(response, "책 등록에 실패했습니다.")
        );
    }

    return response.json();
}

// 책 수정
export async function updateBook(
    id: number,
    input: BookInput
): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/api/books/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    });

    if (!response.ok) {
        throw new Error(
            await getErrorMessage(response, "책 수정에 실패했습니다.")
        );
    }

    return response.json();
}

// 책 삭제
export async function deleteBook(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/books/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(
            await getErrorMessage(response, "책 삭제에 실패했습니다.")
        );
    }
}
