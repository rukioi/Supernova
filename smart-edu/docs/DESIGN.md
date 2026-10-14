---
name: Supernova
description: A confident, colorful workspace for teachers to plan, guide, and interpret gamified learning.
colors:
  ink: "#091b3a"
  text: "#0b1933"
  muted: "#52627a"
  muted-soft: "#edf1f7"
  canvas: "#f5f7fc"
  surface: "#ffffff"
  line: "#dce3ef"
  action: "#2557f5"
  action-strong: "#193bb8"
  success: "#216344"
  success-soft: "#dff2e8"
  attention: "#943d24"
  attention-soft: "#ffe1cb"
  error: "#a63838"
  discovery: "#654090"
  discovery-soft: "#e8ddf8"
  achievement: "#ddf45a"
  sky-soft: "#cfe2ff"
  electric: "#3984ff"
  purple: "#8a63e8"
  mint: "#bfead7"
  coral: "#ff795b"
typography:
  display:
    fontFamily: "Studio Display, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 3.875rem)"
    fontWeight: 700
    lineHeight: 1.02
  body:
    fontFamily: "Studio Sans, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  support:
    fontFamily: "Studio Sans, Arial, sans-serif"
    fontSize: "13px"
    lineHeight: 1.6
  label:
    fontFamily: "Studio Sans, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  control: "10px"
  surface: "16px"
  pill: "999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  6: "24px"
  8: "32px"
  12: "48px"
  16: "64px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.surface}"
    rounded: "11px"
    padding: "12px 17px"
    height: "46px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "11px"
    padding: "12px 17px"
    height: "46px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.surface}"
    padding: "24px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    height: "46px"
---

# Design System: Supernova

## Overview

**Creative North Star: “The Learning Field Journal.”** Supernova combines the clarity of a teacher’s working notebook with the energy of a learning journey. Its visual voice is editorial and structured, while color, milestones, team play, and mascots make progress feel tangible. Teachers remain in control of planning and interpretation.

The interface should be modern, warm, colorful, recognizable, and professional. Personality should come from meaningful learning context and evidence, not decoration. The product must not feel childish, chaotic, generic, or assembled from interchangeable AI-generated patterns.

**Key Characteristics:** teacher-led, evidence-aware, energetic but composed, progressive, product-specific.

## Colors

The palette pairs deep navy and cool paper with vivid cobalt, a sharp achievement yellow, and distinct success, attention, and discovery hues. Use color to communicate state and next action; never make color the only signal.

### Primary
- **Cobalt Action** (`{colors.action}`): Main actions, current navigation, progress, and interactive emphasis.
- **Deep Navy** (`{colors.ink}`): Product identity, important text, and strong structural anchors.

### Secondary
- **Electric Blue** (`{colors.electric}`): A brighter accent for active learning moments and small visual highlights.
- **Discovery Violet** (`{colors.discovery}`): Exploration and discovery states.
- **Achievement Lime** (`{colors.achievement}`): Earned milestones, rewards, and high-salience achievement cues; use sparingly.

### Tertiary
- **Learning Green** (`{colors.success}`): Confirmed positive evidence and completed learning states.
- **Attention Terracotta** (`{colors.attention}`): Needs follow-up, review, or support.
- **Coral** (`{colors.coral}`): Warm supporting accent for challenges and selected game details.

### Neutral
- **Learning Ink** (`{colors.text}`): Default text.
- **Quiet Slate** (`{colors.muted}`): Supporting text and metadata.
- **Cool Paper** (`{colors.canvas}`): Application canvas.
- **Clean White** (`{colors.surface}`): Cards, dialogs, controls, and navigation surfaces.
- **Fine Line** (`{colors.line}`): Borders, dividers, and tracks.
- **Soft Green, Violet, Sky, Peach, and Neutral** (`{colors.success-soft}`, `{colors.discovery-soft}`, `{colors.sky-soft}`, `{colors.attention-soft}`, `{colors.muted-soft}`): Low-intensity semantic fills behind readable labels and content.

**The Meaningful Color Rule.** A color communicates an action, learning state, or product identity; do not add a new accent without assigning it a role.

## Typography

**Display Font:** Studio Display (with Georgia fallback, reserved for editorial titles and large collection numerals)
**Body Font:** Studio Sans (with Arial fallback)
**Label/Mono Font:** Studio Sans; no decorative monospace role.

**Character:** Studio Sans keeps dense teacher workflows readable and direct. Studio Display adds a distinct editorial voice only where the content can support a larger, expressive title.

