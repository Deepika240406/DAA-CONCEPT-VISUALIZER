import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./QuickSortVisualizer.css";

const quickSortAlgorithm = [
  "function quickSort(arr, low, high) {",
  "  if (low < high) {",
  "    let pivotIndex = partition(arr, low, high);",
  "    quickSort(arr, low, pivotIndex - 1);",
  "    quickSort(arr, pivotIndex + 1, high);",
  "  }",
  "}",
  "",
  "function partition(arr, low, high) {",
  "  let pivot = arr[high];",
  "  let i = low - 1;",
  "  for (let j = low; j < high; j++) {",
  "    if (arr[j] < pivot) {",
  "      i++;",
  "      swap(arr, i, j);",
  "    }",
  "  }",
  "  swap(arr, i + 1, high);",
  "  return i + 1;",
  "}"
];

const QuickSortVisualizer = () => {
  const [data, setData] = useState([]);
  const [currentLine, setCurrentLine] = useState(-1);
  const [isSorting, setIsSorting] = useState(false);
  const [highlightedBars, setHighlightedBars] = useState([]);
  const [userCode, setUserCode] = useState("");
  const [outputMessage, setOutputMessage] = useState("");

  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    const arr = Array.from({ length: 10 }, () => ({
      value: Math.floor(Math.random() * 100),
    }));
    setData(arr);
    setIsSorting(false);
    setCurrentLine(-1);
    setHighlightedBars([]);
  };

  const quickSort = async (arr, low = 0, high = arr.length - 1) => {
    if (low < high) {
      setCurrentLine(1);
      await delay();

      const pi = await partition(arr, low, high);

      setCurrentLine(3);
      await quickSort(arr, low, pi - 1);

      setCurrentLine(4);
      await quickSort(arr, pi + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    setCurrentLine(7);
    const pivot = arr[high].value;
    let i = low - 1;

    for (let j = low; j < high; j++) {
      setCurrentLine(10);
      setHighlightedBars([j, high]);
      await delay();

      if (arr[j].value < pivot) {
        i++;
        setCurrentLine(12);
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setData([...arr]);
        await delay();
      }
    }

    setCurrentLine(15);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setData([...arr]);
    await delay();

    return i + 1;
  };

  const delay = (ms = 500) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const startSorting = async () => {
    setIsSorting(true);
    const arrCopy = [...data];
    await quickSort(arrCopy);

    // ✅ Final sort layout update (for visual clarity)
    arrCopy.sort((a, b) => a.value - b.value);
    setData([...arrCopy]);
    setCurrentLine(-1);
    setHighlightedBars(arrCopy.map((_, i) => i));
    setTimeout(() => setHighlightedBars([]), 1000);
    setIsSorting(false);
  };

  const validateUserCode = () => {
    try {
      // eslint-disable-next-line no-new-func
      const userFunction = new Function("nums", userCode + "; return sortArray(nums);");
      const test1 = JSON.stringify(userFunction([5, 2, 3, 1])) === JSON.stringify([1, 2, 3, 5]);
      const test2 = JSON.stringify(userFunction([5, 1, 1, 2, 0, 0])) === JSON.stringify([0, 0, 1, 1, 2, 5]);

      if (test1 && test2) {
        setOutputMessage("✅ Correct! Your QuickSort function works.");
      } else {
        setOutputMessage("❌ Incorrect! Try again.");
      }
    } catch (err) {
      setOutputMessage("❌ Error in your code! Check for syntax errors.");
    }
  };

  return (
    <div className="container">
      <div className="algorithm-container">
        <h3>QuickSort Algorithm</h3>
        <pre>
          {quickSortAlgorithm.map((line, index) => (
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
        <h2>Quick Sort Visualizer</h2>
        <motion.div layout className="bar-container">
          {data.map((bar, index) => (
            <motion.div
              key={index}
              layout
              className={`bar ${highlightedBars.includes(index) ? "highlight-bar" : ""}`}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              style={{ height: `${bar.value * 3}px` }}
            >
              {bar.value}
            </motion.div>
          ))}
        </motion.div>

        <div className="button-container">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={startSorting} disabled={isSorting}>
            Start Sorting
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={generateRandomArray} disabled={isSorting}>
            Generate New Array
          </motion.button>
        </div>
      </div>

      <div className="leetcode-container">
        <h3>📝 LeetCode-Style Question</h3>
        <p><strong>Sort an Array (QuickSort Implementation)</strong></p>
        <p>Implement the QuickSort algorithm to sort an array in ascending order.</p>
        <pre>
          Input: sortArray([5, 2, 3, 1]){`\n`}
          Output: [1, 2, 3, 5]
        </pre>
        <textarea
          rows="6"
          placeholder="Write your QuickSort function here..."
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
        ></textarea>
        <button onClick={validateUserCode}>Submit Code</button>
        <p>{outputMessage}</p>

        <h3>⏳ Time Complexity Analysis</h3>
        <table>
          <tr><th>Case</th><th>Time Complexity</th></tr>
          <tr><td>Best Case</td><td>O(n log n)</td></tr>
          <tr><td>Average Case</td><td>O(n log n)</td></tr>
          <tr><td>Worst Case</td><td>O(n²)</td></tr>
        </table>
        <p>QuickSort performs well on average, but choosing a bad pivot can degrade performance to O(n²).</p>
      </div>
    </div>
  );
};

export default QuickSortVisualizer;
