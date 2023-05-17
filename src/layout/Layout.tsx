import React from 'react';
import Navbar from './Navbar';
import Sidebar from './sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactList from '../components/contacts/ContactList';
import Charts from '../components/charts/Charts';

const Layout: any = ({ children }: any) => {
    return (
        <>
            <Router>
                <Navbar />
                <div style={{ maxWidth: "100%", display: "flex" }}>
                    <Sidebar />
                    <Routes>
                        <Route path='/contacts' element={<ContactList />} />
                        <Route path='/charts' element={<Charts />} />
                    </Routes>
                </div>


            </Router>
        </>
    );
};

export default Layout;
