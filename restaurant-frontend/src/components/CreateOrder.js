import React, { useState, useEffect } from "react";
import axios from "axios";
import { createOrder } from "../services/OrderService";

function CreateOrder() {

    const [customerName, setCustomerName] = useState("");
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:8080/api/menu"
                );

            setMenuItems(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    const addItem = () => {

        setSelectedItems([
            ...selectedItems,
            {
                menuItemId: "",
                quantity: 1
            }
        ]);
    };

    const handleItemChange = (
        index,
        field,
        value
    ) => {

        const updatedItems = [...selectedItems];

        updatedItems[index][field] = value;

        setSelectedItems(updatedItems);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const payload = {
            customerName: customerName,
            items: selectedItems
        };

        try {

            await createOrder(payload);

            alert("Order placed successfully!");

            setCustomerName("");
            setSelectedItems([]);

        } catch (error) {

            console.error(error);

            alert("Failed to place order");
        }
    };

    return (
        <div className="order-form-container">

            <h2>Create Order</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Customer Name</label>

                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) =>
                            setCustomerName(
                                e.target.value
                            )
                        }
                        required
                    />
                </div>

                <br />

                <button
                    type="button"
                    onClick={addItem}
                >
                    Add Menu Item
                </button>

                <br />
                <br />

                {selectedItems.map(
                    (item, index) => (

                        <div
                            key={index}
                            style={{
                                border: "1px solid #ddd",
                                padding: "10px",
                                marginBottom: "10px"
                            }}
                        >

                            <select
                                value={item.menuItemId}
                                onChange={(e) =>
                                    handleItemChange(
                                        index,
                                        "menuItemId",
                                        Number(e.target.value)
                                    )
                                }
                                required
                            >

                                <option value="">
                                    Select Menu Item
                                </option>

                                {menuItems.map(
                                    (menu) => (
                                        <option
                                            key={menu.id}
                                            value={menu.id}
                                        >
                                            {menu.name}
                                            {" - ₹"}
                                            {menu.price}
                                        </option>
                                    ))}
                            </select>

                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                    handleItemChange(
                                        index,
                                        "quantity",
                                        Number(
                                            e.target.value
                                        )
                                    )
                                }
                            />

                        </div>
                    ))}

                <button type="submit">
                    Place Order
                </button>

            </form>
        </div>
    );
}

export default CreateOrder;