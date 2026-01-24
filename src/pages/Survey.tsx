import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle, Sparkles } from 'lucide-react';
import { EducationalPanel } from '../components/ui/EducationalPanel';
import { Button } from '../components/ui/Button';
import { StickFigure } from '../components/graphics/StickFigures';
import { useUserPassion } from '../hooks/useUserPassion';

const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdcNPnA9X0IgEaT82busPBwkMYI0FKzaA2OiFk9QbTlV3MBag/formResponse';

const ENTRY_IDS = {
  interest: 'entry.179715797',
  wouldTryApp: 'entry.442779230',
  learningHelp: 'entry.245487262',
  smallFeedback: 'entry.1260108024',
  bigFeedback: 'entry.840604072',
  helpShape: 'entry.309128170',
  email: 'entry.242598101',
};

const WOULD_TRY_OPTIONS = [
  'Yes, definitely',
  'Maybe, depends on how it works',
  'Probably not',
  "I don't need help with math",
];

const LEARNING_HELP_OPTIONS = [
  'A simple analogy that makes the concept click',
  'A visual diagram or infographic',
  'A worked example using my interest',
  'A short comic or story',
  'Practice problems themed around my interest',
  'A quick video explanation',
];

const HELP_SHAPE_OPTIONS = [
  "Be one of the first to try it when it's ready",
  'Give feedback on early designs',
  'Take a deeper survey to help us build it right',
];

