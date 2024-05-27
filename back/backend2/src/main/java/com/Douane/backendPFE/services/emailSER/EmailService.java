package com.Douane.backendPFE.services.emailSER;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Service

public class EmailService {
    @Value("${sendgrid.api.key}")
    private String sendGridApiKey;

    public void sendEmail(String to, String subject, String content) {
        Email from = new Email("boukadidahbib@gmail.com");
        Email toEmail = new Email(to);
        Content emailContent = new Content("text/html", content); // Set content type to "text/html"
        Mail mail = new Mail(from, subject, toEmail, emailContent);
        SendGrid sg = new SendGrid(sendGridApiKey);
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            Response response = sg.api(request);
            if (response.getStatusCode() == HttpServletResponse.SC_OK) {
                log.info("Email sent successfully to: {}", to);
            } else {
                String responseBody = response.getBody();
                log.warn("Failed to send email. Response status code: {}, Response body: {}", response.getStatusCode(), responseBody);
            }
        } catch (IOException ex) {
            log.error("Failed to send email: {}", ex.getMessage());
        }
    }
}