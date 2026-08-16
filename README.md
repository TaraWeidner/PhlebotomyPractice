# Phlebotomy Practice Lab

A mobile-friendly browser game for **beginner through advanced phlebotomy education and supervised practice**.

The game uses fictional patient scenarios to reinforce:

- common test-to-tube associations used in the included training scenarios
- venous order-of-draw sequencing
- coagulation collection considerations
- specimen identification and labeling habits
- safety decisions such as stopping an unsafe attempt
- advanced specimen processing: clotting, centrifugation, separation, whole blood vs plasma, transport tubes, and special handling
- knowing when to verify instructions instead of guessing

## Play modes

### Beginner
Tube-color hints appear beside every laboratory order. The learner focuses on recognizing tube types and arranging them in sequence.

### Practice
Tube hints are removed. The learner chooses the tube types and sequence from memory.

### Challenge
Adds safety and special-collection questions to the tube-selection exercise.

### Advanced
Adds dedicated scenarios using Green, Pink, plain Red, Gray, Gold/SST, Light Blue, and Lavender tubes. The learner must select the tube/order **and** make a processing decision such as:

- whether a specimen remains whole blood or is centrifuged
- serum vs plasma processing
- clot-before-spin rules for serum tubes
- transferring separated serum/plasma to a transport tube
- blood-bank Pink K2EDTA handling when specified by the receiving facility
- special handling such as Gray-top lactate on ice

The central advanced rule is: **never decide whether to spin a specimen from cap color alone. Verify the requested specimen type and the current test-specific instructions.**

## Run locally

No build tools or dependencies are required. Open `index.html` directly in a browser, or serve the folder with any basic static file server.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

The repository contains a GitHub Actions workflow that publishes the static site to GitHub Pages after pushes to the repository's current default branch.

## Educational and clinical safety note

This project is an **educational supplement only**. It does not replace:

- required supervision or competency assessment
- clinic policy and procedure
- the current laboratory test directory
- specimen-volume, processing, timing, temperature, and transport requirements
- collection-device and tube manufacturer instructions
- receiving blood-bank requirements
- applicable licensing, credentialing, or regulatory requirements

Tube colors and acceptable specimen containers can vary by exact assay, laboratory, manufacturer, and receiving facility. Before any real patient collection, confirm the exact test/container and processing requirements in the current laboratory directory.

Do not enter real patient names, dates of birth, medical record numbers, or other PHI into this training app.

## Clinical references used for scenario rules

- Labcorp, **Blood Specimens: Chemistry and Hematology** — container types, serum/plasma preparation, and published multiple-specimen order of draw.
- Labcorp, **Introduction to Specimen Collection** — serum/plasma preparation and transport labeling principles.
- Labcorp test-specific collection pages used for training examples, including Basic Metabolic Panel, Estradiol, Glucose Plasma, Lactic Acid Plasma, and BCR-ABL1 quantitative testing.
- BD Vacutainer product information — Pink K2EDTA cross-match tube identification and manufacturer centrifugation guidance.

Always use the current version of the applicable laboratory directory and manufacturer instructions for clinical work.

## Project structure

```text
PhlebotomyPractice/
├── .github/workflows/deploy-pages.yml
├── assets/inclusive-health-logo.webp
├── index.html
├── styles.css
├── app.js
└── README.md
```

## Privacy

The app runs entirely in the browser and requires no login or server. It stores only the learner's best score for each game mode in browser `localStorage`. No patient data should be entered into the app.
