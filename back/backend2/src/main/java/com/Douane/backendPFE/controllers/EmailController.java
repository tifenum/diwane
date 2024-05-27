package com.Douane.backendPFE.controllers;

import java.io.IOException;

import com.Douane.backendPFE.models.email.EmailRequest;
import com.Douane.backendPFE.services.emailSER.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private EmailService emailService;


    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest) {
        System.out.println("Email Request Object: " + emailRequest);
        emailService.sendEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getContent());
        return ResponseEntity.ok("Email sent successfully");
    }
}
