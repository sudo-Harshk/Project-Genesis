import React, { useState } from 'react';

type StackMenusProps = {
  frontend: string;
  backend: string;
  database: string;
  onFrontendChange: (v: string) => void;
  onBackendChange: (v: string) => void;
  onDatabaseChange: (v: string) => void;
  onGenerate?: () => void;
  onGenerateNew?: () => void;
  isLoading?: boolean;
  hasExistingIdeas?: boolean;
};

const FRONTEND_OPTS = [
  'React',
  'Vue',
  'Svelte',
  'Angular',
  'Next.js',
  'SolidJS',
];

const BACKEND_OPTS = [
  'Node.js',
  'Express',
  'NestJS',
  'Django',

  'Spring Boot',
  'Laravel',
  'Go (Fiber)',
];

const DATABASE_OPTS = [
  'PostgreSQL',
  'MySQL',
  'SQLite',
  'MongoDB',
  'Redis',
  'Supabase',
];

// Logos moved to TechLogos component

const Menu: React.FC<{ label: string; value: string; options: string[]; onChange: (v: string)=>void }> = ({ label, value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v)=>!v);
  const close = () => setOpen(false);
  return (
    <div className="field">
      <label>{label}</label>
      <div className="menu">
        <button className="menu__trigger" onClick={toggle}>{value}</button>
        {open && (
          <div className="menu__content" onMouseLeave={close}>
            {options.map((o)=> (
              <div
                key={o}
                className={`menu__item ${o===value ? 'is-active' : ''}`}
                onClick={()=>{ onChange(o); close(); }}
              >
                {o}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StackMenus: React.FC<StackMenusProps> = ({
  frontend,
  backend,
  database,
  onFrontendChange,
  onBackendChange,
  onDatabaseChange,
  onGenerate,
  onGenerateNew,
  isLoading = false,
  hasExistingIdeas = false,
}) => {
  return (
    <div className="stack-menus">
      <Menu label="Frontend" value={frontend} options={FRONTEND_OPTS} onChange={onFrontendChange} />
      <Menu label="Backend" value={backend} options={BACKEND_OPTS} onChange={onBackendChange} />
      <Menu label="Database" value={database} options={DATABASE_OPTS} onChange={onDatabaseChange} />
      <div className="field" style={{ alignSelf: 'end' }}>
        <label style={{ visibility: 'hidden' }}>Generate</label>
        <div className="flex gap-2">
          {hasExistingIdeas && onGenerateNew && (
            <button 
              className="btn-secondary" 
              onClick={() => onGenerateNew()}
              disabled={isLoading}
              title="Generate fresh ideas for the same tech stack"
            >
              {isLoading ? 'Generating...' : 'New Ideas'}
            </button>
          )}
          <button 
            className="btn-primary" 
            onClick={() => onGenerate?.()}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StackMenus;


