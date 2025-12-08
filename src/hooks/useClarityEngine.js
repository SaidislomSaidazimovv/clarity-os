// import { useState, useEffect, useCallback, useRef } from "react";
// import ClarityOSEngine from "../engine/engine";

// export function useClarityEngine() {
//   const [engine, setEngine] = useState(null);
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [blueprint, setBlueprint] = useState(null);
//   const [clarityScore, setClarityScore] = useState(0);

//   const engineRef = useRef(null);

//   useEffect(() => {
//     const initEngine = async () => {
//       try {
//         setIsLoading(true);

//         if (!engineRef.current) {
//           engineRef.current = new ClarityOSEngine();
//         }

//         const initialized = await engineRef.current.initialize();

//         if (initialized) {
//           setEngine(engineRef.current);
//           setIsInitialized(true);
//           console.log("✅ ClarityOS Engine initialized successfully");
//         }
//       } catch (err) {
//         console.error("❌ Engine initialization error:", err);
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     initEngine();
//   }, []);

//   const generateBlueprint = useCallback(
//     (brief) => {
//       if (!engine || !isInitialized) {
//         console.warn("⚠️ Engine not ready yet");
//         return null;
//       }

//       try {
//         console.log("🚀 Generating blueprint with brief:", brief);

//         const result = engine.generateBlueprint(brief);
//         setBlueprint(result);
//         setClarityScore(result?.systemState?.clarityScore || 0);

//         try {
//           sessionStorage.setItem("clarityBlueprint", JSON.stringify(result));
//           sessionStorage.setItem("blueprintUpdateTimestamp", Date.now().toString());
//           console.log("✅ Blueprint saved to sessionStorage with timestamp");
//         } catch (e) {
//           console.warn("⚠️ SessionStorage save error:", e);
//         }

//         return result;
//       } catch (err) {
//         console.error("❌ Blueprint generation error:", err);
//         setError(err.message);
//         return null;
//       }
//     },
//     [engine, isInitialized]
//   );

//   const getFilteredArchetypeLogos = useCallback(
//     (brief) => {
//       if (!engine || !isInitialized) {
//         console.warn("⚠️ Engine not ready for logo filtering");
//         return [];
//       }

//       try {
//         return engine.getFilteredArchetypeLogos(brief);
//       } catch (err) {
//         console.error("❌ Logo filtering error:", err);
//         return [];
//       }
//     },
//     [engine, isInitialized]
//   );

//   const getFilteredStyleLogos = useCallback(
//     (brief) => {
//       if (!engine || !isInitialized) {
//         console.warn("⚠️ Engine not ready for style filtering");
//         return [];
//       }

//       try {
//         return engine.getFilteredStyleLogos(brief);
//       } catch (err) {
//         console.error("❌ Style filtering error:", err);
//         return [];
//       }
//     },
//     [engine, isInitialized]
//   );

//   const previewArchetypes = useCallback(
//     (brief) => {
//       if (!engine || !isInitialized) {
//         return [];
//       }

//       try {
//         return engine.previewArchetypes(brief);
//       } catch (err) {
//         console.error("❌ Preview error:", err);
//         return [];
//       }
//     },
//     [engine, isInitialized]
//   );

//   const loadBlueprint = useCallback(() => {
//     try {
//       const stored = sessionStorage.getItem("clarityBlueprint");
//       if (stored) {
//         const parsed = JSON.parse(stored);
//         setBlueprint(parsed);
//         setClarityScore(parsed?.systemState?.clarityScore || 0);
//         console.log("✅ Blueprint loaded from sessionStorage");
//         return parsed;
//       }
//     } catch (err) {
//       console.warn("⚠️ Blueprint load error:", err);
//     }
//     return null;
//   }, []);

//   const resetBlueprint = useCallback(() => {
//     setBlueprint(null);
//     setClarityScore(0);
//     try {
//       sessionStorage.removeItem("clarityBlueprint");
//       sessionStorage.removeItem("blueprintUpdateTimestamp");
//       console.log("✅ Blueprint reset");
//     } catch (e) {
//       console.warn("⚠️ SessionStorage clear error:", e);
//     }
//   }, []);

//   return {
//     engine,
//     isInitialized,
//     isLoading,
//     error,
//     blueprint,
//     clarityScore,

