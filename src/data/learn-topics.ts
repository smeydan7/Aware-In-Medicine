import type { LearnTopic } from '@/types';

/**
 * "Learn the Basics" educational topics.
 *
 * Sourced from the original site's accordion sections. Each topic
 * renders as an expandable card on the /learn page.
 *
 * The `content` field is an array of paragraphs so we can style spacing
 * consistently without parsing HTML.
 */

export const learnTopics: LearnTopic[] = [
  {
    id: 'what-to-ask',
    title: 'What to Ask Your Healthcare Provider',
    summary:
      'Come prepared with the right questions so you leave your appointment with clarity.',
    content: [
      'Good questions turn an appointment from a rushed check-in into a useful conversation. Before you go, jot down what concerns you most.',
      'A few prompts that work in almost any visit: What is the most likely cause of my symptoms? What tests do I need, and why? What are the treatment options and their trade-offs? When should I come back, and what should I watch for in the meantime?',
      'Bring your list on paper or on your phone. You do not have to remember everything, you just have to bring the list.',
    ],
  },
  {
    id: 'basic-terminology',
    title: 'Understanding Basic Terminology',
    summary:
      'A short glossary to help you decode charts, test results, and conversations with clinicians.',
    content: [
      'Medical vocabulary can feel like a second language. Learning a handful of common terms makes everything else easier to parse.',
      'Acute means short-term and sudden. Chronic means long-lasting. Benign means not cancerous. Malignant means cancerous. A diagnosis is the name of a condition; a prognosis is the likely outcome.',
      'When you hear a word you do not know, it is always okay to ask your provider to define it. Most are happy to.',
    ],
  },
  {
    id: 'prepare-for-appointment',
    title: "How to Prepare for a Doctor's Appointment",
    summary:
      'Ten minutes of prep can make a fifteen-minute visit far more productive.',
    content: [
      'Write down your symptoms with timing details: when they started, how often they happen, what makes them better or worse.',
      'Bring a current list of medications and supplements, including doses. If you have recent test results from another provider, bring those too.',
      'If the appointment is complex, consider bringing a trusted person. Two sets of ears catch more.',
    ],
  },
  {
    id: 'understanding-symptoms',
    title: 'Understanding Symptoms',
    summary:
      'Symptoms are signals. Knowing how to describe them helps providers help you.',
    content: [
      'A symptom is something you feel or notice, like pain, fatigue, or dizziness. A sign is something measurable, like a temperature or a rash.',
      'When describing a symptom, cover five things: where it is, what it feels like, how severe it is, when it happens, and what makes it change.',
      'Tracking symptoms over a few days gives clinicians a much fuller picture than memory alone.',
    ],
  },
  {
    id: 'reliable-information',
    title: 'Reliable Health Information',
    summary:
      'Where to look and who to trust when searching for health information online.',
    content: [
      'Not every health site is equal. Prioritize sources written or reviewed by clinicians: national health services, major medical centers, and peer-reviewed organizations.',
      'Good starting points include government health agencies, academic medical centers like Mayo Clinic and Cleveland Clinic, and nonprofit specialty organizations.',
      'Be cautious with personal blogs, wellness influencers, and sites that sell products alongside their advice. If a claim feels too absolute, look for a second source.',
    ],
  },
  {
    id: 'when-to-seek-help',
    title: 'When to Seek Medical Help',
    summary:
      'Learn the difference between wait-and-see, primary care, urgent care, and the ER.',
    content: [
      'Emergency rooms are for life-threatening problems: chest pain, trouble breathing, sudden weakness or numbness, severe bleeding, signs of stroke, or serious injury.',
      'Urgent care handles things that cannot wait days but are not emergencies: moderate infections, minor fractures, high but stable fevers.',
      'Primary care covers everything that can wait a few days to a couple of weeks. When in doubt, call your provider or a nurse helpline, they can help you decide.',
    ],
  },
  {
    id: 'how-diagnosis-works',
    title: 'How Doctors Diagnose Conditions',
    summary:
      'A look at what actually happens between "I have symptoms" and a named diagnosis.',
    content: [
      'Diagnosis is a process, not a single moment. Clinicians gather a history, do a physical exam, and often order tests to narrow down possibilities.',
      'Many conditions do not have a single definitive test. Instead, doctors use pattern recognition and a process of elimination, ruling out what it is not.',
      'This is why a diagnosis sometimes takes more than one visit, and why second opinions can be valuable for complex cases.',
    ],
  },
  {
    id: 'risk-vs-causes',
    title: 'Understanding Risk Factors vs Causes',
    summary:
      'Why "increases your risk" is not the same thing as "will give you."',
    content: [
      'A cause directly produces a condition. Risk factors only increase the likelihood, they do not guarantee it.',
      'Smoking is a risk factor for lung cancer, not a cause in the strict sense. Plenty of smokers never develop it, and some non-smokers do.',
      'Understanding this difference helps you weigh lifestyle changes realistically, without fatalism or false reassurance.',
    ],
  },
  {
    id: 'evaluate-online',
    title: 'How to Evaluate Health Information Online',
    summary:
      'Quick checks to separate trustworthy articles from misleading ones.',
    content: [
      'Check the author. Is there a named person with medical or scientific credentials?',
      'Check the date. Medicine changes, an article from ten years ago may be out of date.',
      'Check the citations. Reputable sources link to primary research or established guidelines, not just other blogs.',
      'Check the tone. Balanced language, acknowledged uncertainty, and a clear distinction between opinion and evidence are all good signs.',
    ],
  },
  {
    id: 'health-literacy',
    title: 'Why Does Health Literacy Matter?',
    summary:
      'The single skill that improves almost every interaction with the healthcare system.',
    content: [
      'Health literacy is the ability to find, understand, and use health information to make decisions.',
      'Higher health literacy is linked to better management of chronic conditions, more effective conversations with providers, and fewer hospital readmissions.',
      'Educational initiatives like Aware in Medicine exist to make this skill accessible to anyone, not just people with medical backgrounds.',
    ],
  },
];
