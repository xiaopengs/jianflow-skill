import { Terminal, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import type { LogEntry } from '@/types';

interface LogPanelProps {
  logs: LogEntry[];
}

const typeConfig = {
  info: { icon: Info, color: '#8A8B90' },
  success: { icon: CheckCircle, color: '#00E676' },
  warning: { icon: AlertTriangle, color: '#FFB300' },
  error: { icon: XCircle, color: '#FF4D4F' },
};

export default function LogPanel({ logs }: LogPanelProps) {
  return (
    <div className="h-[140px] bg-[#0a0a0a] border-t border-[#222] flex flex-col">
      <div className="px-4 py-2 border-b border-[#222] flex items-center gap-2 shrink-0">
        <Terminal size={12} className="text-[#8A8B90]" />
        <span className="text-[10px] uppercase text-[#8A8B90] font-mono-data">执行日志</span>
        <span className="text-[10px] text-[#444] font-mono-data ml-auto">{logs.length} entries</span>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {logs.length === 0 && (
          <div className="text-[10px] text-[#444] font-mono-data p-2">等待工作流启动...</div>
        )}
        {logs.map((log, i) => {
          const config = typeConfig[log.type];
          const Icon = config.icon;
          return (
            <div key={i} className="flex items-start gap-2 px-2 py-1 hover:bg-[#111] rounded">
              <span className="text-[10px] text-[#444] font-mono-data shrink-0 w-14">{log.timestamp}</span>
              <span className="text-[10px] text-[#00D2FF] font-mono-data shrink-0 w-20">[{log.node}]</span>
              <Icon size={10} className="shrink-0 mt-0.5" style={{ color: config.color }} />
              <span className="text-[11px] text-white/80">{log.message}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
