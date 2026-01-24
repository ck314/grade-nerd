import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, TrendingUp, Atom, Brain, Sparkles, Heart, BookOpen, CheckCircle } from 'lucide-react';
import { EducationalPanel } from '../../components/ui/EducationalPanel';
import { Button } from '../../components/ui/Button';
import { topics } from '../../data/topics';
import { interests } from '../../data/interests';
import { useProgress } from '../../hooks/useProgress';
import { useUserPassion } from '../../hooks/useUserPassion';
import { FeedbackButton } from './components/FeedbackButton';
import { MyPassionModal } from './components/MyPassionModal';
import { TopicCard } from './components/TopicCard';
import { InterestCard } from './components/InterestCard';
import { ProgressTracker } from './components/ProgressTracker';

const interestIcons: Record<string, React.ReactNode> = {
  economics: <TrendingUp className="w-8 h-8" />,
  physics: <Atom className="w-8 h-8" />,
  'neural-networks': <Brain className="w-8 h-8" />,
};

export function Demo() {
  const navigate = useNavigate();
  const [showPassionModal, setShowPassionModal] = useState(false);
  const [selectedView, setSelectedView] = useState<'topics' | 'interests'>('topics');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(topics[0]?.id || '');
  const [showIntro, setShowIntro] = useState(() => {
    // Check if user has seen the intro before
    return localStorage.getItem('gradenerd-seen-intro') !== 'true';
  });
  const { getTotalProgress, getTopicProgress } = useProgress();
  const { passion, setPassion, hasPassion } = useUserPassion();

  const selectedTopic = topics.find(t => t.id === selectedTopicId) || topics[0];

  const progress = getTotalProgress();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const handlePassionSubmit = (userPassion: string) => {
    setPassion(userPassion);
    setShowPassionModal(false);
    // Pick a random interest to show
    const randomInterest = interests[Math.floor(Math.random() * interests.length)];
    navigate(`/demo/interest/${randomInterest.id}`);
  };

  const handleStartDemo = () => {
    localStorage.setItem('gradenerd-seen-intro', 'true');
    setShowIntro(false);
  };

  // Intro View
  if (showIntro) {
    return (
      <div className="min-h-screen bg-graph-paper font-sans text-[#111]">
        {/* Simple Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b-2 border-black px-4 py-3">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white">
                <span className="font-bold text-xl">gn</span>
              </div>
              <span className="font-bold text-xl tracking-tight">Grade Nerd</span>
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Interactive Demo
            </div>
          </div>
        </nav>

        {/* Intro Content */}
        <main className="pt-24 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Comic Strip Image */}
              <div className="mb-8 border-2 border-black rounded-2xl overflow-hidden shadow-educational bg-white">
                <img
                  src="/grade-nerd/images/grade-nerd-app-guide.jpeg"
                  alt="Grade Nerd App Guide"
                  className="w-full h-auto"
                />
              </div>

              {/* Let's Go Button */}
              <Button
                size="lg"
                onClick={handleStartDemo}
                className="shadow-educational hover:shadow-educational-hover text-xl px-10 py-4"
              >
                Let's Go
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-graph-paper font-sans text-[#111]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b-2 border-black px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white">
                <span className="font-bold text-xl">gn</span>
              </div>
              <span className="font-bold text-xl tracking-tight hidden sm:block">Grade Nerd</span>
            </Link>
            <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Interactive Demo
            </div>
          </div>

          {/* View Toggle - Now in Nav */}
          <div className="inline-flex bg-gray-100 rounded-lg p-1 border-2 border-black">
            <button
              onClick={() => setSelectedView('topics')}
              className={`px-3 md:px-5 py-1.5 rounded-md font-medium transition-all text-sm ${
                selectedView === 'topics'
                  ? 'bg-white shadow-sm text-black'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-1 md:mr-2" />
              <span className="hidden sm:inline">Browse by </span>Topic
            </button>
            <button
              onClick={() => setSelectedView('interests')}
              className={`px-3 md:px-5 py-1.5 rounded-md font-medium transition-all text-sm ${
                selectedView === 'interests'
                  ? 'bg-white shadow-sm text-black'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Heart className="w-4 h-4 inline mr-1 md:mr-2" />
              <span className="hidden sm:inline">Browse by </span>Interest
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowIntro(true)}
              className="hidden md:flex items-center gap-2 font-medium hover:text-[#0066FF] transition-colors text-sm"
            >
              View Intro
            </button>
            <Link
              to="/"
              className="hidden md:flex items-center gap-2 font-medium hover:text-[#0066FF] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>
            <FeedbackButton />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="initial" animate="animate" variants={fadeIn}>
            {/* Header */}
            <div className="text-center mb-12 mt-8">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
                See Math Through{' '}
                <span className="text-[#0066FF]">Your Interests</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
                Explore math topics with explanations personalized for you
              </p>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                <strong className="text-green-600">Economics</strong>,
                <strong className="text-blue-600"> Physics</strong>,
                <strong className="text-purple-600"> Neural Networks</strong>
                <span className="text-pink-500 font-semibold"> (+ Your #1 interest)</span>
              </p>
            </div>

            {/* Progress Tracker */}
            <ProgressTracker />

            {/* Content */}
            {selectedView === 'topics' ? (
              <div className="max-w-2xl mx-auto">
                {/* Topic Dropdown with Explore Button */}
                <div className="mb-8">
                  <label htmlFor="topic-select" className="block text-sm font-bold text-gray-700 mb-2">
                    Select a Topic
                  </label>
                  <div className="flex gap-3">
                    <select
                      id="topic-select"
                      value={selectedTopicId}
                      onChange={(e) => setSelectedTopicId(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-black rounded-lg bg-white font-medium text-lg focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                    >
                      {topics.map((topic) => (
                        <option key={topic.id} value={topic.id}>
                          {topic.name}
                        </option>
                      ))}
                    </select>
                    <Link to={`/demo/topic/${selectedTopicId}`}>
                      <Button size="lg" className="h-full shadow-educational hover:shadow-educational-hover whitespace-nowrap">
                        Explore
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Selected Topic Display */}
                {selectedTopic && (
                  <motion.div
                    key={selectedTopic.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <EducationalPanel className="overflow-hidden">
                      {/* Topic Image */}
                      <div className="-mx-6 -mt-6 mb-6">
                        <img
                          src={`/grade-nerd/images/topics/${selectedTopic.id}.png`}
                          alt={selectedTopic.name}
                          className="w-full border-b-2 border-black"
                        />
                      </div>

                      {/* Topic Info */}
                      <h2 className="text-2xl font-bold mb-3">{selectedTopic.name}</h2>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {selectedTopic.description}
                      </p>
                    </EducationalPanel>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Interest Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {interests.map((interest, index) => (
                    <motion.div
                      key={interest.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <InterestCard
                        interest={interest}
                        icon={interestIcons[interest.id]}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* My #1 Interest right now Option */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <EducationalPanel className="bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-dashed border-purple-300">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                          <Heart className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">My #1 Interest right now</h3>
                          <p className="text-gray-600">
                            {hasPassion
                              ? `You love ${passion}! In the full app, we'd customize everything for you.`
                              : "Tell us your passion and see how Grade Nerd would customize for YOU."
                            }
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => setShowPassionModal(true)}
                        className="whitespace-nowrap"
                      >
                        {hasPassion ? 'Update Passion' : 'Enter My Passion'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </EducationalPanel>
                </motion.div>
              </div>
            )}

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-16 text-center"
            >
              <EducationalPanel className="bg-black text-white max-w-2xl mx-auto">
                <div className="py-4">
                  <h3 className="text-2xl font-bold mb-2">Ready to share your thoughts?</h3>
                  <p className="text-gray-300 mb-6">
                    Help us build Grade Nerd by sharing what you love (or don't love) about this demo.
                  </p>
                  <Link to="/survey">
                    <Button variant="secondary" size="lg">
                      Give Feedback
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </EducationalPanel>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Passion Modal */}
      {showPassionModal && (
        <MyPassionModal
          onClose={() => setShowPassionModal(false)}
          onSubmit={handlePassionSubmit}
          currentPassion={passion}
        />
      )}
    </div>
  );
}
