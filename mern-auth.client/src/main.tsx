import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.css'

import App from './App.tsx'
import { store } from './app/store.ts'
import { SnackbarProvider } from './hooks/SnackbarProvider.tsx'
import { AppThemeProvider } from './theme/AppThemeProvider.tsx'
import ErrorBoundary from '../ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <SnackbarProvider>
          <AppThemeProvider>
            <App />
          </AppThemeProvider>
        </SnackbarProvider>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
)
