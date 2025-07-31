'use client'

import React, { useState } from 'react';
import Link from 'next/link';

const LOCAL_STORAGE_KEY = 'projects';

const AddProjectPage = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    technologies: '',
    image: '', // will store base64 string
    year: '',
    github: '',
  });
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result as string }));
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const projects = stored ? JSON.parse(stored) : [];
      const newProject = {
        title: form.title,
        description: form.description,
        image: form.image,
        technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean),
        github: form.github,
        year: form.year,
        gradient: 'from-gray-500 to-gray-700',
      };
      const updated = [newProject, ...projects];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    setSuccess('Project added!');
    setForm({ title: '', description: '', technologies: '', image: '', year: '', github: '' });
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4 py-12">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 w-full max-w-xl shadow-xl relative">
        <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Add Project</h1>
        {success && <div className="mb-4 text-green-600 font-semibold">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Technologies (comma separated)</label>
            <input
              type="text"
              name="technologies"
              value={form.technologies}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Project Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-2 rounded-xl max-h-32 mx-auto" />
            )}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">GitHub Link</label>
            <input
              type="url"
              name="github"
              value={form.github}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
              placeholder="https://github.com/your-repo"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Year</label>
            <input
              type="text"
              name="year"
              value={form.year}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
              placeholder="2024"
            />
          </div>
          <div className="flex justify-between gap-2 mt-4">
            <Link href="/projects" className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 font-semibold">Cancel</Link>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectPage; 