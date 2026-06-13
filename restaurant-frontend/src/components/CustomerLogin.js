import React, { useState } from "react";
import axios from "axios";

function CustomerLogin({ setPage }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {

        try {

            const response =
                await axios.post(
                    "http://localhost:8080/api/auth/customer/login",
                    {
                        email,
                        password
                    }
                );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );

            setPage("menu");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );
        }
    };

    return (

        <div className="auth-container">

            <h2>Customer Login</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button onClick={login}>
                Login
            </button>

            <button
                className="back-btn"
                onClick={() => setPage("home")}
            >
                ← Back
            </button>

            <p>
                New customer?

                <span
                    className="link-btn"
                    onClick={() =>
                        setPage("customer-signup")
                    }
                >
        Signup Here
    </span>
            </p>

        </div>
    );
}

export default CustomerLogin;