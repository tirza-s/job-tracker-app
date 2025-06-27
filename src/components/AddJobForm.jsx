import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AddJobForm({ onSubmit }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [date, setDate] = useState(() => {
    const todayDate = new Date().toISOString().split("T")[0];
    return todayDate;
  });
  const [link, setLink] = useState("");
  const [note, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newJob = {
      company,
      role,
      status,
      date,
      link,
      note,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "jobs"), newJob);
      console.log("New job added for firestone:", newJob);
      if (onSubmit) {
        onSubmit(newJob);
      }
    } catch (error) {
      console.log("Error adding a job to firestore!", error);
    }

    // reset form
    setCompany("");
    setRole("");
    setStatus("");
    setDate("");
    setLink("");
    setNotes("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md max-w-xl mx-auto"
    >
      <h2 className="text-xl text-center font-bold md-4 mb-6">
        {" "}
        Add New Application
      </h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Company Name</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Role/Title</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option>Applied</option>
          <option>Interviewing</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Date Applied</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Link (optional)</label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="https://jobsin.brussels/"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Notes (optional) </label>
        <textarea
          value={note}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          rows={3}
          placeholder="e.g: Follow up on 7/7, email/call the recruiter, etc "
        ></textarea>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
