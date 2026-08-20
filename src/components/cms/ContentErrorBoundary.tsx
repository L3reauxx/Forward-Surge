import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ContentErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CMS Content Rendering Error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="my-12 p-8 rounded-3xl bg-amber-50/80 border border-amber-200/80 text-center max-w-2xl mx-auto shadow-sm">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-display font-extrabold text-slate-900 mb-2">
            {this.props.fallbackTitle || 'Unable to load content'}
          </h3>
          <p className="text-sm text-slate-600 font-medium mb-6">
            {this.props.fallbackMessage ||
              'We encountered an issue connecting to the content server or displaying this section. Our fallback content service is active.'}
          </p>
          <button
            onClick={this.handleRetry}
            className="inline-flex items-center px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-2" />
            Retry Section
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
