import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto"
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-green-700 bg-green-200/50 rounded-full">
          Discover Nature
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Explore the Parks of Mill Creek
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Immerse yourself in the beauty of nature. Navigate through detailed maps
          and discover the hidden gems of our parks.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/map")}
          className="px-8 py-4 bg-green-600 text-white rounded-lg font-medium 
                   shadow-lg hover:bg-green-700 transition-all duration-300
                   hover:shadow-xl"
        >
          Start Exploring
        </motion.button>
      </motion.div>

      <div className="absolute bottom-8 text-gray-600 text-sm">
        Discover your local community, one park at a time
      </div>
    </div>
  );
};

export default Index;
