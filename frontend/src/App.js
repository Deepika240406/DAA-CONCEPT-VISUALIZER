import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";  // HomePage is outside components/
import QuickSortVisualizer from "./components/QuickSortVisualizer";
import FloydWarshallVisualizer from "./components/FloydWarshallVisualizer";
import BSTVisualizer from "./components/BSTVisualizer";
import LinkedListVisualizer from "./components/LinkedListVisualizer";
import MaximumSubarrayVisualizer from "./components/MaximumSubarrayVisualizer";
import LCSVisualizer from "./components/LCSVisualizer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quick-sort" element={<QuickSortVisualizer />} />
        <Route path="/floyd-warshall" element={<FloydWarshallVisualizer />} />
        <Route path="/binary-search-tree" element={<BSTVisualizer />} />
        <Route path="/linked-list" element={<LinkedListVisualizer />} />
        <Route path="/maximum-subarray" element={<MaximumSubarrayVisualizer />} />
        <Route path="/lcs" element={<LCSVisualizer />} />
      </Routes>
    </Router>
  );
}

export default App;
