import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Users, Brain, Code, Rocket, Lightbulb, ClipboardList, Sparkles, GraduationCap } from 'lucide-react';
import { EducationalPanel } from '../components/ui/EducationalPanel';
import { StickFigure } from '../components/graphics/StickFigures';

export function HelpUsBuild() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-graph-paper font-sans text-[#111]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b-2 border-black px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white">
              <span className="font-bold text-xl">gn</span>
            </div>
            <span className="font-bold text-xl tracking-tight">Grade Nerd</span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 font-medium hover:text-[#0066FF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="initial" animate="animate" variants={fadeIn}>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-8">
              Help Us Build{' '}
              <span className="text-[#0066FF]">Grade Nerd</span>
            </h1>

            <EducationalPanel className="mb-8 bg-yellow-50/50 border-2 border-yellow-200">
              <h2 className="text-2xl font-bold mb-6">How You Can Help</h2>

              <div className="space-y-4 text-lg leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-[#0066FF] whitespace-nowrap">For teachers:</span>
                  <span>Circulate the questionnaire to math students at your school.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-[#0066FF] whitespace-nowrap">For students:</span>
                  <span>Take the questionnaire and give us valuable info about what math students really want.</span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeOmQUdVSDRhHfydcLRpOfej7gAghBvacjX_HgjJpl2Mrqu2Q/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0066FF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Take the Questionnaire
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </EducationalPanel>

            <EducationalPanel className="mb-8">
              <h2 className="text-2xl font-bold mb-6">About This Project</h2>

              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  Grade Nerd is a project by Caradoc, a 7th grade student who scored a perfect 150 on the{' '}
                  <a
                    href="https://cemc.uwaterloo.ca/sites/default/files/documents/2025/2025GaussResults.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0066FF] hover:underline inline-flex items-center gap-1"
                  >
                    2025 Grade 8 Gauss
                    <ExternalLink className="w-4 h-4" />
                  </a>{' '}
                  (see page 6).
                </p>

                <p>
                  He spends his 30-minute morning commute to school taking Neural Network courses from the University of Toronto and Stanford.
                </p>

                <p>
                  He also completed an{' '}
                  <a
                    href="https://www.notion.so/Grade-10-Extra-Credit-Assignment-2d976de1f6538058a6d0d0db5cd2637c#2de76de1f65380fa99b1fa0106036e5a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0066FF] hover:underline inline-flex items-center gap-1"
                  >
                    extra credit assignment
                    <ExternalLink className="w-4 h-4" />
                  </a>{' '}
                  for a Grade 10 math course.
                </p>
              </div>
            </EducationalPanel>

            {/* The Vision - Origin Story */}
            <EducationalPanel className="mb-8 bg-blue-50/50">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#0066FF] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">The Vision</h2>
                  <p className="text-gray-500 text-sm">From a spark of an idea to reality</p>
                </div>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-5 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-24 flex-shrink-0">
                    <StickFigure variant="thinking" />
                  </div>
                  <div>
                    <p className="text-lg leading-relaxed">
                      While completing his{' '}
                      <a
                        href="https://www.notion.so/Grade-10-Extra-Credit-Assignment-2d976de1f6538058a6d0d0db5cd2637c#2de76de1f65380fa99b1fa0106036e5a"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0066FF] hover:underline font-semibold inline-flex items-center gap-1"
                      >
                        extra credit assignment
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      , Caradoc had an idea: <strong>What if there was personalized math learning software that connects concepts to what students actually care about?</strong>
                    </p>
                    <p className="text-lg leading-relaxed mt-3">
                      That idea became <span className="font-bold text-[#0066FF]">Grade Nerd</span>.
                    </p>
                  </div>
                </div>
              </div>
            </EducationalPanel>

            {/* The Roadmap */}
            <EducationalPanel className="mb-8" title="THE ROADMAP TO GRADE NERD">
              <p className="text-lg text-gray-600 mb-8">
                A 4-step plan to build personalized math learning software that actually works.
              </p>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[23px] top-8 bottom-8 w-1 bg-gradient-to-b from-blue-200 via-blue-400 to-green-400 rounded-full hidden md:block"></div>

                {/* Step 1: Winter 2026 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative mb-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 border-2 border-blue-400 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                      <ClipboardList className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                          Winter 2026
                        </span>
                        <span className="text-sm text-gray-500 font-medium">LISTEN</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Gather Student Insights</h3>
                      <p className="text-gray-600 mb-3">
                        Get the{' '}
                        <a
                          href="https://docs.google.com/forms/d/e/1FAIpQLSeOmQUdVSDRhHfydcLRpOfej7gAghBvacjX_HgjJpl2Mrqu2Q/viewform"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0066FF] hover:underline font-semibold inline-flex items-center gap-1"
                        >
                          Grade Nerd User Questionnaire
                          <ExternalLink className="w-4 h-4" />
                        </a>{' '}
                        about math and understanding math concepts out to <strong>1,000 students</strong>.
                      </p>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-3">
                        <Users className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-blue-800">Goal: Deeply understand what students need to learn better</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Step 2: Spring 2026 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative mb-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 border-2 border-purple-400 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                      <Brain className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                          Spring 2026
                        </span>
                        <span className="text-sm text-gray-500 font-medium">ANALYZE</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Build the Master Plan</h3>
                      <p className="text-gray-600 mb-3">
                        Use <strong>Claude from Anthropic</strong> along with math and instructional design help from his math teacher to analyze <strong>1,000 questionnaires</strong> and build a comprehensive plan.
                      </p>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        <span className="text-sm text-purple-800">Goal: Design exactly what Grade Nerd should do and how it will best serve students</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Step 3: Summer 2026 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative mb-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 border-2 border-orange-400 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                      <Code className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                          Summer 2026
                        </span>
                        <span className="text-sm text-gray-500 font-medium">BUILD</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Code Grade Nerd</h3>
                      <p className="text-gray-600 mb-3">
                        Use the plan and <strong>Claude Code</strong> to build a working version of Grade Nerd, getting grants to pay for the AI credits needed for this project.
                      </p>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center gap-3">
                        <Code className="w-5 h-5 text-orange-600" />
                        <span className="text-sm text-orange-800">Goal: Create a functional prototype powered by AI</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Step 4: Fall 2026 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 border-2 border-green-400 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                      <Rocket className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                          Fall 2026
                        </span>
                        <span className="text-sm text-gray-500 font-medium">LAUNCH</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Real Students, Real Results</h3>
                      <p className="text-gray-600 mb-3">
                        Put Grade Nerd in the hands of <strong>actual students</strong> and deliver better math results in the real world.
                      </p>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-3">
                        <GraduationCap className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-green-800">Goal: Make math click for students everywhere</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom illustration */}
              <div className="mt-10 pt-6 border-t-2 border-gray-100">
                <div className="flex items-center justify-center gap-8">
                  <div className="w-16 h-24">
                    <StickFigure variant="qed" />
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl">From Idea to Impact</div>
                    <div className="text-gray-500">Built by a student, for students</div>
                  </div>
                  <div className="w-16 h-24">
                    <StickFigure variant="teaching" />
                  </div>
                </div>
              </div>
            </EducationalPanel>
          </motion.div>
        </div>
      </main>

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
            <a href="#" className="hover:text-black">Terms</a>
            <a href="#" className="hover:text-black">Privacy</a>
            <a href="#" className="hover:text-black">Contact</a>
          </div>

          <div className="text-right">
            <div className="font-bold text-sm">Q.E.D.</div>
            <div className="text-xs text-gray-500">© 2024 Grade Nerd Inc.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
