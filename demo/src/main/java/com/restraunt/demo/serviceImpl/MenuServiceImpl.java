package com.restraunt.demo.serviceImpl;

import com.restraunt.demo.entity.MenuItem;
import com.restraunt.demo.exception.ResourceNotFoundException;
import com.restraunt.demo.repository.MenuItemRepository;
import com.restraunt.demo.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {

    private final MenuItemRepository menuItemRepository;

    @Override
    public List<MenuItem> getAllMenuItems(){

        return menuItemRepository.findAll();
    }

    @Override
    public MenuItem getMenuItemsById(Long id){

        return menuItemRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("Menu item not found with id: "+id));
    }

    @Override
    public List<String> getAllCategories(){
        return menuItemRepository.findAllCategories();
    }

    @Override
    public List<MenuItem> getMenuItemsByCategory(String category){
        return menuItemRepository.findByCategory(category);
    }
}
