import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import "./LCSVisualizer.css";

const lcsAlgorithm = [
  "function longestCommonSubsequence(str1, str2) {",
  "  const m = str1.length;",
  "  const n = str2.length;",
  "  let dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));",
  "  for (let i = 1; i <= m; i++) {",
  "    for (let j = 1; j <= n; j++) {",
  "      if (str1[i - 1] === str2[j - 1]) {",
  "        dp[i][j] = dp[i - 1][j - 1] + 1;",
  "      } else {",
  "        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);",
  "      }",
  "    }",
  "  }",
  "  return dp[m][n];",
  "}",
  "",
  "function backtrack(dp, str1, str2, i, j) {",
  "  let lcs = '';",
  "  while (i > 0 && j > 0) {",
  "    if (str1[i - 1] === str2[j - 1]) {",
  "      lcs = str1[i - 1] + lcs;",
  "      i--; j--;",
  "    } else if (dp[i - 1][j] > dp[i][j - 1]) {",
  "      i--;",
  "    } else {",
  "      j--;",
  "    }",
  "  }",
  "  return lcs;",
  "}"
];

const LCSVisualizer = () => {
  const [str1, setStr1] = useState("AGGTAB");
  const [str2, setStr2] = useState("GXTXAYB");
  const [dpMatrix, setDpMatrix] = useState([]);
  const [currentLine, setCurrentLine] = useState(-1);
  const [isComputing, setIsComputing] = useState(false);
  const [highlightedCells, setHighlightedCells] = useState([]);
  const [lcsResult, setLcsResult] = useState("");

  const generateDpMatrix = useCallback(() => {
    const m = str1.length;
    const n = str2.length;
    let dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    setDpMatrix(dp);
  }, [str1, str2]);

  useEffect(() => {
    generateDpMatrix();
  }, [generateDpMatrix]);

  const calculateLCS = async () => {
    const m = str1.length;
    const n = str2.length;
    let dp = [...dpMatrix];
    setDpMatrix(dp);

    for (let i = 1; i <= m; i++) {
      setCurrentLine(4);
      for (let j = 1; j <= n; j++) {
        setCurrentLine(7);
        setHighlightedCells([i, j]);
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }

        setDpMatrix([...dp]);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    const result = backtrack(dp, str1, str2, m, n);
    setLcsResult(result);
    setIsComputing(false);
  };

  const backtrack = (dp, str1, str2, i, j) => {
    let lcs = '';
    while (i > 0 && j > 0) {
      if (str1[i - 1] === str2[j - 1]) {
        lcs = str1[i - 1] + lcs;
        i--; j--;
      } else if (dp[i - 1][j] > dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
    return lcs;
  };

  const startComputation = async () => {
    setIsComputing(true);
    setLcsResult("");
    await calculateLCS();
  };

  return (
    <div className="container">
      <div className="algorithm-container">
        <h3 className="algorithm-title">LCS Algorithm</h3>
        <pre>
          {lcsAlgorithm.map((line, index) => (
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

      <div className="visualization-container">
        <h2 className="visualizer-title">LCS Visualizer</h2>
        <div className="strings-container">
          <div className="string-display">
            <h3>String 1: {str1}</h3>
          </div>
          <div className="string-display">
            <h3>String 2: {str2}</h3>
          </div>
        </div>

        <motion.div layout className="matrix-container">
          {dpMatrix.map((row, i) => (
            <motion.div key={i} className="matrix-row">
              {row.map((cell, j) => (
                <motion.div
                  key={j}
                  className={`matrix-cell ${highlightedCells[0] === i && highlightedCells[1] === j ? "highlight-cell" : ""}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  {cell}
                </motion.div>
              ))}
            </motion.div>
          ))}
        </motion.div>

        <div className="button-container">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={startComputation}
            disabled={isComputing}
          >
            Start Computing LCS
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setStr1("");
              setStr2("");
              setLcsResult("");
            }}
            disabled={isComputing}
          >
            Reset
          </motion.button>
        </div>

        <div className="lcs-result-container">
          <h3>Longest Common Subsequence:</h3>
          <p>{lcsResult}</p>
        </div>
      </div>

      <div className="complexity-container">
        <h3>Time Complexity of LCS</h3>
        <ul>
          <li><strong>Time Complexity:</strong> O(m * n) where m and n are the lengths of the two input strings.</li>
          <li><strong>Space Complexity:</strong> O(m * n) due to the dynamic programming table.</li>
        </ul>

        <h3>Explanation:</h3>
        <p>
          The LCS problem is solved using dynamic programming. A matrix is created where each cell
          represents the length of the longest common subsequence between the substrings of the two input strings.
        </p>
      </div>
    </div>
  );
};

export default LCSVisualizer;
