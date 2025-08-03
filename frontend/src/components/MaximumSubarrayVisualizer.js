import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./MaxSubarraySumVisualizer.css"; // Make sure this file is named correctly

const maxSubArrayAlgorithm = [
  "function maxSubArraySum(arr) {",
  "  let maxSoFar = arr[0];",
  "  let maxEndingHere = arr[0];",
  "  for (let i = 1; i < arr.length; i++) {",
  "    maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);",
  "    maxSoFar = Math.max(maxSoFar, maxEndingHere);",
  "  }",
  "  return maxSoFar;",
  "}"
];

const MaxSubArraySumVisualizer = () => {
  const [arr, setArr] = useState([1, -2, 3, 4, -1, 2, 1, -5, 4]);
  const [maxSum, setMaxSum] = useState(null);
  const [currentLine, setCurrentLine] = useState(-1);
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const [isComputing, setIsComputing] = useState(false);

  useEffect(() => {
    setMaxSum(null);
  }, [arr]);

  const calculateMaxSubArraySum = async () => {
    setIsComputing(true);
    let maxSoFar = arr[0];
    let maxEndingHere = arr[0];
    setHighlightedIndices([0]);

    for (let i = 1; i < arr.length; i++) {
      setCurrentLine(5);
      setHighlightedIndices([i]);
      await new Promise((resolve) => setTimeout(resolve, 500));

      maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
      setCurrentLine(7);
      setMaxSum(Math.max(maxSoFar, maxEndingHere));
      await new Promise((resolve) => setTimeout(resolve, 500));

      maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }

    setIsComputing(false);
  };

  const startComputation = async () => {
    setMaxSum(null);
    await calculateMaxSubArraySum();
  };

  return (
    <div className="container">
      <div className="visualization-container">
        <div className="algorithm-container">
          <h3 className="algorithm-title">Max Subarray Sum (Kadane's Algorithm)</h3>
          <pre>
            {maxSubArrayAlgorithm.map((line, index) => (
              <motion.p
                key={index}
                className={index === currentLine ? "highlight" : ""}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {line}
              </motion.p>
            ))}
          </pre>
        </div>

        <div className="array-container">
          <h3>Array: {arr.join(", ")}</h3>
          <motion.div className="bar-container">
            {arr.map((value, index) => (
              <motion.div
                key={index}
                className={`bar ${highlightedIndices.includes(index) ? "highlight-bar" : ""}`}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                style={{
                  height: `${Math.abs(value) * 20}px`, // Adjust height of the bar
                  backgroundColor: value < 0 ? "red" : "green",
                }}
              >
                {value}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="button-container">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={startComputation}
          disabled={isComputing}
        >
          Start Computing Max Sum
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setArr(arr.map((_) => Math.floor(Math.random() * 10) - 5))}
          disabled={isComputing}
        >
          Generate New Array
        </motion.button>
      </div>

      {maxSum !== null && (
        <div className="result-container">
          <h3>Maximum Subarray Sum:</h3>
          <p>{maxSum}</p>
        </div>
      )}

      <div className="complexity-container">
        <h3>Time Complexity of Kadane's Algorithm</h3>
        <ul>
          <li><strong>Time Complexity:</strong> O(n) where n is the size of the array.</li>
          <li><strong>Space Complexity:</strong> O(1), since only a few variables are used.</li>
        </ul>

        <h3>Explanation:</h3>
        <p>
          Kadane's algorithm solves the maximum subarray sum problem in linear time. It keeps track of the maximum sum found so far
          and the current sum at each point. If the current sum becomes negative, it's reset to 0 and the process continues.
        </p>
      </div>
    </div>
  );
};

export default MaxSubArraySumVisualizer;
