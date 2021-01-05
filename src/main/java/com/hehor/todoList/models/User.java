package com.hehor.todoList.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Data
@Entity
@RequiredArgsConstructor
public class User{
@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

@Column(unique = true,nullable = false)
private String username;

private String password;

@JsonIgnore
@OneToMany(mappedBy = "user_id", fetch = FetchType.EAGER,cascade = CascadeType.ALL)
private List<Post> posts;



}
