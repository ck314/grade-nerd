import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Calculator, Music, Brain, ChevronRight, Menu, X, Lightbulb } from 'lucide-react';
import { Button } from './components/ui/Button';
import { EducationalPanel } from './components/ui/EducationalPanel';
import { StickFigure } from './components/graphics/StickFigures';
import { HelpUsBuild } from './pages/HelpUsBuild';
import { Survey } from './pages/Survey';
import { Demo, TopicView, InterestView, ContentView } from './pages/demo';

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fadeIn = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.5
    }
  };
  return <div className="min-h-screen bg-graph-paper font-sans text-[#111]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b-2 border-black px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white">
              <span className="font-bold text-xl">gn</span>
            </div>
            <span className="font-bold text-xl tracking-tight">Grade Nerd</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="font-medium hover:text-[#0066FF] transition-colors">
              How It Works
            </a>
            <a href="#examples" className="font-medium hover:text-[#0066FF] transition-colors">
              Examples
            </a>
            <Link to="/helpwithdata">
              <Button size="sm">Help Us Build</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && <div className="md:hidden absolute top-full left-0 w-full bg-white border-b-2 border-black p-4 flex flex-col gap-4 shadow-lg">
            <a href="#how-it-works" className="font-medium py-2">
              How It Works
            </a>
            <a href="#examples" className="font-medium py-2">
              Examples
            </a>
            <Link to="/helpwithdata" className="w-full">
              <Button className="w-full">Help Us Build</Button>
            </Link>
          </div>}
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="initial" animate="animate" variants={fadeIn} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-sm font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066FF]"></span>
              </span>
              Now with AI-powered personalization
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Learn Math Through <br />
              <span className="text-[#0066FF] underline decoration-4 underline-offset-4 decoration-black/10">
                What You Love
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              Connect any math concept to your real-world interests. From{' '}
              <span className="font-semibold text-black">Linear Equations</span>{' '}
              to <span className="font-semibold text-black">Formula 1</span> in
              seconds.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/demo">
                <Button size="lg" className="shadow-educational hover:shadow-educational-hover">
                  Try The Demo <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-4 text-sm text-gray-500 font-medium">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
                    {String.fromCharCode(64 + i)}
                  </div>)}
              </div>
              <p>Soon to be trusted by 10,000+ students</p>
            </div>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: 0.2,
          duration: 0.6
        }} className="relative">
            {/* Hero Illustration Panel */}
            <EducationalPanel className="relative z-10 bg-white rotate-2 max-w-md mx-auto lg:ml-auto">
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-100"></div>
              <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="font-bold text-xl">The Concept Bridge</h3>
                  <p className="text-sm text-gray-500">
                    Connecting theory to reality
                  </p>
                </div>
                <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                  GENERATED
                </div>
              </div>

              <div className="relative h-64 mb-6 bg-gray-50 rounded-lg border border-gray-200 p-4 overflow-hidden">
                {/* Graph visualization */}
                <div className="absolute bottom-0 left-0 w-full h-full p-4">
                  <div className="w-full h-full border-l-2 border-b-2 border-black relative">
                    {/* The Line */}
                    <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                      <div className="w-full h-[80%] bg-gradient-to-tr from-blue-100 to-transparent opacity-50 transform origin-bottom-left skew-y-[-20deg]"></div>
                      {/* Blue dashed line following the bottom edge of gradient diagonally */}
                      <div className="absolute bottom-0 left-0 w-[80%] border-t-2 border-dashed border-[#0066FF] transform origin-bottom-left skew-y-[-20deg]"></div>
                    </div>

                    {/* Stick Figure Climbing */}
                    <div className="absolute bottom-[30%] left-[30%] w-16 h-32 transform -translate-x-1/2">
                      <StickFigure variant="teaching" />
                    </div>

                    {/* Annotations */}
                    <div className="absolute top-[20%] right-[10%] bg-white border border-black p-2 rounded shadow-sm text-xs font-mono">
                      Slope = Rise / Run
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-[#0066FF]">
                    <Calculator size={14} />
                  </div>
                  <span className="font-medium">
                    Concept: Slope & Intercept
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center text-purple-600">
                    <Music size={14} />
                  </div>
                  <span className="font-medium">
                    Interest: Music Production
                  </span>
                </div>
                <div className="p-3 bg-blue-50 rounded text-sm text-blue-900 leading-relaxed">
                  "Think of the <strong>slope</strong> as the volume fader on
                  your mixer. The steeper the slide, the faster the volume (y)
                  changes as you move the fader (x)."
                </div>
              </div>
            </EducationalPanel>

            {/* Decorative elements behind */}
            <div className="absolute top-10 -right-4 w-full h-full bg-black rounded-xl -z-10 rotate-2"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#FFD700] rounded-full opacity-20 blur-xl"></div>
          </motion.div>
        </div>
      </header>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white border-y-2 border-black relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Grade Nerd Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to turn confusing concepts into clear,
              personalized lessons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <EducationalPanel className="h-full relative group">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-educational">
                1
              </div>
              <div className="mt-4 mb-6 h-40 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300 group-hover:border-blue-300 transition-colors">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calculator className="w-8 h-8 text-black" />
                  </div>
                  <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    y = mx + b
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Enter Your Topic</h3>
              <p className="text-gray-600">
                Start with any math concept from middle school to high school
                curriculum.
              </p>
            </EducationalPanel>

            {/* Step 2 */}
            <EducationalPanel className="h-full relative group md:mt-8">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#0066FF] text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-educational">
                2
              </div>
              <div className="mt-4 mb-6 h-40 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300 group-hover:border-blue-300 transition-colors">
                <div className="flex gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center mb-2">
                      <Music className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold">Music</span>
                  </div>
                  <div className="flex flex-col items-center mt-4">
                    <div className="w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center mb-2">
                      <Brain className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold">AI</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Add Your Interests</h3>
              <p className="text-gray-600">
                Tell us what you love—F1, gaming, cooking, or anything else.
              </p>
            </EducationalPanel>

            {/* Step 3 */}
            <EducationalPanel className="h-full relative group">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-educational">
                3
              </div>
              <div className="mt-4 mb-6 h-40 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300 group-hover:border-blue-300 transition-colors">
                <div className="relative w-full h-full p-4">
                  <div className="absolute inset-4 bg-white border-2 border-black rounded shadow-sm flex flex-col p-2">
                    <div className="h-2 w-2/3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-2 w-full bg-gray-200 rounded mb-2"></div>
                    <div className="flex-1 bg-blue-50 rounded border border-blue-100 flex items-center justify-center">
                      <StickFigure variant="qed" className="h-12 w-12" />
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Get Custom Content</h3>
              <p className="text-gray-600">
                Instantly generate explanations, analogies, and comics tailored
                to you.
              </p>
            </EducationalPanel>
          </div>
        </div>
      </section>

      {/* Example Output Section */}
      <section id="examples" className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="text-[#0066FF] font-bold mb-2 tracking-wide uppercase text-sm">
                Real Output
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                The 10th Grade Nerd's Guide
              </h2>
              <p className="text-gray-600 mt-2">
                Topic: Linear Equations & Slope • Interest: Hiking
              </p>
            </div>
            <Button variant="outline">Generate Your Own</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Panel 1: Core Concepts */}
            <EducationalPanel title="THE CORE CONCEPTS" className="h-full">
              <div className="relative h-48 mb-6 border-b-2 border-gray-100">
                {/* Graph Illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full relative">
                    {/* Axes */}
                    <div className="absolute left-8 bottom-8 w-[80%] h-[2px] bg-black after:content-['x'] after:absolute after:right-[-15px] after:top-[-8px]"></div>
                    <div className="absolute left-8 bottom-8 h-[80%] w-[2px] bg-black after:content-['y'] after:absolute after:top-[-15px] after:left-[-6px]"></div>

                    {/* Diagonal Line - moved further right and slightly down */}
                    <div className="absolute left-[65%] bottom-0 w-[25%] h-[25%] border-t-2 border-black transform origin-bottom-left -rotate-45"></div>

                    {/* Stick Figure */}
                    <div className="absolute bottom-[30%] left-[30%] w-12 h-24">
                      <StickFigure variant="standing" />
                    </div>

                    {/* Annotations */}
                    <div className="absolute top-[20%] right-[10%] text-xs font-bold">
                      Rise / Run
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold underline decoration-2 decoration-blue-200 mb-1">
                    Slope (m)
                  </h4>
                  <p className="text-sm text-gray-600">
                    How steep the mountain is. Higher number = harder climb.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold underline decoration-2 decoration-blue-200 mb-1">
                    y-intercept (b)
                  </h4>
                  <p className="text-sm text-gray-600">
                    Your starting altitude before you begin hiking.
                  </p>
                </div>
              </div>
            </EducationalPanel>

            {/* Panel 2: Cheat Sheet */}
            <EducationalPanel title="THE FORMULA CHEAT SHEET" className="h-full bg-yellow-50/30">
              <div className="space-y-6">
                <div className="bg-white border-2 border-black rounded p-4 shadow-sm">
                  <h4 className="font-bold text-sm mb-2">
                    Slope-Intercept Form:
                  </h4>
                  <div className="text-center py-2">
                    <span className="text-2xl font-mono font-bold">
                      y = <span className="text-[#0066FF]">m</span>x +{' '}
                      <span className="text-red-500">b</span>
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>m = slope</span>
                    <span>b = start</span>
                  </div>
                </div>

                <div className="bg-white border-2 border-black rounded p-4 shadow-sm">
                  <h4 className="font-bold text-sm mb-2">Finding Slope (m):</h4>
                  <div className="text-center py-2">
                    <span className="text-xl font-mono font-bold">
                      m = (y₂ - y₁) / (x₂ - x₁)
                    </span>
                  </div>
                </div>

                <div className="bg-white border-2 border-black rounded p-4 shadow-sm">
                  <h4 className="font-bold text-sm mb-2">
                    Point-Slope (Secret Weapon):
                  </h4>
                  <div className="text-center py-2">
                    <span className="text-lg font-mono font-bold">
                      y - y₁ = m(x - x₁)
                    </span>
                  </div>
                </div>
              </div>
            </EducationalPanel>

            {/* Panel 3: In Action */}
            <EducationalPanel title="IN ACTION: FINDING THE LINE" className="h-full">
              <div className="space-y-6">
                <div className="bg-blue-50 p-3 rounded border border-blue-100 text-sm">
                  <strong>Problem:</strong> Find line through (2, 5) & (4, 11).
                </div>

                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="mt-1 w-5 h-5 rounded bg-black text-white flex items-center justify-center text-xs flex-shrink-0">
                      <Check size={12} />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm">Get Slope (m):</h5>
                      <p className="font-mono text-sm mt-1 bg-gray-100 inline-block px-2 py-1 rounded">
                        (11-5)/(4-2) = 6/2 = 3
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 w-5 h-5 rounded bg-black text-white flex items-center justify-center text-xs flex-shrink-0">
                      <Check size={12} />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm">Find Intercept (b):</h5>
                      <div className="font-mono text-sm mt-1 text-gray-600 space-y-1">
                        <div>5 = 3(2) + b</div>
                        <div>5 = 6 + b</div>
                        <div>b = -1</div>
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 w-5 h-5 rounded bg-black text-white flex items-center justify-center text-xs flex-shrink-0">
                      <Check size={12} />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm">Write Equation:</h5>
                      <p className="font-mono text-lg font-bold mt-1 text-[#0066FF]">
                        y = 3x - 1
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-6 flex items-center justify-end gap-4">
                  <div className="text-right">
                    <div className="font-bold">Q.E.D.</div>
                    <div className="text-xs text-gray-500">
                      (Quite Easily Done)
                    </div>
                  </div>
                  <div className="w-12 h-12">
                    <StickFigure variant="qed" />
                  </div>
                </div>
              </div>
            </EducationalPanel>
          </div>
        </div>
      </section>

      {/* ELI5 Section */}
      <section className="py-20 px-4 bg-black text-white relative overflow-hidden">
        {/* Rainbow Gradient Border/Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-6 border border-white/20">
            <Lightbulb className="w-8 h-8 text-yellow-400" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Still Stuck?{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400">
              We've Got You.
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Switch to "Explain Like I'm 5" mode. We'll break it down with bright
            colors, simple analogies, and zero jargon.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8 max-w-2xl mx-auto backdrop-blur-sm">
            <div className="flex items-start gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-yellow-400 flex-shrink-0 flex items-center justify-center">
                <span className="text-2xl">🍎</span>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2 text-white">
                  The Apple Orchard Analogy
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  "Imagine you have a basket with 5 apples (that's your b).
                  Every minute, you pick 3 more apples (that's your m). The
                  equation just tells you how many apples you have after any
                  number of minutes!"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-3xl -z-0"></div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-black py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white">
              <span className="font-bold text-sm">gn</span>
            </div>
            <span className="font-bold text-lg tracking-tight">Grade Nerd</span>
          </Link>

          <div className="flex gap-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-black">
              Terms
            </a>
            <a href="#" className="hover:text-black">
              Privacy
            </a>
            <a href="#" className="hover:text-black">
              Contact
            </a>
          </div>

          <div className="text-right">
            <div className="font-bold text-sm">Q.E.D.</div>
            <div className="text-xs text-gray-500">© 2024 Grade Nerd Inc.</div>
          </div>
        </div>
      </footer>
    </div>;
}

export function App() {
  return (
    <BrowserRouter basename="/grade-nerd">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/helpwithdata" element={<HelpUsBuild />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/demo/topic/:topicId" element={<TopicView />} />
        <Route path="/demo/topic/:topicId/:interestId" element={<ContentView />} />
        <Route path="/demo/interest/:interestId" element={<InterestView />} />
      </Routes>
    </BrowserRouter>
  );
}