//     generateBlueprint,
//     getFilteredArchetypeLogos,
//     getFilteredStyleLogos,
//     previewArchetypes,
//     loadBlueprint,
//     resetBlueprint,
//   };
// }

// export function useBriefEngine() {
//   const clarityEngine = useClarityEngine();
//   const [filteredLogos, setFilteredLogos] = useState({
//     archetypes: [],
//     styles: [],
//   });

//   const updateFilteredLogos = useCallback(
//     (brief) => {
//       if (!clarityEngine.isInitialized) {
//         console.warn("⚠️ Engine not ready for filtering");
//         return;
//       }

//       try {
//         const archetypeLogos = clarityEngine.getFilteredArchetypeLogos(brief);
//         const styleLogos = clarityEngine.getFilteredStyleLogos(brief);

//         setFilteredLogos({
//           archetypes: archetypeLogos,
//           styles: styleLogos,
//         });

//         console.log("✅ Logos filtered:", {
//           archetypes: archetypeLogos.length,
//           styles: styleLogos.length,
//         });
//       } catch (err) {
//         console.error("❌ Logo update error:", err);
//       }
//     },
//     [clarityEngine]
//   );

//   const getArchetypePreview = useCallback(
//     (brief) => {
//       return clarityEngine.previewArchetypes(brief);
//     },
//     [clarityEngine]
//   );

//   return {
//     ...clarityEngine,
//     filteredLogos,
//     updateFilteredLogos,
//     getArchetypePreview,
//   };
// }

// export function useDashboardEngine() {
//   const clarityEngine = useClarityEngine();
//   const [dashboardData, setDashboardData] = useState(null);
//   const lastUpdateRef = useRef(null);

//   const prepareDashboardData = useCallback((blueprint) => {
//     if (!blueprint) {
//       console.warn("⚠️ No blueprint to prepare");
//       return null;
//     }

//     try {
//       const data = {
//         name: blueprint.brief?.name || "Your Brand",
//         tagline: blueprint.brief?.tagline || "",
//         industry: blueprint.brief?.industry || "",

//         dominantArchetype: blueprint.brandIdentity?.dominantArchetype || "Hero",
//         secondaryArchetype:
//           blueprint.brandIdentity?.secondaryArchetype || "Sage",
//         coreMotivation: blueprint.brandIdentity?.coreMotivation || "",
//         archetypeMix: blueprint.brandIdentity?.archetypeMix || [],

//         oneLineStory: blueprint.communication?.oneLineStory || "",
//         keywords: blueprint.communication?.keywords || [],
//         toneOfVoice: blueprint.communication?.toneOfVoice || [],

//         blueprintTitle: blueprint.visuals?.blueprintTitle || "",
//         visualDirectives: {
//           style: blueprint.visuals?.styleDirectives?.join(", ") || "",
//           imagery: blueprint.visuals?.imageryDirectives?.join(", ") || "",
//           mood: blueprint.visuals?.moodDirectives?.join(", ") || "",
//         },

//         clarityScore: blueprint.systemState?.clarityScore || 0,
//         nextStep:
//           blueprint.systemState?.nextStepText ||
//           "Continue refining your brand.",
//         isUnlocked: blueprint.systemState?.unlockedStatus || false,
//       };

//       setDashboardData(data);
//       console.log("✅ Dashboard data prepared:", data);
//       return data;
//     } catch (err) {
//       console.error("❌ Dashboard data preparation error:", err);
//       return null;
//     }
//   }, []);

//   useEffect(() => {
//     if (clarityEngine.blueprint) {
//       prepareDashboardData(clarityEngine.blueprint);
//     }
//   }, [clarityEngine.blueprint, prepareDashboardData]);

//   useEffect(() => {
//     if (clarityEngine.isInitialized && !clarityEngine.blueprint) {
//       const loaded = clarityEngine.loadBlueprint();
//       if (loaded) {
//         prepareDashboardData(loaded);
//       }
//     }
//   }, [
//     clarityEngine.isInitialized,
//     clarityEngine.blueprint,
//     clarityEngine.loadBlueprint,
//     prepareDashboardData,
//   ]);

