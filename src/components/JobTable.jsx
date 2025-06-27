import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import "../index.css";

export default function JobTable() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [expandedJobId, setExpandedJobId] = useState(null);

  const toggleExpand = (jobId) => {
    setExpandedJobId((prev) => (prev === jobId ? null : jobId));
  };

  // Fetch jobs from Firestore on first render
  useEffect(() => {
    const fetchJobs = async () => {
      const jobCollection = collection(db, "jobs");
      const jobSnapshot = await getDocs(jobCollection);
      const jobList = jobSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobList);
    };

    fetchJobs();
  }, []);

  // Make status editable in the table
  const handleStatusChange = async (jobId, newStatus) => {
    try {
      const jobRef = doc(db, "jobs", jobId);
      await updateDoc(jobRef, { status: newStatus });

      //Update UI state locally for faster feedback
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, status: newStatus } : job
        )
      );
    } catch (error) {
      alert("Unable updating status, try again", error);
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-center sm:text-left w-full">
          Job Application Tracker
        </h1>

        <button
          onClick={() => navigate("/add")}
          className="px-4 py-2 font-bold bg-blue-600 text-white rounded hover:bg-blue-700 whitespace-nowrap flex-shrink-0"
        >
          Add New Job
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border text-left bg-white shadow-sm rounded">
          <thead className="bg-grey-100">
            <tr>
              <th className="p-2">Company</th>
              <th className="p-2">Role/Title</th>
              <th className="p-2">Date Applied </th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <React.Fragment key={job.id}>
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td
                    className="p-2 cursor-pointer text-blue-700 font-semibold hover:underline"
                    onClick={() => toggleExpand(job.id)}
                  >
                    {job.company}
                  </td>
                  <td className="p-2">{job.role}</td>
                  <td className="p-2">{job.date}</td>
                  <td className="p-2">
                    <select
                      value={job.status}
                      onChange={(e) =>
                        handleStatusChange(job.id, e.target.value)
                      }
                      className="border rounded px-2 py-1 bg-white mt-1"
                    >
                      <option value="Applied"> Applied </option>
                      <option value="Interviewing"> Interviewing </option>
                      <option value="Offer "> Offer </option>
                      <option value="Rejected"> Rejected </option>
                    </select>
                  </td>
                </tr>
                {/* Extra Detail Row */}
                {expandedJobId === job.id && (
                  <tr className="border-t bg-gray-50">
                    <td colSpan="4" className="p-4 text-sm text-gray-700">
                      {job.link && (
                        <div className="mb-2">
                          🔗 <strong>Job Link:</strong>{" "}
                          <a
                            href={job.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            {job.link}
                          </a>
                        </div>
                      )}
                      {job.note && (
                        <div>
                          📝 <strong>Note:</strong> {job.note}
                        </div>
                      )}
                      {!job.link && !job.note && (
                        <div className="italic text-gray-400">
                          No additional info.
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
        <div className="flex flex-wrap gap-4">
          <div className="p-4 bg-gray-200 rounded">Total : 3</div>
          <div className="p-4 bg-gray-200 rounded">Interviewing : 1</div>
          <div className="p-4 bg-gray-200 rounded">Offered : 1</div>
          <div className="p-4 bg-gray-200 rounded">Rejected : 1</div>
        </div>
      </div>
    </div>
  );
}
