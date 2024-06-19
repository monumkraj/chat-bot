import React from 'react';

const SettingsPanel = ({ selectedNode, setNodes }) => {
  const updateNodeLabel = (e) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          node.data = { label: e.target.value };
        }
        return node;
      })
    );
  };

  return (
    <div style={{ width: 200, background: 'red', padding: 10 }}>
      <h3>Settings Panel</h3>
      <input
        type="text"
        value={selectedNode.data.label}
        onChange={updateNodeLabel}
      />
    </div>
  );
};

export default SettingsPanel;