//   useEffect(() => {
//     const checkForUpdates = setInterval(() => {
//       try {
//         const currentTimestamp = sessionStorage.getItem("blueprintUpdateTimestamp");
        
//         if (currentTimestamp && currentTimestamp !== lastUpdateRef.current) {
//           console.log("🔄 New blueprint detected, reloading dashboard...");
//           lastUpdateRef.current = currentTimestamp;
          
//           const loaded = clarityEngine.loadBlueprint();
//           if (loaded) {
//             prepareDashboardData(loaded);
//           }
//         }
//       } catch (err) {
//         console.warn("⚠️ Update check error:", err);
//       }
//     }, 1000);

//     try {
//       lastUpdateRef.current = sessionStorage.getItem("blueprintUpdateTimestamp");
//     } catch (e) {
//       console.warn("⚠️ Could not initialize update ref:", e);
//     }

//     return () => clearInterval(checkForUpdates);
//   }, [clarityEngine.loadBlueprint, prepareDashboardData]);

//   return {
//     ...clarityEngine,
//     dashboardData,
//     prepareDashboardData,
//   };
// }

// export default useClarityEngine;


import { useState, useEffect, useCallback, useRef } from "react";
import ClarityOSEngine from "../engine/engine";

// Color palette definition
const colorPalette = [
  { id: "red", hex: "#C8102E", name: "Bold Red", desc: "Confident & Determined" },
  { id: "blue", hex: "#003366", name: "Deep Blue", desc: "Trustworthy & Authoritative" },
  { id: "yellow", hex: "#FFD700", name: "Vibrant Yellow", desc: "Joyful & Optimistic" },
  { id: "green", hex: "#1E7145", name: "Forest Green", desc: "Adventurous & Natural" },
  { id: "black_dark_gray", hex: "#1E1E1E", name: "Dark Gray", desc: "Edgy & Exclusive" },
  { id: "gold_brown", hex: "#A88F3B", name: "Elegant Gold", desc: "Prestigious & Commanding" },
  { id: "orange", hex: "#FF6700", name: "Energetic Orange", desc: "Creative & Imaginative" },
  { id: "teal_turquoise", hex: "#008080", name: "Calm Teal", desc: "Nurturing & Supportive" },
  { id: "light_green_everyman", hex: "#8FBC8F", name: "Soft Green", desc: "Relatable & Familiar" },
  { id: "pink", hex: "#FF69B4", name: "Romantic Pink", desc: "Sensual & Passionate" },
  { id: "cyan_jester", hex: "#00FFFF", name: "Playful Cyan", desc: "Fun & Light-hearted" },
  { id: "purple_magician", hex: "#5D3B8E", name: "Mystical Purple", desc: "Visionary & Mysterious" },
];

// Typography options definition
const typographyOptions = [
  { id: "serif_classic", letter: "Aa", name: "Classic Serif", desc: "Refined & Prestigious", style: "serif" },
  { id: "sans_modern", letter: "Aa", name: "Modern Sans", desc: "Clean & Simple", style: "sans-serif" },
  { id: "custom_script", letter: "Aa", name: "Script", desc: "Authentic & Soft", style: "cursive" },
  { id: "rounded_sans", letter: "Aa", name: "Rounded Sans", desc: "Friendly & Approachable", style: "system-ui" },
  { id: "retro_futuristic", letter: "Aa", name: "Retro Display", desc: "Bold & Dynamic", style: "fantasy" },
  { id: "variable_dynamic", letter: "Aa", name: "Variable", desc: "Innovative & Scalable", style: "monospace" },
  { id: "unstructured_fluid", letter: "Aa", name: "Fluid", desc: "Expressive & Free", style: "cursive" },
];

