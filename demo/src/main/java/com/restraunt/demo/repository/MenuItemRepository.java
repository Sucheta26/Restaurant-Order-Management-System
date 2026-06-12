package com.restraunt.demo.repository;

import com.restraunt.demo.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

    @Query("SELECT DISTINCT m.category FROM MenuItem m")
    List<String> findAllCategories();

    List<MenuItem> findByCategory(String category);
}
