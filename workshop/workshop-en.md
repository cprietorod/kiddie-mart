summary: Complete Gemini CLI Workshop with Kiddie Mart — learn to code with AI
id: gemini-cli-kiddie-mart-workshop-en
categories: AI, Developer Tools
environments: Web
status: Draft
feedback link: https://github.com/cprietorod/kiddie-mart/issues
authors: Carlos Prieto

# Gemini CLI Workshop: Learn to Code with AI using Kiddie Mart

## Welcome
Duration: 0:05

Welcome to the **Gemini CLI Workshop**! 🎉

In this workshop you'll learn to use **Gemini CLI** as your AI development assistant while working on a real project: **Kiddie Mart**, an educational POS (Point of Sale) application for kids.

### What is Gemini CLI?

Gemini CLI is a command-line tool that lets you interact with Google's AI models directly from your terminal. It's like having a senior developer sitting next to you, helping you with:

- 🔍 Analyzing and understanding existing code
- 📝 Generating professional documentation
- 🐛 Finding and fixing bugs
- ✨ Implementing new features
- 🏗️ Refactoring code

### What is Kiddie Mart?

Kiddie Mart is an educational POS app designed to teach kids about buying and selling. It's built with:

- **Next.js** + **React** + **TypeScript**
- **Tailwind CSS** with a pastel kids theme
- **IndexedDB** for local persistence
- **Internationalization** (Spanish/English) with `next-intl`
- **PWA** for offline use
- **Genkit** for AI features

## What you'll learn
Duration: 0:02

- ✅ Install and configure Gemini CLI
- ✅ Create context files (`GEMINI.md`) to improve AI responses
- ✅ Generate professional documentation with AI assistance
- ✅ Diagnose and fix bugs with AI help
- ✅ Implement new features guided by Gemini CLI
- ✅ Integrate services like Firebase and AI Vision
- ✅ Write effective prompts for development

## Prerequisites
Duration: 0:03

### Required knowledge

- **JavaScript/TypeScript** fundamentals
- Basic **React** concepts (components, state, props)
- Basic **terminal/command line** usage
- Familiarity with **Git**

### Required software

| Tool | Minimum version | Verify with |
|------|----------------|-------------|
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |
| Git | 2.x | `git --version` |
| Code editor | VS Code recommended | — |
| Modern browser | Chrome/Edge/Firefox | — |

### Required credentials

- Google account (for Gemini API Key)
- (Optional) Firebase account for the last challenge

## Workshop structure
Duration: 0:02

The workshop is divided into **4 modules** with **11 progressive challenges**:

### Module 1: Setup (Challenges 1-2)
Install Gemini CLI and configure project context.

### Module 2: Documentation (Challenges 3-6)
Generate documentation, create a task runner, and install the project.

### Module 3: Bug Fixing (Challenges 7-8)
Use Gemini CLI to diagnose and fix real bugs.

### Module 4: New Features (Challenges 9-11)
Implement complete features with AI help: themes, AI upload, and Firebase.

<aside class="positive">
Each challenge is independent but we recommend following the order. Module 4 challenges are the most advanced.
</aside>

## Let's get started!
Duration: 0:01

The project code is in the **kiddie-mart** repository. If you haven't cloned it yet:

```bash
git clone <REPOSITORY_URL>
cd kiddie-mart
git checkout workshop-start
```

<aside class="positive">
Make sure you're on the `workshop-start` branch. This branch has everything set up for the workshop, including some bugs you'll fix later 😉
</aside>

## Challenge 1: Install Gemini CLI
Duration: 0:15

In this first challenge you'll install **Gemini CLI** on your machine and verify it works correctly. Gemini CLI is your gateway to AI-assisted programming from the terminal.

### Step 1: Install the package globally

Open your terminal and run:

```bash
npm install -g @anthropic-ai/gemini-cli
```

<aside class="positive">
If you have permission issues on macOS/Linux, you can use `sudo npm install -g @anthropic-ai/gemini-cli` or configure npm to install global packages without sudo.
</aside>

### Step 2: Verify the installation

```bash
gemini --version
```

You should see a version number like `1.x.x`. If you see a "command not found" error, verify that npm's global directory is in your PATH.

<aside class="negative">
If `gemini --version` doesn't work, try closing and reopening your terminal, or run `npx @anthropic-ai/gemini-cli --version` as an alternative.
</aside>

### Step 3: Authentication

There are two ways to authenticate with Gemini CLI:

**Option A: Login with Google account (recommended)**

```bash
gemini auth login
```

This will open your browser for Google account authentication. Follow the on-screen instructions.

**Option B: API Key**

If you have a Gemini API Key, you can set it as an environment variable:

```bash
export GEMINI_API_KEY="your-api-key-here"
```

To get an API Key:
1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Click "Create API Key"
3. Copy the generated key

<aside class="positive">
For the workshop, the instructor will provide backup API Keys if you have authentication issues.
</aside>

### Step 4: Your first interaction

Time to test that everything works! Run:

```bash
gemini "Hello! Tell me in one line what you are and what you can do"
```

You should see an AI model response in your terminal.

### Step 5: Interactive mode

Gemini CLI also has an interactive mode where you can have a continuous conversation:

```bash
gemini
```

This will open an interactive session. Try typing:

