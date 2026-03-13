import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  errorStr: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorStr: ""
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorStr: error.toString() + "\n" + error.stack };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-900/20 border border-red-500/50 rounded-xl text-red-200 w-full z-50 relative overflow-auto shadow-[0_0_30px_rgba(239,68,68,0.2)]">
          <h2 className="text-xl font-bold mb-4">Boundary Crash Caught</h2>
          <pre className="text-xs font-mono whitespace-pre-wrap">{this.state.errorStr}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
