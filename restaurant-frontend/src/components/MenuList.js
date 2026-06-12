import React, { useEffect, useState } from "react";
import MenuService from "../services/MenuService";

function MenuList() {

    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {

        MenuService.getAllMenuItems()
            .then((response) => {
                setMenuItems(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    return (
        <div className="menu-container">

            <h1 className="menu-title">
                🍽️ The Rahul Bistro Menu
            </h1>

            <table className="menu-table">

                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price (₹)</th>
                    <th>Category</th>
                    <th>Status</th>
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

                        </tr>

                    ))
                }
                </tbody>

            </table>

        </div>
    );
}

export default MenuList;