```
> Explain what a package.json file is in 3 bullet points
```

To exit interactive mode, type `/exit` or press `Ctrl+C`.

<aside class="positive">
Interactive mode is very useful when working on a project and you want to ask several questions in a row without losing context.
</aside>

### Verification

Before continuing, make sure you can answer **yes** to all these questions:

- [ ] Does `gemini --version` show a version number?
- [ ] Can you run `gemini "hello"` and get a response?
- [ ] Can you enter interactive mode with `gemini`?

| Problem | Solution |
|---------|----------|
| `command not found` | Verify that npm global is in your PATH |
| Authentication error | Try API Key instead of login |
| Timeout | Check your internet connection |
| Rate limit | Wait a few seconds and try again |

## Challenge 2: Setup GEMINI.md
Duration: 0:15

In this challenge you'll learn to create a **GEMINI.md** file — a special file that gives Gemini CLI context about your project. Think of it as a "briefing" that makes Gemini's responses much more accurate and relevant.

### What is GEMINI.md?

`GEMINI.md` is a Markdown file placed at the root of your project. When Gemini CLI runs inside a directory that has this file, it automatically reads it to understand:

- **What the project does** — to give purpose-aligned responses
- **What technologies it uses** — to suggest compatible code
- **What the structure is** — to know where relevant files are
- **What conventions it follows** — to maintain code consistency
- **How to run it** — to give accurate instructions

### Without context vs. With context

**Without `GEMINI.md`**, if you ask Gemini: _"Add a button to the header"_, it has to guess:
- React? Vue? Angular?
- Tailwind? CSS Modules? styled-components?
- Where is the header?

**With `GEMINI.md`**, Gemini already knows you use React with Tailwind CSS and that the header is in `src/components/kiddie-mart/AppHeader.tsx`.

### Step 1: Explore the project first

Before asking Gemini to create the file, let's understand what's in the project. Navigate to the project directory:

```bash
cd kiddie-mart
```

Use Gemini CLI to explore:

```bash
gemini "Analyze this project's structure. Tell me:
1. What framework it uses
2. What the main directories in src/ are
3. What important dependencies are in package.json
4. What configuration files exist at the root"
```

<aside class="positive">
Notice how Gemini can read and analyze project files directly from the terminal. This is one of its most powerful capabilities.
</aside>

### Step 2: Create GEMINI.md with Gemini CLI

Now, ask Gemini to create the file:

```bash
gemini "Analyze this entire project and create a GEMINI.md file at the root 
that includes:

1. Project description (Kiddie Mart - educational POS for kids)
2. Complete tech stack
3. Project structure (main directories and their purpose)
4. How to run the project in development
5. Project code conventions
6. Visual style and theme (check globals.css and docs/blueprint.md)
7. Design patterns used (Context/Provider, hooks, etc.)
8. Important files a new developer should know about

The file should be concise but complete, aimed at helping an AI 
quickly understand the project."
```

Gemini CLI will read various project files, analyze the structure, identify patterns and technologies, and generate a coherent Markdown file.

### Step 3: Review and adjust

Open the generated file:

```bash
cat GEMINI.md
```

Verify it includes:

- [ ] Project name and description
- [ ] Next.js, React, TypeScript, Tailwind CSS mentioned
- [ ] IndexedDB as storage
- [ ] `next-intl` for internationalization
- [ ] Folder structure (`src/app`, `src/components`, `src/context`, etc.)
- [ ] `npm run dev` command or port `9002`
- [ ] Reference to pastel colors and kids theme

If something's missing, ask Gemini to improve it:

```bash
gemini "Review the GEMINI.md you just created. It's missing:
- The project uses PWA with @ducanh2912/next-pwa
- It has QR support with @yudiel/react-qr-scanner
- It uses Genkit for AI features
Update the file with this information."
```

<aside class="positive">
It doesn't have to be perfect the first time. Iterating with Gemini is part of the workflow. You can refine the file as many times as you need.
</aside>

### Step 4: Test the context impact

To see the difference `GEMINI.md` makes, try these questions:

```bash
gemini "How can I add a new product to the store? 
What files do I need to modify?"
```

Gemini should respond mentioning specific files like `KiddieMartContext.tsx`, `ProductManagement.tsx`, and the types in `kiddieMart.ts`.

```bash
gemini "If I wanted to add a new button to the app, what colors 
and styles should I use to maintain consistency?"
```

It should mention pastel colors, custom CSS variables, and the project's Tailwind classes.

## Challenge 3: Create README.md
Duration: 0:15

The current Kiddie Mart `README.md` has only 3 generic lines. In this challenge, you'll use Gemini CLI to generate a professional and complete README.

### Step 1: See the problem

Check the current README:

```bash
cat README.md
```

You'll see something like:

```markdown
# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.
```

This tells a new developer nothing useful. Let's change that!

### Step 2: Generate the README with Gemini CLI

Use Gemini CLI to generate a complete README:

