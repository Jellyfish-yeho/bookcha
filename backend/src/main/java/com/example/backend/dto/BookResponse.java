
package com.example.backend.dto;

import com.example.backend.entity.Book;

public record BookResponse(
        Long id,
        String title,
        String author,
        String status,
        String memo
) {
    public static BookResponse from(Book book) {
        return new BookResponse(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getStatus(),
                book.getMemo()
        );
    }
}
