# DevHive UI/UX Design Document

# SECTION 1 --- DESIGN SYSTEM

## 1.1 Design Philosophy Statement

DevHive follows a developer-first design philosophy where productivity
and clarity take precedence over engagement metrics. Unlike typical
social platforms, the interface is intentionally minimal, focusing
attention on code, knowledge sharing, and collaboration. Every element
must serve a functional purpose---if a UI component does not directly
help a developer learn, build, or collaborate, it does not belong in the
interface.

The platform is designed to support both beginners and experienced
developers. Beginners should feel welcomed by clear visual hierarchy,
readable code blocks, and intuitive layouts that guide them toward
learning. Experienced developers benefit from dense information layouts,
keyboard-first interactions, and minimal visual clutter that allows fast
scanning and decision-making.

A distraction‑free design means removing vanity metrics, excessive color
usage, and intrusive notifications. DevHive intentionally minimizes
follower counts, avoids aggressive notification badges, and keeps the
focus on knowledge, collaboration rooms, and problem-solving. The result
is an interface that feels closer to a professional developer tool than
a social media product.

------------------------------------------------------------------------

## 1.2 Color Palette

### Dark Mode (Default)

Background Primary --- #0D1117 (HSL 214, 32%, 8%)\
Used for main application background.

Background Secondary --- #161B22 (HSL 215, 24%, 13%)\
Used for cards, panels, sidebars.

Background Tertiary --- #1F2630 (HSL 214, 20%, 18%)\
Used for hover areas and inputs.

Background Elevated --- #21262D (HSL 213, 16%, 20%)\
Used for modals and dropdowns.

Border Default --- #30363D (HSL 215, 14%, 27%)\
Used for dividers.

Border Strong --- #484F58 (HSL 216, 9%, 41%)\
Used for active inputs.

Text Primary --- #E6EDF3 (HSL 210, 20%, 93%)\
Main readable text.

Text Secondary --- #9DA7B3 (HSL 215, 10%, 65%)\
Metadata and timestamps.

Text Tertiary --- #6E7681 (HSL 214, 7%, 47%)\
Placeholder text.

Brand Primary --- #3B82F6 (HSL 217, 91%, 60%)\
Primary CTA and links.

Brand Secondary --- #6366F1 (HSL 239, 84%, 67%)\
Secondary accent.

Brand Hover --- #2563EB (HSL 221, 83%, 53%)\
Hover state for links.

Success --- #22C55E\
Warning --- #F59E0B\
Error --- #EF4444\
Info --- #0EA5E9

Code Background --- #0B1220\
Code Text --- #E6EDF3

Syntax Highlighting

Keyword --- #C678DD\
String --- #98C379\
Number --- #D19A66\
Comment --- #5C6370\
Function --- #61AFEF\
Variable --- #E06C75

------------------------------------------------------------------------

### Light Mode

Background Primary --- #FFFFFF\
Background Secondary --- #F6F8FA\
Background Tertiary --- #EEF1F4\
Background Elevated --- #FFFFFF\
Border Default --- #D0D7DE\
Border Strong --- #8C959F

Text Primary --- #1F2328\
Text Secondary --- #57606A\
Text Tertiary --- #8C959F

Brand Primary --- #2563EB\
Brand Secondary --- #4F46E5\
Brand Hover --- #1D4ED8

Success --- #16A34A\
Warning --- #CA8A04\
Error --- #DC2626\
Info --- #0284C7

Code Background --- #F6F8FA\
Code Text --- #1F2328

------------------------------------------------------------------------

## 1.3 Typography System

UI Font

Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial

Chosen because Inter is optimized for digital interfaces and provides
excellent readability for dense developer interfaces.

Code Font

JetBrains Mono, Consolas, monospace

Chosen because JetBrains Mono is designed for developers with clear
character differentiation.

Display Font

Inter

------------------------------------------------------------------------

Type Scale

Display XL\
48px / 3rem\
Line Height: 56px\
Weight: 700

Display L\
40px / 2.5rem\
Line Height: 48px

Heading 1\
32px / 2rem

Heading 2\
24px / 1.5rem

Heading 3\
20px / 1.25rem

Body Large\
18px / 1.125rem

Body Default\
16px / 1rem

Body Small\
14px / 0.875rem

Caption\
12px / 0.75rem

Code Inline\
14px JetBrains Mono

Code Block\
14px JetBrains Mono

Label\
13px uppercase

Overline\
11px uppercase

------------------------------------------------------------------------

## 1.4 Spacing System

4px base grid

space‑1 = 4px\
space‑2 = 8px\
space‑3 = 12px\
space‑4 = 16px\
space‑5 = 20px\
space‑6 = 24px\
space‑7 = 28px\
space‑8 = 32px\
space‑9 = 36px\
space‑10 = 40px\
space‑12 = 48px\
space‑14 = 56px\
space‑16 = 64px\
space‑18 = 72px\
space‑20 = 80px

------------------------------------------------------------------------

## 1.5 Border Radius

radius‑xs = 2px\
radius‑sm = 4px\
radius‑md = 6px\
radius‑lg = 8px\
radius‑xl = 12px\
radius‑pill = 999px

------------------------------------------------------------------------

## 1.6 Shadow System

shadow‑sm\
0 1px 2px rgba(0,0,0,0.25)

shadow‑md\
0 4px 12px rgba(0,0,0,0.35)

shadow‑lg\
0 10px 30px rgba(0,0,0,0.45)

