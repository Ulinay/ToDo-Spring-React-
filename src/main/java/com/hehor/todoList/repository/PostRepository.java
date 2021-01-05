package com.hehor.todoList.repository;

import com.hehor.todoList.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Post WHERE post_id = ?1")
   void deletePostByPost_id(Long id);

}