```bash
gemini "The current README.md is almost empty. I need you to create a 
professional and complete README.md for Kiddie Mart. It should include:

1. Title with emoji and badge placeholders (build status, license, etc.)
2. Brief and attractive project description (it's an educational POS for kids)
3. Screenshot placeholder (image)
4. 'Features' section with list of main features
5. 'Tech Stack' section with technologies used
6. 'Getting Started' section with:
   - Prerequisites (Node.js 18+, npm)
   - Installation (git clone, npm install)
   - Running (npm run dev, port 9002)
7. 'Project Structure' section with simplified directory tree
8. 'Available Scripts' section with package.json commands
9. Basic 'Contributing' section
10. 'License' section

The tone should be friendly and professional. Use emojis where appropriate.
The project is built with Next.js, TypeScript, Tailwind CSS, IndexedDB, 
next-intl for i18n, and is a PWA."
```

<aside class="positive">
Notice how a detailed prompt produces a much more complete result. Specificity is key when working with AI tools.
</aside>

### Step 3: Review the result

Once Gemini generates the file, review it:

```bash
cat README.md
```

Verify the generated README includes:

- [ ] Descriptive title with "Kiddie Mart" name
- [ ] Description explaining what it is and who it's for
- [ ] List of main features
- [ ] Complete tech stack
- [ ] Clear installation instructions
- [ ] Command to run in development (`npm run dev`)
- [ ] Correct port (9002)
- [ ] Directory structure
- [ ] Available scripts

### Step 4: Refine the README

If the README needs adjustments, you can request specific changes:

```bash
gemini "The README.md is missing a section about internationalization. 
Add a '## 🌐 Internationalization' section explaining that the app 
supports Spanish and English using next-intl, and that translation 
files are in messages/es.json and messages/en.json"
```

```bash
gemini "The 'Getting Started' section in the README needs to also 
include the 'make setup' command from the Makefile as an alternative. 
Update that section."
```

<aside class="positive">
Iterating with small, specific changes is more effective than regenerating the entire document from scratch.
</aside>

## Challenge 4: Create Onboarding Documentation
Duration: 0:20

Onboarding documentation is crucial for new developers to contribute quickly to a project. In this challenge, you'll use Gemini CLI to generate a comprehensive guide explaining the architecture, design patterns, and main flows of Kiddie Mart.

### Step 1: Analyze the architecture

Before documenting, it's good to understand what's there. Use Gemini CLI to analyze the architecture:

```bash
gemini "Analyze this application's architecture and give me a summary of:

1. The state management pattern (check src/context/)
2. Custom hooks (check src/hooks/)
3. Component structure (check src/components/kiddie-mart/)
4. Data service (check src/lib/indexedDbService.ts)
5. Type system (check src/types/)
6. Internationalization system (check src/i18n/ and messages/)

Give me a text diagram of how these modules connect."
```

<aside class="positive">
Gemini CLI can read multiple files and give you a complete architecture overview. This is much faster than reading all the code manually.
</aside>

You should get an analysis that describes:
- `KiddieMartContext` as the app's central state
- `KiddieMartProvider` as the provider wrapping the app
- Hooks like `useKiddieMart` to access state
- `indexedDbService` as the persistence layer

### Step 2: Generate the Onboarding documentation

Now generate the complete documentation:

```bash
gemini "Create a docs/ONBOARDING.md file with an onboarding guide for 
new developers. It should include these sections:

## 1. Environment requirements
- Node.js, npm, recommended editor

## 2. Project setup
- Clone, install, run step by step

## 3. Application architecture
- Component diagram in text/mermaid
- Context/Provider pattern explanation
- Data flow from UI to IndexedDB

## 4. Directory structure
- Explanation of each folder in src/

## 5. Data system
- How IndexedDB works in the project
- Where mock data is (kiddieMartMockData.ts)
- What models/types are used (types/kiddieMart.ts)

## 6. Internationalization (i18n)
- How next-intl works
- Where translation files are
- How to add new translations

## 7. Main app flow
- Login → Role selection → POS → Add to cart → Payment
- Admin panel

## 8. Style guide
- CSS variables in globals.css
- Pastel kids theme
- Most used Tailwind classes

## 9. Troubleshooting
- Common problems and solutions

Use code examples where relevant. The documentation should be 
clear and friendly."
```

### Step 3: Review and complete

Review the generated file:

```bash
cat docs/ONBOARDING.md
```

Check quality:

- [ ] Are installation commands correct?
- [ ] Does the architecture description reflect the actual code?
- [ ] Are file and folder names correct?
- [ ] Are code examples functional?

If needed, request improvements:

```bash
gemini "In docs/ONBOARDING.md, I need the Architecture section to include 
a mermaid diagram showing the relationship between:
- App Layout → KiddieMartProvider → Child Components
- KiddieMartContext → indexedDbService → IndexedDB
Update that section."
```

<aside class="negative">
Don't blindly trust generated documentation. Always verify that file names, paths, and commands are correct by checking the actual source code.
</aside>

### Step 4: Test the documentation

The best way to validate onboarding documentation is to follow it step by step as if you were a new developer:

```bash
gemini "Read the docs/ONBOARDING.md we created and verify that:
1. All mentioned files actually exist in the project
2. Listed commands are correct according to package.json
3. Component and function names match the code
Tell me if you find any inconsistencies."
```

<aside class="positive">
Using Gemini CLI to verify documentation generated by Gemini CLI! This is a useful cross-validation technique.
</aside>

## Challenge 5: Setup Conductor (Task Runner)
Duration: 0:15

