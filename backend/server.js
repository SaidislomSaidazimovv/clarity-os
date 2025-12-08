import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const archetypeDefinitions = {
  Hero: "Courageous, determined, inspiring - brands that help customers overcome challenges (Nike, FedEx)",
  Innocent:
    "Pure, optimistic, simple - brands that evoke nostalgia and trust (Coca-Cola, Disney)",
  Ruler:
    "Powerful, commanding, luxurious - brands that represent status and control (Rolex, Mercedes)",
  Creator:
    "Innovative, imaginative, expressive - brands that value self-expression (Adobe, Lego)",
  Caregiver:
    "Nurturing, compassionate, protective - brands that care for others (Johnson & Johnson, TOMS)",
  Everyman:
    "Relatable, friendly, down-to-earth - brands for everyday people (IKEA, Target)",
  Jester:
    "Fun, playful, entertaining - brands that bring joy and humor (M&M's, Fanta)",
  Lover:
    "Passionate, sensual, intimate - brands focused on beauty and desire (Dior, Victoria's Secret)",
  Magician:
    "Transformative, visionary, mystical - brands that create magical experiences (Tesla, Disney)",
  Rebel:
    "Revolutionary, bold, disruptive - brands that challenge the status quo (Apple, Harley-Davidson)",
  Explorer:
    "Adventurous, independent, pioneering - brands for discovery (National Geographic, Red Bull)",
  Sage: "Knowledgeable, wise, analytical - brands focused on truth and insight (TED, New York Times)",
};

const colorPalette = [
  {
    id: "red",
    hex: "#C8102E",
    name: "Bold Red",
    effects: {
      moodDirectives: {
        confident: 15,
        determined: 10,
        strong: 5,
      },
    },
  },
  {
    id: "blue",
    hex: "#003366",
    name: "Deep Blue",
    effects: {
      moodDirectives: {
        trustworthy: 15,
        authoritative: 10,
        intelligent: 5,
      },
    },
  },
  {
    id: "yellow",
    hex: "#FFD700",
    name: "Vibrant Yellow",
    effects: {
      moodDirectives: {
        joyful: 15,
        optimistic: 10,
        serene: 5,
      },
    },
  },
  {
    id: "green",
    hex: "#1E7145",
    name: "Forest Green",
    effects: {
      moodDirectives: {
        adventurous: 15,
        natural: 10,
        free_spirited: 5,
      },
    },
  },
  {
    id: "black_dark_gray",
    hex: "#1E1E1E",
    name: "Dark Gray",
    effects: {
      moodDirectives: {
        edgy: 15,
        defiant: 10,
        exclusive: 5,
      },
    },
  },
  {
    id: "gold_brown",
    hex: "#A88F3B",
    name: "Elegant Gold",
    effects: {
      moodDirectives: {
        prestigious: 15,
        commanding: 10,
        status: 5,
      },
    },
  },
  {
    id: "orange",
    hex: "#FF6700",
    name: "Energetic Orange",
    effects: {
      moodDirectives: {
        creative: 15,
        imaginative: 10,
        expressive: 5,
      },
    },
  },
  {
    id: "teal_turquoise",
    hex: "#008080",
    name: "Calm Teal",
    effects: {
      moodDirectives: {
        nurturing: 15,
        supportive: 10,
        protective: 5,
      },
    },
  },
  {
    id: "light_green_everyman",
    hex: "#8FBC8F",
    name: "Soft Green",
    effects: {
      moodDirectives: {
        relatable: 15,
        familiar: 10,
        down_to_earth: 5,
      },
    },
  },
  {
    id: "pink",
    hex: "#FF69B4",
    name: "Romantic Pink",
    effects: {
      moodDirectives: {
        sensual: 15,
        passionate: 10,
        romantic: 5,
      },
    },
  },
  {
    id: "cyan_jester",
    hex: "#00FFFF",
    name: "Playful Cyan",
    effects: {
      moodDirectives: {
        playful: 15,
        fun: 10,
        light_hearted: 5,
      },
    },
  },
  {
    id: "purple_magician",
    hex: "#5D3B8E",
    name: "Mystical Purple",
    effects: {
      moodDirectives: {
        visionary: 15,
        mysterious: 10,
        wonder: 5,
      },
    },
  },
];

const attributeThemes = {
  trust_theme: {
    keywords: ["trustworthy", "responsible", "professional", "honest"],
    description: "Trust & Reliability",
    relatedArchetypes: ["Ruler", "Sage", "Caregiver"],
  },
  innovation_theme: {
    keywords: ["innovative", "creative", "mysterious", "wise"],
    description: "Innovation & Creativity",
    relatedArchetypes: ["Creator", "Magician", "Sage"],
  },
  exclusivity_theme: {
    keywords: ["exclusive", "professional", "ambitious", "charming"],
    description: "Exclusivity & Prestige",
    relatedArchetypes: ["Ruler", "Lover"],
  },
  simplicity_theme: {
    keywords: ["calm", "harmonious", "carefree", "joyful", "honest"],
    description: "Simplicity & Joy",
    relatedArchetypes: ["Innocent", "Jester"],
  },
  freedom_adventure_theme: {
    keywords: ["energetic", "carefree", "ambitious", "bold"],
    description: "Freedom & Adventure",
    relatedArchetypes: ["Explorer", "Rebel", "Hero"],
  },
  mastery_courage_theme: {
    keywords: ["courageous", "bold", "energetic", "ambitious"],
    description: "Courage & Mastery",
    relatedArchetypes: ["Hero", "Ruler"],
  },
  connection_intimacy_theme: {
    keywords: ["passionate", "charming", "authentic"],
    description: "Connection & Passion",
    relatedArchetypes: ["Lover", "Everyman"],
  },
  authenticity_relatability_theme: {
    keywords: ["authentic", "honest", "relatable"],
    description: "Authenticity & Relatability",
    relatedArchetypes: ["Everyman", "Caregiver"],
  },
  spiritual_theme: {
    keywords: ["spiritual", "mysterious", "harmonious", "wise"],
    description: "Spirituality & Wisdom",
    relatedArchetypes: ["Sage", "Magician"],
  },
};

