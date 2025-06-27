import React from 'react';
import { Routes, Route } from 'react-router-dom';
import JobTable from './components/JobTable'
import AddJobForm from './components/AddJobForm';
import '../src/index.css'

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Routes>
        <Route path="/" element={<JobTable />}></Route>
        <Route path="/add" element={<AddJobForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
