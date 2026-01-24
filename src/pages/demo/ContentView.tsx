import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, TrendingUp, Atom, Brain, CheckCircle } from 'lucide-react';
import { EducationalPanel } from '../../components/ui/EducationalPanel';
import { Button } from '../../components/ui/Button';
import { getTopicById, topics } from '../../data/topics';
import { getInterestById, interests } from '../../data/interests';
import { getTopicContent, getELI5Content } from '../../data/content';
import { useProgress } from '../../hooks/useProgress';
import { FeedbackButton } from './components/FeedbackButton';
import { ContentRenderer } from './components/ContentRenderer';
import { SimplifyToggle } from './components/SimplifyToggle';

const interestIcons: Record<string, React.ReactNode> = {
  economics: <TrendingUp className="w-5 h-5" />,
  physics: <Atom className="w-5 h-5" />,
  'neural-networks': <Brain className="w-5 h-5" />,
};

export function ContentView() {
  const { topicId, interestId } = useParams<{ topicId: string; interestId: string }>();
  const navigate = useNavigate();
  const { markAsViewed, isViewed } = useProgress();
  const [isSimplified, setIsSimplified] = useState(false);

  const topic = topicId ? getTopicById(topicId) : undefined;
  const interest = interestId ? getInterestById(interestId) : undefined;
  const content = topicId && interestId ? getTopicContent(topicId, interestId) : undefined;
  const eli5Content = topicId ? getELI5Content(topicId) : undefined;

  // Mark as viewed when content loads
  useEffect(() => {
    if (topicId && interestId) {
      markAsViewed(topicId, interestId);
    }
  }, [topicId, interestId, markAsViewed]);

  if (!topic || !interest || !content) {
    return (
      <div className="min-h-screen bg-graph-paper flex items-center justify-center">
        <EducationalPanel className="max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Content Not Found</h2>
          <Link to="/demo">
            <Button>Back to Demo</Button>
          </Link>
        </EducationalPanel>
      </div>
    );
  }

  // Get other interests for this topic
  const otherInterests = interests.filter(i => i.id !== interest.id);

  // Get next topic with this interest
  const currentTopicIndex = topics.findIndex(t => t.id === topic.id);
  const nextTopic = currentTopicIndex < topics.length - 1 ? topics[currentTopicIndex + 1] : null;
  const prevTopic = currentTopicIndex > 0 ? topics[currentTopicIndex - 1] : null;

  // Show ELI5 only for neural networks
  const showSimplifyOption = interest.id === 'neural-networks' && eli5Content;

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
              to={`/demo/topic/${topic.id}`}
              className="hidden md:flex items-center gap-2 font-medium hover:text-[#0066FF] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Topic
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
            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    {topic.number}
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    {topic.shortName}
                  </span>
                </div>
                <span className="text-gray-300">•</span>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${interest.bgColor} ${interest.color}`}>
                  {interestIcons[interest.id]}
                  <span className="font-medium">{interest.name}</span>
                </div>
                {isViewed(topic.id, interest.id) && (
                  <span className="flex items-center gap-1 text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Viewed
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
                {content.title}
              </h1>
            </div>

            {/* Simplify Toggle */}
            {showSimplifyOption && (
              <SimplifyToggle
                isSimplified={isSimplified}
                onToggle={() => setIsSimplified(!isSimplified)}
              />
            )}

            {/* Featured Image */}
            <div className="mb-8 border-2 border-black rounded-xl overflow-hidden bg-white shadow-educational">
              <img
                src={isSimplified && eli5Content ? eli5Content.imagePath : content.imagePath}
                alt={`${topic.name} - ${interest.name}`}
                className="w-full h-auto"
              />
            </div>

            {/* Content */}
            <EducationalPanel className="mb-8">
              <ContentRenderer
                sections={isSimplified && eli5Content ? eli5Content.sections : content.sections}
                isELI5={isSimplified}
              />
            </EducationalPanel>

            {/* Other Interests */}
            <EducationalPanel className="mb-8 bg-gray-50">
              <h3 className="font-bold text-lg mb-4">See this topic through other lenses:</h3>
              <div className="flex flex-wrap gap-3">
                {otherInterests.map((otherInterest) => {
                  const viewed = isViewed(topic.id, otherInterest.id);
                  return (
                    <button
                      key={otherInterest.id}
                      onClick={() => navigate(`/demo/topic/${topic.id}/${otherInterest.id}`)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all hover:shadow-md ${
                        viewed
                          ? 'border-green-400 bg-green-50'
                          : 'border-gray-300 bg-white hover:border-black'
                      }`}
                    >
                      <div className={`${otherInterest.color}`}>
                        {interestIcons[otherInterest.id]}
                      </div>
                      <span className="font-medium">{otherInterest.name}</span>
                      {viewed && <CheckCircle className="w-4 h-4 text-green-500" />}
                    </button>
                  );
                })}
              </div>
            </EducationalPanel>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              {prevTopic ? (
                <Link to={`/demo/topic/${prevTopic.id}/${interest.id}`}>
                  <Button variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">{prevTopic.shortName}</span>
                    <span className="sm:hidden">Previous</span>
                  </Button>
                </Link>
              ) : (
                <div />
              )}

              <Link to="/demo">
                <Button variant="outline">All Topics</Button>
              </Link>

              {nextTopic ? (
                <Link to={`/demo/topic/${nextTopic.id}/${interest.id}`}>
                  <Button>
                    <span className="hidden sm:inline">{nextTopic.shortName}</span>
                    <span className="sm:hidden">Next</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Link to="/survey">
                  <Button>
                    Give Feedback
                    <ArrowRight className="w-4 h-4 ml-2" />
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
