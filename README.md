# Project Genesis 🚀

An AI-powered project idea generator that creates unique, innovative project suggestions based on your chosen tech stack.

## Features

###  **Smart Category System**
- **8 Organized Category Sets** with 5 categories each (40 total categories)
- **Intelligent Selection Algorithm** picks 4 categories from different sets
- **Maximum Variety Guarantee** - no similar categories in the same generation
- **Rotation Tracking** ensures different combinations across multiple generations

###  **Industry & Persona Variety**
- **4 Industry Categories** with 6 subcategories each
- **4 User Persona Types** with 6 personas each
- **4 Complexity Levels** for project scope variation
- **Dynamic Selection** from different categories for each generation

### 💾 **Smart Caching System**
- **Instant Response** for repeated tech stack selections
- **Cost Optimization** reduces API calls
- **"Generate New Ideas" Button** for fresh content when desired
- **Cache Transparency** shows when ideas are from cache vs. fresh

## 🎲 How the Category System Works

### **Category Sets (8 sets × 5 categories = 40 total)**

1. **🤖 AI & Machine Learning**
   - AI-powered creative tools
   - Machine learning utilities
   - Natural language processing apps
   - Computer vision applications
   - Predictive analytics platforms

2. **🎨 Creative & Media**
   - Creative content generation tools
   - Digital art and design tools
   - Music and audio applications
   - Video and multimedia tools
   - Creative coding platforms

3. **💼 Business & Productivity**
   - Financial technology solutions
   - Automation and workflow tools
   - Productivity enhancers
   - Project management platforms
   - Business intelligence tools

4. **👥 Social & Community**
   - Real-time collaboration platforms
   - Community and networking apps
   - Social impact tools
   - Event management systems
   - Peer-to-peer platforms

5. **⚙️ Technology & Infrastructure**
   - IoT data visualization dashboards
   - Blockchain-based applications
   - Data analytics platforms
   - API management tools
   - DevOps automation platforms

6. **🏥 Health & Wellness**
   - Health and wellness apps
   - Mental health support tools
   - Fitness tracking platforms
   - Nutrition and diet apps
   - Telemedicine solutions

7. **📚 Education & Learning**
   - Educational technology
   - Learning management systems
   - Skill assessment platforms
   - Interactive tutorials
   - Knowledge sharing tools

8. **🎮 Gaming & Entertainment**
   - Gaming platforms
   - Interactive storytelling apps
   - Virtual reality experiences
   - Augmented reality tools
   - Social gaming platforms

### Selection Algorithm

1. **Smart Picking**: Selects 4 categories from 4 different sets
2. **Rotation System**: Starts from different set each time for variety
3. **No Duplicates**: Ensures maximum diversity in each generation
4. **Balanced Distribution**: Covers different domains and themes

### **Industry Focus (4 categories × 6 subcategories = 24 total)**

- **Technology & Innovation**: FinTech, HealthTech, EdTech, PropTech, AgriTech, CleanTech
- **Traditional Industries**: Manufacturing, Retail, Healthcare, Education, Finance, Real Estate
- **Creative & Media**: Gaming, Entertainment, Media, Publishing, Design, Music
- **Emerging Sectors**: Sustainability, Space Tech, Biotech, Nanotech, Quantum Computing, Robotics

### **User Personas (4 types × 6 personas = 24 total)**

- **Professional**: Startup Founder, Enterprise Developer, Product Manager, Business Analyst, Data Scientist, UX Designer
- **Creative**: Content Creator, Digital Artist, Game Developer, Musician, Video Producer, Creative Director
- **Technical**: Full Stack Developer, DevOps Engineer, Security Specialist, System Administrator, Database Administrator, Cloud Architect
- **End User**: Small Business Owner, Freelancer, Student, Educator, Healthcare Professional, Gamer

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
   - OpenRouter API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-genesis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```


3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Add your OpenRouter API key to .env.local
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
   VITE_SITE_URL=https://your-site-url.com
   VITE_SITE_TITLE=Your Site Name
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🎯 Usage

### **Basic Workflow**
1. Select your tech stack (Frontend, Backend, Database)
2. Click "Generate" to get unique project ideas
3. Use "New Ideas" button to get fresh suggestions for the same stack
4. Toggle "Show Category System Info" to see selection details

### **Understanding the Results**
- **Cached Ideas**: Fast response, previously generated content
- **Fresh Ideas**: New generation with different category combinations
- **Variety Indicators**: Console logs show selected categories and focus areas

### **Debug Information**
Click "Show Category System Info" to see:
- Category set breakdowns
- Selection strategy details
- Cache statistics
- Current rotation state

## 🔧 Technical Details

### **Architecture**
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom components
- **Caching**: In-memory Map with tech stack keys

### **Key Functions**
- `selectDiverseCategories()`: Smart category selection algorithm
- `selectDiverseFocus()`: Industry and persona variety selection
- `generateProjectIdeas()`: Main generation function with caching
- `clearIdeaCache()`: Cache management for fresh ideas

### **Performance Features**
- **Lazy Loading**: Dynamic imports for services
- **Smart Caching**: Instant response for repeated requests
- **Efficient Selection**: O(1) category set lookups
- **Memory Management**: Configurable cache clearing

## 🎨 Customization

### **Adding New Categories**
```typescript
// Add to existing set
categorySets.tech.push('New Tech Category');

// Create new set
categorySets.newDomain = [
  'Category 1',
  'Category 2',
  'Category 3',
  'Category 4',
  'Category 5'
];
```

### **Modifying Selection Logic**
```typescript
// Change number of categories selected
function selectDiverseCategories(): string[] {
  // Modify the loop to select different number
  for (let i = 0; i < 5; i++) { // Change from 4 to 5
    // ... selection logic
  }
}
```

### **Adjusting Variety Factors**
```typescript
// Add new complexity levels
const complexityLevels = [
  'MVP with core features',
  'Full-featured application',
  'Enterprise-grade solution',
  'Prototype with potential for scaling',
  'Your Custom Level' // Add custom levels
];
```

## Testing

### **Cache Testing**
```typescript
// Check cache statistics
import { getCacheStats, getCategoryStats } from './services/geminiService';
console.log('Cache:', getCacheStats());
console.log('Categories:', getCategoryStats());
```

### **Category Rotation Testing**
```typescript
// Reset rotation for testing
import { resetCategoryRotation } from './services/geminiService';
resetCategoryRotation();
```

## Monitoring & Analytics

### **Console Logs**
- Cache hits with tech stack info
- Fresh generation details
- Selected categories and focus areas
- Industry and persona selections
- Complexity level choices

### **Cache Statistics**
- Number of cached tech stack combinations
- Total cached project ideas
- Category rotation index
- Set distribution information

## Future Enhancements

### **Planned Features**
- **Persistent Caching**: Local storage for browser persistence
- **Category Preferences**: User-defined category weights
- **Project History**: Track generated ideas over time
- **Export Options**: Save ideas to various formats
- **Collaboration**: Share and rate project ideas

### **Advanced Algorithms**
- **Machine Learning**: Learn user preferences over time
- **Trend Integration**: Real-time industry trend analysis
- **Complexity Matching**: User skill level adaptation
- **Market Analysis**: Project viability scoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenRouter API for AI-powered idea generation
- React team for the amazing framework
- Tailwind CSS for the utility-first styling
- Open source community for inspiration and tools

---

**Built with ❤️ for developers who want to build amazing things**
