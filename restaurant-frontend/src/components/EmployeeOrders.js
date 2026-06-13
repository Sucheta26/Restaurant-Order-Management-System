import React, { useEffect, useState } from "react";
import OrderService from "../services/OrderService";

function EmployeeOrders({ setPage }) {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () => {

        OrderService.getAllOrders()
            .then((response) => {

                console.log("Orders Response:", response.data);

                if (Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    setOrders([]);
                }

            })
            .catch((error) => {

                console.error(error);
                setOrders([]);

            });
    };

    const updateStatus = (orderId, status) => {

        OrderService.updateOrderStatus(orderId, status)
            .then(() => {

                alert("Status updated successfully");

                loadOrders();

            })
            .catch((error) => {

                console.error(error);

                if (error.response?.data?.message) {
                    alert(error.response.data.message);
                } else {
                    alert("Unable to update order status");
                }
            });
    };

    const getNextStatus = (currentStatus) => {

        switch (currentStatus) {

            case "PLACED":
                return "PREPARING";

            case "PREPARING":
                return "READY";

            case "READY":
                return "DELIVERED";

            default:
                return null;
        }
    };

    return (

        <div className="menu-container">

            <h1 className="menu-title">
                👨‍🍳 Employee Order Management
            </h1>

            <div className="menu-actions">

                <button
                    className="back-btn"
                    onClick={() =>
                        setPage("employee-dashboard")
                    }
                >
                    ⬅ Dashboard
                </button>

            </div>

            {
                orders.length === 0 ?

                    (
                        <h3>No Orders Found</h3>
                    )

                    :

                    (

                        <table className="menu-table">

                            <thead>

                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Current Status</th>
                                <th>Items</th>
                                <th>Action</th>
                            </tr>

                            </thead>

                            <tbody>

                            {
                                orders.map(order => (

                                    <tr key={order.id}>

                                        <td>
                                            {order.id}
                                        </td>

                                        <td>
                                            {
                                                order.customer?.name ||
                                                "Unknown Customer"
                                            }
                                        </td>

                                        <td>
                                            ₹ {order.totalAmount}
                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    order.status === "DELIVERED"
                                                        ? "delivered-badge"
                                                        : ""
                                                }
                                            >
                                                {order.status}
                                            </span>

                                        </td>

                                        <td>

                                            {
                                                order.orderItems &&
                                                order.orderItems.length > 0 ?

                                                    order.orderItems.map(item => (

                                                        <div key={item.id}>

                                                            {
                                                                item.menuItem?.name ||
                                                                "Menu Item"
                                                            }

                                                            {" x "}
                                                            {item.quantity}

                                                        </div>

                                                    ))

                                                    :

                                                    "No Items"

                                            }

                                        </td>

                                        <td>

                                            {
                                                order.status === "DELIVERED" ?

                                                    (
                                                        <span
                                                            className="delivered-badge"
                                                        >
                                                            ✅ Completed
                                                        </span>
                                                    )

                                                    :

                                                    (
                                                        <button
                                                            className="status-btn"
                                                            onClick={() =>
                                                                updateStatus(
                                                                    order.id,
                                                                    getNextStatus(
                                                                        order.status
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            Move To {" "}
                                                            {
                                                                getNextStatus(
                                                                    order.status
                                                                )
                                                            }
                                                        </button>
                                                    )
                                            }

                                        </td>

                                    </tr>

                                ))
                            }

                            </tbody>

                        </table>

                    )
            }

        </div>

    );
}

export default EmployeeOrders;