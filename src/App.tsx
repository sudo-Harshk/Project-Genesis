import Particles from './components/Particles';
import Header from './components/Header';
import { useState } from 'react';
import StackMenus from './components/StackMenus';
import TechLogos from './components/TechLogos';
import ProjectIdeas from './components/ProjectIdeas';
import type { ProjectIdea } from './services/geminiService';

function App() {
  const [frontend, setFrontend] = useState('React');
  const [backend, setBackend] = useState('Node.js');
  const [database, setDatabase] = useState('PostgreSQL');
  const [projectIdeas, setProjectIdeas] = useState<ProjectIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { generateProjectIdeas } = await import('./services/geminiService');
      const ideas = await generateProjectIdeas(frontend, backend, database);
      setProjectIdeas(ideas);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate project ideas');
      console.error('Error generating project ideas:', err);
    } finally {
      setIsLoading(false);
    }
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
        isLoading={isLoading}
      />
      <TechLogos frontend={frontend} backend={backend} database={database} />
      
      {/* Project Ideas Section */}
      {projectIdeas.length > 0 && (
        <section className="py-16 px-4">
          <ProjectIdeas ideas={projectIdeas} />
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