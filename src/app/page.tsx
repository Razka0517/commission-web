import CommissionWidget from "@/components/CommissionWidget";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-deep-purple relative flex flex-col font-sans">
      <Navbar />

      <div className="fixed inset-0 w-full h-full -z-10">
        <Image 
          src="/library-bg.webp" 
          alt="Library Background" 
          fill 
          className="object-cover opacity-10" 
          priority
        />
      </div>

      <div className="flex-grow pt-32 pb-20 px-4 md:px-8 relative z-10">
        
        {/* Header Intro */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 font-header text-deep-purple">
            Commission <span className="text-accent-red">Menu</span>
          </h1>
          <p className="text-deep-purple/60 max-w-lg mx-auto font-medium">
            Welcome to my workspace. Please choose a category below.
          </p>
        </div>

        {/* Widget Komisi */}
        <CommissionWidget />

      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-deep-purple/40 text-xs border-t border-deep-purple/5 relative z-30">
        &copy; 2026 reinakocchi. All rights reserved.
      </footer>

    </main>
  );
}