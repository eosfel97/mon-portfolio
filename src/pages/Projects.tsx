import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import  Navigation  from "../components/Navigation";
import  PageTransitionEffects  from "../components/PageTransitionEffects";
import  ScrollSpeedLines  from "../components/ScrollSpeedLines";

// Mock data for projects
const mockProjects = [
  {
    id: "1",
    title: "E-commerce Moderne",
    description: "Une plateforme de commerce électronique avec une interface utilisateur innovante et des animations fluides.",
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop&q=60",
    category: "web",
    technologies: ["React", "Node.js", "MongoDB"]
  },
  {
    id: "2",
    title: "Application Mobile Fitness",
    description: "Application de suivi de fitness avec des visualisations de données dynamiques et un design épuré.",
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&auto=format&fit=crop&q=60",
    category: "mobile",
    technologies: ["React Native", "Firebase"]
  },
  {
    id: "3",
    title: "Portfolio Artistique",
    description: "Portfolio numérique pour un artiste avec des galeries interactives et des transitions fluides.",
    imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=60",
    category: "design",
    technologies: ["React", "Three.js"]
  },
  {
    id: "4",
    title: "Tableau de Bord Analytics",
    description: "Interface de tableau de bord avec des graphiques animés et une expérience utilisateur intuitive.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    category: "web",
    technologies: ["Vue.js", "D3.js"]
  }
];

const categories = [
  { id: "all", name: "Tous" },
  { id: "web", name: "Web" },
  { id: "mobile", name: "Mobile" },
  { id: "design", name: "Design" }
];

export default function Projects() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedProject, setSelectedProject] = React.useState<typeof mockProjects[0] | null>(null);

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === "all"
    ? mockProjects
    : mockProjects.filter(project => project.category === selectedCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const projectVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <PageTransitionEffects>
      <ScrollSpeedLines />
      <div className="min-h-screen bg-white pt-24 px-4">
        <Navigation />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
            Mes Projets
          </h1>
          <p className="text-xl text-gray-600">
            Découvrez mes créations et expériences numériques
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {categories.map(category => (
            <motion.button
              key={category.id}
              className={`px-6 py-2 rounded-full ${selectedCategory === category.id
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
              variants={projectVariants}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span key={tech} className="text-sm bg-white/20 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="bg-white rounded-xl max-w-2xl w-full overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
              >
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    {selectedProject.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {selectedProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map(tech => (
                      <span
                        key={tech}
                        className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </PageTransitionEffects>
  );
}
