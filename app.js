const TUBES = {
  blue: {name:"Light Blue", short:"Blue", css:"blue", additive:"Sodium citrate"},
  gold: {name:"Gold / Tiger SST", short:"Gold", css:"gold", additive:"Serum separator"},
  lavender: {name:"Lavender", short:"Lavender", css:"lavender", additive:"K2EDTA"},
  green: {name:"Green", short:"Green", css:"green", additive:"Heparin"},
  red: {name:"Plain Red", short:"Red", css:"red", additive:"No anticoagulant"},
  pink: {name:"Pink", short:"Pink", css:"pink", additive:"K2EDTA / cross-match"},
  gray: {name:"Gray", short:"Gray", css:"gray", additive:"Fluoride / oxalate"}
};

const SCENARIOS = [
  {
    id:"routine-primary-care", category:"Routine Primary Care", title:"Annual Preventive Labs",
    patient:{name:"Jordan Miller",dob:"04/18/1994",mrn:"TRAIN-001"},
    note:"I'm usually pretty easy to draw. Either arm is fine.",
    orders:[
      {test:"CBC with differential",tube:"lavender"},
      {test:"Comprehensive Metabolic Panel (CMP)",tube:"gold"},
      {test:"Hemoglobin A1c",tube:"lavender"},
      {test:"TSH with reflex to Free T4",tube:"gold"}
    ],
    expectedOrder:["gold","lavender"],
    explanation:"For this training scenario, the serum tests are grouped with Gold/SST and the CBC/A1c with Lavender EDTA. Gold/SST is collected before Lavender EDTA."
  },
  {
    id:"fasting-metabolic", category:"Pre-Collection Check", title:"Fasting Metabolic Labs",
    patient:{name:"Avery Chen",dob:"11/02/1987",mrn:"TRAIN-002"},
    note:"I haven't eaten since last night, but I did have black coffee this morning.",
    orders:[
      {test:"Lipid Panel",tube:"gold"},
      {test:"Comprehensive Metabolic Panel",tube:"gold"},
      {test:"Hemoglobin A1c",tube:"lavender"},
      {test:"CBC with differential",tube:"lavender"}
    ],
    expectedOrder:["gold","lavender"],
    safety:{
      label:"Safety Decision",
      question:"The order says FASTING and the patient had black coffee. What is the best next step?",
      options:[
        "Assume black coffee is always allowed and draw immediately.",
        "Verify the fasting instructions for the ordered tests or ask the supervisor before collection.",
        "Cancel all laboratory orders.",
        "Tell the patient to drink juice first."
      ],
      correctIndex:1,
      explanation:"Do not guess about preparation requirements. Verify the current lab/provider instructions before collection."
    },
    explanation:"The key skill here is both correct tube selection and knowing when a preparation instruction needs verification."
  },
  {
    id:"hormone-monitoring", category:"Hormone Monitoring", title:"Routine Follow-Up",
    patient:{name:"Rowan Parker",dob:"07/26/2001",mrn:"TRAIN-003"},
    note:"My veins roll sometimes, and people usually have better luck with a butterfly.",
    orders:[
      {test:"Estradiol",tube:"gold"},
      {test:"Total Testosterone",tube:"gold"},
      {test:"CBC",tube:"lavender"},
      {test:"Comprehensive Metabolic Panel",tube:"gold"}
    ],
    expectedOrder:["gold","lavender"],
    safety:{
      label:"Safety Decision",
      question:"The patient says their veins roll. Which response best reflects safe beginner practice?",
      options:[
        "Plan to redirect the needle several times if needed.",
        "Assess the vein, anchor appropriately, choose equipment with the supervisor, and stop if the needle position is uncertain.",
        "Skip palpation because the patient already knows their veins.",
        "Use the deepest visible vein automatically."
      ],
      correctIndex:1,
      explanation:"Patient history is useful, but the collector still assesses the site and uses controlled technique. Repeated probing is not the solution to a rolling vein."
    },
    explanation:"Gold/SST represents the serum hormone/chemistry testing in this training case; Lavender is used for the CBC."
  },
  {
    id:"prep-follow-up", category:"PrEP Monitoring", title:"Routine Screening Labs",
    patient:{name:"Morgan Reed",dob:"01/15/1998",mrn:"TRAIN-004"},
    note:"I don't love needles, but I've never actually passed out.",
    orders:[
      {test:"HIV-1/2 Ag/Ab, 4th Generation",tube:"gold"},
      {test:"Syphilis screen with reflex",tube:"gold"},
      {test:"Comprehensive Metabolic Panel",tube:"gold"},
      {test:"Hepatitis C Antibody",tube:"gold"}
    ],
    expectedOrder:["gold"],
    safety:{
      label:"Safety Decision",
      question:"The patient is nervous about needles. What is a helpful response?",
      options:[
        "Tell them they need to watch the needle so they know what is happening.",
        "Ask about prior reactions, position them safely, explain the plan calmly, and watch for symptoms of fainting.",
        "Have them stand so they feel more in control.",
        "Skip patient questions so the procedure is faster."
      ],
      correctIndex:1,
      explanation:"Calm preparation, safe positioning, and assessment for prior reactions are appropriate. A patient should not be standing for venipuncture."
    },
    explanation:"These blood tests are represented by Gold/SST in this training scenario. In real collections, verify exact assay container and volume requirements."
  },
  {
    id:"coag-butterfly", category:"Special Collection", title:"PT/INR With a Butterfly",
    patient:{name:"Cameron Brooks",dob:"09/09/1963",mrn:"TRAIN-005"},
    note:"Your supervisor has selected a winged (butterfly) collection device for this draw.",
    orders:[
      {test:"PT/INR",tube:"blue"},
      {test:"Comprehensive Metabolic Panel",tube:"gold"},
      {test:"CBC",tube:"lavender"}
    ],
    expectedOrder:["blue","gold","lavender"],
    safety:{
      label:"Safety Decision",
      question:"The Light Blue tube is the first specimen and you are using a butterfly. What special step should you recognize?",
      options:[
        "Shake the blue tube before inserting it into the holder.",
        "Use a discard/lead tube first to clear the butterfly tubing dead space, following lab/device instructions.",
        "Collect the Lavender tube first so the butterfly tubing fills with blood.",
        "Only fill the Light Blue tube halfway."
      ],
      correctIndex:1,
      explanation:"When a winged collection set is used and a citrate tube is first, follow the laboratory/device instruction for a discard or lead tube to clear tubing dead space."
    },
    explanation:"Citrate (Light Blue) is collected before serum gel-barrier and EDTA tubes in this training draw. Correct fill of citrate tubes matters because the blood-to-anticoagulant ratio is important."
  },
  {
    id:"fatigue-workup", category:"Safety Recognition", title:"Fatigue Workup",
    patient:{name:"Taylor Monroe",dob:"12/22/1975",mrn:"TRAIN-006"},
    note:"Everyone has a hard time getting my blood. During the attempt, I suddenly feel a sharp electrical pain shooting into my hand.",
    orders:[
      {test:"CBC with differential",tube:"lavender"},
      {test:"Comprehensive Metabolic Panel",tube:"gold"},
      {test:"Ferritin",tube:"gold"},
      {test:"Iron and TIBC",tube:"gold"},
      {test:"Vitamin B12",tube:"gold"},
      {test:"TSH",tube:"gold"}
    ],
    expectedOrder:["gold","lavender"],
    safety:{
      label:"Safety Decision",
      question:"The patient reports sharp, electrical, radiating pain during needle insertion. What should the beginner do?",
      options:[
        "Advance the needle slightly.",
        "Redirect toward the vein while asking the patient to hold still.",
        "Stop the draw, remove the needle safely, apply pressure, assess the patient, and notify the supervisor.",
        "Finish the current tube before stopping."
      ],
      correctIndex:2,
      explanation:"Sharp electrical or radiating pain is a stop signal. A beginner should not probe or continue an uncertain/unsafe attempt."
    },
    explanation:"This scenario tests whether safety overrides the goal of obtaining the specimen."
  },
  {
    id:"order-of-draw", category:"Mixed Tube Draw", title:"Three-Tube Order of Draw",
    patient:{name:"Jamie Thompson",dob:"06/17/1982",mrn:"TRAIN-007"},
    note:"No special collection concerns are reported.",
    orders:[
      {test:"CBC",tube:"lavender"},
      {test:"CMP",tube:"gold"},
      {test:"PT/INR",tube:"blue"},
      {test:"Hemoglobin A1c",tube:"lavender"},
      {test:"Lipid Panel",tube:"gold"}
    ],
    expectedOrder:["blue","gold","lavender"],
    safety:{
      label:"Safety Decision",
      question:"Which tube in this scenario deserves especially careful attention to proper fill?",
      options:["Gold/SST","Light Blue citrate","Lavender EDTA","They are all intentionally half-filled"],
      correctIndex:1,
      explanation:"Citrate coagulation tubes need the appropriate blood-to-anticoagulant ratio and should be filled according to the collection requirements."
    },
    explanation:"For this training set: Light Blue citrate comes before Gold/SST, and Lavender EDTA follows."
  },
  {
    id:"labeling-safety", category:"Specimen Integrity", title:"Label Before You Leave",
    patient:{name:"Riley James",dob:"03/30/1990",mrn:"TRAIN-008"},
    note:"The draw is complete and the patient is still seated in front of you.",
    orders:[
      {test:"CBC",tube:"lavender"},
      {test:"CMP",tube:"gold"},
      {test:"Hemoglobin A1c",tube:"lavender"}
    ],
    expectedOrder:["gold","lavender"],
    safety:{
      label:"Safety Decision",
      question:"What should happen before you leave the patient's side with the specimens?",
      options:[
        "Set the unlabeled tubes on a shared counter and label them later.",
        "Verify identifiers and label the specimens in the patient's presence according to clinic/lab procedure.",
        "Ask another staff member to remember which tubes belong to the patient.",
        "Put the tubes in your pocket until you reach the workstation."
      ],
      correctIndex:1,
      explanation:"Specimens should be correctly identified and labeled in the patient's presence according to the applicable procedure."
    },
    explanation:"A technically successful draw is not complete until specimen identification and handling are correct."
  }
];

