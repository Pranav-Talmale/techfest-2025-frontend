import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const faqData = {
  title: "Frequently Asked Questions",
  subtitle: "Everything you need to know about the event",
  questions: [
    {
      id: 1,
      question: "When and where is Technovate 2025?",
      answer: "TechFest 2025 will be held on March 1st - 2nd, 2025 at our campus. The event will run from 9 AM to 6 PM on both days."
    },
    {
      id: 2,
      question: "How can I register for events?",
      answer: "You can register for individual events through our Events page. Each event has its own registration form and requirements."
    },
    {
      id: 3,
      question: "Is there a registration fee?",
      answer: "Registration fees vary by event. Some events are free, while others have a nominal fee. Check individual event pages for details."
    },
    {
      id: 4,
      question: "Can I participate in multiple events?",
      answer: "Yes! You can participate in multiple events as long as their schedules don't conflict. Make sure to check the event timings before registering."
    },
    {
      id: 5,
      question: "What should I bring to the event?",
      answer: "Bring your student ID, registration confirmation, and any specific items required for your events. For technical events, you might need to bring your laptop."
    }
  ],
  cta: {
    text: "Still have questions?",
    linkText: "Contact our support team →"
  }
};

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="border-b border-white/10"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="py-6 w-full flex items-center justify-between text-left"
      >
        <span className="text-lg text-white font-medium">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-white/50 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/70">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <section className="bg-black relative overflow-hidden py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      
      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white mb-4"
          >
            {faqData.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/50"
          >
            {faqData.subtitle}
          </motion.p>
        </div>

        {/* FAQ List */}
        <div className="space-y-px px-2">
          {faqData.questions.map((faq) => (
            <FAQItem 
              key={faq.id} 
              question={faq.question} 
              answer={faq.answer} 
            />
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-white/50 mb-4">
            {faqData.cta.text}
          </p>
          <Link
            to="/contact"
            className="text-white hover:text-white/80 transition-colors"
          >
            {faqData.cta.linkText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}