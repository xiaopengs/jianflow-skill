import { useState, useCallback } from 'react';
import type { WorkflowNode, NodeId, NodeStatus, PageConfig, ViralCheckResult, LogEntry, VideoConfig } from '@/types';

const defaultNodes: WorkflowNode[] = [
  { id: 'gh-crawl', name: 'GitHub 数据采集', nameEn: 'GH CRAWL', description: '抓取仓库 Stars / Forks / README', status: 'idle', progress: 0 },
  { id: 'llm-analyze', name: 'LLM 内容分析', nameEn: 'LLM ANALYZE', description: '提炼卖点标题与关键特性', status: 'idle', progress: 0 },
  { id: 'viral-check', name: '爆款条件审查', nameEn: 'VIRAL CHECK', description: '检查标题吸引力、节奏感等', status: 'idle', progress: 0 },
  { id: 'video-gen', name: '视频合成引擎', nameEn: 'VIDEO GEN', description: '合成 9:16 短视频', status: 'idle', progress: 0 },
];

const defaultPages: PageConfig[] = [
  {
    title: ['GITHUB 爆款神器', 'Nanobrowser'],
    subtitle: 'AI 驱动的浏览器自动化工具',
    description: ['577 Stars · 55 Forks', '基于 Playwright 的开源浏览器自动化框架'],
    image: '/assets/github-page.jpg',
    duration: 3,
  },
  {
    title: ['核心卖点分析', '四大关键特性'],
    subtitle: 'LLM 智能提炼',
    description: ['AI驱动浏览器自动化', '多标签页并行操作 · 开源自托管 · 全站兼容'],
    image: '/assets/analysis-report.jpg',
    duration: 3,
  },
  {
    title: ['爆款审查报告', '92/100 分'],
    subtitle: '审查结论：符合爆款条件',
    description: ['标题吸引力 ✓ 卖点密度 ✓', '时长控制 ✓ 节奏感 ✓ 准予生成'],
    image: '/assets/viral-check.jpg',
    duration: 2.5,
  },
  {
    title: ['视频已生成', '10.5s 完整版'],
    subtitle: '点击重新生成或导出',
    description: ['MP4 · 1080x1920 · 30fps', '转场动画 · 字幕 · 背景音乐'],
    image: '/assets/github-page.jpg',
    duration: 2,
  },
];

const defaultViralResult: ViralCheckResult = {
  totalScore: 92,
  maxScore: 100,
  passed: true,
  items: [
    { id: 'title', label: '标题吸引力', weight: 20, passed: true, score: 18 },
    { id: 'density', label: '卖点密度', weight: 25, passed: true, score: 25 },
    { id: 'duration', label: '时长控制', weight: 20, passed: true, score: 20 },
    { id: 'cta', label: '明确 CTA', weight: 15, passed: true, score: 14 },
    { id: 'total', label: '总时长 ≤15s', weight: 20, passed: true, score: 15 },
  ],
};

const defaultVideoConfig: VideoConfig = {
  shakeIntensity: 15,
  textSpeed: 1.2,
  pageDurations: [3, 3, 2.5, 2],
  subtitleSize: 16,
  subtitleColor: '#FFFFFF',
  subtitleStroke: true,
  bgmVolume: 0.3,
};

