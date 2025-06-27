import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import JobTable from './components/JobTable';
import AddJobForm from './components/AddJobForm';
import '../src/index.css';

function App() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Routes>
        <Route path="/" element={<JobTable />} />
        <Route
          path="/add"
          element={
            <AddJobForm
              onSubmit={() => {
                console.log("New job submitted — navigating back home");
                navigate("/");
              }}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
