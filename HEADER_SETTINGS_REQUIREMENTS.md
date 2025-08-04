# Header Settings Requirements & Specifications

## 📋 **Project Overview**

- **Feature**: Header Settings Management System
- **Location**: `/admin/settings/header`
- **Status**: In Development
- **Code Standards**: Following existing project patterns

## 🎯 **Core Requirements**

### **1. Header Configuration Fields**

- [ ] **Logo Settings**
  - Upload header logo
  - Select from existing logos
  - Logo size configuration
  - Logo position (left/center/right)

- [ ] **Company Name Settings**
  - Customize company name text
  - Font size configuration
  - Font weight options
  - Text color customization

- [ ] **Header Layout**
  - Header height configuration
  - Background color settings
  - Border settings
  - Padding/margin controls

- [ ] **Menu Configuration**
  - Menu button style
  - Menu position
  - Menu visibility options

### **2. Staging Workflow**

- [ ] **Staging System**
  - Save changes to staging first
  - Preview staging changes
  - Upload to production
  - Auto-save functionality

- [ ] **Data Management**
  - Header staging table
  - Header production table
  - Data synchronization

### **3. UI/UX Requirements**

- [ ] **Header Preview**
  - Real-time preview of changes
  - Responsive preview (mobile/tablet/desktop)
  - Live updates as user types

- [ ] **Edit Mode**
  - Toggle edit mode
  - Save/Cancel functionality
  - Change detection

- [ ] **Responsive Design**
  - Mobile-friendly interface
  - Tablet optimization
  - Desktop layout

## 🏗️ **Technical Specifications**

### **Database Schema**

```sql
-- Header Staging Table
CREATE TABLE header_staging (
  id VARCHAR PRIMARY KEY,
  logo_url VARCHAR,
  company_name VARCHAR,
  header_height INTEGER,
  background_color VARCHAR,
  text_color VARCHAR,
  menu_style VARCHAR,
  status VARCHAR DEFAULT 'PENDING',
  reviewed_by VARCHAR,
  reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Header Production Table
CREATE TABLE header_production (
  id VARCHAR PRIMARY KEY,
  logo_url VARCHAR,
  company_name VARCHAR,
  header_height INTEGER,
  background_color VARCHAR,
  text_color VARCHAR,
  menu_style VARCHAR,
  status VARCHAR DEFAULT 'PUBLISHED',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **API Endpoints**

- `GET /api/header` - Fetch production header data
- `POST /api/header` - Update production header data
- `GET /api/header/staging` - Fetch staging header data
- `POST /api/header/staging` - Save to staging
- `PUT /api/header/staging` - Move staging to production

### **Component Structure**

```
src/app/admin/settings/header/
├── page.tsx (Main Header Settings Page)
├── components/
│   ├── HeaderPreview.tsx
│   ├── HeaderConfigForm.tsx
│   └── HeaderColorPicker.tsx
```

## 📝 **Code Standards**

### **State Management**

- Use `useState` for local state
- Use `useCallback` for functions in dependencies
- Use `useRef` for timeouts and DOM references
- Follow existing patterns from Company Profile page

### **Styling Standards**

- Use `useResponsiveStyles` hook
- Inline styles for consistency
- Responsive breakpoints: mobile, tablet, desktop
- Color scheme: `#1976d2` (primary), `#4caf50` (success), `#ff9800` (warning)

### **Error Handling**

- Try-catch blocks for all async operations
- User-friendly error messages
- Console logging for debugging
- Graceful fallbacks

### **Performance**

- Debounced auto-save (2-second delay)
- Optimized re-renders
- Lazy loading for large components
- Image optimization with Next.js Image

## 🔄 **Workflow Process**

### **1. Edit Mode**

1. User clicks "Edit" button
2. Form fields become editable
3. Real-time preview updates
4. Auto-save triggers on changes

### **2. Staging Process**

1. Changes saved to staging table
2. Preview shows staging data
3. User can review changes
4. "Upload to Production" moves to production

### **3. Production Update**

1. Staging data moved to production
2. Frontend header updates automatically
3. Staging data marked as approved
4. Audit trail maintained

## 🎨 **UI Components**

### **Header Preview**

- Live preview of header appearance
- Responsive preview modes
- Real-time updates
- Professional styling

### **Configuration Form**

- Organized field groups
- Validation feedback
- Clear labels and descriptions
- Intuitive controls

### **Action Buttons**

- Edit/Save/Cancel states
- Preview and Upload icons
- Consistent styling
- Clear visual feedback

## 📊 **Success Metrics**

- [ ] All configuration fields functional
- [ ] Staging workflow working
- [ ] Real-time preview updates
- [ ] Responsive design working
- [ ] Auto-save functionality
- [ ] Production upload working
- [ ] Frontend header updates

## 🚀 **Next Steps**

1. Define specific header configuration fields
2. Implement database schema
3. Create API endpoints
4. Build UI components
5. Test staging workflow
6. Deploy and validate

---

**Last Updated**: [Current Date]
**Status**: Requirements Gathering
**Next Review**: After user feedback
