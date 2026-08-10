import { NavSection } from '../types';

export const CALM_PALETTE = {
  primary: '#4F46E5',    // Deep Indigo
  secondary: '#5BC8AF',  // Soft Teal
  background: '#FAFAF7', // Warm Off-White
  surface: '#FFFFFF',    // Pure White
  accent: '#FF8C7A',     // Soft Coral
  success: '#73C991',    // Gentle Sage
  warning: '#F4B740',    // Warm Amber
  textPrimary: '#1F2937',// Charcoal
  textMuted: '#6B7280'   // Subtle Slate
};

export interface NavItemDef {
  id: NavSection;
  label: string;
  iconName: string;
  description: string;
}

export const NAV_ITEMS: NavItemDef[] = [
  {
    id: 'home',
    label: 'Home',
    iconName: 'Home',
    description: 'Today’s priorities and single Next Best Step'
  },
  {
    id: 'plan',
    label: 'Plan',
    iconName: 'Calendar',
    description: 'Energy-aware schedule & dynamic replanning'
  },
  {
    id: 'companion',
    label: 'Companion',
    iconName: 'MessageSquare',
    description: 'Empathetic AI study & planning assistant'
  },
  {
    id: 'learn',
    label: 'Learn',
    iconName: 'BookOpen',
    description: 'Personalized concept breakdown & revision'
  },
  {
    id: 'growth',
    label: 'Growth',
    iconName: 'Sprout',
    description: 'Minimal reflection journal & progress insights'
  },
  {
    id: 'profile',
    label: 'Profile',
    iconName: 'User',
    description: 'Preferences, integrations & privacy settings'
  }
];
