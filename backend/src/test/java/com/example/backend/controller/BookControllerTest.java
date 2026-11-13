
package com.example.backend.controller;

import com.example.backend.BackendApplication;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = BackendApplication.class)
@AutoConfigureMockMvc
@Transactional
class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void 책_등록_성공() throws Exception {
        String requestBody = """
                {
                    "title": "자동화 테스트 책",
                    "author": "테스트 작가",
                    "status": "NOT_STARTED",
                    "memo": "JUnit 테스트"
                }
                """;

        mockMvc.perform(post("/api/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andDo(print()) // 요청과 응답을 실행 콘솔에 출력
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.title").value("자동화 테스트 책"))
                .andExpect(jsonPath("$.author").value("테스트 작가"))
                .andExpect(jsonPath("$.status").value("NOT_STARTED"))
                .andExpect(jsonPath("$.memo").value("JUnit 테스트"));
    }

    @Test
    void 제목이_비어_있으면_등록_실패() throws Exception {
        String requestBody = """
                {
                    "title": "",
                    "author": "테스트 작가",
                    "status": "NOT_STARTED",
                    "memo": ""
                }
                """;

        mockMvc.perform(post("/api/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andDo(print()) // 요청과 응답을 실행 콘솔에 출력
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.message").value("책 제목은 필수입니다."));
    }
}
