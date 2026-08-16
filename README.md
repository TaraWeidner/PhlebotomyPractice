# Phlebotomy Practice Lab

A mobile-friendly browser game for **beginner phlebotomy education and supervised practice**.

The game uses fictional patient scenarios to reinforce:

- common test-to-tube associations used in the included training scenarios
- basic venous order-of-draw sequencing
- recognition of coagulation collection considerations
- specimen identification and labeling habits
- safety decisions such as stopping an unsafe attempt
- knowing when to verify instructions instead of guessing

## Play modes

### Beginner
Tube-color hints appear beside every laboratory order. The learner focuses on recognizing tube types and arranging them in sequence.

### Practice
Tube hints are removed. The learner chooses the tube types and sequence from memory.

### Challenge
Adds safety and special-collection questions to the tube-selection exercise.

## Run locally

No build tools or dependencies are required. Open `index.html` directly in a browser, or serve the folder with any basic static file server.

For example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

This project is intentionally plain HTML/CSS/JavaScript so it can be hosted directly with GitHub Pages.

After the game branch is merged:

1. Open repository **Settings**.
2. Choose **Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose the branch you want to publish and `/ (root)`.
5. Save.

> Repository note: this repository was created with the default branch name `inclusive-health-open-house-trivia/big-day-play-test`. The app does not depend on the branch name; it can be renamed later if desired.

## Educational and clinical safety note

This project is an **educational supplement only**. It does not replace:

- required supervision or competency assessment
- clinic policy and procedure
- the current laboratory test directory
- specimen-volume and processing requirements
- collection-device manufacturer instructions
- applicable licensing, credentialing, or regulatory requirements

Tube colors and acceptable specimen containers can vary by exact assay and laboratory. The game intentionally uses simplified tube associations for the included beginner scenarios. Before any real patient collection, confirm the exact test/container requirements in the current laboratory directory.

Do not enter real patient names, dates of birth, medical record numbers, or other PHI into this training app.

## Clinical references used for v1 scenario rules

- Labcorp, **Blood Specimens: Chemistry and Hematology** — collection containers and recommended multiple-specimen order of draw.
- Labcorp, **Blood Specimens: Coagulation** — sodium citrate collection, citrate ordering, tube fill considerations, and winged-collection discard/lead tube guidance.
- Labcorp, **Introduction to Specimen Collection** — use the specified container, sufficient specimen quantity, correct labeling, and preparation instructions.

Always use the current version of the applicable laboratory directory for clinical work.

## Project structure

```text
PhlebotomyPractice/
├── index.html
├── styles.css
├── app.js
└── README.md
```

## Privacy

The app runs entirely in the browser and requires no login or server. It stores only the learner's best game score in browser `localStorage`. No patient data should be entered into the app.
