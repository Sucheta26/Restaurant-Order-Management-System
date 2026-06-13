import React from "react";

function EmployeeDashboard({ setPage }) {

    return (

        <div className="dashboard-container">

            <div className="menu-actions">

                <button
                    className="back-btn"
                    onClick={() =>
                        setPage("home")
                    }
                >
                    🏠 Home
                </button>

            </div>

            <h1 className="dashboard-title">
                👨‍🍳 Employee Dashboard
            </h1>

            <div className="dashboard-cards">

                <div
                    className="dashboard-card"
                    onClick={() =>
                        setPage("employee-orders")
                    }
                >
                    <h2>📋 Manage Orders</h2>

                    <p>
                        View customer orders and update order status
                    </p>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() =>
                        setPage("employee-menu")
                    }
                >
                    <h2>🍔 Manage Menu</h2>

                    <p>
                        Enable or disable menu items
                    </p>
                </div>

            </div>

            <button
                className="logout-btn"
                onClick={() => {

                    localStorage.removeItem(
                        "employee"
                    );

                    setPage("home");
                }}
            >
                🚪 Logout
            </button>

        </div>
    );
}

export default EmployeeDashboard;