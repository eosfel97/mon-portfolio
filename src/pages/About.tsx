import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import PageTransitionEffects from "../components/PageTransitionEffects";
import ScrollSpeedLines from "../components/ScrollSpeedLines";

export default function About() {


  // Variantes d'animation
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
    exit: { opacity: 0, y: -20 },
  };

  const sectionVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const skillVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 200 },
    },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 400 },
    },
  };

  // Timeline adaptée à votre parcours
  const timelineEvents = [
    {
      year: "2024-2025",
      title: "Licence pro en systèmes d'information",
      description: "Formation au CNAM pour approfondir mes compétences en gestion de données."
    },
    {
      year: "2022-2023",
      title: "Stage en conception d'applications",
      description: "11 semaines chez Greta l’Essonne axées sur la création d'applications innovantes."
    },
    {
      year: "2021-2022",
      title: "Stage en développement web",
      description: "9 semaines chez Philiance formation, où j'ai développé des interfaces créatives."
    },
    {
      year: "Avant 2021",
      title: "Diverses expériences",
      description: "De missions de livraison et de service polyvalent à une première expérience en laboratoire, autant d'expériences qui ont forgé mon adaptabilité et mon esprit d'équipe."
    }
  ];

  // Compétences techniques extraites de votre CV
  const skills = [
    { name: "HTML/CSS", level: 90 },
    { name: "PHP / Symfony", level: 80 },
    { name: "JavaScript", level: 85 },
    { name: "Java (Spring, Hibernate, SpringBoot)", level: 75 },
    { name: "Linux", level: 70 },
  ];

  return (
    <PageTransitionEffects>
      <ScrollSpeedLines />
      {/* Bouton fixé pour télécharger le CV */}
      <motion.a
        href="/cv.pdf"
        download
        className="fixed top-20 right-0 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-lg transition-all duration-300 z-50"
      >
        Télécharger mon CV
      </motion.a>
      <motion.div
        className="min-h-screen bg-white pt-24 px-4"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <Navigation />

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div className="text-center mb-16" variants={sectionVariants}>
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
              À Propos de Moi
            </h1>
            <p className="text-xl text-gray-600">
              Je suis GNAHIET, étudiant en licence  informatique basé à Épinay-sur-Seine, passionné par l'art japonais et le développement web.
            </p>
          </motion.div>

          {/* Mon Histoire et Objectif */}
          <motion.section className="mb-16" variants={sectionVariants}>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Mon Parcours
            </h2>
            <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
              <p className="text-gray-700 leading-relaxed mb-4">
                Actuellement en formation et à la recherche d'un stage de 6 mois à partir d'avril, j'aspire à valider mon cursus tout en acquérant une expérience professionnelle enrichissante. Mon parcours, riche en expériences diverses, m'a permis de développer mon esprit d'équipe, mon adaptabilité et mon autonomie.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Outre mes stages en développement web et en conception d'applications, j'ai aussi exercé divers métiers qui ont contribué à forger ma rigueur et ma polyvalence. Passionné de DIY, de gaming, et amateur de guitare et de romans SF, je parle également anglais et japonais, ce qui enrichit ma perspective.
              </p>
            </div>
          </motion.section>

          {/* Compétences Techniques */}
          <motion.section className="mb-16" variants={sectionVariants}>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Compétences Techniques
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="bg-white rounded-lg p-6 shadow-lg border border-gray-100"
                  variants={skillVariants}
                  whileHover="hover"
                >
                  <h3 className="text-lg font-medium mb-2 text-gray-800">{skill.name}</h3>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-pink-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Expériences et Formations */}
          <motion.section className="mb-16" variants={sectionVariants}>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Expériences et Formations
            </h2>
            <div className="relative">
              {/* Ligne verticale */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 to-blue-500" />
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  className="ml-8 mb-8 relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {/* Point de la timeline */}
                  <motion.div
                    className="absolute -left-10 w-4 h-4 rounded-full bg-white border-2 border-pink-500"
                    whileHover={{ scale: 1.2 }}
                  />
                  <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
                    <span className="text-sm text-pink-500 font-semibold">{event.year}</span>
                    <h3 className="text-lg font-medium mt-1 mb-2 text-gray-800">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </motion.div>
    </PageTransitionEffects>
  );
}
