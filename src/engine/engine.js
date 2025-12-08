const toneOfVoiceDatabase = {
  toneOfVoice: [
    { word: "Mysterious", tags: ["Magician"] },
    { word: "Imaginative", tags: ["Magician", "Creator"] },
    { word: "Visionary", tags: ["Magician", "Technology_IT"] },
    { word: "Charismatic", tags: ["Magician"] },
    { word: "Creative", tags: ["Creator", "Fashion_Apparel"] },
    { word: "Slightly provocative", tags: ["Creator"] },
    { word: "Enthusiastic", tags: ["Creator", "Jester"] },
    { word: "Authentic", tags: ["Creator", "Everyman", "Fashion_Apparel"] },
    { word: "Perfectionist", tags: ["Creator"] },
    { word: "Refined", tags: ["Ruler", "Luxury_Goods"] },
    {
      word: "Commanding",
      tags: ["Ruler", "Automotive_Transportation", "Luxury_Goods"],
    },
    {
      word: "Articulate",
      tags: ["Ruler", "Sage", "Education_EdTech", "Professional_Services"],
    },
    { word: "Higher class", tags: ["Ruler"] },
    { word: "Authoritative", tags: ["Ruler", "Finance_FinTech"] },
    { word: "Fun", tags: ["Jester", "Entertainment_Media"] },
    { word: "Light-hearted", tags: ["Jester", "Entertainment_Media"] },
    { word: "Mischievous", tags: ["Jester"] },
    { word: "Irreverent", tags: ["Jester", "Entertainment_Media"] },
    { word: "Playful", tags: ["Jester", "Entertainment_Media"] },
    { word: "Optimistic", tags: ["Jester"] },
    { word: "Knowledgeable", tags: ["Sage"] },
    { word: "Trustworthy", tags: ["Sage", "Caregiver", "Healthcare_Wellness"] },
    { word: "Thoughtful", tags: ["Sage"] },
    { word: "Analytical", tags: ["Sage"] },
    { word: "Mentor", tags: ["Sage"] },
    { word: "Guru", tags: ["Sage"] },
    { word: "Advisor", tags: ["Sage"] },
    {
      word: "Objective",
      tags: ["Sage", "Education_EdTech", "Professional_Services"],
    },
    { word: "Restless", tags: ["Explorer"] },
    { word: "Adventurous", tags: ["Explorer", "Travel_Hospitality"] },
    { word: "Ambitious", tags: ["Explorer"] },
    { word: "Individualistic", tags: ["Explorer", "Fashion_Apparel"] },
    { word: "Independent", tags: ["Explorer"] },
    { word: "Pioneering", tags: ["Explorer"] },
    { word: "Autonomous", tags: ["Explorer", "Travel_Hospitality"] },
    { word: "Passionate", tags: ["Lover", "Non_Profit_Social"] },
    { word: "Sensual", tags: ["Lover"] },
    { word: "Romantic", tags: ["Lover"] },
    { word: "Committed", tags: ["Lover"] },
    { word: "Idealistic", tags: ["Lover"] },
    { word: "Soft", tags: ["Lover"] },
    { word: "Caring", tags: ["Caregiver"] },
    { word: "Maternal", tags: ["Caregiver"] },
    { word: "Nurturing", tags: ["Caregiver"] },
    { word: "Generous", tags: ["Caregiver"] },
    { word: "Compassionate", tags: ["Caregiver", "Healthcare_Wellness"] },
    { word: "Warm", tags: ["Caregiver", "Food_Beverage"] },
    {
      word: "Supportive",
      tags: ["Caregiver", "Everyman", "Healthcare_Wellness"],
    },
    { word: "Down to earth", tags: ["Everyman"] },
    { word: "Faithful", tags: ["Everyman"] },
    { word: "Folksy", tags: ["Everyman"] },
    { word: "Person next door", tags: ["Everyman"] },
    { word: "Connects with others", tags: ["Everyman"] },
    { word: "Approachable", tags: ["Everyman", "Retail_Ecommerce"] },
    { word: "Practical", tags: ["Everyman", "Retail_Ecommerce"] },
    { word: "Strives to be good", tags: ["Innocent"] },
    { word: "Pure", tags: ["Innocent"] },
    { word: "Simple", tags: ["Innocent", "Retail_Ecommerce"] },
    { word: "Loyal", tags: ["Innocent"] },
    { word: "Serene", tags: ["Innocent", "Travel_Hospitality"] },
    { word: "Tranquil", tags: ["Innocent"] },
    { word: "Rebellious", tags: ["Rebel"] },
    { word: "Wild", tags: ["Rebel"] },
    { word: "Paving the way for change", tags: ["Rebel"] },
    { word: "Free-spirited", tags: ["Rebel"] },
    { word: "Counter-cultural", tags: ["Rebel"] },
    { word: "Courageous", tags: ["Hero"] },
    { word: "Bold", tags: ["Hero"] },
    { word: "Honorable", tags: ["Hero"] },
    { word: "Strong", tags: ["Hero", "Automotive_Transportation"] },
    {
      word: "Confident",
      tags: ["Hero", "Automotive_Transportation", "Finance_FinTech"],
    },
    { word: "Inspirational", tags: ["Hero", "Non_Profit_Social"] },
    { word: "Futuristic", tags: ["Technology_IT"] },
    { word: "Intelligent", tags: ["Technology_IT", "Sage"] },
    { word: "Precise", tags: ["Finance_FinTech", "Manufacturing_Industrial"] },
    { word: "Guiding", tags: ["Education_EdTech", "Sage"] },
    { word: "Joyful", tags: ["Jester", "Innocent"] },
  ],
  keywords: [
    { word: "Innovation", tags: ["Technology_IT", "Magician", "Creator"] },
    { word: "Transformation", tags: ["Technology_IT", "Magician"] },
    { word: "Visionary", tags: ["Technology_IT", "Magician"] },
    { word: "Intelligence", tags: ["Technology_IT", "Sage"] },
    { word: "Secure", tags: ["Technology_IT", "Finance_FinTech", "Ruler"] },
    { word: "Status", tags: ["Finance_FinTech", "Ruler", "Luxury_Goods"] },
    { word: "Control", tags: ["Finance_FinTech", "Ruler"] },
    { word: "Wealth", tags: ["Finance_FinTech", "Ruler", "Luxury_Goods"] },
    { word: "Planning", tags: ["Finance_FinTech", "Sage"] },
    { word: "Nurturing", tags: ["Healthcare_Wellness", "Caregiver"] },
    { word: "Health", tags: ["Healthcare_Wellness"] },
    { word: "Protection", tags: ["Healthcare_Wellness", "Caregiver"] },
    { word: "Safety", tags: ["Healthcare_Wellness", "Caregiver"] },
    { word: "Service", tags: ["Healthcare_Wellness", "Caregiver"] },
    { word: "Accessible", tags: ["Retail_Ecommerce", "Everyman"] },
    { word: "Belonging", tags: ["Retail_Ecommerce", "Everyman"] },
    { word: "Wisdom", tags: ["Education_EdTech", "Sage"] },
    { word: "Knowledge", tags: ["Education_EdTech", "Sage"] },
    { word: "Competence", tags: ["Education_EdTech", "Sage"] },
    {
      word: "Comfort",
      tags: ["Food_Beverage", "Caregiver", "Travel_Hospitality"],
    },
    { word: "Freedom", tags: ["Travel_Hospitality", "Explorer"] },
    { word: "Adventure", tags: ["Travel_Hospitality", "Explorer"] },
    { word: "Discovery", tags: ["Travel_Hospitality", "Explorer"] },
    { word: "Excellence", tags: ["Luxury_Goods", "Ruler"] },
    { word: "Change", tags: ["Non_Profit_Social", "Hero", "Rebel"] },
    { word: "Community", tags: ["Non_Profit_Social", "Everyman"] },
    { word: "Courage", tags: ["Hero"] },
    { word: "Passion", tags: ["Lover", "Creator"] },
  ],
};

