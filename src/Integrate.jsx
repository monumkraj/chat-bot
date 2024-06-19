import React, { useState } from 'react';
import ReactFlow, { addEdge, MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import CustomTextNode from './CustomTextNode';

const nodeTypes = {
  textNode: CustomTextNode,
};

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

  const onNodesChange = (changes) => setNodes((nds) => nds.map((node) => {
    const change = changes.find((c) => c.id === node.id);
    return change ? { ...node, ...change } : node;
  }));

  const onEdgesChange = (changes) => setEdges((eds) => addEdge(changes, eds));

  const onNodeSelect = (event, node) => setSelectedNode(node);

  return (
    <div style={{ display: 'flex' }}>
      <NodesPanel setNodes={setNodes} />
      <div style={{ height: 800, width: '100%' }}>
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
      </div>
      {selectedNode && (
        <SettingsPanel selectedNode={selectedNode} setNodes={setNodes} />
      )}
    </div>
  );
};

export default FlowBuilder;