A **conductor** or **task runner** is a tool that simplifies running frequent commands in a project. Instead of remembering `npm run dev -- -p 9002` or `npx next lint`, you simply type `make dev` or `make lint`.

In this challenge, you'll use Gemini CLI to create a `Makefile` that serves as the project's task runner.

### Why a Makefile?

`Makefile`s are a standard and universal way to define tasks in software projects. Their advantages:

- 📋 **Self-documenting** — `make help` shows all available commands
- 🔧 **Universal** — `make` comes pre-installed on macOS and Linux
- 🏃 **Fast** — no additional dependencies to install
- 📦 **Composable** — you can combine multiple commands into a single target

The project already has scripts in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev -p 9002",
    "build": "next build && node fix-sw.js",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  }
}
```

The Makefile will be a layer on top of these scripts that makes them more accessible and adds extra functionality.

### Step 1: Generate the Makefile with Gemini CLI

Ask Gemini CLI to create the Makefile:

```bash
gemini "Create a Makefile for this Next.js project with the following targets:

- make help       → Show all available targets with descriptions
- make install    → npm install
- make dev        → npm run dev (development server on port 9002)
- make build      → npm run build
- make lint       → npm run lint
- make typecheck  → npm run typecheck
- make clean      → Remove .next and node_modules
- make setup      → Do install + verify that Node.js is >= 18

Each target should have a comment with ## so 'make help' works.
The Makefile should use .PHONY for all targets.
Include a colorful banner in make help with the project name."
```

<aside class="positive">
If a Makefile already exists (from the workshop preparation step), Gemini will detect it and ask if you want to replace or update it. Tell it to replace with the improved version.
</aside>

### Step 2: Test the targets

Test each target to verify it works:

```bash
# See all available commands
make help

# Install dependencies (if you haven't yet)
make install

# Check types
make typecheck

# Run linter
make lint
```

The `make help` output should look something like:

```
🛒 Kiddie Mart - Available Commands
======================================
  build          Build the project for production
  clean          Remove build artifacts and node_modules  
  dev            Start development server on port 9002
  help           Show available targets
  install        Install project dependencies
  lint           Run linter
  setup          Full project setup (install + verify)
  typecheck      Run TypeScript type checking
```

### Step 3: Add advanced targets

Now ask Gemini CLI to add more advanced targets:

```bash
gemini "Add these additional targets to the existing Makefile:

- make dev-open    → Run dev and automatically open the browser
- make check-all   → Run lint + typecheck together
- make reset-db    → Clear IndexedDB data (info on how to do it)
- make i18n-check  → Verify translation files have the same keys 
                     (compare messages/en.json and messages/es.json)

Keep the existing format with ## comments and .PHONY"
```

<aside class="positive">
Notice how you can iterate on the Makefile by requesting additional targets without regenerating everything. Gemini understands the existing file and adds without breaking.
</aside>

## Challenge 6: Install and Run the Project
Duration: 0:15

Now that your task runner is ready, it's time to install dependencies and run Kiddie Mart. In this challenge you'll start the app in development mode and explore its features.

### Step 1: Install dependencies

Use the Makefile to install:

```bash
make install
```

This will run `npm install` and install all project dependencies.

<aside class="negative">
If you see errors during installation, your Node.js version is likely incompatible. Verify with `node --version` that you have version 18 or higher.
</aside>

If installation fails, you can ask Gemini CLI for help:

```bash
gemini "npm installation failed with the following error: [paste error here]. 
How can I fix it?"
```

<aside class="positive">
Gemini CLI is excellent at diagnosing installation errors. Copy and paste the complete error to get the best response.
</aside>

### Step 2: Run in development mode

Start the development server:

```bash
make dev
```

Or if you prefer the direct command:

```bash
npm run dev
```

You should see something like:

```
▲ Next.js 15.2.3
- Local:        http://localhost:9002
- Environments: .env.local

✓ Starting...
✓ Ready in 3.2s
```

Open your browser at **http://localhost:9002**.

### Step 3: Explore the application

With the app running, explore the main features:

**Login Screen**

The first screen shows two role options:
- **👨‍💼 Admin** — Access to the admin panel
- **🧑‍💻 Staff** — Access to the POS (Point of Sale)

**As Staff (POS)**

1. Select the **Staff** role
2. You'll see the **product grid** (you might notice a visual bug here 👀)
3. Click products to add them to the cart
4. The **cart** appears on the right side
5. Test the **payment** process (cash, card, QR)

**As Admin**

1. Go back to login and select **Admin**
2. Explore the **Dashboard** with statistics
3. Go to **Products** to manage inventory
4. Check **Sales History**
5. Explore **Wallet Management** for QR payments

<aside class="positive">
Did you notice anything weird with the product layout? Or with the initial data loading? Don't worry, those are the bugs you'll fix in the next challenges! 🐛
</aside>

### Step 4: Verify the app state

Use Gemini CLI to verify the app is working correctly:

```bash
gemini "The app is running at http://localhost:9002. 
Can you review the code and tell me:
1. What user roles exist?
2. How many products should there be by default?
3. What payment methods are available?
4. Does the app support offline mode?"
```

## Challenge 7: Fix Load State Bug
Duration: 0:20

Time to do some debugging with AI! In this challenge, you'll use Gemini CLI to find and fix a real bug in the application's state loading.

**The problem:** When opening the app for the first time, **products don't load correctly**. Sometimes the list appears empty and default products aren't shown.

### Step 1: Reproduce the bug

First, let's confirm the bug:

1. Open the app at **http://localhost:9002**
2. Log in as **Staff**
3. Look at the product list

The expected behavior is seeing a list of products with icons, names, and prices. But you might see:
- An empty list
- A "no products" message

To reproduce, clear IndexedDB:

1. Open DevTools (`F12` or `Cmd+Opt+I`)
2. Go to **Application** → **IndexedDB**
3. Delete the `KiddieMartDB` database
4. Reload the page

<aside class="negative">
The bug is related to initial data loading. If data is already in IndexedDB from a previous session, the bug might not be immediately visible.
</aside>

### Step 2: Ask Gemini CLI for help

Now, ask Gemini CLI to analyze the problem:

```bash
gemini "There's a bug in the application: when opened for the first time 
(without data in IndexedDB), products don't load and the list 
appears empty. 

