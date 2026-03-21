# Project Title

  AI Chat application

# Live Demo Link

  https://ai-chat-iota-peach.vercel.app/

# Features

  - New Chat functionality with input and display response from AI
  - Chat History
  - Delete button to delete individual chats
  - Clear button to clear messages in current session
  - Loading and Error handling
  - Like and dislike buttons for feedback

# Tech Stack

  - React+TypeScript+Vite
  - Redux for state management
  - React Router for routing
  - Tailwind CSS
  - Hugging Face API
  - Local Storage for persistence
  - Deployed using Vercel

# Project Structure

  src/
  ├── components/
  │   ├── chatinterface.tsx
  │   ├── sidenav.tsx
  │
  ├── hooks/
  │   ├── useChatInterface.ts
  │
  ├── pages/
  │   ├── chatPage.tsx
  │
  ├── services/
  │   ├── vhatService.ts
  │
  ├── store/
  │   ├── chatSlice.ts
  │   ├── index.ts
  │
  ├── styles/
  │   └── common.css
  │
  ├── types/
  │   └── global.ts
  │
  ├── App.tsx
  ├── main.tsx

# Installation & Setup
  1. Clone the repository
    git clone https://github.com/Aparna-Sykam/AI_chat.git
    cd ai_chat
  2. Install dependencies
    npm install
  3. Run the application
    npm run dev
  4. Open in browser
    http://localhost:5173
  
  5. For deployment
    npm run build

# Deploy to Vercel

  1. npm install -g 
  2. vercel login
  3. vercel --prod
