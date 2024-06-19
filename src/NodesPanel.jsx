import React from 'react';

const NodesPanel = ({ setNodes }) => {
  const addNode = () => {
    setNodes((nds) => [
      ...nds,
      {
        id: `${nds.length + 1}`,
        type: 'textNode',
        data: { label: 'New Node' },
        position: { x: Math.random() * 500, y: Math.random() * 500 },
      },
    ]);
  };

  return (
    <div style={{ width: 200, background: '#f3f3f3', padding: 10 }}>
      <h3>Nodes Panel</h3>
      <button onClick={addNode}>Add Text Node</button>
    </div>
  );
};

export default NodesPanel;
