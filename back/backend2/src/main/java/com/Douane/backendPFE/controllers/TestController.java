package com.Douane.backendPFE.controllers;

import com.Douane.backendPFE.models.user.UserModel;
import com.Douane.backendPFE.services.autorisationS.DemandeService;
import com.Douane.backendPFE.services.userS.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test/")
public class TestController {
    @Autowired
    private UserService userService;
@Autowired
private DemandeService demandeService;
    @GetMapping("{id}")
    public ResponseEntity<?> returnUserById(@PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok().body(userService.findUserDtoById(id));
    }

    @GetMapping("dems")
    public ResponseEntity<?> allDemandeByUserVerifier(Principal principal){
        try {
            UserModel user=userService.findByEmail(principal.getName());
            return new ResponseEntity<>(demandeService.getAllByVerifyUser(user.getId()), HttpStatus.OK);
        }catch (RuntimeException e) {
            String errorMessage = e.getMessage();
            Map<String, Object> response = new HashMap<>();
            response.put("error", errorMessage);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

        }
    }
}
