import React from "react";
import { Link } from "@reach/router";

const AppHeader = () => {
    return (
        <nav>
            <div className="nav-wrapper teal">
                <ul id="nav-mobile" className="left">
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/courses"}>Liste de courses</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
export default AppHeader;
