import { useEffect, useState, useMemo, memo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const MemoizedParticles = memo(Particles);

const BackgroundParticles = ({ darkMode, prefersReducedMotion }) => {
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
    fpsLimit: 120,
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
        value: darkMode ? "#ffffff" : "#000000",
      },
      links: {
        color: darkMode ? "#ffffff" : "#000000",
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
        value: 100,
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
  }), [darkMode]);

  if (!init || prefersReducedMotion) {
    return null;
  }

  return (
    <MemoizedParticles
      id="tsparticles"
      options={particlesOptions}
      className="absolute inset-0 z-0 opacity-40 transition-opacity duration-500"
    />
  );
};

export default BackgroundParticles;
