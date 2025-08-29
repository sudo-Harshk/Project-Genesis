import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export interface ProjectIdea {
  id: string;
  title: string;
  description: string;
}

export const generateProjectIdeas = async (
  frontend: string,
  backend: string,
  database: string
): Promise<ProjectIdea[]> => {
  try {
    const result = await genAI.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: `Generate 3 unique and innovative project ideas (NOT generic ones like blog, ecommerce, portfolio) that would be perfect for a developer using ${frontend} for frontend, ${backend} for backend, and ${database} for database.

For each project idea, provide:
1. A creative and unique title
2. A detailed description (4-5 sentences explaining the concept, features, and benefits)

Make sure the projects are:
- Innovative and not commonly built
- Feasible with the selected tech stack
- Interesting and engaging
- Different from each other

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

Focus on unique ideas like:
- AI-powered creative tools
- Real-time collaboration platforms
- IoT data visualization dashboards
- Blockchain-based applications
- Machine learning utilities
- Social impact tools
- Gaming platforms
- Educational technology
- Health and wellness apps
- Environmental monitoring systems

Avoid generic projects like blogs, ecommerce sites, or basic portfolios.`
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
    projectIdeas.forEach((project, index) => {
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
    return projectIdeas;
    
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