const ADVANCED_SCENARIOS = [
  {
    id:"adv-green-plasma", category:"Advanced • Plasma Processing", title:"Lithium-Heparin Chemistry",
    patient:{name:"Samira Patel",dob:"08/14/1992",mrn:"ADV-001"},
    note:"The laboratory directory for this order specifies lithium-heparin plasma.",
    orders:[
      {test:"Basic Metabolic Panel — lithium-heparin plasma",tube:"green"},
      {test:"CBC with differential",tube:"lavender"}
    ],
    expectedOrder:["green","lavender"],
    processing:{
      label:"Processing Decision",
      question:"How should the Green specimen be handled when the test requires lithium-heparin plasma?",
      options:[
        "Let it clot before centrifuging.",
        "Gently mix it, centrifuge within the test's required window, transfer plasma to a labeled transport tube, and identify the anticoagulant.",
        "Leave it unspun because every Green tube is a whole-blood specimen.",
        "Freeze the whole Green tube immediately."
      ],
      correctIndex:1,
      explanation:"Heparin tubes are anticoagulated and do not need to clot. When plasma is required, separate it from cells and label the transport specimen with the plasma type/anticoagulant."
    },
    explanation:"Green tops can contain lithium or sodium heparin. Whether they stay whole blood or are spun for plasma depends on the exact assay."
  },
  {
    id:"adv-red-serum", category:"Advanced • Serum Processing", title:"Plain Red Serum Separation",
    patient:{name:"Noah Williams",dob:"02/03/1986",mrn:"ADV-002"},
    note:"The test directory allows a plain Red tube and requires separated serum.",
    orders:[
      {test:"Estradiol — serum",tube:"red"},
      {test:"CBC",tube:"lavender"}
    ],
    expectedOrder:["red","lavender"],
    processing:{
      label:"Processing Decision",
      question:"What is the correct sequence for the plain Red serum specimen?",
      options:[
        "Centrifuge immediately before a clot forms.",
        "Allow the specimen to clot, centrifuge according to the applicable instructions, then transfer the separated serum to an appropriate transport tube.",
        "Do not centrifuge a Red tube.",
        "Add anticoagulant after collection, then spin."
      ],
      correctIndex:1,
      explanation:"A plain Red tube is a serum specimen. Serum tubes must clot before centrifugation; when the test requires separated serum, transfer it away from the cells after spinning."
    },
    explanation:"The exact clotting and separation time is assay/manufacturer specific. Advanced practice means checking that requirement rather than memorizing one universal number."
  },
  {
    id:"adv-pink-crossmatch", category:"Advanced • Blood Bank", title:"Pink K2EDTA Cross-Match Tube",
    patient:{name:"Alex Garcia",dob:"10/21/1977",mrn:"ADV-003"},
    note:"For this training case, the receiving blood bank specifically requires a Pink K2EDTA cross-match tube.",
    orders:[
      {test:"Pretransfusion compatibility specimen — facility blood-bank procedure",tube:"pink"}
    ],
    expectedOrder:["pink"],
    processing:{
      label:"Processing Decision",
      question:"What is the best handling approach for this Pink tube?",
      options:[
        "Spin and separate serum because Pink is a serum tube.",
        "Gently mix as an EDTA tube and keep it as whole blood when the blood-bank procedure requires whole blood.",
        "Let the specimen clot for 30 minutes.",
        "Transfer the specimen into a Red tube after collection."
      ],
      correctIndex:1,
      explanation:"Pink cross-match tubes contain K2EDTA. When the blood-bank procedure calls for whole blood, they are mixed and submitted as whole blood rather than treated as serum."
    },
    explanation:"Pink is commonly manufactured as a K2EDTA cross-match tube, but accepted blood-bank containers vary by facility. For example, some Labcorp blood-grouping/antibody-screen workflows specify Lavender EDTA instead."
  },
  {
    id:"adv-lactate-gray", category:"Advanced • Special Handling", title:"Lactic Acid on Ice",
    patient:{name:"Mina Foster",dob:"05/30/1999",mrn:"ADV-004"},
    note:"The order is for Labcorp Lactic Acid, Plasma.",
    orders:[
      {test:"CBC",tube:"lavender"},
      {test:"Lactic Acid, Plasma",tube:"gray"}
    ],
    expectedOrder:["lavender","gray"],
    processing:{
      label:"Special Handling",
      question:"Which handling sequence matches this Gray-top lactate order?",
      options:[
        "Keep the tube warm and ask the patient to pump their fist.",
        "Place the Gray tube on ice, gently invert at least six times, return it to ice, and avoid fist pumping; minimize tourniquet effect when possible.",
        "Allow the Gray tube to clot before centrifuging.",
        "Shake vigorously and store at room temperature."
      ],
      correctIndex:1,
      explanation:"For this specific Labcorp lactate assay, the Gray tube is kept on ice, gently mixed, and returned to ice. Fist pumping and prolonged tourniquet effects can alter lactate."
    },
    explanation:"Special handling can matter as much as tube color. Always read the test-specific instructions before collection."
  },
  {
    id:"adv-mixed-order", category:"Advanced • Order of Draw", title:"Five-Tube Mixed Draw",
    patient:{name:"Elliot Nguyen",dob:"12/05/1984",mrn:"ADV-005"},
    note:"Each test below has already been verified against its laboratory container requirement.",
    orders:[
      {test:"Estradiol — plain serum",tube:"red"},
      {test:"PT/INR",tube:"blue"},
      {test:"Basic Metabolic Panel — lithium-heparin plasma",tube:"green"},
      {test:"CBC",tube:"lavender"},
      {test:"Glucose, Plasma — sodium fluoride",tube:"gray"}
    ],
    expectedOrder:["red","blue","green","lavender","gray"],
    processing:{
      label:"Processing Decision",
      question:"Which statement is most accurate after this draw?",
      options:[
        "Every tube should be centrifuged.",
        "The Red serum and Green plasma specimens may require centrifugation/separation for these assays; the Lavender CBC remains whole blood, and the exact Gray handling follows the specific glucose order.",
        "Only the Lavender tube is centrifuged.",
        "Tube processing can be decided from cap color alone without reading the test directory."
      ],
      correctIndex:1,
      explanation:"Processing follows specimen type and test requirements, not cap color alone. Serum/plasma assays commonly require separation from cells, while many hematology tests remain whole blood."
    },
    explanation:"This scenario uses Labcorp's published sequence concept: nonadditive Red before citrate Blue, then Heparin Green, EDTA, and Fluoride/Oxalate Gray."
  },
  {
    id:"adv-green-whole-blood", category:"Advanced • Whole Blood vs Plasma", title:"Green Does Not Always Mean Spin",
    patient:{name:"Priya Shah",dob:"07/11/1970",mrn:"ADV-006"},
    note:"The verified test requirement accepts sodium-heparin whole blood.",
    orders:[
      {test:"BCR-ABL1 quantitative — sodium-heparin whole blood training example",tube:"green"}
    ],
    expectedOrder:["green"],
    processing:{
      label:"Processing Decision",
      question:"The verified requirement says WHOLE BLOOD. What should you do with the Green tube?",
      options:[
        "Centrifuge it automatically because it is Green.",
        "Keep it as whole blood, mix appropriately, and follow the assay's transport/time/temperature instructions.",
        "Allow it to clot, then separate serum.",
        "Transfer it into a Gold tube."
      ],
      correctIndex:1,
      explanation:"A Green heparin tube may be a whole-blood specimen for some specialty assays. Do not centrifuge simply because another Green-top test required plasma."
    },
    explanation:"Advanced competency includes recognizing that the requested specimen type—whole blood, plasma, or serum—drives processing."
  },
  {
    id:"adv-red-vs-sst", category:"Advanced • Serum Tubes", title:"Plain Red vs Gold SST",
    patient:{name:"Cameron Lee",dob:"09/18/1995",mrn:"ADV-007"},
    note:"One test requires plain Red separated serum; the other accepts an intact, correctly spun SST gel barrier.",
    orders:[
      {test:"Specialty serum assay — plain Red separated serum",tube:"red"},
      {test:"Routine chemistry — Gold SST",tube:"gold"}
    ],
    expectedOrder:["red","gold"],
    processing:{
      label:"Processing Decision",
      question:"What is the key processing difference in this training case?",
      options:[
        "Red and Gold are always handled identically after spinning.",
        "Both produce serum, but the plain Red serum is transferred away from cells when separated serum is required; an acceptable SST can often remain in the correctly spun tube with an intact gel barrier.",
        "Gold produces plasma and Red produces whole blood.",
        "Red should never be centrifuged."
      ],
      correctIndex:1,
      explanation:"Both are serum collection approaches, but the physical separator matters. Plain Red has no gel barrier, while an SST uses gel to separate serum from cells after proper clotting and centrifugation."
    },
    explanation:"Labcorp notes that serum from plain Red tubes is sent in a plastic transport tube, while correctly separated gel-barrier serum may often remain in the original tube when the assay allows it."
  },
  {
    id:"adv-processing-triage", category:"Advanced • Processing Triage", title:"Spin It or Keep It Whole?",
    patient:{name:"Jordan Rivers",dob:"01/09/1981",mrn:"ADV-008"},
    note:"The requisition explicitly specifies separated serum, heparin plasma, and EDTA whole blood.",
    orders:[
      {test:"Serum assay — plain Red",tube:"red"},
      {test:"Plasma assay — Green heparin",tube:"green"},
      {test:"Blood-bank specimen — Pink EDTA whole blood",tube:"pink"}
    ],
    expectedOrder:["red","green","pink"],
    processing:{
      label:"Processing Decision",
      question:"Which processing plan matches the requested specimen types?",
      options:[
        "Red: clot/spin/separate serum; Green: spin/separate plasma without clotting; Pink: mix and keep whole blood.",
        "Red: keep whole; Green: clot/spin; Pink: spin for serum.",
        "Spin all three and discard the cells.",
        "Do not spin any of the specimens."
      ],
      correctIndex:0,
      explanation:"That is the core distinction: serum must clot before separation, anticoagulated plasma does not clot before separation, and a requested whole-blood EDTA specimen remains whole."
    },
    explanation:"This is the advanced-level habit to build: read the requested specimen type first, then decide how to process the tube."
  }
];

