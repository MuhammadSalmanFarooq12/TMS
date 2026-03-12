import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FaqsComp.css";

const faqsData = [
  { category: "Booking", question: "How do I book a bus ticket?", answer: "Select your route, click 'Book Now', fill in details and confirm." },
  { category: "Booking", question: "Can I cancel my booking?", answer: "Yes, before travel date by contacting support." },
  { category: "Payments", question: "What payment methods are accepted?", answer: "We accept debit cards, credit cards and wallets." },
  { category: "Payments", question: "Are refunds available?", answer: "Refunds follow our refund policy." },
  { category: "Travel", question: "How early should I arrive?", answer: "Arrive at least 30 minutes before departure." },
  { category: "Travel", question: "Is luggage allowed?", answer: "Standard luggage allowed. Extra baggage may cost extra." },
  { category: "Account", question: "Can I modify booking details?", answer: "Yes before departure by contacting support." },
  { category: "Account", question: "Is online booking safe?", answer: "Yes, we use encrypted secure systems." },
];

const categories = ["All", "Booking", "Payments", "Travel", "Account"];

const FaqsComp = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFaqs =
    selectedCategory === "All"
      ? faqsData
      : faqsData.filter((faq) => faq.category === selectedCategory);

  return (
    <section className="faqs">
      <div className="faqs-container">

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions
        </motion.h2>

        {/* CATEGORY FILTER */}
        <div className="faq-categories">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={selectedCategory === cat ? "active" : ""}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveIndex(null);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ LIST */}
        {filteredFaqs.map((faq, index) => (
          <motion.div
            key={index}
            layout
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div
              className="faq-question"
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
            >
              <motion.span
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="icon"
              >
                +
              </motion.span>

              {faq.question}
            </div>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  className="faq-answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* CONTACT SECTION */}
        <motion.div
          className="faq-contact"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h3>Still have questions?</h3>
          <p>
            Our support team is here to help you anytime.
          </p>

          <a href="/contact" className="contact-btn">
            Contact Support
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default FaqsComp;