import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const API_KEY = process.env.NANO_BANANA_API_KEY;
if (!API_KEY) {
  console.error('Set NANO_BANANA_API_KEY environment variable');
  process.exit(1);
}

const MODEL = 'gemini-2.5-flash-image';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_IMAGE_PATH = path.resolve(__dirname, '../artifacts/Blue Fox Red Whale Base Image.jpg');
const WORDS_DIR = path.resolve(__dirname, '../public/images/reading/words');
const STORY_DIR = path.resolve(__dirname, '../public/images/reading/story');

const STYLE_PREFIX = `Children's book watercolor illustration, bright and friendly, simple shapes with soft outlines, colored pencil and watercolor style matching a children's storybook. Characters: Blue Fox (a small cute blue fox), Red Whale (a cheerful red whale), Pink Frog (a happy pink frog), Green Shark (a friendly green shark). White or light pastel background.`;

interface ContentWord {
  lessonNumber: number;
  word: string;
  imagePath: string;
}

const bigContentWords: ContentWord[] = [
  { lessonNumber: 2, word: "blue", imagePath: "blue.webp" },
  { lessonNumber: 4, word: "fox", imagePath: "fox.webp" },
  { lessonNumber: 6, word: "red", imagePath: "red.webp" },
  { lessonNumber: 8, word: "whale", imagePath: "whale.webp" },
  { lessonNumber: 10, word: "saw", imagePath: "saw.webp" },
  { lessonNumber: 12, word: "sea", imagePath: "sea.webp" },
  { lessonNumber: 14, word: "help", imagePath: "help.webp" },
  { lessonNumber: 16, word: "lost", imagePath: "lost.webp" },
  { lessonNumber: 18, word: "boat", imagePath: "boat.webp" },
  { lessonNumber: 20, word: "sailed", imagePath: "sailed.webp" },
  { lessonNumber: 22, word: "new", imagePath: "new.webp" },
  { lessonNumber: 24, word: "pal", imagePath: "pal.webp" },
  { lessonNumber: 26, word: "whale's", imagePath: "whale's.webp" },
  { lessonNumber: 28, word: "both", imagePath: "both.webp" },
  { lessonNumber: 30, word: "pals", imagePath: "pals.webp" },
  { lessonNumber: 32, word: "happy", imagePath: "happy.webp" },
  { lessonNumber: 34, word: "next", imagePath: "next.webp" },
  { lessonNumber: 36, word: "trek", imagePath: "trek.webp" },
  { lessonNumber: 38, word: "thick", imagePath: "thick.webp" },
  { lessonNumber: 40, word: "shell", imagePath: "shell.webp" },
  { lessonNumber: 42, word: "what", imagePath: "what.webp" },
  { lessonNumber: 44, word: "asked", imagePath: "asked.webp" },
  { lessonNumber: 46, word: "could", imagePath: "could.webp" },
  { lessonNumber: 48, word: "green", imagePath: "green.webp" },
  { lessonNumber: 50, word: "shark", imagePath: "shark.webp" },
  { lessonNumber: 52, word: "all", imagePath: "all.webp" },
  { lessonNumber: 54, word: "three", imagePath: "three.webp" },
  { lessonNumber: 56, word: "flock", imagePath: "flock.webp" },
  { lessonNumber: 58, word: "camp", imagePath: "camp.webp" },
  { lessonNumber: 60, word: "by", imagePath: "by.webp" },
  { lessonNumber: 62, word: "lump", imagePath: "lump.webp" },
  { lessonNumber: 64, word: "bump", imagePath: "bump.webp" },
  { lessonNumber: 66, word: "pink", imagePath: "pink.webp" },
  { lessonNumber: 68, word: "frog", imagePath: "frog.webp" },
  { lessonNumber: 70, word: "stomp", imagePath: "stomp.webp" },
  { lessonNumber: 72, word: "set", imagePath: "set.webp" },
  { lessonNumber: 74, word: "gift", imagePath: "gift.webp" },
  { lessonNumber: 76, word: "soft", imagePath: "soft.webp" },
  { lessonNumber: 78, word: "raft", imagePath: "raft.webp" },
  { lessonNumber: 79, word: "lift", imagePath: "lift.webp" },
  { lessonNumber: 80, word: "under", imagePath: "under.webp" },
  { lessonNumber: 81, word: "chest", imagePath: "chest.webp" },
  { lessonNumber: 82, word: "great", imagePath: "great.webp" },
  { lessonNumber: 83, word: "map", imagePath: "map.webp" },
  { lessonNumber: 84, word: "felt", imagePath: "felt.webp" },
  { lessonNumber: 85, word: "their", imagePath: "their.webp" },
  { lessonNumber: 86, word: "four", imagePath: "four.webp" },
  { lessonNumber: 87, word: "use", imagePath: "use.webp" },
  { lessonNumber: 88, word: "quest", imagePath: "quest.webp" },
  { lessonNumber: 89, word: "past", imagePath: "past.webp" },
  { lessonNumber: 90, word: "steep", imagePath: "steep.webp" },
  { lessonNumber: 91, word: "rest", imagePath: "rest.webp" },
  { lessonNumber: 92, word: "stone", imagePath: "stone.webp" },
  { lessonNumber: 93, word: "first", imagePath: "first.webp" },
  { lessonNumber: 94, word: "clue", imagePath: "clue.webp" },
  { lessonNumber: 95, word: "star", imagePath: "star.webp" },
  { lessonNumber: 96, word: "post", imagePath: "post.webp" },
  { lessonNumber: 97, word: "nest", imagePath: "nest.webp" },
  { lessonNumber: 98, word: "yet", imagePath: "yet.webp" },
  { lessonNumber: 99, word: "lake", imagePath: "lake.webp" },
  { lessonNumber: 100, word: "gold", imagePath: "gold.webp" },
];

