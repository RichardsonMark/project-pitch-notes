package com.example.codeclan.pitchnotes.repositories;

import com.example.codeclan.pitchnotes.models.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByAuthorNameIgnoreCase(String name);
    List<Article> findByDateIgnoreCase(String date);
    List<Article> findByCategoryLeagueIgnoreCase(String categoryLeague);
    List<Article> findByCategoryLeagueIgnoreCaseAndDate(String categoryLeague, String date);
    List<Article> findByOrderByDateDesc();



}
