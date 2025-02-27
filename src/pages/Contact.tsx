import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import  Navigation  from "../components/Navigation";
import  PageTransitionEffects  from "../components/PageTransitionEffects";
import ScrollSpeedLines  from "../components/ScrollSpeedLines";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Le sujet est requis";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form after delay
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setShowSuccess(false);
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <PageTransitionEffects>
      <ScrollSpeedLines />
      <div className="min-h-screen bg-white pt-24 px-4">
        <Navigation />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
            Contactez-Moi
          </h1>
          <p className="text-xl text-gray-600">
            Parlons de vos idées et projets
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6 relative"
        >
          {/* Success Message */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10"
              >
                <div className="text-center p-6 rounded-lg">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center"
                  >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <p className="text-xl font-semibold text-gray-800">Message Envoyé!</p>
                  <p className="text-gray-600">Merci de m'avoir contacté.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Fields */}
          <div className="relative">
            <motion.input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all`}
              placeholder="Votre nom"
              whileFocus={{ scale: 1.01 }}
            />
            <AnimatePresence>
              {errors.name && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm mt-1 block"
                >
                  {errors.name}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <motion.input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all`}
              placeholder="Votre email"
              whileFocus={{ scale: 1.01 }}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm mt-1 block"
                >
                  {errors.email}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <motion.input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all`}
              placeholder="Sujet"
              whileFocus={{ scale: 1.01 }}
            />
            <AnimatePresence>
              {errors.subject && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm mt-1 block"
                >
                  {errors.subject}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <motion.textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all`}
              placeholder="Votre message"
              whileFocus={{ scale: 1.01 }}
            />
            <AnimatePresence>
              {errors.message && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm mt-1 block"
                >
                  {errors.message}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-medium
              ${isSubmitting ? 'bg-gray-400' : 'bg-gradient-to-r from-pink-500 to-blue-500 hover:shadow-lg'}
              transition-all duration-300`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Envoi en cours...
              </motion.div>
            ) : (
              "Envoyer le message"
            )}
          </motion.button>
        </motion.form>
      </div>
      </div>
    </PageTransitionEffects>
  );
}
