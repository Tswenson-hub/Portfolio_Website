import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from "./imports/svg-6sovak61ez";
import profilePhoto from "figma:asset/c86dbcde7cfbf13fce5e426961d7f6c95dc9031d.png";

function Navigation() {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications/Education' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1f1f1f]/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-['Poppins:Regular',_sans-serif] text-[18px] transition-colors duration-200 ${
                  activeSection === item.id ? 'text-[#0FFCBE]' : 'text-[#106EBE] hover:text-[#0FFCBE]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-6">
            <div className="h-11 w-px bg-[#106EBE]" />
            <div className="flex gap-6">
              <ContactIcon type="email" value="tyswenson34@gmail.com" />
              <ContactIcon type="phone" value="(615) 389-8338" />
              <SocialIcon type="linkedin" url="https://www.linkedin.com/in/ty-swenson/" />
              <SocialIcon type="github" url="https://github.com/Tswenson-hub" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function SocialIcon({ type, url }: { type: 'linkedin' | 'github'; url: string }) {
  const getPath = () => {
    if (type === 'linkedin') {
      return (
        <>
          <path
            d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <rect
            x="2"
            y="9"
            width="4"
            height="12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <circle
            cx="4"
            cy="4"
            r="2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </>
      );
    } else {
      return (
        <path
          d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      );
    }
  };

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-[#106EBE] hover:text-[#0FFCBE] transition-colors duration-200"
    >
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
        {getPath()}
      </svg>
    </a>
  );
}

function ContactIcon({ type, value }: { type: 'email' | 'phone'; value: string }) {
  const getIcon = () => {
    if (type === 'email') {
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      );
    } else {
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      );
    }
  };

  const href = type === 'email' ? `mailto:${value}` : `tel:${value.replace(/[^\d]/g, '')}`;

  return (
    <div className="relative group">
      <a 
        href={href}
        className="text-[#106EBE] hover:text-[#0FFCBE] transition-colors duration-200"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {getIcon()}
        </svg>
      </a>
      
      {/* Hover dropdown */}
      <div className="absolute right-0 top-full mt-2 px-3 py-2 bg-[#1f1f1f] border border-[#106EBE]/20 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50 min-w-max">
        <div className="text-[#0FFCBE] font-['Poppins:Bold',_sans-serif] text-[12px] mb-1">
          {type === 'email' ? 'Email' : 'Phone'}
        </div>
        <div className="text-[#106EBE] font-['Poppins:Medium',_sans-serif] text-[14px]">
          {value}
        </div>
        {/* Arrow pointing up */}
        <div className="absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-[#1f1f1f]"></div>
      </div>
    </div>
  );
}

