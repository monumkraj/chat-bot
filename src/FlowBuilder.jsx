import React, { useState } from 'react';
import ReactFlow, { addEdge, MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import CustomTextNode from './CustomTextNode';


const initialNodes = [
  {
    id: '1',
    type: 'textNode',
    data: { label: 'Hello' },
    position: { x: 250, y: 5 },
  },
];

const initialEdges = [];

const FlowBuilder = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const removeNode = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    setSelectedNode(null);
  };

  const nodeTypes = {
    textNode: (props) => <CustomTextNode {...props} removeNode={removeNode} />,
  };

  const onNodesChange = (changes) =>
    setNodes((nds) =>
      nds.map((node) => {
        const change = changes.find((c) => c.id === node.id);
        return change ? { ...node, ...change } : node;
      })
    );

  const onEdgesChange = (changes) => setEdges((eds) => addEdge(changes, eds));

  const onNodeSelect = (event, node) => setSelectedNode(node);

  const handleSave = () => {
    const emptyTargetNodes = nodes.filter(
      (node) => !edges.some((edge) => edge.target === node.id)
    );

    if (nodes.length > 1 && emptyTargetNodes.length > 1) {
      alert('Error: More than one node has empty target handles.');
    } else {
      alert('Flow saved successfully!');
    }
  };

  return (
    <div className="main-content">
      <div className="nodes-panel">
        <NodesPanel setNodes={setNodes} />
      </div>
      <div className="flow-builder">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeSelect}
          fitView
          nodeTypes={nodeTypes}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
        <button className="save-button" onClick={handleSave}>
          Save Flow
        </button>
      </div>
      {selectedNode && (
        <div className="settings-panel">
          <SettingsPanel selectedNode={selectedNode} setNodes={setNodes} />
        </div>
      )}
    </div>
  );
};

export default FlowBuilder;