const typographyStyles = [
  {
    id: "serif_classic",
    name: "Classic Serif",
    effects: {
      styleDirectives: {
        classic: 20,
        refined: 15,
        prestigious: 10,
        traditional: 15,
        professional: 12,
      },
    },
  },
  {
    id: "sans_modern",
    name: "Modern Sans",
    effects: {
      styleDirectives: {
        clean: 20,
        modern: 15,
        simple: 10,
        minimal: 12,
        contemporary: 10,
      },
    },
  },
  {
    id: "custom_script",
    name: "Script",
    effects: {
      styleDirectives: {
        authentic: 20,
        cursive: 15,
        soft: 10,
        elegant: 12,
        personal: 15,
      },
    },
  },
  {
    id: "rounded_sans",
    name: "Rounded Sans",
    effects: {
      styleDirectives: {
        rounded: 20,
        friendly: 15,
        approachable: 10,
        warm: 12,
        accessible: 10,
      },
    },
  },
  {
    id: "retro_futuristic",
    name: "Retro Display",
    effects: {
      styleDirectives: {
        futuristic: 20,
        dynamic: 15,
        bold: 10,
        eyecatching: 12,
        creative: 10,
      },
    },
  },
  {
    id: "variable_dynamic",
    name: "Variable",
    effects: {
      styleDirectives: {
        dynamic: 20,
        innovative: 15,
        scalable: 10,
        flexible: 12,
        cuttingedge: 10,
      },
    },
  },
  {
    id: "unstructured_fluid",
    name: "Fluid",
    effects: {
      styleDirectives: {
        unrestricted: 20,
        expressive: 15,
        fluid: 10,
        artistic: 12,
        freeflowing: 10,
      },
    },
  },
];

const feelingsScales = [
  {
    id: "stability_risk",
    labelLeft: "Stability & Control",
    labelRight: "Risk & Mastery",
    effects: {
      archetypePoints: [
        { archetype: "Hero", points: 30 },
        { archetype: "Rebel", points: 20 },
        { archetype: "Explorer", points: 10 },
      ],
      keywords: ["Courage"],
      tone: ["Bold", "Confident"],
    },
  },
  {
    id: "belonging_independence",
    labelLeft: "Belonging & Community",
    labelRight: "Independence & Self-realization",
    effects: {
      archetypePoints: [
        { archetype: "Explorer", points: 30 },
        { archetype: "Creator", points: 25 },
        { archetype: "Rebel", points: 15 },
      ],
      keywords: ["Freedom", "Self-expression", "Discovery"],
      tone: ["Autonomous", "Individualistic", "Creative"],
    },
  },
  {
    id: "formal_friendly",
    labelLeft: "Formal",
    labelRight: "Friendly",
    effects: {
      archetypePoints: [
        { archetype: "Everyman", points: 30 },
        { archetype: "Jester", points: 20 },
        { archetype: "Caregiver", points: 10 },
      ],
      keywords: ["Accessible", "Relatable", "Down-to-earth"],
      tone: ["Approachable", "Warm", "Genuine"],
    },
  },
  {
    id: "modern_timeless",
    labelLeft: "Modern",
    labelRight: "Timeless",
    effects: {
      archetypePoints: [
        { archetype: "Innocent", points: 30 },
        { archetype: "Sage", points: 20 },
        { archetype: "Ruler", points: 10 },
      ],
      keywords: ["Timeless", "Simple", "Tradition", "Integrity"],
      tone: ["Consistent", "Objective", "Classic"],
    },
  },
  {
    id: "inspirational_comforting",
    labelLeft: "Inspirational",
    labelRight: "Comforting",
    effects: {
      archetypePoints: [
        { archetype: "Caregiver", points: 35 },
        { archetype: "Innocent", points: 20 },
      ],
      keywords: ["Comfort", "Nurturing", "Protection", "Familiar"],
      tone: ["Warm", "Supportive", "Compassionate"],
    },
  },
  {
    id: "powerful_tender",
    labelLeft: "Powerful",
    labelRight: "Tender",
    effects: {
      archetypePoints: [
        { archetype: "Lover", points: 35 },
        { archetype: "Caregiver", points: 15 },
      ],
      keywords: ["Sensual", "Intimacy", "Passion", "Gentle"],
      tone: ["Romantic", "Idealistic", "Soft"],
    },
  },
];

