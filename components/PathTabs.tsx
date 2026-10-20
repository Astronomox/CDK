"use client";

import { Children, useState } from "react";

/**
 * Phones: the get-involved cards become one panel with a segmented switch on top
 * (Volunteer | Donate | Items), so there is no sideways scrolling and no long stack.
 * From 768px all cards show side by side and the switch is hidden (app/home-mobile.css).
 */
export function PathTabs({ labels, children }: { labels: string[]; children: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const panels = Children.toArray(children);
  return (
    <div className="path-tabs">
      <div className="pt-bar" role="group" aria-label="Ways to get involved">
        <span aria-hidden className="pt-pill" style={{ "--n": labels.length, "--a": active } as React.CSSProperties} />
        {labels.map((label, i) => (
          <button key={label} type="button" className="pt-tab" aria-pressed={i === active} onClick={() => setActive(i)}>
            {label}
          </button>
        ))}
      </div>
      <div className="card-grid card-grid--3">
        {panels.map((panel, i) => (
          <div key={i} className="pt-panel" data-on={i === active || undefined}>
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}