const visualDirectivesDatabase = {
  Innocent: {
    defaultDirectives: {
      styleDirectives: ["Simple", "Serene", "Light tones"],
      imageryDirectives: ["Classic typography", "Rounded forms"],
      moodDirectives: ["Clean", "Joyful", "Straightforward"],
    },
    variations: {
      Caregiver: {
        styleDirectives: ["Soft", "Wholesome", "Warm colors"],
        imageryDirectives: ["Handwritten font", "Nostalgic scenes"],
        moodDirectives: ["Comforting", "Gentle", "Homely"],
      },
      Sage: {
        styleDirectives: ["Minimalist", "Clean lines", "Consistent"],
        imageryDirectives: ["Lots of white space", "Clear geometry"],
        moodDirectives: ["Calm", "Clear", "Tranquil"],
      },
      Everyman: {
        styleDirectives: [
          "Accessible",
          "Rounded sans-serif",
          "Bright primary colors",
        ],
        imageryDirectives: ["Simple symbols", "Familiar objects"],
        moodDirectives: ["Welcoming", "Understandable", "Community-oriented"],
      },
    },
  },
  Sage: {
    defaultDirectives: {
      styleDirectives: ["Professional", "Structured", "Objective"],
      imageryDirectives: ["Serif typography", "Abstract data forms"],
      moodDirectives: ["Authoritative", "Intellectual", "Competent"],
    },
    variations: {
      Ruler: {
        styleDirectives: ["Classic", "Precise", "Corporate"],
        imageryDirectives: [
          "Monochrome palette",
          "Power emblems",
          "Clear boundaries",
        ],
        moodDirectives: ["Reliable", "Strategic", "In control"],
      },
      Creator: {
        styleDirectives: ["Clean", "Informational", "Clear sans-serif"],
        imageryDirectives: [
          "Diagrams",
          "Knowledge symbols (books, magnifying glass)",
          "Geometric patterns",
        ],
        moodDirectives: ["Mentoring", "Enlightening", "Mindful"],
      },
      Magician: {
        styleDirectives: ["Innovative", "Scientific", "Minimalist"],
        imageryDirectives: [
          "Atom symbolism",
          "Network images",
          "Technological precision",
        ],
        moodDirectives: ["Stable", "Intelligent", "Advanced"],
      },
    },
  },
  Explorer: {
    defaultDirectives: {
      styleDirectives: ["Natural", "Free", "Dynamic"],
      imageryDirectives: [
        "Landscapes (mountains, deserts)",
        "Movement symbols (arrows)",
        "Earth colors",
      ],
      moodDirectives: ["Adventurous", "Unlimited", "Spirit of freedom"],
    },
    variations: {
      Hero: {
        styleDirectives: ["Action-oriented", "Rugged", "Open spaces"],
        imageryDirectives: [
          "Extreme sports",
          "Uncharted paths",
          "Durable materials",
        ],
        moodDirectives: ["Exciting", "Discovery", "Energetic"],
      },
      Everyman: {
        styleDirectives: ["Scalable", "Simple", "Friendly"],
        imageryDirectives: [
          "Globe symbolism",
          "Map elements",
          "Universal forms",
        ],
        moodDirectives: ["Ubiquitous", "Globally accessible", "Universal"],
      },
      Rebel: {
        styleDirectives: ["Bold", "Nonconformist", "High contrast"],
        imageryDirectives: [
          "Solitary figures",
          "Open roads",
          "Independence symbols",
        ],
        moodDirectives: ["Autonomous", "Determined", "Wild"],
      },
    },
  },
  Magician: {
    defaultDirectives: {
      styleDirectives: ["Futuristic", "Elegant", "Visionary"],
      imageryDirectives: [
        "Flowing lines",
        "Overlapping shapes",
        "Minimalist geometry",
      ],
      moodDirectives: ["Mysterious", "Wonder", "Transformational"],
    },
    variations: {
      Creator: {
        styleDirectives: ["Minimalist", "Innovative", "Sleek"],
        imageryDirectives: [
          "Abstract circuits",
          "Clean lines",
          "Hidden connections",
        ],
        moodDirectives: ["Visionary", "Efficient", "Breakthrough"],
      },
      Sage: {
        styleDirectives: ["Scientific", "Structured", "Emblem-based"],
        imageryDirectives: [
          "Atom symbolism",
          "Graphs and data",
          "Technological power",
        ],
        moodDirectives: ["Pioneering", "Inspiring", "Confident"],
      },
      Hero: {
        styleDirectives: ["Bold", "Transformative", "Dynamic"],
        imageryDirectives: ["Lightning bolts", "Energy waves", "Power symbols"],
        moodDirectives: ["Empowering", "Revolutionary", "Unstoppable"],
      },
    },
  },
  Hero: {
    defaultDirectives: {
      styleDirectives: ["Bold", "Dynamic", "Effective"],
      imageryDirectives: [
        "Movement symbol (Swoosh)",
        "Sharp angles",
        "Monochrome with red accent",
      ],
      moodDirectives: ["Confident", "Determined", "Strong"],
    },
    variations: {
      Sage: {
        styleDirectives: ["Clean", "Precise", "Corporate"],
        imageryDirectives: [
          "Hidden arrow (FedEx)",
          "Strict lines",
          "Precision focus",
        ],
        moodDirectives: ["Reliable", "Competent", "Goal-oriented"],
      },
      Creator: {
        styleDirectives: ["Innovative", "Bold", "Modern"],
        imageryDirectives: [
          "Dynamic shapes",
          "Creative angles",
          "Movement-focused",
        ],
        moodDirectives: ["Ambitious", "Breakthrough", "Victorious"],
      },
      Rebel: {
        styleDirectives: ["Disruptive", "Aggressive", "Contrasting"],
        imageryDirectives: [
          "Breaking chains",
          "Explosive visuals",
          "Combat imagery",
        ],
        moodDirectives: ["Fearless", "Revolutionary", "Unstoppable"],
      },
    },
  },
  Rebel: {
    defaultDirectives: {
      styleDirectives: ["Rebellious", "Contrasting", "Edgy"],
      imageryDirectives: [
        "Counter-culture graphic design",
        "Distressed textures",
      ],
      moodDirectives: ["Independent", "Challenging", "Provocative"],
    },
    variations: {
      Hero: {
        styleDirectives: ["Traditional emblem", "Grungy", "Dark palette"],
        imageryDirectives: [
          "Skull and bones",
          "Open roads",
          "Leather and metal",
        ],
        moodDirectives: ["Wild", "Freedom-loving", "Confrontational"],
      },
      Magician: {
        styleDirectives: ["Iconic", "Innovative", "Simple"],
        imageryDirectives: [
          "Provocative symbols",
          "High contrast",
          "Disruption geometry",
        ],
        moodDirectives: ["Daring", "Defiant", "Revolutionary"],
      },
      Creator: {
        styleDirectives: ["Expressive", "Nonconformist", "Youthful"],
        imageryDirectives: [
          "Movement and fluid images",
          "Street art",
          "Ironic slogans",
        ],
        moodDirectives: ["Playful", "Irreverent", "Adventurous"],
      },
    },
  },
  Creator: {
    defaultDirectives: {
      styleDirectives: ["Expressive", "Unique", "Detailed"],
      imageryDirectives: [
        "Vibrant colors",
        "Abstract forms",
        "Dynamic composition",
      ],
      moodDirectives: ["Creative", "Imaginative", "Self-expression"],
    },
    variations: {
      Magician: {
        styleDirectives: ["Modern", "Professional", "Design-focused"],
        imageryDirectives: [
          "Abstract geometry",
          "Architectural lines",
          "Grids and modules",
        ],
        moodDirectives: ["Innovative", "Perfectionist", "Artistic"],
      },
      Sage: {
        styleDirectives: ["Structured", "Methodical", "Educational"],
        imageryDirectives: [
          "Process diagrams",
          "Blueprint aesthetics",
          "Technical drawings",
        ],
        moodDirectives: ["Methodical", "Insightful", "Crafted"],
      },
      Rebel: {
        styleDirectives: ["Unconventional", "Bold", "Statement-making"],
        imageryDirectives: [
          "Unexpected color combinations",
          "Asymmetric layouts",
          "Rule-breaking design",
        ],
        moodDirectives: ["Daring", "Original", "Boundary-pushing"],
      },
    },
  },
  Ruler: {
    defaultDirectives: {
      styleDirectives: ["Prestigious", "Refined", "Geometric"],
      imageryDirectives: [
        "Crown symbolism",
        "Restrained palette (Gold, Dark)",
        "Clear lines",
      ],
      moodDirectives: ["Commanding", "Confident", "Status"],
    },
    variations: {
      Sage: {
        styleDirectives: ["Authoritative", "Corporate", "Efficient"],
        imageryDirectives: [
          "Serious typography",
          "Geometric patterns",
          "Protection symbols",
        ],
        moodDirectives: ["Reliable", "In control", "Professional"],
      },
      Magician: {
        styleDirectives: ["Premium", "Sophisticated", "Innovative"],
        imageryDirectives: [
          "Luxury materials",
          "Cutting-edge design",
          "Exclusive symbols",
        ],
        moodDirectives: ["Elite", "Transformative", "Powerful"],
      },
      Hero: {
        styleDirectives: ["Strong", "Clear outline", "Technical precision"],
        imageryDirectives: [
          "Track/road images",
          "Aggressive design",
          "Metallic accents",
        ],
        moodDirectives: ["Dominant", "Unwavering", "Control"],
      },
    },
  },
  Lover: {
    defaultDirectives: {
      styleDirectives: ["Elegant", "Sensual", "Romantic"],
      imageryDirectives: ["Flowing lines", "Serif typography", "Pink palette"],
      moodDirectives: ["Passionate", "Intimate", "Pleasant"],
    },
    variations: {
      Creator: {
        styleDirectives: ["Refined", "Elegant cursive", "Rich detailing"],
        imageryDirectives: [
          "Aesthetic pleasure",
          "Handcrafted symbols",
          "Warm colors",
        ],
        moodDirectives: ["Aspirational", "Beauty", "Sensual"],
      },
      Magician: {
        styleDirectives: ["Soft", "Sensual", "Luxurious"],
        imageryDirectives: ["Nebula and haze", "Water element", "Rich texture"],
        moodDirectives: ["Escapist", "Exquisite", "Mystical"],
      },
      Everyman: {
        styleDirectives: ["Warm", "Genuine", "Classic"],
        imageryDirectives: [
          "Images of couples",
          "Handwritten elements",
          "Heart/relationship symbols",
        ],
        moodDirectives: ["Connection", "Devotion", "Idealistic"],
      },
    },
  },
  Caregiver: {
    defaultDirectives: {
      styleDirectives: ["Caring", "Soft", "Reliable"],
      imageryDirectives: [
        "Script typography",
        "Hand/protection symbolism",
        "Turquoise and green palette",
      ],
      moodDirectives: ["Protective", "Comfortable", "Trustworthy"],
    },
    variations: {
      Innocent: {
        styleDirectives: ["Credible", "Supportive", "Clear"],
        imageryDirectives: [
          "Medical elements",
          "Family and wellbeing images",
          "Conservative geometry",
        ],
        moodDirectives: ["Safe", "Calm", "Altruistic"],
      },
      Sage: {
        styleDirectives: ["Professional", "Knowledgeable", "Structured"],
        imageryDirectives: [
          "Medical cross",
          "Research imagery",
          "Clean documentation",
        ],
        moodDirectives: ["Expert", "Caring", "Evidence-based"],
      },
      Everyman: {
        styleDirectives: ["Reliable", "Orderly", "Professional"],
        imageryDirectives: [
          "Flowing lines",
          "Stability symbols",
          "Infrastructure images",
        ],
        moodDirectives: ["Responsible", "Consistent", "Helpful"],
      },
    },
  },
  Jester: {
    defaultDirectives: {
      styleDirectives: ["Playful", "Youthful", "Dynamic"],
      imageryDirectives: [
        "Bright colors",
        "Cartoon shapes",
        "Round and organic forms",
      ],
      moodDirectives: ["Fun", "Light-hearted", "Optimistic"],
    },
    variations: {
      Creator: {
        styleDirectives: ["Quirky", "Expressive typography", "Spontaneous"],
        imageryDirectives: [
          "Ironic characters",
          "Bright colors",
          "Movement and action",
        ],
        moodDirectives: ["Entertaining", "Witty", "Carefree"],
      },
      Everyman: {
        styleDirectives: [
          "Hand-drawn",
          "Friendly",
          "Warm and saturated colors",
        ],
        imageryDirectives: [
          "Food images",
          "Unexpected combinations",
          "Simple visual forms",
        ],
        moodDirectives: ["Genuine", "Fun", "Community-oriented"],
      },
      Rebel: {
        styleDirectives: ["Casual", "Witty", "Contrast and surprise"],
        imageryDirectives: [
          "Classic symbols with humor",
          "Simple images with double meaning",
          "Adventure symbols",
        ],
        moodDirectives: ["Engaging", "Light challenge", "Self-ironic"],
      },
    },
  },
  Everyman: {
    defaultDirectives: {
      styleDirectives: ["Simple", "Universal", "Accessible"],
      imageryDirectives: [
        "Primary colors",
        "Reliable typography (Block)",
        "Familiar everyday scenes",
      ],
      moodDirectives: ["Belonging", "Simple", "Unpretentious"],
    },
    variations: {
      Caregiver: {
        styleDirectives: ["Ubiquitous", "Clean", "Practical"],
        imageryDirectives: [
          "Dynamic colors",
          "Simple navigation symbols",
          "Diverse people images",
        ],
        moodDirectives: ["Familiar", "Choice-oriented", "Convenient"],
      },
      Sage: {
        styleDirectives: ["Supportive", "Reliable", "Neutral"],
        imageryDirectives: [
          "Everyday life characters",
          "Security symbols",
          "Simple typography",
        ],
        moodDirectives: ["Protected", "Down-to-earth", "Shareable"],
      },
      Innocent: {
        styleDirectives: ["Classic", "Authentic", "Simple sans-serif"],
        imageryDirectives: [
          "Movement and joy images",
          "Simple decor",
          "Realistic portraits",
        ],
        moodDirectives: ["Sincere", "Real", "Comfortable"],
      },
    },
  },
};

