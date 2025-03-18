import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-lightbg flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto"
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-secondary bg-secondary/10 rounded-full">
          T-ReCS
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-neutral mb-6">
          Explore the Parks of Mill Creek
        </h1>
        <p className="text-lg md:text-xl text-textlight mb-8 max-w-2xl mx-auto">
        Are you ready to learn about how Nashville's Mill Creek affects our local community?
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/map")}
          className="px-8 py-4 bg-primary text-white rounded-lg font-medium 
                   shadow-lg hover:bg-primary/90 transition-all duration-300
                   hover:shadow-xl"
        >
          Start Exploring
        </motion.button>
      </motion.div>

    </div>
  );
};

export default Index;