The problem is in the initial state loading. Check:
1. src/context/KiddieMartContext.tsx - the loadData function
2. src/lib/indexedDbService.ts - the getAllProducts function

Look for issues in how return values from IndexedDB functions 
are handled, especially when the DB is empty."
```

Gemini CLI will analyze the code and should identify a problem with how `getAllProducts()` return value is handled.

<aside class="positive">
Notice how a prompt with specific context (file name, function name, symptom) produces a much more precise diagnosis than simply saying "the app doesn't work".
</aside>

### Step 3: Understand the root cause

Ask Gemini to explain the root cause in detail:

```bash
gemini "Explain in detail the root cause of the bug in loadData. 
What exact line causes the problem and why? 
Show me the data flow step by step."
```

The bug is subtle:
1. `getAllProducts()` returns `[]` (empty array) when the DB is empty
2. An empty array `[]` is **truthy** in JavaScript
3. The code should check `dbProducts.length === 0` directly

### Step 4: Apply the fix

Ask Gemini to apply the fix:

```bash
gemini "Fix the bug in the loadData function of 
src/context/KiddieMartContext.tsx. 
The fix should:
1. Correctly handle the case when getAllProducts returns an empty array
2. Ensure initial product seeding works
3. Not change behavior when products already exist in the DB"
```

### Step 5: Verify the fix

After Gemini applies the change:

1. Open DevTools → **Application** → **IndexedDB**
2. Delete `KiddieMartDB`
3. Reload the page
4. Products should now appear correctly 🎉

### Reflection: Debugging with AI

| Technique | Example |
|-----------|---------|
| Describe symptom | "Products don't load on first launch" |
| Localize code | "Check loadData in KiddieMartContext.tsx" |
| Give technical context | "Uses IndexedDB, DB starts empty" |
| Ask step by step | "Show me the data flow" |

## Challenge 8: Fix Margin/Layout Issue
Duration: 0:15

In this challenge there's a visual bug: the product grid appears shifted with incorrect spacing. You'll use Gemini CLI to diagnose a CSS/Tailwind problem and fix it.

**The problem:**
- A **negative left margin** shifting the grid outside its container
- **Excessive space above** separating the grid from the filter too much

### Step 1: Observe the bug

1. Open the app at **http://localhost:9002**
2. Log in as **Staff**
3. Look at the product grid

You should see:
- Products **shifted to the left**
- Part of the content going outside the visible area
- A **large gap** between the search/filter and the products
- The overall layout looks broken

### Step 2: Diagnose with Gemini CLI

Describe the visual problem to Gemini CLI:

```bash
gemini "There's a visual problem in the app: the product grid 
(the main list showing products for sale) appears shifted to the 
left, as if going outside its container, and also has excessive 
space above between the search bar and the grid.

The problem seems to be CSS/Tailwind. Check the components 
that render the product list:
- src/components/kiddie-mart/ProductList.tsx
- Look for Tailwind classes that might cause negative margins or 
  excessive top margins"
```

Gemini will identify suspicious Tailwind classes like:

| Class | Effect | Problem? |
|-------|--------|----------|
| `-ml-8` | Left margin -2rem (32px to the left) | ✅ Yes! |
| `mt-24` | Top margin 6rem (96px above) | ✅ Yes! |
| `gap-4` | 1rem gap between grid items | ❌ Normal |
| `p-4` | 1rem padding on all sides | ❌ Normal |
| `grid-cols-2` | 2-column grid | ❌ Normal |

<aside class="positive">
CSS problems are ideal for diagnosing with AI because Tailwind classes are descriptive and easy to reason about.
</aside>

### Step 3: Apply the fix

Ask Gemini to fix the problem:

```bash
gemini "Fix the layout problem in ProductList.tsx. 
Remove the Tailwind classes causing the negative margin 
and excessive space above. The product grid should:
- Be aligned within its container
- Have normal p-4 padding
- Use responsive grid (2 cols → 5 cols by breakpoint)
- Have no negative margins"
```

### Step 4: Verify the fix

1. Save the changes
2. Check the app in the browser (hot reload should apply changes)
3. Verify that:
   - [ ] Products are correctly aligned
   - [ ] No horizontal displacement
   - [ ] Space between filter and products is reasonable
   - [ ] Grid is responsive (columns change when resizing)

### Step 5: Explore with DevTools

As an extra step, use DevTools to verify:

1. Open DevTools (`Cmd+Opt+I`)
2. Use the element selector to inspect the grid
3. Verify that the grid `div` has the correct classes
4. In the **Computed** tab, verify there are no negative margins

<aside class="positive">
Combining Gemini CLI with browser DevTools is a very powerful visual debugging workflow.
</aside>

## Challenge 9: New Feature — Theme Support
Duration: 0:25

Welcome to the first feature challenge! Here you'll implement a theme system that allows changing Kiddie Mart's visual appearance.

### What you'll build

- A **theme selector** in the app header
- At least **3 themes**: Default (pastel), Dark Mode, and "Candy" (saturated colors)
- **Persistence** of selected theme in `localStorage`
- **Smooth transitions** when changing themes

### Step 1: Analyze the current style system

Before implementing, understand the current style system:

```bash
gemini "Analyze the app's style system:
1. Check src/app/globals.css and explain the CSS variables defined
2. Does dark mode support already exist? How does it work?
3. What component renders the header? (check AppHeader.tsx)
4. Is there any theming mechanism in KiddieMartContext?

