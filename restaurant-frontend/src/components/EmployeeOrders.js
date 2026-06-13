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

                alert("Unable to update order status");
            });
    };

    const logout = () => {

        localStorage.removeItem("employee");

        setPage("home");
    };

    return (

        <div className="menu-container">

            <h1 className="menu-title">
                👨‍🍳 Employee Order Management
            </h1>

            <div className="menu-actions">

                <button
                    className="back-btn"
                    onClick={() => setPage("home")}
                >
                    🏠 Home
                </button>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    🚪 Logout
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
                                <th>Status</th>
                                <th>Items</th>
                                <th>Actions</th>
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
                                            {order.status}
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

                                                            {" "}
                                                            x
                                                            {" "}
                                                            {item.quantity}

                                                        </div>

                                                    ))

                                                    :

                                                    "No Items"

                                            }

                                        </td>

                                        <td>

                                            <button
                                                className="status-btn"
                                                onClick={() =>
                                                    updateStatus(
                                                        order.id,
                                                        "PREPARING"
                                                    )
                                                }
                                            >
                                                PREPARING
                                            </button>

                                            <button
                                                className="status-btn"
                                                onClick={() =>
                                                    updateStatus(
                                                        order.id,
                                                        "READY"
                                                    )
                                                }
                                            >
                                                READY
                                            </button>

                                            <button
                                                className="status-btn"
                                                onClick={() =>
                                                    updateStatus(
                                                        order.id,
                                                        "DELIVERED"
                                                    )
                                                }
                                            >
                                                DELIVERED
                                            </button>

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