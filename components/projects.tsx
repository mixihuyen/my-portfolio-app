
"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import projects from "@/components/data/projectsData";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const swiperRef = useRef<SwiperCore | null>(null);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: index * 0.05,
      },
    }),
  };

  // Hàm xử lý khi phát video
  const handleVideoPlay = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop(); // Dừng autoplay khi phát video
    }
  };

  return (
    <section id="projects" className="py-8 bg-white/50">
      <div className="container mx-auto px-4 sm:px-6 md:px-30">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-800 mb-3">
            Projects
          </h2>
          <div className="w-12 h-1 bg-green-500 mx-auto"></div>
          <p className="mt-3 text-sm sm:text-base text-green-700 max-w-md mx-auto">
            Notable projects showcasing my mobile and web development skills.
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              className={`px-2 py-1 text-xs sm:text-sm ${
                activeFilter === "all"
                  ? "bg-green-600 hover:bg-green-700"
                  : "border-green-600 text-green-600 hover:bg-green-100"
              }`}
              onClick={() => setActiveFilter("all")}
            >
              All
            </Button>
            <Button
              variant={activeFilter === "mobile" ? "default" : "outline"}
              className={`px-2 py-1 text-xs sm:text-sm ${
                activeFilter === "mobile"
                  ? "bg-green-600 hover:bg-green-700"
                  : "border-green-600 text-green-600 hover:bg-green-100"
              }`}
              onClick={() => setActiveFilter("mobile")}
            >
              Mobile
            </Button>
            <Button
              variant={activeFilter === "web" ? "default" : "outline"}
              className={`px-2 py-1 text-xs sm:text-sm ${
                activeFilter === "web"
                  ? "bg-green-600 hover:bg-green-700"
                  : "border-green-600 text-green-600 hover:bg-green-100"
              }`}
              onClick={() => setActiveFilter("web")}
            >
              Web
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <Card className="pt-8 overflow-hidden bg-gray-50 border-green-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative overflow-hidden w-full">
                  <div className="relative">
                    <Swiper
                      modules={[Pagination, Autoplay]}
                      spaceBetween={10}
                      autoplay={{ delay: 3000, disableOnInteraction: true }}
                      className="w-full"
                      style={{ maxHeight: "350px" }}
                      onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                      }}
                    >
                      {project.images.map((media, imgIndex) => (
                        <SwiperSlide key={imgIndex}>
                          <div
                            className="w-full max-w-[360px] mx-auto aspect-[16/9] m-2"
                          >
                            {media.includes("youtube.com") ? (
                              <iframe
                                src={`${media}?rel=0&modestbranding=1`}
                                title={`${project.title} - Video ${imgIndex}`}
                                className="w-full h-full object-contain rounded-lg"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                onPlay={handleVideoPlay} // Dừng autoplay khi phát video
                              ></iframe>
                            ) : (
                              <img
                                src={media}
                                alt={`${project.title} - Slide ${imgIndex}`}
                                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105 rounded-lg"
                              />
                            )}
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
                <CardContent className="p-3 sm:p-4 bg-white">
                  <h3 className="text-base sm:text-lg font-bold text-green-800 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-green-700 mb-2 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 text-xs px-1.5 py-0.5"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:text-green-500 transition-colors"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:text-green-500 transition-colors"
                      aria-label={`Visit ${project.title} live demo`}
                    >
                      <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Button className="bg-green-600 hover:bg-green-700 px-3 py-1 text-xs sm:text-sm">
            View More
          </Button>
        </div>
      </div>
    </section>
  );
}