const wordSceneHints: Record<string, string> = {
  blue: "Blue Fox standing proudly, showing off his blue fur",
  fox: "Blue Fox smiling and waving",
  red: "Red Whale splashing in red-tinted water",
  whale: "Red Whale jumping out of the ocean with a big smile",
  saw: "Blue Fox looking through a telescope at the sea",
  sea: "A beautiful calm sea with waves, Blue Fox and Red Whale near the shore",
  help: "Blue Fox reaching a paw to help Red Whale",
  lost: "Blue Fox looking at a map upside down, confused expression",
  boat: "A small colorful sailboat on the water with Blue Fox aboard",
  sailed: "Blue Fox and Red Whale sailing together on a boat",
  new: "Blue Fox unwrapping a brand new shiny object with excitement",
  pal: "Blue Fox and Red Whale standing together as friends",
  "whale's": "Red Whale wearing a small crown or hat, proudly posing",
  both: "Blue Fox and Red Whale standing side by side, arms around each other",
  pals: "All four characters standing together in a group hug",
  happy: "All four characters jumping with joy, big smiles",
  next: "Blue Fox pointing forward down a path excitedly",
  trek: "The four pals walking along a mountain trail with backpacks",
  thick: "The pals walking through a thick forest with big trees",
  shell: "Pink Frog holding up a beautiful big seashell",
  what: "Blue Fox with a big question mark above his head, curious expression",
  asked: "Red Whale with mouth open as if asking a question to Blue Fox",
  could: "Green Shark flexing muscles, looking strong and capable",
  green: "Green Shark swimming happily, showing off green color",
  shark: "Green Shark doing a cool pose with sunglasses",
  all: "All four characters together in a circle, viewed from above",
  three: "Blue Fox, Red Whale, and Pink Frog standing in a line holding up three fingers",
  flock: "A flock of colorful birds flying over the four pals",
  camp: "The four pals around a campfire with a tent behind them",
  by: "Blue Fox sitting by a peaceful stream under a tree",
  lump: "A funny big lump in the ground with the pals looking at it curiously",
  bump: "Pink Frog bumping into Blue Fox playfully, both laughing",
  pink: "Pink Frog posing and showing off her pink color proudly",
  frog: "Pink Frog jumping high with a big happy smile",
  stomp: "Pink Frog stomping in a puddle, water splashing everywhere",
  set: "Blue Fox setting up a tent at camp while the pals watch",
  gift: "Red Whale giving a wrapped present to Blue Fox",
  soft: "Pink Frog cuddling a soft fluffy pillow",
  raft: "The four pals floating on a wooden raft down a river",
  lift: "Green Shark lifting a big rock to show strength",
  under: "Blue Fox peeking under a big mushroom in the rain",
  chest: "A treasure chest with gold light coming from inside, the pals gathered around",
  great: "All four pals cheering with arms raised, a banner saying GREAT",
  map: "Blue Fox holding open a treasure map with X marks the spot",
  felt: "Pink Frog touching a soft flower petal with a gentle expression",
  their: "The four pals each holding their favorite item",
  four: "The number 4 made of flowers with one character at each corner",
  use: "Green Shark using a magnifying glass to look at something",
  quest: "The four pals marching forward heroically on an adventure path",
  past: "The pals looking back at a path they already walked",
  steep: "The pals climbing a steep hill together, helping each other",
  rest: "The four pals napping under a big tree peacefully",
  stone: "A special glowing stone on a mossy rock, Blue Fox reaching for it",
  first: "Blue Fox crossing a finish line with a ribbon, pals cheering",
  clue: "Pink Frog finding a scroll with a clue, magnifying glass in hand",
  star: "A bright golden star in the night sky with the pals looking up",
  post: "A wooden signpost at a crossroads pointing different directions",
  nest: "A cozy bird nest in a tree with the pals looking up at baby birds",
  yet: "Blue Fox with a determined expression, fist raised, ready to continue",
  lake: "A beautiful calm lake with mountains reflected in it, pals at the shore",
  gold: "A glowing pile of gold treasure with all four pals celebrating around it",
};

