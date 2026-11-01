import { useEffect, useState, useMemo, memo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const MemoizedParticles = memo(Particles);

// phones: half the frame rate and particles, so the canvas doesn't compete with scrolling
const isTouch = window.matchMedia("(pointer: coarse)").matches;

const BackgroundParticles = ({ darkMode }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions = useMemo(() => ({
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: isTouch ? 30 : 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.5,
          },
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.1,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 0.5,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: isTouch ? 50 : 100,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 2 },
      },
    },
    detectRetina: true,
  }), []);

  if (!init) {
    return null;
  }

  // Particles reloads on any prop change, so theme is applied via CSS invert on a wrapper instead.
  // Wrapper is fixed because a filter makes it the containing block for the fixed canvas.
  return (
    <div className={`fixed inset-0 z-0 ${darkMode ? "" : "invert"}`}>
      <MemoizedParticles
        id="tsparticles"
        options={particlesOptions}
        className="absolute inset-0 opacity-40 transition-opacity duration-500"
      />
    </div>
  );
};

export default BackgroundParticles;
