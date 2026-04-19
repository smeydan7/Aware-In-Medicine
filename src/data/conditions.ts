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
  { slug: 'adhd', name: 'ADHD', fullName: 'attention deficit hyperactivity disorder', category: 'Mental Health', week: 1, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7522704662357691654?is_from_webapp=1&sender_device=pc&web_id=7616071265966982676' },
  { slug: 'pcos', name: 'PCOS', fullName: 'polycystic ovary syndrome', category: 'Reproductive', week: 2, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7523620171253091589?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'lupus', name: 'Lupus', category: 'Autoimmune', week: 3, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7524486844088634630?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'ibs', name: 'IBS', fullName: 'irritable bowel syndrome', category: 'Digestive', week: 4, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7525230803119394054?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'fibromyalgia', name: 'Fibromyalgia', category: 'Musculoskeletal', week: 5, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7525979672379657528?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'crohns-disease', name: "Crohn's Disease", category: 'Digestive', week: 6, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7526709912953539896?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'ocd', name: 'OCD', fullName: 'obsessive compulsive disorder', category: 'Mental Health', week: 7, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7527390410768092422?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'pots', name: 'POTS', fullName: 'postural orthostatic tachycardia syndrome', category: 'Cardiovascular', week: 8, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7528132623021968645?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'insomnia', name: 'Insomnia', category: 'Neurological', week: 9, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7528902810365201670?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'asthma', name: 'Asthma', category: 'Respiratory', week: 10, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7529648153977556280?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'diabetes', name: 'Diabetes', category: 'Endocrine', week: 11, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7530372791917432120?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'alzheimers', name: "Alzheimer's", category: 'Neurological', week: 12, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7531083241357331768?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'cystic-fibrosis', name: 'Cystic Fibrosis', category: 'Genetic', week: 13, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7531848975809334534?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'endometriosis', name: 'Endometriosis', category: 'Reproductive', week: 14, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7532608375067020549?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'anemia', name: 'Anemia', category: 'Blood & Circulatory', week: 15, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7533319278771162373?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'celiacs-disease', name: "Celiac's Disease", category: 'Autoimmune', week: 16, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7534063304310787384?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'tourettes-syndrome', name: "Tourette's Syndrome", category: 'Neurological', week: 17, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7534854861431606584?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'psoriasis', name: 'Psoriasis', category: 'Dermatological', week: 18, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7535593231543749893?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'dyslexia', name: 'Dyslexia', category: 'Neurological', week: 19, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7536303781089119494?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'scoliosis', name: 'Scoliosis', category: 'Musculoskeletal', week: 20, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7537054709652229381?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'hemophilia', name: 'Hemophilia', category: 'Blood & Circulatory', week: 21, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7537830796531404088?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'schizophrenia', name: 'Schizophrenia', category: 'Mental Health', week: 22, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7538589071057095944?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'lyme-disease', name: 'Lyme Disease', category: 'Infectious', week: 23, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7539276297864760593?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'tuberculosis', name: 'Tuberculosis', category: 'Infectious', week: 24, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7539991185578790164?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'sarcoidosis', name: 'Sarcoidosis', category: 'Autoimmune', week: 25, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7540750392443948309?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'eds', name: 'EDS', fullName: 'ehlers-danlos syndromes', category: 'Genetic', week: 26, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7541504949985840391?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'graves-disease', name: "Graves' Disease", category: 'Endocrine', week: 27, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7542278069633944853?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'ms', name: 'MS', fullName: 'multiple sclerosis', category: 'Autoimmune', week: 28, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7543018950087462164?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'huntingtons-disease', name: "Huntington's Disease", category: 'Genetic', week: 29, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7543790608989687047?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'vasculitis', name: 'Vasculitis', category: 'Autoimmune', week: 30, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7544523135278796052?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'itp', name: 'ITP', fullName: 'immune thrombocytopenia', category: 'Blood & Circulatory', week: 31, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7545267718790876436?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'bells-palsy', name: "Bell's Palsy", category: 'Neurological', week: 32, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7546008442956303636?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'eczema', name: 'Eczema', category: 'Dermatological', week: 33, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7546710187470556432?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'ppd', name: 'PPD', fullName: 'postpartum depression', category: 'Mental Health', week: 34, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7547425909830110469?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'leprosy', name: 'Leprosy', fullName: "hansen's disease", category: 'Infectious', week: 35, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7547426177758006534?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'anxiety', name: 'Anxiety', category: 'Mental Health', week: 36, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7547426351578369336?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'alopecia', name: 'Alopecia', category: 'Dermatological', week: 37, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7547426643044846853?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'rabies', name: 'Rabies', category: 'Infectious', week: 38, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7547427590261230904?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'bronchitis', name: 'Bronchitis', category: 'Respiratory', week: 39, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7547427842691173637?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'colour-blindness', name: 'Colour Blindness', category: 'Sensory', week: 40, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7547428095364467974?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'ataxia', name: 'Ataxia', category: 'Neurological', week: 41, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7547430571316874502?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'utis', name: 'UTIs', fullName: 'urinary tract infections', category: 'Infectious', week: 42, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7547434073656937733?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'pdk', name: 'PDK', category: 'Other', week: 43, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7547437573233282310?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'turners-syndrome', name: "Turner's Syndrome", category: 'Genetic', week: 44, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7547440648929037573?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'hydrocephalus', name: 'Hydrocephalus', category: 'Neurological', week: 45, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7556007467239410955?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'influenza', name: 'Influenza', category: 'Infectious', week: 46, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7556794269072215307?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'epilepsy', name: 'Epilepsy', category: 'Neurological', week: 47, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7558703580270644492?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'hypothyroidism', name: 'Hypothyroidism', category: 'Endocrine', week: 48, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7558704209378446603?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'gallstones', name: 'Gallstones', category: 'Digestive', week: 49, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7561245653997735189?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'gout', name: 'Gout', category: 'Musculoskeletal', week: 50, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7562002459397311765?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'menopause', name: 'Menopause', category: 'Reproductive', week: 51, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7564157415046810900?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'sickle-cell-disease', name: 'Sickle Cell Disease', category: 'Blood & Circulatory', week: 52, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7565000258531462421?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'copd', name: 'COPD', fullName: 'chronic obstructive pulmonary disease', category: 'Respiratory', week: 53, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7566759433825520916?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'als', name: 'ALS', fullName: 'amyotrophic lateral sclerosis', category: 'Neurological', week: 54, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7567400927867718932?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'malaria', name: 'Malaria', category: 'Infectious', week: 55, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7568994285614402837?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'migraines', name: 'Migraines', category: 'Neurological', week: 56, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7569735110040259860?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'marfan-syndrome', name: 'Marfan Syndrome', category: 'Genetic', week: 57, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7571651536808316180?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'sleep-apnea', name: 'Sleep Apnea', category: 'Respiratory', week: 58, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7605038442455682325?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'mctd', name: 'MCTD', fullName: 'mixed connective tissue disease', category: 'Autoimmune', week: 59, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7605038594843069716?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'crps', name: 'CRPS', fullName: 'complex regional pain syndrome', category: 'Neurological', week: 60, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7605038745221336340?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'amyloidosis', name: 'Amyloidosis', category: 'Other', week: 61, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7605038902985886997?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'porphyria', name: 'Porphyria', category: 'Genetic', week: 62, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7605039012310535445?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'uctd', name: 'UCTD', fullName: 'undifferentiated connective tissue disease', category: 'Autoimmune', week: 63, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7616063138563230996?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'sps', name: 'SPS', fullName: 'stiff person syndrome', category: 'Autoimmune', week: 64, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7616063634963172628?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'cushings', name: "Cushing's", fullName: "Cushing's Syndrome", category: 'Endocrine', week: 65, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7616064131078098196?is_from_webapp=1&web_id=7616071265966982676' },
  { slug: 'wilsons', name: "Wilson's", fullName: "Wilson's Disease", category: 'Genetic', week: 66, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7616064774610160916?is_from_webapp=1&sender_device=pc&web_id=7589736926786389522' },
  { slug: 'fnd', name: 'FND', fullName: 'Functional neurological disorder', category: 'Neurological', week: 67, tiktokUrl: 'https://www.tiktok.com/@awareinmedicine/photo/7626512457225342228?is_from_webapp=1&sender_device=pc&web_id=7589736926786389522' },
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
