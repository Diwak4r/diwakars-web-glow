
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogAIImpact = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    <div className="min-h-screen bg-black text-white">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
      ></canvas>
      
      <header className="fixed top-0 left-0 w-full z-30 bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex justify-between items-center">
          <div className="text-2xl font-semibold text-white">
            <Link to="/">Diwakar</Link>
          </div>
          
          <Button 
            className="bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 rounded-md"
            asChild
          >
            <Link to="/#blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>
          </Button>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6 md:px-8">
        <article className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-xl">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">AI and Its Impact on Students</h1>
              <p className="text-white/60 text-sm">Published on April 5, 2025 · 8 min read</p>
            </div>
            <Button 
              className="bg-white/5 hover:bg-white/10 text-white h-10 w-10 p-0 rounded-full"
              title="Share this post"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-white/80 leading-relaxed mb-6">
              In today's rapidly evolving educational landscape, artificial intelligence is transforming how students learn, research, and prepare for their futures. This technological revolution brings both tremendous opportunities and significant challenges for students at all levels of education.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">The Changing Face of Learning</h2>
            <p className="text-white/80 leading-relaxed mb-6">
              AI-powered educational tools are personalizing the learning experience in unprecedented ways. Adaptive learning platforms can now analyze a student's strengths, weaknesses, and learning style to create customized curricula that adjust in real-time. For example, if a student struggles with specific algebra concepts, an AI system can identify these gaps and provide targeted exercises and explanations tailored to their needs.
            </p>
            <p className="text-white/80 leading-relaxed mb-6">
              Language learning apps like Duolingo use AI to adapt lesson difficulty based on student performance, while platforms like Khan Academy incorporate intelligent tutoring systems that can identify when a student is struggling and offer alternative explanations. This personalized approach means students can learn at their own pace, receiving the specific support they need when they need it.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">Research and Information Literacy</h2>
            <p className="text-white/80 leading-relaxed mb-6">
              AI has dramatically transformed how students conduct research and process information. Tools like ChatGPT and Google's AI-powered search can generate summaries of complex topics, explain difficult concepts in simpler terms, and help students brainstorm ideas. This accessibility to information has made research more efficient, allowing students to quickly gather background knowledge on virtually any subject.
            </p>
            <p className="text-white/80 leading-relaxed mb-6">
              However, this ease of access comes with new challenges for information literacy. Students must develop critical skills to evaluate AI-generated content, check facts, and recognize potential biases. The ability to discern reliable information from misinformation becomes even more crucial as AI tools become more sophisticated at generating plausible-sounding but potentially inaccurate content.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">Academic Integrity in the AI Era</h2>
            <p className="text-white/80 leading-relaxed mb-6">
              Perhaps no aspect of education has been more disrupted by AI than assessment and academic integrity. With tools that can write essays, solve complex math problems, and even code software applications, educators are grappling with fundamental questions about what constitutes original student work.
            </p>
            <p className="text-white/80 leading-relaxed mb-6">
              Many institutions are responding by reimagining assessment. In-class examinations with supervision are gaining renewed importance, while project-based assessments that focus on process rather than just the final product help ensure students demonstrate their own learning. Some educators are even embracing AI as a collaborative tool, asking students to critically evaluate and improve upon AI-generated work.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">Preparing for an AI-Enhanced Workforce</h2>
            <p className="text-white/80 leading-relaxed mb-6">
              As AI continues to transform industries, students today are preparing for careers that will almost certainly involve collaboration with intelligent systems. The ability to effectively prompt, guide, and critically evaluate AI outputs is becoming a valuable skill across professions.
            </p>
            <p className="text-white/80 leading-relaxed mb-6">
              Forward-thinking educational institutions are incorporating AI literacy into their curricula, teaching students not just how to use these tools but how to understand their limitations, biases, and ethical implications. Students who understand how to leverage AI as a complement to human creativity and critical thinking will be better positioned for success in tomorrow's workplace.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">The Digital Divide Challenge</h2>
            <p className="text-white/80 leading-relaxed mb-6">
              While AI offers tremendous potential to improve educational outcomes, there's a risk that these benefits will not be distributed equally. Access to AI-powered educational tools requires reliable internet connections, suitable devices, and sometimes subscription costs that may be prohibitive for some students.
            </p>
            <p className="text-white/80 leading-relaxed mb-6">
              Educational institutions and policymakers must work to ensure that AI enhances rather than exacerbates existing inequalities in education. This includes investing in infrastructure, providing technology access programs, and developing offline AI solutions for regions with limited connectivity.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">Conclusion: Embracing AI as a Partner in Learning</h2>
            <p className="text-white/80 leading-relaxed mb-6">
              For today's students, AI represents both a powerful tool and a complex challenge. When approached thoughtfully, AI can enhance learning experiences, make education more accessible and personalized, and help prepare students for a rapidly evolving future. The most successful students will be those who learn to use AI as a supplement to—rather than a replacement for—their own critical thinking, creativity, and human connection.
            </p>
            <p className="text-white/80 leading-relaxed">
              As we navigate this technological transition, the fundamental goals of education remain unchanged: to foster curiosity, develop critical thinking skills, and prepare students to make meaningful contributions to society. AI is simply a new and powerful tool in service of these enduring educational values.
            </p>
          </div>
        </article>
      </main>

      <footer className="bg-white/5 backdrop-blur-sm border-t border-white/10 py-8 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-white/60">&copy; {new Date().getFullYear()} Made with ❤️ by Diwakar Ray Yadav</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogAIImpact;