const state = {
  mode:"beginner", scenarioOrder:[], index:0, score:0,
  correctDraws:0, decisionWins:0, selectedTubes:[], checked:false
};

const $ = s => document.querySelector(s);
const els = {
  startScreen:$("#startScreen"), gameScreen:$("#gameScreen"), resultsScreen:$("#resultsScreen"),
  modeLabel:$("#modeLabel"), roundLabel:$("#roundLabel"), scoreLabel:$("#scoreLabel"),
  progressBar:$("#progressBar"), scenarioCategory:$("#scenarioCategory"), scenarioTitle:$("#scenarioTitle"),
  patientName:$("#patientName"), patientDob:$("#patientDob"), patientMrn:$("#patientMrn"),
  patientNoteWrap:$("#patientNoteWrap"), patientNote:$("#patientNote"), ordersList:$("#ordersList"),
  hintLabel:$("#hintLabel"), tubeTray:$("#tubeTray"), selectedDraw:$("#selectedDraw"),
  decisionSection:$("#decisionSection"), decisionEyebrow:$("#decisionEyebrow"),
  decisionHeading:$("#decisionHeading"), decisionOptions:$("#decisionOptions"),
  checkButton:$("#checkButton"), resetDrawButton:$("#resetDrawButton"), restartButton:$("#restartButton"),
  feedback:$("#feedback"), correctStat:$("#correctStat"), decisionStat:$("#decisionStat"),
  decisionStatLabel:$("#decisionStatLabel"), bestScoreStat:$("#bestScoreStat"),
  cheatSheetButton:$("#cheatSheetButton"), cheatSheetDialog:$("#cheatSheetDialog"),
  resultsHeading:$("#resultsHeading"), finalScore:$("#finalScore"), resultsMessage:$("#resultsMessage"),
  resultsBreakdown:$("#resultsBreakdown"), playAgainButton:$("#playAgainButton"),
  resultsChangeModeButton:$("#resultsChangeModeButton")
};

