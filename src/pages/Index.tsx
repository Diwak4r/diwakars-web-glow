
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X, Mail, Phone, MapPin, Languages, Award, Briefcase, GraduationCap } from "lucide-react";

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
                  A dedicated BIT student at Himalayan Whitehouse International College and IT support professional at MC Group of Companies,
                  <span className="text-white"> passionate about technology and continuously advancing my skills.</span> 
                  With experience in teaching and troubleshooting, I drive innovation and efficiency in IT operations.
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
                    src="/lovable-uploads/6ffecd06-7dd5-4e79-9d34-6066c7f0f404.png"
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
              <div className="h-1 w-20 bg-primary"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <p className="text-white/80 leading-relaxed">
                  I am Diwakar Ray Yadav, a passionate Bachelor in Information Technology (BIT) student at Himalayan Whitehouse International College, Kathmandu, Nepal. With a strong foundation in computer systems and IT support, I am constantly exploring new technologies to enhance my skills and problem-solving abilities.
                </p>
                <p className="text-white/80 leading-relaxed">
                  Currently, I work as IT Support at MC Group of Companies, where I assist in troubleshooting technical issues, managing IT infrastructure, and optimizing system performance. Prior to this, I worked as an IT Instructor at Shrestha Computer Training Institute and IT Plus Computer Training Centre, teaching students data entry, typing, and computer basics.
                </p>
                <p className="text-white/80 leading-relaxed">
                  As I continue my journey in the tech industry, I aspire to contribute to innovative projects that drive digital transformation and efficiency. My combination of teaching experience and technical skills allows me to approach problems with both analytical precision and clear communication.
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 flex">
                    <GraduationCap className="text-primary mr-4 shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Education</h3>
                      <ul className="text-white/70 space-y-2">
                        <li>BIT at Himalayan Whitehouse International College (2024-Present)</li>
                        <li>Diploma in Computer Application (2023-2024)</li>
                        <li>Intermediate (+2) in Science (2021-2023)</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 flex">
                    <Briefcase className="text-primary mr-4 shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Experience</h3>
                      <ul className="text-white/70 space-y-2">
                        <li>IT Support at MC Group (2024-Present)</li>
                        <li>IT Instructor at Shrestha Computer (2023-2024)</li>
                        <li>IT Instructor at IT Plus Computer (2021-2023)</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 flex">
                    <Award className="text-primary mr-4 shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Skills</h3>
                      <ul className="text-white/70 space-y-1">
                        <li>Microsoft Office Suite</li>
                        <li>Fast and accurate typing</li>
                        <li>Data entry and management</li>
                        <li>Computer troubleshooting</li>
                        <li>Problem-solving</li>
                        <li>Team collaboration</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 flex">
                    <Languages className="text-primary mr-4 shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Languages</h3>
                      <ul className="text-white/70 space-y-2">
                        <li>Nepali: Native</li>
                        <li>English: Fluent</li>
                        <li>Hindi: Proficient</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-white mb-3">Achievements</h3>
                  <ul className="text-white/70 list-disc pl-5 space-y-2">
                    <li>Earned a Diploma in Computer Application with practical skills (2022)</li>
                    <li>Trained over 30 students as an IT Instructor, improving their tech abilities</li>
                    <li>Recognized as a quick learner and calm team player in busy settings</li>
                  </ul>
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
                  Fill out the form or reach out directly through the contact information below.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white text-lg font-medium">Email</h3>
                      <a href="mailto:reachout.diwakar@gmail.com" className="text-white/70 hover:text-primary transition-colors">reachout.diwakar@gmail.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white text-lg font-medium">Phone</h3>
                      <a href="tel:+9779842612756" className="text-white/70 hover:text-primary transition-colors">+977 9842612756</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white text-lg font-medium">Location</h3>
                      <p className="text-white/70">Kamaladi, Kathmandu, Nepal</p>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-6 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2">
                <h3 className="text-2xl font-semibold text-white mb-4">AI and Its Impact on Students</h3>
                <p className="text-white/70 mb-4">
                  In today's rapidly evolving educational landscape, artificial intelligence is transforming how students learn, research, and prepare for their futures...
                </p>
                <Button 
                  className="bg-white/10 hover:bg-white/20 text-white"
                  asChild
                >
                  <Link to="/blogs/ai-impact-on-students">Read More</Link>
                </Button>
              </div>
              
              <div className="glass-card p-6 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2">
                <h3 className="text-2xl font-semibold text-white mb-4">How to Make a Website in 2025 (No Code)</h3>
                <p className="text-white/70 mb-4">
                  The web development landscape has dramatically evolved, making it easier than ever to create professional websites without writing a single line of code...
                </p>
                <Button 
                  className="bg-white/10 hover:bg-white/20 text-white"
                  asChild
                >
                  <Link to="/blogs/no-code-websites-2025">Read More</Link>
                </Button>
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
    </>
  );
};

export default Index;