const oneLineStoryDatabase = {
  structures: [
    "[Opener] [Brand Name] [Tool] [Audience] [Goal]",
    "For [Audience], [Brand Name] delivers [Tool] that [Goal]",
    "[Brand Name] helps [Audience] achieve [Goal] through [Tool]",
    "[Opener] we [Tool] [Audience] to [Goal]",
    "[Brand Name]: [Tool] for [Audience] who want to [Goal]",
  ],
  fragments: {
    openers: [
      { tag: ["Hero", "Rebel"], text: "Breaking barriers," },
      { tag: ["Ruler", "Sage"], text: "Setting the standard," },
      { tag: ["Creator", "Magician"], text: "Reimagining possibilities," },
      { tag: ["Caregiver", "Innocent"], text: "Nurturing growth," },
      { tag: ["Everyman", "Jester"], text: "Bringing people together," },
      { tag: ["Lover"], text: "Creating connections," },
      { tag: ["Explorer"], text: "Discovering new paths," },
    ],
    tools: [
      { tag: ["Hero"], text: "empowers" },
      { tag: ["Ruler"], text: "leads" },
      { tag: ["Creator"], text: "creates" },
      { tag: ["Sage"], text: "guides" },
      { tag: ["Caregiver"], text: "supports" },
      { tag: ["Everyman"], text: "connects" },
      { tag: ["Jester"], text: "entertains" },
      { tag: ["Lover"], text: "inspires" },
      { tag: ["Magician"], text: "transforms" },
      { tag: ["Rebel"], text: "challenges" },
      { tag: ["Explorer"], text: "discovers" },
      { tag: ["Innocent"], text: "simplifies" },
    ],
    audiences: [
      { tag: ["Hero"], text: "ambitious professionals" },
      { tag: ["Ruler"], text: "industry leaders" },
      { tag: ["Creator"], text: "visionaries" },
      { tag: ["Sage"], text: "knowledge seekers" },
      { tag: ["Caregiver"], text: "caring individuals" },
      { tag: ["Everyman"], text: "everyday people" },
      { tag: ["Jester"], text: "fun-loving spirits" },
      { tag: ["Lover"], text: "passionate souls" },
      { tag: ["Magician"], text: "dreamers" },
      { tag: ["Rebel"], text: "change-makers" },
      { tag: ["Explorer"], text: "adventurers" },
      { tag: ["Innocent"], text: "seekers of simplicity" },
    ],
    goals: [
      { tag: ["Hero"], text: "overcome challenges" },
      { tag: ["Ruler"], text: "maintain control" },
      { tag: ["Creator"], text: "express themselves" },
      { tag: ["Sage"], text: "gain insights" },
      { tag: ["Caregiver"], text: "help others" },
      { tag: ["Everyman"], text: "belong" },
      { tag: ["Jester"], text: "enjoy life" },
      { tag: ["Lover"], text: "find connection" },
      { tag: ["Magician"], text: "transform reality" },
      { tag: ["Rebel"], text: "disrupt the status quo" },
      { tag: ["Explorer"], text: "discover new horizons" },
      { tag: ["Innocent"], text: "find peace" },
    ],
  },
};

