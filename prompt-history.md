# WellTrack - Project Prompt History

This document provides a representative history of the prompts and collaborative queries used with AI assistants during the development, documentation, and deployment of the WellTrack supplement tracking application.

AI tools were used as interactive coding partners to assist with brainstorming, application structure, styling, debugging, documentation, and version control workflows. AI-generated suggestions were reviewed, tested, and adapted as needed throughout the development process.

---

## 🤖 ChatGPT

### 📋 Project Planning & Architecture (Evidence of Planning)

* "Help me create an application for tracking vitamins, supplements, and medications."
* "Help me define the problem, target audience, value proposition, MVP, and required features for my supplement tracker."
* "What features should be included in a simple HTML, CSS, and JavaScript supplement tracking application?"

### 🏗️ HTML Structure & Iterative Development (Evidence of Iteration)

* "Help me build the full HTML structure for WellTrack."
* "Create supplement cards that show the supplement name, dosage, purpose, recommended time of day, and whether it should be taken with food."
* "Add dashboard sections for supplements taken, water intake, reminders, recent activity, and search."

### 🎨 CSS & Feature Requests (Evidence of Feature Expansion)

* "Help me create a professional and responsive design for WellTrack."
* "Improve the supplement cards, dashboard layout, buttons, search bar, hydration tracker, and mobile responsiveness."
* "Make the application look polished rather than basic."

### ⚙️ JavaScript & State Management (Evidence of Interactivity)

* "Add JavaScript functionality so users can mark supplements as taken."
* "Update the supplement counter whenever a supplement is completed."
* "Add hydration tracking with a daily water goal."
* "Save daily supplement and hydration progress using Local Storage."
* "Add a Reset Today button that clears supplement, hydration, and activity progress."
* "Add search functionality for filtering supplement cards."
* "Add a recent activity history section."

### 🔍 Debugging & Verification (Evidence of Code Verification)

* "Help me debug the supplement buttons and make sure completed supplements remain saved after refreshing the page."
* "Help me fix the Reset Today button."
* "Check whether the HTML IDs and JavaScript selectors match correctly."
* "Review my HTML, CSS, and JavaScript for errors and inconsistencies."

### 🧠 Follow-Up Questions, Explanations & Verification (Evidence of Curiosity and Learning)

* "Why does the supplement counter need to update every time a user marks a supplement as taken?"
* "Explain how `localStorage` keeps my progress saved after I refresh the page."
* "Can you check whether my HTML IDs match the JavaScript selectors exactly?"
* "Why is the screenshot visible in Visual Studio Code but not rendering on GitHub?"
* "Can you explain what `git add`, `git commit`, and `git push` each do before I use them?"
* "How can I verify that my latest README changes were actually committed and pushed to GitHub?"
* "Why does Git Bash say 'nothing to commit, working tree clean' even though I am trying to fix my README?"
* "What does the greater-than symbol (`>`) mean in Git Bash, and why does it keep appearing after I enter a command?"
* "How can I confirm that I am editing the exact README file Git is tracking?"
* "Why should I use Git Bash instead of GitHub Desktop, and what is the difference between the two?"
* "How do I know whether my GitHub Pages deployment was successful?"
* "Where can I find the live GitHub Pages link after deployment?"

### 📚 Documentation, Git & GitHub Deployment

* "Help me create and refine a professional README for the WellTrack project."
* "Check whether my README satisfies the Next Chapter project requirements."
* "Help me add Project Plan and Running the Project sections to my README."
* "Walk me through initializing WellTrack as a Git repository using Git Bash."
* "Help me stage, commit, and push my project to GitHub."
* "Walk me through deploying WellTrack with GitHub Pages and adding the live demo link to my README."
* "Help me troubleshoot why my dashboard screenshot appears locally but does not render correctly on GitHub."

---

## ♊ Google Gemini

### 💡 Initial Brainstorming & Concept Validation

* "Help me brainstorm features for a supplement and medication tracking application."
* "Review the WellTrack idea and suggest improvements."
* "Review the project structure and suggest architectural improvements."

### 📝 README Optimization & Follow-Up Refinements

* "Review my raw project outline and help me polish the text, layout, and structure into a professional Markdown format matching required program standards."
* "Review my final README text containing the new 'Current Features' section to ensure it clearly bridges the gap between my initial MVP goals and actual deliverables."

### 📁 Technical Troubleshooting: File Paths & Problem Solving (Evidence of Debugging)

* "Explain why my dashboard screenshot is not rendering when I view the Markdown preview inside Visual Studio Code."
* "My local file path is currently listed as `C:\Users\barri\OneDrive\Desktop\Supplement Tracker\dashboard-screenshot.png`. How do I correctly format my relative Markdown path to match this location?"
* "Should I remove the dot before the forward slash (`/images/dashboard-screenshot.png`) if Option A isn't loading?"
* "Walk through debugging a missing asset preview by checking for hidden double extensions like `.png.png`, case sensitivity, and using VS Code autocompletion shortcuts."

### 🚀 Git Architecture & Learning Core Concepts (Evidence of Curiosity)

* "Should I include images in the README from my computer, or will they automatically load once everything is pushed to GitHub?"
* "Will I be able to see the screenshot image inside the README file if I open it in Notepad, or do I have to wait until it is uploaded to GitHub?"
* "Explain the core differences between using Git-SCM through the command line and using the GitHub Desktop graphical interface. Why should a developer learn both?"
* "Explain how to use Git and GitHub slowly, simply, and step-by-step for a beginner transferring a local Windows project folder to a live public repository."
* "Formulate the exact sequence of Git terminal commands to safely target my local directory (`cd`), initialize tracking (`git init`), stage files (`git add .`), commit changes, rename the branch to `main`, connect the remote repository, and push the project to GitHub."
* "Help me draft a concise, high-impact professional GitHub profile bio under the 160-character limit tailored to software development and the Next Chapter program."

---

## 🧠 Reflection & Ownership

The intentional use of AI tools greatly accelerated technical feedback loops, allowed for rapid UI experimentation, and provided direct, targeted debugging assistance when managing application state and browser persistence with `localStorage`.

While AI generated structural code templates and assisted with step-by-step logic checks, I remained responsible for establishing the initial vision, defining the problem, scoping the MVP criteria, selecting features, mapping the user flow, reviewing generated code, testing application behavior, verifying layout responsiveness across viewports, diagnosing path configuration conflicts, and executing the terminal deployment steps required to publish the final codebase.

AI was used as a development aid and learning resource, while final project decisions, testing, implementation choices, and deployment actions remained under my direction.