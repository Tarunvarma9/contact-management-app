import React from 'react'
import {
    AppBar,
    AppBarSection,
    AppBarSpacer,
    Avatar,
} from "@progress/kendo-react-layout";

function Navbar() {
    return (
        <>
            <AppBar style={{ background: "#288cab" }}>

                <h1 className="title" style={{ fontSize: "small", textAlign: "center" }}>Contact Management App</h1>

            </AppBar>
        </>
    )
}

export default Navbar