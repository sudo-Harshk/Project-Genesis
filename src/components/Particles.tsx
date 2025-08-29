import React, { useMemo } from 'react';

type ParticlesProps = { count?: number };

const Particles: React.FC<ParticlesProps> = ({ count = 80 }) => {
  const particles = useMemo(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const height = typeof window !== 'undefined' ? window.innerHeight : 800;
    return Array.from({ length: count }).map((_, i) => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const dx = (Math.random() - 0.5) * 220; // more freedom
      const dy = (Math.random() - 0.5) * 160;
      const dur = 8000 + Math.random() * 14000; // varied speeds
      const delay = Math.random() * 4000;
      const size = 2 + Math.random() * 3.5;
      const easing = Math.random() > 0.5 ? 'cubic-bezier(0.22, 1, 0.36, 1)' : 'cubic-bezier(0.37, 0, 0.63, 1)';
      const style: React.CSSProperties = {
        ['--x' as any]: `${x}px`,
        ['--y' as any]: `${y}px`,
        ['--dx' as any]: `${dx}px`,
        ['--dy' as any]: `${dy}px`,
        ['--dur' as any]: `${dur}ms`,
        ['--pdur' as any]: `${2200 + Math.random() * 2000}ms`,
        ['--delay' as any]: `${delay}ms`,
        ['--easing' as any]: easing,
        width: `${size}px`,
        height: `${size}px`,
        background: 'rgba(214,217,223,0.65)'
      } as React.CSSProperties;
      return <span key={i} className="particle" style={style} />;
    });
  }, [count]);

  return <div className="particles-wrapper">{particles}</div>;
};

export default Particles;


