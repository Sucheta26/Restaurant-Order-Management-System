import React, { useEffect, useState } from "react";
import OrderService from "../services/OrderService";

function MyOrders({ setPage }) {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const user = JSON.parse(
            localStorage.getItem("user")
        );

        if (user) {
            loadOrders(user.id);
        }

    }, []);

    const loadOrders = (customerId) => {

        OrderService.getCustomerOrders(customerId)

            .then((response) => {

                setOrders(response.data);

            })

            .catch((error) => {

                console.error(error);

            });
    };

    return (

        <div className="menu-container">

            <h1 className="menu-title">
                📦 My Orders
            </h1>

            <div className="menu-actions">

                <button
                    className="back-btn"
                    onClick={() => setPage("menu")}
                >
                    🍽️ Menu
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
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>

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
                                                order.orderItems.map(item => (

                                                    <div key={item.id}>

                                                        {
                                                            item.menuItem?.name
                                                        }

                                                        {" x "}

                                                        {
                                                            item.quantity
                                                        }

                                                    </div>

                                                ))
                                            }

                                        </td>

                                        <td>
                                            ₹ {order.totalAmount}
                                        </td>

                                        <td>

                                            <span
                                                className="status-badge"
                                            >
                                                {order.status}
                                            </span>

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

export default MyOrders;