function shuffle(a){
  const c=[...a];
  for(let i=c.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [c[i],c[j]]=[c[j],c[i]];
  }
  return c;
}
function modeName(m){return ({beginner:"Beginner",practice:"Practice",challenge:"Challenge",advanced:"Advanced"})[m];}
function scenario(){return state.scenarioOrder[state.index];}
function scenarioPool(mode){return mode==="advanced" ? ADVANCED_SCENARIOS : SCENARIOS;}
function decisionFor(s){
  if(state.mode==="challenge") return s.safety || null;
  if(state.mode==="advanced") return s.processing || null;
  return null;
}

function startGame(mode){
  Object.assign(state,{
    mode,
    scenarioOrder:shuffle(scenarioPool(mode)),
    index:0,score:0,correctDraws:0,decisionWins:0,selectedTubes:[],checked:false
  });
  els.startScreen.classList.add("hidden");
  els.resultsScreen.classList.add("hidden");
  els.gameScreen.classList.remove("hidden");
  renderScenario();
}

function renderScenario(){
  const s=scenario();
  state.selectedTubes=[];
  state.checked=false;
  els.modeLabel.textContent=modeName(state.mode);
  els.roundLabel.textContent=`Scenario ${state.index+1} of ${state.scenarioOrder.length}`;
  els.scoreLabel.textContent=`Score: ${state.score}`;
  els.progressBar.style.width=`${state.index/state.scenarioOrder.length*100}%`;
  els.scenarioCategory.textContent=s.category;
  els.scenarioTitle.textContent=s.title;
  els.patientName.textContent=s.patient.name;
  els.patientDob.textContent=s.patient.dob;
  els.patientMrn.textContent=s.patient.mrn;

  if(s.note){
    els.patientNote.textContent=`“${s.note}”`;
    els.patientNoteWrap.classList.remove("hidden");
  } else {
    els.patientNoteWrap.classList.add("hidden");
  }

  const hints=state.mode==="beginner";
  els.hintLabel.textContent=hints ? "Tube hints are ON" : state.mode==="advanced" ? "Processing knowledge is ON" : "Tube hints are hidden";
  els.ordersList.innerHTML=s.orders.map(o=>{
    const t=TUBES[o.tube];
    return `<div class="order-item"><span class="order-name">${o.test}</span>${hints?`<span class="tube-hint"><span class="tube-dot tube-${t.css}"></span>${t.name}</span>`:""}</div>`;
  }).join("");

  renderTubeTray();
  renderSelected();
  renderDecision(s);
  els.feedback.className="feedback hidden";
  els.feedback.innerHTML="";
  els.checkButton.disabled=false;
  els.resetDrawButton.disabled=false;
  updateStats();
}

