import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export interface ProjectIdea {
  id: string;
  title: string;
  description: string;
}

// Cache to store generated ideas for each tech stack combination
const ideaCache = new Map<string, ProjectIdea[]>();

// Track category rotation to ensure variety across generations
let categoryRotationIndex = 0;

// Organized project categories into logical sets for maximum variety
const categorySets = {
  // Set 1: AI & Machine Learning
  aiMl: [
    'AI-powered creative tools',
    'Machine learning utilities',
    'Natural language processing apps',
    'Computer vision applications',
    'Predictive analytics platforms'
  ],
  
  // Set 2: Creative & Media
  creative: [
    'Creative content generation tools',
    'Digital art and design tools',
    'Music and audio applications',
    'Video and multimedia tools',
    'Creative coding platforms'
  ],
  
  // Set 3: Business & Productivity
  business: [
    'Financial technology solutions',
    'Automation and workflow tools',
    'Productivity enhancers',
    'Project management platforms',
    'Business intelligence tools'
  ],
  
  // Set 4: Social & Community
  social: [
    'Real-time collaboration platforms',
    'Community and networking apps',
    'Social impact tools',
    'Event management systems',
    'Peer-to-peer platforms'
  ],
  
  // Set 5: Technology & Infrastructure
  tech: [
    'IoT data visualization dashboards',
    'Blockchain-based applications',
    'Data analytics platforms',
    'API management tools',
    'DevOps automation platforms'
  ],
  
  // Set 6: Health & Wellness
  health: [
    'Health and wellness apps',
    'Mental health support tools',
    'Fitness tracking platforms',
    'Nutrition and diet apps',
    'Telemedicine solutions'
  ],
  
  // Set 7: Education & Learning
  education: [
    'Educational technology',
    'Learning management systems',
    'Skill assessment platforms',
    'Interactive tutorials',
    'Knowledge sharing tools'
  ],
  
  // Set 8: Gaming & Entertainment
  gaming: [
    'Gaming platforms',
    'Interactive storytelling apps',
    'Virtual reality experiences',
    'Augmented reality tools',
    'Social gaming platforms'
  ]
};

// Different project approaches to ensure variety
const projectApproaches = [
  'focus on user experience and modern design',
  'emphasize scalability and performance',
  'prioritize accessibility and inclusivity',
  'highlight real-time capabilities',
  'focus on data security and privacy',
  'emphasize cross-platform compatibility',
  'prioritize mobile-first design',
  'highlight AI and machine learning integration',
  'focus on collaboration and social features',
  'emphasize automation and efficiency'
];

// Industry focus with subcategories for deeper variety
const industryFocus = {
  // Technology & Innovation
  tech: ['FinTech', 'HealthTech', 'EdTech', 'PropTech', 'AgriTech', 'CleanTech'],
  
  // Traditional Industries
  traditional: ['Manufacturing', 'Retail', 'Healthcare', 'Education', 'Finance', 'Real Estate'],
  
  // Creative & Media
  creative: ['Gaming', 'Entertainment', 'Media', 'Publishing', 'Design', 'Music'],
  
  // Emerging Sectors
  emerging: ['Sustainability', 'Space Tech', 'Biotech', 'Nanotech', 'Quantum Computing', 'Robotics']
};

// User personas organized by complexity and domain
const userPersonas = {
  // Professional Users
  professional: [
    'Startup Founder',
    'Enterprise Developer',
    'Product Manager',
    'Business Analyst',
    'Data Scientist',
    'UX Designer'
  ],
  
  // Creative Users
  creative: [
    'Content Creator',
    'Digital Artist',
    'Game Developer',
    'Musician',
    'Video Producer',
    'Creative Director'
  ],
  
  // Technical Users
  technical: [
    'Full Stack Developer',
    'DevOps Engineer',
    'Security Specialist',
    'System Administrator',
    'Database Administrator',
    'Cloud Architect'
  ],
  
  // End Users
  endUser: [
    'Small Business Owner',
    'Freelancer',
    'Student',
    'Educator',
    'Healthcare Professional',
    'Gamer'
  ]
};

