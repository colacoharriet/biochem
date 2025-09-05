import React, { useState } from 'react';
import {
  User, BookOpen, Brain, Target, Clock, TrendingUp, Star, ChevronRight, Play, Pause, RotateCcw,
  CheckCircle, XCircle, Award
} from 'lucide-react';

// ... your BiochemistryApp code here ...

export default BiochemistryApp;
import { User, BookOpen, Brain, Target, Clock, TrendingUp, Star, ChevronRight, Play, Pause, RotateCcw, CheckCircle, XCircle, Award } from 'lucide-react';

// Mock database for biochemistry content
const biochemistryTopics = [
  {
    id: 1,
    topic: "Protein Structure and Function",
    content: `Proteins are complex macromolecules composed of amino acids. They have four levels of structure:
    
Primary Structure: Linear sequence of amino acids connected by peptide bonds.
Secondary Structure: Local folding patterns like α-helices and β-sheets stabilized by hydrogen bonds.
Tertiary Structure: Overall 3D shape of a single polypeptide chain.
Quaternary Structure: Association of multiple polypeptide subunits.

Key functions include enzymatic catalysis, structural support, transport, storage, hormonal signaling, receptor binding, contractile motion, and immune defense.`,
    flashcards: [
      { id: 1, question: "What are the four levels of protein structure?", answer: "Primary (amino acid sequence), Secondary (α-helices and β-sheets), Tertiary (3D folding), Quaternary (multiple subunits)" },
      { id: 2, question: "What bonds stabilize secondary protein structure?", answer: "Hydrogen bonds between backbone atoms" },
      { id: 3, question: "Name three major functions of proteins", answer: "Enzymatic catalysis, structural support, transport, storage, signaling, immune defense (any three)" }
    ]
  },
  {
    id: 2,
    topic: "Enzyme Kinetics and Regulation",
    content: `Enzymes are biological catalysts that accelerate biochemical reactions by lowering activation energy.

Michaelis-Menten Kinetics:
- Km: Substrate concentration at half-maximal velocity
- Vmax: Maximum reaction velocity
- Competitive inhibition increases apparent Km
- Non-competitive inhibition decreases Vmax

Enzyme Regulation:
- Allosteric regulation (positive/negative effectors)
- Covalent modification (phosphorylation/dephosphorylation)
- Enzyme induction/repression
- Compartmentalization`,
    flashcards: [
      { id: 4, question: "What does Km represent in enzyme kinetics?", answer: "Substrate concentration at which reaction velocity is half of Vmax" },
      { id: 5, question: "How does competitive inhibition affect Km and Vmax?", answer: "Increases apparent Km, Vmax remains unchanged" },
      { id: 6, question: "Name four mechanisms of enzyme regulation", answer: "Allosteric regulation, covalent modification, enzyme induction/repression, compartmentalization" }
    ]
  },
  {
    id: 3,
    topic: "Carbohydrate Metabolism",
    content: `Carbohydrate metabolism involves the breakdown and synthesis of carbohydrates for energy.

Glycolysis: Glucose → Pyruvate (cytoplasm)
- Net yield: 2 ATP, 2 NADH per glucose
- Key enzymes: Hexokinase, PFK-1, Pyruvate kinase

Gluconeogenesis: Synthesis of glucose from non-carbohydrate sources
- Precursors: Amino acids, lactate, glycerol
- Key enzymes: PEPCK, F-1,6-BPase, G-6-Pase

Glycogen Metabolism:
- Synthesis: Glycogen synthase
- Breakdown: Glycogen phosphorylase`,
    flashcards: [
      { id: 7, question: "What is the net ATP yield from glycolysis per glucose molecule?", answer: "2 ATP (and 2 NADH)" },
      { id: 8, question: "Name three precursors for gluconeogenesis", answer: "Amino acids, lactate, glycerol" },
      { id: 9, question: "Which enzyme is responsible for glycogen breakdown?", answer: "Glycogen phosphorylase" }
    ]
  },
  {
    id: 4,
    topic: "Lipid Metabolism",
    content: `Lipid metabolism encompasses the synthesis and breakdown of fatty acids and cholesterol.

Fatty Acid Oxidation (β-oxidation):
- Location: Mitochondria
- Process: Sequential removal of 2-carbon units as acetyl-CoA
- Yield: ~147 ATP per palmitic acid (16-carbon)

Fatty Acid Synthesis:
- Location: Cytoplasm
- Key enzyme: Fatty acid synthase
- Precursor: Acetyl-CoA from citrate

Cholesterol Metabolism:
- Rate-limiting enzyme: HMG-CoA reductase
- Regulation: Feedback inhibition by cholesterol`,
    flashcards: [
      { id: 10, question: "Where does β-oxidation of fatty acids occur?", answer: "Mitochondria" },
      { id: 11, question: "What is the rate-limiting enzyme in cholesterol synthesis?", answer: "HMG-CoA reductase" },
      { id: 12, question: "How many ATP molecules are generated from complete oxidation of palmitic acid?", answer: "Approximately 147 ATP" }
    ]
  },
  {
    id: 5,
    topic: "Amino Acid Metabolism",
    content: `Amino acid metabolism involves both catabolism and anabolism of amino acids.

Transamination:
- Transfer of amino groups between amino acids
- Key enzymes: ALT (alanine aminotransferase), AST (aspartate aminotransferase)

Deamination:
- Removal of amino groups
- Produces ammonia, which is converted to urea

Urea Cycle:
- Location: Liver (mitochondria and cytoplasm)
- Purpose: Convert toxic ammonia to less toxic urea
- Key enzymes: CPS-I, OTC, ASS, ASL, arginase`,
    flashcards: [
      { id: 13, question: "What is the purpose of the urea cycle?", answer: "Convert toxic ammonia to less toxic urea for excretion" },
      { id: 14, question: "Name two key transaminase enzymes", answer: "ALT (alanine aminotransferase) and AST (aspartate aminotransferase)" },
      { id: 15, question: "Where does the urea cycle occur?", answer: "Liver (both mitochondria and cytoplasm)" }
    ]
  }
];