interface StoryPage {
  page: number;
  chapters: { chapter: number; text: string }[];
}

const storyPageSummaries: Record<number, string> = {};

// Build story page summaries from the chapter texts
const storyPagesData: StoryPage[] = [
  { page: 1, chapters: [
    { chapter: 1, text: "The four pals have a gold map and set out on a quest, sailing to find gold." },
    { chapter: 2, text: "Blue Fox and Red Whale rally the pals to help. The gold is past the sea." },
    { chapter: 3, text: "They are on the boat sailing. Blue Fox feels happy with the gold map." },
    { chapter: 4, text: "Blue Fox and Red Whale enjoy the quest. Pink Frog and Green Shark want more gold. They sailed onward." },
  ]},
  { page: 2, chapters: [
    { chapter: 5, text: "Red Whale calls pals together. The gold is near. The four pals join the quest." },
    { chapter: 6, text: "It's hot. Red Whale fans with his fin. The sea hits the boat. Group hug." },
    { chapter: 7, text: "Red Whale kicks and kisses Blue Fox. Pink Frog nods. The pals are happy." },
    { chapter: 8, text: "They go to a lake. The pals have cake. No gold yet at the lake." },
  ]},
  { page: 3, chapters: [
    { chapter: 9, text: "Pink Frog has ham. A kitten appears and wants ham too." },
    { chapter: 10, text: "Pink Frog finds an old kitten on sand. Green Shark invites it on the quest." },
    { chapter: 11, text: "The kitten and Red Whale bond. Blue Fox sees rocks past the lake." },
    { chapter: 12, text: "They make sacks for supplies. Pink Frog makes sacks. Blue Fox saves them." },
  ]},
  { page: 4, chapters: [
    { chapter: 13, text: "The sea is cold. Blue Fox has a coat. Red Whale gives one to Pink Frog." },
    { chapter: 14, text: "Green Shark needs a goat for the trek. Pink Frog has one for gold." },
    { chapter: 15, text: "They have socks. They see goats wearing coats and gold socks." },
    { chapter: 16, text: "Blue Fox sees a car with a cop. The cop will help the gold quest." },
  ]},
  { page: 5, chapters: [
    { chapter: 17, text: "The cop has big ears and goes far. Blue Fox invites him on the quest." },
    { chapter: 18, text: "Green Shark sees tar on rocks. Pink Frog has a mop. Blue Fox mops tar." },
    { chapter: 19, text: "A dog arrives with hope. The gold is here. Blue Fox has hope too." },
    { chapter: 20, text: "Pink Frog and Blue Fox run in fog. Cops run too. Sheep in fog. Gold is past it." },
  ]},
  { page: 6, chapters: [
    { chapter: 21, text: "Sheep are tame. Cars come from far. The pals have a thick shell. Wish for gold!" },
    { chapter: 22, text: "They chop a log. Pink Frog finds a park. Blue Fox finds a shop." },
    { chapter: 23, text: "Each pal has cakes at a farm near the sea. Green Shark wishes on the shell." },
    { chapter: 24, text: "A farm girl on a ship has a home. The girl will help the gold quest." },
  ]},
  { page: 7, chapters: [
    { chapter: 25, text: "The girl has a charm with pots. It starts raining. Red Whale sets the shell on rocks." },
    { chapter: 26, text: "Pots have wet tops in the rain. Blue Fox and Red Whale continue the quest." },
    { chapter: 27, text: "They go down a road past rocks. Blue Fox sits on the road. Pals go past." },
    { chapter: 28, text: "They see dogs with a pet. The four pals pet the dogs on the quest." },
  ]},
  { page: 8, chapters: [
    { chapter: 29, text: "Red Whale gives a big ham. A big bug bites Blue Fox." },
    { chapter: 30, text: "Pink Frog sees chicks. Green Shark sees a pig. Chicks run past." },
    { chapter: 31, text: "The pig is in a well. Blue Fox and Red Whale are happy. Bugs eat ham." },
    { chapter: 32, text: "Bugs hit Blue Fox and Pink Frog. They are getting sad. Quest goes on." },
  ]},
  { page: 9, chapters: [
    { chapter: 33, text: "Pink Frog sits on a leaf bed. A bug bites Green Shark." },
    { chapter: 34, text: "Blue Fox suggests fishing. Red Whale sleeps. Green Shark likes fishing." },
    { chapter: 35, text: "Blue Fox catches ten fish. Red Whale has five in a tub. End of fishing." },
    { chapter: 36, text: "Red Whale likes the tub. Pink Frog sits on rocks." },
  ]},
  { page: 10, chapters: [
    { chapter: 37, text: "Blue Fox says stop sitting. Green Shark says walk and talk on the quest." },
    { chapter: 38, text: "It's dark. Red Whale dives. They find a gold dime!" },
    { chapter: 39, text: "They are rich! Pink Frog sleeps. The gold quest is on." },
    { chapter: 40, text: "A boy with a deer arrives at the farms. The boy helps the quest." },
  ]},
  { page: 11, chapters: [
    { chapter: 41, text: "The boy is hunting. He leads the deer into the farms. Gold is near!" },
    { chapter: 42, text: "Waves come. It has been past a year. They stop at rocks. Gold near." },
    { chapter: 43, text: "Blue Fox says find a card. Pink Frog has a card with a gold clue!" },
    { chapter: 44, text: "Green Shark loves mother. Pink Frog hunts for mother. Blue Fox hunts for gold." },
  ]},
  { page: 12, chapters: [
    { chapter: 45, text: "They have seen the road. They bring another pal. Red Whale nods." },
    { chapter: 46, text: "An eagle comes up. It sees Red Whale's brother. Eagle helps the quest." },
    { chapter: 47, text: "The shore has a toy. Blue Fox takes it. Gold clue on the toy?" },
    { chapter: 48, text: "It's on the side. They must take it. The toy is a gold clue!" },
  ]},
  { page: 13, chapters: [
    { chapter: 49, text: "Blue Fox says he'll leave. The moon is up. The four pals jump." },
    { chapter: 50, text: "Red Whale will never leave. They see a pool. Some pals jump in for gold." },
    { chapter: 51, text: "They swim in the pool. The pool breaks. Pink Frog comes soon. Gold clue lost?" },
    { chapter: 52, text: "Every day they trek. They jump over rocks. Day by day gold is near." },
  ]},
  { page: 14, chapters: [
    { chapter: 53, text: "Pal jumps over rocks. Men start the trek. Red Whale was swimming." },
    { chapter: 54, text: "Red Whale walks back to camp. Blue Fox has the big gold map! Pals happy." },
    { chapter: 55, text: "Red Whale offers a hand. Nine pals will teach them of gold." },
    { chapter: 56, text: "They go away. Blue Fox has a bag for gold. The bill is in the bag." },
  ]},
  { page: 15, chapters: [
    { chapter: 57, text: "The bag is filled. They see a white tree. Inside is a stone with a clue to gold!" },
    { chapter: 58, text: "The eagle's nest is up. Blue Fox yells. They have a brush. Eagle helps!" },
    { chapter: 59, text: "They look at the eagle. Eagle saved a pal. They see a chest. Gold inside?" },
    { chapter: 60, text: "Eagle smiles. A tiger comes. Tiger brushes teeth and falls. Chest has gold map." },
  ]},
  { page: 16, chapters: [
    { chapter: 61, text: "The pals like the tree. A room has a stone with shine. Gold shine!" },
    { chapter: 62, text: "Eagle smiles with a tooth. They walk past steep rocks." },
    { chapter: 63, text: "They see a barn. Red Whale wants to fly! A horse comes near the barn." },
    { chapter: 64, text: "The horse teaches pals. Pink Frog says they hunt gold. Horse was born here." },
  ]},
  { page: 17, chapters: [
    { chapter: 65, text: "The horse had corn. Eagles come. Blue Fox gets the gold map." },
    { chapter: 66, text: "Red Whale sold a bag. They fold the gold map. First clue on a post." },
    { chapter: 67, text: "Blue Fox talks. Map was torn. Pink Frog sees a star on the post. Gold clue!" },
    { chapter: 68, text: "Blue Fox hears eagles. The map shows a mile to gold. Lots of trees." },
  ]},
  { page: 18, chapters: [
    { chapter: 69, text: "They feel fine. Gas on the road. They start. Gold is past more rocks." },
    { chapter: 70, text: "They stop at a town. Green Shark and Pink Frog help find gold." },
    { chapter: 71, text: "They see a black rock. Blue Fox has a book matching the gold map. Fun!" },
    { chapter: 72, text: "The pals sing together. They talk of gold. Gold is so near!" },
  ]},
  { page: 19, chapters: [
    { chapter: 73, text: "Blue Fox talks of gold. Pals have things in a bag. Time to go to gold!" },
    { chapter: 74, text: "They take the gold map and go fast. Blue Fox says gold is near!" },
    { chapter: 75, text: "Blue Fox sees a note. Read this part. Pink Frog feels sore. Gold note!" },
    { chapter: 76, text: "Pink Frog swims. They feel sad. They leave. Gold quest goes on." },
  ]},
  { page: 20, chapters: [
    { chapter: 77, text: "They deal with rocks. They zoom past. Gold is near!" },
    { chapter: 78, text: "They see grass. They feel fine. Bad rocks behind them. Quest on!" },
    { chapter: 79, text: "Blue Fox yells. Red Whale yells. They hold on. They start digging for gold." },
    { chapter: 80, text: "They dig and find sand. They see a hole. Gold in the hole?" },
  ]},
  { page: 21, chapters: [
    { chapter: 81, text: "They see a yard with holes. Blue Fox says stay near the quest." },
    { chapter: 82, text: "Red Whale wants to quit. Blue Fox says be quick! A beagle named Biff comes." },
    { chapter: 83, text: "Biff says Boo! The pals hold the beagle. Biff helps the gold quest!" },
    { chapter: 84, text: "Biff smells gold. They see a store. Biff has a story of gold." },
  ]},
  { page: 22, chapters: [
    { chapter: 85, text: "The gold map tears! Red Whale sees it tore. The pals fall asleep: Zzzz." },
    { chapter: 86, text: "Biff picks them up. They're on the rail. A pal comes back with a gold card." },
    { chapter: 87, text: "The pal is loud. Our pal is back! They pick the gold card." },
    { chapter: 88, text: "They hear a sound of gold. A chick sees them and the logs." },
  ]},
  { page: 23, chapters: [
    { chapter: 89, text: "Logs are outside. Pals shout. The chick comes to play. Quest on!" },
    { chapter: 90, text: "Blue Fox wants gold. The chick hides in logs. Let's hide, says Blue Fox." },
    { chapter: 91, text: "They see a line and notes. Something is on it. Gold notes!" },
    { chapter: 92, text: "It's hard for the leg. Don't stop! They see a green leaf. Gold past the leaf!" },
  ]},
  { page: 24, chapters: [
    { chapter: 93, text: "Red Whale has a pail with paint. Blap goes the paint! Gold paint!" },
    { chapter: 94, text: "They go deep. Ding! Pink Frog has a ruck. Gold is so near." },
    { chapter: 95, text: "Sounds are loud. They see spots. Blue Fox says spots help find gold!" },
    { chapter: 96, text: "Another big rock. They go around. The biggest rock has a clue. Gold past it!" },
  ]},
  { page: 25, chapters: [
    { chapter: 97, text: "They find dust and a house. A mouse lives in the house. Gold is here!" },
    { chapter: 98, text: "The mouse is proud. A spring comes up. The mouse leads pals to gold." },
    { chapter: 99, text: "Blam goes a bug! The four pals see tigers. The last tiger has a clue: gold is here!" },
    { chapter: 100, text: "Blue Fox, Red Whale, Pink Frog, and Green Shark find the gold! Thank you for the gold!" },
  ]},
];