const logoData = [
  {
    id: 1,
    filename: "universal_minimalist_geometric_icon.png",
    group: "universal",
    archetype: "Creator",
    url: "/logos/universal_minimalist_geometric_icon.png",
  },
  {
    id: 2,
    filename: "universal_minimalist_bold_wordmark.png",
    group: "universal",
    archetype: "Hero",
    url: "/logos/universal_minimalist_bold_wordmark.png",
  },
  {
    id: 3,
    filename: "universal_classic_elegant_serif_type.png",
    group: "universal",
    archetype: "Ruler",
    url: "/logos/universal_classic_elegant_serif_type.png",
  },
  {
    id: 4,
    filename: "universal_classic_heritage_emblem.png",
    group: "universal",
    archetype: "Innocent",
    url: "/logos/universal_classic_heritage_emblem.png",
  },
  {
    id: 5,
    filename: "universal_modern_clean_sans_serif_logo.png",
    group: "universal",
    archetype: "Sage",
    url: "/logos/universal_modern_clean_sans_serif_logo.png",
  },
  {
    id: 6,
    filename: "universal_modern_dynamic_gradient_shape.png",
    group: "universal",
    archetype: "Magician",
    url: "/logos/universal_modern_dynamic_gradient_shape.png",
  },
  {
    id: 7,
    filename: "universal_organic_handcrafted_lines.png",
    group: "universal",
    archetype: "Caregiver",
    url: "/logos/universal_organic_handcrafted_lines.png",
  },
  {
    id: 8,
    filename: "universal_typography_expressive_custom_script.png",
    group: "universal",
    archetype: "Lover",
    url: "/logos/universal_typography_expressive_custom_script.png",
  },
  {
    id: 9,
    filename: "universal_abstract_conceptual_mark.png",
    group: "universal",
    archetype: "Explorer",
    url: "/logos/universal_abstract_conceptual_mark.png",
  },
  {
    id: 10,
    filename: "universal_geometric_structured_pattern.png",
    group: "universal",
    archetype: "Creator",
    url: "/logos/universal_geometric_structured_pattern.png",
  },
  {
    id: 11,
    filename: "universal_clever_negative_space_icon.png",
    group: "universal",
    archetype: "Sage",
    url: "/logos/universal_clever_negative_space_icon.png",
  },
  {
    id: 12,
    filename: "universal_friendly_approachable_rounded_style.png",
    group: "universal",
    archetype: "Everyman",
    url: "/logos/universal_friendly_approachable_rounded_style.png",
  },
  {
    id: 13,
    filename: "universal_premium_refined_monogram.png",
    group: "universal",
    archetype: "Ruler",
    url: "/logos/universal_premium_refined_monogram.png",
  },
  {
    id: 14,
    filename: "universal_authentic_textured_badge.png",
    group: "universal",
    archetype: "Everyman",
    url: "/logos/universal_authentic_textured_badge.png",
  },
  {
    id: 15,
    filename: "universal_harmonious_symmetrical_form.png",
    group: "universal",
    archetype: "Innocent",
    url: "/logos/universal_harmonious_symmetrical_form.png",
  },

  {
    id: 16,
    filename: "startup_tech_dynamic_motion_blur.png",
    group: "challenger",
    archetype: "Rebel",
    url: "/logos/startup_tech_dynamic_motion_blur.png",
  },
  {
    id: 17,
    filename: "startup_tech_clever_code_initials.png",
    group: "challenger",
    archetype: "Creator",
    url: "/logos/startup_tech_clever_code_initials.png",
  },
  {
    id: 18,
    filename: "startup_tech_data_stream_pattern.png",
    group: "challenger",
    archetype: "Magician",
    url: "/logos/startup_tech_data_stream_pattern.png",
  },
  {
    id: 19,
    filename: "startup_futuristic_neon_glow_effect.png",
    group: "challenger",
    archetype: "Magician",
    url: "/logos/startup_futuristic_neon_glow_effect.png",
  },
  {
    id: 20,
    filename: "startup_futuristic_sci_fi_typography.png",
    group: "challenger",
    archetype: "Explorer",
    url: "/logos/startup_futuristic_sci_fi_typography.png",
  },
  {
    id: 21,
    filename: "startup_disruptive_asymmetrical_design.png",
    group: "challenger",
    archetype: "Rebel",
    url: "/logos/startup_disruptive_asymmetrical_design.png",
  },
  {
    id: 22,
    filename: "startup_energetic_vibrant_color_burst.png",
    group: "challenger",
    archetype: "Jester",
    url: "/logos/startup_energetic_vibrant_color_burst.png",
  },
  {
    id: 23,
    filename: "startup_agile_sharp_angular_icon.png",
    group: "challenger",
    archetype: "Hero",
    url: "/logos/startup_agile_sharp_angular_icon.png",
  },
  {
    id: 24,
    filename: "startup_visionary_holographic_style.png",
    group: "challenger",
    archetype: "Magician",
    url: "/logos/startup_visionary_holographic_style.png",
  },
  {
    id: 25,
    filename: "startup_bold_minimalist_statement_icon.png",
    group: "challenger",
    archetype: "Rebel",
    url: "/logos/startup_bold_minimalist_statement_icon.png",
  },
  {
    id: 26,
    filename: "startup_intelligent_neural_network_lines.png",
    group: "challenger",
    archetype: "Sage",
    url: "/logos/startup_intelligent_neural_network_lines.png",
  },
  {
    id: 27,
    filename: "startup_fast_forward_arrow_motif.png",
    group: "challenger",
    archetype: "Hero",
    url: "/logos/startup_fast_forward_arrow_motif.png",
  },
  {
    id: 28,
    filename: "startup_experimental_typography_layout.png",
    group: "challenger",
    archetype: "Creator",
    url: "/logos/startup_experimental_typography_layout.png",
  },
  {
    id: 29,
    filename: "startup_glitch_effect_for_disruption.png",
    group: "challenger",
    archetype: "Rebel",
    url: "/logos/startup_glitch_effect_for_disruption.png",
  },
  {
    id: 30,
    filename: "startup_approachable_tech_mascot.png",
    group: "challenger",
    archetype: "Jester",
    url: "/logos/startup_approachable_tech_mascot.png",
  },

  {
    id: 31,
    filename: "scaleup_corporate_strong_serif_mark.png",
    group: "contender",
    archetype: "Ruler",
    url: "/logos/scaleup_corporate_strong_serif_mark.png",
  },
  {
    id: 32,
    filename: "scaleup_trustworthy_interlocking_forms.png",
    group: "contender",
    archetype: "Caregiver",
    url: "/logos/scaleup_trustworthy_interlocking_forms.png",
  },
  {
    id: 33,
    filename: "scaleup_professional_balanced_geometry.png",
    group: "contender",
    archetype: "Sage",
    url: "/logos/scaleup_professional_balanced_geometry.png",
  },
  {
    id: 34,
    filename: "scaleup_authoritative_clean_emblem.png",
    group: "contender",
    archetype: "Ruler",
    url: "/logos/scaleup_authoritative_clean_emblem.png",
  },
  {
    id: 35,
    filename: "scaleup_growth_abstract_upward_movement.png",
    group: "contender",
    archetype: "Hero",
    url: "/logos/scaleup_growth_abstract_upward_movement.png",
  },
  {
    id: 36,
    filename: "scaleup_premium_metallic_gold_accent.png",
    group: "contender",
    archetype: "Ruler",
    url: "/logos/scaleup_premium_metallic_gold_accent.png",
  },
  {
    id: 37,
    filename: "scaleup_global_network_of_dots.png",
    group: "contender",
    archetype: "Explorer",
    url: "/logos/scaleup_global_network_of_dots.png",
  },
  {
    id: 38,
    filename: "scaleup_competent_structured_wordmark.png",
    group: "contender",
    archetype: "Sage",
    url: "/logos/scaleup_competent_structured_wordmark.png",
  },
  {
    id: 39,
    filename: "scaleup_secure_abstract_shield_form.png",
    group: "contender",
    archetype: "Caregiver",
    url: "/logos/scaleup_secure_abstract_shield_form.png",
  },
  {
    id: 40,
    filename: "scaleup_refined_elegant_line_art.png",
    group: "contender",
    archetype: "Lover",
    url: "/logos/scaleup_refined_elegant_line_art.png",
  },
  {
    id: 41,
    filename: "scaleup_stable_solid_foundation_symbol.png",
    group: "contender",
    archetype: "Ruler",
    url: "/logos/scaleup_stable_solid_foundation_symbol.png",
  },
  {
    id: 42,
    filename: "scaleup_wise_minimalist_icon.png",
    group: "contender",
    archetype: "Sage",
    url: "/logos/scaleup_wise_minimalist_icon.png",
  },
  {
    id: 43,
    filename: "scaleup_precise_technical_grid_design.png",
    group: "contender",
    archetype: "Creator",
    url: "/logos/scaleup_precise_technical_grid_design.png",
  },
  {
    id: 44,
    filename: "scaleup_supportive_enclosing_circle.png",
    group: "contender",
    archetype: "Caregiver",
    url: "/logos/scaleup_supportive_enclosing_circle.png",
  },
  {
    id: 45,
    filename: "scaleup_detailed_intricate_pattern.png",
    group: "contender",
    archetype: "Magician",
    url: "/logos/scaleup_detailed_intricate_pattern.png",
  },

  {
    id: 46,
    filename: "enterprise_fintech_timeless_authoritative_wordmark.png",
    group: "leader",
    archetype: "Ruler",
    url: "/logos/enterprise_fintech_timeless_authoritative_wordmark.png",
  },
  {
    id: 47,
    filename: "enterprise_fintech_architectural_pillar_icon.png",
    group: "leader",
    archetype: "Ruler",
    url: "/logos/enterprise_fintech_architectural_pillar_icon.png",
  },
  {
    id: 48,
    filename: "enterprise_fintech_luxury_refined_monogram.png",
    group: "leader",
    archetype: "Ruler",
    url: "/logos/enterprise_fintech_luxury_refined_monogram.png",
  },
  {
    id: 49,
    filename: "enterprise_fintech_secure_abstract_vault.png",
    group: "leader",
    archetype: "Caregiver",
    url: "/logos/enterprise_fintech_secure_abstract_vault.png",
  },
  {
    id: 50,
    filename: "enterprise_fintech_prestigious_regal_crest.png",
    group: "leader",
    archetype: "Ruler",
    url: "/logos/enterprise_fintech_prestigious_regal_crest.png",
  },
  {
    id: 51,
    filename: "enterprise_fintech_wealth_faceted_gemstone.png",
    group: "leader",
    archetype: "Lover",
    url: "/logos/enterprise_fintech_wealth_faceted_gemstone.png",
  },
  {
    id: 52,
    filename: "enterprise_fintech_elite_dark_and_gold_style.png",
    group: "leader",
    archetype: "Ruler",
    url: "/logos/enterprise_fintech_elite_dark_and_gold_style.png",
  },
  {
    id: 53,
    filename: "enterprise_ai_authoritative_heavy_sans_serif.png",
    group: "leader",
    archetype: "Ruler",
    url: "/logos/enterprise_ai_authoritative_heavy_sans_serif.png",
  },
  {
    id: 54,
    filename: "enterprise_ai_global_orbital_rings.png",
    group: "leader",
    archetype: "Magician",
    url: "/logos/enterprise_ai_global_orbital_rings.png",
  },
  {
    id: 55,
    filename: "enterprise_ai_intelligent_abstract_core.png",
    group: "leader",
    archetype: "Sage",
    url: "/logos/enterprise_ai_intelligent_abstract_core.png",
  },
  {
    id: 56,
    filename: "enterprise_ai_control_commanding_geometry.png",
    group: "leader",
    archetype: "Ruler",
    url: "/logos/enterprise_ai_control_commanding_geometry.png",
  },
  {
    id: 57,
    filename: "enterprise_ai_visionary_glowing_symbol.png",
    group: "leader",
    archetype: "Magician",
    url: "/logos/enterprise_ai_visionary_glowing_symbol.png",
  },
  {
    id: 58,
    filename: "enterprise_ai_data_precision_waveforms.png",
    group: "leader",
    archetype: "Sage",
    url: "/logos/enterprise_ai_data_precision_waveforms.png",
  },
  {
    id: 59,
    filename: "enterprise_ai_leadership_abstract_apex.png",
    group: "leader",
    archetype: "Hero",
    url: "/logos/enterprise_ai_leadership_abstract_apex.png",
  },
  {
    id: 60,
    filename: "enterprise_ai_simplified_complex_form.png",
    group: "leader",
    archetype: "Sage",
    url: "/logos/enterprise_ai_simplified_complex_form.png",
  },
];

