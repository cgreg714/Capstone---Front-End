import { motion, AnimatePresence } from "framer-motion";

const dotVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const transition = {
    duration: 0.3,
    yoyo: Infinity,
};

const LoadingDots = () => {
    return (
        <>
            {Array.from({ length: 3 }).map((_, i) => (
                <AnimatePresence key={i}>
                    <motion.span
                        variants={dotVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ ...transition, delay: i * 0.2 }}
                    >
                        .
                    </motion.span>
                </AnimatePresence>
            ))}
        </>
    );
};

export default LoadingDots;