package com.restraunt.demo.controller;

import com.restraunt.demo.dto.OrderRequestDto;
import com.restraunt.demo.entity.Order;
import com.restraunt.demo.enums.OrderStatus;
import com.restraunt.demo.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/all-orders")
    public List<Order> getAllOrders(){
        return orderService.getAllOrders();
    }

   @PostMapping("/save")
    public Order createOrder(@RequestBody OrderRequestDto requestDto){return orderService.createOrder(requestDto);}

    @GetMapping("/id/{id}")
    public Order getOrderById(@PathVariable Long id){
        return orderService.getOrderById(id);
    }

    @GetMapping("/customer/{customerId}")
    public List<Order> getCustomerOrders(@PathVariable Long customerId){return orderService.getOrdersByCustomerId(customerId);}

    @PutMapping("/{orderId}/status")
    public Order updateOrderStatus(@PathVariable Long orderId, @RequestParam OrderStatus status) {
        return orderService.updateOrderStatus(orderId, status);
    }
}
