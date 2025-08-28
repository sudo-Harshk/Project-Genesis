import React from 'react';

type GenerateButtonProps = {
  onClick: () => void;
  loading?: boolean;
};

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={Boolean(loading)}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
    
      aria-busy={loading}
    >
      {loading ? 'Generating…' : 'Generate'}
    </button>
  );
};

export default GenerateButton;