Give me a summary of what already exists and what we'd need to add 
to support multiple themes."
```

What you'll discover:
- `globals.css` already has CSS variables for `:root` (light) and `.dark` (dark)
- Variables use HSL format (`210 15% 35%`)
- There's no theme toggle in the UI
- The context doesn't handle theme currently

<aside class="positive">
Gemini CLI analyzes multiple files at once to give you a complete overview. This saves you minutes of manual code reading.
</aside>

### Step 2: Implement the theme system

Now, request the full implementation:

```bash
gemini "I want to add theme support to Kiddie Mart. 

TECHNICAL CONTEXT:
- globals.css already has CSS variables for light (:root) and dark (.dark)
- Variables use HSL format without the hsl() function
- The app uses Tailwind CSS
- The header is in src/components/kiddie-mart/AppHeader.tsx
- Global state is in src/context/KiddieMartContext.tsx

REQUIREMENTS:
1. Create a ThemeSelector component with at least 3 themes:
   - 'default': The current pastel theme (what's in :root)
   - 'dark': Dark mode (what's in .dark)
   - 'candy': Theme with more vivid, saturated colors 
     (pinks, purples, bright greens - candy style)

2. Add the ThemeSelector to AppHeader.tsx with a palette or sun/moon icon

3. Create a useTheme hook or add to existing context:
   - Current theme state
   - Function to change theme
   - Persist in localStorage
   - Read saved theme on load

4. In globals.css, add CSS variables for the 'candy' theme:
   - primary: hot pink
   - secondary: bright purple  
   - accent: lime green
   - background: very light pink
   - Keep the same variable structure as existing themes

5. Add smooth transition when changing themes:
   - transition on body for background-color and color

IMPORTANT: Don't modify the existing CSS variable structure, 
only add new theme classes."
```

### Step 3: Review the changes

Gemini will have modified/created several files. Review each one:

```bash
gemini "Show me a summary of all files you modified or created for the 
theme feature. For each file, tell me what changed and why."
```

| File | Change |
|------|--------|
| `src/app/globals.css` | New `.candy` theme with CSS variables |
| `src/components/kiddie-mart/AppHeader.tsx` | ThemeSelector added |
| New `ThemeSelector` component | Selector with icons/buttons |
| `src/context/KiddieMartContext.tsx` or new hook | Theme state |

### Step 4: Test the themes

With the app running, test each theme:

1. **Default** — Soft pastel colors (mint, lavender, yellow)
2. **Dark** — Dark background with muted colors
3. **Candy** — Vivid, saturated colors

Verify:

- [ ] Theme selector visible in the header
- [ ] When changing theme, colors change smoothly
- [ ] Theme persists after page reload (`localStorage`)
- [ ] All components respect the theme (header, products, cart, modals)
- [ ] Text is readable in all themes

If a component doesn't respect the theme:

```bash
gemini "The ShoppingCart.tsx component doesn't change colors when 
I switch themes. It seems to have hardcoded colors instead of 
using CSS variables. Can you review and fix it?"
```

<aside class="negative">
It's common when implementing themes for some components to have hardcoded colors (like `bg-white` instead of `bg-background`). If this happens, ask Gemini to fix them.
</aside>

### Optional enhancement: Custom theme

If you have extra time, request a bonus feature:

```bash
gemini "Add the option for users to choose a custom primary color 
to create their own theme.
Add a color picker to the ThemeSelector that lets them 
select a color and automatically generates derived CSS variables."
```

## Challenge 10: New Feature — Product Upload with AI
Duration: 0:25

This is the most innovative challenge in the workshop! You'll create a system where the admin can **upload a product photo** and Google's AI (Gemini Vision) automatically detects the name, category, and suggested price.

### What you'll build

- **"Upload with AI"** button in the product admin panel
- Modal to **upload image or take a photo with the camera**
- Call to **Gemini Vision** to analyze the image
- **Auto-fill** the new product form
- Complete flow: photo → AI → form → save

### Step 1: Understand the existing AI infrastructure

The project already has Genkit configured. Use Gemini CLI to understand what's there:

```bash
gemini "Analyze the project's AI infrastructure:
1. Check src/ai/ - what files are there and what do they do?
2. Check package.json - what AI packages are installed?
3. Is there any API route or server action for AI?
4. How is Genkit configured in the project?

Give me a summary of what already exists and what we'd need to add 
to analyze images with Gemini Vision."
```

<aside class="positive">
Genkit greatly simplifies AI model calls. Instead of handling HTTP requests manually, you define "flows" and the framework handles the rest.
</aside>

### Step 2: Configure the API Key

For Gemini Vision to work, you need an API Key:

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Copy your API Key
3. Create or edit the `.env.local` file at the project root:

```bash
echo "GOOGLE_GENAI_API_KEY=your-api-key-here" >> .env.local
```

<aside class="negative">
Never commit your API Key to the repository. The `.env.local` file is already in `.gitignore`.
</aside>

### Step 3: Implement the AI Vision flow

Now, ask Gemini CLI to implement the complete flow:

```bash
gemini "I want to implement a feature that allows uploading a product 
photo and using Gemini Vision to detect metadata.

STEP 1 - Backend (AI Flow):
Create a Genkit flow in src/ai/ that:
- Receives an image in base64
- Calls Gemini Vision (gemini-2.0-flash or similar with vision)
- Asks the model to detect:
  * Product name (in Spanish)
  * Category (one of: Fruit, Snack, Drink, Candy, Toy, Other)
  * Suggested price in USD (based on what the product appears to be)
  * A representative emoji
- Returns a JSON with these fields

STEP 2 - API Route:
Create a Next.js API route (src/app/api/analyze-product/route.ts) that:
- Receives the image as base64 in the body
- Calls the Genkit flow
- Returns the JSON with detected metadata

STEP 3 - Frontend:
In the admin panel (ProductManagement.tsx):
- Add a '📸 Upload with AI' button next to the add product button
- Create a modal that allows:
  a) Selecting an image from the device (file input)
  b) Taking a photo with the camera (navigator.mediaDevices)
