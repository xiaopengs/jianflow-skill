export type NodeStatus = 'idle' | 'running' | 'success' | 'failed';

export type NodeId = 'gh-crawl' | 'llm-analyze' | 'viral-check' | 'video-gen';

export interface WorkflowNode {
  id: NodeId;
  name: string;
  nameEn: string;
  description: string;
  status: NodeStatus;
  progress: number;
  output?: string;
}

export interface PageConfig {
  title: string[];
  subtitle: string;
  description: string[];
  image: string;
  duration: number; // seconds
}

export interface ViralCheckItem {
  id: string;
  label: string;
  weight: number;
  passed: boolean;
  score: number;
}

export interface ViralCheckResult {
  totalScore: number;
  maxScore: number;
  items: ViralCheckItem[];
  passed: boolean;
}

export interface VideoConfig {
  shakeIntensity: number;
  textSpeed: number;
  pageDurations: number[];
  subtitleSize: number;
  subtitleColor: string;
  subtitleStroke: boolean;
  bgmVolume: number;
}

export interface LogEntry {
  timestamp: string;
  node: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}
