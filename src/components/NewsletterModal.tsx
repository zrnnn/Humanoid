import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }
    setError('');
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        // Reset state after closing animation
        setTimeout(() => {
          setIsSubmitted(false);
          setName('');
          setEmail('');
        }, 300);
      }, 2000);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>

            {isSubmitted ? (
              <div className="p-12 text-center flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <CheckCircle2 size={64} className="text-emerald-500 mb-6" />
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Vielen Dank!</h3>
                <p className="text-slate-600">
                  Ihre Anmeldung war erfolgreich. Wir halten Sie auf dem Laufenden.
                </p>
              </div>
            ) : (
              <div className="p-8 sm:p-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">
                    Werden Sie Teil der Vision
                  </h3>
                  <p className="text-slate-600 font-medium">
                    Treten Sie dem Humanoids Bavaria Netzwerk bei und erhalten Sie exklusive Einblicke und Updates zu unseren Projekten.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Name / Unternehmen (optional)
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      placeholder="Max Mustermann"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                      E-Mail Adresse *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 border outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all ${
                        error ? 'border-red-400' : 'border-slate-200'
                      }`}
                      placeholder="max@beispiel.de"
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1.5 font-medium">{error}</p>
                    )}
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20"
                    >
                      Jetzt anmelden
                    </button>
                  </div>
                  <p className="text-center text-xs text-slate-400 mt-4">
                    Wir verwenden Ihre Daten ausschließlich für den Newsletter-Versand.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