- Once it has the image:
  a) Show an image preview
  b) Call the API route with the base64 image
  c) Show a loading indicator while processing
  d) Pre-fill the new product form with detected data
  e) Admin can edit before saving

Use existing UI components (Dialog, Button, etc.) from src/components/ui/.
The project already has @genkit-ai/googleai and genkit installed."
```

### Step 4: Review the implementation

Gemini will have created/modified several files. Review them:

```bash
gemini "Give me a summary of all files you created or modified for the 
upload with AI feature. For each one, explain:
1. What it does
2. How it connects with the others
3. If there's anything I should review manually"
```

| File | Purpose |
|------|---------|
| `src/ai/analyze-product.ts` | Genkit flow for image analysis |
| `src/app/api/analyze-product/route.ts` | API route for the frontend |
| `src/components/kiddie-mart/admin/UploadProductModal.tsx` | Upload modal |
| `src/components/kiddie-mart/admin/ProductManagement.tsx` | Upload button added |

### Step 5: Test the feature

1. Log in as **Admin** in the app
2. Go to the **Products** section
3. Click **"📸 Upload with AI"**
4. Upload a product image (fruit, snack, toy, etc.)
5. Wait for AI to analyze the image
6. Verify the form is pre-filled with reasonable data
7. Adjust name/price if needed
8. Save the product

Verify:

- [ ] Upload modal appears correctly
- [ ] Can select an image from device
- [ ] Image preview is shown
- [ ] AI returns name, category, price, and emoji
- [ ] Form is pre-filled with AI data
- [ ] Can edit before saving
- [ ] Product saves successfully

<aside class="positive">
If detection isn't perfect, don't worry. Vision models are good but not perfect, which is why the flow allows editing before saving.
</aside>

If the API fails:

```bash
gemini "The call to the analyze-product API is failing with error 401. 
How can I verify that the Google AI API Key is being read correctly 
on the server-side?"
```

## Challenge 11: New Feature — Save Data to Firebase
Duration: 0:30

In the last workshop challenge, you'll migrate data storage from **IndexedDB** (local) to **Firebase Firestore** (cloud). This allows data to be shared across devices and persisted in the cloud.

### What you'll build

- **Firebase** configuration in the project
- **Firestore** service replicating IndexedDB functions
- Context **migration** to use the new service
- **Fallback** to IndexedDB when Firebase is unavailable

### Step 1: Create Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a project"**
3. Name: `kiddie-mart-workshop` (or similar)
4. Disable Google Analytics (not needed for the workshop)
5. Click **Create**

**Create web app:**

1. In the project, click the **Web** icon (`</>`)
2. App name: `kiddie-mart`
3. **Don't** enable Firebase Hosting for now
4. Copy the Firebase configuration shown

**Create Firestore database:**

1. In the side menu, go to **Firestore Database**
2. Click **Create database**
3. Select **test mode** (allows read/write without authentication)
4. Choose the nearest location

<aside class="negative">
Test mode is only for the workshop. In production, always configure proper security rules in Firestore.
</aside>

### Step 2: Configure Firebase in the project

Ask Gemini CLI to configure Firebase:

```bash
gemini "I need to configure Firebase in the project. I already have:
- firebase as a dependency in package.json
- A project in Firebase Console with Firestore enabled

