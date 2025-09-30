# Deep Research Agent - Frontend

A professional, AI-powered research assistant interface built with React. This application enables users to conduct comprehensive research on any topic with AI-generated reports and curated video recommendations.

## Features

- **AI-Powered Research**: Generate comprehensive research reports on any topic
- **Customizable Depth**: Choose between small, medium, or deep research levels
- **Source Citations**: Automatic citation and reference management
- **Video Integration**: Find relevant educational videos for your research topic
- **Responsive Design**: Professional, mobile-first interface that works on all devices
- **Real-time Processing**: Live status updates during research generation

## Tech Stack

- **React** - Frontend framework
- **Lucide React** - Icon library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and development server

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/pathutm/Foundational-Agents-FE.git
cd Foundational-Agents-FE
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:
```env
API_BASE_URL=http://localhost:8000
```

Replace `http://localhost:8000` with your backend API URL if different.

## Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Build for Production

Create an optimized production build:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Preview Production Build

Preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## Project Structure

Fondational-Agents-FE/
├── node_modules/           # Dependencies
├── public/                 # Static assets
├── src/                    # Source files
│   ├── assets/            # Images, fonts, etc.
│   ├── pages/             # Page components
│   │   └── DeepResearch.jsx  # Main research page
│   ├── routes/            # Route configuration
│   │   └── Routes.jsx     # React Router setup
│   ├── App.css            # App-specific styles
│   ├── App.jsx            # Root component
│   ├── index.css          # Global styles & Tailwind imports
│   └── main.jsx           # React DOM rendering
├── .env                    # Environment variables (create this)
├── .gitignore             # Git ignore rules
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML entry point
├── package.json           # Dependencies & scripts
├── package-lock.json      # Locked dependencies
├── README.md              # This file
└── vite.config.js         # Vite configuration

## Usage

### Basic Research Flow

1. **Enter Research Title**: Type your research topic (required)
2. **Add Context** (Optional): Provide specific aspects or additional context
3. **Select Research Depth**:
   - Small: ½–1 page report
   - Medium: 1–2 pages report
   - Deep: 2–3 pages comprehensive report
4. **Set Number of Sources**: Choose 1-20 sources (default: 5)
5. **Click "Run Research"**: Generate your research report
6. **Optional: Get Videos**: Click "Get Videos" for related video content

### Sample Research Topics

- "The Impact of AI on Healthcare Diagnostics"
- "Renewable Energy Solutions for Climate Change"
- "Remote Learning Technologies Post-Pandemic"
- "Cryptocurrency Adoption in Traditional Finance"
- "Quantum Computing Applications"

## API Integration

The frontend expects the following backend endpoints:

### Research Endpoint
```
POST /research/run
Content-Type: application/json

{
  "title": "string",
  "brief": "string | null",
  "length": "small" | "medium" | "deep",
  "top_k": number
}

Response: {
  "content": "string",
  "sources": [
    {
      "title": "string",
      "url": "string"
    }
  ]
}
```

### Videos Endpoint
```
POST /research/videos
Content-Type: application/json

{
  "title": "string",
  "top_k": number
}

Response: {
  "videos": [
    {
      "title": "string",
      "url": "string"
    }
  ]
}
```

## Customization

### Changing Colors

The application uses a minimal color palette. To customize:

1. **Primary Action Color**: Change `bg-blue-600` to your preferred Tailwind color
2. **Secondary Action Color**: Change `bg-gray-900` to your preferred color
3. **Text Colors**: Modify `text-gray-900`, `text-gray-700`, etc.

### Modifying Layout

The layout uses Tailwind's responsive utilities:
- `max-w-7xl`: Maximum container width
- `sm:`, `md:`, `lg:`: Responsive breakpoints
- Adjust padding with `px-4 sm:px-6 lg:px-8`

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure your backend has proper CORS configuration:
```javascript
// Backend should allow requests from your frontend origin
Access-Control-Allow-Origin: http://localhost:5173
```

### API Connection Failed
1. Verify the `API_BASE_URL` in your `.env` file
2. Ensure the backend server is running
3. Check browser console for detailed error messages

### Build Errors
1. Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Clear Vite cache:
```bash
rm -rf .vite
npm run dev
```



**Note**: Make sure your backend API is running and properly configured before using this frontend application.