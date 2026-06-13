package com.restraunt.demo.service;

import com.restraunt.demo.entity.MenuItem;
import java.util.List;

public interface MenuService {

    List<MenuItem> getAllMenuItems();
    MenuItem getMenuItemsById(Long id);
    List<String> getAllCategories();
    List<MenuItem> getMenuItemsByCategory(String category);
    MenuItem updateAvailability(Long id, Boolean available);
}
