import React, { useState } from "react";
import "./LinkedListVisualizer.css";

// Linked List Node
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Linked List Class
class LinkedList {
  constructor() {
    this.head = null;
  }

  // Insert at the beginning
  insertAtBeginning(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
  }

  // Insert at the end
  insertAtEnd(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  // Delete a node by value
  deleteNode(value) {
    if (!this.head) return;
    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }
    if (current.next) {
      current.next = current.next.next;
    }
  }

  // Traverse the linked list
  traverse() {
    const nodes = [];
    let current = this.head;
    while (current) {
      nodes.push(current.value);
      current = current.next;
    }
    return nodes;
  }
}

const LinkedListVisualizer = () => {
  const [linkedList] = useState(new LinkedList());
  const [currentStep, setCurrentStep] = useState(0);
  const [algorithmSteps, setAlgorithmSteps] = useState([]);
  const [listValues, setListValues] = useState(linkedList.traverse());
  const [running, setRunning] = useState(false);

  const algorithmCode = [
    "1. Insert a node at the beginning.",
    "2. Insert a node at the end.",
    "3. Delete a node.",
    "4. Traverse the list and print all nodes."
  ];

  const handleInsertAtBeginning = async () => {
    setRunning(true);
    const value = Math.floor(Math.random() * 100); // Random value for the node
    linkedList.insertAtBeginning(value);
    setListValues(linkedList.traverse());
    setAlgorithmSteps([...algorithmSteps, `Step ${algorithmSteps.length + 1}: Inserted node ${value} at the beginning.`]);
    setCurrentStep(algorithmSteps.length);
    await new Promise(resolve => setTimeout(resolve, 700));
    setRunning(false);
  };

  const handleInsertAtEnd = async () => {
    setRunning(true);
    const value = Math.floor(Math.random() * 100); // Random value for the node
    linkedList.insertAtEnd(value);
    setListValues(linkedList.traverse());
    setAlgorithmSteps([...algorithmSteps, `Step ${algorithmSteps.length + 1}: Inserted node ${value} at the end.`]);
    setCurrentStep(algorithmSteps.length);
    await new Promise(resolve => setTimeout(resolve, 700));
    setRunning(false);
  };

  const handleDeleteNode = async () => {
    setRunning(true);
    const value = listValues[Math.floor(Math.random() * listValues.length)]; // Randomly delete a node
    linkedList.deleteNode(value);
    setListValues(linkedList.traverse());
    setAlgorithmSteps([...algorithmSteps, `Step ${algorithmSteps.length + 1}: Deleted node ${value}.`]);
    setCurrentStep(algorithmSteps.length);
    await new Promise(resolve => setTimeout(resolve, 700));
    setRunning(false);
  };

  const handleTraverse = async () => {
    setRunning(true);
    const nodes = linkedList.traverse();
    setListValues(nodes);
    setAlgorithmSteps([...algorithmSteps, `Step ${algorithmSteps.length + 1}: Traversed the list: ${nodes.join(' -> ')}.`]);
    setCurrentStep(algorithmSteps.length);
    await new Promise(resolve => setTimeout(resolve, 700));
    setRunning(false);
  };

  return (
    <div className="linked-list-container">
      <h2>Linked List Visualizer</h2>
      <div className="main-content">
        <div className="algorithm-container">
          <h3>Linked List Algorithm Steps</h3>
          <ol className="algorithm-steps">
            {algorithmCode.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <h4>Steps Progress</h4>
          <ol className="steps-progress">
            {algorithmSteps.slice(0, currentStep + 1).map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="list-container">
          <h3>Linked List Visualization</h3>
          <div className="linked-list">
            {listValues.map((value, index) => (
              <span key={index} className="node">
                {value}
                {index < listValues.length - 1 && " → "}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="controls">
        <button onClick={handleInsertAtBeginning} disabled={running}>
          Insert at Beginning
        </button>
        <button onClick={handleInsertAtEnd} disabled={running}>
          Insert at End
        </button>
        <button onClick={handleDeleteNode} disabled={running}>
          Delete Node
        </button>
        <button onClick={handleTraverse} disabled={running}>
          Traverse List
        </button>
      </div>

      <div className="complexity-info">
        <h3>Time Complexity</h3>
        <p>Insertion at the beginning: O(1)</p>
        <p>Insertion at the end: O(n)</p>
        <p>Deletion: O(n)</p>
        <p>Traversal: O(n)</p>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