const coreMotivationData = {
  Hero: {
    primary: "To prove worth through courageous acts",
    secondary: {
      Sage: "backed by strategic wisdom",
      Creator: "through innovative solutions",
      Ruler: "to establish lasting leadership",
      Rebel: "challenging the impossible",
      Explorer: "venturing into unknown territories",
    },
  },
  Ruler: {
    primary: "To create order and build a lasting legacy",
    secondary: {
      Hero: "through bold decisive action",
      Sage: "founded on knowledge and expertise",
      Magician: "using transformative power",
      Creator: "building enduring structures",
      Caregiver: "with responsible stewardship",
    },
  },
  Creator: {
    primary: "To create something of enduring value",
    secondary: {
      Magician: "through transformative innovation",
      Sage: "guided by insight and understanding",
      Hero: "with bold creative courage",
      Rebel: "breaking creative boundaries",
      Explorer: "discovering new possibilities",
    },
  },
  Sage: {
    primary: "To understand the world and share wisdom",
    secondary: {
      Ruler: "establishing intellectual authority",
      Creator: "through innovative thinking",
      Magician: "revealing hidden truths",
      Hero: "with courageous inquiry",
      Caregiver: "through teaching and guidance",
    },
  },
  Caregiver: {
    primary: "To protect and care for others",
    secondary: {
      Ruler: "with organized compassion",
      Innocent: "through pure nurturing",
      Everyman: "with relatable support",
      Sage: "offering wise guidance",
      Lover: "with tender devotion",
    },
  },
  Everyman: {
    primary: "To connect and belong",
    secondary: {
      Caregiver: "through genuine support",
      Jester: "with approachable humor",
      Sage: "with practical wisdom",
      Innocent: "in honest simplicity",
      Lover: "through authentic connection",
    },
  },
  Jester: {
    primary: "To bring joy and lightness to life",
    secondary: {
      Creator: "through playful creativity",
      Everyman: "with relatable fun",
      Magician: "creating delightful surprises",
      Rebel: "with irreverent humor",
      Explorer: "finding adventure in play",
    },
  },
  Lover: {
    primary: "To create intimacy and inspire love",
    secondary: {
      Creator: "through beautiful expression",
      Magician: "with enchanting allure",
      Caregiver: "through tender connection",
      Innocent: "with pure devotion",
      Everyman: "in authentic relationships",
    },
  },
  Magician: {
    primary: "To make dreams come true",
    secondary: {
      Creator: "through visionary innovation",
      Sage: "using deep knowledge",
      Hero: "with transformative courage",
      Rebel: "disrupting reality",
      Explorer: "discovering hidden realms",
    },
  },
  Rebel: {
    primary: "To overturn what is not working",
    secondary: {
      Hero: "with fearless action",
      Magician: "through radical transformation",
      Creator: "building alternatives",
      Explorer: "pioneering new paths",
      Jester: "with subversive humor",
    },
  },
  Explorer: {
    primary: "To discover and experience the world",
    secondary: {
      Hero: "with courageous ventures",
      Rebel: "breaking boundaries",
      Creator: "innovating through discovery",
      Sage: "seeking understanding",
      Magician: "transforming through experience",
    },
  },
  Innocent: {
    primary: "To experience paradise and happiness",
    secondary: {
      Caregiver: "through nurturing purity",
      Sage: "with simple wisdom",
      Everyman: "in honest connection",
      Lover: "through sincere devotion",
      Jester: "with childlike joy",
    },
  },
};

