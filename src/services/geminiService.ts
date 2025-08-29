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

Format the response as a valid JSON array with this exact structure:
[
  {
    "id": "unique-id-1",
    "title": "Creative Project Title",
    "description": "Detailed project description"
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
- Social media platforms
- Chatbots
- Financial management tools
- Travel planning apps
- Event management systems
- Fitness tracking apps
- Language learning platforms
- Recipe sharing platforms
- Personalized recommendation systems
- Smart home automation
- Inventory management systems
- Project management tools
- Event ticketing systems

Avoid generic projects like blogs, ecommerce sites, or basic portfolios.`
    });
    
    const text = result.text || '';
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from Gemini API');
    }
    
    const projectIdeas: ProjectIdea[] = JSON.parse(jsonMatch[0]);
    
    // Validate the response structure
    if (!Array.isArray(projectIdeas) || projectIdeas.length !== 3) {
      throw new Error('Invalid project ideas response');
    }
    
    return projectIdeas;
  } catch (error) {
    console.error('Error generating project ideas:', error);
    throw new Error('Failed to generate project ideas. Please try again.');
  }
};
