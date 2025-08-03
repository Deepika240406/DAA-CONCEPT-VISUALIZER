import React, { useState } from "react";
import "./FloydWarshallVisualizer.css";

const INF = "∞";

// Initial graph
const initialGraph = [
  [0, 3, INF, 5],
  [2, 0, INF, 4],
  [INF, 1, 0, INF],
  [INF, INF, 2, 0]
];

const FloydWarshallVisualizer = () => {
  const [matrix, setMatrix] = useState(initialGraph.map(row => [...row]));
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [updatedCells, setUpdatedCells] = useState([]);
  const [editMode, setEditMode] = useState(false); // To toggle edit mode
  const [editCell, setEditCell] = useState(null); // Store the cell to edit
  const [editValue, setEditValue] = useState(""); // Input value for the cell

  const algorithmStepsText = [
    "Initialize the matrix.",
    "Pick an intermediate node (k).",
    "For each starting node (i), iterate through all end nodes (j).",
    "If the path i → k → j is shorter, update the matrix.",
    "Repeat until all nodes are processed."
  ];

  // Handle cell click for editing
  const handleCellClick = (i, j) => {
    if (editMode) {
      setEditCell([i, j]);
      setEditValue(matrix[i][j] === INF ? "" : matrix[i][j]);
    }
  };

  // Handle value input change
  const handleInputChange = (e) => {
    setEditValue(e.target.value);
  };

  // Handle submit of the new value in the cell
  const handleSubmitValue = () => {
    if (editCell) {
      const [i, j] = editCell;
      let newValue = editValue === "" ? INF : parseInt(editValue, 10);
      if (isNaN(newValue)) newValue = INF; // In case of invalid input
      const newMatrix = matrix.map((row, rowIndex) =>
        rowIndex === i
          ? row.map((cell, colIndex) => (colIndex === j ? newValue : cell))
          : row
      );
      setMatrix(newMatrix);
      setEditMode(false); // Turn off edit mode after submitting the change
      setEditCell(null); // Clear the edit cell
      setEditValue(""); // Reset input value
      runAlgorithm(newMatrix); // Re-run the algorithm with the updated matrix
    }
  };

  const runAlgorithm = async (updatedMatrix) => {
    setRunning(true);
    let dist = updatedMatrix.map(row => [...row]);
    let stepLogs = [];

    for (let k = 0; k < dist.length; k++) {
      for (let i = 0; i < dist.length; i++) {
        for (let j = 0; j < dist.length; j++) {
          if (dist[i][k] !== INF && dist[k][j] !== INF && dist[i][j] > dist[i][k] + dist[k][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
            setUpdatedCells([[i, j]]); // Track updated cells
          }

          stepLogs.push(`Step: k=${k}, i=${i}, j=${j} → Matrix Updated`);

          // Set steps log and update the current step
          setSteps(prevSteps => [...prevSteps, stepLogs[stepLogs.length - 1]]);
          setCurrentStep(prevStep => prevStep + 1);

          // Update matrix state for visualization after each step
          setMatrix(prevMatrix => {
            const newMatrix = prevMatrix.map((row, rowIndex) =>
              rowIndex === i
                ? row.map((cell, colIndex) => (colIndex === j ? dist[i][j] : cell))
                : row
            );
            return newMatrix;
          });

          await new Promise(resolve => setTimeout(resolve, 500)); // Delay to show intermediate steps
        }
      }
    }

    setRunning(false); // Finish running
  };

  return (
    <div className="floyd-container">
      <h2>Floyd-Warshall Algorithm Visualizer</h2>
      <div className="main-content">
        
        {/* Left: Algorithm Steps */}
        <div className="algorithm-container">
          <h3>Algorithm Steps</h3>
          <ol className="algorithm-steps">
            {algorithmStepsText.map((step, index) => (
              <li key={index} className={currentStep >= index ? "highlight-step" : ""}>
                {step}
              </li>
            ))}
          </ol>
          <h4>Step Execution</h4>
          <ol className="steps-progress">
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Right: Matrix */}
        <div className="graph-container">
          <h3>Graph Representation</h3>
          <div className="matrix">
            {matrix.map((row, i) =>
              row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`matrix-cell ${updatedCells.some(([x, y]) => x === i && y === j) ? "updated-cell" : ""}`}
                  onClick={() => handleCellClick(i, j)}
                >
                  {cell === INF ? "∞" : cell}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Edit Mode Input */}
      {editMode && (
        <div className="edit-cell-container">
          <input
            type="text"
            value={editValue}
            onChange={handleInputChange}
            placeholder="Enter new weight"
          />
          <button onClick={handleSubmitValue}>Update Value</button>
        </div>
      )}

      {/* Controls */}
      <div className="controls">
        <button onClick={() => setEditMode(!editMode)} disabled={running}>
          {editMode ? "Cancel Edit" : "Edit Graph"}
        </button>
        <button onClick={() => runAlgorithm(matrix)} disabled={running}>Run Algorithm</button>
      </div>

      {/* Complexity Info */}
      <div className="complexity-info">
        <h3>Time Complexity: O(n³)</h3>
        <p>Since there are three nested loops iterating over all nodes, the time complexity is cubic.</p>
      </div>
    </div>
  );
};

export default FloydWarshallVisualizer;