function getWordPrompt(word: string): string {
  const hint = wordSceneHints[word] || `A scene depicting the concept "${word}" with Blue Fox`;
  return `${STYLE_PREFIX} Create a single square illustration depicting: ${hint}. The word "${word}" should be the clear theme. No text or letters in the image. Simple, cute, child-friendly.`;
}

function getChapterPrompt(chapterNum: number): string {
  const allChapters = storyPagesData.flatMap(p => p.chapters);
  const chapter = allChapters.find(ch => ch.chapter === chapterNum);
  if (!chapter) throw new Error(`No chapter ${chapterNum}`);

  return `${STYLE_PREFIX} Create a single square illustration for a children's story chapter: ${chapter.text}. No text, speech bubbles, or letters in the image. Simple scene, cute, child-friendly.`;
}

async function generateImage(prompt: string, aspectRatio: string): Promise<Buffer> {
  const baseImageData = fs.readFileSync(BASE_IMAGE_PATH);
  const base64Image = baseImageData.toString('base64');

  const body = {
    contents: [
      {
        parts: [
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: base64Image,
            },
          },
          {
            text: `Use this reference image for the art style. Match this watercolor children's book illustration style exactly. ${prompt}`,
          },
        ],
      },
    ],
    generationConfig: {
      responseModalities: ["IMAGE"],
      ...(aspectRatio && { imageConfig: { aspectRatio } }),
    },
  };

  const res = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }

  const json = await res.json() as any;

  for (const part of json.candidates?.[0]?.content?.parts ?? []) {
    if (part.inlineData?.data) {
      return Buffer.from(part.inlineData.data, 'base64');
    }
  }

  throw new Error('No image in response');
}

