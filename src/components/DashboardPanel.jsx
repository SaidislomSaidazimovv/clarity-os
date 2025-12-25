import { useState, useEffect, useMemo } from "react";
import {
  BookOpenIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";

export default function DashboardPanel({ formData }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedArchetypes, setAnimatedArchetypes] = useState([0, 0, 0]);
  const [isDownloading, setIsDownloading] = useState(false);

  const analyzeFormData = useMemo(() => {
    if (!formData) return null;

    let score = 0;

    if (formData.name?.trim()) score += 15;
    if (formData.tagline?.trim()) score += 15;
    if (formData.industry) score += 10;
    if (formData.attributes?.length > 0) score += 20;
    if (formData.stage) score += 10;
    if (formData.colors?.length > 0) score += 15;
    if (formData.typography) score += 15;

    const archetypeScores = analyzeArchetypes(
      formData.attributes,
      formData.feelings
    );
    const sortedArchetypes = Object.entries(archetypeScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([name, value]) => ({
        name,
        percentage: Math.round(value),
        value: Math.round(value),
      }));

    const toneOfVoice = generateToneOfVoice(
      formData.attributes,
      formData.feelings
    );

    const oneLineStory = generateStory(formData);

    const keywords = generateKeywords(formData);

    const visualDirectives = generateVisualDirectives(
      sortedArchetypes[0]?.name,
      formData.stage
    );

    const nextStep = getNextStep(score);

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

    const selectedColors =
      formData.colors
        ?.map((id) => colorPalette.find((c) => c.id === id))
        .filter(Boolean) || [];

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

    const selectedTypography = typographyOptions.find(
      (t) => t.id === formData.typography
    );

    return {
      clarityScore: Math.min(score, 100),
      dominantArchetype: sortedArchetypes[0]?.name || null,
      secondaryArchetype: sortedArchetypes[1]?.name || null,
      archetypeMix: sortedArchetypes,
      coreMotivation: getArchetypeMotivation(sortedArchetypes[0]?.name),
      toneOfVoice,
      oneLineStory,
      keywords,
      visualDirectives,
      nextStep,
      isUnlocked: score >= 100,
      name: formData.name || "Your Brand",
      tagline: formData.tagline || "Your Tagline",
      industry: formData.industry || "Your Industry",
      selectedColors,
      selectedTypography,
      moodboardImage: formData.moodboardImage || null,
      blueprintTitle: generateBlueprintTitle(
        sortedArchetypes[0]?.name,
        formData.stage
      ),
    };
  }, [formData]);

  function analyzeArchetypes(attributes = [], feelings = {}) {
    const archetypeScores = {
      Hero: 0,
      Sage: 0,
      Explorer: 0,
      Innocent: 0,
      Creator: 0,
      Ruler: 0,
      Caregiver: 0,
      Magician: 0,
      Lover: 0,
      Jester: 0,
      Everyman: 0,
      Rebel: 0,
    };

    const attributeMapping = {
      ambitious: ["Hero", "Ruler", "Creator"],
      authentic: ["Everyman", "Sage", "Innocent"],
      bold: ["Hero", "Rebel", "Creator"],
      calm: ["Sage", "Caregiver", "Innocent"],
      carefree: ["Jester", "Explorer", "Innocent"],
      charming: ["Lover", "Jester", "Magician"],
      courageous: ["Hero", "Explorer", "Rebel"],
      creative: ["Creator", "Magician", "Explorer"],
      energetic: ["Hero", "Jester", "Explorer"],
      exclusive: ["Ruler", "Lover", "Magician"],
      harmonious: ["Caregiver", "Innocent", "Sage"],
      honest: ["Sage", "Everyman", "Caregiver"],
      innovative: ["Creator", "Magician", "Sage"],
      joyful: ["Jester", "Innocent", "Lover"],
      mysterious: ["Magician", "Sage", "Rebel"],
      passionate: ["Lover", "Hero", "Creator"],
      playful: ["Jester", "Innocent", "Explorer"],
      professional: ["Sage", "Ruler", "Caregiver"],
      responsible: ["Caregiver", "Ruler", "Sage"],
      spiritual: ["Sage", "Magician", "Caregiver"],
      trustworthy: ["Everyman", "Caregiver", "Sage"],
      wise: ["Sage", "Ruler", "Magician"],
    };

    attributes.forEach((attr) => {
      const archetypes = attributeMapping[attr] || [];
      archetypes.forEach((arch, index) => {
        archetypeScores[arch] += (3 - index) * 10;
      });
    });

    if (feelings.stability > 5) archetypeScores["Ruler"] += 15;
    if (feelings.stability < -5) archetypeScores["Explorer"] += 15;
    if (feelings.belonging > 5) archetypeScores["Caregiver"] += 15;
    if (feelings.belonging < -5) archetypeScores["Hero"] += 15;
    if (feelings.formal > 5) archetypeScores["Everyman"] += 15;
    if (feelings.formal < -5) archetypeScores["Ruler"] += 15;
    if (feelings.modern < -5) archetypeScores["Sage"] += 15;
    if (feelings.powerful > 5) archetypeScores["Lover"] += 15;
    if (feelings.powerful < -5) archetypeScores["Hero"] += 15;

    const total = Object.values(archetypeScores).reduce((a, b) => a + b, 0);
    if (total > 0) {
      Object.keys(archetypeScores).forEach((key) => {
        archetypeScores[key] = (archetypeScores[key] / total) * 100;
      });
    }

    return archetypeScores;
  }

  function getArchetypeMotivation(archetype) {
    const motivations = {
      Hero: "To prove one's worth through courageous acts and overcome challenges",
      Sage: "To use intelligence and analysis to understand the world",
      Explorer: "To discover new experiences and maintain independence",
      Innocent: "To be happy, safe, and create paradise",
      Creator: "To create something of enduring value and express vision",
      Ruler: "To create a prosperous and successful community",
      Caregiver: "To protect and care for others",
      Magician: "To make dreams come true and create special moments",
      Lover: "To attain intimacy and experience sensory pleasure",
      Jester: "To bring joy and laughter to the world",
      Everyman: "To connect with others and belong",
      Rebel: "To revolutionize and break the rules",
    };
    return motivations[archetype] || "Define your brand's purpose";
  }

  function generateToneOfVoice(attributes = [], feelings = {}) {
    const tones = [];

    if (attributes.includes("bold") || attributes.includes("courageous"))
      tones.push("Bold");
    if (
      attributes.includes("professional") ||
      attributes.includes("trustworthy")
    )
      tones.push("Professional");
    if (attributes.includes("playful") || attributes.includes("joyful"))
      tones.push("Playful");
    if (attributes.includes("authentic") || attributes.includes("honest"))
      tones.push("Authentic");
    if (attributes.includes("innovative") || attributes.includes("creative"))
      tones.push("Innovative");
    if (attributes.includes("calm") || attributes.includes("harmonious"))
      tones.push("Calm");
    if (attributes.includes("passionate") || attributes.includes("energetic"))
      tones.push("Energetic");

    if (feelings.formal < 0) tones.push("Formal");
    if (feelings.formal > 5) tones.push("Friendly");
    if (feelings.inspirational < -5) tones.push("Comforting");
    if (feelings.inspirational > 5) tones.push("Inspirational");

    return tones.slice(0, 4);
  }

  function generateStory(data) {
    if (!data.name)
      return "Your brand story will appear as you fill in the details";

    const { name, tagline, industry, stage, attributes } = data;
    const stageText =
      stage === "challenger"
        ? "emerging"
        : stage === "contender"
        ? "growing"
        : "leading";
    const attrText = attributes?.slice(0, 2).join(" and ") || "innovative";

    return `${name} is an ${stageText} ${
      industry || "brand"
    } that is ${attrText}${
      tagline ? `, with a mission to ${tagline.toLowerCase()}` : ""
    }`;
  }

  function generateKeywords(data) {
    const keywords = [];

    if (data.name) keywords.push(data.name);
    if (data.industry) keywords.push(data.industry.split(" & ")[0]);
    if (data.stage === "challenger") keywords.push("Innovative", "Disruptive");
    if (data.stage === "contender") keywords.push("Growing", "Dynamic");
    if (data.stage === "leader") keywords.push("Established", "Trusted");

    data.attributes?.slice(0, 3).forEach((attr) => {
      keywords.push(attr.charAt(0).toUpperCase() + attr.slice(1));
    });

    return keywords.slice(0, 8);
  }

  function generateVisualDirectives(archetype, stage) {
    const directives = {
      Hero: {
        style: "Bold, strong, dynamic with clean lines",
        imagery: "Action-oriented, aspirational, triumph over adversity",
        mood: "Confident, determined, powerful",
      },
      Sage: {
        style: "Clean, minimalist, sophisticated with subtle details",
        imagery: "Educational, thought-provoking, timeless wisdom",
        mood: "Intelligent, trustworthy, contemplative",
      },
      Explorer: {
        style: "Adventurous, rugged, outdoor-inspired",
        imagery: "Nature, journey, discovery, wide open spaces",
        mood: "Free-spirited, exciting, authentic",
      },
      Creator: {
        style: "Artistic, imaginative, expressive with unique touches",
        imagery: "Innovation, craftsmanship, creative process",
        mood: "Inspiring, original, visionary",
      },
      Ruler: {
        style: "Luxurious, refined, commanding with premium finishes",
        imagery: "Success, exclusivity, high quality",
        mood: "Confident, sophisticated, authoritative",
      },
      Caregiver: {
        style: "Warm, gentle, approachable with soft edges",
        imagery: "Nurturing, supportive, compassionate scenes",
        mood: "Caring, protective, comforting",
      },
      Magician: {
        style: "Mystical, transformative, surprising elements",
        imagery: "Transformation, wonder, special moments",
        mood: "Enchanting, visionary, extraordinary",
      },
      Lover: {
        style: "Sensual, elegant, indulgent with rich textures",
        imagery: "Beauty, intimacy, sensory experiences",
        mood: "Passionate, seductive, luxurious",
      },
      Jester: {
        style: "Playful, colorful, unexpected with fun elements",
        imagery: "Humor, joy, entertainment, spontaneity",
        mood: "Fun, lighthearted, optimistic",
      },
      Everyman: {
        style: "Relatable, honest, unpretentious",
        imagery: "Real people, everyday moments, community",
        mood: "Friendly, down-to-earth, authentic",
      },
      Rebel: {
        style: "Edgy, unconventional, disruptive",
        imagery: "Breaking rules, revolution, counterculture",
        mood: "Bold, provocative, liberating",
      },
      Innocent: {
        style: "Pure, simple, optimistic with light touches",
        imagery: "Happiness, safety, nostalgia, simplicity",
        mood: "Joyful, positive, pure",
      },
    };

    return (
      directives[archetype] || {
        style: "Modern, clean, professional",
        imagery: "Industry-relevant, aspirational",
        mood: "Confident, approachable, trustworthy",
      }
    );
  }

  function getNextStep(score) {
    if (score < 40) return "Complete basic info: name, tagline, and industry";
    if (score < 70) return "Define personality: select attributes and feelings";
    if (score < 90) return "Choose your market position and brand stage";
    if (score < 100) return "Finalize aesthetics: colors and typography";
    return "Blueprint complete! Download or refine your brand";
  }

  function generateBlueprintTitle(archetype, stage) {
    if (!archetype) return "Building your brand blueprint...";
    const stageText =
      stage === "challenger"
        ? "Emerging"
        : stage === "contender"
        ? "Scaling"
        : "Leading";
    return `${stageText} ${archetype} brand with strategic positioning`;
  }

  useEffect(() => {
    if (analyzeFormData) {
      let start = animatedScore;
      const end = analyzeFormData.clarityScore;
      const duration = 1000;
      const increment = (end - start) / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (
          (increment > 0 && start >= end) ||
          (increment < 0 && start <= end)
        ) {
          setAnimatedScore(end);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [analyzeFormData?.clarityScore]);

  useEffect(() => {
    if (analyzeFormData?.archetypeMix) {
      const timers = analyzeFormData.archetypeMix.map((arch, index) => {
        let start = animatedArchetypes[index] || 0;
        const end = arch.percentage || 0;
        const duration = 1000;
        const increment = (end - start) / (duration / 16);

        return setInterval(() => {
          start += increment;
          if (
            (increment > 0 && start >= end) ||
            (increment < 0 && start <= end)
          ) {
            setAnimatedArchetypes((prev) => {
              const newValues = [...prev];
              newValues[index] = end;
              return newValues;
            });
            clearInterval(timers[index]);
          } else {
            setAnimatedArchetypes((prev) => {
              const newValues = [...prev];
              newValues[index] = Math.floor(start);
              return newValues;
            });
          }
        }, 16);
      });

      return () => timers.forEach((timer) => clearInterval(timer));
    }
  }, [analyzeFormData?.archetypeMix]);

  const handleDownloadPDF = async () => {
    if (!analyzeFormData) return;

    setIsDownloading(true);

    try {
      const { default: jsPDF } = await import("jspdf");

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = 20;

      const checkPageBreak = (neededHeight) => {
        if (yPosition + neededHeight > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
          return true;
        }
        return false;
      };

      doc.setFontSize(22);
      doc.setTextColor(40, 40, 40);
      doc.setFont(undefined, "bold");
      doc.text("BRAND STRATEGY BLUEPRINT", pageWidth / 2, yPosition, {
        align: "center",
      });

      yPosition += 10;
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.setTextColor(100, 100, 100);
      doc.text(
        `Generated on: ${new Date().toLocaleDateString()}`,
        pageWidth / 2,
        yPosition,
        { align: "center" }
      );

      yPosition += 15;

      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, "bold");
      doc.text("1. BRAND IDENTITY SUMMARY", margin, yPosition);
      yPosition += 8;

      doc.setFontSize(11);
      doc.setFont(undefined, "normal");
      const summaryItems = [
        ["Brand Name:", analyzeFormData.name],
        ["Tagline:", analyzeFormData.tagline],
        ["Industry:", analyzeFormData.industry],
        ["Clarity Score:", `${analyzeFormData.clarityScore}%`],
        ["Strategic Title:", analyzeFormData.blueprintTitle],
      ];

      summaryItems.forEach(([label, value]) => {
        doc.setFont(undefined, "bold");
        doc.text(label, margin + 5, yPosition);
        doc.setFont(undefined, "normal");
        doc.text(String(value), margin + 45, yPosition);
        yPosition += 7;
      });

      yPosition += 5;

      checkPageBreak(40);
      doc.setFontSize(14);
      doc.setFont(undefined, "bold");
      doc.text("2. STRATEGIC ARCHETYPES", margin, yPosition);
      yPosition += 8;

      doc.setFontSize(11);
      doc.setFont(undefined, "bold");
      doc.text(
        `Dominant Archetype: ${analyzeFormData.dominantArchetype}`,
        margin + 5,
        yPosition
      );
      yPosition += 7;

      doc.setFont(undefined, "normal");
      const motivationLines = doc.splitTextToSize(
        `Core Motivation: ${analyzeFormData.coreMotivation}`,
        pageWidth - margin * 2 - 10
      );
      doc.text(motivationLines, margin + 5, yPosition);
      yPosition += motivationLines.length * 6 + 2;

      analyzeFormData.archetypeMix.forEach((arch) => {
        doc.text(`- ${arch.name}: ${arch.percentage}%`, margin + 10, yPosition);
        yPosition += 6;
      });

      yPosition += 5;

      checkPageBreak(40);
      doc.setFontSize(14);
      doc.setFont(undefined, "bold");
      doc.text("3. VOICE AND STORYTELLING", margin, yPosition);
      yPosition += 8;

      doc.setFontSize(11);
      doc.setFont(undefined, "bold");
      doc.text("Tone of Voice:", margin + 5, yPosition);
      doc.setFont(undefined, "normal");
      doc.text(analyzeFormData.toneOfVoice.join(", "), margin + 40, yPosition);
      yPosition += 8;

      doc.setFont(undefined, "bold");
      doc.text("One-Line Brand Story:", margin + 5, yPosition);
      yPosition += 6;
      doc.setFont(undefined, "normal");
      const storyLines = doc.splitTextToSize(
        analyzeFormData.oneLineStory,
        pageWidth - margin * 2 - 10
      );
      doc.text(storyLines, margin + 5, yPosition);
      yPosition += storyLines.length * 6 + 10;

      checkPageBreak(60);
      doc.setFontSize(14);
      doc.setFont(undefined, "bold");
      doc.text("4. VISUAL DIRECTION & ASSETS", margin, yPosition);
      yPosition += 8;

      const visualData = [
        ["Visual Style:", analyzeFormData.visualDirectives.style],
        ["Imagery Type:", analyzeFormData.visualDirectives.imagery],
        ["Overall Mood:", analyzeFormData.visualDirectives.mood],
      ];

      visualData.forEach(([label, value]) => {
        doc.setFont(undefined, "bold");
        doc.text(label, margin + 5, yPosition);
        yPosition += 6;
        doc.setFont(undefined, "normal");
        const vLines = doc.splitTextToSize(value, pageWidth - margin * 2 - 10);
        doc.text(vLines, margin + 5, yPosition);
        yPosition += vLines.length * 6 + 2;
      });

      if (analyzeFormData.selectedColors?.length > 0) {
        yPosition += 5;
        doc.setFont(undefined, "bold");
        doc.text("Color Palette:", margin + 5, yPosition);
        yPosition += 7;
        doc.setFont(undefined, "normal");
        analyzeFormData.selectedColors.forEach((color) => {
          checkPageBreak(10);
          doc.text(
            `- ${color.name} (${color.hex}): ${color.desc}`,
            margin + 10,
            yPosition
          );
          yPosition += 6;
        });
      }

      if (analyzeFormData.moodboardImage) {
        checkPageBreak(100);
        yPosition += 10;
        doc.setFontSize(14);
        doc.setFont(undefined, "bold");
        doc.text("5. BRAND MOODBOARD", margin, yPosition);
        yPosition += 10;

        try {
          const imgProps = doc.getImageProperties(
            analyzeFormData.moodboardImage
          );
          const maxImgWidth = pageWidth - margin * 2;
          const imgHeight = (imgProps.height * maxImgWidth) / imgProps.width;

          if (yPosition + imgHeight > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
          }

          doc.addImage(
            analyzeFormData.moodboardImage,
            "JPEG",
            margin,
            yPosition,
            maxImgWidth,
            imgHeight
          );
          yPosition += imgHeight + 15;
        } catch (imgError) {
          console.error("PDF-ga rasm qo'shishda xato:", imgError);
          doc.setFontSize(10);
          doc.setTextColor(200, 0, 0);
          doc.text("[Error loading moodboard image]", margin + 5, yPosition);
          yPosition += 10;
        }
      }

      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(
          `Confidential Brand Blueprint | ClarityOS Engine | Page ${i} of ${pageCount}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: "center" }
        );
      }

      const fileName = `${analyzeFormData.name.replace(
        /\s+/g,
        "_"
      )}_Strategy_Blueprint.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (!analyzeFormData) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-violet-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            Start filling the brief to see your brand analysis...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            ✨ Powered by Real-time Analysis
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out forwards;
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-md transition-all duration-300 animate-fadeInUp border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="#E5E7EB"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="url(#gradient)"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 32 * (1 - animatedScore / 100)
                  }`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">
                  {animatedScore}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-md font-bold text-gray-900">Clarity Score</p>
              <p className="text-xs text-gray-500 mt-1">Real-time Analysis</p>
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl p-6 shadow-md transition-all duration-300 animate-fadeInUp border border-gray-100"
          style={{ animationDelay: "0.1s" }}
        >
          <h3 className="text-md font-bold text-gray-900 mb-2 text-center">
            Next Step
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed text-center">
            {analyzeFormData.nextStep}
          </p>
        </div>

        <div
          className="bg-white rounded-2xl p-6 shadow-md transition-all duration-300 animate-fadeInUp border border-violet-100"
          style={{ animationDelay: "0.2s" }}
        >
          <h3 className="text-md font-bold text-gray-900 text-center">
            Brand Status
          </h3>
          <p className="text-xs text-center text-gray-600 mb-3">
            {analyzeFormData.isUnlocked
              ? "✓ Complete"
              : `${animatedScore}% Complete`}
          </p>
          <div className="flex gap-3 justify-center">
            <div
              className={`w-10 h-10 rounded-lg shadow-sm flex items-center justify-center transition-all ${
                analyzeFormData.isUnlocked
                  ? "bg-violet-100 text-violet-600 hover:scale-110"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <BookOpenIcon className="w-6 h-6" />
            </div>
            <div
              className={`w-10 h-10 rounded-lg shadow-sm flex items-center justify-center transition-all ${
                analyzeFormData.isUnlocked
                  ? "bg-violet-100 text-violet-600 hover:scale-110"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <DocumentChartBarIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <section
        className="bg-white rounded-2xl p-8 shadow-md transition-all duration-300 mb-6 animate-fadeInUp border border-gray-100"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="text-3xl">🧬</span>
          <h2 className="text-xl font-bold text-gray-900">
            Strategic Insights
          </h2>
        </div>

        <p className="text-sm text-gray-500 mb-2 font-medium">
          Dominant Archetype
        </p>
        <h3 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 mb-2">
          # {analyzeFormData.dominantArchetype || "Building..."}
        </h3>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          <span className="font-semibold">Core Motivation:</span>
          <br />
          {analyzeFormData.coreMotivation}
        </p>

        <div className="space-y-4 mb-6">
          <p className="text-gray-600 font-semibold">Archetype Mix</p>
          {analyzeFormData.archetypeMix.map((arch, index) => (
            <div key={arch.name} className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {arch.name}
                </span>
                <span className="text-sm font-bold text-violet-600">
                  {animatedArchetypes[index] || 0}%
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                  <div
                    className="h-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                    style={{ width: `${animatedArchetypes[index] || 0}%` }}
                  >
                    <div className="absolute inset-0 shimmer"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-100">
          <p className="text-sm font-semibold text-violet-700 mb-1">
            Blueprint Logic
          </p>
          <p className="text-sm text-gray-700">
            {analyzeFormData.blueprintTitle}
          </p>
        </div>
      </section>

      <section
        className="bg-white rounded-2xl p-8 shadow-md transition-all duration-300 mb-6 animate-fadeInUp border border-gray-100"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="text-3xl">🗣️</span>
          <h2 className="text-xl font-bold text-gray-900">
            Your Voice & Story
          </h2>
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Tone of Voice
          </p>
          <div className="flex flex-wrap gap-2">
            {analyzeFormData.toneOfVoice.length > 0 ? (
              analyzeFormData.toneOfVoice.map((tone, index) => (
                <span
                  key={tone}
                  className="px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 text-sm font-medium rounded-full hover:scale-105 transition-transform animate-scaleIn border border-violet-200"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {tone}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400">
                Select attributes to generate tone of voice
              </span>
            )}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Your One-Line Story
          </p>
          <div className="bg-gradient-to-r from-gray-50 to-violet-50 rounded-xl p-4 border-l-4 border-violet-500">
            <p className="text-sm text-gray-800 italic leading-relaxed">
              {analyzeFormData.oneLineStory}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Marketing Keywords
          </p>
          <div className="flex flex-wrap gap-2">
            {analyzeFormData.keywords.length > 0 ? (
              analyzeFormData.keywords.map((kw, index) => (
                <span
                  key={kw}
                  className="px-3 py-1.5 bg-violet-50 text-violet-700 text-xs font-medium rounded-full hover:bg-violet-100 transition-colors animate-scaleIn border border-violet-200"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {kw}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400">
                Keywords will appear as you build your brand
              </span>
            )}
          </div>
        </div>
      </section>

      <section
        className="bg-white rounded-2xl p-8 shadow-md transition-all duration-300 mb-6 animate-fadeInUp border border-gray-100"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="text-3xl">🎨</span>
          <h2 className="text-xl font-bold text-gray-900">
            Your Visual Blueprint
          </h2>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Your visual identity based on brand personality and choices.
        </p>

        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-gray-200 p-4">
            <div className="font-bold text-base text-gray-900">
              {analyzeFormData.dominantArchetype || "Your"} Visual Direction
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="grid grid-cols-2 hover:bg-gray-50 transition-colors">
              <div className="p-4 text-sm font-medium text-gray-600">
                Style:
              </div>
              <div className="p-4 text-sm text-gray-900 border-l border-gray-200">
                {analyzeFormData.visualDirectives.style}
              </div>
            </div>
            <div className="grid grid-cols-2 hover:bg-gray-50 transition-colors">
              <div className="p-4 text-sm font-medium text-gray-600">
                Imagery:
              </div>
              <div className="p-4 text-sm text-gray-900 border-l border-gray-200">
                {analyzeFormData.visualDirectives.imagery}
              </div>
            </div>
            <div className="grid grid-cols-2 hover:bg-gray-50 transition-colors">
              <div className="p-4 text-sm font-medium text-gray-600">Mood:</div>
              <div className="p-4 text-sm text-gray-900 border-l border-gray-200">
                {analyzeFormData.visualDirectives.mood}
              </div>
            </div>
          </div>
        </div>

        {analyzeFormData.selectedColors &&
          analyzeFormData.selectedColors.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Your Color Palette
                </h3>
                <span className="px-3 py-1 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full">
                  {analyzeFormData.selectedColors.length} colors
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {analyzeFormData.selectedColors.map((color, index) => (
                  <div
                    key={color.id}
                    className="animate-scaleIn group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative">
                      <div
                        className="w-full aspect-square rounded-xl shadow-lg border-2 border-gray-200 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
                        style={{ backgroundColor: color.hex }}
                      >
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
                      </div>
                      <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg
                          className="w-4 h-4 text-violet-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-xs font-bold text-gray-900">
                        {color.name}
                      </p>
                      <p className="text-xs text-gray-500 font-mono">
                        {color.hex}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{color.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {analyzeFormData.moodboardImage && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Your Brand Moodboard
            </h3>
            <div className="rounded-2xl overflow-hidden border-2 border-violet-100 shadow-md bg-gray-50 p-2">
              <img
                src={analyzeFormData.moodboardImage}
                alt="Brand Visual Reference"
                className="w-full h-auto max-h-[500px] object-contain rounded-xl"
              />
              <div className="mt-2 text-center">
                <span className="text-xs text-violet-500 font-medium uppercase tracking-wider">
                  Visual Inspiration Reference
                </span>
              </div>
            </div>
          </div>
        )}

        {analyzeFormData.selectedTypography && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Your Typography
              </h3>
              <span className="px-3 py-1 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full">
                Selected Style
              </span>
            </div>
            <div className="border-2 border-violet-200 bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 rounded-2xl p-8 animate-scaleIn shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 text-center md:text-left">
                  <div
                    className="text-8xl font-bold mb-4 text-gray-900 animate-pulse"
                    style={{
                      fontFamily: analyzeFormData.selectedTypography.style,
                    }}
                  >
                    {analyzeFormData.selectedTypography.letter}
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-2">
                    {analyzeFormData.selectedTypography.name}
                  </p>
                  <p className="text-base text-gray-600 mb-4">
                    {analyzeFormData.selectedTypography.desc}
                  </p>
                  <div className="inline-block px-4 py-2 bg-white rounded-lg shadow-md">
                    <p className="text-xs text-gray-500">Font Family</p>
                    <p className="text-sm font-mono text-gray-900">
                      {analyzeFormData.selectedTypography.style}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="px-6 py-3 bg-violet-600 text-white rounded-xl text-sm font-semibold shadow-lg flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Selected
                  </div>
                  <div className="text-center text-xs text-gray-500">
                    Perfect for your
                    <br />
                    brand personality
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(!analyzeFormData.selectedColors ||
          analyzeFormData.selectedColors.length === 0) &&
          !analyzeFormData.selectedTypography && (
            <div className="text-center py-8 bg-gray-50 rounded-xl">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
              <p className="text-gray-600 mb-2">
                No visual elements selected yet
              </p>
              <p className="text-sm text-gray-500">
                Choose colors and typography in Step 4 to see them here
              </p>
            </div>
          )}
      </section>

      <section
        className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl p-8 shadow-xl animate-fadeInUp text-white"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="text-3xl">✨</span>
          <h2 className="text-xl font-bold">Brand Summary</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-violet-100 text-sm mb-2">Brand Name</p>
            <p className="text-2xl font-bold">{analyzeFormData.name}</p>
          </div>
          <div>
            <p className="text-violet-100 text-sm mb-2">Tagline</p>
            <p className="text-lg font-semibold">{analyzeFormData.tagline}</p>
          </div>
          <div>
            <p className="text-violet-100 text-sm mb-2">Industry</p>
            <p className="text-lg font-semibold">{analyzeFormData.industry}</p>
          </div>
          <div>
            <p className="text-violet-100 text-sm mb-2">Archetype</p>
            <p className="text-lg font-semibold">
              {analyzeFormData.dominantArchetype || "---"} +{" "}
              {analyzeFormData.secondaryArchetype || "---"}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-violet-400">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-violet-100 text-sm mb-1">Blueprint Status</p>
              <p className="text-lg font-bold">
                {analyzeFormData.isUnlocked
                  ? "🎉 Complete & Ready"
                  : `⏳ ${animatedScore}% Complete`}
              </p>
            </div>
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading || !analyzeFormData.isUnlocked}
              className="bg-white text-violet-600 px-6 py-3 rounded-lg font-semibold hover:bg-violet-50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
            >
              {isDownloading ? (
                <>
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
                  Generating...
                </>
              ) : (
                <>📥 Download Blueprint</>
              )}
            </button>
          </div>
          {!analyzeFormData.isUnlocked && (
            <p className="text-xs text-violet-200 mt-3">
              Complete all fields to unlock download
            </p>
          )}
        </div>
      </section>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          ✨ Powered by{" "}
          <span className="font-semibold text-violet-600">
            Real-time Analysis Engine
          </span>
        </p>
      </div>
    </div>
  );
}