function renderTubeTray(){
  els.tubeTray.innerHTML=Object.entries(TUBES).map(([key,t])=>
    `<button class="tube-button ${state.selectedTubes.includes(key)?"selected":""}" data-tube="${key}" type="button" aria-pressed="${state.selectedTubes.includes(key)}">
      <span class="tube-illustration" aria-hidden="true"><span class="tube-cap cap-${t.css}"></span><span class="tube-body"></span></span>
      <strong>${t.short}</strong><small>${t.additive}</small>
    </button>`
  ).join("");
}

function renderSelected(){
  if(!state.selectedTubes.length){
    els.selectedDraw.className="selected-draw empty-state";
    els.selectedDraw.textContent="No tubes selected yet.";
    return;
  }
  els.selectedDraw.className="selected-draw";
  els.selectedDraw.innerHTML=state.selectedTubes.map((k,i)=>{
    const t=TUBES[k];
    return `<span class="selected-chip"><span class="tube-dot tube-${t.css}"></span>${t.short}</span>${i<state.selectedTubes.length-1?'<span class="order-arrow">→</span>':""}`;
  }).join("");
}

function renderDecision(s){
  const d=decisionFor(s);
  if(!d){
    els.decisionSection.classList.add("hidden");
    els.decisionOptions.innerHTML="";
    return;
  }
  els.decisionSection.classList.remove("hidden");
  els.decisionEyebrow.textContent=d.label || "Decision";
  els.decisionHeading.textContent=d.question;
  els.decisionOptions.innerHTML=d.options.map((o,i)=>
    `<label class="choice-option"><input type="radio" name="decisionAnswer" value="${i}"><span>${o}</span></label>`
  ).join("");
}

