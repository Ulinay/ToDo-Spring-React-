package com.hehor.todoList.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@RequiredArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long post_id;

private String article;

private LocalDate startDate;

private boolean complete = false;
@JsonIgnore
@ManyToOne
    @JoinColumn(name = "user_id")
    private User user_id;


public Post(String article, LocalDate startDate, User user){
    this.article = article;
    this.startDate = startDate;
    this.user_id = user;
}
}

