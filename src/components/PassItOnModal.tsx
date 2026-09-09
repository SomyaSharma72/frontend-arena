import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, X } from 'lucide-react';
import { Collaborator, Project } from '../types';

interface PassItOnModalProps {
  project: Project;
  recipients: Collaborator[];
  isOpen: boolean;
  selectedRecipient?: Collaborator | null;
  onClose: () => void;
  onPass: (recipient: Collaborator) => void;
}

export const PassItOnModal: React.FC<PassItOnModalProps> = ({
  project,
  recipients,
  isOpen,
  selectedRecipient,
  onClose,
  onPass,
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-[#181818]/25 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-md bg-[#F8F6F0] border-2 border-[#181818] rounded-2xl shadow-sticker-lg overflow-hidden"
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="p-5 border-b border-[#DDD9D0] flex items-start justify-between">
            <div>
              <p className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-[#6657E8]">Pass it on</p>
              <h2 className="font-display font-black text-xl text-[#181818] mt-1">Pass this to...</h2>
              <p className="text-xs text-[#77736D] mt-1 font-sans-clean line-clamp-1">{project.title}</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white cursor-pointer" aria-label="Close pass picker">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 space-y-1.5">
            {recipients.map((recipient) => {
              const isSelected = selectedRecipient?.name === recipient.name;
              return (
                <button
                  key={recipient.name}
                  onClick={() => onPass(recipient)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected ? 'bg-[#C7EBDD] border-[#181818]' : 'bg-white border-transparent hover:border-[#181818] hover:bg-[#FFE28A]/50'
                  }`}
                >
                  <img src={recipient.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-[#181818]" referrerPolicy="no-referrer" />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <strong className="font-display text-sm truncate">{recipient.name}</strong>
                      {recipient.isOnline && <span className="w-2 h-2 rounded-full bg-[#61C99A]" />}
                    </span>
                    <span className="block text-[11px] font-mono-tech text-[#77736D] truncate">@{recipient.username || recipient.name.toLowerCase().replace(/\s+/g, '')}</span>
                    <span className="block text-xs text-[#181818]/65 truncate mt-0.5">{recipient.role || 'Ready to build on it'}</span>
                  </span>
                  {isSelected ? <Check className="w-4 h-4 text-[#168255]" /> : <ArrowRight className="w-4 h-4 text-[#77736D]" />}
                </button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