// Project complexity levels for variety
const complexityLevels = [
  'MVP with core features',
  'Full-featured application',
  'Enterprise-grade solution',
  'Prototype with potential for scaling'
];

/**
 * Smart category selection algorithm
 * Picks 4 categories from different sets to ensure maximum variety
 */
function selectDiverseCategories(): string[] {
  const setKeys = Object.keys(categorySets);
  const selectedCategories: string[] = [];
  const usedSets = new Set<string>();
  
  // Start from rotation index to ensure variety across generations
  let startIndex = categoryRotationIndex % setKeys.length;
  
  // Select 4 categories from different sets
  for (let i = 0; i < 4; i++) {
    const setIndex = (startIndex + i) % setKeys.length;
    const setKey = setKeys[setIndex];
    
    if (!usedSets.has(setKey)) {
      const set = categorySets[setKey as keyof typeof categorySets];
      const randomCategory = set[Math.floor(Math.random() * set.length)];
      selectedCategories.push(randomCategory);
      usedSets.add(setKey);
    }
  }
  
  // Update rotation index for next generation
  categoryRotationIndex = (categoryRotationIndex + 1) % setKeys.length;
  
  return selectedCategories;
}

/**
 * Select diverse industry focus and user persona
 */
function selectDiverseFocus(): { industry: string; persona: string; complexity: string } {
  // Select from different industry categories
  const industryCategory = Object.keys(industryFocus)[Math.floor(Math.random() * Object.keys(industryFocus).length)];
  const industrySubcategory = industryFocus[industryCategory as keyof typeof industryFocus][Math.floor(Math.random() * industryFocus[industryCategory as keyof typeof industryFocus].length)];
  
  // Select from different persona categories
  const personaCategory = Object.keys(userPersonas)[Math.floor(Math.random() * Object.keys(userPersonas).length)];
  const persona = userPersonas[personaCategory as keyof typeof userPersonas][Math.floor(Math.random() * userPersonas[personaCategory as keyof typeof userPersonas].length)];
  
  // Select complexity level
  const complexity = complexityLevels[Math.floor(Math.random() * complexityLevels.length)];
  
  return { industry: industrySubcategory, persona, complexity };
}

