import React from "react";
import MyGrid from "./MyGrid";
import Footer from './Footer';
import Logo from "./Logo";

export default function MyApp() {
return <div>
            <Logo />
            <div className = "title">
                <h2 style = {{color : "white"}}>Invoice List</h2>
            </div>
            <MyGrid />
            <div className = "footer">
            <Footer />
            </div> 
        </div>
}