function equal(a,b){return a.length===b.length&&a.every((v,i)=>v===b[i]);}
function sameSet(a,b){return a.length===b.length&&a.every(v=>b.includes(v));}
function formatOrder(keys){return keys.map(k=>TUBES[k].short).join(" → ");}

function checkAnswer(){
  if(state.checked)return;
  const s=scenario();
  if(!state.selectedTubes.length)return temp("Choose at least one tube before checking your draw.");

  const exact=equal(state.selectedTubes,s.expectedOrder);
  const types=sameSet(state.selectedTubes,s.expectedOrder);
  const d=decisionFor(s);
  let decision=null;

  if(d){
    const picked=$("input[name='decisionAnswer']:checked");
    if(!picked)return temp(`Choose a ${state.mode==="advanced"?"processing":"safety"} answer before checking this scenario.`);
    decision=Number(picked.value)===d.correctIndex;
  }

  state.checked=true;
  let earned=0;
  if(exact){earned+=10;state.correctDraws++;}
  else if(types)earned+=5;
  if(decision===true){earned+=5;state.decisionWins++;}
  state.score+=earned;

  els.scoreLabel.textContent=`Score: ${state.score}`;
  updateStats();

  const parts=[];
  if(exact)parts.push("✅ Correct tube types and order of draw.");
  else if(types)parts.push(`🟡 You chose the right tube types, but the order should be: ${formatOrder(s.expectedOrder)}.`);
  else parts.push(`🟡 Review the tube selection. For this training scenario, the expected draw is: ${formatOrder(s.expectedOrder)}.`);

  if(decision===true)parts.push(`✅ ${d.label || "Decision"}: correct. ${d.explanation}`);
  if(decision===false)parts.push(`🟡 ${d.label || "Decision"}: review this one. ${d.explanation}`);
  parts.push(s.explanation);
  parts.push("For real patient collection, verify the exact test/container, processing, timing, temperature, and transport requirements in the current laboratory directory and follow clinic policy, manufacturer instructions, and supervisor direction.");

  const perfect=exact&&(decision===null||decision===true);
  els.feedback.className=`feedback ${perfect?"correct":"partial"}`;
  els.feedback.innerHTML=`<strong>${perfect?"Great draw!":"Good practice — review the feedback."} +${earned} points</strong><ul>${parts.map(p=>`<li>${p}</li>`).join("")}</ul><button id="nextButton" class="button button-primary next-button" type="button">${state.index===state.scenarioOrder.length-1?"See Results":"Next Scenario"}</button>`;
  els.feedback.classList.remove("hidden");
  els.feedback.focus();
  els.checkButton.disabled=true;
  els.resetDrawButton.disabled=true;
  $("#nextButton").addEventListener("click",nextScenario);
}

