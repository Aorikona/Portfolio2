"use client";

import React from "react";
import { AvatarFallback } from "./AvatarFallback";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export class SplineErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("Spline runtime error:", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <AvatarFallback />;
    }
    return this.props.children;
  }
}

export default SplineErrorBoundary;
