# 🎨 Icon Library Documentation

## 📋 Overview

The icon library provides a comprehensive set of icons for the Next.js application, combining Lucide React icons with custom brand-specific icons. The system is designed to be consistent, accessible, and easy to use.

## 🛠 Tech Stack

### **Primary Technology:**

- **Lucide React**: Modern, customizable SVG icons
- **TypeScript**: Full type safety
- **React**: Component-based architecture
- **Tailwind CSS**: Utility classes for styling

### **Why Lucide React?**

- ✅ **Lightweight**: Only 2.5KB gzipped
- ✅ **Tree-shakable**: Only imports what you use
- ✅ **TypeScript**: Full type safety
- ✅ **Customizable**: Easy to customize colors and sizes
- ✅ **Accessible**: Built-in ARIA attributes
- ✅ **Modern**: SVG-based, crisp at any size

## 📁 File Structure

```
src/components/icons/
├── IconLibrary.tsx      # Main icon library component
├── CustomIcons.tsx      # Custom brand-specific icons
└── index.ts            # Export file (optional)
```

## 🚀 Usage

### **Basic Icon Usage**

```tsx
import { Icon } from '@/components/icons/IconLibrary';

// Basic icon
<Icon name="home" size="md" color="primary" />

// With click handler
<Icon
  name="save"
  size="lg"
  color="success"
  onClick={() => handleSave()}
  title="Save document"
/>
```

### **Icon Button Usage**

```tsx
import { IconButton } from '@/components/icons/IconLibrary';

// Solid button
<IconButton
  name="save"
  size="md"
  color="success"
  variant="solid"
  onClick={() => handleSave()}
  title="Save"
/>

// Outline button
<IconButton
  name="edit"
  size="sm"
  color="primary"
  variant="outline"
  onClick={() => handleEdit()}
/>

// Ghost button
<IconButton
  name="trash"
  size="md"
  color="error"
  variant="ghost"
  onClick={() => handleDelete()}
/>
```

### **Icon Group Usage**

```tsx
import { IconGroup } from '@/components/icons/IconLibrary';

<IconGroup spacing="md">
  <Icon name="edit" size="sm" color="primary" />
  <Icon name="trash" size="sm" color="error" />
  <Icon name="eye" size="sm" color="info" />
</IconGroup>;
```

### **Custom Icons Usage**

```tsx
import { customIcons } from '@/components/icons/CustomIcons';

// Custom loading spinner
<customIcons.loadingSpinner size={20} color="#1976d2" />

// Custom company logo
<customIcons.companyLogo size={24} color="#1976d2" />
```

## 🎨 Available Icons

### **Lucide React Icons (100+ icons)**

#### **Navigation Icons**

- `menu`, `menuOpen`, `home`, `settings`, `user`, `users`
- `building`, `fileText`, `image`, `palette`

#### **Action Icons**

- `upload`, `download`, `save`, `trash`, `edit`
- `eye`, `eyeOff`, `plus`, `minus`, `close`, `check`

#### **Arrow Icons**

- `chevronDown`, `chevronUp`, `chevronLeft`, `chevronRight`
- `arrowLeft`, `arrowRight`, `arrowUp`, `arrowDown`

#### **Media Icons**

- `camera`, `video`, `mic`, `micOff`
- `volume`, `volumeX`, `volume1`, `volume2`

#### **File Icons**

- `file`, `folder`, `folderOpen`
- `fileImage`, `fileVideo`, `fileAudio`, `fileTextIcon`, `fileCode`, `fileArchive`

#### **Social Icons**

- `facebook`, `twitter`, `instagram`, `linkedin`
- `youtube`, `github`, `globe`, `link`, `externalLink`

#### **UI Icons**

- `grid`, `list`, `calendar`, `clock`, `star`, `heart`
- `thumbsUp`, `thumbsDown`, `flag`, `bookmark`, `share`

#### **Business Icons**

- `creditCard`, `dollarSign`, `shoppingCart`, `shoppingBag`
- `gift`, `award`, `target`, `trendingUp`, `trendingDown`

#### **Device Icons**

- `monitor`, `smartphone`, `tablet`, `laptop`
- `printer`, `wifi`, `wifiOff`, `bluetooth`, `battery`, `batteryCharging`

#### **Weather Icons**

- `sun`, `moon`, `cloud`, `cloudRain`, `cloudSnow`, `wind`, `umbrella`

### **Custom Icons**

#### **Status Icons**

- `loadingSpinner`: Animated loading spinner
- `successCheck`: Success checkmark in circle
- `errorX`: Error X in circle
- `warningTriangle`: Warning triangle
- `infoCircle`: Information circle

#### **Navigation Icons**

- `hamburgerMenu`: Three horizontal lines
- `closeX`: X close button

#### **Brand Icons**

- `companyLogo`: Custom company logo icon

## 📏 Size Variants