// ========== DATABASE CLASS ==========

class ClarityOSDatabase {
  constructor() {
    this.industries = [
      {
        id: "technology_it",
        name: "Technology & IT",
        mappedId: "Technology_IT",
        effects: {
          archetypePoints: [
            { archetype: "Magician", points: 25 },
            { archetype: "Creator", points: 20 },
            { archetype: "Sage", points: 15 },
          ],
          keywords: ["Innovation", "Intelligence", "Future"],
          tone: ["Technical", "Forward-thinking"],
        },
      },
      {
        id: "finance_fintech",
        name: "Finance & FinTech",
        mappedId: "Finance_FinTech",
        effects: {
          archetypePoints: [
            { archetype: "Ruler", points: 30 },
            { archetype: "Sage", points: 20 },
            { archetype: "Hero", points: 15 },
          ],
          keywords: ["Trust", "Security", "Growth"],
          tone: ["Professional", "Authoritative"],
        },
      },
      {
        id: "healthcare",
        name: "Healthcare & Wellness",
        mappedId: "Healthcare_Wellness",
        effects: {
          archetypePoints: [
            { archetype: "Caregiver", points: 35 },
            { archetype: "Sage", points: 20 },
            { archetype: "Innocent", points: 15 },
          ],
          keywords: ["Care", "Health", "Wellbeing"],
          tone: ["Compassionate", "Trustworthy"],
        },
      },
      {
        id: "retail",
        name: "Retail & E-commerce",
        mappedId: "Retail_Ecommerce",
        effects: {
          archetypePoints: [
            { archetype: "Everyman", points: 25 },
            { archetype: "Jester", points: 20 },
            { archetype: "Lover", points: 15 },
          ],
          keywords: ["Value", "Choice", "Convenience"],
          tone: ["Friendly", "Accessible"],
        },
      },
      {
        id: "education",
        name: "Education & EdTech",
        mappedId: "Education_EdTech",
        effects: {
          archetypePoints: [
            { archetype: "Sage", points: 30 },
            { archetype: "Caregiver", points: 20 },
            { archetype: "Creator", points: 15 },
          ],
          keywords: ["Knowledge", "Growth", "Empowerment"],
          tone: ["Guiding", "Supportive"],
        },
      },
      {
        id: "travel",
        name: "Travel & Hospitality",
        mappedId: "Travel_Hospitality",
        effects: {
          archetypePoints: [
            { archetype: "Explorer", points: 30 },
            { archetype: "Innocent", points: 20 },
            { archetype: "Caregiver", points: 15 },
          ],
          keywords: ["Adventure", "Freedom", "Comfort"],
          tone: ["Welcoming", "Adventurous"],
        },
      },
    ];

    this.brandStages = [
      {
        id: "challenger",
        name: "Challenger (Startup)",
        effects: {
          archetypePoints: [
            { archetype: "Rebel", points: 25 },
            { archetype: "Hero", points: 20 },
            { archetype: "Explorer", points: 15 },
          ],
          styleDirectives: { bold: 20, dynamic: 15, disruptive: 10 },
          keywords: ["Disruptive", "Agile", "Innovative"],
        },
      },
      {
        id: "contender",
        name: "Contender (Scale-up)",
        effects: {
          archetypePoints: [
            { archetype: "Hero", points: 25 },
            { archetype: "Creator", points: 20 },
            { archetype: "Sage", points: 15 },
          ],
          styleDirectives: { professional: 20, balanced: 15, growth: 10 },
          keywords: ["Growth", "Professional", "Reliable"],
        },
      },
      {
        id: "leader",
        name: "Leader (Enterprise)",
        effects: {
          archetypePoints: [
            { archetype: "Ruler", points: 30 },
            { archetype: "Sage", points: 25 },
            { archetype: "Magician", points: 15 },
          ],
          styleDirectives: { authoritative: 25, refined: 20, timeless: 15 },
          keywords: ["Authority", "Excellence", "Leadership"],
        },
      },
    ];

    this.attributes = [
      {
        id: "ambitious",
        name: "Ambitious",
        effects: {
          archetypePoints: [
            { archetype: "Hero", points: 15 },
            { archetype: "Ruler", points: 10 },
          ],
          keywords: ["Achievement", "Success"],
          tone: ["Aspirational", "Determined"],
        },
      },
      {
        id: "innovative",
        name: "Innovative",
        effects: {
          archetypePoints: [
            { archetype: "Creator", points: 20 },
            { archetype: "Magician", points: 15 },
          ],
          keywords: ["Innovation", "Creativity"],
          tone: ["Forward-thinking", "Visionary"],
        },
      },
      {
        id: "trustworthy",
        name: "Trustworthy",
        effects: {
          archetypePoints: [
            { archetype: "Ruler", points: 15 },
            { archetype: "Caregiver", points: 15 },
            { archetype: "Sage", points: 10 },
          ],
          keywords: ["Trust", "Reliability"],
          tone: ["Dependable", "Honest"],
        },
      },
      {
        id: "creative",
        name: "Creative",
        effects: {
          archetypePoints: [
            { archetype: "Creator", points: 20 },
            { archetype: "Jester", points: 10 },
          ],
          keywords: ["Creativity", "Imagination"],
          tone: ["Expressive", "Original"],
        },
      },
      {
        id: "bold",
        name: "Bold",
        effects: {
          archetypePoints: [
            { archetype: "Rebel", points: 20 },
            { archetype: "Hero", points: 15 },
          ],
          keywords: ["Courage", "Daring"],
          tone: ["Fearless", "Confident"],
        },
      },
    ];

    this.coreMotivation = coreMotivationData;
    this.toneOfVoiceDB = toneOfVoiceDatabase;
    this.visualDirectivesDB = visualDirectivesDatabase;
    this.oneLineStoryDB = oneLineStoryDatabase;
    this.archetypes = Object.keys(coreMotivationData).map((name) => ({
      archetype: name,
    }));
  }

