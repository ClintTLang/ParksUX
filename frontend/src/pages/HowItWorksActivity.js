import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SYMBOLS = ["■", "✿", "✦", "⚑", "◁", "§", "♟", "0"];

const SymbolSelector = ({ label, selected, setSelected }) => {
  const toggleSymbol = (symbol) => {
    if (selected.includes(symbol)) {
      setSelected(selected.filter((s) => s !== symbol));
    } else {
      setSelected([...selected, symbol]);
    }
  };

  return (
    <div className="mb-8">
      <p className="text-textlight font-medium mb-2">{label}</p>
      <div className="flex flex-wrap gap-4">
        {SYMBOLS.map((symbol, i) => (
          <button
            key={i}
            onClick={() => toggleSymbol(symbol)}
            className={`w-12 h-12 text-2xl border rounded-lg shadow-sm flex items-center justify-center transition ${
              selected.includes(symbol)
                ? "bg-accent text-white border-accent"
                : "bg-white/80 text-black hover:bg-white"
            }`}
          >
            {symbol}
          </button>
        ))}
      </div>
    </div>
  );
};

const HowItWorksActivity = () => {
  const navigate = useNavigate();

  const [happySymbols, setHappySymbols] = useState([]);
  const [angrySymbols, setAngrySymbols] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);

  const modelWeights = {
    "■": 0.8,
    "✿": -0.24,
    "✦": -0.07,
    "⚑": 0.04,
    "◁": 0.28,
    "§": 0.29,
    "♟": -0.80,
    "0": -0.84,
  };

  const selectedSymbols = SYMBOLS.filter(
    (s) => happySymbols.includes(s) || angrySymbols.includes(s)
  );

  const handleSubmit = () => {
    setShowAnswers(true);
    console.log("Happy symbols:", happySymbols);
    console.log("Angry symbols:", angrySymbols);
  };

  return (
    <div className="relative w-full min-h-screen bg-lightbg flex flex-col items-center">
      <Navbar />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: Symbolic Statements */}
          <div className="bg-secondary/20 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-secondary mb-4">Symbolic Statements</h2>
            <div className="flex flex-col md:flex-row gap-6 items-stretch">
              <div className="flex-1">
                <p className="text-textlight mb-4">
                  Below is a table with 10 short statements. To help you "be a machine," the words have been replaced with symbols. Each statement is also labeled with its sentiment: happy or angry.
                </p>
                <p className="text-textlight mb-4">
                  As a "machine," you do not know and are not able to know the meanings of these words in human language, so you don’t need to figure out what these symbols mean. Nevertheless, your "machine" brain should be able to learn something else by closely examining this data.
                </p>
              </div>
              <div className="flex-1 flex items-stretch">
                <img
                  src="./symbolic_reviews_v2.png"
                  alt="Symbolic Statements Table"
                  className="object-contain h-full w-full rounded-md shadow"
                />
              </div>
            </div>
          </div>

          {/* Right: Interactive */}
          <div className="bg-accent/10 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-accent mb-6">Discussion Time!</h2>

            <SymbolSelector
              label="Which symbols do you think are the best indicators of being happy?"
              selected={happySymbols}
              setSelected={setHappySymbols}
            />

            <SymbolSelector
              label="Which symbols do you think are the best indicators of being angry?"
              selected={angrySymbols}
              setSelected={setAngrySymbols}
            />


            <div className="text-center mt-6">
                {!showAnswers ? (
                    <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-secondary transition"
                    >
                    Check
                    </motion.button>
                ) : (
                    <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setShowAnswers(false);
                        setHappySymbols([]);
                        setAngrySymbols([]);
                    }}
                    className="px-6 py-2 bg-white/80 text-black rounded-lg shadow-md hover:bg-white transition"
                    >
                    Restart
                    </motion.button>
                )}
                </div>


            {/* Feedback Table */}
            {showAnswers && selectedSymbols.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xl font-semibold text-light mb-4">Model's Symbol Analysis</h3>
                <table className="w-full text-sm text-textlight border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-left text-neutral">
                      <th className="px-2 py-1">Symbol</th>
                      <th className="px-2 py-1">Your Label</th>
                      <th className="px-2 py-1">Model Label</th>
                      <th className="px-2 py-1">Match?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSymbols.map((symbol) => {
                      const userLabel = happySymbols.includes(symbol)
                        ? "Happy"
                        : angrySymbols.includes(symbol)
                        ? "Angry"
                        : "—";

                      const modelLabel = modelWeights[symbol] > 0 ? "Happy" : "Angry";
                      const match = userLabel === modelLabel;

                      return (
                        <tr
                          key={symbol}
                          className={`rounded ${
                            match ? "bg-green-900/20" : "bg-red-900/20"
                          }`}
                        >
                          <td className="px-2 py-1 font-semibold">{symbol}</td>
                          <td className="px-2 py-1">{userLabel}</td>
                          <td className="px-2 py-1">{modelLabel}</td>
                          <td className="px-2 py-1">{match ? "✅" : "❌"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HowItWorksActivity;
