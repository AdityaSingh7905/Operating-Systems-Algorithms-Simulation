import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: name,
      email: email,
      message: feedback,
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setSubmitted(true);
          setShow(true);
          setName("");
          setEmail("");
          setFeedback("");

          setTimeout(() => {
            setShow(false);
          }, 2000);
        },
        (error) => {
          console.error("FAILED...", error.text);
          alert("❌ Failed to send feedback. Try again later!");
        }
      );
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white focus:outline-none mb-3"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white focus:outline-none mb-3"
          required
        />
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your feedback..."
          className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white focus:outline-none"
          required
        />
        <button
          type="submit"
          className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-bold"
        >
          Submit Feedback
        </button>
      </form>

      {show && submitted && (
        <p className="mt-4 text-green-500 font-semibold">
          ✅ Thank you for your feedback!
        </p>
      )}
    </div>
  );
};

export default FeedbackForm;