// Psychological analysis questions
const psychQuestions = [
  {
    id: 1,
    question: "How confident do you feel about your current biochemistry knowledge?",
    options: ["Very confident", "Confident", "Somewhat confident", "Not confident"],
    category: "confidence"
  },
  {
    id: 2,
    question: "When faced with a challenging topic, you prefer to:",
    options: ["Tackle it immediately", "Break it into smaller parts", "Review basics first", "Seek help from others"],
    category: "challenge_response"
  },
  {
    id: 3,
    question: "How do you best process new information?",
    options: ["Visual diagrams", "Written explanations", "Audio lectures", "Hands-on practice"],
    category: "information_processing"
  },
  {
    id: 4,
    question: "Which memory technique works best for you?",
    options: ["Repetition", "Mnemonics", "Concept mapping", "Practice questions"],
    category: "memory_techniques"
  },
  {
    id: 5,
    question: "What motivates you most in studying?",
    options: ["Achieving high scores", "Understanding concepts", "Competing with peers", "Personal growth"],
    category: "motivation_style"
  },
  {
    id: 6,
    question: "How do you handle study-related stress?",
    options: ["Take breaks", "Push through", "Change environment", "Talk to someone"],
    category: "stress_management"
  },
  {
    id: 7,
    question: "When do you study most effectively?",
    options: ["Early morning", "Afternoon", "Evening", "Late night"],
    category: "learning_timing"
  },
  {
    id: 8,
    question: "Your ideal study environment is:",
    options: ["Quiet library", "Home with music", "Group study", "Outdoor spaces"],
    category: "study_environment"
  },
  {
    id: 9,
    question: "How long can you typically focus in one session?",
    options: ["15-30 minutes", "30-60 minutes", "1-2 hours", "2+ hours"],
    category: "focus_duration"
  }
];

