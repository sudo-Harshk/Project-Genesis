import Particles from './components/Particles';
import Header from './components/Header';
import { useState } from 'react';
import StackMenus from './components/StackMenus';
import TechLogos from './components/TechLogos';
import ProjectIdeas from './components/ProjectIdeas';
import type { ProjectIdea } from './services/openrouterService';
import { clearIdeaCache, getCacheStats } from './services/openrouterService';

function App() {
  const [frontend, setFrontend] = useState('React');
  const [backend, setBackend] = useState('Node.js');
  const [database, setDatabase] = useState('PostgreSQL');
  const [projectIdeas, setProjectIdeas] = useState<ProjectIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFromCache, setIsFromCache] = useState(false);
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
  const { generateProjectIdeas } = await import('./services/openrouterService');
  const result = await generateProjectIdeas(frontend, backend, database);
      setProjectIdeas(result.ideas);
      setIsFromCache(result.fromCache);
      
      if (result.fromCache) {
        console.log('✅ Ideas loaded from cache for:', `${frontend}|${backend}|${database}`);
      } else {
        console.log('🆕 Fresh ideas generated for:', `${frontend}|${backend}|${database}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate project ideas');
      console.error('Error generating project ideas:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateNew = async () => {
    // Clear the cache for the current tech stack combination
    clearIdeaCache();
    
    // Log cache stats for debugging
  const { getCacheStats } = await import('./services/openrouterService');
    console.log('Cache cleared. Current stats:', getCacheStats());
    
    setIsLoading(true);
    setError(null);
    
    try {
  const { generateProjectIdeas } = await import('./services/openrouterService');
      const result = await generateProjectIdeas(frontend, backend, database);
      setProjectIdeas(result.ideas);
      setIsFromCache(result.fromCache);
      
      console.log('🆕 Fresh ideas generated after cache clear for:', `${frontend}|${backend}|${database}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate new project ideas');
      console.error('Error generating new project ideas:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDebugInfo = () => {
    setShowDebugInfo(!showDebugInfo);
  };

  return (
    <>
      <Header />
      <StackMenus
        frontend={frontend}
        backend={backend}
        database={database}
        onFrontendChange={setFrontend}
        onBackendChange={setBackend}
        onDatabaseChange={setDatabase}
        onGenerate={handleGenerate}
        onGenerateNew={handleGenerateNew}
        isLoading={isLoading}
        hasExistingIdeas={projectIdeas.length > 0}
      />
      <TechLogos frontend={frontend} backend={backend} database={database} />
      
      {/* Debug Information Panel */}
      {showDebugInfo && (
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <div className="bg-gray-800/50 border border-gray-600/40 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-200">🎯 Category System Debug Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-300 mb-2">Category Sets</h4>
                <div className="space-y-1 text-gray-400">
                  {Object.entries({
                    'AI & ML': 5,
                    'Creative & Media': 5,
                    'Business & Productivity': 5,
                    'Social & Community': 5,
                    'Technology & Infrastructure': 5,
                    'Health & Wellness': 5,
                    'Education & Learning': 5,
                    'Gaming & Entertainment': 5
                  }).map(([name, count]) => (
                    <div key={name} className="flex justify-between">
                      <span>{name}</span>
                      <span className="text-blue-400">{count} categories</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-300 mb-2">Selection Strategy</h4>
                <div className="space-y-1 text-gray-400">
                  <div>• 4 categories from different sets</div>
                  <div>• Rotating selection pattern</div>
                  <div>• Industry + persona variety</div>
                  <div>• Complexity level variation</div>
                </div>
                <div className="mt-3 p-2 bg-gray-700/50 rounded text-xs">
                  <div className="text-gray-300">Cache Stats:</div>
                  <div className="text-gray-400">
                    {(() => {
                      const stats = getCacheStats();
                      return `${stats.cachedStacks} tech stacks, ${stats.totalCachedIdeas} total ideas`;
                    })()}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={toggleDebugInfo}
              className="mt-4 px-3 py-1 text-xs bg-gray-600 hover:bg-gray-500 text-gray-200 rounded transition-colors"
            >
              Hide Debug Info
            </button>
          </div>
        </div>
      )}
      
      {/* Project Ideas Section */}
      {projectIdeas.length > 0 && (
        <section className="py-16 px-4">
          <div className="section-header max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h2 className="text-3xl md:text-4xl">
                Generated Project Ideas
              </h2>
              {isFromCache && (
                <span className="px-3 py-1 text-sm bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full">
                  From Cache
                </span>
              )}
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="text-lg max-w-2xl mx-auto text-center">
                Here are some amazing project ideas based on your selected tech stack. Click "Read More" to explore each idea in detail.
                {isFromCache && (
                  <span className="block text-sm text-gray-400 mt-2">
                    💡 These ideas were previously generated. Use "New Ideas" button to get fresh suggestions for the same tech stack.
                  </span>
                )}
              </p>
              <button
                onClick={toggleDebugInfo}
                className="px-3 py-1 text-sm bg-gray-600/50 hover:bg-gray-500/50 text-gray-300 border border-gray-500/40 rounded-full transition-colors"
              >
                {showDebugInfo ? 'Hide' : 'Show'} Category System Info
              </button>
            </div>
          </div>
          <ProjectIdeas ideas={projectIdeas} singleExpand={true} />
        </section>
      )}
      
      {error && (
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-4">
            <p className="text-red-300 text-center">{error}</p>
          </div>
        </div>
      )}
      
      <Particles count={14} />
    </>
  );
}

export default App;