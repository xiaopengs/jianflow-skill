import { useState } from 'react';
import { Github, Brain, ShieldCheck, Film, ChevronDown, ChevronUp, Check, AlertTriangle } from 'lucide-react';
import type { NodeId, PageConfig, ViralCheckResult, VideoConfig } from '@/types';

interface ConfigPanelProps {
  selectedNode: NodeId;
  pages: PageConfig[];
  onUpdatePage: (index: number, updates: Partial<PageConfig>) => void;
  viralResult: ViralCheckResult;
  videoConfig: VideoConfig;
  onUpdateVideoConfig: (config: Partial<VideoConfig>) => void;
  onReViralCheck: () => void;
  onRegenerateVideo: () => void;
}

export default function ConfigPanel({
  selectedNode,
  pages,
  onUpdatePage,
  viralResult,
  videoConfig,
  onUpdateVideoConfig,
  onReViralCheck,
  onRegenerateVideo,
}: ConfigPanelProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    basic: true,
    model: true,
    criteria: true,
    render: true,
  });

  const toggle = (key: string) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const renderGhCrawl = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-[10px] uppercase text-[#8A8B90] font-mono-data">仓库 URL</label>
        <input
          type="text"
          defaultValue="https://github.com/nanobrowser/nanobrowser"
          className="w-full px-3 py-2 bg-[#111] border border-[#222] rounded text-xs text-white focus:border-[#00D2FF] focus:outline-none transition-colors"
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] uppercase text-[#8A8B90] font-mono-data">数据字段</label>
        <div className="grid grid-cols-2 gap-2">
          {['Stars', 'Forks', 'Watchers', 'Topics', 'README', 'Releases'].map(field => (
            <label key={field} className="flex items-center gap-2 text-xs text-[#8A8B90] cursor-pointer hover:text-white">
              <input type="checkbox" defaultChecked className="accent-[#00D2FF]" />
              <span>{field}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] uppercase text-[#8A8B90] font-mono-data">API Token (可选)</label>
        <input
          type="password"
          placeholder="ghp_xxxxxxxxxxxx"
          className="w-full px-3 py-2 bg-[#111] border border-[#222] rounded text-xs text-white focus:border-[#00D2FF] focus:outline-none transition-colors"
        />
      </div>
      <button className="w-full py-2 bg-[#161616] hover:bg-[#1f1f1f] border border-[#333] rounded text-xs text-white transition-colors">
        抓取数据
      </button>

      {/* Preview data */}
      <div className="p-3 bg-[#111] rounded border border-[#222]">
        <div className="text-[10px] uppercase text-[#8A8B90] font-mono-data mb-2">预览数据</div>
        <div className="space-y-1 text-xs font-mono-data">
          <div className="flex justify-between"><span className="text-[#8A8B90]">Stars</span><span className="text-white">577</span></div>
          <div className="flex justify-between"><span className="text-[#8A8B90]">Forks</span><span className="text-white">55</span></div>
          <div className="flex justify-between"><span className="text-[#8A8B90]">Watchers</span><span className="text-white">12</span></div>
          <div className="flex justify-between"><span className="text-[#8A8B90]">README</span><span className="text-[#00E676]">4.2KB ✓</span></div>
        </div>
      </div>
    </div>
  );

  const renderLlmAnalyze = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-[10px] uppercase text-[#8A8B90] font-mono-data">模型选择</label>
        <select className="w-full px-3 py-2 bg-[#111] border border-[#222] rounded text-xs text-white focus:border-[#00D2FF] focus:outline-none">
          <option>GPT-4o</option>
          <option>Claude-3.5-Sonnet</option>
          <option>Gemini-1.5-Pro</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] uppercase text-[#8A8B90] font-mono-data">分析维度</label>
        <div className="space-y-2">
          {['卖点提炼', '用户画像', '竞品对比', '技术亮点'].map(dim => (
            <label key={dim} className="flex items-center gap-2 text-xs text-[#8A8B90] cursor-pointer hover:text-white">
              <input type="checkbox" defaultChecked={dim === '卖点提炼' || dim === '技术亮点'} className="accent-[#00D2FF]" />
              <span>{dim}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] uppercase text-[#8A8B90] font-mono-data">温度系数: {0.7}</label>
        <input type="range" min="0" max="10" defaultValue="7" className="w-full accent-[#00D2FF]" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] uppercase text-[#8A8B90] font-mono-data">Prompt 预览</label>
        <div className="p-3 bg-[#111] border border-[#222] rounded text-[10px] text-[#8A8B90] font-mono-data leading-relaxed max-h-32 overflow-y-auto">
          分析以下 GitHub 项目的 README，提炼核心卖点和技术亮点...<br/>
          项目：nanobrowser/nanobrowser<br/>
          要求：输出 3-5 个核心卖点，每个不超过 15 字...
        </div>
      </div>

      {/* Analysis result */}
      <div className="p-3 bg-[#111] rounded border border-[#222]">
        <div className="text-[10px] uppercase text-[#8A8B90] font-mono-data mb-2">分析结果</div>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-start gap-2"><span className="text-[#00D2FF]">1.</span><span className="text-white">AI驱动的浏览器自动化</span></div>
          <div className="flex items-start gap-2"><span className="text-[#00D2FF]">2.</span><span className="text-white">多标签页并行操作</span></div>
          <div className="flex items-start gap-2"><span className="text-[#00D2FF]">3.</span><span className="text-white">开源免费可自托管</span></div>
          <div className="flex items-start gap-2"><span className="text-[#00D2FF]">4.</span><span className="text-white">基于Playwright兼容所有网站</span></div>
        </div>
      </div>
    </div>
  );

  const renderViralCheck = () => (
    <div className="space-y-4">
      {/* Score display */}
      <div className="p-4 bg-[#111] rounded border border-[#222] text-center">
        <div className="text-[10px] uppercase text-[#8A8B90] font-mono-data mb-1">审查总分</div>
        <div className="text-3xl font-black text-[#00D2FF] font-mono-data">
          {viralResult.totalScore}<span className="text-lg text-[#8A8B90]">/{viralResult.maxScore}</span>
        </div>
        <div className={`text-xs mt-1 ${viralResult.passed ? 'text-[#00E676]' : 'text-[#FFB300]'}`}>
          {viralResult.passed ? '✓ 符合爆款条件，准予生成' : '⚠ 部分项未通过，建议修改'}
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase text-[#8A8B90] font-mono-data">审查项</span>
          <button onClick={onReViralCheck} className="text-[10px] text-[#00D2FF] hover:underline">重新审查</button>
        </div>
        {viralResult.items.map(item => (
          <div key={item.id} className="flex items-center justify-between p-2.5 bg-[#111] rounded border border-[#222]">
            <div className="flex items-center gap-2">
              {item.passed ? (
                <div className="w-5 h-5 rounded-full bg-[#00E676]/20 flex items-center justify-center">
                  <Check size={12} className="text-[#00E676]" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-[#FFB300]/20 flex items-center justify-center">
                  <AlertTriangle size={12} className="text-[#FFB300]" />
                </div>
              )}
              <span className="text-xs text-white">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#8A8B90] font-mono-data">{item.weight}%</span>
              <span className={`text-xs font-mono-data ${item.passed ? 'text-[#00E676]' : 'text-[#FFB300]'}`}>
                {item.score}/{item.weight}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Threshold */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase text-[#8A8B90] font-mono-data">通过分数线</label>
        <div className="flex items-center gap-3">
          <input type="range" min="60" max="95" defaultValue="80" className="flex-1 accent-[#00D2FF]" />
          <span className="text-xs text-white font-mono-data w-8">80</span>
        </div>
      </div>
    </div>
  );

  const renderVideoGen = () => (
    <div className="space-y-4">
      {/* Page durations */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase text-[#8A8B90] font-mono-data">页面时长</span>
        </div>
        {pages.map((page, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-[10px] text-[#8A8B90] w-16">Page {i + 1}</span>
            <input
              type="range"
              min="1"
              max="6"
              step="0.5"
              value={page.duration}
              onChange={e => onUpdatePage(i, { duration: parseFloat(e.target.value) })}
              className="flex-1 accent-[#00D2FF]"
            />
            <span className="text-xs text-white font-mono-data w-10 text-right">{page.duration}s</span>
          </div>
        ))}
      </div>

      {/* Transition settings */}
      <div className="space-y-3">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => toggle('render')}>
          <span className="text-[10px] uppercase text-[#8A8B90] font-mono-data">转场动画设置</span>
          {expanded.render ? <ChevronUp size={12} className="text-[#8A8B90]" /> : <ChevronDown size={12} className="text-[#8A8B90]" />}
        </div>
        {expanded.render && (
          <div className="space-y-3 pl-1">
            <div className="space-y-1">
              <label className="text-[10px] text-[#8A8B90]">震动幅度</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={videoConfig.shakeIntensity}
                  onChange={e => onUpdateVideoConfig({ shakeIntensity: parseInt(e.target.value) })}
                  className="flex-1 accent-[#00D2FF]"
                />
                <span className="text-xs text-white font-mono-data w-8">{videoConfig.shakeIntensity}px</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-[#8A8B90]">文字飞入速度</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={videoConfig.textSpeed}
                  onChange={e => onUpdateVideoConfig({ textSpeed: parseFloat(e.target.value) })}
                  className="flex-1 accent-[#00D2FF]"
                />
                <span className="text-xs text-white font-mono-data w-8">{videoConfig.textSpeed}s</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-[#8A8B90]">字幕大小</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={videoConfig.subtitleSize}
                  onChange={e => onUpdateVideoConfig({ subtitleSize: parseInt(e.target.value) })}
                  className="flex-1 accent-[#00D2FF]"
                />
                <span className="text-xs text-white font-mono-data w-8">{videoConfig.subtitleSize}px</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={onRegenerateVideo}
          className="flex-1 py-2.5 bg-[#161616] hover:bg-[#1f1f1f] border border-[#333] rounded text-xs text-white transition-colors"
        >
          重新生成
        </button>
        <button className="flex-1 py-2.5 bg-[#00D2FF] hover:bg-[#00b8e0] rounded text-xs text-black font-bold transition-colors">
          导出 MP4
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (selectedNode) {
      case 'gh-crawl': return renderGhCrawl();
      case 'llm-analyze': return renderLlmAnalyze();
      case 'viral-check': return renderViralCheck();
      case 'video-gen': return renderVideoGen();
      default: return renderGhCrawl();
    }
  };

  const nodeNames: Record<NodeId, string> = {
    'gh-crawl': 'GitHub 数据采集',
    'llm-analyze': 'LLM 内容分析',
    'viral-check': '爆款条件审查',
    'video-gen': '视频合成引擎',
  };

  const NodeIcon = {
    'gh-crawl': Github,
    'llm-analyze': Brain,
    'viral-check': ShieldCheck,
    'video-gen': Film,
  }[selectedNode] || Github;

  return (
    <div className="w-[380px] bg-[#0a0a0a] border-l border-[#222] flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b border-[#222] flex items-center gap-2">
        <NodeIcon size={14} className="text-[#00D2FF]" />
        <h2 className="text-xs font-bold text-white">{nodeNames[selectedNode]}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {renderContent()}
      </div>

      {/* Mini chart at bottom */}
      <div className="p-4 border-t border-[#222]">
        <div className="text-[10px] uppercase text-[#8A8B90] font-mono-data mb-2">节点执行耗时</div>
        <div className="h-16 flex items-end gap-1">
          {[35, 55, 42, 70, 48, 60, 38, 52, 45, 68].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm transition-all hover:bg-[#00D2FF]"
              style={{
                height: `${h}%`,
                backgroundColor: i === 5 ? '#00D2FF' : '#222',
              }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[9px] text-[#8A8B90] font-mono-data">-10s</span>
          <span className="text-[9px] text-[#8A8B90] font-mono-data">now</span>
        </div>
      </div>
    </div>
  );
}