const BiochemistryApp = () => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState(null);
  const [psychAnalysis, setPsychAnalysis] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [studyGoal, setStudyGoal] = useState('');
  const [studyTime, setStudyTime] = useState(30);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [scores, setScores] = useState({});
  const [sessionScores, setSessionScores] = useState([]);

  // Login component
  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">BioChem Pro</h1>
          <p className="text-gray-600">NEET PG Biochemistry Mastery</p>
        </div>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                setUser({ name: e.target.value.trim() });
                setCurrentScreen('analysis');
              }
            }}
          />
          <button
            onClick={() => {
              const name = document.querySelector('input').value.trim();
              if (name) {
                setUser({ name });
                setCurrentScreen('analysis');
              }
            }}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
          >
            Start Learning Journey
          </button>
        </div>
      </div>
    </div>
  );

  // Psychological analysis component
  const PsychAnalysis = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Psychological Analysis</h2>
            <div className="text-sm text-gray-500">
              {currentQuestion + 1} / {psychQuestions.length}
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / psychQuestions.length) * 100}%` }}
            />
          </div>

          <div className="mb-8">
            <h3 className="text-xl text-gray-800 mb-6">{psychQuestions[currentQuestion]?.question}</h3>
            <div className="space-y-3">
              {psychQuestions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const newAnswers = { ...answers };
                    newAnswers[psychQuestions[currentQuestion].id] = {
                      option,
                      category: psychQuestions[currentQuestion].category
                    };
                    setAnswers(newAnswers);
                  }}
                  className={`w-full p-4 text-left rounded-xl transition-all ${
                    answers[psychQuestions[currentQuestion].id]?.option === option
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-gray-200 text-gray-600 rounded-xl disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (currentQuestion < psychQuestions.length - 1) {
                  setCurrentQuestion(currentQuestion + 1);
                } else {
                  setPsychAnalysis(answers);
                  setCurrentScreen('dashboard');
                }
              }}
              disabled={!answers[psychQuestions[currentQuestion]?.id]}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl disabled:opacity-50"
            >
              {currentQuestion === psychQuestions.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Dashboard component
  const Dashboard = () => {
    const getRecommendations = () => {
      if (!psychAnalysis) return [];
      
      const confidence = psychAnalysis[1]?.option || '';
      const challenge = psychAnalysis[2]?.option || '';
      
      let recommendations = [];
      
      if (confidence.includes('Not confident')) {
        recommendations.push("Start with foundational topics like protein structure");
        recommendations.push("Use visual aids and concept mapping");
      } else if (confidence.includes('Very confident')) {
        recommendations.push("Focus on advanced enzyme kinetics");
        recommendations.push("Challenge yourself with complex metabolic pathways");
      }
      
      if (challenge.includes('Break it into smaller parts')) {
        recommendations.push("Use spaced repetition for better retention");
        recommendations.push("Focus on one metabolic pathway at a time");
      }
      
      return recommendations;
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.name}!</h1>
                <p className="text-gray-600">Ready to master biochemistry?</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-full">
                  <User className="text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Study Goal Setting */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Target className="mr-2 text-blue-500" />
                Today's Study Session
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Study Goal</label>
                  <input
                    type="text"
                    value={studyGoal}
                    onChange={(e) => setStudyGoal(e.target.value)}
                    placeholder="e.g., Master enzyme kinetics for tomorrow's test"
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Study Duration (minutes)</label>
                  <input
                    type="number"
                    value={studyTime}
                    onChange={(e) => setStudyTime(Number(e.target.value))}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Personalized Recommendations</h3>
                <div className="space-y-2">
                  {getRecommendations().map((rec, index) => (
                    <div key={index} className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                      <Star className="text-yellow-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Progress Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Topics Completed</span>
                    <span className="font-bold text-green-500">{Object.keys(scores).length}/{biochemistryTopics.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Score</span>
                    <span className="font-bold text-blue-500">
                      {Object.keys(scores).length > 0 
                        ? Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length)
                        : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Study Streak</span>
                    <span className="font-bold text-orange-500">1 day</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentScreen('progress')}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all"
              >
                View Detailed Analytics
              </button>
            </div>
          </div>

          {/* Topics Grid */}
          <div className="mt-6 bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <BookOpen className="mr-2 text-purple-500" />
              Biochemistry Topics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {biochemistryTopics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopic(topic);
                    setCurrentScreen('study');
                  }}
                  className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 transition-all cursor-pointer hover:shadow-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{topic.topic}</h3>
                    {scores[topic.id] && (
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                        {scores[topic.id]}%
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    {topic.content.substring(0, 100)}...
                  </p>
                  <div className="flex items-center text-purple-500 text-sm font-medium">
                    <span>Start Learning</span>
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Study screen with notes and flashcards
  const StudyScreen = () => {
    const [studyMode, setStudyMode] = useState('notes'); // 'notes' or 'flashcards'

    const handleCardScore = (correct) => {
      const newSessionScores = [...sessionScores, correct ? 1 : 0];
      setSessionScores(newSessionScores);
      
      if (currentCard < selectedTopic.flashcards.length - 1) {
        setCurrentCard(currentCard + 1);
        setShowAnswer(false);
      } else {
        // Calculate final score
        const finalScore = Math.round((newSessionScores.reduce((a, b) => a + b, 0) / newSessionScores.length) * 100);
        setScores(prev => ({ ...prev, [selectedTopic.id]: finalScore }));
        setCurrentScreen('dashboard');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{selectedTopic?.topic}</h1>
                <p className="text-gray-600">Study Goal: {studyGoal}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setStudyMode('notes')}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    studyMode === 'notes' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  Notes
                </button>
                <button
                  onClick={() => setStudyMode('flashcards')}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    studyMode === 'flashcards' 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  Flashcards
                </button>
                <button
                  onClick={() => setCurrentScreen('dashboard')}
                  className="px-4 py-2 bg-gray-200 text-gray-600 rounded-xl hover:bg-gray-300 transition-all"
                >
                  Back
                </button>
              </div>
            </div>
          </div>

          {studyMode === 'notes' ? (
            // Notes view
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="prose max-w-none">
                {selectedTopic?.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-800 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <button
                  onClick={() => setStudyMode('flashcards')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
                >
                  Practice with Flashcards
                </button>
              </div>
            </div>
          ) : (
            // Flashcard view
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="text-center mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Card {currentCard + 1} of {selectedTopic?.flashcards.length}</span>
                  <div className="flex items-center space-x-2">
                    {sessionScores.map((score, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                          score === 1 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentCard + 1) / selectedTopic?.flashcards.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="min-h-[300px] flex items-center justify-center">
                <div className="text-center max-w-2xl">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {showAnswer ? 'Answer:' : 'Question:'}
                    </h3>
                    <p className="text-lg text-gray-700">
                      {showAnswer 
                        ? selectedTopic?.flashcards[currentCard]?.answer
                        : selectedTopic?.flashcards[currentCard]?.question
                      }
                    </p>
                  </div>

                  {!showAnswer ? (
                    <button
                      onClick={() => setShowAnswer(true)}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all"
                    >
                      Show Answer
                    </button>
                  ) : (
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => handleCardScore(false)}
                        className="flex items-center bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-all"
                      >
                        <XCircle className="mr-2" />
                        Incorrect
                      </button>
                      <button
                        onClick={() => handleCardScore(true)}
                        className="flex items-center bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all"
                      >
                        <CheckCircle className="mr-2" />
                        Correct
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Progress screen
  const ProgressScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <TrendingUp className="mr-2 text-purple-500" />
              Progress Analytics
            </h1>
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-xl hover:bg-gray-300 transition-all"
            >
              Back to Dashboard
            </button>
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Topics Completed</h3>
                  <p className="text-3xl font-bold text-blue-600">{Object.keys(scores).length}</p>
                
