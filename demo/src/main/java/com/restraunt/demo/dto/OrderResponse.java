package com.restraunt.demo.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderResponse {

    private Long orderId;

    private String customerName;

    private BigDecimal totalAmount;

    private String status;
}