  async loadData() {
    console.log("✅ ClarityOS Database initialized with complete JSON data");
    return true;
  }

  getToneOfVoice(archetypes, industry, count = 5) {
    const scores = {};
    const industryMapped = this.industries.find(
      (i) => i.id === industry
    )?.mappedId;

    this.toneOfVoiceDB.toneOfVoice.forEach((tone) => {
      let score = 0;

      archetypes.forEach((arch, index) => {
        if (tone.tags.includes(arch)) {
          score += (3 - index) * 10;
        }
      });

      if (industryMapped && tone.tags.includes(industryMapped)) {
        score += 5;
      }

      if (score > 0) {
        scores[tone.word] = score;
      }
    });

    return Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map((item) => item[0]);
  }

  getKeywords(archetypes, industry, count = 10) {
    const scores = {};
    const industryMapped = this.industries.find(
      (i) => i.id === industry
    )?.mappedId;

    this.toneOfVoiceDB.keywords.forEach((kw) => {
      let score = 0;

      archetypes.forEach((arch, index) => {
        if (kw.tags.includes(arch)) {
          score += (3 - index) * 10;
        }
      });

      if (industryMapped && kw.tags.includes(industryMapped)) {
        score += 5;
      }

      if (score > 0) {
        scores[kw.word] = score;
      }
    });

    return Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map((item) => item[0]);
  }

