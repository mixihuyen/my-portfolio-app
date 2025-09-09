import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  github: string;
  link: string;
  category: string;
}

interface ProjectPopupProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectPopup({ project, onClose }: ProjectPopupProps) {
  const swiperRef = useRef<SwiperCore | null>(null);

  if (!project) return null;

  const handleVideoPlay = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="relative max-w-4xl w-full bg-gray-50 border-green-200 shadow-lg max-h-[90vh] overflow-y-auto">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-green-700 hover:bg-green-100"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </Button>
        <CardContent className="p-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4">
            {project.title}
          </h2>
          <div className="mb-6">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={10}
              autoplay={{ delay: 3000, disableOnInteraction: true }}
              pagination={{
                clickable: true,
                el: ".custom-pagination", // Liên kết với container pagination tùy chỉnh
              }}
              className="w-full"
              style={{ maxHeight: "500px" }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {project.images.map((media, imgIndex) => (
                <SwiperSlide key={imgIndex}>
                  <div className="w-full max-w-[800px] mx-auto aspect-[16/9]">
                    {media.includes("youtube.com") ? (
                      <iframe
                        src={`${media}?rel=0&modestbranding=1`}
                        title={`${project.title} - Video ${imgIndex}`}
                        className="w-full h-full object-contain rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onPlay={handleVideoPlay}
                      ></iframe>
                    ) : (
                      <img
                        src={media}
                        alt={`${project.title} - Slide ${imgIndex}`}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Container cho pagination */}
            <div className="custom-pagination mt-4 flex justify-center"></div>
          </div>
          <p className="text-base text-green-700 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200 text-sm px-2 py-1"
              >
                {tech}
              </Badge>
            ))}
          </div>
          <div className="flex gap-4">
            <Button
              asChild
              variant="outline"
              className="flex-1 border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                Code
              </a>
            </Button>
            <Button
              asChild
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5 mr-2" />
                Demo
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}