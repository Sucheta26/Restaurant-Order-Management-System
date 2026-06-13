import React, { useEffect, useState } from "react";
import MenuService from "../services/MenuService";
import OrderService from "../services/OrderService";

function MenuList({setPage}) {

    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {

        loadAllMenuItems();
        loadCategories();

    }, []);

    const loadAllMenuItems = () => {

        MenuService.getAllMenuItems()
            .then((response) => {

                setMenuItems(response.data);

            })
            .catch((error) => {

                console.error(error);

            });
    };

    const loadCategories = () => {

        MenuService.getAllCategories()
            .then((response) => {

                setCategories(response.data);

            })
            .catch((error) => {

                console.error(error);

            });
    };

    const filterByCategory = (category) => {

        setSelectedCategory(category);

        MenuService.getMenuItemsByCategory(category)
            .then((response) => {

                setMenuItems(response.data);

            })
            .catch((error) => {

                console.error(error);

            });


    };

    const addToCart = (item) => {

        const existingItem = cartItems.find(
            cartItem => cartItem.id === item.id
        );

        if (existingItem) {

            setCartItems(
                cartItems.map(cartItem =>
                    cartItem.id === item.id
                        ? {
                            ...cartItem,
                            quantity: cartItem.quantity + 1
                        }
                        : cartItem
                )
            );

        } else {

            setCartItems([
                ...cartItems,
                {
                    ...item,
                    quantity: 1
                }
            ]);

        }
    };

    const removeFromCart = (id) => {

        setCartItems(
            cartItems.filter(
                item => item.id !== id
            )
        );
    };

    const calculateTotal = () => {

        return cartItems.reduce(
            (total, item) =>
                total + (item.price * item.quantity),
            0
        );
    };

    const placeOrder = () => {

        const user = JSON.parse(
            localStorage.getItem("user")
        );

        const orderRequest = {

            customerId: user.id,

            items: cartItems.map(item => ({
                menuItemId: item.id,
                quantity: item.quantity
            }))
        };

        OrderService.createOrder(orderRequest)

            .then(() => {

                alert(
                    "Order placed successfully!"
                );

                setCartItems([]);

            })

            .catch(error => {

                console.error(error);

                alert(
                    "Unable to place order"
                );
            });
    };

    return (

        <div className="menu-container">

            <h1 className="menu-title">
                🍽️ Rahul's Flavor Junction Menu
            </h1>

            <div className="menu-actions">

                <button
                    className="back-btn"
                    onClick={() => setPage("home")}
                >
                    🏠 Home
                </button>

                <button
                    className="cart-btn"
                    onClick={() => setPage("my-orders")}
                >
                    📦 My Orders
                </button>

                <button
                    className="logout-btn"
                    onClick={() => {

                        localStorage.removeItem("user");

                        setPage("home");
                    }}
                >
                    🚪 Logout
                </button>

            </div>


            <div className="category-section">

                <button
                    className="category-btn"
                    onClick={loadAllMenuItems}
                >
                    All
                </button>

                {
                    categories.map((category, index) => (

                        <button
                            key={index}
                            className={
                                selectedCategory === category
                                    ? "category-btn active"
                                    : "category-btn"
                            }
                            onClick={() =>
                                filterByCategory(category)
                            }
                        >
                            {category}
                        </button>

                    ))
                }

            </div>

            <table className="menu-table">

                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>

                {
                    menuItems.map(item => (

                        <tr key={item.id}>

                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>₹ {item.price}</td>
                            <td>{item.category}</td>

                            <td>

    <span
        className={
            item.available
                ? "available"
                : "unavailable"
        }
    >
        {
            item.available
                ? "Available"
                : "Unavailable"
        }
    </span>

                            </td>

                            <td>

                                <button
                                    className={
                                        item.available
                                            ? "cart-btn"
                                            : "cart-btn-disabled"
                                    }
                                    onClick={() => addToCart(item)}
                                    disabled={!item.available}
                                >
                                    {
                                        item.available
                                            ? "Add To Cart"
                                            : "Unavailable"
                                    }
                                </button>
                            </td>

                        </tr>

                    ))
                }

                </tbody>

            </table>

            <div className="cart-container">

                <h2>
                    🛒 Cart
                </h2>

                {
                    cartItems.length === 0 ?

                        <p>
                            No items added.
                        </p>

                        :

                        <>
                            <table className="menu-table">

                                <thead>

                                <tr>
                                    <th>Name</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Remove</th>
                                </tr>

                                </thead>

                                <tbody>

                                {
                                    cartItems.map(item => (

                                        <tr key={item.id}>

                                            <td>{item.name}</td>

                                            <td>
                                                {item.quantity}
                                            </td>

                                            <td>
                                                ₹ {item.price}
                                            </td>

                                            <td>

                                                <button
                                                    className="remove-btn"
                                                    onClick={() =>
                                                        removeFromCart(
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </button>

                                            </td>

                                        </tr>

                                    ))
                                }

                                </tbody>

                            </table>

                            <h3>
                                Total: ₹ {calculateTotal()}
                            </h3>

                            <button
                                className="place-order-btn"
                                onClick={placeOrder}
                            >
                                Place Order
                            </button>

                        </>
                }

            </div>

        </div>

    );
}

export default MenuList;