  getVisualDirectives(dominantArchetype, secondaryArchetype) {
    const archetypeVisuals = this.visualDirectivesDB[dominantArchetype];

    if (!archetypeVisuals) {
      console.warn(
        `⚠️ No visual directives for ${dominantArchetype}, using defaults`
      );
      return {
        style: ["Modern", "Clean", "Professional"],
        imagery: ["Simple shapes", "Clear typography"],
        mood: ["Confident", "Trustworthy", "Approachable"],
      };
    }

    let directives = null;

    if (archetypeVisuals.variations) {
      const variationKey = Object.keys(archetypeVisuals.variations).find(
        (key) => key.toLowerCase().includes(secondaryArchetype.toLowerCase())
      );

      if (variationKey) {
        directives = archetypeVisuals.variations[variationKey];
        console.log(
          `✅ Using ${dominantArchetype} + ${variationKey} variation`
        );
      }
    }

    if (!directives && archetypeVisuals.defaultDirectives) {
      directives = archetypeVisuals.defaultDirectives;
      console.log(`✅ Using ${dominantArchetype} default directives`);
    }

    if (!directives) {
      return {
        style: ["Modern", "Clean", "Professional"],
        imagery: ["Simple shapes", "Clear typography"],
        mood: ["Confident", "Trustworthy", "Approachable"],
      };
    }

    return {
      style: directives.styleDirectives || [],
      imagery: directives.imageryDirectives || [],
      mood: directives.moodDirectives || [],
    };
  }
}

function runClarityOS(brief, db) {
  console.log("🚀 ClarityOS Engine started");

  const archetypeScores = {};
  const visualDirectives = { style: {}, imagery: {}, mood: {} };

  db.archetypes?.forEach((arch) => {
    archetypeScores[arch.archetype] = 0;
  });

  function applyAllEffects(effects) {
    if (!effects) return;

    if (effects.archetypePoints) {
      effects.archetypePoints.forEach((ap) => {
        archetypeScores[ap.archetype] =
          (archetypeScores[ap.archetype] || 0) + ap.points;
      });
    }

    if (effects.styleDirectives) {
      Object.entries(effects.styleDirectives).forEach(([key, value]) => {
        visualDirectives.style[key] =
          (visualDirectives.style[key] || 0) + value;
      });
    }
  }

  applyAllEffects(db.industries?.find((i) => i.id === brief.industry)?.effects);
  applyAllEffects(db.brandStages?.find((bs) => bs.id === brief.stage)?.effects);

  brief.attributes?.forEach((id) =>
    applyAllEffects(db.attributes?.find((i) => i.id === id)?.effects)
  );

  const sortedArchetypes = Object.entries(archetypeScores).sort(
    (a, b) => b[1] - a[1]
  );

  const dominantArchetype = sortedArchetypes[0]?.[0] || "Hero";
  const secondaryArchetype = sortedArchetypes[1]?.[0] || "Sage";
  const tertiaryArchetype = sortedArchetypes[2]?.[0] || "Creator";

  const top3Archetypes = [
    dominantArchetype,
    secondaryArchetype,
    tertiaryArchetype,
  ];

  const smartToneOfVoice = db.getToneOfVoice(top3Archetypes, brief.industry, 5);
  const smartKeywords = db.getKeywords(top3Archetypes, brief.industry, 10);
  const smartVisuals = db.getVisualDirectives(
    dominantArchetype,
    secondaryArchetype
  );

  function assembleCoreMotivation() {
    const primary = db.coreMotivation[dominantArchetype]?.primary || "";
    const secondary =
      db.coreMotivation[dominantArchetype]?.secondary?.[secondaryArchetype] ||
      "";
    return `${primary} ${secondary}`.trim();
  }

  function assembleOneLineStory() {
    const storyFragments = db.oneLineStoryDB.fragments;
    const structure = db.oneLineStoryDB.structures[0];

    const opener =
      storyFragments.openers.find((f) => f.tag.includes(dominantArchetype))
        ?.text || "";
    const tool =
      storyFragments.tools.find((f) => f.tag.includes(dominantArchetype))
        ?.text || "";
    const audience =
      storyFragments.audiences.find((f) => f.tag.includes(dominantArchetype))
        ?.text || "";
    const goal =
      storyFragments.goals.find((f) => f.tag.includes(dominantArchetype))
        ?.text || "";

    return structure
      .replace("[Opener]", opener)
      .replace("[Brand Name]", brief.name || "Your Brand")
      .replace("[Tool]", tool)
      .replace("[Audience]", audience)
      .replace("[Goal]", goal);
  }

  function calculateClarityScore() {
    let score = 0;
    if (brief.name) score += 15;
    if (brief.tagline) score += 10;
    if (brief.industry) score += 15;
    if (brief.stage) score += 15;
    if (brief.attributes?.length >= 3) score += 20;
    if (brief.colors?.length >= 2) score += 15;
    if (brief.typography) score += 10;
    return Math.min(100, score);
  }

  const blueprint = {
    brandIdentity: {
      dominantArchetype,
      secondaryArchetype,
      coreMotivation: assembleCoreMotivation(),
      archetypeMix: sortedArchetypes.slice(0, 3).map(([name, score]) => ({
        name,
        score,
        percentage: Math.round((score / (sortedArchetypes[0]?.[1] || 1)) * 100),
      })),
    },
    communication: {
      oneLineStory: assembleOneLineStory(),
      keywords: smartKeywords,
      toneOfVoice: smartToneOfVoice,
    },
    visuals: {
      blueprintTitle: `A ${dominantArchetype} blueprint driven by a ${secondaryArchetype} influence.`,
      styleDirectives: smartVisuals.style,
      imageryDirectives: smartVisuals.imagery,
      moodDirectives: smartVisuals.mood,
    },
    systemState: {
      nextStepText: "Your brand blueprint is complete and ready for action.",
      unlockedStatus: calculateClarityScore() >= 80,
      clarityScore: calculateClarityScore(),
    },
    brief: {
      name: brief.name,
      tagline: brief.tagline,
      industry: brief.industry,
      stage: brief.stage,
    },
  };

  console.log("✅ Blueprint generated successfully");
  console.log("🎯 Tone of Voice:", smartToneOfVoice);
  console.log("🔑 Keywords:", smartKeywords);
  console.log("🎨 Visual Directives:", smartVisuals);

  return blueprint;
}

