    package com.restraunt.demo.entity;


    import com.fasterxml.jackson.annotation.JsonManagedReference;
    import com.restraunt.demo.enums.OrderStatus;
    import jakarta.persistence.*;
    import lombok.*;

    import java.math.BigDecimal;
    import java.time.LocalDateTime;
    import java.util.List;

    @Entity
    @Table(name = "orders")
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public class Order {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "customer_id")
        private User customer;

        private BigDecimal totalAmount;

        @Enumerated(EnumType.STRING)
        private OrderStatus status;

        private LocalDateTime createdAt;

        @OneToMany(
                mappedBy = "order",
                cascade = CascadeType.ALL
        )
        @JsonManagedReference
        private List<OrderItem> orderItems;
    }