export function useClarityEngine() {
  const [engine, setEngine] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [blueprint, setBlueprint] = useState(null);
  const [clarityScore, setClarityScore] = useState(0);

  const engineRef = useRef(null);

  useEffect(() => {
    const initEngine = async () => {
      try {
        setIsLoading(true);

        if (!engineRef.current) {
          engineRef.current = new ClarityOSEngine();
        }

        const initialized = await engineRef.current.initialize();

        if (initialized) {
          setEngine(engineRef.current);
          setIsInitialized(true);
          console.log("✅ ClarityOS Engine initialized successfully");
        }
      } catch (err) {
        console.error("❌ Engine initialization error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initEngine();
  }, []);

  const generateBlueprint = useCallback(
    (brief) => {
      if (!engine || !isInitialized) {
        console.warn("⚠️ Engine not ready yet");
        return null;
      }

      try {
        console.log("🚀 Generating blueprint with brief:", brief);

        const result = engine.generateBlueprint(brief);
        
        // Add color and typography details to the result
        result.selectedColors = brief.colors?.map(colorId => 
          colorPalette.find(c => c.id === colorId)
        ).filter(Boolean) || [];
        
        result.selectedTypography = typographyOptions.find(t => t.id === brief.typography) || null;
        
        setBlueprint(result);
        setClarityScore(result?.systemState?.clarityScore || 0);

        try {
          sessionStorage.setItem("clarityBlueprint", JSON.stringify(result));
          sessionStorage.setItem("blueprintUpdateTimestamp", Date.now().toString());
          console.log("✅ Blueprint saved to sessionStorage with timestamp");
        } catch (e) {
          console.warn("⚠️ SessionStorage save error:", e);
        }

        return result;
      } catch (err) {
        console.error("❌ Blueprint generation error:", err);
        setError(err.message);
        return null;
      }
    },
    [engine, isInitialized]
  );

  const getFilteredArchetypeLogos = useCallback(
    (brief) => {
      if (!engine || !isInitialized) {
        console.warn("⚠️ Engine not ready for logo filtering");
        return [];
      }

      try {
        return engine.getFilteredArchetypeLogos(brief);
      } catch (err) {
        console.error("❌ Logo filtering error:", err);
        return [];
      }
    },
    [engine, isInitialized]
  );

  const getFilteredStyleLogos = useCallback(
    (brief) => {
      if (!engine || !isInitialized) {
        console.warn("⚠️ Engine not ready for style filtering");
        return [];
      }

      try {
        return engine.getFilteredStyleLogos(brief);
      } catch (err) {
        console.error("❌ Style filtering error:", err);
        return [];
      }
    },
    [engine, isInitialized]
  );

  const previewArchetypes = useCallback(
    (brief) => {
      if (!engine || !isInitialized) {
        return [];
      }

      try {
        return engine.previewArchetypes(brief);
      } catch (err) {
        console.error("❌ Preview error:", err);
        return [];
      }
    },
    [engine, isInitialized]
  );

  const loadBlueprint = useCallback(() => {
    try {
      const stored = sessionStorage.getItem("clarityBlueprint");
      if (stored) {
        const parsed = JSON.parse(stored);
        setBlueprint(parsed);
        setClarityScore(parsed?.systemState?.clarityScore || 0);
        console.log("✅ Blueprint loaded from sessionStorage");
        return parsed;
      }
    } catch (err) {
      console.warn("⚠️ Blueprint load error:", err);
    }
    return null;
  }, []);

  const resetBlueprint = useCallback(() => {
    setBlueprint(null);
    setClarityScore(0);
    try {
      sessionStorage.removeItem("clarityBlueprint");
      sessionStorage.removeItem("blueprintUpdateTimestamp");
      console.log("✅ Blueprint reset");
    } catch (e) {
      console.warn("⚠️ SessionStorage clear error:", e);
    }
  }, []);

  return {
    engine,
    isInitialized,
    isLoading,
    error,
    blueprint,
    clarityScore,

    generateBlueprint,
    getFilteredArchetypeLogos,
    getFilteredStyleLogos,
    previewArchetypes,
    loadBlueprint,
    resetBlueprint,
  };
}

export function useBriefEngine() {
  const clarityEngine = useClarityEngine();
  const [filteredLogos, setFilteredLogos] = useState({
    archetypes: [],
    styles: [],
  });

  const updateFilteredLogos = useCallback(
    (brief) => {
      if (!clarityEngine.isInitialized) {
        console.warn("⚠️ Engine not ready for filtering");
        return;
      }

      try {
        const archetypeLogos = clarityEngine.getFilteredArchetypeLogos(brief);
        const styleLogos = clarityEngine.getFilteredStyleLogos(brief);

        setFilteredLogos({
          archetypes: archetypeLogos,
          styles: styleLogos,
        });

        console.log("✅ Logos filtered:", {
          archetypes: archetypeLogos.length,
          styles: styleLogos.length,
        });
      } catch (err) {
        console.error("❌ Logo update error:", err);
      }
    },
    [clarityEngine]
  );

  const getArchetypePreview = useCallback(
    (brief) => {
      return clarityEngine.previewArchetypes(brief);
    },
    [clarityEngine]
  );

  return {
    ...clarityEngine,
    filteredLogos,
    updateFilteredLogos,
    getArchetypePreview,
  };
}

export function useDashboardEngine() {
  const clarityEngine = useClarityEngine();
  const [dashboardData, setDashboardData] = useState(null);
  const lastUpdateRef = useRef(null);

  const prepareDashboardData = useCallback((blueprint) => {
    if (!blueprint) {
      console.warn("⚠️ No blueprint to prepare");
      return null;
    }

    try {
      const data = {
        name: blueprint.brief?.name || "Your Brand",
        tagline: blueprint.brief?.tagline || "",
        industry: blueprint.brief?.industry || "",

        dominantArchetype: blueprint.brandIdentity?.dominantArchetype || "Hero",
        secondaryArchetype:
          blueprint.brandIdentity?.secondaryArchetype || "Sage",
        coreMotivation: blueprint.brandIdentity?.coreMotivation || "",
        archetypeMix: blueprint.brandIdentity?.archetypeMix || [],

        oneLineStory: blueprint.communication?.oneLineStory || "",
        keywords: blueprint.communication?.keywords || [],
        toneOfVoice: blueprint.communication?.toneOfVoice || [],

        blueprintTitle: blueprint.visuals?.blueprintTitle || "",
        visualDirectives: {
          style: blueprint.visuals?.styleDirectives?.join(", ") || "",
          imagery: blueprint.visuals?.imageryDirectives?.join(", ") || "",
          mood: blueprint.visuals?.moodDirectives?.join(", ") || "",
        },

        // Add selected colors and typography
        selectedColors: blueprint.selectedColors || [],
        selectedTypography: blueprint.selectedTypography || null,

        clarityScore: blueprint.systemState?.clarityScore || 0,
        nextStep:
          blueprint.systemState?.nextStepText ||
          "Continue refining your brand.",
        isUnlocked: blueprint.systemState?.unlockedStatus || false,
      };

      setDashboardData(data);
      console.log("✅ Dashboard data prepared:", data);
      return data;
    } catch (err) {
      console.error("❌ Dashboard data preparation error:", err);
      return null;
    }
  }, []);

  useEffect(() => {
    if (clarityEngine.blueprint) {
      prepareDashboardData(clarityEngine.blueprint);
    }
  }, [clarityEngine.blueprint, prepareDashboardData]);

  useEffect(() => {
    if (clarityEngine.isInitialized && !clarityEngine.blueprint) {
      const loaded = clarityEngine.loadBlueprint();
      if (loaded) {
        prepareDashboardData(loaded);
      }
    }
  }, [
    clarityEngine.isInitialized,
    clarityEngine.blueprint,
    clarityEngine.loadBlueprint,
    prepareDashboardData,
  ]);

  useEffect(() => {
    const checkForUpdates = setInterval(() => {
      try {
        const currentTimestamp = sessionStorage.getItem("blueprintUpdateTimestamp");
        
        if (currentTimestamp && currentTimestamp !== lastUpdateRef.current) {
          console.log("🔄 New blueprint detected, reloading dashboard...");
          lastUpdateRef.current = currentTimestamp;
          
          const loaded = clarityEngine.loadBlueprint();
          if (loaded) {
            prepareDashboardData(loaded);
          }
        }
      } catch (err) {
        console.warn("⚠️ Update check error:", err);
      }
    }, 1000);

    try {
      lastUpdateRef.current = sessionStorage.getItem("blueprintUpdateTimestamp");
    } catch (e) {
      console.warn("⚠️ Could not initialize update ref:", e);
    }

    return () => clearInterval(checkForUpdates);
  }, [clarityEngine.loadBlueprint, prepareDashboardData]);

  return {
    ...clarityEngine,
    dashboardData,
    prepareDashboardData,
  };
}

export default useClarityEngine;