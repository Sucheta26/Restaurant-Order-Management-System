package com.restraunt.demo.service;

import com.restraunt.demo.dto.OrderRequestDto;
import com.restraunt.demo.entity.Order;

import java.util.List;

public interface OrderService {

    Order createOrder(OrderRequestDto orderRequestDto);
    List<Order> getAllOrders();
    Order getOrderById(Long id);
}
