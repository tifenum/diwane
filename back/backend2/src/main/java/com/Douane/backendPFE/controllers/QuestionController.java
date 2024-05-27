package com.Douane.backendPFE.controllers;

import com.Douane.backendPFE.models.Question;
import com.Douane.backendPFE.repositories.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {
    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionRepository.findAll();
        return ResponseEntity.ok(questions);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Question createQuestion(@RequestBody Question question, Principal principal) {
        System.out.println("Creating question by: " + principal.getName()); // Logging the user who is creating the question
        return questionRepository.save(question);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Question updateQuestion(@PathVariable Long id, @RequestBody Question questionDetails, Principal principal) {
        System.out.println("Updating question by: " + principal.getName()); // Logging the user who is updating the question
        Question existingQuestion = questionRepository.findById(id).orElseThrow(() -> new RuntimeException("Question not found with id " + id));
        existingQuestion.setText(questionDetails.getText());
        existingQuestion.setAnswer(questionDetails.getAnswer());
        return questionRepository.save(existingQuestion);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id, Principal principal) {
        System.out.println("Deleting question by: " + principal.getName()); // Logging the user who is deleting the question
        Question question = questionRepository.findById(id).orElseThrow(() -> new RuntimeException("Question not found with id " + id));
        questionRepository.delete(question);
        return ResponseEntity.ok().build();
    }
}
