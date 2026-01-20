import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { EducationalPanel } from '../components/ui/EducationalPanel';

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

            <EducationalPanel className="mb-8 bg-blue-50/50">
              <h2 className="text-2xl font-bold mb-6">The Vision</h2>

              <p className="text-lg leading-relaxed mb-6">
                Out of this work, Caradoc has an idea for a piece of personalized math learning software called Grade Nerd.
              </p>

              <p className="text-lg leading-relaxed">
                He has created a{' '}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeOmQUdVSDRhHfydcLRpOfej7gAghBvacjX_HgjJpl2Mrqu2Q/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0066FF] hover:underline font-semibold inline-flex items-center gap-1"
                >
                  Grade Nerd User Questionnaire
                  <ExternalLink className="w-4 h-4" />
                </a>{' '}
                about math and understanding math concepts.
              </p>
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