function TypewriterText() {
  const [showInitial, setShowInitial] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const fullText = "I'm a product manager who codes and a developer who ships products. Currently pursuing my M.S. in Computer Science at UT Knoxville while leading enterprise product strategy at Tractor Supply Company, where I've delivered solutions with multi-million dollar impact across 2,000+ stores.\n\nI build at the intersection of AI/ML and business value—from architecting machine learning pipelines for product classification systems to advising healthcare startups on AI strategy. My GitHub is where theory meets practice: RAG-powered LLMs for automotive data, computer vision baby monitors, and supply chain optimization tools.";

  useEffect(() => {
    // Wait 3 seconds, then start typewriter effect
    const initialTimer = setTimeout(() => {
      setShowInitial(false);
    }, 3000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (!showInitial && currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30); // Adjust speed here (30ms per character)

      return () => clearTimeout(timer);
    }
  }, [showInitial, currentIndex, fullText]);

  if (showInitial) {
    return (
      <div className="space-y-4">
        <h2 className="font-['Poppins:Bold',_sans-serif] text-[24px] text-[#0FFCBE]">
          Hi, I'm Tyler
        </h2>
        <h1 className="font-['Poppins:Bold',_sans-serif] text-[64px] lg:text-[96px] leading-[0.9] text-[#106EBE]">
          I'M A PRODUCT<br />MANAGER
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="min-h-[400px]">
        <p className="font-['Poppins:Regular',_sans-serif] text-[24px] text-[#106EBE]/70 leading-[1.5] whitespace-pre-line">
          {displayedText}
          <span className="animate-pulse text-[#0FFCBE]">|</span>
        </p>
      </div>
    </div>
  );
}

function TechBox({ name }: { name: string }) {
  return (
    <div className="flex-shrink-0 mx-4 px-6 py-3 bg-[#106EBE]/10 border border-[#106EBE]/30 rounded-xl backdrop-blur-sm hover:bg-[#0FFCBE]/10 hover:border-[#0FFCBE]/50 transition-all duration-300">
      <span className="font-['Poppins:Medium',_sans-serif] text-[16px] text-[#106EBE] whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

function ConveyorBelt() {
  const technologies = [
    'Python', 'Figma', 'Jira', 'Confluence', 'SAP', 'Azure', 
    'AWS', 'Raspberry Pi', 'Nvidia-Jetson', 'Snowflake', 'Oracle', 'Javascript'
  ];

  // Duplicate the array to create seamless looping
  const duplicatedTechs = [...technologies, ...technologies];

  return (
    <div className="w-full overflow-hidden py-6 relative">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#1f1f1f] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#1f1f1f] to-transparent z-10 pointer-events-none" />
      
      <div className="flex animate-conveyor">
        {duplicatedTechs.map((tech, index) => (
          <TechBox key={`${tech}-${index}`} name={tech} />
        ))}
      </div>
    </div>
  );
}

function HeroSection() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen relative flex flex-col justify-center overflow-hidden">
      {/* Background blur effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[905px] h-[897px]">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1417 1409">
              <defs>
                <filter id="blur" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                  <feGaussianBlur stdDeviation="128" />
                </filter>
              </defs>
              <ellipse
                cx="708.5"
                cy="704.5"
                rx="452.5"
                ry="448.5"
                fill="#106EBE"
                filter="url(#blur)"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
        {/* Left content */}
        <div className="space-y-8">
          <TypewriterText />
          
          <button 
            onClick={scrollToProjects}
            className="group border-2 border-[#0FFCBE] px-8 py-4 rounded-2xl transition-all duration-300 hover:bg-[#0FFCBE] hover:text-[#1f1f1f]"
          >
            <span className="font-['Poppins:Bold',_sans-serif] text-[24px] text-[#0FFCBE] group-hover:text-[#1f1f1f] transition-colors duration-300">
              VIEW MY PROJECTS
            </span>
          </button>
        </div>

        {/* Right content - Profile image */}
        <div className="relative">
          <div
            className="w-full h-[400px] lg:h-[600px] bg-cover bg-center bg-no-repeat rounded-lg relative overflow-hidden"
            style={{ backgroundImage: `url('${profilePhoto}')` }}
          >
            {/* Edge blur overlay */}
            <div 
              className="absolute inset-0 rounded-lg"
              style={{
                background: `radial-gradient(ellipse 70% 85% at 50% 35%, transparent 40%, rgba(31, 31, 31, 0.3) 70%, rgba(31, 31, 31, 0.8) 90%, #1f1f1f 100%)`
              }}
            />
          </div>
        </div>
      </div>

      {/* Technology Conveyor Belt */}
      <div className="relative w-full">
        <ConveyorBelt />
      </div>
    </section>
  );
}



function ExperienceItem({ title, period, description }: { title: string; period: string; description: string }) {
  return (
    <div className="max-w-4xl">
      <h4 className="font-['Poppins:ExtraBold',_sans-serif] text-[24px] text-[#106EBE] mb-1">
        {title}
      </h4>
      <p className="font-['Poppins:ExtraLight',_sans-serif] text-[24px] text-[#0FFCBE] mb-3">
        {period}
      </p>
      <p className="font-['Poppins:Medium',_sans-serif] text-[24px] text-[#106EBE]/70 leading-[1.5]">
        {description}
      </p>
    </div>
  );
}

function ProjectBubble({ 
  title, 
  url, 
  anyHovered,
  isThisHovered, 
  onHoverStart, 
  onHoverEnd,
  slideDirection 
}: { 
  title: string; 
  url?: string; 
  anyHovered?: boolean;
  isThisHovered?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  slideDirection?: 'left' | 'right' | 'bottom' | 'top';
}) {
  const handleClick = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const getSlideAnimation = () => {
    if (!anyHovered || isThisHovered) return { x: 0, y: 0, opacity: 1 };
    
    switch (slideDirection) {
      case 'left':
        return { x: -1000, y: 0, opacity: 0 };
      case 'right':
        return { x: 1000, y: 0, opacity: 0 };
      case 'top':
        return { x: 0, y: -800, opacity: 0 };
      case 'bottom':
        return { x: 0, y: 800, opacity: 0 };
      default:
        return { x: 0, y: 0, opacity: 1 };
    }
  };

  const Component = url ? 'button' : 'div';

  return (
    <motion.div
      animate={getSlideAnimation()}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className={isThisHovered && anyHovered ? 'z-50' : ''}
    >
      <Component 
        onClick={url ? handleClick : undefined}
        className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-xl border-[#106EBE]/30 bg-[#106EBE]/5 hover:border-[#0FFCBE] hover:bg-[#0FFCBE]/10 ${
          url ? 'hover:ring-2 hover:ring-[#0FFCBE]/50' : ''
        }`}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0FFCBE]/20 to-[#106EBE]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
        
        <h3 className="font-['Poppins:Bold',_sans-serif] text-[20px] text-center transition-colors duration-300 text-[#106EBE] group-hover:text-[#0FFCBE]">
          {title}
        </h3>
        
        {/* External link indicator */}
        {url && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-4 h-4 text-[#0FFCBE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        )}
      </Component>
    </motion.div>
  );
}

function ProjectsSection() {
  const [isOzerHovered, setIsOzerHovered] = useState(false);
  const [isWeTeachFreightHovered, setIsWeTeachFreightHovered] = useState(false);

  const allProjects = [
    { title: "Ozer Health", url: "https://ozerhealth.com" },
    { title: "We-Teach-Freight", url: "https://we-teach-freight.com/" },
    { title: "Agile Project Management" },
    { title: "Computer Vision" },
    { title: "Data Analysis" },
    { title: "Machine Learning/AI" }
  ];

  const anyHovered = isOzerHovered || isWeTeachFreightHovered;

  return (
    <section 
      id="projects" 
      className="min-h-screen flex flex-col justify-center relative snap-start overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 py-20 relative">
        <h2 className="font-['Poppins:Bold',_sans-serif] text-[96px] text-[#106EBE] mb-16 text-center">
          Projects
        </h2>
        
        <div className="flex flex-col items-center space-y-8 max-w-4xl mx-auto relative">
          {/* Top row - 1 bubble - Ozer Health */}
          <div className="flex justify-center">
            <ProjectBubble 
              title={allProjects[0].title}
              url={allProjects[0].url}
              isThisHovered={isOzerHovered}
              anyHovered={anyHovered}
              onHoverStart={() => setIsOzerHovered(true)}
              onHoverEnd={() => setIsOzerHovered(false)}
              slideDirection="top"
            />
          </div>
          
          {/* Middle row - 2 bubbles */}
          <div className="flex justify-center space-x-8">
            <ProjectBubble 
              title={allProjects[1].title}
              url={allProjects[1].url}
              isThisHovered={isWeTeachFreightHovered}
              anyHovered={anyHovered}
              onHoverStart={() => setIsWeTeachFreightHovered(true)}
              onHoverEnd={() => setIsWeTeachFreightHovered(false)}
              slideDirection="left"
            />
            <ProjectBubble 
              title={allProjects[2].title}
              url={allProjects[2].url}
              anyHovered={anyHovered}
              slideDirection="right"
            />
          </div>
          
          {/* Bottom row - 3 bubbles */}
          <div className="flex justify-center space-x-8">
            <ProjectBubble 
              title={allProjects[3].title}
              url={allProjects[3].url}
              anyHovered={anyHovered}
              slideDirection="bottom"
            />
            <ProjectBubble 
              title={allProjects[4].title}
              url={allProjects[4].url}
              anyHovered={anyHovered}
              slideDirection="bottom"
            />
            <ProjectBubble 
              title={allProjects[5].title}
              url={allProjects[5].url}
              anyHovered={anyHovered}
              slideDirection="bottom"
            />
          </div>
        </div>

        {/* Ozer Health Iframe Preview Window */}
        <AnimatePresence>
          {isOzerHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
              style={{ top: '150px' }}
            >
              <div className="relative w-full max-w-5xl h-[600px] bg-[#1f1f1f] border-4 border-[#0FFCBE] rounded-2xl shadow-2xl overflow-hidden pointer-events-auto">
                {/* Window header */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-[#106EBE]/20 border-b border-[#0FFCBE]/30 flex items-center px-4 z-10">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="font-['Poppins:Medium',_sans-serif] text-[14px] text-[#0FFCBE]">
                      ozerhealth.com - Preview
                    </span>
                  </div>
                </div>
                
                {/* Iframe content */}
                <iframe
                  src="https://ozerhealth.com"
                  className="w-full h-full pt-12"
                  title="Ozer Health Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0FFCBE]/10 to-[#106EBE]/10 opacity-50 pointer-events-none blur-2xl -z-10" 
                  style={{ transform: 'scale(1.1)' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* We-Teach-Freight Iframe Preview Window */}
        <AnimatePresence>
          {isWeTeachFreightHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
              style={{ top: '150px' }}
            >
              <div className="relative w-full max-w-5xl h-[600px] bg-[#1f1f1f] border-4 border-[#0FFCBE] rounded-2xl shadow-2xl overflow-hidden pointer-events-auto">
                {/* Window header */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-[#106EBE]/20 border-b border-[#0FFCBE]/30 flex items-center px-4 z-10">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="font-['Poppins:Medium',_sans-serif] text-[14px] text-[#0FFCBE]">
                      we-teach-freight.com - Preview
                    </span>
                  </div>
                </div>
                
                {/* Iframe content */}
                <iframe
                  src="https://we-teach-freight.com/"
                  className="w-full h-full pt-12"
                  title="We-Teach-Freight Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0FFCBE]/10 to-[#106EBE]/10 opacity-50 pointer-events-none blur-2xl -z-10" 
                  style={{ transform: 'scale(1.1)' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}



function StarIcon({ filled, label, isAnimated = false }: { filled: boolean; label: string; isAnimated?: boolean }) {
  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative">
        <svg 
          className="w-16 h-16 transition-all duration-1000 ease-out" 
          viewBox="0 0 24 24" 
          fill="none"
        >
          {/* Star outline */}
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            stroke="#106EBE"
            strokeWidth="2"
            fill="transparent"
          />
          
          {/* Star fill */}
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill={filled ? "#0FFCBE" : "transparent"}
            className={`transition-all duration-1000 ease-out ${
              isAnimated && filled ? 'animate-pulse' : ''
            }`}
            style={{
              filter: filled ? 'drop-shadow(0 0 8px rgba(15, 252, 190, 0.5))' : 'none'
            }}
          />
        </svg>
        
        {/* Glow effect for filled star */}
        {filled && (
          <div 
            className="absolute inset-0 rounded-full bg-[#0FFCBE]/20 blur-lg opacity-75 animate-pulse"
            style={{ transform: 'scale(1.2)' }}
          />
        )}
      </div>
      
      <span className={`font-['Poppins:Bold',_sans-serif] text-[16px] transition-colors duration-300 ${
        filled ? 'text-[#0FFCBE]' : 'text-[#106EBE]/70'
      }`}>
        {label}
      </span>
    </div>
  );
}

function CourseItem({ code, title, status }: { code: string; title: string; status: 'completed' | 'in-progress' | 'upcoming' }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return {
          bulletColor: 'bg-[#0FFCBE] shadow-lg shadow-[#0FFCBE]/30',
          textColor: 'text-[#106EBE]',
          badgeColor: 'bg-[#0FFCBE]/20 text-[#0FFCBE] border-[#0FFCBE]/30',
          badgeText: '✓ Completed',
          hoverColor: 'hover:bg-[#0FFCBE]/5 hover:border-l-[#0FFCBE]'
        };
      case 'in-progress':
        return {
          bulletColor: 'bg-[#FFA500] shadow-lg shadow-[#FFA500]/30',
          textColor: 'text-[#106EBE]',
          badgeColor: 'bg-[#FFA500]/20 text-[#FFA500] border-[#FFA500]/30',
          badgeText: 'In Progress',
          hoverColor: 'hover:bg-[#FFA500]/5 hover:border-l-[#FFA500]'
        };
      case 'upcoming':
        return {
          bulletColor: 'bg-[#106EBE]/50 group-hover:bg-[#106EBE]',
          textColor: 'text-[#106EBE]/70 group-hover:text-[#106EBE]',
          badgeColor: 'bg-[#106EBE]/10 text-[#106EBE]/70 border-[#106EBE]/20',
          badgeText: 'Upcoming',
          hoverColor: 'hover:bg-[#106EBE]/5 hover:border-l-[#106EBE]'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <li className={`group flex items-start space-x-3 p-3 rounded-lg transition-all duration-300 hover:shadow-md ${config.hoverColor}`}>
      <div className={`w-2 h-2 rounded-full mt-2 transition-all duration-300 ${config.bulletColor}`} />
      <div className="flex-1">
        <span className={`font-['Poppins:Medium',_sans-serif] text-[16px] transition-colors duration-300 ${config.textColor}`}>
          <span className="font-['Poppins:Bold',_sans-serif]">{code}:</span> {title}
        </span>
        <div className={`mt-1 ${status === 'upcoming' ? 'opacity-0 group-hover:opacity-100' : ''} transition-opacity duration-300`}>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-[12px] font-['Poppins:Bold',_sans-serif] border ${config.badgeColor}`}>
            {config.badgeText}
          </span>
        </div>
      </div>
    </li>
  );
}

