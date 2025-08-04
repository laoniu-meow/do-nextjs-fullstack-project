import React from 'react';
import {
  // Navigation icons
  Menu,
  Menu as MenuOpen,
  Home,
  Settings,
  User,
  Users,
  Building,
  FileText,
  Image,
  Palette,
  Upload,
  Download,
  Save,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Plus,
  Minus,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,

  // Action icons
  Play,
  Pause,
  Square as Stop,
  RefreshCw as Refresh,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Search,
  Filter,
  SortAsc,
  SortDesc,

  // Communication icons
  Mail,
  Phone,
  MessageCircle,
  MessageSquare,
  Send,
  Reply,
  Forward,

  // Status icons
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  HelpCircle,
  Shield,
  Lock,
  Unlock,

  // Media icons
  Camera,
  Video,
  Mic,
  MicOff,
  Volume,
  VolumeX,
  Volume1,
  Volume2,

  // File icons
  File,
  Folder,
  FolderOpen,
  FileImage,
  FileVideo,
  FileAudio,
  FileText as FileTextIcon,
  FileCode,
  FileArchive,

  // Social icons
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  Globe,
  Link,
  ExternalLink,

  // UI icons
  Grid,
  List,
  Calendar,
  Clock,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Bookmark,
  Share,
  MoreHorizontal,
  MoreVertical,
  Settings as SettingsIcon,
  Bell,
  BellOff,

  // Business icons
  CreditCard,
  DollarSign,
  ShoppingCart,
  ShoppingBag,
  Gift,
  Award,
  Target,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,

  // Device icons
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Printer,
  Wifi,
  WifiOff,
  Bluetooth,
  Battery,
  BatteryCharging,

  // Weather icons
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  Wind,
  Umbrella,

  // Custom icons (can be extended)
} from 'lucide-react';

// Icon size variants
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Icon color variants
export type IconColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'muted'
  | 'white'
  | 'black'
  | string; // Allow custom colors

// Icon interface
export interface IconProps {
  name: string;
  size?: IconSize;
  color?: IconColor;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
}

// Size mapping
const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

// Color mapping
const colorMap: Record<IconColor, string> = {
  primary: '#1976d2',
  secondary: '#64748b',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  muted: '#9ca3af',
  white: '#ffffff',
  black: '#000000',
};

// Icon mapping
const iconMap = {
  // Navigation
  menu: Menu,
  menuOpen: MenuOpen,
  home: Home,
  settings: Settings,
  user: User,
  users: Users,
  building: Building,
  fileText: FileText,
  image: Image,
  palette: Palette,
  upload: Upload,
  download: Download,
  save: Save,
  trash: Trash2,
  edit: Edit,
  eye: Eye,
  eyeOff: EyeOff,
  plus: Plus,
  minus: Minus,
  close: X,
  check: Check,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,

  // Actions
  play: Play,
  pause: Pause,
  stop: Stop,
  refresh: Refresh,
  rotateCcw: RotateCcw,
  rotateCw: RotateCw,
  zoomIn: ZoomIn,
  zoomOut: ZoomOut,
  search: Search,
  filter: Filter,
  sortAsc: SortAsc,
  sortDesc: SortDesc,

  // Communication
  mail: Mail,
  phone: Phone,
  messageCircle: MessageCircle,
  messageSquare: MessageSquare,
  send: Send,
  reply: Reply,
  forward: Forward,

  // Status
  alertCircle: AlertCircle,
  alertTriangle: AlertTriangle,
  checkCircle: CheckCircle,
  info: Info,
  helpCircle: HelpCircle,
  shield: Shield,
  lock: Lock,
  unlock: Unlock,

  // Media
  camera: Camera,
  video: Video,
  mic: Mic,
  micOff: MicOff,
  volume: Volume,
  volumeX: VolumeX,
  volume1: Volume1,
  volume2: Volume2,

  // Files
  file: File,
  folder: Folder,
  folderOpen: FolderOpen,
  fileImage: FileImage,
  fileVideo: FileVideo,
  fileAudio: FileAudio,
  fileTextIcon: FileTextIcon,
  fileCode: FileCode,
  fileArchive: FileArchive,

  // Social
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  github: Github,
  globe: Globe,
  link: Link,
  externalLink: ExternalLink,

  // UI
  grid: Grid,
  list: List,
  calendar: Calendar,
  clock: Clock,
  star: Star,
  heart: Heart,
  thumbsUp: ThumbsUp,
  thumbsDown: ThumbsDown,
  flag: Flag,
  bookmark: Bookmark,
  share: Share,
  moreHorizontal: MoreHorizontal,
  moreVertical: MoreVertical,
  settingsIcon: SettingsIcon,
  bell: Bell,
  bellOff: BellOff,

  // Business
  creditCard: CreditCard,
  dollarSign: DollarSign,
  shoppingCart: ShoppingCart,
  shoppingBag: ShoppingBag,
  gift: Gift,
  award: Award,
  target: Target,
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
  barChart3: BarChart3,
  pieChart: PieChart,
  activity: Activity,

  // Devices
  monitor: Monitor,
  smartphone: Smartphone,
  tablet: Tablet,
  laptop: Laptop,
  printer: Printer,
  wifi: Wifi,
  wifiOff: WifiOff,
  bluetooth: Bluetooth,
  battery: Battery,
  batteryCharging: BatteryCharging,

  // Weather
  sun: Sun,
  moon: Moon,
  cloud: Cloud,
  cloudRain: CloudRain,
  cloudSnow: CloudSnow,
  wind: Wind,
  umbrella: Umbrella,
};

// Main Icon component
export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color = 'primary',
  className = '',
  onClick,
  disabled = false,
  title,
}) => {
  const IconComponent = iconMap[name as keyof typeof iconMap];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in icon library`);
    return null;
  }

  const iconSize = sizeMap[size];
  const iconColor = colorMap[color as keyof typeof colorMap] || color;

  return (
    <IconComponent
      size={iconSize}
      color={iconColor}
      className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      onClick={disabled ? undefined : onClick}
      aria-label={title || name}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
    />
  );
};

// Icon button component
export interface IconButtonProps extends IconProps {
  variant?: 'solid' | 'outline' | 'ghost';
  rounded?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  variant = 'ghost',
  rounded = false,
  className = '',
  ...iconProps
}) => {
  const baseClasses =
    'inline-flex items-center justify-center transition-all duration-200';

  const variantClasses = {
    solid: 'bg-primary text-white hover:bg-primary/90',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-600 hover:bg-gray-100',
  };

  const roundedClasses = rounded ? 'rounded-full' : 'rounded-md';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${roundedClasses} ${className}`}
      onClick={iconProps.onClick}
      disabled={iconProps.disabled}
      title={iconProps.title}
    >
      <Icon {...iconProps} />
    </button>
  );
};

// Icon group component
export interface IconGroupProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg';
}

export const IconGroup: React.FC<IconGroupProps> = ({
  children,
  className = '',
  spacing = 'md',
}) => {
  const spacingClasses = {
    sm: 'space-x-1',
    md: 'space-x-2',
    lg: 'space-x-3',
  };

  return (
    <div
      className={`flex items-center ${spacingClasses[spacing]} ${className}`}
    >
      {children}
    </div>
  );
};

// Export all icons for direct use
export { iconMap };
export default Icon;
