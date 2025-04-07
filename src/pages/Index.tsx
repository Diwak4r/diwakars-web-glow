
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Initialize particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }> = [];

    // Create particles
    for (let i = 0; i < 80; i++) {
      const size = Math.random() * 3 + 1;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const speedX = Math.random() * 0.5 - 0.25;
      const speedY = Math.random() * 0.5 - 0.25;
      const color = `rgba(190, 190, 190, ${Math.random() * 0.2 + 0.1})`;
      particles.push({ x, y, size, speedX, speedY, color });
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Draw connections
        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(190, 190, 190, ${0.2 - distance / 600})`;
            ctx.lineWidth = 0.2;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 rounded-full border-2 border-primary pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out"
      ></div>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
      ></canvas>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black/95 z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
        <button 
          className="absolute top-6 right-6 text-white" 
          onClick={() => setIsMenuOpen(false)}
        >
          <X size={24} />
        </button>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <Link to="/" className="text-white text-xl font-light hover:text-primary transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/portfolio" className="text-white text-xl font-light hover:text-primary transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>Portfolio</Link>
          <a href="#about" className="text-white text-xl font-light hover:text-primary transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#contact" className="text-white text-xl font-light hover:text-primary transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>Contact</a>
          <a href="#blogs" className="text-white text-xl font-light hover:text-primary transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>Blogs</a>
          <Link to="/downloads" className="text-white text-xl font-light hover:text-primary transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>Downloads</Link>
        </div>
      </div>
    
      <header className="fixed top-0 left-0 w-full z-30 bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex justify-between items-center">
          <div className="text-2xl font-semibold text-white">
            <Link to="/">Diwakar</Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-8">
              <li><Link to="/" className="text-white/80 hover:text-white transition-colors text-sm uppercase tracking-wider">Home</Link></li>
              <li><Link to="/portfolio" className="text-white/80 hover:text-white transition-colors text-sm uppercase tracking-wider">Portfolio</Link></li>
              <li><a href="#about" className="text-white/80 hover:text-white transition-colors text-sm uppercase tracking-wider">About</a></li>
              <li><a href="#contact" className="text-white/80 hover:text-white transition-colors text-sm uppercase tracking-wider">Contact</a></li>
              <li><a href="#blogs" className="text-white/80 hover:text-white transition-colors text-sm uppercase tracking-wider">Blogs</a></li>
              <li><Link to="/downloads" className="text-white/80 hover:text-white transition-colors text-sm uppercase tracking-wider">Downloads</Link></li>
            </ul>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="text-white lg:hidden" 
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center px-6 md:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-fade-in">
                <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
                  WELCOME, <br />
                  <span className="text-gradient">I am Diwakar</span>
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
                  A dedicated BIT student and IT support professional, 
                  <span className="text-white"> passionate about technology and continuously advancing my skills.</span> 
                  I play an integral role at MC Group of Companies, driving innovation and efficiency in IT operations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="group bg-gradient-to-br from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 rounded-md py-6 px-6 text-base"
                    asChild
                  >
                    <Link to="/portfolio">
                      View Portfolio
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button 
                    className="bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 rounded-md py-6 px-6 text-base"
                    asChild
                  >
                    <a href="#contact">Contact Me</a>
                  </Button>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="glass-card relative h-[400px] w-full rounded-2xl overflow-hidden transform rotate-3 shadow-2xl">
                  <img
                    src="https://4kwallpapers.com/images/walls/thumbs_3t/20245.jpg"
                    alt="Diwakar Ray Yadav"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-primary/20 backdrop-blur-xl z-10"></div>
                <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full bg-white/5 backdrop-blur-xl z-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Projects</h2>
              <div className="h-1 w-20 bg-primary"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <a 
                href="https://project.diwakaryadav.com.np" 
                className="group project-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://4kwallpapers.com/images/walls/thumbs_3t/20245.jpg" 
                    alt="Police Exam Prep" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Police Exam Prep</h3>
                  <p className="text-white/70">The ultimate guide you need for police examination preparation</p>
                </div>
              </a>
              
              {/* Additional project cards can be added here */}
              <div className="project-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-white/5">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-white/70 text-center">More projects coming soon</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Coming Soon</h3>
                  <p className="text-white/70">Stay tuned for more exciting projects</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 md:px-8 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About</h2>
              <div className="h-1 w-20 bg-primary"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-white/80 leading-relaxed">
                  I am Diwakar Ray Yadav, a passionate Bachelor in Information Technology (BIT) student at Himalayan Whitehouse International College, Kathmandu, Nepal. With a good foundation in Computer systems, and IT support, I am constantly exploring new technologies to enhance my skills and problem-solving abilities.
                </p>
                <p className="text-white/80 leading-relaxed">
                  Currently, I work as an IT Support at MC Group of Companies, where I assist in troubleshooting technical issues, managing IT infrastructure, and optimizing system performance with Essentials.
                </p>
                <p className="text-white/80 leading-relaxed">
                  As I continue my journey in the tech industry, I aspire to contribute to innovative projects that drive digital transformation and efficiency.
                </p>
              </div>
              
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-white mb-3">Education</h3>
                    <p className="text-white/70">BIT at Himalayan Whitehouse International College</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-white mb-3">Experience</h3>
                    <p className="text-white/70">IT Support at MC Group of Companies</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-white mb-3">Skills</h3>
                    <p className="text-white/70">IT Support, Infrastructure Management, Problem Solving</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-white mb-3">Interests</h3>
                    <p className="text-white/70">Technology, Digital Transformation, Innovation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact</h2>
              <div className="h-1 w-20 bg-primary"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <p className="text-white/80 leading-relaxed">
                  Interested in collaborating or have questions? I'd love to hear from you. 
                  Fill out the form or reach out directly through my social media profiles.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white text-lg font-medium">Email</h3>
                      <p className="text-white/70">contact@diwakaryadav.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white text-lg font-medium">Location</h3>
                      <p className="text-white/70">Kathmandu, Nepal</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white/80 text-sm font-medium mb-2">NAME</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">EMAIL</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white/80 text-sm font-medium mb-2">MESSAGE</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                  ></textarea>
                </div>
                
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md py-6 px-6 text-base w-full sm:w-auto"
                  type="submit"
                >
                  SEND MESSAGE
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blogs" className="py-24 px-6 md:px-8 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Blogs</h2>
              <div className="h-1 w-20 bg-primary"></div>
            </div>
            
            <div className="text-center py-12">
              <p className="text-white/80 text-lg">Blog posts coming soon. Stay tuned for insights and updates.</p>
              <Button 
                className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 rounded-md py-6 px-6 text-base"
              >
                Notify Me When Available
              </Button>
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
    </>
  );
};

export default Index;
