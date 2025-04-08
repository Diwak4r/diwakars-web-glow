import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Portfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

  // Timeline scrolling animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      timelineItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 rounded-full border-2 border-primary pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out"
      ></div>

      <div className="min-h-screen bg-black text-white overflow-hidden">
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

        <main className="pt-24 pb-16 relative z-10">
          {/* Hero Section */}
          <section className="py-16 px-6 md:px-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-8 text-gradient">My Journey</h1>
              <p className="text-xl text-white/70 max-w-3xl mb-12 leading-relaxed">
                Explore my professional journey through education, work experiences, and projects that have shaped my career in technology.
              </p>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="py-12 px-6 md:px-8">
            <div className="max-w-5xl mx-auto">
              <div ref={timelineRef} className="relative">
                {/* Line */}
                <div className="absolute top-0 bottom-0 left-16 md:left-1/2 w-1 bg-white/10 transform -translate-x-1/2"></div>
                
                {/* Timeline Items */}
                <div className="space-y-24">
                  {/* Item 1 */}
                  <div className="timeline-item opacity-0 relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="md:text-right md:pr-16">
                      <div className="mb-4">
                        <span className="text-white/50 text-sm uppercase tracking-wider">2023 - Present</span>
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-3">IT Support at MC Group</h3>
                      <p className="text-white/70 leading-relaxed">
                        Working as IT Support, managing infrastructure, troubleshooting technical issues, and optimizing system performance.
                      </p>
                    </div>
                    
                    <div className="hidden md:block"></div>
                    
                    {/* Dot */}
                    <div className="absolute top-0 left-16 md:left-1/2 w-8 h-8 bg-primary rounded-full transform -translate-x-1/2 z-10"></div>
                  </div>
                  
                  {/* Item 2 */}
                  <div className="timeline-item opacity-0 relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="hidden md:block"></div>
                    
                    <div className="md:pl-16">
                      <div className="mb-4">
                        <span className="text-white/50 text-sm uppercase tracking-wider">2022 - Present</span>
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-3">BIT at Himalayan Whitehouse</h3>
                      <p className="text-white/70 leading-relaxed">
                        Pursuing a Bachelor's in Information Technology, focusing on computer systems, programming, and IT infrastructure.
                      </p>
                    </div>
                    
                    {/* Dot */}
                    <div className="absolute top-0 left-16 md:left-1/2 w-8 h-8 bg-primary rounded-full transform -translate-x-1/2 z-10"></div>
                  </div>
                  
                  {/* Item 3 */}
                  <div className="timeline-item opacity-0 relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="md:text-right md:pr-16">
                      <div className="mb-4">
                        <span className="text-white/50 text-sm uppercase tracking-wider">2023</span>
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-3">Police Exam Prep Project</h3>
                      <p className="text-white/70 leading-relaxed">
                        Developed a comprehensive guide for police examination preparation, making information accessible to aspiring candidates.
                      </p>
                      <a 
                        href="https://project.diwakaryadav.com.np" 
                        className="inline-block mt-4 text-primary hover:text-primary/80 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project →
                      </a>
                    </div>
                    
                    <div className="hidden md:block"></div>
                    
                    {/* Dot */}
                    <div className="absolute top-0 left-16 md:left-1/2 w-8 h-8 bg-primary rounded-full transform -translate-x-1/2 z-10"></div>
                  </div>
                  
                  {/* Item 4 */}
                  <div className="timeline-item opacity-0 relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="hidden md:block"></div>
                    
                    <div className="md:pl-16">
                      <div className="mb-4">
                        <span className="text-white/50 text-sm uppercase tracking-wider">2021</span>
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-3">Early Technology Exploration</h3>
                      <p className="text-white/70 leading-relaxed">
                        Began exploring technology fields, building foundational knowledge in computer systems and networks that would shape my career path.
                      </p>
                    </div>
                    
                    {/* Dot */}
                    <div className="absolute top-0 left-16 md:left-1/2 w-8 h-8 bg-primary rounded-full transform -translate-x-1/2 z-10"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="py-16 px-6 md:px-8 bg-white/5 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">My Skills</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-white mb-4">IT Support</h3>
                  <p className="text-white/70 mb-4">Experienced in providing technical assistance, troubleshooting, and maintaining IT systems.</p>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-white mb-4">Network Management</h3>
                  <p className="text-white/70 mb-4">Skilled in configuring, managing, and troubleshooting network infrastructure.</p>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-white mb-4">System Administration</h3>
                  <p className="text-white/70 mb-4">Proficient in managing and maintaining computer systems and servers.</p>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-white mb-4">Problem Solving</h3>
                  <p className="text-white/70 mb-4">Strong analytical and problem-solving skills to address technical challenges.</p>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "95%" }}></div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-white mb-4">Technical Communication</h3>
                  <p className="text-white/70 mb-4">Effective communication of technical concepts to non-technical stakeholders.</p>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-white mb-4">Project Management</h3>
                  <p className="text-white/70 mb-4">Experience in planning, executing, and overseeing IT-related projects.</p>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
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

export default Portfolio;
