package com.restraunt.demo.controller;

import com.restraunt.demo.entity.MenuItem;
import com.restraunt.demo.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class MenuController {

    private final MenuService menuService;

    @GetMapping
    public List<MenuItem> getAllMenuItems(){

        return menuService.getAllMenuItems();
    }

    @GetMapping("/{id}")
    public MenuItem getMenuItemById(@PathVariable Long id){

        return menuService.getMenuItemsById(id);
    }

    @GetMapping("/all-categories")
    public List<String> getAllCategories(){

        return menuService.getAllCategories();
    }

    @GetMapping("/category/{category}")
    public List<MenuItem> getMenuItemsByCategory(@PathVariable String category){
        return menuService.getMenuItemsByCategory(category);
    }

    @PutMapping("/{id}/availability")
    public MenuItem updateAvailability(@PathVariable Long id, @RequestParam Boolean available){
        return menuService.updateAvailability(id, available);
    }
}
