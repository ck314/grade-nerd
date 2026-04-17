import { ReadingLesson, WordToken } from './readingTypes';

export const readingLessons: ReadingLesson[] = [
  { lesson: 1, newWord: "am", collectionSize: 1, versions: ["am."] },
  { lesson: 2, newWord: "me", collectionSize: 2, versions: ["me."] },
  { lesson: 3, newWord: "sat", collectionSize: 3, versions: ["sat."] },
  { lesson: 4, newWord: "see", collectionSize: 4, versions: ["see!"] },
  { lesson: 5, newWord: "at", collectionSize: 5, versions: ["at."] },
  { lesson: 6, newWord: "eat", collectionSize: 6, versions: ["eat!"] },
  { lesson: 7, newWord: "ram", collectionSize: 7, versions: ["ram!"] },
  { lesson: 8, newWord: "rat", collectionSize: 8, versions: ["rat!"] },
  { lesson: 9, newWord: "sam", collectionSize: 9, versions: ["sam."] },
  { lesson: 10, newWord: "seat", collectionSize: 10, versions: ["seat."] },
  { lesson: 11, newWord: "seed", collectionSize: 11, versions: ["eat seed.", "sam, seed!", "me? seed!"] },
  { lesson: 12, newWord: "mad", collectionSize: 12, versions: ["mad ram!", "sam, mad?", "mad rat!"] },
  { lesson: 13, newWord: "meat", collectionSize: 13, versions: ["eat meat!", "sam, meat.", "mad meat!"] },
  { lesson: 14, newWord: "read", collectionSize: 14, versions: ["read, sam.", "ram, read!", "me? read!"] },
  { lesson: 15, newWord: "sad", collectionSize: 15, versions: ["sad ram.", "sam, sad?", "sad meat!"] },
  { lesson: 16, newWord: "ear", collectionSize: 16, versions: ["ear? me?", "sam, ear!", "mad ear!"] },
  { lesson: 17, newWord: "it", collectionSize: 17, versions: ["eat it!", "it sat.", "see it!"] },
  { lesson: 18, newWord: "meet", collectionSize: 18, versions: ["meet me.", "meet sam!", "meet it?"] },
  { lesson: 19, newWord: "sit", collectionSize: 19, versions: ["sit, sam!", "sit, ram.", "sit! eat!"] },
  { lesson: 20, newWord: "is", collectionSize: 20, versions: ["is it?", "is sam?", "sam is."] },
  { lesson: 21, newWord: "seem", collectionSize: 21, versions: ["sam is sad.", "it seem mad.", "is it sam?"] },
  { lesson: 22, newWord: "that", collectionSize: 22, versions: ["that is sam.", "eat that meat!", "that seem mad."] },
  { lesson: 23, newWord: "this", collectionSize: 23, versions: ["this is it.", "eat this seed!", "is this sam?"] },
  { lesson: 24, newWord: "the", collectionSize: 24, versions: ["eat the meat!", "see the ram.", "the rat sat."] },
  { lesson: 25, newWord: "mitt", collectionSize: 25, versions: ["see the mitt!", "sam, the mitt!", "the mitt sat."] },
  { lesson: 26, newWord: "rid", collectionSize: 26, versions: ["rid the rat.", "rid the meat!", "sam, rid it!"] },
  { lesson: 27, newWord: "cat", collectionSize: 27, versions: ["the cat sat.", "the cat? mad!", "see the cat?"] },
  { lesson: 28, newWord: "sack", collectionSize: 28, versions: ["the sack sat.", "eat the sack?", "sam, the sack!"] },
  { lesson: 29, newWord: "rack", collectionSize: 29, versions: ["see the rack.", "the rack sat.", "rack the meat."] },
  { lesson: 30, newWord: "sick", collectionSize: 30, versions: ["sam is sick.", "sick cat. sad.", "is sam sick?"] },
  { lesson: 31, newWord: "a", collectionSize: 31, versions: ["sam is a cat.", "see a mad ram.", "a rat sat. sad."] },
  { lesson: 32, newWord: "mom", collectionSize: 32, versions: ["mom is a cat.", "mom, see that rat!", "mom sat. mad mom!"] },
  { lesson: 33, newWord: "rock", collectionSize: 33, versions: ["see a mad rock.", "sam is a rock.", "a rock sat. sad."] },
  { lesson: 34, newWord: "rod", collectionSize: 34, versions: ["sam is a rod?", "see the rod, mom.", "a rod. a rock."] },
  { lesson: 35, newWord: "sock", collectionSize: 35, versions: ["a sock is sad.", "mom, see that sock!", "sick sock! sick sock!"] },
  { lesson: 36, newWord: "an", collectionSize: 36, versions: ["an ear is sad.", "see an ear! see!", "an ear. an ear."] },
  { lesson: 37, newWord: "can", collectionSize: 37, versions: ["sam can read it.", "can a rat read?", "the cat can sit."] },
  { lesson: 38, newWord: "in", collectionSize: 38, versions: ["rat in the sack!", "sam, in the mitt!", "eat in the seat."] },
  { lesson: 39, newWord: "not", collectionSize: 39, versions: ["sam is not mad.", "it is not that.", "not a sad rat."] },
  { lesson: 40, newWord: "on", collectionSize: 40, versions: ["sam sat on it.", "a rat on rack.", "sit on the seat!"] },
  { lesson: 41, newWord: "ant", collectionSize: 41, versions: ["an ant is on it.", "see a mad ant, mom!", "an ant sat on sock."] },
  { lesson: 42, newWord: "man", collectionSize: 42, versions: ["the man sat on ram!", "a man can read it.", "the man is not sad."] },
  { lesson: 43, newWord: "near", collectionSize: 43, versions: ["sam is near a rat.", "the cat is near me.", "sit near the sad ram."] },
  { lesson: 44, newWord: "and", collectionSize: 44, versions: ["mom and sam can sit.", "a cat and a rat.", "mom and sam eat meat."] },
  { lesson: 45, newWord: "fan", collectionSize: 45, versions: ["mom is a mad fan.", "a fan is on mom.", "a fan is near sam."] },
  { lesson: 46, newWord: "fat", collectionSize: 46, versions: ["the fat cat is sad.", "a fat rat sat. fat!", "fat ant. fat man. fat!"] },
  { lesson: 47, newWord: "feet", collectionSize: 47, versions: ["sam can see the feet.", "feet on a sad rat!", "an ant is on feet."] },
  { lesson: 48, newWord: "if", collectionSize: 48, versions: ["if mom can, sam can.", "if the cat is sad?", "if a rat, not me!"] },
  { lesson: 49, newWord: "fin", collectionSize: 49, versions: ["the fin is on it.", "sam can see a fin.", "a fin is a fin."] },
  { lesson: 50, newWord: "fun", collectionSize: 50, versions: ["a fat cat is fun.", "sam can sit. mom, fun!", "the fat ant is fun."] },
  { lesson: 51, newWord: "run", collectionSize: 51, versions: ["the cat can run and sit.", "run! the mad ram is fat.", "mom can run near the ram."] },
  { lesson: 52, newWord: "feed", collectionSize: 52, versions: ["sam can feed the sad cat.", "feed the sad fat ant, mom!", "feed the rat? not me, mom!"] },
  { lesson: 53, newWord: "fit", collectionSize: 53, versions: ["the mitt can fit the cat.", "an ant can fit in it.", "the cat can fit in it."] },
  { lesson: 54, newWord: "mud", collectionSize: 54, versions: ["the rat sat in the mud.", "the ant sat in the mud.", "mud! mom is mad at sam!"] },
  { lesson: 55, newWord: "sun", collectionSize: 55, versions: ["the sun is on the cat.", "sit in the sun, fat cat.", "the sun! the sun is fun!"] },
  { lesson: 56, newWord: "nut", collectionSize: 56, versions: ["the rat can eat a nut.", "a nut on the mitt? fun!", "a fat nut is in sam!"] },
  { lesson: 57, newWord: "little", collectionSize: 57, versions: ["the little ant is on sam.", "a little ram is not mad.", "mom, see the little fat ram!"] },
  { lesson: 58, newWord: "lot", collectionSize: 58, versions: ["sam can eat a lot, mom!", "the ant can eat a lot.", "mom! a lot! eat a lot!"] },
  { lesson: 59, newWord: "sand", collectionSize: 59, versions: ["the ant sat on the sand.", "sam can sit in the sand.", "sand on sam! sand on mom!"] },
  { lesson: 60, newWord: "fill", collectionSize: 60, versions: ["sam can fill the sad sack.", "fill the mitt! fill the sack!", "can the ant fill the sack?"] },
  { lesson: 61, newWord: "land", collectionSize: 61, versions: ["the ram can run on the land!", "mom, see the land near the sand!", "sam sat on the land, not sand!"] },
  { lesson: 62, newWord: "lick", collectionSize: 62, versions: ["the cat can lick the sad rat!", "mom! the fat cat can lick mom!", "can a rat lick the fat cat?"] },
  { lesson: 63, newWord: "lid", collectionSize: 63, versions: ["the lid is on the sad sack.", "sam, see the lid on the rack!", "can the lid fit on the mitt?"] },
  { lesson: 64, newWord: "lock", collectionSize: 64, versions: ["the lock is on the sad sack.", "sam can lock the rat in it.", "a lock? on a mitt? sam, see!"] },
  { lesson: 65, newWord: "luck", collectionSize: 65, versions: ["sam, luck is on the fat cat.", "luck! luck! the ant is on sam!", "mom, luck is not on the cat."] },
  { lesson: 66, newWord: "duck", collectionSize: 66, versions: ["the duck sat on the land. mad!", "a duck can lick the sad ram.", "mom, the duck is on the mitt!"] },
  { lesson: 67, newWord: "feel", collectionSize: 67, versions: ["sam can feel the sand on feet.", "feel the mud! feel the sand, sam!", "the cat can feel the mad rat."] },
  { lesson: 68, newWord: "we", collectionSize: 68, versions: ["we can sit and eat the nut.", "we can feed the sad fat cat.", "we can run on the land, mom!"] },
  { lesson: 69, newWord: "will", collectionSize: 69, versions: ["sam will eat the meat and nut.", "we will run! we will eat! fun!", "will the cat lick the fat ram?"] },
  { lesson: 70, newWord: "win", collectionSize: 70, versions: ["the ant will win! sit on sam!", "can sam win? can the cat win?", "the cat will win the fat nut."] },
  { lesson: 71, newWord: "with", collectionSize: 71, versions: ["sam can sit with the cat and mom.", "the fat rat is with the sad ram.", "we will run with the duck and ant."] },
  { lesson: 72, newWord: "gun", collectionSize: 72, versions: ["the man can sit with a fat gun.", "a gun on the land? mom, not fun!", "the cat is not fun with a gun."] },
  { lesson: 73, newWord: "i", collectionSize: 73, versions: ["i can sit with mom and the cat.", "i can feel the sun on the sand.", "i will feed the cat and the rat."] },
  { lesson: 74, newWord: "rag", collectionSize: 74, versions: ["mom can feel the rag on the sand.", "i can see a rag near the cat.", "the rag sat on the fat, sad cat."] },
  { lesson: 75, newWord: "rug", collectionSize: 75, versions: ["the fat cat sat on the sad rug.", "i will sit on the rug with mom.", "the fat cat can sit on the rug!"] },
  { lesson: 76, newWord: "log", collectionSize: 76, versions: ["a log sat near the fat sad ram.", "sam can sit on a log with mom.", "the ant can run on the sad log."] },
  { lesson: 77, newWord: "said", collectionSize: 77, versions: ["mom said, sam, sit on the fat log.", "sam said, mom, we can eat the nut!", "the cat said, i will eat the rat!"] },
  { lesson: 78, newWord: "shack", collectionSize: 78, versions: ["sam sat in the shack with the cat.", "the shack is near the land and sand.", "mom said, sam, is the fat shack sad?"] },
  { lesson: 79, newWord: "she", collectionSize: 79, versions: ["she can run with the fat sad ant.", "mom is mad. she will eat the nut!", "she said, i can feed the fat cat."] },
  { lesson: 80, newWord: "shot", collectionSize: 80, versions: ["mom shot the rat! the rat is mad.", "i shot the rack! the rack is sad.", "she shot the nut at the mad ram!"] },
  { lesson: 81, newWord: "ate", collectionSize: 81, versions: ["the cat ate the rat and the mad ant!", "sam ate a lot and said, mom, a lot!", "we ate the fat nut with the sad cat."] },
  { lesson: 82, newWord: "fish", collectionSize: 82, versions: ["sam ate a fish and said, mom, a fish!", "the fat fish can sit on the sad mitt.", "mom, i will feed a fish and a rat."] },
  { lesson: 83, newWord: "late", collectionSize: 83, versions: ["mom is late. the cat is late and mad!", "i am late, said the ant. the ram ate.", "the late man sat with the cat on it."] },
  { lesson: 84, newWord: "made", collectionSize: 84, versions: ["mom made a sack and sam sat on it!", "sam made a mud fish and ate the nut.", "i made the rag and mom made the rug."] },
  { lesson: 85, newWord: "tail", collectionSize: 85, versions: ["the cat and the rat can see a tail.", "sam can feel the tail on the sad cat!", "i can see the tail on the fat rat."] },
  { lesson: 86, newWord: "wish", collectionSize: 86, versions: ["i wish i can eat the fat nut, mom!", "sam said, i wish the ram is not mad!", "we wish the cat and the rat can sit."] },
  { lesson: 87, newWord: "hate", collectionSize: 87, versions: ["i hate the mud! sam said, mom, i hate!", "the cat hate the rat and the fat ant.", "we hate the sad rat and the mad ram!"] },
  { lesson: 88, newWord: "cow", collectionSize: 88, versions: ["the cow sat on the land and ate nut.", "the mad cow ate sam. not a fun cow!", "we hate the fat cow! the cow hate sam!"] },
  { lesson: 89, newWord: "did", collectionSize: 89, versions: ["i did eat the fat nut! mom, i did.", "sam did see a fat rat in the mud.", "did the cat eat the nut? mom, did it?"] },
  { lesson: 90, newWord: "dish", collectionSize: 90, versions: ["the cat ate the fat nut on a dish.", "sam, the dish is on the sad fat cat!", "did the cat sit on the dish? mad cat!"] },
  { lesson: 91, newWord: "game", collectionSize: 91, versions: ["sam will run a game. mom will run the game.", "the game! sam can run and mom can win it!", "a mad game! the cat and the rat can sit."] },
  { lesson: 92, newWord: "gate", collectionSize: 92, versions: ["sam sat at the gate with the cat and mom.", "the gate is on the land. the ram is mad!", "we can sit near the gate and feed the rat."] },
  { lesson: 93, newWord: "now", collectionSize: 93, versions: ["the cat is mad now! sam, run! mom, run! fun!", "i ate the nut. now i will run with mom!", "now the rat is on the log. mad, mad cat!"] },
  { lesson: 94, newWord: "wow", collectionSize: 94, versions: ["wow! the cat is on the log with the rat!", "i said wow! the duck is on the fat ram!", "wow, said mom. the cat is on the sad ram!"] },
  { lesson: 95, newWord: "gates", collectionSize: 95, versions: ["the gates is mad at sam. sam will run now!", "the cat sat on the gates. the ram is mad!", "we can run near the gates with the sad cow."] },
  { lesson: 96, newWord: "was", collectionSize: 96, versions: ["the cat was mad. the rat was sad. fat mom!", "sam was on the log. mom was near the sand.", "i was sick. now i will eat the fat nut."] },
  { lesson: 97, newWord: "has", collectionSize: 97, versions: ["sam has a dish and mom has a sad rug.", "mom has a sack and the cat has a seed.", "the cat has a nut. the rat has a seed!"] },
  { lesson: 98, newWord: "he", collectionSize: 98, versions: ["he was mad! he sat on the log and ate.", "sam is sad. he will sit on the sad log.", "he said, i wish the fat cat was not mad!"] },
  { lesson: 99, newWord: "hill", collectionSize: 99, versions: ["sam sat on the hill. mom sat near the sand.", "we can run on the hill with the mad cow!", "the hill is near the shack. we will eat nut!"] },
  { lesson: 100, newWord: "him", collectionSize: 100, versions: ["sam said, feed him! and mom ate the fat nut.", "i can see him. he is on the fat log.", "the cat was on him. he was not a fan!"] },
];