| Size  | Pixels | Usage             |
| ----- | ------ | ----------------- |
| `xs`  | 12px   | Very small icons  |
| `sm`  | 16px   | Small icons       |
| `md`  | 20px   | Default size      |
| `lg`  | 24px   | Large icons       |
| `xl`  | 32px   | Extra large icons |
| `2xl` | 48px   | Very large icons  |

## 🎨 Color Variants

| Color       | Hex Code | Usage                |
| ----------- | -------- | -------------------- |
| `primary`   | #1976d2  | Primary actions      |
| `secondary` | #64748b  | Secondary actions    |
| `success`   | #10b981  | Success states       |
| `warning`   | #f59e0b  | Warning states       |
| `error`     | #ef4444  | Error states         |
| `info`      | #3b82f6  | Information          |
| `muted`     | #9ca3af  | Disabled states      |
| `white`     | #ffffff  | On dark backgrounds  |
| `black`     | #000000  | On light backgrounds |

## ♿ Accessibility Features

### **Built-in Accessibility**

- **ARIA Labels**: Automatic aria-label generation
- **Keyboard Navigation**: Tab index support for clickable icons
- **Screen Reader Support**: Proper role attributes
- **Focus Indicators**: Visual focus states

### **Best Practices**

```tsx
// Always provide a title for context
<Icon name="save" title="Save document" />

// Use appropriate roles for interactive icons
<Icon name="menu" onClick={toggleMenu} role="button" />

// Provide descriptive aria-labels
<Icon name="trash" aria-label="Delete item" onClick={handleDelete} />
```

## 🔧 Customization

### **Adding New Lucide Icons**

1. Import the icon from lucide-react:

```tsx
import { NewIcon } from 'lucide-react';
```

2. Add to the iconMap in `IconLibrary.tsx`:

```tsx
const iconMap = {
  // ... existing icons
  newIcon: NewIcon,
};
```

### **Creating Custom Icons**

1. Create a new icon component in `CustomIcons.tsx`:

```tsx
export const CustomIcon: React.FC<CustomIconProps> = ({
  size = 24,
  color = '#1976d2',
  className = '',
  onClick,
  disabled = false,
  title,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    onClick={disabled ? undefined : onClick}
    title={title}
    aria-label={title || 'Custom Icon'}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick && !disabled ? 0 : undefined}
  >
    {/* SVG path data */}
  </svg>
);
```

2. Add to the customIcons export:

```tsx
export const customIcons = {
  // ... existing icons
  customIcon: CustomIcon,
};
```

## 📱 Responsive Design

### **Mobile Optimization**

- Icons scale appropriately on mobile devices
- Touch-friendly minimum sizes (44px for interactive icons)
- Proper spacing for mobile interfaces

### **Responsive Sizing**

```tsx
// Responsive icon sizing
const iconSize = responsive.isMobile ? 'sm' : 'md';
<Icon name="menu" size={iconSize} />;
```

## 🎯 Performance Optimization

### **Tree Shaking**

- Only imported icons are included in the bundle
- Unused icons are automatically removed during build

### **Memoization**

- Icons are memoized to prevent unnecessary re-renders
- Expensive calculations are cached

### **Bundle Size**

- Lucide React: ~2.5KB gzipped
- Custom icons: Minimal additional size
- Total icon library: <5KB gzipped

## 🧪 Testing

### **Icon Library Test Page**

Visit `/test/icon-library` to see all available icons with:

- Interactive size and color controls
- Search functionality
- Usage examples
- Code snippets

### **Testing Icons**

```tsx
// Test icon rendering
<Icon name="home" size="md" color="primary" />

// Test icon interactions
<Icon name="save" onClick={() => console.log('Save clicked')} />

// Test accessibility
<Icon name="menu" title="Toggle menu" aria-label="Toggle navigation menu" />
```

## 🔄 Migration Guide

### **From Material-UI Icons**

```tsx
// Before
import MenuIcon from '@mui/icons-material/Menu';
<MenuIcon />;

// After
import { Icon } from '@/components/icons/IconLibrary';
<Icon name="menu" />;
```

### **From Heroicons**

```tsx
// Before
import { HomeIcon } from '@heroicons/react/24/outline';
<HomeIcon />;

// After
import { Icon } from '@/components/icons/IconLibrary';
<Icon name="home" />;
```

## 📈 Future Enhancements

### **Planned Features**

- [ ] Icon animation support
- [ ] Icon themes (light/dark mode)
- [ ] Icon font fallback
- [ ] Icon sprite optimization
- [ ] Icon search and filtering
- [ ] Icon usage analytics

### **Performance Improvements**

- [ ] Icon preloading
- [ ] Icon caching
- [ ] Lazy icon loading
- [ ] Icon compression

## 🎉 Conclusion

The icon library provides a comprehensive, accessible, and performant icon system for the Next.js application. With over 100+ Lucide React icons and custom brand icons, it offers everything needed for modern web applications while maintaining excellent performance and accessibility standards.
