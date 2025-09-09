"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import IntroAnimation from "./intro-animation"
import Header from "./header"
import Hero from "./hero"
import About from "./about"
import Skills from "./skills"
import Projects from "./projects"
import Contact from "./contact"
import Footer from "./footer"

export default function PortfolioWrapper() {
  const [showIntro, setShowIntro] = useState(true)
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  useEffect(() => {
    const preloadAssets = async () => {
      try {
        // Giả lập tải tài nguyên nhẹ (0.5s)
        // Có thể thay bằng tải hình ảnh thực tế nếu cần
        await new Promise((resolve) => setTimeout(resolve, 500))
        setAssetsLoaded(true)
      } catch (error) {
        console.error("Lỗi khi tải tài nguyên:", error)
        setAssetsLoaded(true) // Tiếp tục dù có lỗi
      }
    }

    preloadAssets()
  }, [])

  const handleIntroComplete = () => {
    // Chỉ chuyển sang nội dung chính khi cả intro (3s) và tài nguyên đã tải
    if (assetsLoaded) {
      setShowIntro(false)
    } else {
      const checkAssets = setInterval(() => {
        if (assetsLoaded) {
          setShowIntro(false)
          clearInterval(checkAssets)
        }
      }, 50)
    }
  }

  return (
    <AnimatePresence mode="wait">
      {showIntro ? (
        <IntroAnimation
          key="intro"
          onComplete={handleIntroComplete}
          duration={3000} // Intro chạy đúng 3 giây
        />
      ) : (
        <div key="main-content" className="relative z-10">
          <Header />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </div>
      )}
    </AnimatePresence>
  )
}