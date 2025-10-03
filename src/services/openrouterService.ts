export interface ProjectIdea {
  id: string;
  title: string;
  description: string;
}

// Cache to store generated ideas for each tech stack combination
const ideaCache = new Map<string, ProjectIdea[]>();

export const generateProjectIdeas = async (
  frontend: string,
  backend: string,
  database: string
): Promise<{ ideas: ProjectIdea[]; fromCache: boolean }> => {
  const cacheKey = `${frontend}|${backend}|${database}`;
  if (ideaCache.has(cacheKey)) {
    return { ideas: ideaCache.get(cacheKey)!, fromCache: true };
  }

  // Prepare the OpenRouter API request
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const siteUrl = import.meta.env.VITE_SITE_URL || '';
  const siteTitle = import.meta.env.VITE_SITE_TITLE || '';

  const body = {
    model: 'openai/gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Generate 3 unique and innovative project ideas (NOT generic ones like blog, ecommerce, portfolio) that would be perfect for a developer using ${frontend} for frontend, ${backend} for backend, and ${database} for database.\n\nFor each project idea, provide:\n1. A creative and unique title\n2. A detailed description (4-5 sentences explaining the concept, features, and benefits)\n\nMake sure the projects are:\n- Innovative and not commonly built\n- Feasible with the selected tech stack\n- Interesting and engaging\n- Different from each other\n\nIMPORTANT: Respond ONLY with valid JSON in this exact format, no other text:\n[\n  {\n    \'id\': \'unique-id-1\',\n    \'title\': \'Creative Project Title\',\n    \'description\': \'Detailed project description\'\n  },\n  {\n    \'id\': \'unique-id-2\',\n    \'title\': \'Another Creative Project Title\',\n    \'description\': \'Another detailed project description\'\n  },\n  {\n    \'id\': \'unique-id-3\',\n    \'title\': \'Third Creative Project Title\',\n    \'description\': \'Third detailed project description\'\n  }\n]\n\nAvoid generic projects like blogs, ecommerce sites, or basic portfolios. Make each idea truly unique and different from typical examples.`
          }
        ]
      }
    ]
  };

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': siteUrl,
      'X-Title': siteTitle,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch project ideas from OpenRouter API');
  }

  const data = await response.json();
  let text = '';
  try {
    text = data.choices[0].message.content;
  } catch {
    throw new Error('Invalid response format from OpenRouter API');
  }

  let projectIdeas: ProjectIdea[];
  try {
    projectIdeas = JSON.parse(text.trim());
  } catch {
    // Try to extract JSON array with regex
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON array found in response');
    projectIdeas = JSON.parse(jsonMatch[0]);
  }

  if (!Array.isArray(projectIdeas) || projectIdeas.length !== 3) {
    throw new Error('Expected 3 project ideas in the response');
  }

  // Ensure each project has a valid ID
  projectIdeas.forEach((project, i) => {
    if (!project.id || project.id.trim() === '') {
      project.id = `project-${i + 1}`;
    }
  });

  ideaCache.set(cacheKey, projectIdeas);
  return { ideas: projectIdeas, fromCache: false };
};

export const clearIdeaCache = () => {
  ideaCache.clear();
};

export const getCacheStats = () => {
  return {
    cachedStacks: ideaCache.size,
    totalCachedIdeas: Array.from(ideaCache.values()).reduce((sum, ideas) => sum + ideas.length, 0)
  };
};