### Hierarchy
- **Display** (700, `clamp(2.5rem, 5vw, 3.875rem)`, line-height 1.02): Select editorial page titles and collection numerals.
- **Headline** (700, 40px, line-height 1.15): Functional page titles.
- **Title** (700, 23px, line-height 1.3): Main sections and panels.
- **Body** (400, 15px, line-height 1.6): Main reading and workflow copy; keep line length near 65–75 characters where layout allows.
- **Support** (400–600, 13px, line-height 1.6): Secondary explanations, evidence sources, and control text.
- **Label** (600, 11px, line-height 1.5, modest tracking): Short section markers and statuses; do not use as the only content label.

**The One Font Pair Rule.** Functional text uses Studio Sans. Studio Display is reserved for selected editorial emphasis, never tables, controls, or dense labels.

## Layout

Teacher workflows use a centered content area with a responsive page gutter and clear separation between context, action, and evidence. Dashboard and results favor a strong primary column with supporting context; lists and preparation steps prioritize scan order over uniform card grids.

The spacing rhythm uses 4, 8, 12, 16, 24, 32, 48, and 64px. Main content is capped near 1440px. Route-specific responsive breakpoints are 1200, 1100, 1000, 900, 760, and 600px; use only the breakpoint needed by a real layout change. On small screens, global navigation becomes bottom navigation, columns stack, and dense data receives a readable presentation rather than simply smaller type.

## Elevation & Depth

Depth is restrained. Borders and tonal surfaces carry most structure; a soft shadow is reserved for raised panels or overlays. Avoid persistent glow and stacked borders-plus-shadows that make every panel look equally elevated.

### Shadow Vocabulary
- **Surface lift** (`{colors.ink}` at low opacity, 0 6px 24px): Raised cards and panels when separation from the canvas is needed.
- **Overlay lift** (0 12px 32px with a soft neutral tint): Menus and dialogs.

## Shapes

Controls use gently rounded corners (10px); primary actions use 11px; content surfaces use 16px; compact status chips may be pill-shaped. Use borders for clear grouping and preserve distinct focus rings. Avoid rounding every nested element into a pill.

## Components

Shared primitives are implemented in `components/product/journey-ui.tsx`, `components/product/editorial-motion.tsx`, `components/product/ui.tsx`, and the existing Base UI/Radix wrappers under `components/ui/`. Route-specific layouts may compose these primitives but should not redefine their core visual state.

### Buttons
- **Shape:** Confident, comfortably rounded controls (11px), at least 44px high for touch use.
- **Primary:** Cobalt background and white text; 12px 17px padding; clear pressed, disabled, and focus-visible states.
- **Secondary / Ghost:** White with a fine border, or transparent with action-colored text; preserve a 44px touch area even when the visible icon is compact.
- **Hover / Focus:** Use a subtle color shift and a 3px action-colored focus outline; do not depend on hover alone.

### Chips
- **Style:** Compact semantic fills with readable foreground colors; pill form is reserved for state and filter chips.
- **State:** Success, attention, action, discovery, achievement, and neutral states use both text and color.

### Cards / Containers
- **Corner Style:** 16px content surfaces.
- **Background:** White over the cool-paper canvas.
- **Shadow Strategy:** Flat at rest by default; use one soft shadow only for meaningful elevation.
- **Border:** Fine neutral border for major content boundaries.
- **Internal Padding:** 16–32px according to content density; avoid nested cards where a divider or spacing is enough.

### Inputs / Fields
- **Style:** White surface, readable 13–15px text, fine border, 10px corners.
- **Focus:** Visible 3px action ring with offset.
- **Error / Disabled:** Keep the field label visible, connect an error message to the field, and make disabled state clear without relying on opacity alone.

### Navigation
- **Style:** Horizontal global navigation with the current area clearly marked and course context adjacent to the brand.
- **Mobile treatment:** Dedicated bottom navigation; retain route context without crowding the header.
- **Tabs:** Shared local tabs use selected state, visible keyboard focus, and arrow/Home/End navigation.

### Learning Journey
- Ordered milestones show completed, current, and upcoming stages. Progress labels explain the measured activity and value. Reward points remain distinct from evidence of learning.

## Do's and Don'ts

### Do:
- **Do** preserve teacher control in planning, review, approval, and publication.
- **Do** label demonstration data and identify the evidence behind learning claims.
- **Do** pair every important metric with context and a useful next step.
- **Do** use mascots for guidance, celebration, or an empty-state invitation, with one clear role per appearance.
- **Do** preserve keyboard focus and state changes when motion is reduced.

### Don't:
- **Don't** use reward points as a proxy for learning evidence.
- **Don't** use mascots as filler or place them on every screen by default.
- **Don't** use color as the only carrier of success, warning, selection, or progress.
- **Don't** create a second token system or cover legacy styles with a new global override layer.
- **Don't** use decorative motion on every card or content section.
