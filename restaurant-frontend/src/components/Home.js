import React from "react";

function Home({ setPage }) {

    const user =
        JSON.parse(localStorage.getItem("user"));

    const employee =
        JSON.parse(localStorage.getItem("employee"));

    return (

        <div className="hero-section">

            <h1 className="restaurant-title">
                🍽 The Rahul Bistro 🍽
            </h1>

            <p className="restaurant-subtitle">
                Where Every Bite Feels Royal
            </p>

            <div className="home-button-container">

                {!user && !employee && (
                    <>
                        <button
                            className="home-btn"
                            onClick={() =>
                                setPage("customer-signup")
                            }
                        >
                            Customer Signup
                        </button>

                        <button
                            className="home-btn"
                            onClick={() =>
                                setPage("customer-login")
                            }
                        >
                            Customer Login
                        </button>

                        <button
                            className="home-btn"
                            onClick={() =>
                                setPage("employee-signup")
                            }
                        >
                            Employee Signup
                        </button>

                        <button
                            className="home-btn"
                            onClick={() =>
                                setPage("employee-login")
                            }
                        >
                            Employee Login
                        </button>
                    </>
                )}

                {user && (
                    <button
                        className="home-btn"
                        onClick={() => setPage("menu")}
                    >
                        Go To Menu
                    </button>
                )}

                {employee && (
                    <button
                        className="portal-btn"
                        onClick={() => {
                            const employee = localStorage.getItem("employee");

                            if(employee){
                                setPage("employee-dashboard");
                            } else {
                                setPage("employee-login");
                            }
                        }}
                    >
                        👨‍🍳 Employee Portal
                    </button>
                )}

            </div>

        </div>
    );
}

export default Home;