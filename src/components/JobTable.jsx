import React from "react";
import "../index.css";

const jobData = [
  {
    company: "Adobe",
    role: "UX Resercher",
    status: "Applied",
    date: "11-4-2024",
    // don't store buttons as data — actions should be real functions later
  },
  {
    company: "Herman-Nolan",
    role: "Web Developer IV",
    status: "2nd Interview",
    date: "5-10-2025",
    // don't store buttons as data — actions should be real functions later
  },
  {
    company: "McGlynn-Rau",
    role: "Environmental Specialist",
    status: "Applied",
    date: "24/06/2025",
    // don't store buttons as data — actions should be real functions later
  },
];

export default function JobTable() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Job Application Tracker</h1>

      <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Add New Job
      </button>

      <table className="w-full border text-left bg-white shadow-sm rounded">
        <thead className="bg-grey-100">
          <tr>
            <th className="p-2">Company</th>
            <th className="p-2">Role</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {jobData.map((job, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="p-2">{job.company}</td>
              <td className="p-2">{job.role}</td>
              <td className="p-2">{job.status}</td>
              <td className="p-2">{job.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
        <div className="flex gap-4">
          <div className="p-4 bg-gray-200 rounded">Total : 3</div>
          <div className="p-4 bg-gray-200 rounded">Interviewing : 1</div>
          <div className="p-4 bg-gray-200 rounded">Offered : 1</div>
          <div className="p-4 bg-gray-200 rounded">Rejected : 1</div>
        </div>
      </div>
    </div>
  );
}
