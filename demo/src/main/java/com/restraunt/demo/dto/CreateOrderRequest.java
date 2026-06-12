package com.restraunt.demo.dto;

import lombok.Data;
import java.util.List;

@Data
public class CreateOrderRequest {

    private String customerName;
    private List<OrderItemRequest> items;
}