function calculateArchetypeMix(feelings) {
  const archetypeScores = {};

  feelingsScales.forEach((scale) => {
    const value = feelings[scale.id] || 0;

    if (value > 3) {
      const intensity = value / 10;
      scale.effects.archetypePoints.forEach(({ archetype, points }) => {
        if (!archetypeScores[archetype]) {
          archetypeScores[archetype] = 0;
        }
        archetypeScores[archetype] += points * intensity;
      });
    } else if (value < -3) {
      const intensity = Math.abs(value) / 10;

      const leftSideArchetypes = {
        stability_risk: [
          { archetype: "Caregiver", points: 30 },
          { archetype: "Ruler", points: 25 },
          { archetype: "Sage", points: 15 },
        ],
        belonging_independence: [
          { archetype: "Everyman", points: 35 },
          { archetype: "Lover", points: 20 },
          { archetype: "Jester", points: 15 },
        ],
        formal_friendly: [
          { archetype: "Ruler", points: 30 },
          { archetype: "Sage", points: 25 },
          { archetype: "Magician", points: 15 },
        ],
        modern_timeless: [
          { archetype: "Magician", points: 30 },
          { archetype: "Creator", points: 25 },
          { archetype: "Hero", points: 15 },
        ],
        inspirational_comforting: [
          { archetype: "Hero", points: 35 },
          { archetype: "Magician", points: 25 },
          { archetype: "Creator", points: 15 },
        ],
        powerful_tender: [
          { archetype: "Hero", points: 30 },
          { archetype: "Ruler", points: 25 },
          { archetype: "Rebel", points: 15 },
        ],
      };

      const leftArchetypes = leftSideArchetypes[scale.id] || [];
      leftArchetypes.forEach(({ archetype, points }) => {
        if (!archetypeScores[archetype]) {
          archetypeScores[archetype] = 0;
        }
        archetypeScores[archetype] += points * intensity;
      });
    }
  });

  if (Object.keys(archetypeScores).length === 0) {
    return [
      { name: "Hero", value: 50, color: "#8B5CF6" },
      { name: "Sage", value: 30, color: "#A78BFA" },
      { name: "Creator", value: 20, color: "#C4B5FD" },
    ];
  }

  const sorted = Object.entries(archetypeScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const total = sorted.reduce((sum, [, score]) => sum + score, 0);

  const colors = ["#8B5CF6", "#A78BFA", "#C4B5FD"];

  return sorted.map(([name, score], index) => ({
    name,
    value: Math.round((score / total) * 100),
    color: colors[index],
  }));
}

function generateColorRecommendations(feelings, attributes) {
  const scores = {};

  colorPalette.forEach((color) => {
    scores[color.id] = 0;

    const directives = color.effects.moodDirectives;

    if (attributes && Array.isArray(attributes)) {
      Object.entries(directives).forEach(([mood, points]) => {
        if (
          attributes.some(
            (attr) =>
              attr.toLowerCase().includes(mood.toLowerCase()) ||
              mood.toLowerCase().includes(attr.toLowerCase())
          )
        ) {
          scores[color.id] += points;
        }
      });
    }
  });

  if (feelings) {
    if (feelings.stability_risk > 5) {
      scores.red += 20;
      scores.orange += 15;
    } else if (feelings.stability_risk < -5) {
      scores.blue += 20;
      scores.gold_brown += 15;
    }

    if (feelings.formal_friendly > 5) {
      scores.light_green_everyman += 20;
      scores.teal_turquoise += 15;
    } else if (feelings.formal_friendly < -5) {
      scores.blue += 15;
      scores.black_dark_gray += 10;
    }

    if (feelings.powerful_tender > 5) {
      scores.pink += 20;
      scores.teal_turquoise += 15;
    } else if (feelings.powerful_tender < -5) {
      scores.red += 15;
      scores.black_dark_gray += 10;
    }

    if (feelings.inspirational_comforting < -5) {
      scores.yellow += 20;
      scores.orange += 15;
    }

    if (feelings.modern_timeless < -5) {
      scores.purple_magician += 15;
      scores.cyan_jester += 10;
    } else if (feelings.modern_timeless > 5) {
      scores.gold_brown += 15;
      scores.blue += 10;
    }
  }

  const sorted = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  if (sorted.length === 0 || sorted[0][1] === 0) {
    return ["blue", "green", "orange"];
  }

  return sorted.map(([id]) => id);
}

function getFilteredLogos(stage, recommendedArchetypes = []) {
  const universalLogos = logoData.filter((logo) => logo.group === "universal");

  const stageLogos = logoData.filter((logo) => logo.group === stage);

  const allRelevantLogos = [...universalLogos, ...stageLogos];

  const recommendedLogos = allRelevantLogos.filter((logo) =>
    recommendedArchetypes.includes(logo.archetype)
  );

  const otherLogos = allRelevantLogos.filter(
    (logo) => !recommendedArchetypes.includes(logo.archetype)
  );

  return {
    recommended: recommendedLogos,
    other: otherLogos,
    all: allRelevantLogos,
  };
}

function generateTone(feelings) {
  const tones = [];

  feelingsScales.forEach((scale) => {
    const value = feelings[scale.id] || 0;

    if (value > 4) {
      tones.push(...scale.effects.tone);
    } else if (value < -4) {
      const leftSideTones = {
        stability_risk: ["Reliable", "Trustworthy", "Secure"],
        belonging_independence: ["Collaborative", "Social", "Community-driven"],
        formal_friendly: ["Professional", "Corporate", "Serious"],
        modern_timeless: ["Innovative", "Cutting-edge", "Future-focused"],
        inspirational_comforting: ["Aspirational", "Motivational", "Ambitious"],
        powerful_tender: ["Authoritative", "Strong", "Commanding"],
      };

      const leftTones = leftSideTones[scale.id] || [];
      tones.push(...leftTones);
    }
  });

  const uniqueTones = [...new Set(tones)];
  return uniqueTones.length > 0
    ? uniqueTones.slice(0, 3)
    : ["Engaging", "Authentic", "Clear"];
}

function generateKeywords(feelings) {
  const keywords = [];

  feelingsScales.forEach((scale) => {
    const value = feelings[scale.id] || 0;

    if (value > 4) {
      keywords.push(...scale.effects.keywords);
    } else if (value < -4) {
      const leftSideKeywords = {
        stability_risk: ["Stability", "Security", "Reliability"],
        belonging_independence: ["Community", "Collaboration", "Connection"],
        formal_friendly: ["Professionalism", "Excellence", "Authority"],
        modern_timeless: ["Innovation", "Technology", "Progress"],
        inspirational_comforting: ["Inspiration", "Achievement", "Excellence"],
        powerful_tender: ["Power", "Strength", "Leadership"],
      };

      const leftKeywords = leftSideKeywords[scale.id] || [];
      keywords.push(...leftKeywords);
    }
  });

  const uniqueKeywords = [...new Set(keywords)];
  return uniqueKeywords.length > 0
    ? uniqueKeywords
    : ["Innovation", "Quality", "Excellence"];
}

function generateTypographyRecommendations(feelings, attributes) {
  const scores = {};

  typographyStyles.forEach((style) => {
    scores[style.id] = 0;

    const directives = style.effects.styleDirectives;
    Object.entries(directives).forEach(([directive, points]) => {
      if (
        attributes &&
        attributes.some(
          (attr) =>
            attr.toLowerCase().includes(directive.toLowerCase()) ||
            directive.toLowerCase().includes(attr.toLowerCase())
        )
      ) {
        scores[style.id] += points;
      }
    });
  });

  if (feelings) {
    if (feelings.formal_friendly < -5) {
      scores.serif_classic += 20;
      scores.sans_modern += 10;
    } else if (feelings.formal_friendly > 5) {
      scores.rounded_sans += 20;
      scores.custom_script += 15;
    }

    if (feelings.modern_timeless < -5) {
      scores.sans_modern += 25;
      scores.variable_dynamic += 20;
    } else if (feelings.modern_timeless > 5) {
      scores.serif_classic += 15;
    }

    if (feelings.powerful_tender > 5) {
      scores.custom_script += 20;
      scores.rounded_sans += 15;
    } else if (feelings.powerful_tender < -5) {
      scores.sans_modern += 15;
      scores.retro_futuristic += 10;
    }

    if (feelings.stability_risk > 5) {
      scores.retro_futuristic += 20;
      scores.unstructured_fluid += 15;
    } else if (feelings.stability_risk < -5) {
      scores.serif_classic += 15;
      scores.sans_modern += 10;
    }

    if (feelings.inspirational_comforting < -5) {
      scores.variable_dynamic += 15;
      scores.retro_futuristic += 10;
    }
  }

  const sorted = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  if (sorted.length === 0 || sorted[0][1] === 0) {
    return ["sans_modern", "serif_classic", "rounded_sans"];
  }

  return sorted.map(([id]) => id);
}

function detectAttributeTheme(attributes, feelings) {
  let detectedTheme = null;
  let maxMatchScore = 0;
  const themeScores = {};

  console.log("\n🔍 THEME DETECTION STARTED");
  console.log("Input attributes:", attributes);

  if (attributes && Array.isArray(attributes)) {
    for (const [themeName, themeData] of Object.entries(attributeThemes)) {
      let matchScore = 0;
      const matches = {
        exact: [],
        partial: [],
      };

      attributes.forEach((attr) => {
        if (themeData.keywords.includes(attr)) {
          matches.exact.push(attr);
          matchScore += 2;
        }
      });

      attributes.forEach((attr) => {
        const hasPartialMatch = themeData.keywords.some(
          (keyword) =>
            (keyword.includes(attr) || attr.includes(keyword)) &&
            !matches.exact.includes(attr)
        );
        if (hasPartialMatch) {
          matches.partial.push(attr);
          matchScore += 1;
        }
      });

      themeScores[themeName] = {
        score: matchScore,
        exact: matches.exact,
        partial: matches.partial,
      };

      console.log(`  ${themeName}:`, {
        score: matchScore,
        exact: matches.exact,
        partial: matches.partial,
      });

      if (matchScore > maxMatchScore) {
        maxMatchScore = matchScore;
        detectedTheme = themeName;
      }
    }
  }

  console.log(
    "\n📊 Theme Scores:",
    Object.entries(themeScores)
      .sort(([, a], [, b]) => b.score - a.score)
      .slice(0, 3)
  );

  if (maxMatchScore < 2 && feelings) {
    console.log("\n⚠️ No strong attribute match, inferring from feelings...");

    const feelingBasedThemes = [];

    if (feelings.stability_risk < -5) {
      feelingBasedThemes.push({
        theme: "trust_theme",
        reason: "stability_risk < -5",
      });
    }
    if (feelings.modern_timeless < -5) {
      feelingBasedThemes.push({
        theme: "innovation_theme",
        reason: "modern_timeless < -5",
      });
    }
    if (feelings.powerful_tender < -5) {
      feelingBasedThemes.push({
        theme: "mastery_courage_theme",
        reason: "powerful_tender < -5",
      });
    }
    if (feelings.formal_friendly > 5) {
      feelingBasedThemes.push({
        theme: "authenticity_relatability_theme",
        reason: "formal_friendly > 5",
      });
    }
    if (feelings.belonging_independence > 5) {
      feelingBasedThemes.push({
        theme: "freedom_adventure_theme",
        reason: "belonging_independence > 5",
      });
    }
    if (feelings.inspirational_comforting < -5) {
      feelingBasedThemes.push({
        theme: "mastery_courage_theme",
        reason: "inspirational_comforting < -5",
      });
    }

    console.log("  Feeling-based suggestions:", feelingBasedThemes);

    if (feelingBasedThemes.length > 0) {
      detectedTheme = feelingBasedThemes[0].theme;
      console.log(
        `  ✅ Selected: ${detectedTheme} (${feelingBasedThemes[0].reason})`
      );
    }
  }

  console.log("\n✅ FINAL DETECTED THEME:", detectedTheme);
  console.log("   Max Score:", maxMatchScore);

  return {
    theme: detectedTheme,
    score: maxMatchScore,
    allScores: themeScores,
  };
}

app.post("/api/analyze-brand", async (req, res) => {
  try {
    const { prompt, industry } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    const archetypeList = Object.entries(archetypeDefinitions)
      .map(([name, desc]) => `- ${name}: ${desc}`)
      .join("\n");

    const colorList = colorPalette
      .map(
        (c) =>
          `- ${c.id}: ${c.name} (${c.hex}) - ${Object.keys(
            c.effects.moodDirectives
          ).join(", ")}`
      )
      .join("\n");

    const analysisPrompt = `You are an expert brand strategist. Analyze this brand and provide strategic insights.

Brand Description: "${prompt}"

ARCHETYPE REFERENCE GUIDE:
${archetypeList}

COLOR PALETTE OPTIONS:
${colorList}

PART 1: INDUSTRY CLASSIFICATION
Choose ONE industry from this list:
Technology & IT, Finance & FinTech, Healthcare & Wellness, Retail & E-commerce, Education & EdTech, Real Estate & Construction, Food & Beverage, Entertainment & Media, Travel & Hospitality, Automotive & Transportation, Fashion & Apparel, Luxury Goods, Non-Profit & Social, Professional & Services, Energy & Utilities, Manufacturing & Industrial

PART 2: BRAND FEELINGS (Rate each scale from -10 to +10)

YOU MUST PROVIDE A NUMBER FOR EACH SCALE. Analyze the brand personality carefully:

1. stability_risk: 
   -10 = Stability-focused (conservative, safe, reliable, traditional banks)
   +10 = Risk-focused (bold, adventurous, disruptive startups)
   
2. belonging_independence:
   -10 = Community-focused (social platforms, teamwork, collaboration)
   +10 = Independence-focused (solo tools, self-reliance, individual achievement)
   
3. formal_friendly:
   -10 = Formal tone (corporate, professional, serious, business-like)
   +10 = Friendly tone (casual, warm, approachable, conversational)
   
4. modern_timeless:
   -10 = Modern aesthetic (cutting-edge tech, futuristic, innovative)
   +10 = Timeless aesthetic (classic, heritage, traditional, enduring)
   
5. inspirational_comforting:
   -10 = Inspirational (motivational, ambitious, aspirational, dream-big)
   +10 = Comforting (practical, grounded, reassuring, everyday solutions)
   
6. powerful_tender:
   -10 = Powerful personality (strong, authoritative, commanding)
   +10 = Tender personality (caring, nurturing, gentle, supportive)

CRITICAL: You MUST provide integer values between -10 and +10 for ALL six scales.

PART 3: BRAND ATTRIBUTES
Choose 3-5 lowercase attributes that best describe the brand:
ambitious, authentic, bold, calm, carefree, charming, courageous, creative, energetic, exclusive, harmonious, honest, innovative, joyful, mysterious, passionate, playful, professional, responsible, spiritual, trustworthy, wise

PART 4: STRATEGIC ELEMENTS
- stage: "challenger", "contender", or "leader"
- dominantArchetype: Choose ONE from the archetype list above

PART 5: ARCHETYPE RECOMMENDATIONS
Identify the top 3 archetypes that best fit this brand.

PART 6: COLOR RECOMMENDATIONS
Choose the PRIMARY color and 2 alternative colors from the color palette that best match the brand personality. Consider:
- The brand's emotional tone and attributes
- Industry context and target audience
- The moodDirectives associated with each color

PART 7: TYPOGRAPHY RECOMMENDATIONS
Choose the PRIMARY typography style from: serif_classic, sans_modern, custom_script, rounded_sans, retro_futuristic, variable_dynamic, unstructured_fluid

NOW RETURN ONLY THIS EXACT JSON STRUCTURE:
{
  "name": "2-3 word brand name",
  "tagline": "5-8 word tagline",
  "industry": "exact industry from list",
  "mission": "1-2 sentence mission statement",
  "targetAudience": "specific target audience description",
  "competitors": "2-3 competitor names",
  "feelings": {
    "stability_risk": -5,
    "belonging_independence": 3,
    "formal_friendly": -2,
    "modern_timeless": 7,
    "inspirational_comforting": -8,
    "powerful_tender": 4
  },
  "attributes": ["attribute1", "attribute2", "attribute3"],
  "stage": "challenger",
  "dominantArchetype": "Hero",
  "recommendedArchetypes": ["Hero", "Sage", "Creator"],
  "typography": "sans_modern",
  "alternativeTypography": ["serif_classic", "variable_dynamic"],
  "colors": ["blue", "green"],
  "alternativeColors": ["orange"],
  "coreMotivation": "brief explanation",
  "oneLiner": "For [audience] who [need], [brand] provides [solution] that [benefit]",
  "headlines": ["headline 1", "headline 2", "headline 3"],
  "visualStyle": {
    "style": "design style",
    "imagery": "imagery approach",
    "mood": "emotional mood"
  }
}`;

    const result = await model.generateContent(analysisPrompt);
    const rawText = result.response.text();

    console.log("========================================");
    console.log("GEMINI RAW RESPONSE:");
    console.log(rawText);
    console.log("========================================");

    const cleaned = rawText.replace(/```json|```/g, "").trim();
    let brandData;

    try {
      brandData = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        brandData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse AI response as JSON");
      }
    }

    if (!brandData.feelings || typeof brandData.feelings !== "object") {
      brandData.feelings = {
        stability_risk: 0,
        belonging_independence: 0,
        formal_friendly: 0,
        modern_timeless: 0,
        inspirational_comforting: 0,
        powerful_tender: 0,
      };
    } else {
      const requiredScales = [
        "stability_risk",
        "belonging_independence",
        "formal_friendly",
        "modern_timeless",
        "inspirational_comforting",
        "powerful_tender",
      ];

      requiredScales.forEach((scale) => {
        if (typeof brandData.feelings[scale] !== "number") {
          brandData.feelings[scale] = 0;
        }
        brandData.feelings[scale] = Math.max(
          -10,
          Math.min(10, brandData.feelings[scale])
        );
      });
    }

    if (brandData.attributes && Array.isArray(brandData.attributes)) {
      brandData.attributes = brandData.attributes.map((attr) =>
        typeof attr === "string" ? attr.toLowerCase() : attr
      );
    }

    if (brandData.feelings) {
      brandData.archetypeMix = calculateArchetypeMix(brandData.feelings);

      if (
        brandData.recommendedArchetypes &&
        Array.isArray(brandData.recommendedArchetypes) &&
        brandData.recommendedArchetypes.length >= 3
      ) {
        console.log(
          "✅ Using AI-recommended archetypes:",
          brandData.recommendedArchetypes
        );

        const values = [50, 30, 20];
        const colors = ["#8B5CF6", "#A78BFA", "#C4B5FD"];

        brandData.archetypeMix = brandData.recommendedArchetypes
          .slice(0, 3)
          .map((name, index) => ({
            name: name.replace("The ", ""),
            value: values[index] || 0,
            color: colors[index],
          }));
      } else {
        console.log(
          "⚠️ AI did not provide recommended archetypes, using calculated archetypeMix"
        );
      }

      const generatedTone = generateTone(brandData.feelings);
      brandData.toneOfVoice =
        generatedTone.length > 0
          ? generatedTone
          : ["Engaging", "Authentic", "Clear"];

      const feelingKeywords = generateKeywords(brandData.feelings);
      const attributeKeywords = brandData.attributes || [];
      brandData.keywords = [
        ...new Set([...feelingKeywords, ...attributeKeywords]),
      ].slice(0, 7);

      if (!brandData.typography) {
        const typographyRecs = generateTypographyRecommendations(
          brandData.feelings,
          brandData.attributes
        );
        brandData.typography = typographyRecs[0];
        brandData.alternativeTypography = typographyRecs.slice(1, 3);
      } else {
        if (
          !brandData.alternativeTypography ||
          !Array.isArray(brandData.alternativeTypography)
        ) {
          const allRecs = generateTypographyRecommendations(
            brandData.feelings,
            brandData.attributes
          );
          brandData.alternativeTypography = allRecs
            .filter((t) => t !== brandData.typography)
            .slice(0, 2);
        }
      }

      if (!brandData.colors || !Array.isArray(brandData.colors)) {
        const colorRecs = generateColorRecommendations(
          brandData.feelings,
          brandData.attributes
        );
        brandData.colors = colorRecs.slice(0, 2);
        brandData.alternativeColors = colorRecs.slice(2, 3);
        console.log(
          "⚠️ Colors not provided by AI, using calculated:",
          brandData.colors
        );
      } else {
        console.log("✅ Using AI-recommended colors:", brandData.colors);

        const validColorIds = colorPalette.map((c) => c.id);
        brandData.colors = brandData.colors.filter((c) =>
          validColorIds.includes(c)
        );

        if (brandData.colors.length < 2) {
          const colorRecs = generateColorRecommendations(
            brandData.feelings,
            brandData.attributes
          );
          brandData.colors = [...brandData.colors, ...colorRecs].slice(0, 2);
        }

        if (
          !brandData.alternativeColors ||
          !Array.isArray(brandData.alternativeColors)
        ) {
          const allRecs = generateColorRecommendations(
            brandData.feelings,
            brandData.attributes
          );
          brandData.alternativeColors = allRecs
            .filter((c) => !brandData.colors.includes(c))
            .slice(0, 1);
        }
      }

      brandData.colorPalette = brandData.colors
        .map((colorId) => colorPalette.find((c) => c.id === colorId))
        .filter(Boolean);

      if (brandData.alternativeColors) {
        brandData.alternativeColorPalette = brandData.alternativeColors
          .map((colorId) => colorPalette.find((c) => c.id === colorId))
          .filter(Boolean);
      }

      brandData.feelingsMapped = {
        stability: brandData.feelings.stability_risk,
        belonging: brandData.feelings.belonging_independence,
        formal: brandData.feelings.formal_friendly,
        modern: brandData.feelings.modern_timeless,
        inspirational: brandData.feelings.inspirational_comforting,
        powerful: brandData.feelings.powerful_tender,
      };
    }

    const themeDetection = detectAttributeTheme(
      brandData.attributes,
      brandData.feelings
    );
    brandData.attributeTheme = themeDetection.theme;
    brandData.attributeThemeScore = themeDetection.score;

    if (themeDetection.theme) {
      const themeData = attributeThemes[themeDetection.theme];
      brandData.attributeThemeDescription = themeData.description;
      brandData.attributeThemeRelatedArchetypes = themeData.relatedArchetypes;
    }

    console.log("========================================");
    console.log("FINAL RESPONSE:");
    console.log("Industry:", brandData.industry);
    console.log("Name:", brandData.name);
    console.log("Feelings:", brandData.feelings);
    console.log("Archetype Mix:", brandData.archetypeMix);
    console.log("Recommended Archetypes:", brandData.recommendedArchetypes);
    console.log("Primary Typography:", brandData.typography);
    console.log("Alternative Typography:", brandData.alternativeTypography);
    console.log("Primary Colors:", brandData.colors);
    console.log("Alternative Colors:", brandData.alternativeColors);
    console.log("Color Palette Objects:", brandData.colorPalette);
    console.log("Tone:", brandData.toneOfVoice);
    console.log("Keywords:", brandData.keywords);
    console.log("Attributes:", brandData.attributes);
    console.log("Detected Theme:", themeDetection.theme);
    console.log("Theme Score:", themeDetection.score);
    console.log(
      "Theme Description:",
      brandData.attributeThemeDescription || "None"
    );
    console.log("========================================");

    res.json(brandData);
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: error.message || "Failed to analyze brand",
      details: error.toString(),
    });
  }
});

