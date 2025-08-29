# Project Genesis

A modern web application that generates unique project ideas using the Gemini AI API. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Tech Stack Selection**: Choose from popular frontend, backend, and database technologies
- **AI-Powered Project Ideas**: Generate 3 unique project ideas tailored to your selected tech stack
- **Interactive Cards**: Beautiful project idea cards with expandable workflow details
- **Modern UI**: Responsive design with dark theme and smooth animations
- **Unique Ideas**: Focuses on innovative projects, avoiding generic templates

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini API
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm or yarn
- Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project-genesis
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `env.example` to `.env.local`
   - Add your Gemini API key:
```bash
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

## Usage

1. **Select Your Tech Stack**: Choose your preferred frontend, backend, and database technologies from the dropdown menus
2. **Generate Ideas**: Click the "Generate" button to create 3 unique project ideas
3. **Explore Projects**: Each project idea is displayed in a beautiful card with:
   - Project title and description
   - Relevant emoji/icon
   - Expandable workflow steps
4. **Read More**: Click "Read More" on any card to see the detailed step-by-step workflow

## Project Ideas

The AI generates innovative project ideas such as:
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

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Your Gemini API key from Google AI Studio | Yes |

## API Configuration

The application uses the Gemini 2.0 Flash model for generating project ideas. The AI is prompted to create unique, innovative projects that are:
- Feasible with the selected tech stack
- Different from generic templates (blogs, ecommerce, portfolios)
- Engaging and interesting for developers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions:
1. Check the [Gemini API documentation](https://ai.google.dev/gemini-api/docs)
2. Ensure your API key is valid and has sufficient quota
3. Check the browser console for error messages
