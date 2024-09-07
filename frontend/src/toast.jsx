import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ toastType, showToast }) => {
  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{opacity:1, y:0}}
          animate={{ opacity: 0.5, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="fixed top-4 w-full max-w-xl p-2 my-5 text-white border border-orange-500 rounded-md shadow-md shadow-orange-500"
        >
          {toastType}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
