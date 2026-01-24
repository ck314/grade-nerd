import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, TrendingUp, Atom, Brain, CheckCircle } from 'lucide-react';
import { EducationalPanel } from '../../components/ui/EducationalPanel';
import { Button } from '../../components/ui/Button';
import { topics } from '../../data/topics';
import { getInterestById } from '../../data/interests';
import { useProgress } from '../../hooks/useProgress';
import { useUserPassion } from '../../hooks/useUserPassion';
import { FeedbackButton } from './components/FeedbackButton';

const interestIcons: Record<string, React.ReactNode> = {
  economics: <TrendingUp className="w-10 h-10" />,
  physics: <Atom className="w-10 h-10" />,
  'neural-networks': <Brain className="w-10 h-10" />,
};

export function InterestView() {
  const { interestId } = useParams<{ interestId: string }>();
  const { isViewed } = useProgress();
  const { passion, hasPassion } = useUserPassion();
  const [selectedTopicId, setSelectedTopicId] = useState<string>(topics[0]?.id || '');

  const interest = interestId ? getInterestById(interestId) : undefined;
  const selectedTopic = topics.find(t => t.id === selectedTopicId) || topics[0];

  if (!interest) {
    return (
      <div className="min-h-screen bg-graph-paper flex items-center justify-center">
        <EducationalPanel className="max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Interest Not Found</h2>
          <Link to="/demo">
            <Button>Back to Demo</Button>
          </Link>
        </EducationalPanel>
      </div>
    );
  }

  const viewedCount = topics.filter(t => isViewed(t.id, interest.id)).length;

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
          <div className="flex items-center gap-4">
            <Link
              to="/demo"
              className="hidden md:flex items-center gap-2 font-medium hover:text-[#0066FF] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Interests
            </Link>
            <FeedbackButton />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Interest Header */}
            <div className={`${interest.bgColor} border-2 border-black rounded-2xl p-6 mb-8`}>
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-xl bg-white border-2 border-black flex items-center justify-center ${interest.color}`}>
                  {interestIcons[interest.id]}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
                    {interest.name}
                  </h1>
                  <p className="text-lg text-gray-700">{interest.description}</p>
                  {hasPassion && (
                    <div className="mt-3 inline-block bg-white/50 border border-purple-300 rounded-lg px-3 py-1 text-sm">
                      <em>In the full app, this would be about <strong>{passion}</strong></em>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{viewedCount} of 17 topics explored</span>
              </div>
            </div>

            {/* Topic Dropdown with Explore Button */}
            <div className="max-w-2xl mx-auto">
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
                  <Link to={`/demo/topic/${selectedTopicId}/${interest.id}`}>
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
          </motion.div>
        </div>
      </main>
    </div>
  );
}