export function useWorkflow() {
  const [nodes, setNodes] = useState<WorkflowNode[]>(defaultNodes);
  const [selectedNode, setSelectedNode] = useState<NodeId>('gh-crawl');
  const [pages, setPages] = useState<PageConfig[]>(defaultPages);
  const [viralResult, setViralResult] = useState<ViralCheckResult>(defaultViralResult);
  const [videoConfig, setVideoConfig] = useState<VideoConfig>(defaultVideoConfig);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const addLog = useCallback((node: string, message: string, type: LogEntry['type'] = 'info') => {
    const entry: LogEntry = {
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
      node,
      message,
      type,
    };
    setLogs(prev => [...prev.slice(-50), entry]);
  }, []);

  const updateNodeStatus = useCallback((id: NodeId, status: NodeStatus, progress: number, output?: string) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, status, progress, output } : n));
  }, []);

  const runWorkflow = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    setCurrentPage(0);

    // Node 1: GitHub Crawl
    addLog('gh-crawl', '正在连接 github.com...', 'info');
    updateNodeStatus('gh-crawl', 'running', 0);
    await delay(800);
    updateNodeStatus('gh-crawl', 'running', 30);
    addLog('gh-crawl', '获取仓库元数据: nanobrowser/nanobrowser', 'info');
    await delay(600);
    updateNodeStatus('gh-crawl', 'running', 60);
    addLog('gh-crawl', 'Stars: 577, Forks: 55, Watchers: 12', 'info');
    await delay(500);
    updateNodeStatus('gh-crawl', 'running', 100);
    addLog('gh-crawl', 'README 抓取完成 (4.2KB)', 'success');
    updateNodeStatus('gh-crawl', 'success', 100, ' Stars: 577, Forks: 55');

    await delay(400);

    // Node 2: LLM Analyze
    addLog('llm-analyze', '加载 GPT-4o 模型...', 'info');
    updateNodeStatus('llm-analyze', 'running', 0);
    await delay(500);
    updateNodeStatus('llm-analyze', 'running', 25);
    addLog('llm-analyze', '分析 README 内容结构...', 'info');
    await delay(700);
    updateNodeStatus('llm-analyze', 'running', 50);
    addLog('llm-analyze', '提炼卖点: AI浏览器自动化', 'info');
    await delay(600);
    updateNodeStatus('llm-analyze', 'running', 75);
    addLog('llm-analyze', '提炼卖点: 多标签并行 / 开源自托管 / Playwright', 'info');
    await delay(500);
    updateNodeStatus('llm-analyze', 'running', 100);
    addLog('llm-analyze', '分析完成，生成 4 个核心卖点', 'success');
    updateNodeStatus('llm-analyze', 'success', 100, '4 selling points extracted');

    await delay(400);

    // Node 3: Viral Check
    addLog('viral-check', '开始爆款条件审查...', 'info');
    updateNodeStatus('viral-check', 'running', 0);
    await delay(400);
    updateNodeStatus('viral-check', 'running', 20);
    addLog('viral-check', '检查标题吸引力... 通过 (18/20)', 'info');
    await delay(400);
    updateNodeStatus('viral-check', 'running', 40);
    addLog('viral-check', '检查卖点密度... 通过 (25/25)', 'info');
    await delay(400);
    updateNodeStatus('viral-check', 'running', 60);
    addLog('viral-check', '检查时长控制... 通过 (20/20)', 'info');
    await delay(300);
    updateNodeStatus('viral-check', 'running', 80);
    addLog('viral-check', '检查节奏感... 通过 (15/15)', 'info');
    await delay(300);
    updateNodeStatus('viral-check', 'running', 100);
    addLog('viral-check', '审查总分: 92/100 — 符合爆款条件，准予生成', 'success');
    updateNodeStatus('viral-check', 'success', 100, 'Score: 92/100');

    await delay(400);

    // Node 4: Video Gen
    addLog('video-gen', '初始化视频合成引擎...', 'info');
    updateNodeStatus('video-gen', 'running', 0);
    await delay(500);
    updateNodeStatus('video-gen', 'running', 20);
    addLog('video-gen', '渲染 Page 1/4: GitHub 主页', 'info');
    setCurrentPage(0);
    await delay(600);
    updateNodeStatus('video-gen', 'running', 40);
    addLog('video-gen', '渲染 Page 2/4: 卖点分析', 'info');
    setCurrentPage(1);
    await delay(600);
    updateNodeStatus('video-gen', 'running', 60);
    addLog('video-gen', '渲染 Page 3/4: 审查报告', 'info');
    setCurrentPage(2);
    await delay(600);
    updateNodeStatus('video-gen', 'running', 80);
    addLog('video-gen', '渲染 Page 4/4: 最终确认', 'info');
    setCurrentPage(3);
    await delay(500);
    updateNodeStatus('video-gen', 'running', 100);
    addLog('video-gen', '视频合成完成: 10.5s MP4', 'success');
    updateNodeStatus('video-gen', 'success', 100, '10.5s MP4');

    setIsRunning(false);
  }, [isRunning, addLog, updateNodeStatus]);

  const runSingleNode = useCallback(async (id: NodeId) => {
    if (isRunning) return;
    setIsRunning(true);

    switch (id) {
      case 'gh-crawl':
        addLog('gh-crawl', '正在抓取仓库数据...', 'info');
        updateNodeStatus('gh-crawl', 'running', 0);
        await delay(1500);
        updateNodeStatus('gh-crawl', 'success', 100, 'Stars: 577, Forks: 55');
        addLog('gh-crawl', '抓取完成', 'success');
        break;
      case 'llm-analyze':
        addLog('llm-analyze', '正在分析内容...', 'info');
        updateNodeStatus('llm-analyze', 'running', 0);
        await delay(1500);
        updateNodeStatus('llm-analyze', 'success', 100, '4 selling points');
        addLog('llm-analyze', '分析完成', 'success');
        break;
      case 'viral-check':
        addLog('viral-check', '正在审查...', 'info');
        updateNodeStatus('viral-check', 'running', 0);
        await delay(1500);
        updateNodeStatus('viral-check', 'success', 100, 'Score: 92/100');
        addLog('viral-check', '审查通过', 'success');
        break;
      case 'video-gen':
        addLog('video-gen', '正在生成视频...', 'info');
        updateNodeStatus('video-gen', 'running', 0);
        for (let i = 0; i < 4; i++) {
          setCurrentPage(i);
          updateNodeStatus('video-gen', 'running', (i + 1) * 25);
          await delay(600);
        }
        updateNodeStatus('video-gen', 'success', 100, '10.5s MP4');
        addLog('video-gen', '视频生成完成', 'success');
        break;
    }

    setIsRunning(false);
  }, [isRunning, addLog, updateNodeStatus]);

  const updatePage = useCallback((index: number, updates: Partial<PageConfig>) => {
    setPages(prev => prev.map((p, i) => i === index ? { ...p, ...updates } : p));
  }, []);

  const resetNodes = useCallback(() => {
    setNodes(defaultNodes.map(n => ({ ...n })));
    setIsRunning(false);
    setCurrentPage(0);
  }, []);

  return {
    nodes,
    selectedNode,
    setSelectedNode,
    pages,
    setPages,
    viralResult,
    setViralResult,
    videoConfig,
    setVideoConfig,
    logs,
    isRunning,
    currentPage,
    isPlaying,
    setIsPlaying,
    setCurrentPage,
    runWorkflow,
    runSingleNode,
    updatePage,
    resetNodes,
    addLog,
  };
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