function CertificationBadge({ title, organization, year, verificationUrl, type }: { 
  title: string; 
  organization: string; 
  year: string; 
  verificationUrl: string; 
  type: 'aws' | 'academic';
}) {
  const getIcon = () => {
    if (type === 'aws') {
      return (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
          {/* AWS Shield Icon */}
          <path
            d="M12 2L4 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-8-4z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M8 11l2 2 4-4"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    } else {
      return (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
          {/* Academic Certificate Icon */}
          <path
            d="M12 2L4 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-8-4z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M9 12l2 2 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="10"
            r="1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      );
    }
  };

  return (
    <a
      href={verificationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block p-6 border-2 border-[#106EBE]/30 rounded-2xl transition-all duration-300 hover:border-[#0FFCBE] hover:bg-[#0FFCBE]/5 hover:scale-105 hover:shadow-xl transform"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0FFCBE]/10 to-[#106EBE]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
      
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Icon */}
        <div className={`p-4 rounded-full border-2 transition-all duration-300 ${
          type === 'aws' 
            ? 'border-[#FF9900]/30 text-[#FF9900] group-hover:border-[#FF9900] group-hover:bg-[#FF9900]/10' 
            : 'border-[#106EBE]/30 text-[#106EBE] group-hover:border-[#0FFCBE] group-hover:text-[#0FFCBE]'
        }`}>
          {getIcon()}
        </div>
        
        {/* Content */}
        <div className="space-y-2">
          <h4 className="font-['Poppins:Bold',_sans-serif] text-[18px] text-[#106EBE] group-hover:text-[#0FFCBE] transition-colors duration-300 line-height-tight">
            {title}
          </h4>
          <p className="font-['Poppins:Medium',_sans-serif] text-[14px] text-[#106EBE]/70 group-hover:text-[#106EBE] transition-colors duration-300">
            {organization}
          </p>
          <p className="font-['Poppins:Regular',_sans-serif] text-[14px] text-[#0FFCBE] opacity-80">
            {year}
          </p>
        </div>
        
        {/* Verify badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#106EBE]/10 border border-[#106EBE]/20 group-hover:bg-[#0FFCBE]/10 group-hover:border-[#0FFCBE]/30 transition-all duration-300">
          <span className="font-['Poppins:Bold',_sans-serif] text-[12px] text-[#106EBE] group-hover:text-[#0FFCBE] transition-colors duration-300">
            🔗 Verify Credential
          </span>
        </div>
      </div>
    </a>
  );
}

function CertificationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [starFilled, setStarFilled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Delay the star fill animation for better visual effect
          setTimeout(() => {
            setStarFilled(true);
          }, 500);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const element = document.getElementById('certifications');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const education = {
    degree: "M.S. in Computer Science",
    concentration: "Data Mining and Intelligent Systems",
    school: "University of Tennessee, Knoxville",
    period: "2024 — Present"
  };

  const completedCourses = [
    { code: "COSC 517", title: "Reinforcement Learning", status: 'completed' as const },
    { code: "COSC 533", title: "Cloud and Web Architecture", status: 'completed' as const },
    { code: "COSC 522", title: "Machine Learning", status: 'completed' as const },
    { code: "COSC 523", title: "Artificial Intelligence", status: 'completed' as const },
    { code: "COSC 583", title: "Applied Cryptography", status: 'in-progress' as const }
  ];

  const upcomingCourses = [
    { code: "COSC 524", title: "Natural Language Processing", status: 'upcoming' as const },
    { code: "COSC 526", title: "Data Engineering", status: 'upcoming' as const },
    { code: "COSC 569", title: "Human Factors in Cybersecurity", status: 'upcoming' as const },
    { code: "COSC 561", title: "Compilers Construction", status: 'upcoming' as const },
    { code: "COSC 545", title: "Digital Archeology", status: 'upcoming' as const }
  ];

  const certifications = [
    {
      title: "AWS Certified Cloud Practitioner",
      organization: "Amazon Web Services",
      year: "2024",
      verificationUrl: "https://www.credly.com/badges/0cbd01ab-f0b7-40d0-99e8-d6878fd48b1b/linked_in_profile",
      type: 'aws' as const
    },
    {
      title: "Post Graduate Program in Data Science and Business Analytics",
      organization: "University of Texas at Austin",
      year: "2023",
      verificationUrl: "https://la.utexas.edu/texasexeced/digitalVerification.html?key=XrGcr",
      type: 'academic' as const
    }
  ];

  return (
    <section 
      id="certifications" 
      className="min-h-screen flex flex-col justify-center relative snap-start"
    >
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-['Poppins:Bold',_sans-serif] text-[96px] text-[#106EBE] mb-16 text-center">
          Certifications/Education
        </h2>
        
        <div className="space-y-16">
          {/* Professional Scrum Product Owner Section */}
          <div className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="text-center mb-12">
              <h3 className="font-['Poppins:Bold',_sans-serif] text-[48px] text-[#106EBE] mb-6">
                Professional Scrum Product Owner
              </h3>
              <p className="font-['Poppins:Regular',_sans-serif] text-[20px] text-[#106EBE]/70 mb-8">
                Scrum Alliance® Certification Track
              </p>
            </div>
            
            <div className="flex justify-center items-center space-x-16 mb-16">
              <StarIcon 
                filled={starFilled} 
                label="PSPO I" 
                isAnimated={starFilled}
              />
              <StarIcon 
                filled={false} 
                label="PSPO II" 
              />
              <StarIcon 
                filled={false} 
                label="PSPO III" 
              />
            </div>
            
            <div className="text-center">
              <p className="font-['Poppins:Medium',_sans-serif] text-[18px] text-[#0FFCBE] mb-2">
                Current Progress: Level I Certified (2024)
              </p>
              <p className="font-['Poppins:Regular',_sans-serif] text-[16px] text-[#106EBE]/70">
                Advanced levels planned for professional development roadmap
              </p>
            </div>
          </div>

          {/* Education Section */}
          <div className={`transition-all duration-1000 ease-out delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-[#106EBE]/5 border border-[#106EBE]/20 rounded-2xl p-8 hover:bg-[#106EBE]/8 hover:border-[#106EBE]/30 transition-all duration-300">
              <h3 className="font-['Poppins:Bold',_sans-serif] text-[32px] text-[#106EBE] mb-6">
                Education
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-['Poppins:Bold',_sans-serif] text-[24px] text-[#0FFCBE]">
                    {education.degree}
                  </h4>
                  <p className="font-['Poppins:Medium',_sans-serif] text-[18px] text-[#106EBE]/80 italic">
                    Concentration: {education.concentration}
                  </p>
                </div>
                <div>
                  <p className="font-['Poppins:Medium',_sans-serif] text-[20px] text-[#106EBE]">
                    {education.school}
                  </p>
                  <p className="font-['Poppins:Regular',_sans-serif] text-[18px] text-[#106EBE]/70">
                    {education.period}
                  </p>
                </div>
                
                {/* Coursework Section */}
                <div className="mt-6 pt-6 border-t border-[#106EBE]/20">
                  <h5 className="font-['Poppins:Bold',_sans-serif] text-[20px] text-[#106EBE] mb-6">
                    Relevant Coursework
                  </h5>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Current/Completed Courses Column */}
                    <div>
                      <ul className="space-y-2">
                        {completedCourses.map((course, index) => (
                          <CourseItem
                            key={index}
                            code={course.code}
                            title={course.title}
                            status={course.status}
                          />
                        ))}
                      </ul>
                    </div>
                    
                    {/* Upcoming Courses Column */}
                    <div>
                      <ul className="space-y-2">
                        {upcomingCourses.map((course, index) => (
                          <CourseItem
                            key={index}
                            code={course.code}
                            title={course.title}
                            status={course.status}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="mt-8 pt-4 border-t border-[#106EBE]/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-['Poppins:Medium',_sans-serif] text-[#106EBE]/70">
                        Progress: {completedCourses.filter(c => c.status === 'completed').length} completed, 1 in progress, {upcomingCourses.length} upcoming
                      </span>
                      <div className="flex space-x-1">
                        {completedCourses.map((course, index) => (
                          <div
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              course.status === 'completed'
                                ? 'bg-[#0FFCBE] shadow-lg shadow-[#0FFCBE]/50' 
                                : course.status === 'in-progress'
                                ? 'bg-[#FFA500] shadow-lg shadow-[#FFA500]/50'
                                : 'bg-[#106EBE]/30'
                            }`}
                          />
                        ))}
                        <div className="w-1 h-3 bg-[#106EBE]/20 rounded-full mx-1" />
                        {upcomingCourses.map((course, index) => (
                          <div
                            key={index}
                            className="w-3 h-3 rounded-full bg-[#106EBE]/20 transition-all duration-300"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Certifications */}
          <div className={`transition-all duration-1000 ease-out delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="text-center mb-8">
              <h3 className="font-['Poppins:Bold',_sans-serif] text-[32px] text-[#106EBE] mb-4">
                Professional Certifications
              </h3>
              <div className="w-16 h-1 mx-auto bg-[#0FFCBE] rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {certifications.map((cert, index) => (
                <CertificationBadge
                  key={index}
                  title={cert.title}
                  organization={cert.organization}
                  year={cert.year}
                  verificationUrl={cert.verificationUrl}
                  type={cert.type}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



export default function App() {
  useEffect(() => {
    // Set document title
    document.title = "Ty Swenson Product Manager";
    
    // Create and set custom favicon
    const setFavicon = () => {
      // Remove existing favicons
      const existingFavicons = document.querySelectorAll("link[rel*='icon']");
      existingFavicons.forEach(icon => icon.remove());
      
      // Create SVG favicon with initials "TS"
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <rect width="100" height="100" fill="#106EBE" rx="20"/>
          <text x="50" y="70" font-family="Arial, sans-serif" font-size="50" font-weight="bold" fill="#0FFCBE" text-anchor="middle">TS</text>
        </svg>
      `;
      
      const favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/svg+xml';
      favicon.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
      document.head.appendChild(favicon);
    };
    
    setFavicon();
  }, []);

  return (
    <div className="bg-[#1f1f1f] min-h-screen text-white">
      <Navigation />
      <main className="scroll-smooth snap-y snap-mandatory">
        <HeroSection />
        <ProjectsSection />
        <CertificationsSection />
      </main>
    </div>
  );
}