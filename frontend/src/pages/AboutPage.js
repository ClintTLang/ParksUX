import React from "react";
import { FaMapMarkedAlt, FaComments, FaChartBar } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full min-h-screen bg-lightbg flex flex-col items-center">
      {/* Navbar */}
      <Navbar />

      {/* Page Layout */}
      <div className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-20">
          {/* Left Column: About Text (Left-Aligned) */}
          <div className="pl-6">
            <h1 className="text-4xl font-bold text-neutral mb-6">About</h1>
            <p className="text-lg text-textlight mb-4 leading-relaxed">
              Welcome to the <span className="font-semibold">Parks of Mill Creek</span> exploration tool! This web app allows you to explore local parks, read visitor reviews, and analyze community feedback through <span className="font-semibold">sentiment analysis</span>.
            </p>
            <p className="text-lg text-neutral font-semibold">
              Our goal is to provide insights into how people experience these parks by analyzing real visitor reviews and visualizing trends in public sentiment.
            </p>
          </div>

          {/* Right Column: Feature Cards */}
          <div className="grid gap-8 pr-12">
            <div className="flex items-center bg-secondary/20 p-4 rounded-lg shadow-md">
              <div className="bg-secondary text-white p-3 rounded-lg">
                <FaMapMarkedAlt size={24} />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-secondary">Interactive Park Map</h2>
                <p className="text-textlight">
                  Use our interactive map to explore parks, see their locations, and read what visitors have to say about them.
                </p>
              </div>
            </div>

            <div className="flex items-center bg-primary/20 p-4 rounded-lg shadow-md">
              <div className="bg-primary text-white p-3 rounded-lg">
                <FaComments size={24} />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-primary">Review Sentiment Analysis</h2>
                <p className="text-textlight">
                  Our app analyzes park reviews using AI-powered sentiment analysis to determine whether feedback is positive or negative.
                </p>
              </div>
            </div>

            <div className="flex items-center bg-accent/20 p-4 rounded-lg shadow-md">
              <div className="bg-accent text-white p-3 rounded-lg">
                <FaChartBar size={24} />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-accent">Visualizing Trends</h2>
                <p className="text-textlight">
                  See trends over time with charts that display sentiment distributions, helping you compare different parks at a glance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Centered Explore Button */}
        <div className="flex justify-center mt-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/map")}
            className="px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-secondary transition"
          >
            Explore
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
