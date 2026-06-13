import React, { useState } from "react";
import Home from "./components/Home";
import CustomerLogin from "./components/CustomerLogin";
import EmployeeLogin from "./components/EmployeeLogin";
import CustomerSignup from "./components/CustomerSignup";
import EmployeeSignup from "./components/EmployeeSignup";
import MenuList from "./components/MenuList";
import EmployeeOrders from "./components/EmployeeOrders";
import "./App.css";

function App() {

    const [page, setPage] = useState(() => {

        const user = localStorage.getItem("user");
        const employee = localStorage.getItem("employee");

        if (user) {
            return "menu";
        }

        if (employee) {
            return "employee-portal";
        }

        return "home";
    });

    return (

        <div>

            {page === "home" &&
                <Home setPage={setPage} />
            }

            {page === "customer-login" &&
                <CustomerLogin setPage={setPage} />
            }

            {page === "employee-login" &&
                <EmployeeLogin setPage={setPage} />
            }

            {page === "customer-signup" &&
                <CustomerSignup setPage={setPage} />
            }

            {page === "employee-signup" &&
                <EmployeeSignup setPage={setPage} />
            }

            {page === "menu" &&
                <MenuList setPage={setPage} />
            }

            {page === "employee-portal" &&
                <EmployeeOrders setPage={setPage} />
            }

        </div>

    );
}

export default App;