import React from "react";
import { FaMapMarkedAlt, FaComments, FaChartBar } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// const HowItWorksPage = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="relative w-full min-h-screen bg-lightbg flex flex-col items-center">
//       {/* Navbar */}
//       <Navbar />

//       {/* Page Layout */}
//       <div className="container mx-auto px-8 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-20">
//           {/* Left Column: Introductory Text */}
//           <div className="pl-6">
//             <h1 className="text-4xl font-bold text-neutral mb-6">Let’s be very clear:</h1>
//             <p className="text-lg text-textlight mb-4 leading-relaxed">
//               Computers programs (machines) do <span className="font-semibold">NOT</span> know the meanings of any words, phrases, or sentences as humans do.
//             </p>
//             <p className="text-lg text-textlight mb-4 leading-relaxed">
//               When you show a review, or even just a word, to a machine, it sees digital encodings of some sort that it understands in its machine way. So then, how can it learn without the ability to understand the meanings of our language?! Just think about how many years it took you to build and expand vocabulary and English skills!
//             </p>
//             <p className="text-lg text-neutral font-semibold">
//               In this exercise, you will step inside the machine “brain” to get a feel for how it works.
//             </p>
//           </div>

//           {/* Right Column: Symbolic Statements Explanation */}
//           <div className="grid gap-8 pr-12">
//             <div className="bg-secondary/20 p-6 rounded-lg shadow-md">
//               <h2 className="text-2xl font-bold text-secondary mb-4">Symbolic Statements</h2>
//               <p className="text-textlight">
//                 At right, there is a table with 10 short statements. To help you "be a machine,” the words have been replaced with symbols. Each statement is also labeled with its sentiment: happy or angry.
//               </p>
//               <ul className="mt-4 ml-4 text-textlight">
//                 <li>◾ = square</li>
//                 <li>✿ = flower</li>
//                 <li>✦ = diamond</li>
//                 <li>⛿ = flag</li>
//                 <li>◁ = triangle</li>
//                 <li>§ = squiggle</li>
//                 <li>♟ = pawn</li>
//                 <li>⬯ = oval</li>
//               </ul>
//               <p className="mt-4 text-textlight">
//                 As a “machine,” you do not know and are not able to know the meanings of these words in human language, so you don’t need to figure out what these symbols mean. Nevertheless, your “machine” brain should be able to learn something else by closely examining this data. Take a minute to see what you notice about these statements.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Centered Explore Button */}
//         <div className="flex justify-center mt-20">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => navigate("/map")}
//             className="px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-secondary transition"
//           >
//             Explore
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HowItWorksPage;

const HowItWorksPage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full min-h-screen bg-lightbg flex flex-col items-center">
      <Navbar />

      <div className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16 items-start mt-20">
          <div className="pl-6 md:col-span-2">
            <h1 className="text-4xl font-bold text-neutral mb-6">Let’s be very clear:</h1>
            <p className="text-lg text-textlight mb-4 leading-relaxed">
              Computer programs (machines) do <span className="font-semibold">NOT</span> know the meanings of any words, phrases, or sentences as humans do.
            </p>
            <p className="text-lg text-textlight mb-4 leading-relaxed">
              When you show a review, or even just a word, to a machine, it sees digital encodings of some sort that it understands in its machine way. So then, how can it learn without the ability to understand the meanings of our language?! Just think about how many years it took you to build and expand vocabulary and English skills!
            </p>
            <p className="text-lg text-neutral font-semibold">
              In this exercise, you will step inside the machine "brain" to get a feel for how it works.
            </p>

            <div className="mt-12 bg-accent/10 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-accent mb-4">Discussion Time!</h2>
              <p className="text-textlight mb-4">
                Analyze the table with a partner or small group. As you analyze, try to answer these questions:
              </p>
              <ul className="list-disc ml-6 text-textlight">
                <li>Which features do you think are the best indicators of being happy? Explain your answer using evidence from the table.</li>
                <li>Which features do you think are the best indicators of being angry? Explain your answer using evidence from the table.</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-8 pr-12 md:col-span-3">
            <div className="bg-secondary/20 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-secondary mb-4">Symbolic Statements</h2>
              <p className="text-textlight">
                Below is a table with 10 short statements. To help you "be a machine," the words have been replaced with symbols. Each statement is also labeled with its sentiment: happy or angry.
              </p>
              <div className="flex justify-center">
                <img
                  src="./symbolic_reviews_v2.png"
                  alt="Symbolic Statements Table"
                  className="mt-6 w-1/4 h-auto rounded-md shadow"
                />
              </div>
              <p className="mt-4 text-textlight">
                As a "machine," you do not know and are not able to know the meanings of these words in human language, so you don’t need to figure out what these symbols mean. Nevertheless, your "machine" brain should be able to learn something else by closely examining this data. Take a minute to see what you notice about these statements.
              </p>
            </div>
          </div>
        </div>

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

export default HowItWorksPage;
