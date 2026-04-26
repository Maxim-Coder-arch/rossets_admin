'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Lottie from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from "../../../public/loader/loader.json";
import "./index.scss";

const LoaderComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="rocket-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "linear" }}
            className="rocket-loader-container"
          >
            <Lottie
              animationData={Loader}
              loop={false}
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoaderComponent;