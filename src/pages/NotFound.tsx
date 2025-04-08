
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Handle cursor movement
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [location.pathname]);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 rounded-full border-2 border-primary pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out"
      ></div>

      <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
        <div className="text-center max-w-md">
          <div className="glitch-wrapper">
            <h1 className="text-8xl font-bold mb-4 text-gradient glitch-text">404</h1>
          </div>
          <p className="text-xl text-white/70 mb-8">Oops! The page you're looking for doesn't exist.</p>
          <Button className="bg-primary hover:bg-primary/90 text-white" asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>

      <style>
        {`
          .glitch-wrapper {
            position: relative;
            display: inline-block;
          }
          
          .glitch-text {
            position: relative;
            animation: glitch 2s infinite;
          }
          
          .glitch-text::before,
          .glitch-text::after {
            content: "404";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: black;
          }
          
          .glitch-text::before {
            color: #0ff;
            z-index: -1;
            animation: glitch-effect 2s infinite;
          }
          
          .glitch-text::after {
            color: #f0f;
            z-index: -2;
            animation: glitch-effect 3s infinite;
          }
          
          @keyframes glitch-effect {
            0% {
              transform: translate(0);
            }
            20% {
              transform: translate(-5px, 5px);
            }
            40% {
              transform: translate(-5px, -5px);
            }
            60% {
              transform: translate(5px, 5px);
            }
            80% {
              transform: translate(5px, -5px);
            }
            100% {
              transform: translate(0);
            }
          }
          
          @keyframes glitch {
            0% {
              opacity: 1;
            }
            80% {
              opacity: 1;
            }
            83% {
              opacity: 0;
            }
            83.5% {
              opacity: 1;
            }
            84% {
              opacity: 0;
            }
            84.5% {
              opacity: 1;
            }
            85% {
              opacity: 0;
            }
            85.5% {
              opacity: 1;
            }
            86% {
              opacity: 0;
            }
            86.5% {
              opacity: 1;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
};

export default NotFound;
