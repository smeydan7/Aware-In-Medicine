import type { Condition } from '@/types';

/**
 * All medical conditions featured on Aware in Medicine.
 *
 * Sourced from the Weekly Updates log and Conditions Library.
 * Each entry is categorized by body system to power the filter UI.
 *
 * To add a new condition:
 *   1. Append an entry here with the next week number.
 *   2. Add the category if it's new to the `ConditionCategory` union in types.
 *   3. That's it — the Weekly Updates page and Conditions Library pick it up.
 */

export const conditions: Condition[] = [
  { slug: 'adhd', name: 'ADHD', fullName: 'attention deficit hyperactivity disorder', category: 'Mental Health', week: 1 },
  { slug: 'pcos', name: 'PCOS', fullName: 'polycystic ovary syndrome', category: 'Reproductive', week: 2 },
  { slug: 'lupus', name: 'Lupus', category: 'Autoimmune', week: 3 },
  { slug: 'ibs', name: 'IBS', fullName: 'irritable bowel syndrome', category: 'Digestive', week: 4 },
  { slug: 'fibromyalgia', name: 'Fibromyalgia', category: 'Musculoskeletal', week: 5 },
  { slug: 'crohns-disease', name: "Crohn's Disease", category: 'Digestive', week: 6 },
  { slug: 'ocd', name: 'OCD', fullName: 'obsessive compulsive disorder', category: 'Mental Health', week: 7 },
  { slug: 'pots', name: 'POTS', fullName: 'postural orthostatic tachycardia syndrome', category: 'Cardiovascular', week: 8 },
  { slug: 'insomnia', name: 'Insomnia', category: 'Neurological', week: 9 },
  { slug: 'asthma', name: 'Asthma', category: 'Respiratory', week: 10 },
  { slug: 'diabetes', name: 'Diabetes', category: 'Endocrine', week: 11 },
  { slug: 'alzheimers', name: "Alzheimer's", category: 'Neurological', week: 12 },
  { slug: 'cystic-fibrosis', name: 'Cystic Fibrosis', category: 'Genetic', week: 13 },
  { slug: 'endometriosis', name: 'Endometriosis', category: 'Reproductive', week: 14 },
  { slug: 'anemia', name: 'Anemia', category: 'Blood & Circulatory', week: 15 },
  { slug: 'celiacs-disease', name: "Celiac's Disease", category: 'Autoimmune', week: 16 },
  { slug: 'tourettes-syndrome', name: "Tourette's Syndrome", category: 'Neurological', week: 17 },
  { slug: 'psoriasis', name: 'Psoriasis', category: 'Dermatological', week: 18 },
  { slug: 'dyslexia', name: 'Dyslexia', category: 'Neurological', week: 19 },
  { slug: 'scoliosis', name: 'Scoliosis', category: 'Musculoskeletal', week: 20 },
  { slug: 'hemophilia', name: 'Hemophilia', category: 'Blood & Circulatory', week: 21 },
  { slug: 'schizophrenia', name: 'Schizophrenia', category: 'Mental Health', week: 22 },
  { slug: 'lyme-disease', name: 'Lyme Disease', category: 'Infectious', week: 23 },
  { slug: 'tuberculosis', name: 'Tuberculosis', category: 'Infectious', week: 24 },
  { slug: 'sarcoidosis', name: 'Sarcoidosis', category: 'Autoimmune', week: 25 },
  { slug: 'eds', name: 'EDS', fullName: 'ehlers-danlos syndromes', category: 'Genetic', week: 26 },
  { slug: 'graves-disease', name: "Graves' Disease", category: 'Endocrine', week: 27 },
  { slug: 'ms', name: 'MS', fullName: 'multiple sclerosis', category: 'Autoimmune', week: 28 },
  { slug: 'huntingtons-disease', name: "Huntington's Disease", category: 'Genetic', week: 29 },
  { slug: 'vasculitis', name: 'Vasculitis', category: 'Autoimmune', week: 30 },
  { slug: 'itp', name: 'ITP', fullName: 'immune thrombocytopenia', category: 'Blood & Circulatory', week: 31 },
  { slug: 'bells-palsy', name: "Bell's Palsy", category: 'Neurological', week: 32 },
  { slug: 'eczema', name: 'Eczema', category: 'Dermatological', week: 33 },
  { slug: 'ppd', name: 'PPD', fullName: 'postpartum depression', category: 'Mental Health', week: 34 },
  { slug: 'leprosy', name: 'Leprosy', fullName: "hansen's disease", category: 'Infectious', week: 35 },
  { slug: 'anxiety', name: 'Anxiety', category: 'Mental Health', week: 36 },
  { slug: 'alopecia', name: 'Alopecia', category: 'Dermatological', week: 37 },
  { slug: 'rabies', name: 'Rabies', category: 'Infectious', week: 38 },
  { slug: 'bronchitis', name: 'Bronchitis', category: 'Respiratory', week: 39 },
  { slug: 'colour-blindness', name: 'Colour Blindness', category: 'Sensory', week: 40 },
  { slug: 'ataxia', name: 'Ataxia', category: 'Neurological', week: 41 },
  { slug: 'utis', name: 'UTIs', fullName: 'urinary tract infections', category: 'Infectious', week: 42 },
  { slug: 'turners-syndrome', name: "Turner's Syndrome", category: 'Genetic', week: 43 },
  { slug: 'hydrocephalus', name: 'Hydrocephalus', category: 'Neurological', week: 44 },
  { slug: 'influenza', name: 'Influenza', category: 'Infectious', week: 45 },
  { slug: 'epilepsy', name: 'Epilepsy', category: 'Neurological', week: 46 },
  { slug: 'hypothyroidism', name: 'Hypothyroidism', category: 'Endocrine', week: 47 },
  { slug: 'gallstones', name: 'Gallstones', category: 'Digestive', week: 48 },
  { slug: 'gout', name: 'Gout', category: 'Musculoskeletal', week: 49 },
  { slug: 'sickle-cell-disease', name: 'Sickle Cell Disease', category: 'Blood & Circulatory', week: 50 },
  { slug: 'copd', name: 'COPD', fullName: 'chronic obstructive pulmonary disease', category: 'Respiratory', week: 51 },
  { slug: 'als', name: 'ALS', fullName: 'amyotrophic lateral sclerosis', category: 'Neurological', week: 52 },
  { slug: 'malaria', name: 'Malaria', category: 'Infectious', week: 53 },
  { slug: 'migraines', name: 'Migraines', category: 'Neurological', week: 54 },
  { slug: 'marfan-syndrome', name: 'Marfan Syndrome', category: 'Genetic', week: 55 },
  { slug: 'sleep-apnea', name: 'Sleep Apnea', category: 'Respiratory', week: 56 },
  { slug: 'mctd', name: 'MCTD', fullName: 'mixed connective tissue disease', category: 'Autoimmune', week: 57 },
  { slug: 'crps', name: 'CRPS', fullName: 'complex regional pain syndrome', category: 'Neurological', week: 58 },
  { slug: 'amyloidosis', name: 'Amyloidosis', category: 'Other', week: 59 },
  { slug: 'porphyria', name: 'Porphyria', category: 'Genetic', week: 60 },
  { slug: 'uctd', name: 'UCTD', fullName: 'undifferentiated connective tissue disease', category: 'Autoimmune', week: 61 },
  { slug: 'sps', name: 'SPS', fullName: 'stiff person syndrome', category: 'Autoimmune', week: 62 },
];

/**
 * All unique categories, sorted alphabetically, for populating filter UI.
 */
export const allCategories = Array.from(
  new Set(conditions.map((c) => c.category))
).sort();

/**
 * Lookup a condition by slug.
 */
export function getConditionBySlug(slug: string): Condition | undefined {
  return conditions.find((c) => c.slug === slug);
}
