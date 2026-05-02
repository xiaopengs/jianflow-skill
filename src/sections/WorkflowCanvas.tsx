import { Github, Brain, ShieldCheck, Film, Play, RotateCcw } from 'lucide-react';
import type { WorkflowNode, NodeId, NodeStatus } from '@/types';

const iconMap = {
  'gh-crawl': Github,
  'llm-analyze': Brain,
  'viral-check': ShieldCheck,
  'video-gen': Film,
};

const statusColor: Record<NodeStatus, string> = {
  idle: '#333',
  running: '#00D2FF',
  success: '#00E676',
  failed: '#FF4D4F',
};

interface WorkflowCanvasProps {
  nodes: WorkflowNode[];
  selectedNode: NodeId;
  onSelectNode: (id: NodeId) => void;
  onRunNode: (id: NodeId) => void;
  isRunning: boolean;
}

export default function WorkflowCanvas({ nodes, selectedNode, onSelectNode, onRunNode, isRunning }: WorkflowCanvasProps) {
  return (
    <div className="w-[320px] bg-[#0a0a0a] border-r border-[#222] flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b border-[#222]">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider">工作流节点</h2>
        <p className="text-[10px] text-[#8A8B90] mt-1">4 个节点 · 串联执行</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {nodes.map((node, index) => {
          const Icon = iconMap[node.id];
          const isSelected = selectedNode === node.id;
          const color = statusColor[node.status];

          return (
            <div key={node.id}>
              {/* Connector line (except first) */}
              {index > 0 && (
                <div className="flex justify-center mb-1">
                  <div className="w-px h-4 border-l border-dashed" style={{ borderColor: color }} />
                </div>
              )}

              <div
                onClick={() => onSelectNode(node.id)}
                className={`relative rounded cursor-pointer transition-all duration-150 group ${
                  isSelected ? 'bg-[#161616] ring-1 ring-[#333]' : 'bg-[#111] hover:bg-[#161616]'
                }`}
              >
                {/* Left status bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l"
                  style={{ backgroundColor: color }}
                >
                  {node.status === 'running' && (
                    <div className="w-full h-full rounded-l flowing-border" />
                  )}
                </div>

                <div className="pl-4 pr-3 py-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Icon size={14} style={{ color }} />
                      <div>
                        <div className="text-xs font-bold text-white">{node.name}</div>
                        <div className="text-[10px] text-[#8A8B90] font-mono-data uppercase mt-0.5">{node.nameEn}</div>
                      </div>
                    </div>
                    {node.status === 'running' && (
                      <div className="text-[10px] text-[#00D2FF] font-mono-data">{node.progress}%</div>
                    )}
                    {node.status === 'success' && (
                      <div className="text-[10px] text-[#00E676]">✓</div>
                    )}
                  </div>

                  <div className="text-[10px] text-[#8A8B90] mt-1.5 leading-relaxed">{node.description}</div>

                  {node.output && (
                    <div className="mt-2 px-2 py-1 bg-[#0a0a0a] rounded text-[10px] text-[#8A8B90] font-mono-data truncate">
                      {node.output}
                    </div>
                  )}

                  {/* Hover run button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRunNode(node.id);
                    }}
                    disabled={isRunning}
                    className="mt-2 flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1a1a] hover:bg-[#222] border border-[#333] rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                  >
                    <Play size={10} />
                    <span>运行此节点</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reset button */}
      <div className="p-4 border-t border-[#222]">
        <button
          onClick={() => window.location.reload()}
          className="flex items-center justify-center gap-2 w-full py-2 bg-[#111] hover:bg-[#161616] border border-[#222] rounded text-xs text-[#8A8B90] transition-colors"
        >
          <RotateCcw size={12} />
          <span>重置工作流</span>
        </button>
      </div>
    </div>
  );
}
