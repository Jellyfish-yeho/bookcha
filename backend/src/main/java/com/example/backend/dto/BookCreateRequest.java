
package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record BookCreateRequest(
        @NotBlank(message = "책 제목은 필수입니다.")
        @Size(max = 255, message = "책 제목은 255자 이하여야 합니다.")
        String title,

        @Size(max = 100, message = "작가 이름은 100자 이하여야 합니다.")
        String author,

        @Pattern(
                regexp = "NOT_STARTED|READING|COMPLETED",
                message = "독서 상태가 올바르지 않습니다."
        )
        String status,

        @Size(max = 5000, message = "메모는 5000자 이하여야 합니다.")
        String memo
) {
}
