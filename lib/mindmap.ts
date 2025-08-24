export type MindNode = { id: string; label: string }
export type MindEdge = { id: string; source: string; target: string }
export type MindMap = { nodes: MindNode[]; edges: MindEdge[] }

export function buildMindmap(text: string): MindMap {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 12)

  const nodes: MindNode[] = []
  const edges: MindEdge[] = []
  const rootId = 'root'
  nodes.push({ id: rootId, label: sentences[0]?.slice(0, 60) || 'Explanation' })

  sentences.forEach((s, i) => {
    const id = `n${i + 1}`
    nodes.push({ id, label: s.slice(0, 60) })
    edges.push({ id: `e${i + 1}`, source: rootId, target: id })
  })
  return { nodes, edges }
}