export const generateProjectIdeas = async (
  frontend: string,
  backend: string,
  database: string
): Promise<{ ideas: ProjectIdea[]; fromCache: boolean }> => {
  // Create a cache key for this tech stack combination
  const cacheKey = `${frontend}|${backend}|${database}`;
  
  // Check if we have cached ideas for this combination
  if (ideaCache.has(cacheKey)) {
    console.log('✅ Returning cached ideas for:', cacheKey);
    return { ideas: ideaCache.get(cacheKey)!, fromCache: true };
  }

  try {
    // Use smart selection algorithm for maximum variety
    const selectedCategories = selectDiverseCategories();
    const { industry, persona, complexity } = selectDiverseFocus();
    const randomApproach = projectApproaches[Math.floor(Math.random() * projectApproaches.length)];
    
    // Add timestamp and random elements to ensure variety
    const timestamp = Date.now();
    const randomSeed = Math.floor(Math.random() * 10000);
    
    console.log('🎯 Selected categories:', selectedCategories);
    console.log('🏭 Industry focus:', industry);
    console.log('👤 Target persona:', persona);
    console.log('⚡ Complexity level:', complexity);
    
    const result = await genAI.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: `Generate 3 unique and innovative project ideas (NOT generic ones like blog, ecommerce, portfolio) that would be perfect for a developer using ${frontend} for frontend, ${backend} for backend, and ${database} for database.

Current timestamp: ${timestamp}
Random seed: ${randomSeed}

For each project idea, provide:
1. A creative and unique title
2. A detailed description (4-5 sentences explaining the concept, features, and benefits)

Make sure the projects are:
- Innovative and not commonly built
- Feasible with the selected tech stack
- Interesting and engaging
- Different from each other
- ${randomApproach}
- Focused on ${industry} industry
- Designed for ${persona}
- Built as ${complexity}

Focus on these specific categories for variety:
${selectedCategories.map(cat => `- ${cat}`).join('\n')}

IMPORTANT: Respond ONLY with valid JSON in this exact format, no other text:
[
  {
    "id": "unique-id-1",
    "title": "Creative Project Title",
    "description": "Detailed project description"
  },
  {
    "id": "unique-id-2",
    "title": "Another Creative Project Title",
    "description": "Another detailed project description"
  },
  {
    "id": "unique-id-3",
    "title": "Third Creative Project Title",
    "description": "Third detailed project description"
  }
]

Avoid generic projects like blogs, ecommerce sites, or basic portfolios. Make each idea truly unique and different from typical examples.`
    });
    
    const text = result.text || '';
    console.log('Raw AI response:', text); // Debug log
    
    // Try to parse the response directly first
    let projectIdeas: ProjectIdea[];
    
    try {
      // First attempt: direct JSON parse
      projectIdeas = JSON.parse(text.trim());
    } catch (parseError) {
      console.log('Direct parse failed, trying regex extraction...');
      
      // Second attempt: extract JSON with regex
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        console.error('No JSON array found in response');
        console.error('Response text:', text);
        throw new Error('Invalid response format from Gemini API - no JSON array found');
      }
      
      try {
        projectIdeas = JSON.parse(jsonMatch[0]);
      } catch (regexParseError) {
        console.error('Regex extraction parse failed');
        console.error('Extracted text:', jsonMatch[0]);
        throw new Error('Failed to parse JSON from AI response');
      }
    }
    
    // Validate the response structure
    if (!Array.isArray(projectIdeas)) {
      console.error('Response is not an array:', projectIdeas);
      throw new Error('AI response is not an array');
    }
    
    if (projectIdeas.length !== 3) {
      console.error('Expected 3 projects, got:', projectIdeas.length);
      throw new Error(`Expected 3 project ideas, got ${projectIdeas.length}`);
    }
    
    // Validate each project has required fields
    for (let i = 0; i < projectIdeas.length; i++) {
      const project = projectIdeas[i];
      if (!project.id || !project.title || !project.description) {
        console.error(`Project ${i} missing required fields:`, project);
        throw new Error(`Project ${i + 1} is missing required fields (id, title, or description)`);
      }
      
      // Ensure each project has a valid ID, use index as fallback
      if (!project.id || project.id.trim() === '') {
        project.id = `project-${i + 1}`;
      }
    }
    
    // Ensure unique IDs by adding index if duplicates exist
    const seenIds = new Set<string>();
    projectIdeas.forEach((project) => {
      let uniqueId = project.id;
      let counter = 1;
      
      while (seenIds.has(uniqueId)) {
        uniqueId = `${project.id}-${counter}`;
        counter++;
      }
      
      seenIds.add(uniqueId);
      project.id = uniqueId;
    });
    
    console.log('Successfully parsed projects:', projectIdeas); // Debug log
    
    // Cache the generated ideas
    ideaCache.set(cacheKey, projectIdeas);
    
    return { ideas: projectIdeas, fromCache: false };
    
  } catch (error) {
    console.error('Error generating project ideas:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      throw new Error(`Failed to generate project ideas: ${error.message}`);
    } else {
      throw new Error('Failed to generate project ideas. Please try again.');
    }
  }
};

// Function to clear cache (useful for testing or when user wants fresh ideas)
export const clearIdeaCache = () => {
  ideaCache.clear();
  console.log('Idea cache cleared');
};

// Function to get cache statistics
export const getCacheStats = () => {
  return {
    cachedStacks: ideaCache.size,
    totalCachedIdeas: Array.from(ideaCache.values()).reduce((sum, ideas) => sum + ideas.length, 0)
  };
};

// Function to get category selection statistics
export const getCategoryStats = () => {
  return {
    totalSets: Object.keys(categorySets).length,
    totalCategories: Object.values(categorySets).reduce((sum, set) => sum + set.length, 0),
    rotationIndex: categoryRotationIndex,
    categorySets: Object.keys(categorySets)
  };
};

// Function to manually reset category rotation (for testing)
export const resetCategoryRotation = () => {
  categoryRotationIndex = 0;
  console.log('Category rotation reset to 0');
};
