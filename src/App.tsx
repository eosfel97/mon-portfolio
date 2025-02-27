import React from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import PageTransitionEffects from "./components/PageTransitionEffects";
import FloatingShapes from "./components/FloatingShapes";
import InkSplatter from "./components/InkSplatter";
import TypeWriter from "./components/TypeWriter";
import LoadingIndicator from "./components/LoadingIndicator";

function App() {
  const [hoverAbout, setHoverAbout] = React.useState(false);
  const [hoverProjects, setHoverProjects] = React.useState(false);
  const [hoverContact, setHoverContact] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simuler un délai de chargement
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Gestion du mouvement de la souris pour l'effet parallax
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Transformation des mouvements de la souris en décalages parallax
  const backgroundX = useTransform(mouseX, [-800, 800], [-30, 30]);
  const backgroundY = useTransform(mouseY, [-800, 800], [-30, 30]);

  // Variantes d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const decorationVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.15,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <PageTransitionEffects>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white">
          <LoadingIndicator size="large" color="#EC4899" />
        </div>
      ) : (
        <>
          <FloatingShapes />
          <div className="min-h-screen bg-white overflow-x-hidden">
            <Navigation />
            {/* Éléments d'arrière-plan parallax */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ x: backgroundX, y: backgroundY }}
            >
              <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2 opacity-20" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2 opacity-20" />
            </motion.div>

            {/* Lignes décoratives en SVG */}
            <motion.svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              initial="hidden"
              animate="visible"
            >
              <motion.path
                d="M0,100 Q200,150 400,100 T800,100"
                stroke="#FF69B4"
                strokeWidth="2"
                fill="none"
                variants={decorationVariants}
              />
              <motion.path
                d="M0,200 Q200,250 400,200 T800,200"
                stroke="#4169E1"
                strokeWidth="2"
                fill="none"
                variants={decorationVariants}
              />
              <motion.path
                d="M800,300 Q600,350 400,300 T0,300"
                stroke="#FF69B4"
                strokeWidth="2"
                fill="none"
                variants={decorationVariants}
              />
            </motion.svg>

            {/* Section héro avec animation inspirée d'anime */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="relative min-h-screen flex items-center justify-center"
            >
              {/* Contenu principal */}
              <div className="container mx-auto px-4 relative z-10">
                <motion.div variants={itemVariants} className="text-center mb-12">
                  <motion.h1
                    className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <TypeWriter
                      text="Bienvenue sur Mon Canvas"
                      delay={0.5}
                      className="inline-block"
                    />
                  </motion.h1>
                  <motion.p
                    variants={itemVariants}
                    className="text-xl text-gray-600 mb-8"
                  >
                    <TypeWriter
                      text="Où la tradition rencontre l'innovation à travers le prisme de l'esthétique anime"
                      delay={2}
                      speed={0.03}
                      className="inline-block"
                    />
                  </motion.p>
                </motion.div>

                {/* Section de brève introduction */}
                <motion.div
                  variants={itemVariants}
                  className="max-w-2xl mx-auto text-center mb-12 relative"
                >
                  <motion.div
                    className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-pink-500 to-purple-500 rounded-full"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  />
                  <motion.div
                    className="absolute -right-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  />
                  <p className="text-lg text-gray-700 leading-relaxed px-6">
                    Passionné(e) par l'art japonais et le développement web, je crée des expériences numériques uniques qui marient l'élégance traditionnelle à l'innovation moderne. Chaque projet est une nouvelle histoire à raconter, une nouvelle scène à animer.
                  </p>
                </motion.div>

                {/* Boutons de navigation */}
                <motion.div
                  variants={itemVariants}
                  className="flex justify-center gap-6 flex-wrap"
                >
                  <motion.button
                    className="relative px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(236, 72, 153, 0.3)" }}
                    onHoverStart={() => setHoverAbout(true)}
                    onHoverEnd={() => setHoverAbout(false)}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/about")}
                  >
                    About Me
                    <InkSplatter active={hoverAbout} color="rgba(236, 72, 153, 0.15)" />
                  </motion.button>
                  <motion.button
                    className="relative px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(96, 165, 250, 0.3)" }}
                    onHoverStart={() => setHoverProjects(true)}
                    onHoverEnd={() => setHoverProjects(false)}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/projects")}
                  >
                    View Projects
                    <InkSplatter active={hoverProjects} color="rgba(96, 165, 250, 0.15)" />
                  </motion.button>
                  <motion.button
                    className="relative px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(168, 85, 247, 0.3)" }}
                    onHoverStart={() => setHoverContact(true)}
                    onHoverEnd={() => setHoverContact(false)}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/contact")}
                  >
                    Contact
                    <InkSplatter active={hoverContact} color="rgba(168, 85, 247, 0.15)" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </PageTransitionEffects>
  );
}

export default App;