export function getLesson(n: number): ReadingLesson | undefined {
  return readingLessons.find(l => l.lesson === n);
}

export function normalizeWord(word: string): string {
  return word.replace(/^[^a-zA-Z]+/, '').replace(/[^a-zA-Z]+$/, '').toLowerCase();
}

function stripDisplayPunctuation(display: string): string {
  return display.replace(/[^a-zA-Z?]/g, '');
}

export function getWordTokens(lesson: ReadingLesson, versionIndex: number): WordToken[] {
  const text = lesson.versions[versionIndex] ?? lesson.versions[0];
  return text.split(/\s+/).filter(Boolean).map(raw => ({
    display: lesson.lesson <= 40 ? stripDisplayPunctuation(raw) : raw,
    normalized: normalizeWord(raw),
  }));
}

export function selectVersion(lesson: ReadingLesson, wordCounts: Record<string, number>): number {
  if (lesson.versions.length === 1) return 0;

  const scores = lesson.versions.map((_, i) => {
    const tokens = getWordTokens(lesson, i);
    return tokens.reduce((sum, t) => sum + (wordCounts[t.normalized] ?? 0), 0);
  });

  const minScore = Math.min(...scores);
  const tied = scores.reduce<number[]>((acc, s, i) => {
    if (s === minScore) acc.push(i);
    return acc;
  }, []);

  return tied[Math.floor(Math.random() * tied.length)];
}
