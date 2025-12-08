import { useState, useEffect } from "react";
import MoodboardUpload from "./MoodboardUpload";
import { useBriefEngine } from "../hooks/useClarityEngine";
import data from "../data/archetypes.json";

export default function BriefPanel({
  onStepChange,
  onBlueprintComplete,
  onFormDataChange,
}) {
  const totalSteps = 5;

  const {
    isInitialized,
    isLoading: engineLoading,
    generateBlueprint,
    getFilteredArchetypeLogos,
    getArchetypePreview,
  } = useBriefEngine();

  const loadFromSession = () => {
    try {
      const savedStep = sessionStorage.getItem("brandBlueprintStep");
      const savedData = sessionStorage.getItem("brandBlueprintData");

      return {
        step: savedStep ? parseInt(savedStep) : 0,
        data: savedData
          ? JSON.parse(savedData)
          : {
              prompt: "",
              name: "",
              tagline: "",
              industry: "Technology & IT",
              feelings: {
                stability: 0,
                belonging: 0,
                formal: 0,
                modern: 0,
                inspirational: 0,
                powerful: 0,
              },
              attributes: [],
              stage: "challenger",
              archetypeLogos: [],
              styleLogos: [],
              colors: [],
              typography: "",
            },
      };
    } catch (error) {
      console.error("Error loading from sessionStorage:", error);
      return {
        step: 0,
        data: {
          prompt: "",
          name: "",
          tagline: "",
          industry: "Technology & IT",
          feelings: {
            stability: 0,
            belonging: 0,
            formal: 0,
            modern: 0,
            inspirational: 0,
            powerful: 0,
          },
          attributes: [],
          stage: "challenger",
          archetypeLogos: [],
          styleLogos: [],
          colors: [],
          typography: "",
        },
      };
    }
  };

  const initialData = loadFromSession();
  const [currentStep, setCurrentStep] = useState(initialData.step);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialData.data);
  const [brandData, setBrandData] = useState(null);
  const [styleLogos, setStyleLogos] = useState({
    recommended: [],
    other: [],
    all: [],
  });
  const [loadingLogos, setLoadingLogos] = useState(false);
  const [archetypePreview, setArchetypePreview] = useState([]);

  const colorPalette = [
    {
      id: "red",
      hex: "#C8102E",
      name: "Bold Red",
      desc: "Confident & Determined",
    },
    {
      id: "blue",
      hex: "#003366",
      name: "Deep Blue",
      desc: "Trustworthy & Authoritative",
    },
    {
      id: "yellow",
      hex: "#FFD700",
      name: "Vibrant Yellow",
      desc: "Joyful & Optimistic",
    },
    {
      id: "green",
      hex: "#1E7145",
      name: "Forest Green",
      desc: "Adventurous & Natural",
    },
    {
      id: "black_dark_gray",
      hex: "#1E1E1E",
      name: "Dark Gray",
      desc: "Edgy & Exclusive",
    },
    {
      id: "gold_brown",
      hex: "#A88F3B",
      name: "Elegant Gold",
      desc: "Prestigious & Commanding",
    },
    {
      id: "orange",
      hex: "#FF6700",
      name: "Energetic Orange",
      desc: "Creative & Imaginative",
    },
    {
      id: "teal_turquoise",
      hex: "#008080",
      name: "Calm Teal",
      desc: "Nurturing & Supportive",
    },
    {
      id: "light_green_everyman",
      hex: "#8FBC8F",
      name: "Soft Green",
      desc: "Relatable & Familiar",
    },
    {
      id: "pink",
      hex: "#FF69B4",
      name: "Romantic Pink",
      desc: "Sensual & Passionate",
    },
    {
      id: "cyan_jester",
      hex: "#00FFFF",
      name: "Playful Cyan",
      desc: "Fun & Light-hearted",
    },
    {
      id: "purple_magician",
      hex: "#5D3B8E",
      name: "Mystical Purple",
      desc: "Visionary & Mysterious",
    },
  ];

  const typographyOptions = [
    {
      id: "serif_classic",
      letter: "Aa",
      name: "Classic Serif",
      desc: "Refined & Prestigious",
      style: "serif",
    },
    {
      id: "sans_modern",
      letter: "Aa",
      name: "Modern Sans",
      desc: "Clean & Simple",
      style: "sans-serif",
    },
    {
      id: "custom_script",
      letter: "Aa",
      name: "Script",
      desc: "Authentic & Soft",
      style: "cursive",
    },
    {
      id: "rounded_sans",
      letter: "Aa",
      name: "Rounded Sans",
      desc: "Friendly & Approachable",
      style: "system-ui",
    },
    {
      id: "retro_futuristic",
      letter: "Aa",
      name: "Retro Display",
      desc: "Bold & Dynamic",
      style: "fantasy",
    },
    {
      id: "variable_dynamic",
      letter: "Aa",
      name: "Variable",
      desc: "Innovative & Scalable",
      style: "monospace",
    },
    {
      id: "unstructured_fluid",
      letter: "Aa",
      name: "Fluid",
      desc: "Expressive & Free",
      style: "cursive",
    },
  ];

  const bipolarScales = [
    { left: "Stability & Control", right: "Risk & Mastery", key: "stability" },
    { left: "Belonging & Community", right: "Independence", key: "belonging" },
    { left: "Formal", right: "Friendly", key: "formal" },
    { left: "Modern", right: "Timeless", key: "modern" },
    { left: "Inspirational", right: "Comforting", key: "inspirational" },
    { left: "Powerful", right: "Tender", key: "powerful" },
  ];

  const attributesData = [
    {
      name: "Ambitious",
      description:
        "Our brand is driven to achieve greatness and redefine success.",
    },
    {
      name: "Authentic",
      description: "Our brand is genuine, down-to-earth, and relatable.",
    },
    {
      name: "Bold",
      description: "Our brand challenges established norms and conventions.",
    },
    {
      name: "Calm",
      description: "Our brand provides peace, order, and tranquility.",
    },
    {
      name: "Carefree",
      description:
        "Our brand embodies a spirit of freedom, fun, and spontaneity.",
    },
    {
      name: "Charming",
      description:
        "Our brand captivates and delights with its grace and appeal",
    },
    {
      name: "Courageous",
      description:
        "Our brand bravely stands for its beliefs, even when it's difficult.",
    },
    {
      name: "Creative",
      description: "Our brand brings imagination and new ideas to life.",
    },
    {
      name: "Energetic",
      description: "Our brand is vibrant, dynamic, and full of life.",
    },
    {
      name: "Exclusive",
      description:
        "Our brand offers a premium, curated, and sought-after experience.",
    },
    {
      name: "Harmonious",
      description:
        "Our brand creates balance, unity, and a sense of belonging.",
    },
    {
      name: "Honest",
      description:
        "Our brand operates with transparency, integrity, and straightforwardness.",
    },
    {
      name: "Innovative",
      description:
        "Our brand pioneers new solutions and pushes the boundaries.",
    },
    {
      name: "Joyful",
      description:
        "Our brand spreads happiness, optimism, and positive energy.",
    },
    {
      name: "Mysterious",
      description:
        "Our brand evokes curiosity, intrigue, and a sense of wonder.",
    },
    {
      name: "Passionate",
      description:
        "Our brand is deeply committed and emotionally invested in its mission.",
    },
    {
      name: "Playful",
      description:
        "Our brand engages with a sense of humor, fun, and lightheartedness.",
    },
    {
      name: "Professional",
      description:
        "Our brand delivers with expertise, reliability, and precision.",
    },
    {
      name: "Responsible",
      description:
        "Our brand acts with integrity and is accountable for its impact.",
    },
    {
      name: "Spiritual",
      description: "Our brand connects to a deeper meaning and purpose.",
    },
    {
      name: "Trustworthy",
      description:
        "Our brand is reliable, consistent, and always keeps its promises.",
    },
    {
      name: "Wise",
      description:
        "Our brand offers insight, knowledge, and thoughtful guidance.",
    },
  ];

  // Real-time dashboard update effect
  useEffect(() => {
    if (onFormDataChange) {
      onFormDataChange(formData);
    }
  }, [formData, onFormDataChange]);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("brandAIAnalysis");
      if (stored) {
        const parsed = JSON.parse(stored);
        setBrandData(parsed);
        console.log("✅ Loaded AI Analysis:", parsed);
      }
    } catch (error) {
      console.error("Error loading AI analysis:", error);
    }
  }, []);

  useEffect(() => {
    if (brandData?.typography && !formData.typography) {
      setFormData((prev) => ({ ...prev, typography: brandData.typography }));
    }

    if (
      brandData?.colors &&
      (!formData.colors || formData.colors.length === 0)
    ) {
      setFormData((prev) => ({ ...prev, colors: brandData.colors || [] }));
    }
  }, [brandData, formData.typography, formData.colors]);

  useEffect(() => {
    try {
      sessionStorage.setItem("brandBlueprintStep", currentStep.toString());
      sessionStorage.setItem("brandBlueprintData", JSON.stringify(formData));
    } catch (error) {
      console.error("Error saving to sessionStorage:", error);
    }
  }, [currentStep, formData]);

  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStep);
    }
  }, [currentStep, onStepChange]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  useEffect(() => {
    if (currentStep !== 3 || !formData.stage) return;

    const loadStyleLogos = async () => {
      setLoadingLogos(true);
      try {
        const aiAnalysis = (() => {
          try {
            const stored = sessionStorage.getItem("brandAIAnalysis");
            return stored ? JSON.parse(stored) : null;
          } catch {
            return null;
          }
        })();

        const recommendedArchetypes =
          aiAnalysis?.recommendedArchetypes ||
          aiAnalysis?.archetypeMix?.slice(0, 3).map((item) => item.name) ||
          [];

        const response = await fetch("http://localhost:5000/api/get-logos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            stage: formData.stage,
            recommendedArchetypes: recommendedArchetypes,
          }),
        });

        if (!response.ok) throw new Error("Failed to fetch logos");

        const data = await response.json();
        setStyleLogos(data);
        console.log("✅ Style logos loaded:", data);
      } catch (error) {
        console.error("❌ Logo loading error:", error);
      } finally {
        setLoadingLogos(false);
      }
    };

    loadStyleLogos();
  }, [currentStep, formData.stage]);

  useEffect(() => {
    if (isInitialized && formData.industry && formData.stage) {
      try {
        const preview = getArchetypePreview({
          industry: convertIndustryToEngineFormat(formData.industry),
          stage: formData.stage,
          attributes: formData.attributes,
        });
        setArchetypePreview(preview);
        console.log("🎯 Archetype Preview:", preview);
      } catch (error) {
        console.error("Preview error:", error);
      }
    }
  }, [
    isInitialized,
    formData.industry,
    formData.stage,
    formData.attributes,
    getArchetypePreview,
  ]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id.startsWith("feeling-")) {
      const key = id.replace("feeling-", "");
      setFormData((prev) => ({
        ...prev,
        feelings: { ...prev.feelings, [key]: Number(value) },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const toggleSelect = (type, value) => {
    setFormData((prev) => {
      const selected = new Set(prev[type]);
      selected.has(value) ? selected.delete(value) : selected.add(value);
      return { ...prev, [type]: Array.from(selected) };
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => {
        const next = prev + 1;
        onStepChange && onStepChange(next);
        return next;
      });
    } else {
      handleGenerateBlueprint();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => {
        const prevStep = prev - 1;
        onStepChange && onStepChange(prevStep);
        return prevStep;
      });
    }
  };

  const handleAIGenerate = async () => {
    if (!formData.prompt.trim()) {
      alert("Please describe your brand idea first!");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/analyze-brand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: formData.prompt,
          industry: formData.industry,
        }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();

      console.log("✅ AI Analysis Result:", data);
      setBrandData(data);

      try {
        sessionStorage.setItem("brandAIAnalysis", JSON.stringify(data));
      } catch (error) {
        console.error("Error saving AI data:", error);
      }

      const mappedFeelings = data.feelingsMapped || {
        stability: data.feelings?.stability_risk || 0,
        belonging: data.feelings?.belonging_independence || 0,
        formal: data.feelings?.formal_friendly || 0,
        modern: data.feelings?.modern_timeless || 0,
        inspirational: data.feelings?.inspirational_comforting || 0,
        powerful: data.feelings?.powerful_tender || 0,
      };

      setFormData((prev) => ({
        ...prev,
        name: data.name || prev.name,
        tagline: data.tagline || prev.tagline,
        industry: data.industry || prev.industry,
        feelings: mappedFeelings,
        attributes: data.attributes || prev.attributes,
        stage: data.stage || prev.stage,
        colors: data.colors || prev.colors,
      }));

      setTimeout(() => {
        setCurrentStep(1);
        onStepChange && onStepChange(1);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("❌ AI Generation error:", error);
      alert("Failed to generate brand data. Please try again.");
      setIsLoading(false);
    }
  };

  const convertIndustryToEngineFormat = (industryName) => {
    const mapping = {
      "Technology & IT": "technology_it",
      "Finance & FinTech": "finance_fintech",
      "Healthcare & Wellness": "healthcare",
      "Retail & E-commerce": "retail",
      "Education & EdTech": "education",
      "Real Estate & Construction": "real_estate",
      "Food & Beverage": "food_beverage",
      "Entertainment & Media": "entertainment",
      "Travel & Hospitality": "travel",
      "Automotive & Transportation": "automotive",
      "Fashion & Apparel": "fashion",
      "Luxury Goods": "luxury",
      "Non-Profit & Social": "nonprofit",
      "Professional & Services": "professional",
      "Energy & Utilities": "energy",
      "Manufacturing & Industrial": "manufacturing",
    };
    return (
      mapping[industryName] ||
      industryName
        .toLowerCase()
        .replace(/\s+&\s+/g, "_")
        .replace(/\s+/g, "_")
    );
  };

  const handleGenerateBlueprint = () => {
    if (!isInitialized) {
      alert("Engine is still loading. Please wait...");
      return;
    }

    setIsLoading(true);

    try {
      console.log("🚀 Generating blueprint with formData:", formData);

      const brief = {
        name: formData.name,
        tagline: formData.tagline,
        industry: convertIndustryToEngineFormat(formData.industry),
        stage: formData.stage,
        attributes: formData.attributes,
        feelings: formData.feelings,
        colors: formData.colors,
        typography: formData.typography,
        selectedArchetypeLogos: formData.archetypeLogos,
        selectedStyleLogos: formData.styleLogos,
      };

      console.log("📋 Prepared brief for engine:", brief);

      const blueprint = generateBlueprint(brief);

      if (blueprint) {
        console.log("✅ Blueprint generated successfully:", blueprint);

        if (onBlueprintComplete) {
          onBlueprintComplete(blueprint);
        }

        setTimeout(() => {
          setIsLoading(false);
          alert("🎉 Blueprint successfully created! Check the Dashboard.");
        }, 500);
      } else {
        throw new Error("Blueprint generation returned null");
      }
    } catch (error) {
      console.error("❌ Blueprint generation error:", error);
      alert("Failed to generate blueprint. Please try again.");
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 animate-fadeIn">
            <h2 className="text-xl font-bold mb-1">Start with the Big Idea</h2>
            <p className="text-sm text-gray-500 mb-4">
              Describe your brand in your own words. The AI will analyze your
              idea and pre-fill the brief for you.
            </p>
            <textarea
              id="prompt"
              value={formData.prompt}
              onChange={handleChange}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent min-h-[135px] transition-all duration-300 hover:border-violet-300"
              placeholder="e.g., An AI-powered fintech startup for young investors, aiming to make stock trading simple, educational, and accessible..."
            ></textarea>
            <p className="font-semibold text-xs text-gray-500 mt-2 mb-2">
              Include hints about your Mission, Target Audience, and key
              Competitors.
            </p>
            <div className="mt-4">
              <button
                onClick={handleAIGenerate}
                className="w-full bg-violet-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-violet-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Analyzing your idea...
                  </span>
                ) : (
                  "Generate with AI & Fill Fields"
                )}
              </button>
            </div>
          </section>
        );

      case 1:
        return (
          <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 animate-fadeIn">
            <h2 className="text-xl font-bold mb-4">
              <span className="text-violet-600">Step 1:</span> The Mission (The
              "What & Why")
            </h2>
            <div className="space-y-4">
              <div
                className="animate-slideInLeft"
                style={{ animationDelay: "0.1s" }}
              >
                <label className="font-semibold mb-1 block">Name</label>
                <input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:border-violet-300"
                  placeholder="Your Company Name"
                />
              </div>
              <div
                className="animate-slideInLeft"
                style={{ animationDelay: "0.2s" }}
              >
                <label className="font-semibold mb-1 block">Tagline</label>
                <input
                  id="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:border-violet-300"
                  placeholder="e.g., The Future of Intelligent Investing"
                />
              </div>
              <div
                className="animate-slideInLeft"
                style={{ animationDelay: "0.3s" }}
              >
                <label className="font-semibold mb-1 block">Industry</label>
                <select
                  id="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:border-violet-300 cursor-pointer"
                >
                  <option value="Technology & IT">Technology & IT</option>
                  <option value="Finance & FinTech">Finance & FinTech</option>
                  <option value="Healthcare & Wellness">
                    Healthcare & Wellness
                  </option>
                  <option value="Retail & E-commerce">
                    Retail & E-commerce
                  </option>
                  <option value="Education & EdTech">Education & EdTech</option>
                  <option value="Real Estate & Construction">
                    Real Estate & Construction
                  </option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Entertainment & Media">
                    Entertainment & Media
                  </option>
                  <option value="Travel & Hospitality">
                    Travel & Hospitality
                  </option>
                  <option value="Automotive & Transportation">
                    Automotive & Transportation
                  </option>
                  <option value="Fashion & Apparel">Fashion & Apparel</option>
                  <option value="Luxury Goods">Luxury Goods</option>
                  <option value="Non-Profit & Social">
                    Non-Profit & Social
                  </option>
                  <option value="Professional & Services">
                    Professional & Services
                  </option>
                  <option value="Energy & Utilities">Energy & Utilities</option>
                  <option value="Manufacturing & Industrial">
                    Manufacturing & Industrial
                  </option>
                </select>
              </div>
            </div>
          </section>
        );

      case 2:
        return (
          <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-1">
              <span className="text-violet-600">Step 2:</span> The Personality{" "}
              <span className="font-bold">(The "Who")</span>
            </h2>

            <div className="space-y-8 mt-6">
              <div>
                <h3 className="text-lg font-bold mb-4 text-gray-900">
                  Feelings (Bipolar Scales)
                </h3>
                <div className="max-w-4xl mx-auto">
                  {bipolarScales.map((scale, index) => {
                    const value = formData.feelings[scale.key] || 0;
                    return (
                      <div
                        key={scale.key}
                        className="flex items-center gap-4 mb-4 animate-slideInLeft"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <span className="text-sm text-gray-500 w-48 text-left flex-shrink-0">
                          {scale.left}
                        </span>
                        <div className="flex-1 flex items-center gap-2">
                          <input
                            id={`feeling-${scale.key}`}
                            type="range"
                            min="-10"
                            max="10"
                            value={value}
                            onChange={handleChange}
                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer transition-all duration-300 hover:h-3"
                            style={{
                              background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${
                                ((value + 10) / 20) * 100
                              }%, #e5e7eb ${
                                ((value + 10) / 20) * 100
                              }%, #e5e7eb 100%)`,
                            }}
                          />
                          <span className="text-xs font-mono text-gray-600 w-8 text-center">
                            {value}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 w-48 text-right flex-shrink-0">
                          {scale.right}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 text-gray-900">
                  Attributes
                </h3>
                <div className="space-y-3">
                  {attributesData.map((attr, index) => {
                    const isSelected = formData.attributes.includes(
                      attr.name.toLowerCase()
                    );
                    return (
                      <button
                        key={attr.name}
                        type="button"
                        onClick={() =>
                          toggleSelect("attributes", attr.name.toLowerCase())
                        }
                        className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-md animate-fadeIn ${
                          isSelected
                            ? "bg-violet-600 text-white border-violet-600 shadow-lg"
                            : "bg-white text-gray-900 border-gray-200 hover:border-violet-300"
                        }`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="font-bold text-base mb-1">
                          {attr.name}
                        </div>
                        <div
                          className={`text-sm overflow-hidden transition-all duration-300 ${
                            isSelected
                              ? "max-h-20 opacity-100 mt-1"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <span className="text-violet-100">
                            {attr.description}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        );

      case 3:
        const aiAnalysis = (() => {
          try {
            const stored = sessionStorage.getItem("brandAIAnalysis");
            return stored ? JSON.parse(stored) : null;
          } catch {
            return null;
          }
        })();

        return (
          <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 animate-fadeIn">
            <h2 className="text-xl font-bold mb-4">
              <span className="text-violet-600">Step 3:</span> The Market
              Position (The "Where")
            </h2>

            <h3 className="font-semibold mb-2">Brand Stage</h3>
            <div className="flex gap-2 mb-6">
              {[
                { id: "challenger", label: "Challenger", subtitle: "Startup" },
                { id: "contender", label: "Contender", subtitle: "Scale-Up" },
                { id: "leader", label: "Leader", subtitle: "Enterprise" },
              ].map((stage, index) => (
                <button
                  key={stage.id}
                  onClick={() => setFormData({ ...formData, stage: stage.id })}
                  className={`flex-1 py-3 px-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-md animate-slideInUp ${
                    formData.stage === stage.id
                      ? "bg-violet-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div>{stage.label}</div>
                  <div className="text-xs opacity-80">{stage.subtitle}</div>
                </button>
              ))}
            </div>

            {isInitialized && (
              <div className="mt-6 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-700">
                  ✅ ClarityOS Engine is ready for blueprint generation
                </p>
              </div>
            )}
          </section>
        );

      case 4:
        const recommendedColors = brandData?.colors || [];
        const alternativeColors = brandData?.alternativeColors || [];

        return (
          <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-1">
              <span className="text-violet-600">Step 4:</span> The Aesthetics{" "}
              <span className="font-bold">(The "How It Looks")</span>
            </h2>

            <div className="space-y-8 mt-6">
              <div className="animate-slideInUp">
                <MoodboardUpload />
              </div>

              <div
                className="animate-slideInUp"
                style={{ animationDelay: "0.1s" }}
              >
                <h3 className="text-lg font-bold mb-2 text-gray-900">
                  Color Palette
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Choose your primary colors based on your brand personality.
                </p>

                <p className="text-sm text-gray-600 mb-3 font-medium">
                  All Available Colors
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {colorPalette.map((color, index) => {
                    const isSelected = formData.colors.includes(color.id);

                    return (
                      <div
                        key={color.id}
                        onClick={() => toggleSelect("colors", color.id)}
                        className={`relative cursor-pointer transition-all duration-300 transform hover:scale-103 animate-bounceIn ${
                          isSelected
                            ? "ring-2 ring-violet-600 ring-offset-2"
                            : "hover:ring-2 hover:ring-violet-300 hover:ring-offset-2"
                        }`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div
                          className="w-full aspect-square rounded-xl shadow-md"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <div className="mt-2 text-center">
                          <p className="text-xs font-semibold text-gray-900">
                            {color.name}
                          </p>
                          <p className="text-xs text-gray-500">{color.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                className="animate-slideInUp"
                style={{ animationDelay: "0.2s" }}
              >
                <h3 className="text-lg font-bold mb-2 text-gray-900">
                  Typography Style
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {typographyOptions.map((font, index) => {
                    return (
                      <div
                        key={font.id}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            typography: font.id,
                          }))
                        }
                        className={`p-6 border-2 rounded-xl cursor-pointer text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fadeIn relative ${
                          formData.typography === font.id
                            ? "border-violet-600 bg-violet-50 shadow-xl"
                            : "border-gray-200 hover:border-violet-300"
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div
                          className="text-4xl font-bold mb-2 transition-transform duration-300 hover:scale-110"
                          style={{ fontFamily: font.style }}
                        >
                          {font.letter}
                        </div>
                        <div className="font-bold text-sm mb-1">
                          {font.name}
                        </div>
                        <div className="text-xs text-gray-500">{font.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {formData.colors.length > 0 && formData.typography && (
              <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-700 font-semibold">
                  ✅ All required fields completed. Ready to generate your brand
                  blueprint!
                </p>
              </div>
            )}
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 p-8">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { 
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-slideInLeft { 
          animation: slideInLeft 0.6s ease-out forwards;
        }
        .animate-slideInUp { 
          animation: slideInUp 0.6s ease-out forwards;
        }
        .animate-bounceIn { 
          animation: bounceIn 0.6s ease-out forwards;
        }
      `}</style>

      <div className="w-full max-w-3xl mx-auto flex flex-col space-y-6">
        <div className="text-center animate-fadeIn">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-600">
            Create Your Brand Blueprint
          </h1>
          <p className="text-gray-600 mt-2">
            Follow these steps to define a brand that's unforgettable.
          </p>
          {engineLoading && (
            <p className="text-sm text-gray-500 mt-2">
              ⏳ Engine initializing...
            </p>
          )}
          {isInitialized && (
            <p className="text-sm text-green-600 mt-2">
              ✅ ClarityOS Engine Ready
            </p>
          )}
        </div>

        <div className="flex-grow">{renderStep()}</div>

        <div className="flex justify-between items-center pt-4 animate-fadeIn">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-md hover:bg-gray-50 ${
              currentStep === 0
                ? "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none"
                : ""
            }`}
          >
            Previous
          </button>

          <div className="text-sm font-semibold text-gray-500">
            <span className="inline-block px-4 py-2 bg-white rounded-full shadow-sm">
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>

          <button
            onClick={handleNext}
            disabled={
              isLoading || (currentStep === totalSteps - 1 && !isInitialized)
            }
            className="px-6 py-3 rounded-lg font-semibold bg-violet-600 text-white transition-all duration-300 transform hover:scale-105 hover:bg-violet-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : currentStep === totalSteps - 1 ? (
              "🎨 Generate Blueprint"
            ) : (
              "Next Step"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
