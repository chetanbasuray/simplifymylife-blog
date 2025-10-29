"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const res = await fetch("https://formspree.io/f/xldobqpa", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(e.target),
    });

    if (res.ok) {
      setStatus("Message sent! ✅");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("Something went wrong. Please try again.");
    }

    // Hide status after 4 seconds
    setTimeout(() => setStatus(""), 4000);
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Contact</h1>

      <p className="text-gray-700 mb-8 leading-relaxed">
        Have feedback, suggestions, or just want to say hi?  
        I’d love to hear from you! Use the form below — your email address will
        remain private, and I’ll get back to you as soon as possible.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 border border-gray-200 rounded-2xl p-6 bg-white shadow-sm text-gray-800 relative"
      >
        {/* Spam honeypot (hidden) */}
        <input type="text" name="_gotcha" style={{ display: "none" }} />

        {/* Name field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-400 transition"
          />
        </div>

        {/* Email field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-400 transition"
          />
        </div>

        {/* Message field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            name="message"
            placeholder="Write your message..."
            value={form.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-400 transition"
          ></textarea>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Send Message
        </button>

        {/* Animated Status Banner */}
        {status && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm font-medium border transition-opacity duration-500 ease-out ${
              status.includes("✅")
                ? "bg-green-50 text-green-700 border-green-200 opacity-100 animate-fadeIn"
                : "bg-red-50 text-red-700 border-red-200 opacity-100 animate-fadeIn"
            }`}
          >
            {status}
          </div>
        )}
      </form>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-in-out;
        }
      `}</style>
    </main>
  );
}
