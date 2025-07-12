package com.example.login_auth_api.domain.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserRole {
    ADMIN("admin"),
    RESPONSIBLE("responsible"),
    USER("user");

    private String role;
}
