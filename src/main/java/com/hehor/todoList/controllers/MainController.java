package com.hehor.todoList.controllers;


import com.hehor.todoList.models.JwtRequest;
import com.hehor.todoList.models.JwtResponse;
import com.hehor.todoList.models.Post;
import com.hehor.todoList.models.User;
import com.hehor.todoList.repository.PostRepository;
import com.hehor.todoList.repository.UserRepository;
import com.hehor.todoList.service.UserDetailsServiceImpl;
import com.hehor.todoList.utility.JWTUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class MainController {

    private final PostRepository postRepository;

    private final UserRepository userRepository;

    private final UserDetailsServiceImpl userDetailsService;

    private final AuthenticationManager authenticationManager;

    private final JWTUtility jwtUtility;

    @Autowired
    public MainController(PostRepository postRepository, UserRepository userRepository, UserDetailsServiceImpl userDetailsService, AuthenticationManager authenticationManager, JWTUtility jwtUtility) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.userDetailsService = userDetailsService;
        this.authenticationManager = authenticationManager;
        this.jwtUtility = jwtUtility;
    }

    @RequestMapping("/api/v1/adduser")
    public @ResponseBody String addUser(@RequestBody User user){
        if(userRepository.findByUsername(user.getUsername()) == null){
            userRepository.save(user);
            return "200";
        }else {
            return "Username already used";
        }
    }
    @RequestMapping("/api/v1/login")
    public JwtResponse authenticate(@RequestBody JwtRequest jwtRequest) throws Exception{
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            jwtRequest.getUsername(),
                            jwtRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }

        final UserDetails userDetails
                = userDetailsService.loadUserByUsername(jwtRequest.getUsername());

        final String token =
                jwtUtility.generateToken(userDetails);

        return  new JwtResponse(token);
    }

    @RequestMapping(value = "/api/v1/getlist", method = RequestMethod.GET)
    public List<Post> getListByName(Principal principal) {
       User user = userRepository.findByUsername(principal.getName());
        return user.getPosts();
    }

    @RequestMapping(value = "/api/v1/addpost",method = RequestMethod.POST)
    public @ResponseBody String addPost(@RequestBody Post article,Principal principal){
        LocalDate now = LocalDate.now();
        User user = userRepository.findByUsername(principal.getName());
article.setStartDate(now);
article.setUser_id(user);
        postRepository.save(article);
        return "Success";
    }
    @PostMapping(value = "api/v1/deletepost")
    public @ResponseBody String deletePost(@RequestBody Post post){
        postRepository.deletePostByPost_id(post.getPost_id());
        return "Success";
    }

}
