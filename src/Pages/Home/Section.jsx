import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Section = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full p-6 rounded-lg  "
    >
      <motion.h2
        variants={childVariants}
        className="text-3xl font-semibold text-center mb-6"
      >
        𝑯𝒐𝒘 𝒕𝒐 𝑩𝒐𝒐𝒌 𝒂 𝑺𝒍𝒐𝒕𝒔
      </motion.h2>
      <motion.p
        variants={childVariants}
        className="text-lg leading-relaxed mb-4"
      >
        To book a slot for the turf, follow these simple steps:
      </motion.p>
      <motion.ol
        variants={childVariants}
        className="list-decimal pl-8 space-y-2 text-lg"
      >
        <motion.li variants={childVariants}>
          Select a slot of your choice in the{" "}
          <strong className="text-lime-500">&quot;All Slots&quot;</strong> section.
        </motion.li>
        <motion.li variants={childVariants}>
          Click the{" "}
          <strong className="text-lime-500">&quot;Book Now&quot;</strong> button next to your selected slot.
        </motion.li>
        <motion.li variants={childVariants}>
          A modal will appear with payment options. You will see personal contact
          numbers for payments through platforms like{" "}
          <strong className="text-lime-500">Nagad</strong> or{" "}
          <strong className="text-lime-500">Bkash</strong>.
        </motion.li>
        <motion.li variants={childVariants}>
          After making the payment, enter the transaction ID in the provided field to confirm the payment.
        </motion.li>
        <motion.li variants={childVariants}>
          Click the{" "}
          <strong className="text-lime-500">&quot;Confirm&quot;</strong> button to finalize your booking.
        </motion.li>
      </motion.ol>
      <motion.p
        variants={childVariants}
        className="mt-4 text-lg leading-relaxed"
      >
        <strong className="text-red-500">Important:</strong> Please ensure you arrive at least 20 minutes before the booking time to guarantee a smooth process. If you arrive later than the scheduled time, your booking may be canceled, but you will still have a 5-minute grace period to start the game.
      </motion.p>
    </motion.div>
  );
};

export default Section;
