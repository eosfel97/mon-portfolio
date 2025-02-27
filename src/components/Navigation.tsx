
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const navigationItems = [
  { path: "/", label: "Accueil" },
  { path: "/about", label: "À Propos" },
  { path: "/projects", label: "Projets" },
  { path: "/contact", label: "Contact" },
];

 function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm border-b border-gray-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <ul className="flex justify-center items-center space-x-8">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <motion.li key={item.path} className="relative">
                <motion.button
                  onClick={() => navigate(item.path)}
                  className={`px-4 py-2 text-lg relative ${isActive ? 'text-pink-500' : 'text-gray-600'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-blue-500"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
                
                {/* Hover effect - manga style starburst */}
                <motion.div
                  className="absolute -z-10 inset-0 bg-gradient-to-r from-pink-100 to-blue-100 rounded-full opacity-0"
                  whileHover={{ 
                    scale: [1, 1.5, 1.2],
                    opacity: [0, 0.8, 0],
                    transition: { 
                      duration: 0.8,
                      times: [0, 0.5, 1],
                      repeat: Infinity
                    }
                  }}
                />
              </motion.li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
}
export default Navigation;