function temp(msg){
  els.feedback.className="feedback partial";
  els.feedback.innerHTML=`<strong>Almost ready.</strong>${msg}`;
  els.feedback.classList.remove("hidden");
  els.feedback.focus();
}

function nextScenario(){
  if(state.index>=state.scenarioOrder.length-1)return showResults();
  state.index++;
  renderScenario();
  window.scrollTo({top:0,behavior:"smooth"});
}

function maxScore(){
  const pool=scenarioPool(state.mode);
  const decisionCount=pool.filter(s=>state.mode==="advanced"?s.processing:s.safety).length;
  return pool.length*10 + ((state.mode==="challenge"||state.mode==="advanced")?decisionCount*5:0);
}

function showResults(){
  const max=maxScore();
  const pct=Math.round(state.score/max*100);
  els.gameScreen.classList.add("hidden");
  els.resultsScreen.classList.remove("hidden");
  els.finalScore.textContent=state.score;
  els.resultsHeading.textContent=pct>=90?"Excellent session.":pct>=70?"Strong practice round.":"Good start — keep building the pattern.";
  els.resultsMessage.textContent=state.mode==="advanced"
    ? "Advanced mode is about matching the tube AND knowing what happens after collection. Keep verifying real-world processing instructions instead of relying on cap color alone."
    : pct>=90
      ? "You consistently matched the training tubes and sequence. Keep verifying real-world orders instead of relying on memory alone."
      : "Replay the scenarios and pay attention to the feedback. The goal is a safe, repeatable routine — not speed.";

  const decisionLabel=state.mode==="advanced"?"Processing wins":state.mode==="challenge"?"Safety wins":"Decisions";
  els.resultsBreakdown.innerHTML=`
    <div class="result-stat"><strong>${state.correctDraws}/${state.scenarioOrder.length}</strong><span>Perfect draws</span></div>
    <div class="result-stat"><strong>${(state.mode==="challenge"||state.mode==="advanced")?state.decisionWins:"—"}</strong><span>${decisionLabel}</span></div>
    <div class="result-stat"><strong>${pct}%</strong><span>Session score</span></div>`;

  const key=`phlebBestScore_${state.mode}`;
  const best=Math.max(state.score,Number(localStorage.getItem(key)||0));
  localStorage.setItem(key,String(best));
  updateStats();
  window.scrollTo({top:0,behavior:"smooth"});
}

