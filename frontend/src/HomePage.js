import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

// Import images
import quicksortImg from './images/quicksort.png';
import floydwarshallImg from './images/floydwarshall.png';
import bstImg from './images/bst.png';
import linkedlistImg from './images/linkedlist.png';
import maximumsubarrayImg from './images/maximumsubarray.png';
import lcsImg from './images/lcs.png';

const HomePage = () => {
  return (
    <div className="home-container">

      <h1>Welcome to the DAA Concept Visualizer</h1>
      <p>Select an algorithm to start visualizing its working:</p>
     

      <div className="visualizer-grid">
        <div className="visualizer-item">
          <div className="visualizer-card">
            <img src={quicksortImg} alt="QuickSort" className="algorithm-image" />
            <h2>QuickSort Visualizer</h2>
            <p>Visualize the QuickSort sorting algorithm.</p>
            <Link to="/quick-sort" className="start-button">Start</Link>
          </div>
        </div>

        <div className="visualizer-item">
          <div className="visualizer-card">
            <img src={floydwarshallImg} alt="Floyd Warshall" className="algorithm-image" />
            <h2>Floyd Warshall Visualizer</h2>
            <p>Visualize the Floyd Warshall shortest path algorithm.</p>
            <Link to="/floyd-warshall" className="start-button">Start</Link>
          </div>
        </div>

        <div className="visualizer-item">
          <div className="visualizer-card">
            <img src={bstImg} alt="Binary Search Tree" className="algorithm-image" />
            <h2>Binary Search Tree (BST) Visualizer</h2>
            <p>Visualize BST insertion and traversal.</p>
            <Link to="/binary-search-tree" className="start-button">Start</Link>
          </div>
        </div>

        <div className="visualizer-item">
          <div className="visualizer-card">
            <img src={linkedlistImg} alt="Linked List" className="algorithm-image" />
            <h2>Linked List Visualizer</h2>
            <p>Visualize linked list operations (insert, delete, traverse).</p>
            <Link to="/linked-list" className="start-button">Start</Link>
          </div>
        </div>

        <div className="visualizer-item">
          <div className="visualizer-card">
            <img src={maximumsubarrayImg} alt="Maximum Subarray Sum" className="algorithm-image" />
            <h2>Maximum Subarray Sum</h2>
            <p>Visualize Kadane’s algorithm for max subarray sum.</p>
            <Link to="/maximum-subarray" className="start-button">Start</Link>
          </div>
        </div>

        <div className="visualizer-item">
          <div className="visualizer-card">
            <img src={lcsImg} alt="Longest Common Subsequence" className="algorithm-image" />
            <h2>Longest Common Subsequence</h2>
            <p>Visualize the LCS algorithm for string comparison.</p>
            <Link to="/lcs" className="start-button">Start</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
