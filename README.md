
# Academe Project Management

A comprehensive project management dashboard built with React, Vite, TypeScript, and Tailwind CSS.

## Project Overview

This application provides a complete project management solution with features including:

- User authentication
- Project management
- Task boards with drag and drop functionality
- Group collaboration
- User profiles and settings

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn-ui
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Query (TanStack Query)
- **Charts and Visualizations**: Recharts
- **Icons**: Lucide React

## Installation Instructions (using Yarn)

### Prerequisites

- Node.js (v16.0.0 or higher)
- Yarn package manager

### Step 1: Clone the repository

```bash
git clone <repository-url>
cd <project-directory>
```

### Step 2: Install dependencies with Yarn

```bash
yarn
```

### Step 3: Start the development server

```bash
yarn dev
```

This will start the development server at http://localhost:8080

### Additional Yarn Commands

- **Build for production**:
  ```bash
  yarn build
  ```

- **Preview the production build**:
  ```bash
  yarn preview
  ```

## Package Dependencies

If you need to install the dependencies separately or want to know what's included:

### Main Dependencies

```bash
yarn add @hookform/resolvers @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip @tanstack/react-query class-variance-authority clsx cmdk date-fns embla-carousel-react input-otp lucide-react next-themes react react-beautiful-dnd react-day-picker react-dom react-hook-form react-resizable-panels react-router-dom recharts sonner tailwind-merge tailwindcss-animate vaul zod
```

### UI Components

The project uses shadcn-ui, a collection of reusable components built using Radix UI and Tailwind CSS.

## Project Structure

- `/src/components`: UI components
- `/src/pages`: Application pages
- `/src/contexts`: React contexts
- `/src/hooks`: Custom React hooks
- `/src/lib`: Utility functions

## Deployment

The application can be deployed to any static hosting platform, such as Vercel, Netlify, or GitHub Pages.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
