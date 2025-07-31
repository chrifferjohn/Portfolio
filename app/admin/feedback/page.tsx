"use client"

import { useEffect, useState } from "react";

interface Feedback {
  name: string;
  message: string;
  date: string;
}

const FeedbackAdminPage = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", message: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState("");
  const [formError, setFormError] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch("/api/feedback");
      const data = await res.json();
      setFeedbacks(data.feedbacks || []);
    } catch (err) {
      setError("Failed to load feedback.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormSuccess("");
    setFormError("");
    try {
      let res, data;
      if (editIndex !== null) {
        res = await fetch("/api/feedback", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, index: editIndex }),
        });
        data = await res.json();
      } else {
        res = await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        data = await res.json();
      }
      if (res.ok && data.success) {
        setFormSuccess(editIndex !== null ? "Feedback updated!" : "Thank you for your feedback!");
        setForm({ name: "", message: "" });
        setEditIndex(null);
        fetchFeedbacks();
      } else {
        setFormError(data.error || "Failed to send feedback.");
      }
    } catch (err) {
      setFormError("Failed to send feedback.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (idx: number) => {
    setForm({ name: feedbacks[idx].name, message: feedbacks[idx].message });
    setEditIndex(idx);
    setFormSuccess("");
    setFormError("");
  };

  const handleDelete = async (idx: number) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      const res = await fetch("/api/feedback", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index: idx }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        fetchFeedbacks();
      } else {
        alert(data.error || "Failed to delete feedback.");
      }
    } catch {
      alert("Failed to delete feedback.");
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setForm({ name: "", message: "" });
    setFormSuccess("");
    setFormError("");
  };

  return (
    <section className="min-h-screen py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gradient">Visitor Feedback</h1>
        <div className="flex flex-col md:flex-row gap-12 max-w-5xl mx-auto">
          {/* Feedback List */}
          <div className="md:w-1/2 w-full space-y-6">
            <h2 className="text-2xl font-semibold mb-4">All Feedback</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {feedbacks.length === 0 && !loading && <p className="text-gray-500">No feedback yet.</p>}
            {feedbacks.map((fb, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-purple-600">{fb.name}</span>
                  <span className="text-xs text-gray-400">{new Date(fb.date).toLocaleString()}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line mb-2">{fb.message}</p>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    onClick={() => handleEdit(idx)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    onClick={() => handleDelete(idx)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Feedback Form */}
          <div className="md:w-1/2 w-full bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4">{editIndex !== null ? 'Edit Feedback' : 'Send Feedback'}</h2>
            {formSuccess && <div className="text-green-600 font-semibold mb-4">{formSuccess}</div>}
            {formError && <div className="text-red-600 font-semibold mb-4">{formError}</div>}
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-800 dark:text-gray-200"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Feedback</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleFormChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 resize-none bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-800 dark:text-gray-200"
                  placeholder="Your feedback..."
                ></textarea>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-8 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-60"
                  disabled={formLoading}
                >
                  {formLoading ? (editIndex !== null ? 'Updating...' : 'Sending...') : (editIndex !== null ? 'Update Feedback' : 'Send Feedback')}
                </button>
                {editIndex !== null && (
                  <button
                    type="button"
                    className="bg-gray-400 text-white py-3 px-8 rounded-xl font-semibold hover:bg-gray-500 transition-all duration-300"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackAdminPage; 