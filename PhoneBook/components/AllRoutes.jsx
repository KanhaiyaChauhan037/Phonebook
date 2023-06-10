import React from 'react'
import Phonebook from "./Phonebook";
import { Route, Routes } from "react-router-dom";
import AllBookmarks from "./AllBookmarks";
import Navbar from './Navbar';
const AllRoutes = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Phonebook />} />
        <Route path="/bookmark" element={<AllBookmarks />} />
      </Routes>
    </div>
  );
}

export default AllRoutes