
package com.example.backend.controller;

import com.example.backend.dto.BookCreateRequest;
import com.example.backend.dto.BookResponse;
import com.example.backend.dto.BookUpdateRequest;
import com.example.backend.entity.Book;
import com.example.backend.exception.BookNotFoundException;
import com.example.backend.service.BookService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<BookResponse> getAllBooks() {
        return bookService.getAllBooks()
                .stream()
                .map(BookResponse::from)
                .toList();
    }


    @PostMapping
    public BookResponse createBook(
            @Valid @RequestBody BookCreateRequest request
    ) {
        Book book = bookService.createBook(request);
        return BookResponse.from(book);
    }

    @GetMapping("/{id}")
    public BookResponse getBookById(@PathVariable Long id) {
        Book book = bookService.getBookById(id);
        return BookResponse.from(book);
    }

    @PutMapping("/{id}")
    public BookResponse updateBook(
            @PathVariable Long id,
            @Valid @RequestBody BookUpdateRequest request
    ) {
        Book book = bookService.updateBook(id, request);
        return BookResponse.from(book);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }



}
