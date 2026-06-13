import React, { useState } from "react";
import axios from "axios";

function CustomerSignup({ setPage }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signup = async () => {

        try {

            await axios.post(
                "http://localhost:8080/api/auth/customer/signup",
                {
                    name,
                    email,
                    password
                }
            );

            alert("Signup Successful");

            setPage("customer-login");

        } catch(error) {

            alert(
                error.response?.data?.message ||
                "Signup Failed"
            );
        }
    };

    return (

        <div className="auth-container">

            <button
                className="back-btn"
                onClick={() => setPage("home")}
            >
                ← Back
            </button>

            <h2>Customer Signup</h2>

            <input
                placeholder="Name"
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

            <input
                placeholder="Email"
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button onClick={signup}>
                Signup
            </button>

            <p>
                Already have an account?

                <span
                    className="link-btn"
                    onClick={() =>
                        setPage("customer-login")
                    }
                >
        Login Here
    </span>
            </p>

        </div>
    );
}

export default CustomerSignup;