export function Survey() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { passion: savedPassion } = useUserPassion();
  const [formData, setFormData] = useState({
    interest: '',
    wouldTryApp: '',
    learningHelp: [] as string[],
    smallFeedback: '',
    bigFeedback: '',
    helpShape: [] as string[],
    email: '',
  });

  // Pre-fill passion from localStorage if available
  useEffect(() => {
    if (savedPassion && !formData.interest) {
      setFormData(prev => ({ ...prev, interest: savedPassion }));
    }
  }, [savedPassion]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const handleCheckboxChange = (field: 'learningHelp' | 'helpShape', value: string, maxSelections?: number) => {
    setFormData(prev => {
      const currentValues = prev[field];
      if (currentValues.includes(value)) {
        return { ...prev, [field]: currentValues.filter(v => v !== value) };
      } else {
        if (maxSelections && currentValues.length >= maxSelections) {
          return prev;
        }
        return { ...prev, [field]: [...currentValues, value] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formBody = new URLSearchParams();
    formBody.append(ENTRY_IDS.interest, formData.interest);
    formBody.append(ENTRY_IDS.wouldTryApp, formData.wouldTryApp);
    formData.learningHelp.forEach(value => {
      formBody.append(ENTRY_IDS.learningHelp, value);
    });
    if (formData.smallFeedback) {
      formBody.append(ENTRY_IDS.smallFeedback, formData.smallFeedback);
    }
    if (formData.bigFeedback) {
      formBody.append(ENTRY_IDS.bigFeedback, formData.bigFeedback);
    }
    formData.helpShape.forEach(value => {
      formBody.append(ENTRY_IDS.helpShape, value);
    });
    if (formData.email) {
      formBody.append(ENTRY_IDS.email, formData.email);
    }

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });
      setIsSubmitted(true);
    } catch (error) {
      // With no-cors mode, we can't read the response, but the submission usually works
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
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
          </div>
        </nav>

        <main className="pt-32 pb-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>

            <motion.div initial="initial" animate="animate" variants={fadeIn}>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                Thank You!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your response helps us build something that actually works for students like you.
              </p>

              <EducationalPanel className="mb-8 text-left">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-24 flex-shrink-0">
                    <StickFigure variant="qed" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">What happens next?</h3>
                    <p className="text-gray-600">
                      We're collecting responses from students everywhere. Once we have enough data,
                      we'll use it to build Grade Nerd - personalized math learning that actually makes sense.
                    </p>
                  </div>
                </div>
              </EducationalPanel>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="outline" size="lg">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                <Link to="/helpwithdata">
                  <Button size="lg">
                    Learn More About the Project
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

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
        <div className="max-w-2xl mx-auto">
          <motion.div initial="initial" animate="animate" variants={fadeIn}>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4" />
                Quick Survey - 2 minutes
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
                Help Us Build{' '}
                <span className="text-[#0066FF]">Grade Nerd</span>
              </h1>
              <div className="inline-block bg-yellow-50 border-2 border-yellow-300 rounded-lg px-6 py-3 shadow-sm">
                <p className="text-lg text-yellow-800 font-medium">
                  Your answers will help shape personalized math learning for students everywhere.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Question 1 */}
              <EducationalPanel className="mb-6">
                <label className="block">
                  <span className="flex items-center gap-2 text-lg font-bold mb-3">
                    <span className="w-7 h-7 bg-[#0066FF] text-white rounded-full flex items-center justify-center text-sm">
                      1
                    </span>
                    What's your #1 interest or passion right now?
                    <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.interest}
                    onChange={e => setFormData(prev => ({ ...prev, interest: e.target.value }))}
                    placeholder="e.g., Gaming, Music, Sports, Art, Cooking..."
                    className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </label>
              </EducationalPanel>

              {/* Question 2 */}
              <EducationalPanel className="mb-6">
                <fieldset>
                  <legend className="flex items-center gap-2 text-lg font-bold mb-4">
                    <span className="w-7 h-7 bg-[#0066FF] text-white rounded-full flex items-center justify-center text-sm">
                      2
                    </span>
                    Would you try an app that explains math concepts using THAT interest?
                    <span className="text-red-500">*</span>
                  </legend>
                  <div className="space-y-3">
                    {WOULD_TRY_OPTIONS.map(option => (
                      <label
                        key={option}
                        className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.wouldTryApp === option
                            ? 'border-[#0066FF] bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="wouldTryApp"
                          required
                          value={option}
                          checked={formData.wouldTryApp === option}
                          onChange={e => setFormData(prev => ({ ...prev, wouldTryApp: e.target.value }))}
                          className="w-5 h-5 text-[#0066FF] border-2 border-gray-300 focus:ring-[#0066FF]"
                        />
                        <span className="font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </EducationalPanel>

              {/* Question 3 */}
              <EducationalPanel className="mb-6">
                <fieldset>
                  <legend className="flex items-center gap-2 text-lg font-bold mb-2">
                    <span className="w-7 h-7 bg-[#0066FF] text-white rounded-full flex items-center justify-center text-sm">
                      3
                    </span>
                    What would help you learn math the most?
                    <span className="text-red-500">*</span>
                  </legend>
                  <p className="text-gray-500 text-sm mb-4 ml-9">Pick up to 2</p>
                  <div className="space-y-3">
                    {LEARNING_HELP_OPTIONS.map(option => (
                      <label
                        key={option}
                        className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.learningHelp.includes(option)
                            ? 'border-[#0066FF] bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        } ${
                          formData.learningHelp.length >= 2 && !formData.learningHelp.includes(option)
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                        }`}
                      >
                        <input
                          type="checkbox"
                          value={option}
                          checked={formData.learningHelp.includes(option)}
                          onChange={() => handleCheckboxChange('learningHelp', option, 2)}
                          disabled={formData.learningHelp.length >= 2 && !formData.learningHelp.includes(option)}
                          className="w-5 h-5 text-[#0066FF] border-2 border-gray-300 rounded focus:ring-[#0066FF]"
                        />
                        <span className="font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                  {formData.learningHelp.length === 0 && (
                    <p className="text-red-500 text-sm mt-2 ml-9">Please select at least one option</p>
                  )}
                </fieldset>
              </EducationalPanel>

              {/* Question 4 - Small Feedback */}
              <EducationalPanel className="mb-6 bg-green-50/50">
                <label className="block">
                  <span className="flex items-center gap-2 text-lg font-bold mb-3">
                    <span className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">
                      4
                    </span>
                    SMALL things that would make Grade Nerd better?
                    <span className="text-gray-400 text-sm font-normal ml-2">(Optional)</span>
                  </span>
                  <p className="text-gray-500 text-sm mb-3 ml-9">A quick fix, minor improvement, or small detail you noticed</p>
                  <textarea
                    value={formData.smallFeedback}
                    onChange={e => setFormData(prev => ({ ...prev, smallFeedback: e.target.value }))}
                    placeholder="e.g., 'The font is a bit hard to read' or 'Would be nice to have a dark mode'"
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all bg-white resize-none"
                  />
                </label>
              </EducationalPanel>

              {/* Question 5 - Big Feedback */}
              <EducationalPanel className="mb-6 bg-purple-50/50">
                <label className="block">
                  <span className="flex items-center gap-2 text-lg font-bold mb-3">
                    <span className="w-7 h-7 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">
                      5
                    </span>
                    BIG things that would make Grade Nerd better?
                    <span className="text-gray-400 text-sm font-normal ml-2">(Optional)</span>
                  </span>
                  <p className="text-gray-500 text-sm mb-3 ml-9">A major feature, different approach, or game-changing idea</p>
                  <textarea
                    value={formData.bigFeedback}
                    onChange={e => setFormData(prev => ({ ...prev, bigFeedback: e.target.value }))}
                    placeholder="e.g., 'I wish it could generate practice problems' or 'Add a way to track my progress over time'"
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all bg-white resize-none"
                  />
                </label>
              </EducationalPanel>

              {/* Question 6 */}
              <EducationalPanel className="mb-6 bg-yellow-50/50">
                <fieldset>
                  <legend className="flex items-center gap-2 text-lg font-bold mb-2">
                    <span className="w-7 h-7 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm">
                      6
                    </span>
                    Want to help shape Grade Nerd?
                    <span className="text-gray-400 text-sm font-normal ml-2">(Optional)</span>
                  </legend>
                  <p className="text-gray-500 text-sm mb-4 ml-9">Select any that apply</p>
                  <div className="space-y-3">
                    {HELP_SHAPE_OPTIONS.map(option => (
                      <label
                        key={option}
                        className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.helpShape.includes(option)
                            ? 'border-[#0066FF] bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <input
                          type="checkbox"
                          value={option}
                          checked={formData.helpShape.includes(option)}
                          onChange={() => handleCheckboxChange('helpShape', option)}
                          className="w-5 h-5 text-[#0066FF] border-2 border-gray-300 rounded focus:ring-[#0066FF]"
                        />
                        <span className="font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </EducationalPanel>

              {/* Question 7 - Email */}
              {formData.helpShape.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <EducationalPanel className="mb-6 bg-blue-50/50">
                    <label className="block">
                      <span className="flex items-center gap-2 text-lg font-bold mb-3">
                        <span className="w-7 h-7 bg-[#0066FF] text-white rounded-full flex items-center justify-center text-sm">
                          7
                        </span>
                        Your email
                        <span className="text-gray-400 text-sm font-normal ml-2">(so we can reach you)</span>
                      </span>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-blue-100 transition-all bg-white"
                      />
                    </label>
                  </EducationalPanel>
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="flex justify-center mt-8">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || formData.learningHelp.length === 0}
                  className="min-w-[200px] shadow-educational hover:shadow-educational-hover"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      </span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Survey
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Footer note */}
            <p className="text-center text-gray-500 text-sm mt-8">
              Your responses help a 7th grader build something amazing for students everywhere.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
