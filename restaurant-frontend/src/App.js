import { useState } from "react";
import MenuList from "./components/MenuList";
import "./App.css";

function App() {

    const [showMenu, setShowMenu] = useState(false);

    return (
        <div>

            {!showMenu ? (

                <div className="home-container">

                    <h1 className="restaurant-title">
                        🍽️ The Rahul Bistro 🍽️
                    </h1>

                    <h2 className="restaurant-subtitle">
                        Fresh Food • Fast Service • Great Taste
                    </h2>

                    <button
                        className="menu-button"
                        onClick={() => setShowMenu(true)}
                    >
                        View Menu
                    </button>

                </div>

            ) : (

                <>
                    <button
                        className="back-button"
                        onClick={() => setShowMenu(false)}
                    >
                        ← Back
                    </button>

                    <MenuList />
                </>

            )}

        </div>
    );
}

export default App;