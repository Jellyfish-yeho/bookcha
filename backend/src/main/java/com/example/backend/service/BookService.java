package com.example.backend.service;

import com.example.backend.dto.BookCreateRequest;
import com.example.backend.dto.BookUpdateRequest;
import com.example.backend.entity.Book;
import com.example.backend.exception.BookNotFoundException;
import com.example.backend.repository.BookRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Transactional(readOnly = true)
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Transactional
    public Book createBook(BookCreateRequest request) {
        Book book = new Book(
                request.title(),
                request.author(),
                request.status(),
                request.memo()
        );

        return bookRepository.save(book);
    }

    @Transactional(readOnly = true)
    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));
    }

    @Transactional
    public Book updateBook(Long id, BookUpdateRequest request) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));

        book.setTitle(request.title());
        book.setAuthor(request.author());
        book.setStatus(request.status());
        book.setMemo(request.memo());

        return bookRepository.save(book); //dirty checking?
    }

    @Transactional
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new BookNotFoundException(id);
        }

        bookRepository.deleteById(id);
    }

}

