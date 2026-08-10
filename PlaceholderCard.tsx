import React from 'react';
import { CalmCard } from './CalmCard';

interface PlaceholderCardProps {
  title: string;
  roadmapPhase: string;
  description: string;
  intendedCapability: string;
  badgeLabel?: string;
}

export const PlaceholderCard: React.FC<PlaceholderCardProps> = ({
  title,
  roadmapPhase,
  description,
  intendedCapability,
  badgeLabel = 'Planned Future Integration'
}) => {
  return (
    <CalmCard className="border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50/20 to-teal-50/20">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-gray-800">{title}</h4>
            <span className="badge-roadmap">{badgeLabel}</span>
          </div>
          <p className="text-xs font-medium text-indigo-600">Roadmap Phase: {roadmapPhase}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-3">{description}</p>
      <div className="mt-4 p-3 bg-white/70 rounded-lg border border-indigo-100 text-xs text-gray-500">
        <strong className="text-gray-700 font-medium">Future Capability:</strong> {intendedCapability}
      </div>
    </CalmCard>
  );
};
