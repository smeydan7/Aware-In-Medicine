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
      `When visiting a doctor, asking questions can help you better understand your condition and treatment, 
      and it is always appropriate to request clarification if something is unclear. You may want to ask 
      about your condition, including its name, causes, and whether it is temporary or long-term; about 
      tests and diagnosis, such as why a test is needed, what it will show, and any associated risks or 
      preparations; about treatment options, including available approaches, their benefits and possible 
      side effects, and how long they may take to work; and about next steps, such as which symptoms to monitor, 
      when to return for a follow-up, and when to seek urgent care.`,
    ],
  },
  {
    id: 'basic-terminology',
    title: 'Understanding Basic Terminology',
    summary:
      'A short glossary to help you decode charts, test results, and conversations with clinicians.',
    content: [
      `Doctors often use medical terminology that may be unfamiliar, but learning a few common terms 
      can make conversations easier to understand. A diagnosis is the identification of a disease or 
      condition based on symptoms, tests, and medical evaluation; symptoms are changes in the body that 
      indicate a possible health issue, such as pain, fatigue, or fever; a chronic condition is a long-term 
      health issue that often requires ongoing management; an acute condition develops suddenly and typically 
      lasts a short time; and treatment refers to the medical care provided to manage or cure a condition.`
    ],
  },
  {
    id: 'prepare-for-appointment',
    title: "How to Prepare for a Doctor's Appointment",
    summary:
      'Ten minutes of prep can make a fifteen-minute visit far more productive.',
    content: [
      `Preparing for a medical visit can help you get the most out of your appointment.
      Before your visit, write down your symptoms and when they began, make a list of medications 
      you are taking, note any important medical history, and prepare questions you want to ask. During 
      your appointment, be honest about your symptoms, ask for clarification if anything is confusing, 
      and take notes if needed. After your appointment, follow treatment instructions carefully, schedule 
      any recommended follow-ups, and monitor your symptoms.`
    ],
  },
  {
    id: 'understanding-symptoms',
    title: 'Understanding Symptoms',
    summary:
      'Symptoms are signals. Knowing how to describe them helps providers help you.',
    content: [
      `Symptoms are signals that the body may not be functioning normally, and paying close 
      attention to them can support more accurate diagnosis. It is helpful to note when symptoms started, 
      how often they occur, what makes them better or worse, and how severe they are, as tracking these 
      details can help doctors make more informed assessments.`
    ],
  },
  {
    id: 'reliable-information',
    title: 'Reliable Health Information',
    summary:
      'Where to look and who to trust when searching for health information online.',
    content: [
      `Not all health information online is accurate, so it is important to rely on trusted sources when 
      researching medical topics. Reliable sources include major hospitals and medical institutions, government 
      health agencies, peer-reviewed medical journals, and reputable health organizations, and it is always 
      essential to consult healthcare professionals for medical advice or treatment decisions.`
    ],
  },
  {
    id: 'when-to-seek-help',
    title: 'When to Seek Medical Help',
    summary:
      'Learn the difference between wait-and-see, primary care, urgent care, and the ER.',
    content: [
      `Certain symptoms should always be evaluated by a healthcare professional. Seek medical care if you 
      experience severe or persistent pain, difficulty breathing, sudden changes in vision or speech, a high 
      fever that does not improve, or symptoms that worsen quickly; if you are unsure whether a symptom is 
      serious, it is always safer to consult a medical professional.`
    ],
  },
  {
    id: 'how-diagnosis-works',
    title: 'How Doctors Diagnose Conditions',
    summary:
      'A look at what actually happens between "I have symptoms" and a named diagnosis.',
    content: [
      `Diagnosing a medical condition usually involves several steps, as doctors gather information from 
      different sources to understand what may be causing a patient's symptoms. This process includes reviewing 
      medical history—such as current symptoms, when they began, family medical history, past illnesses or 
      conditions, and medications being taken—to help identify possible causes; conducting a physical examination, 
      which may involve checking heart rate, breathing, blood pressure, temperature, and reflexes or areas of pain 
      to assess how the body is functioning; and, when necessary, ordering medical tests such as blood tests, 
      imaging (including X-rays, CT scans, or MRIs), urine tests, or biopsies to help confirm or rule out 
      potential diagnoses.`
    ],
  },
  {
    id: 'risk-vs-causes',
    title: 'Understanding Risk Factors vs Causes',
    summary:
      'Why "increases your risk" is not the same thing as "will give you."',
    content: [
      `When learning about diseases, it is important to understand the difference between causes and risk factors.
       A cause is something that directly leads to a disease, such as a virus causing an infection, while a risk 
       factor increases the likelihood that someone may develop a condition without guaranteeing it; examples of 
       risk factors include age, genetics, lifestyle habits, and environmental exposure. Understanding this 
       distinction helps people interpret medical information more accurately.`
    ],
  },
  {
    id: 'evaluate-online',
    title: 'How to Evaluate Health Information Online',
    summary:
      'Quick checks to separate trustworthy articles from misleading ones.',
    content: [
      `Health information is widely available online, but not all sources are reliable, so it is important to 
      evaluate credibility when reading about medical topics. Trusted information typically comes from government 
      health organizations, major hospitals or universities, peer-reviewed medical journals, and recognized health 
      organizations, and it should reference scientific research, explain where the information comes from, and 
      avoid exaggerated claims. It is also important to be cautious of misinformation from sources that promise 
      quick cures, use sensational language, or fail to cite credible evidence, and to always consult a healthcare 
      professional for personal medical advice.`
    ],
  },
  {
    id: 'health-literacy',
    title: 'Why Does Health Literacy Matter?',
    summary:
      'The single skill that improves almost every interaction with the healthcare system.',
    content: [
      `Health literacy refers to the ability to understand health information and make informed decisions about 
      care, and improving it can help individuals better understand medical conditions, follow treatment plans 
      correctly, communicate more effectively with healthcare providers, and recognize when to seek medical 
      attention. Educational initiatives like Aware in Medicine aim to make health knowledge more accessible 
      so that people feel more confident navigating medical information.`
    ],
  },
];