class ClarityOSEngine {
  constructor() {
    this.db = new ClarityOSDatabase();
    this.initialized = false;
  }

  async initialize() {
    if (!this.initialized) {
      await this.db.loadData();
      this.initialized = true;
    }
    return this.initialized;
  }

  generateBlueprint(brief) {
    if (!this.initialized) {
      console.warn("⚠️ Engine not initialized");
      return null;
    }
    return runClarityOS(brief, this.db);
  }

  previewArchetypes(brief) {
    if (!this.initialized) return [];

    const archetypeScores = {};
    this.db.archetypes?.forEach((arch) => {
      archetypeScores[arch.archetype] = 0;
    });

    function applyEffects(effects) {
      if (effects?.archetypePoints) {
        effects.archetypePoints.forEach((ap) => {
          if (archetypeScores.hasOwnProperty(ap.archetype)) {
            archetypeScores[ap.archetype] += ap.points;
          }
        });
      }
    }

    const industrySelection = this.db.industries?.find(
      (i) => i.id === brief.industry
    );
    applyEffects(industrySelection?.effects);

    const brandStageSelection = this.db.brandStages?.find(
      (bs) => bs.id === brief.stage
    );
    applyEffects(brandStageSelection?.effects);

    brief.attributes?.forEach((id) => {
      const attributeSelection = this.db.attributes?.find((a) => a.id === id);
      applyEffects(attributeSelection?.effects);
    });

    const sortedArchetypes = Object.entries(archetypeScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    return sortedArchetypes.map(([name, score]) => ({
      name,
      score,
    }));
  }

  getToneOfVoicePreview(brief) {
    const archetypes = this.previewArchetypes(brief).map((a) => a.name);
    return this.db.getToneOfVoice(archetypes, brief.industry, 5);
  }

  getKeywordsPreview(brief) {
    const archetypes = this.previewArchetypes(brief).map((a) => a.name);
    return this.db.getKeywords(archetypes, brief.industry, 10);
  }

  getVisualDirectivesPreview(brief) {
    const archetypes = this.previewArchetypes(brief);
    if (archetypes.length < 2) return null;
    return this.db.getVisualDirectives(archetypes[0].name, archetypes[1].name);
  }
}

export { ClarityOSEngine, ClarityOSDatabase, runClarityOS };

export default ClarityOSEngine;

if (typeof window !== "undefined") {
  window.ClarityOSEngine = ClarityOSEngine;
}

console.log("✅ ClarityOS Engine v3.3 - Complete & Optimized");

const testBrief = {
  name: "TechFlow AI",
  tagline: "Empowering Tomorrow",
  industry: "technology_it",
  stage: "challenger",
  attributes: ["innovative", "bold", "ambitious"],
};

const engine = new ClarityOSEngine();
engine.initialize().then(() => {
  console.log("\n📋 === COMPLETE TEST ===");
  const blueprint = engine.generateBlueprint(testBrief);

  console.log("\n🧬 Brand Identity:");
  console.log("  Dominant:", blueprint.brandIdentity.dominantArchetype);
  console.log("  Secondary:", blueprint.brandIdentity.secondaryArchetype);
  console.log("  Motivation:", blueprint.brandIdentity.coreMotivation);

  console.log("\n🗣️ Communication:");
  console.log("  Tone:", blueprint.communication.toneOfVoice.join(", "));
  console.log("  Keywords:", blueprint.communication.keywords.join(", "));
  console.log("  Story:", blueprint.communication.oneLineStory);

  console.log("\n🎨 Visuals:");
  console.log("  Style:", blueprint.visuals.styleDirectives.join(", "));
  console.log("  Imagery:", blueprint.visuals.imageryDirectives.join(", "));
  console.log("  Mood:", blueprint.visuals.moodDirectives.join(", "));

  console.log("\n📊 System:");
  console.log("  Clarity Score:", blueprint.systemState.clarityScore + "%");
  console.log(
    "  Status:",
    blueprint.systemState.unlockedStatus ? "✅ Unlocked" : "🔒 Locked"
  );
});