async function saveAsWebp(pngBuffer: Buffer, outPath: string, width: number, height: number) {
  await sharp(pngBuffer)
    .resize(width, height, { fit: 'cover' })
    .webp({ quality: 80 })
    .toFile(outPath);
}

async function generateWordImage(word: string) {
  const prompt = getWordPrompt(word);
  console.log(`  Generating word: "${word}"...`);
  const pngBuf = await generateImage(prompt, '1:1');
  const outPath = path.join(WORDS_DIR, `${word}.webp`);
  await saveAsWebp(pngBuf, outPath, 200, 200);
  console.log(`  ✓ ${word} → ${outPath}`);
}

async function generateChapterImage(chapterNum: number) {
  const prompt = getChapterPrompt(chapterNum);
  console.log(`  Generating chapter ${chapterNum}...`);
  const pngBuf = await generateImage(prompt, '1:1');
  const outPath = path.join(STORY_DIR, `chapter-${String(chapterNum).padStart(3, '0')}.webp`);
  await saveAsWebp(pngBuf, outPath, 400, 400);
  console.log(`  ✓ chapter-${String(chapterNum).padStart(3, '0')} → ${outPath}`);
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const args = process.argv.slice(2);
  const mode = args[0] || 'test';

  fs.mkdirSync(WORDS_DIR, { recursive: true });
  fs.mkdirSync(STORY_DIR, { recursive: true });

  if (mode === 'test') {
    console.log('=== TEST BATCH: 3 words + 3 chapter images ===');
    const testWords = ['blue', 'fox', 'gold'];
    for (const word of testWords) {
      await generateWordImage(word);
      await sleep(1000);
    }
    for (const ch of [1, 2, 3]) {
      await generateChapterImage(ch);
      await sleep(1000);
    }
    console.log('\nTest batch complete! Check the images and run with "words", "story", or "all" to generate the rest.');
  } else if (mode === 'words') {
    console.log(`=== GENERATING ${bigContentWords.length} WORD IMAGES ===`);
    for (const entry of bigContentWords) {
      const outPath = path.join(WORDS_DIR, `${entry.word}.webp`);
      const stat = fs.statSync(outPath, { throwIfNoEntry: false } as any);
      if (stat && stat.size > 1000) {
        console.log(`  Skipping "${entry.word}" (already exists, ${stat.size} bytes)`);
        continue;
      }
      await generateWordImage(entry.word);
      await sleep(500);
    }
    console.log('\nAll word images generated!');
  } else if (mode === 'story') {
    console.log('=== GENERATING 100 CHAPTER IMAGES ===');
    for (let ch = 1; ch <= 100; ch++) {
      const outPath = path.join(STORY_DIR, `chapter-${String(ch).padStart(3, '0')}.webp`);
      const stat = fs.statSync(outPath, { throwIfNoEntry: false } as any);
      if (stat && stat.size > 1000) {
        console.log(`  Skipping chapter ${ch} (already exists, ${stat.size} bytes)`);
        continue;
      }
      await generateChapterImage(ch);
      await sleep(500);
    }
    console.log('\nAll chapter images generated!');
  } else if (mode === 'all') {
    console.log('=== GENERATING ALL 86 IMAGES ===');
    console.log('\n--- Word Images ---');
    for (const entry of bigContentWords) {
      const outPath = path.join(WORDS_DIR, `${entry.word}.webp`);
      const stat = fs.statSync(outPath, { throwIfNoEntry: false } as any);
      if (stat && stat.size > 1000) {
        console.log(`  Skipping "${entry.word}" (already exists, ${stat.size} bytes)`);
        continue;
      }
      await generateWordImage(entry.word);
      await sleep(500);
    }
    console.log('\n--- Chapter Images ---');
    for (let ch = 1; ch <= 100; ch++) {
      const outPath = path.join(STORY_DIR, `chapter-${String(ch).padStart(3, '0')}.webp`);
      const stat = fs.statSync(outPath, { throwIfNoEntry: false } as any);
      if (stat && stat.size > 1000) {
        console.log(`  Skipping chapter ${ch} (already exists, ${stat.size} bytes)`);
        continue;
      }
      await generateChapterImage(ch);
      await sleep(500);
    }
    console.log('\nAll 161 images generated!');
  } else {
    console.log('Usage: npx tsx scripts/generate-images.ts [test|words|story|all]');
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
