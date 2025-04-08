import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HowItWorksIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen bg-lightbg flex flex-col items-center">
      <Navbar />

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-36 text-center">
        <h1 className="text-4xl font-bold text-neutral mb-6">Let’s be very clear:</h1>
        <p className="text-lg text-textlight mb-4 leading-relaxed">
          Computer programs (machines) do <span className="font-semibold">NOT</span> know the meanings of any words, phrases, or sentences as humans do.
        </p>
        <p className="text-lg text-textlight mb-4 leading-relaxed">
          When you show a review, or even just a word, to a machine, it sees digital encodings of some sort that it understands in its machine way. So then, how can it learn without the ability to understand the meanings of our language?! Just think about how many years it took you to build and expand vocabulary and English skills!
        </p>
        <p className="text-lg text-neutral font-semibold mb-12">
          In this exercise, you will step inside the machine "brain" to get a feel for how it works.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/howitworks/activity")}
          className="px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-secondary transition"
        >
          Start Activity
        </motion.button>
      </div>
    </div>
  );
};

export default HowItWorksIntro;