shadow‑xl\
0 20px 60px rgba(0,0,0,0.6)

------------------------------------------------------------------------

## 1.7 Iconography

Icon Library: Lucide Icons

Lucide chosen because: • lightweight SVG icons • developer‑focused
visual style • open source • consistent stroke width

Sizes

sm --- 16px\
md --- 20px\
lg --- 24px

------------------------------------------------------------------------

# SECTION 2 --- SCREEN WIREFRAMES

## SCREEN 1 --- LANDING PAGE

Desktop Wireframe

    +----------------------------------------------------------------------------------+
    | DevHive Logo                                             Sign In                |
    |----------------------------------------------------------------------------------|
    |                                                                              |
    |     Build. Learn. Collaborate.                                              |
    |     The developer social platform focused on code.                          |
    |                                                                              |
    |   [ Sign up with GitHub ]  [ Sign up with Email ]                            |
    |                                                                              |
    |        +--------------------------------------------------------------+      |
    |        | Live Feed Preview                                           |      |
    |        | Code snippets + discussions                                 |      |
    |        +--------------------------------------------------------------+      |
    |                                                                              |
    |   Features: Code Sharing | Collaboration Rooms | AI Debugging                |
    |                                                                              |
    +----------------------------------------------------------------------------------+

Mobile Wireframe

    +-----------------------------+
    | DevHive                     |
    |-----------------------------|
    | Build. Learn. Collaborate. |
    |                             |
    | [Sign up GitHub]           |
    | [Sign up Email]            |
    |                             |
    | Feed Preview               |
    |                             |
    | Features                   |
    +-----------------------------+

------------------------------------------------------------------------

## SCREEN 3 --- HOME FEED

Desktop Layout

    +--------------------------------------------------------------------------+
    | Sidebar        | Feed Content                       | Right Sidebar      |
    |----------------|------------------------------------|--------------------|
    | Home           | Post Card                          | Trending Tags      |
    | Explore        | --------------------------------   | #react             |
    | Rooms          | Code snippet preview               | #nodejs            |
    | Threads        |                                    |                    |
    | Notifications  | Reactions   Comments   Save        | Active Rooms       |
    | Profile        |------------------------------------|--------------------|
    +--------------------------------------------------------------------------+

Mobile Layout

    +---------------------------+
    | Feed                      |
    |---------------------------|
    | Post Card                 |
    | Code snippet              |
    | Reactions  Comments       |
    |---------------------------|
    | Bottom Nav                |
    | Home Explore Rooms Profile|
    +---------------------------+

Loading State

Skeleton cards shaped exactly like post cards with grey placeholder
blocks for avatar, title, and code block.

Empty State

Headline: "Your feed is empty."

Subtext: Follow developers or explore trending tags to start learning.

CTA: Explore Developers

------------------------------------------------------------------------

# SECTION 3 --- NAVIGATION ARCHITECTURE

Desktop Sidebar

    +---------------------+
    | DevHive             |
    |---------------------|
    | Home Feed           |
    | Explore             |
    | Collaboration Rooms |
    | Problem Threads     |
    | Notifications       |
    | Bookmarks           |
    | Focus Mode          |
    | Settings            |
    |---------------------|
    | User Avatar         |
    +---------------------+

Mobile Navigation

Bottom Tabs

Home\
Explore\
Rooms\
Notifications\
Profile

------------------------------------------------------------------------

# SECTION 4 --- UX DECISION LOG

Dark Mode Default

Decision: DevHive launches with dark mode as the default theme.

Reason: Developers spend long hours reading code. Dark mode reduces eye
strain and aligns with tools like VS Code and GitHub.

Rejected: Light mode default because developer tools overwhelmingly
prefer dark interfaces.

------------------------------------------------------------------------

Infinite Scroll Feed

Decision: Feed uses infinite scrolling.

Reason: Encourages continuous exploration of developer content without
interruption.

Rejected: Pagination because it breaks the flow of reading posts.

------------------------------------------------------------------------

# SECTION 5 --- INTERACTION DESIGN

Keyboard Shortcuts

Cmd/Ctrl + K → Open search\
Cmd/Ctrl + Enter → Submit post/comment\
Cmd/Ctrl + Shift + F → Toggle Focus Mode\
Cmd/Ctrl + N → Create new post\
Esc → Close modal

------------------------------------------------------------------------

# SECTION 6 --- MOBILE RESPONSIVENESS

Breakpoints

Mobile S\
0--375px

Mobile L\
376--480px

Tablet\
481--768px

Desktop S\
769--1024px

Desktop L\
1025--1440px

Desktop XL\
1441px+

------------------------------------------------------------------------

# SECTION 7 --- DESIGN TOKENS (CSS)

:root {

--color-bg-primary: #0D1117; --color-bg-secondary: #161B22;
--color-bg-tertiary: #1F2630;

--color-text-primary: #E6EDF3; --color-text-secondary: #9DA7B3;

--color-brand-primary: #3B82F6;

--font-ui: 'Inter', system-ui; --font-code: 'JetBrains Mono', monospace;

--space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
--space-5: 20px;

--radius-sm: 4px; --radius-md: 6px; --radius-lg: 8px;

--shadow-sm: 0 1px 2px rgba(0,0,0,0.25); --shadow-md: 0 4px 12px
rgba(0,0,0,0.35);

--duration-fast: 120ms; --duration-normal: 200ms;

--ease-standard: cubic-bezier(0.4,0,0.2,1);

}
