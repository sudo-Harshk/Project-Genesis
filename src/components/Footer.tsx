import { APP_VERSION } from '../version';

const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="w-full border-t border-t-slate-700/50 bg-slate-950">
        <div className="container mx-auto px-4 py-3 text-center text-sm text-slate-400">
          <p className="truncate">
            © {currentYear} Project Genesis {APP_VERSION} — Crafted for creators. Build. Ship. Repeat.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;