import AnimatedBackground from "@/components/animated-background"
import PortfolioWrapper from "@/components/portfolio-wrapper"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-50 to-green-100">
      <AnimatedBackground />
      <PortfolioWrapper />
    </main>
  )
}