import React from 'react';

type DropdownsProps = {
  selectedFrontend: string;
  selectedBackend: string;
  selectedDatabase: string;
  onFrontendChange: (value: string) => void;
  onBackendChange: (value: string) => void;
  onDatabaseChange: (value: string) => void;
};

const frontendOptions = [
  'React',
  'Vue',
  'Svelte',
  'Angular',
  'Next.js',
];

const backendOptions = [
  'Node.js',
  'Django',
  'Laravel',
  'Spring Boot',
  'Go (Fiber)'
];

const databaseOptions = [
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'SQLite',
  'Redis'
];

const baseSelectClass =
  'w-full appearance-none rounded-md border border-slate-700/60 bg-slate-900/80 px-3 py-2 text-slate-100 shadow-sm outline-none transition focus:border-emerald-400/60 focus:ring-1 focus:ring-emerald-400/40';

const labelClass = 'mb-1 text-sm text-slate-300';

const Dropdowns: React.FC<DropdownsProps> = ({
  selectedFrontend,
  selectedBackend,
  selectedDatabase,
  onFrontendChange,
  onBackendChange,
  onDatabaseChange,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 w-full max-w-4xl">
      <div className="flex flex-col">
        <label className={labelClass}>Frontend</label>
        <div className="relative">
          <select
            className={baseSelectClass}
            value={selectedFrontend}
            onChange={(e) => onFrontendChange(e.target.value)}
          >
            {frontendOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">▾</span>
        </div>
      </div>

      <div className="flex flex-col">
        <label className={labelClass}>Backend</label>
        <div className="relative">
          <select
            className={baseSelectClass}
            value={selectedBackend}
            onChange={(e) => onBackendChange(e.target.value)}
          >
            {backendOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">▾</span>
        </div>
      </div>

      <div className="flex flex-col">
        <label className={labelClass}>Database</label>
        <div className="relative">
          <select
            className={baseSelectClass}
            value={selectedDatabase}
            onChange={(e) => onDatabaseChange(e.target.value)}
          >
            {databaseOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">▾</span>
        </div>
      </div>
    </div>
  );
};

export default Dropdowns;


