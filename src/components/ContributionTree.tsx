import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GitBranch, Sparkles, Clock, ArrowRight, CornerDownRight } from 'lucide-react';
import { ContributionNode } from '../types';

interface ContributionTreeProps {
  nodes: ContributionNode[];
  selectedNodeId?: string;
  onSelectNode: (node: ContributionNode) => void;
  onStartContributionForNode?: (node: ContributionNode, mode: 'continue' | 'branch' | 'remix') => void;
}

export const ContributionTree: React.FC<ContributionTreeProps> = ({
  nodes,
  selectedNodeId,
  onSelectNode,
  onStartContributionForNode,
}) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Group nodes by parentId to build hierarchical branches
  const rootNode = nodes.find(n => n.type === 'root') || nodes[0];
  const activeNode = nodes.find(n => n.id === selectedNodeId) || rootNode;

  // Organize by depth
  const depths: Record<number, ContributionNode[]> = {};
  nodes.forEach((node) => {
    const d = node.depth || 0;
    if (!depths[d]) depths[d] = [];
    depths[d].push(node);
  });

  const maxDepth = Math.max(...Object.keys(depths).map(Number), 0);

  // Helper for node styling
  const getNodeBadgeColor = (type: string) => {
    switch (type) {
      case 'root':
        return 'bg-[#FFE38A] text-[#202124]';
      case 'branch':
        return 'bg-[#8ED8FF] text-[#202124]';
      case 'remix':
        return 'bg-[#A8E6CF] text-[#202124]';
      default:
        return 'bg-[#B9A7FF] text-[#202124]';
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border-2 border-[#202124] p-6 lg:p-8 shadow-sticker-lg relative overflow-hidden">
      {/* Tape decoration */}
      <div className="washi-tape-butter absolute -top-3 left-10 w-28 h-5 border border-[#202124]/20 rotate-[-1deg]" />

      <div className="flex items-center justify-between border-b-2 border-[#202124]/10 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base">🌿</span>
            <h3 className="font-serif-editorial text-2xl font-bold text-[#202124]">
              Visual Branch Tree
            </h3>
            <span className="px-2.5 py-0.5 bg-[#B9A7FF] border border-[#202124] rounded-full text-xs font-mono-tech font-bold text-[#202124]">
              {nodes.length} NODES
            </span>
          </div>
          <p className="text-xs font-mono-tech text-[#777777] mt-0.5">
            Click any node in the constellation to trace how this idea evolved or branch off an alternate reality.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono-tech font-bold">
          <span className="px-2 py-0.5 bg-[#FFE38A] border border-[#202124] rounded">ROOT</span>
          <span className="text-[#777777]">➔</span>
          <span className="px-2 py-0.5 bg-[#8ED8FF] border border-[#202124] rounded">BRANCH</span>
          <span className="text-[#777777]">➔</span>
          <span className="px-2 py-0.5 bg-[#A8E6CF] border border-[#202124] rounded">REMIX</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive 2D Tree Diagram */}
        <div className="lg:col-span-7 overflow-x-auto pb-4">
          <div className="min-w-[460px] p-2 space-y-6">
            
            {Array.from({ length: maxDepth + 1 }).map((_, depthIdx) => {
              const nodesAtDepth = depths[depthIdx] || [];
              const depthLabel = depthIdx === 0 ? 'ORIGINAL SEED' : `DEPTH LEVEL 0${depthIdx}`;

              return (
                <div key={depthIdx} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono-tech font-bold text-[#777777] uppercase tracking-wider">
                      {depthLabel}
                    </span>
                    <div className="flex-1 h-[1px] bg-[#202124]/10" />
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    {nodesAtDepth.map((node) => {
                      const isSelected = activeNode?.id === node.id;
                      const isHovered = hoveredNodeId === node.id;

                      return (
                        <motion.div
                          key={node.id}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onSelectNode(node)}
                          onMouseEnter={() => setHoveredNodeId(node.id)}
                          onMouseLeave={() => setHoveredNodeId(null)}
                          className={`relative group cursor-pointer transition-all duration-200 p-3.5 rounded-xl border-2 flex flex-col gap-2 w-64 ${
                            isSelected
                              ? 'bg-[#F7F5EF] border-[#202124] shadow-sticker'
                              : isHovered
                              ? 'bg-[#F7F5EF] border-[#202124]'
                              : 'bg-white border-[#202124]/30 shadow-sticker-sm'
                          }`}
                        >
                          {/* Node Header: Author & Type */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <img
                                src={node.author.avatar}
                                alt={node.author.name}
                                className="w-5 h-5 rounded-full object-cover border border-[#202124]"
                                referrerPolicy="no-referrer"
                              />
                              <span className="text-xs font-bold text-[#202124] truncate max-w-[100px]">
                                {node.author.name}
                              </span>
                            </div>

                            <span
                              className={`text-[9px] font-mono-tech uppercase font-bold px-1.5 py-0.5 rounded border border-[#202124] ${getNodeBadgeColor(
                                node.type
                              )}`}
                            >
                              {node.type}
                            </span>
                          </div>

                          {/* Branch Label if any */}
                          {node.branchName && (
                            <span className="text-[10px] font-mono-tech text-[#777777] truncate font-medium">
                              {node.branchName}
                            </span>
                          )}

                          {/* Excerpt */}
                          <p className="text-xs font-serif-editorial italic text-[#202124] line-clamp-2 leading-snug">
                            “{node.content}”
                          </p>

                          {/* Footer */}
                          <div className="pt-2 border-t border-[#202124]/10 flex items-center justify-between text-[10px] font-mono-tech text-[#777777]">
                            <span>{node.timestamp}</span>
                            <span className="text-[#202124] font-bold group-hover:text-[#7C5CFF] transition-colors">
                              SELECT ➔
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* Right Column: Selected Node Preview & Action Panel */}
        {activeNode && (
          <div className="lg:col-span-5 bg-[#F7F5EF] border-2 border-[#202124] rounded-xl p-5 shadow-sticker space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#202124]/15">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B9A7FF] border border-[#202124]" />
                <span className="text-xs font-mono-tech font-bold uppercase text-[#202124]">
                  Active Branch Node
                </span>
              </div>
              <span className="text-[10px] font-mono-tech text-[#777777]">
                {activeNode.timestamp}
              </span>
            </div>

            {/* Author Profile */}
            <div className="flex items-center gap-3">
              <img
                src={activeNode.author.avatar}
                alt={activeNode.author.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-[#202124]"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="text-sm font-bold text-[#202124]">
                  {activeNode.author.name}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] font-mono-tech text-[#777777]">
                  <span className="capitalize font-bold text-[#202124]">
                    {activeNode.type} piece
                  </span>
                  {activeNode.branchName && (
                    <span>· {activeNode.branchName}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Node Content */}
            <div className="p-4 bg-white border border-[#202124] rounded-xl">
              <p className="font-serif-editorial text-base sm:text-lg italic text-[#202124] leading-relaxed">
                “{activeNode.content}”
              </p>
            </div>

            {/* Quick Actions to build upon this node */}
            <div className="pt-2 space-y-2">
              <div className="text-[10px] font-mono-tech uppercase font-bold text-[#777777]">
                TAKE THIS FORWARD:
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onStartContributionForNode?.(activeNode, 'continue')}
                  className="px-2.5 py-2 bg-white hover:bg-[#FFE38A] text-[#202124] text-xs font-mono-tech font-bold rounded-lg border-2 border-[#202124] shadow-sticker-sm transition-all text-center cursor-pointer"
                >
                  Continue
                </button>
                <button
                  onClick={() => onStartContributionForNode?.(activeNode, 'branch')}
                  className="px-2.5 py-2 bg-[#8ED8FF] hover:bg-[#7bc8ef] text-[#202124] text-xs font-mono-tech font-bold rounded-lg border-2 border-[#202124] shadow-sticker-sm transition-all text-center cursor-pointer"
                >
                  Branch
                </button>
                <button
                  onClick={() => onStartContributionForNode?.(activeNode, 'remix')}
                  className="px-2.5 py-2 bg-[#A8E6CF] hover:bg-[#92d6be] text-[#202124] text-xs font-mono-tech font-bold rounded-lg border-2 border-[#202124] shadow-sticker-sm transition-all text-center cursor-pointer"
                >
                  Remix
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
