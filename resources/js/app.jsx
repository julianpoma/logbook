import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { initializeTheme } from './hooks/use-appearance';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

createInertiaApp({
  title: (title) => `${title} - Logbook`,
  resolve: (name) => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <ErrorBoundary fallback="😭">
        <App {...props} />
      </ErrorBoundary>,
    );
  },
  progress: {
    color: '#4B5563',
  },
});

// This will set light / dark mode on load...
initializeTheme();
