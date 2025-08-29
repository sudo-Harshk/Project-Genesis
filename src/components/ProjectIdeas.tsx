import React from 'react';

export interface ProjectIdea {
  id: string;
  title: string;
  description: string;
}

interface ProjectIdeasProps {
  ideas: ProjectIdea[];
}

const ProjectIdeas: React.FC<ProjectIdeasProps> = ({ ideas }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto px-4">
      {ideas.map((idea) => (
        <div
          key={idea.id}
          className="bg-slate-900/80 border border-slate-700/60 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:border-emerald-400/40"
        >
          {/* Image placeholder - removed icons */}
          <div className="h-48 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 flex items-center justify-center">
            <div className="text-2xl opacity-40 text-slate-400">
              {idea.title.charAt(0)}
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-slate-100 mb-3 line-clamp-2">
              {idea.title}
            </h3>
            
            <p className="text-slate-300 text-sm leading-relaxed">
              {idea.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectIdeas;