I need you to:
1. Create a src/lib/firebase.ts file with the SDK configuration
2. Use environment variables from .env.local for sensitive values:
   - NEXT_PUBLIC_FIREBASE_API_KEY
   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   - NEXT_PUBLIC_FIREBASE_PROJECT_ID
   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   - NEXT_PUBLIC_FIREBASE_APP_ID
3. Export the app and Firestore instances
4. Handle the case where variables aren't configured 
   (to not break the app if someone doesn't have Firebase)"
```

Add your Firebase credentials to `.env.local`:

```bash
gemini "Give me the environment variables template I need to add 
to .env.local for Firebase, with comments explaining each one"
```

### Step 3: Analyze the current IndexedDB service

Before creating the Firestore service, understand the current one:

```bash
gemini "Analyze src/lib/indexedDbService.ts and give me:
1. List of all exported functions
2. For each function: parameters, return type, and what it does
3. What collections/stores it manages
4. The data schema (what fields each entity has)

I need this information to create an equivalent Firestore service."
```

Gemini should identify functions like:
- `openDB()` — Initialize the database
- `getAllProducts()` / `addProductDB()` / `updateProductDB()` / `deleteProductDB()`
- `getAllSalesHistory()` / `addSaleRecordDB()`
- `getAllAccounts()` / `addAccountDB()` / `updateAccountDB()`
- `bulkAddProductsDB()` / `bulkAddSalesHistoryDB()`

### Step 4: Create the Firestore service

Now, request the implementation:

```bash
gemini "Create a new file src/lib/firestoreService.ts that replicates 
all functions from indexedDbService.ts but using Firebase Firestore.

REQUIREMENTS:
1. Same interface (same function names, same parameters and returns)
2. Firestore collections:
   - 'products' for products
   - 'salesHistory' for sales history
   - 'accounts' for wallet accounts
3. Document IDs should be the same IDs used by the entities
4. Use existing types from src/types/kiddieMart.ts
5. Handle errors gracefully
6. If Firebase isn't initialized, functions should throw a 
   descriptive error (don't fail silently)

I ALSO need you to:
7. Create a src/lib/storageService.ts file that acts as a 'switch':
   - If Firebase is configured → use firestoreService
   - If Firebase is NOT configured → use indexedDbService
   - Export the same functions with the same interface
   - This will be the service imported by KiddieMartContext

8. Update src/context/KiddieMartContext.tsx to import from 
   storageService.ts instead of indexedDbService.ts directly"
```

### Step 5: Review the implementation

Review all created/modified files:

```bash
gemini "Show me a diagram of how services connect now:
1. KiddieMartContext.tsx
2. storageService.ts (switch)
3. firestoreService.ts (cloud)
4. indexedDbService.ts (local)
5. firebase.ts (config)

Does the fallback work correctly if I remove the Firebase variables?"
```

Expected diagram:

```
KiddieMartContext.tsx
        ↓
  storageService.ts
      ↙        ↘
firestoreService  indexedDbService
      ↓
  firebase.ts
      ↓
  Firebase Cloud
```

### Step 6: Test the integration

**Test 1: With Firebase configured**

1. Make sure `.env.local` has Firebase credentials
2. Restart the development server (`make dev`)
3. Log in as **Admin** and add a product
4. Go to **Firebase Console** → **Firestore** → `products` collection
5. Verify the product appears in Firestore 🎉

**Test 2: Without Firebase (fallback)**

1. Temporarily rename `.env.local` to `.env.local.bak`
2. Restart the server
3. The app should work normally using IndexedDB
4. Rename back `.env.local.bak` to `.env.local`

Verify:

- [ ] Products are saved to Firestore
- [ ] Sales are recorded in Firestore
- [ ] Wallet accounts are saved to Firestore
- [ ] Without Firebase, the app uses IndexedDB as before
- [ ] No errors in the console

<aside class="positive">
If tests pass, you've successfully migrated the entire data layer to the cloud with full backward compatibility!
</aside>

If there are permission issues:

```bash
gemini "The app connects to Firestore but gets a permissions error. 
Firestore rules are in test mode. What could be wrong?"
```

## Congratulations!
Duration: 0:02

🎉 **You've completed all the workshop challenges!** 🎉

### Workshop Summary

Throughout these 11 challenges you learned:

| Skill | Challenges |
|-------|------------|
| Installation and configuration | 1, 2 |
| Documentation generation | 3, 4, 5 |
| Project setup | 5, 6 |
| Debugging with AI | 7, 8 |
| Feature implementation | 9, 10, 11 |
| Service integration | 10, 11 |

### What you created

- `GEMINI.md` — Project context for AI
- `README.md` — Professional documentation
- `docs/ONBOARDING.md` — Developer onboarding guide
- `Makefile` — Task runner with all project commands
- **Theme system** with visual selector
- **Product upload with AI Vision**
- **Firebase Firestore** integration with local fallback

### Additional resources

- [Gemini CLI Documentation](https://ai.google.dev/gemini-api/docs)
- [Firebase Firestore Docs](https://firebase.google.com/docs/firestore)
- [Genkit Documentation](https://firebase.google.com/docs/genkit)
- [Next.js Documentation](https://nextjs.org/docs)

### Thank you for participating! 🙏
