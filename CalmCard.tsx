import React from 'react';

interface CalmCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  className?: string;
  isHighlight?: boolean;
}

export const CalmCard: React.FC<CalmCardProps> = ({
  children,
  title,
  subtitle,
  headerAction,
  className = '',
  isHighlight = false
}) => {
  return (
    <div
      className={`calm-card p-6 ${isHighlight ? 'next-best-step-card' : ''} ${className}`}
    >
      {(title || headerAction) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