function updateStats(){
  els.correctStat.textContent=state.correctDraws;
  els.decisionStat.textContent=state.decisionWins;
  els.decisionStatLabel.textContent=state.mode==="advanced"?"Processing wins":state.mode==="challenge"?"Safety wins":"Decision wins";
  els.bestScoreStat.textContent=localStorage.getItem(`phlebBestScore_${state.mode}`)||"0";
}

function resetToStart(){
  els.gameScreen.classList.add("hidden");
  els.resultsScreen.classList.add("hidden");
  els.startScreen.classList.remove("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
}

document.querySelectorAll(".mode-card").forEach(b=>b.addEventListener("click",()=>startGame(b.dataset.mode)));
els.tubeTray.addEventListener("click",e=>{
  const b=e.target.closest(".tube-button");
  if(!b||state.checked)return;
  const k=b.dataset.tube,i=state.selectedTubes.indexOf(k);
  if(i>=0)state.selectedTubes.splice(i,1);
  else state.selectedTubes.push(k);
  renderTubeTray();
  renderSelected();
});
els.checkButton.addEventListener("click",checkAnswer);
els.resetDrawButton.addEventListener("click",()=>{
  if(state.checked)return;
  state.selectedTubes=[];
  renderTubeTray();
  renderSelected();
  els.feedback.classList.add("hidden");
});
els.restartButton.addEventListener("click",resetToStart);
els.resultsChangeModeButton.addEventListener("click",resetToStart);
els.playAgainButton.addEventListener("click",()=>startGame(state.mode));
els.cheatSheetButton.addEventListener("click",()=>els.cheatSheetDialog.showModal());
updateStats();