package com.intellihire.backend.controller;

import com.intellihire.backend.dto.AuthResponse;
import com.intellihire.backend.dto.LoginRequest;
import com.intellihire.backend.dto.SignupRequest;
import com.intellihire.backend.service.JwtService;
import com.intellihire.backend.service.UserService;
import com.intellihire.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
                )
            );

            String token = jwtService.generateToken(loginRequest.getEmail());
            
            Optional<User> user = userService.findByEmail(loginRequest.getEmail());
            String role = user.map(User::getRole).orElse("USER");

            return ResponseEntity.ok(new AuthResponse(token, role));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest signupRequest) {
        try {
            if (userService.findByEmail(signupRequest.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().build();
            }

            User user = User.builder()
                .name(signupRequest.getName())
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .role("USER")
                .build();

            userService.createUser(user);

            String token = jwtService.generateToken(signupRequest.getEmail());

            return ResponseEntity.ok(new AuthResponse(token, "USER"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
