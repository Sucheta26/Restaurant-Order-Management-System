import React, { useEffect, useState } from "react";
import MenuService from "../services/MenuService";

function EmployeeMenu({ setPage }) {

    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {

        loadMenuItems();

    }, []);

    const loadMenuItems = () => {

        MenuService.getAllMenuItems()

            .then((response) => {

                setMenuItems(response.data);

            })

            .catch((error) => {

                console.error(error);

            });
    };

    const toggleAvailability = (item) => {

        MenuService.updateAvailability(
            item.id,
            !item.available
        )

            .then(() => {

                loadMenuItems();

            })

            .catch((error) => {

                console.error(error);

            });
    };

    return (

        <div className="menu-container">

            <h1 className="menu-title">
                🍔 Menu Management
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

            <table className="menu-table">

                <thead>

                <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
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

                            <td>₹ {item.price}</td>

                            <td>

                                {
                                    item.available
                                        ? "Available"
                                        : "Unavailable"
                                }

                            </td>

                            <td>

                                <button
                                    className={
                                        item.available
                                            ? "disable-btn"
                                            : "enable-btn"
                                    }
                                    onClick={() =>
                                        toggleAvailability(item)
                                    }
                                >
                                    {
                                        item.available
                                            ? "Mark Unavailable"
                                            : "Mark Available"
                                    }
                                </button>

                            </td>

                        </tr>

                    ))
                }

                </tbody>

            </table>

        </div>

    );
}

export default EmployeeMenu;