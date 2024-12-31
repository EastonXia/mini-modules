import React from 'react';
import ReactDOM from "react-dom/client";
import DocsPage from './docs';

const App = () => {
  return (
    <div>
      <DocsPage></DocsPage> 
    </div>
  )
}

const root = document.getElementById('root')
ReactDOM.createRoot(root).render(<App />)