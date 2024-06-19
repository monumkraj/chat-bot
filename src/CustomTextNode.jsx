import React from 'react';
import { Handle } from 'reactflow';

const CustomTextNode = ({ id, data, removeNode }) => {
  return (
    <div style={{ padding: 10, border: '1px solid #777', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 5, right: 5, cursor: 'pointer' }} onClick={() => removeNode(id)}>
        &#10005; {/* This is the cross (×) icon */}
      </div>
      {data.label}
      <Handle type="source" position="right" id="a" style={{ background: '#555' }} />
      <Handle type="target" position="left" id="b" style={{ background: '#555' }} />
    </div>
  );
};

export default CustomTextNode;