app.post("/api/get-logos", (req, res) => {
  try {
    const { stage, recommendedArchetypes } = req.body;

    if (!stage) {
      return res.status(400).json({ error: "Stage is required" });
    }

    const filteredLogos = getFilteredLogos(stage, recommendedArchetypes);

    res.json(filteredLogos);
  } catch (error) {
    console.error("Logo filtering error:", error);
    res.status(500).json({ error: "Failed to get logos" });
  }
});

app.post("/api/generate-headlines", async (req, res) => {
  try {
    const { brandName, industry } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    const prompt = `Generate 3 article headlines for "${brandName}" in "${industry}". 
    Each under 12 words. Return ONLY JSON array: ["headline 1", "headline 2", "headline 3"]`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    const cleaned = rawText.replace(/```json|```/g, "").trim();

    let headlines;
    try {
      headlines = JSON.parse(cleaned);
    } catch {
      headlines = cleaned
        .split("\n")
        .filter((line) => line.trim().length > 0)
        .map((line) => line.replace(/^-/, "").trim());
    }

    res.json({ headlines });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: error.message || "Failed to generate headlines",
    });
  }
});

app.get("/api/feelings-scales", (_req, res) => {
  res.json(feelingsScales);
});

app.get("/api/typography-styles", (_req, res) => {
  res.json(typographyStyles);
});

app.get("/api/color-palette", (_req, res) => {
  res.json(colorPalette);
});

app.get("/api/attribute-themes", (_req, res) => {
  res.json(attributeThemes);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Using model: gemini-2.0-flash-exp`);
});
