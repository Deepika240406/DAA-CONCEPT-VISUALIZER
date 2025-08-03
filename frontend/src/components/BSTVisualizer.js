import React, { useState } from "react";
import { motion } from "framer-motion";
import "./BSTVisualizer.css";

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const BSTVisualizer = () => {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const insertNode = (node, value) => {
    if (!node) return new TreeNode(value);
    if (value < node.value) node.left = insertNode(node.left, value);
    else if (value > node.value) node.right = insertNode(node.right, value);
    return node;
  };

  const deleteNode = (node, value) => {
    if (!node) return node;
    if (value < node.value) node.left = deleteNode(node.left, value);
    else if (value > node.value) node.right = deleteNode(node.right, value);
    else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      let minNode = node.right;
      while (minNode.left) minNode = minNode.left;
      node.value = minNode.value;
      node.right = deleteNode(node.right, minNode.value);
    }
    return node;
  };

  const handleInsert = () => {
    if (!inputValue) return;
    setRoot((prevRoot) => insertNode(prevRoot, parseInt(inputValue)));
    setInputValue("");
  };

  const handleDelete = () => {
    if (!inputValue) return;
    setRoot((prevRoot) => deleteNode(prevRoot, parseInt(inputValue)));
    setInputValue("");
  };

  const renderTree = (node) => {
    if (!node) return null;
    return (
      <div className="tree-node">
        <motion.div className="node" layout>{node.value}</motion.div>
        <div className="children">
          <div className="left">{renderTree(node.left)}</div>
          <div className="right">{renderTree(node.right)}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="algorithm-container">
        <h3>Binary Search Tree Algorithm</h3>
        <pre>
          {`class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function insert(root, value) {
  if (!root) return new TreeNode(value);
  if (value < root.value) root.left = insert(root.left, value);
  else root.right = insert(root.right, value);
  return root;
}

function delete(root, value) {
  if (!root) return root;
  if (value < root.value) root.left = delete(root.left, value);
  else if (value > root.value) root.right = delete(root.right, value);
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    let minNode = root.right;
    while (minNode.left) minNode = minNode.left;
    root.value = minNode.value;
    root.right = delete(root.right, minNode.value);
  }
  return root;
}`}
        </pre>
      </div>

      <div className="visualization-container">
        <h2>BST Visualizer</h2>
        <div className="tree-container">{renderTree(root)}</div>
        <div className="input-container">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
          />
          <button onClick={handleInsert}>Insert</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>

      <div className="complexity-container">
        <h3>Time Complexity of BST</h3>
        <ul>
          <li><strong>Best Case:</strong> O(log n) (Balanced Tree)</li>
          <li><strong>Average Case:</strong> O(log n) (Random Insertions)</li>
          <li><strong>Worst Case:</strong> O(n) (Skewed Tree)</li>
        </ul>
        <h3>Explanation:</h3>
        <p>
          A Binary Search Tree (BST) is a hierarchical data structure where each node has at most two children.
          The left subtree contains values smaller than the node, while the right subtree contains values larger.
          Insertion and deletion depend on the structure of the tree, leading to different time complexities.
        </p>
      </div>
    </div>
  );
};

export default BSTVisualizer;