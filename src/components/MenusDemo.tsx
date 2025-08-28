import React, { useState } from 'react';

const Dropdown: React.FC<{ label: string; children: React.ReactNode }>=({ label, children })=>{
  const [open, setOpen] = useState(false);
  return (
    <div className="menu" onMouseLeave={()=>setOpen(false)}>
      <button className="menu__trigger" onClick={()=>setOpen(!open)}>{label}</button>
      {open && <div className="menu__content">{children}</div>}
    </div>
  );
};

export const ViewToggles: React.FC = () => {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  return (
    <Dropdown label="Open">
      <div className="menu__label">Appearance</div>
      <div className="menu__separator" />
      <div className="menu__item" onClick={()=>setShowStatusBar((v)=>!v)}>
        <input type="checkbox" checked={showStatusBar} readOnly style={{ marginRight: 8 }} />
        Status Bar
      </div>
      <div className="menu__item" onClick={()=>setShowPanel((v)=>!v)}>
        <input type="checkbox" checked={showPanel} readOnly style={{ marginRight: 8 }} />
        Panel
      </div>
    </Dropdown>
  );
};

export const PositionPicker: React.FC = () => {
  const [position, setPosition] = useState('bottom');
  return (
    <Dropdown label="Open">
      <div className="menu__label">Panel Position</div>
      <div className="menu__separator" />
      {['top','bottom','right'].map((p)=> (
        <label key={p} className="menu__item" style={{ display:'flex', alignItems:'center', gap:8 }}>
          <input type="radio" name="pos" value={p} checked={position===p} onChange={()=>setPosition(p)} />
          {p[0].toUpperCase()+p.slice(1)}
        </label>
      ))}
    </Dropdown>
  );
};

export const InviteMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  return (
    <div className="menu" onMouseLeave={()=>{ setOpen(false); setSubOpen(false); }}>
      <button className="menu__trigger" onClick={()=>setOpen(!open)}>Open</button>
      {open && (
        <div className="menu__content" style={{ minWidth: 224 }}>
          <div className="menu__item" onMouseEnter={()=>setSubOpen(true)} onMouseLeave={()=>setSubOpen(false)} style={{ position:'relative' }}>
            Invite users
            {subOpen && (
              <div className="menu__content" style={{ left: 'calc(100% + 8px)', top: -8 }}>
                <div className="menu__item">Email</div>
                <div className="menu__item">Message</div>
                <div className="menu__item">More…</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const MenusDemo: React.FC = () => {
  return (
    <div style={{ display:'flex', gap:12, alignItems:'center', justifyContent:'center', margin:'16px auto', maxWidth:1100 }}>
      <ViewToggles />
      <PositionPicker />
      <InviteMenu />
    </div>
  );
};

export default MenusDemo;


