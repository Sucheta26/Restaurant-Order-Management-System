package com.restraunt.demo.serviceImpl;

import com.restraunt.demo.dto.OrderItemRequest;
import com.restraunt.demo.dto.OrderRequestDto;
import com.restraunt.demo.entity.MenuItem;
import com.restraunt.demo.entity.Order;
import com.restraunt.demo.entity.OrderItem;
import com.restraunt.demo.entity.User;
import com.restraunt.demo.enums.OrderStatus;
import com.restraunt.demo.exception.ResourceNotFoundException;
import com.restraunt.demo.repository.MenuItemRepository;
import com.restraunt.demo.repository.OrderRepository;
import com.restraunt.demo.repository.UserRepository;
import com.restraunt.demo.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final MenuItemRepository menuItemRepository;
    private final UserRepository userRepository;

    /*@Override
    public Order createOrder(OrderRequestDto orderRequestDto){
        MenuItem menuItem = menuItemRepository.findById(orderRequestDto.getMenuItemId()).orElseThrow(()->
                new ResourceNotFoundException("Menu item not found"));

        if(!menuItem.getAvailable()){
            throw new RuntimeException("Menu item is unavailable");
        }

        BigDecimal totalAmount = menuItem.getPrice()
                .multiply(BigDecimal.valueOf(orderRequestDto.getQuantity()));

        Order order = Order.builder().customerName(orderRequestDto.getCustomerName())
                .menuItem(menuItem)
                .totalAmount(totalAmount)
                .status(OrderStatus.ORDERED)
                .createdAt(LocalDateTime.now())
                .build();

        return orderRepository.save(order);
    }*/

    @Override
    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(Long id){
        return orderRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Order not found"));
    }

    @Override
    public Order createOrder(OrderRequestDto requestDto){

        Order order = new Order();

        List<OrderItem> orderItems = new ArrayList<>();

        User customer =
                userRepository
                        .findById(
                                requestDto.getCustomerId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Customer not found"));
        order.setCustomer(customer);

        BigDecimal grandTotal = BigDecimal.ZERO;

        for(OrderItemRequest orderItemRequest: requestDto.getItems()){
            MenuItem menuItem = menuItemRepository.findById(orderItemRequest.getMenuItemId())
                    .orElseThrow(()->new ResourceNotFoundException("Menu item not found with id: "+orderItemRequest.getMenuItemId()));

            if(!menuItem.getAvailable()){
                throw new RuntimeException(menuItem.getName()+" is currently unabailable");
            }

            BigDecimal itemTotal = menuItem.getPrice()
                    .multiply(BigDecimal.valueOf(orderItemRequest.getQuantity()));

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .menuItem(menuItem)
                    .quantity(orderItemRequest.getQuantity())
                    .itemTotal(itemTotal)
                    .build();

            orderItems.add(orderItem);

            grandTotal = grandTotal.add(itemTotal);
        }

        order.setOrderItems(orderItems);
        order.setTotalAmount(grandTotal);
        order.setStatus(OrderStatus.PLACED);
        order.setCreatedAt(LocalDateTime.now());
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getOrdersByCustomerId(Long customerId) {

        return orderRepository.findByCustomerId(customerId);
    }

    @Override
    public Order updateOrderStatus(
            Long orderId,
            OrderStatus status) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id: " + orderId));

        order.setStatus(status);

        return orderRepository.save(order);
    }
}
