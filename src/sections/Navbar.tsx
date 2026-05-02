import { Play, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onRunWorkflow: () => void;
  isRunning: boolean;
}

export default function Navbar({ onRunWorkflow, isRunning }: NavbarProps) {
  return (
    <nav className="h-12 bg-[#0a0a0a] border-b border-[#222] flex items-center px-4 shrink-0">
      {/* Left: Logo */}
      <div className="flex items-center gap-3 mr-8">
        <div className="grid grid-cols-2 gap-[3px]">
          <div className="w-[6px] h-[6px] rounded-full bg-white" />
          <div className="w-[6px] h-[6px] rounded-full bg-[#00D2FF]" />
          <div className="w-[6px] h-[6px] rounded-full bg-[#00D2FF]" />
          <div className="w-[6px] h-[6px] rounded-full bg-white" />
        </div>
        <span className="text-sm font-bold text-white tracking-tight">剪流 SKILL</span>
      </div>

      {/* Center: Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#8A8B90] flex-1">
        <span>工作流</span>
        <ChevronRight size={12} />
        <span>自动化视频生成</span>
        <ChevronRight size={12} />
        <span className="text-white">nanobrowser</span>
      </div>

      {/* Right: Time + Status + Run */}
      <div className="flex items-center gap-4">
        <span className="font-mono-data text-xs text-[#8A8B90]">
          {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
        </span>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-[#00D2FF] animate-pulse' : 'bg-[#333]'}`} />
          <span className="text-[10px] uppercase text-[#8A8B90] font-mono-data">
            {isRunning ? 'RUNNING' : 'IDLE'}
          </span>
        </div>
        <button
          onClick={onRunWorkflow}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-1.5 bg-[#161616] hover:bg-[#1f1f1f] border border-[#333] rounded text-xs text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={12} />
          <span>运行工作流</span>
        </button>
      </div>
    </nav>
  );
}
