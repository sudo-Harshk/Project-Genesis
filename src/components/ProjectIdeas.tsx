import React, { useState } from 'react';

export interface ProjectIdea {
  id: string;
  title: string;
  description: string;
}

interface ProjectIdeasProps {
  ideas: ProjectIdea[];
  singleExpand?: boolean; // If true, only one card can be expanded at a time
}

const ProjectIdeas: React.FC<ProjectIdeasProps> = ({ ideas, singleExpand = false }) => {
  // Use object instead of Set for more reliable state management
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});



  const toggleCard = (id: string) => {
    setExpandedCards(prev => {
      let newExpanded = { ...prev };
      
      if (newExpanded[id]) {
        // If card is expanded, collapse it
        delete newExpanded[id];
      } else {
        // If card is collapsed, expand it
        if (singleExpand) {
          // Clear all other expanded cards if single expand mode
          newExpanded = {};
        }
        newExpanded[id] = true;
      }
      
      return newExpanded;
    });
  };

  const getProjectImage = (title: string) => {
    // Generate a unique gradient based on the title
    const hash = title.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const colors = [
      'from-emerald-400/20 to-blue-500/20',
      'from-purple-400/20 to-pink-500/20',
      'from-orange-400/20 to-red-500/20',
      'from-cyan-400/20 to-indigo-500/20',
      'from-yellow-400/20 to-orange-500/20',
      'from-green-400/20 to-teal-500/20'
    ];
    
    return colors[Math.abs(hash) % colors.length];
  };



  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto px-4 project-ideas-grid items-start">
      {ideas.map((idea, index) => {
        // Use index as fallback ID if the AI-generated ID is not unique
        const uniqueId = idea.id || `fallback-${index}`;
        const isExpanded = expandedCards[uniqueId];
        const imageGradient = getProjectImage(idea.title);
        

        
        return (
          <div
            key={uniqueId}
            className={`project-card card-hover-effect bg-slate-900/80 border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group ${
              isExpanded 
                ? 'border-emerald-400/60 shadow-emerald-500/20' 
                : 'border-slate-700/60 hover:border-emerald-400/40'
            }`}
          >
            {/* Image */}
            <div className={`project-card__image h-48 bg-gradient-to-br ${imageGradient} flex items-center justify-center relative overflow-hidden`}>
              <div className="text-4xl font-bold opacity-60 text-slate-300 group-hover:scale-110 transition-transform duration-300">
                {idea.title.charAt(0)}
              </div>
              {/* Subtle overlay for better text contrast */}
              <div className="absolute inset-0 bg-black/10"></div>
              {/* Subtle shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Content */}
            <div className="p-6 project-card__content">
              <h3 className="project-card__title text-xl font-semibold text-slate-100 mb-4 line-clamp-2 group-hover:text-emerald-300 transition-colors duration-200">
                {idea.title}
              </h3>
              
              {/* Description - initially hidden, shown when expanded */}
              <div className={`project-card__description expandable-content overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'
              }`}>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {idea.description}
                </p>
              </div>
              
              {/* Read More / Read Less Button */}
              <button
                onClick={() => toggleCard(uniqueId)}
                className="project-card__button btn-expandable inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 text-emerald-300 font-medium text-sm w-fit"
              >
                <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectIdeas;
