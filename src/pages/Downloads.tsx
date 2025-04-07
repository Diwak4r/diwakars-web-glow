
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Downloads = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);

  // Handle cursor movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 rounded-full border-2 border-primary pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out"
      ></div>

      <div className="min-h-screen bg-black text-white">
        <header className="fixed top-0 left-0 w-full z-30 bg-white/5 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex justify-between items-center">
            <div className="text-2xl font-semibold text-white">
              <Link to="/">Diwakar</Link>
            </div>
            
            <Button 
              className="bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 rounded-md"
              asChild
            >
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </header>

        <main className="pt-24 pb-16">
          <section className="py-16 px-6 md:px-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-8 text-gradient">Downloads</h1>
              <p className="text-xl text-white/70 max-w-3xl mb-12 leading-relaxed">
                Access and download resources, documents, and tools that I've created or found useful in my tech journey.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {/* Download Card 1 */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10 group">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Police Exam Study Guide</h3>
                    <p className="text-white/70 mb-6">A comprehensive guide for police examination preparation.</p>
                    <div className="flex justify-between items-center">
                      <span className="text-white/50 text-sm">PDF • 2.4 MB</span>
                      <Button 
                        className="bg-primary/20 hover:bg-primary/30 text-primary-foreground rounded-full w-10 h-10 p-0 flex items-center justify-center"
                        asChild
                      >
                        <a href="#" download>
                          <Download className="h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Download Card 2 */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10 group">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">IT Support Checklist</h3>
                    <p className="text-white/70 mb-6">A handy checklist for common IT support tasks and troubleshooting.</p>
                    <div className="flex justify-between items-center">
                      <span className="text-white/50 text-sm">PDF • 1.2 MB</span>
                      <Button 
                        className="bg-primary/20 hover:bg-primary/30 text-primary-foreground rounded-full w-10 h-10 p-0 flex items-center justify-center"
                        asChild
                      >
                        <a href="#" download>
                          <Download className="h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Download Card 3 */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10 group">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Network Configuration Guide</h3>
                    <p className="text-white/70 mb-6">Step-by-step guide for basic network setup and configuration.</p>
                    <div className="flex justify-between items-center">
                      <span className="text-white/50 text-sm">PDF • 3.1 MB</span>
                      <Button 
                        className="bg-primary/20 hover:bg-primary/30 text-primary-foreground rounded-full w-10 h-10 p-0 flex items-center justify-center"
                        asChild
                      >
                        <a href="#" download>
                          <Download className="h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Coming Soon Card */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10 group col-span-1 md:col-span-2 lg:col-span-3">
                  <div className="p-8 text-center">
                    <h3 className="text-2xl font-semibold text-white mb-4">More Resources Coming Soon</h3>
                    <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                      I'm working on creating more valuable resources and tools. Check back soon or subscribe to be notified when new downloads are available.
                    </p>
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      Subscribe for Updates
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-white/5 backdrop-blur-sm border-t border-white/10 py-8 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <p className="text-white/60">&copy; {new Date().getFullYear()} Made with ❤️ by Diwakar Ray Yadav</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Downloads;
