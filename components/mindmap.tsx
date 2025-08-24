'use client'
import React, { useMemo } from 'react'
import ReactFlow, { Background, Controls, MiniMap, Node, Edge, Position } from 'reactflow'
import 'reactflow/dist/style.css'

export default function Mindmap({ data }: { data: { nodes: { id: string; label: string }[]; edges: { id: string; source: string; target: string }[] } }) {
  const nodes = useMemo<Node[]>(() => data.nodes.map((n, i) => ({
    id: n.id,
    data: { label: n.label },
    position: { x: (i % 3) * 220 + 40, y: Math.floor(i / 3) * 120 + 40 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    style: {
      borderRadius: 12,
      padding: 10,
      background: 'rgba(255,255,255,0.75)',
      backdropFilter: 'blur(6px)',
      border: '1px solid rgba(255,255,255,0.6)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
    }
  })), [data])

  const edges = useMemo<Edge[]>(() => data.edges.map((e) => ({ id: e.id, source: e.source, target: e.target, animated: false })), [data])

  return (
    <ReactFlow nodes={nodes} edges={edges} fitView>
      <Background />
      <MiniMap pannable zoomable />
      <Controls position="top-left" />
    </ReactFlow>
  )
}
