import React from 'react';

interface LocalState {
    hasError: boolean
    errorText?: string
}

export default class ErrorBoundary
    extends React.Component<{}, LocalState> {

    constructor(props : any) {
        super(props);

        this.state = { 
            hasError: false 
        };
    }

    static getDerivedStateFromError(error : Error) {
        // Update state so the next render will show the fallback UI.
        console.log('Derived state from error', error);
        return { 
            hasError: true,
            errorText: 'An error has ocurred, please refresh!'
        };
    }
    
    componentDidCatch(error : Error, errorInfo : React.ErrorInfo) {
        console.log('componentDidCatch', errorInfo);
        // You can also log the error to an error reporting service
        console.error(error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
          // You can render any custom fallback UI
            console.log('Rendering fallback UI');
            return <div className="errorBoundary"><h2>{this.state.errorText}</h2></div>;
        }
    
        return this.props.children; 
    }
}