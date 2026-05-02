import { useCallback } from 'react';
import Navbar from '@/sections/Navbar';
import WorkflowCanvas from '@/sections/WorkflowCanvas';
import VideoPreview from '@/sections/VideoPreview';
import ConfigPanel from '@/sections/ConfigPanel';
import LogPanel from '@/sections/LogPanel';
import { useWorkflow } from '@/hooks/useWorkflow';

export default function Home() {
  const {
    nodes,
    selectedNode,
    setSelectedNode,
    pages,
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
    addLog,
  } = useWorkflow();

  const handleUpdateVideoConfig = useCallback((updates: Partial<typeof videoConfig>) => {
    setVideoConfig(prev => ({ ...prev, ...updates }));
  }, [setVideoConfig]);

  const handleReViralCheck = useCallback(() => {
    addLog('viral-check', '重新执行爆款条件审查...', 'info');
    // Simulate re-check with slight randomization
    setTimeout(() => {
      const newScore = Math.floor(Math.random() * 15) + 85;
      const newPassed = newScore >= 80;
      setViralResult({
        ...viralResult,
        totalScore: newScore,
        passed: newPassed,
        items: viralResult.items.map(item => ({
          ...item,
          passed: Math.random() > 0.2,
          score: Math.floor(Math.random() * item.weight * 0.3) + Math.floor(item.weight * 0.7),
        })),
      });
      addLog('viral-check', `审查完成: ${newScore}/100 — ${newPassed ? '通过' : '未通过'}`, newPassed ? 'success' : 'warning');
    }, 1000);
  }, [addLog, viralResult, setViralResult]);

  const handleRegenerateVideo = useCallback(() => {
    addLog('video-gen', '收到重新生成指令...', 'info');
    setIsPlaying(false);
    setCurrentPage(0);
    runSingleNode('video-gen');
  }, [addLog, setIsPlaying, setCurrentPage, runSingleNode]);

  return (
    <div className="h-screen flex flex-col bg-black overflow-hidden">
      {/* Top Navigation */}
      <Navbar onRunWorkflow={runWorkflow} isRunning={isRunning} />

      {/* Main workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Workflow Canvas */}
        <WorkflowCanvas
          nodes={nodes}
          selectedNode={selectedNode}
          onSelectNode={setSelectedNode}
          onRunNode={runSingleNode}
          isRunning={isRunning}
        />

        {/* Center: Video Preview */}
        <VideoPreview
          pages={pages}
          currentPage={currentPage}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setCurrentPage={setCurrentPage}
          shakeIntensity={videoConfig.shakeIntensity}
        />

        {/* Right: Config Panel */}
        <ConfigPanel
          selectedNode={selectedNode}
          pages={pages}
          onUpdatePage={updatePage}
          viralResult={viralResult}
          videoConfig={videoConfig}
          onUpdateVideoConfig={handleUpdateVideoConfig}
          onReViralCheck={handleReViralCheck}
          onRegenerateVideo={handleRegenerateVideo}
        />
      </div>

      {/* Bottom: Log Panel */}
      <LogPanel logs={logs} />
    </div>
  );
}
