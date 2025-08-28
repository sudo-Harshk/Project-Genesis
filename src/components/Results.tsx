import React from 'react';

type ResultsProps = {
  idea: string | null;
};

const Results: React.FC<ResultsProps> = ({ idea }) => {
  if (!idea) {
    return null;
  }

  return (
    <section className="w-full max-w-4xl panel p-6">
      <h2 className="mb-2 text-lg font-semibold text-slate-100">Suggested Project Idea</h2>
      <p className="text-slate-300 leading-relaxed">{idea}</p>
    </section>
  );
};

export default Results;


