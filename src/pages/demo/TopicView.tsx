import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Atom, Brain, CheckCircle } from 'lucide-react';
import { EducationalPanel } from '../../components/ui/EducationalPanel';
import { Button } from '../../components/ui/Button';
import { getTopicById, topics } from '../../data/topics';
import { interests } from '../../data/interests';
import { useProgress } from '../../hooks/useProgress';
import { FeedbackButton } from './components/FeedbackButton';

const interestIcons: Record<string, React.ReactNode> = {
  economics: <TrendingUp className="w-6 h-6" />,
  physics: <Atom className="w-6 h-6" />,
  'neural-networks': <Brain className="w-6 h-6" />,
};

export function TopicView() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { isViewed } = useProgress();

  const topic = topicId ? getTopicById(topicId) : undefined;

  if (!topic) {
    return (
      <div className="min-h-screen bg-graph-paper flex items-center justify-center">
        <EducationalPanel className="max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Topic Not Found</h2>
          <Link to="/demo">
            <Button>Back to Demo</Button>
          </Link>
        </EducationalPanel>
      </div>
    );
  }

  // Get previous and next topics
  const currentIndex = topics.findIndex(t => t.id === topic.id);
  const prevTopic = currentIndex > 0 ? topics[currentIndex - 1] : null;
  const nextTopic = currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null;

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
              All Topics
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
            {/* Topic Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold">
                  {topic.number}
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Topic {topic.number} of 17
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
                {topic.name}
              </h1>
              <p className="text-lg text-gray-600">{topic.description}</p>
            </div>

            {/* Interest Selection */}
            <EducationalPanel className="mb-8">
              <h2 className="text-xl font-bold mb-4">Choose Your Lens</h2>
              <p className="text-gray-600 mb-6">
                See how {topic.shortName} applies to different fields:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {interests.map((interest) => {
                  const viewed = isViewed(topic.id, interest.id);
                  return (
                    <button
                      key={interest.id}
                      onClick={() => navigate(`/demo/topic/${topic.id}/${interest.id}`)}
                      className={`relative group text-left p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                        viewed
                          ? 'border-green-400 bg-green-50'
                          : 'border-gray-200 hover:border-black bg-white'
                      }`}
                    >
                      {viewed && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className={`w-12 h-12 rounded-lg ${interest.bgColor} ${interest.color} flex items-center justify-center mb-3`}>
                        {interestIcons[interest.id]}
                      </div>
                      <h3 className="font-bold mb-1">{interest.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {interest.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </EducationalPanel>

            {/* Topic Navigation */}
            <div className="flex justify-between">
              {prevTopic ? (
                <Link to={`/demo/topic/${prevTopic.id}`}>
                  <Button variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {prevTopic.shortName}
                  </Button>
                </Link>
              ) : (
                <div />
              )}
              {nextTopic && (
                <Link to={`/demo/topic/${nextTopic.id}`}>
                  <Button variant="outline">
                    {nextTopic.shortName}
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
