export interface StoryChapter {
  chapter: number;
  text: string;
  newWords: string[];
}

export interface StoryPage {
  page: number;
  chapters: StoryChapter[];
}

export const TOTAL_PAGES = 25;
export const TOTAL_CHAPTERS = 100;
export const CHAPTERS_PER_PAGE = 4;

export const storyPages: StoryPage[] = [
  {
    page: 1,
    chapters: [
      { chapter: 1, text: "Blue Fox, Red Whale, Pink Frog, and Green Shark have a gold map. They had a quest. They sailed to the gold.", newWords: ["to", "had", "have", "they"] },
      { chapter: 2, text: "\"Let us help!\" said Blue Fox. \"We have a quest of gold,\" said Red Whale. The pals had to help us. But the gold is past the sea.", newWords: ["of", "us", "let", "but"] },
      { chapter: 3, text: "They were on the boat. When they had the gold map, then they sailed. As Blue Fox sailed, Blue Fox felt happy.", newWords: ["then", "when", "were", "as"] },
      { chapter: 4, text: "Blue Fox and Red Whale like the gold quest. Pink Frog and Green Shark like more gold. The gold is out from the map. They sailed.", newWords: ["like", "more", "from", "out"] },
    ],
  },
  {
    page: 2,
    chapters: [
      { chapter: 5, text: "\"Come here!\" said Red Whale. \"I will help too. The gold is so near!\" Pink Frog and Green Shark felt so happy. The four pals had a quest.", newWords: ["come", "here", "so", "too"] },
      { chapter: 6, text: "It was hot. Blue Fox felt hot. Red Whale will use his fin. The sea hits the boat. The four pals had a hug.", newWords: ["his", "hits", "hot", "hug"] },
      { chapter: 7, text: "Red Whale will kick. Red Whale will kiss Blue Fox. Pink Frog will nod. The four pals felt happy. Gold is in the sea.", newWords: ["kick", "kiss", "nod"] },
      { chapter: 8, text: "Blue Fox said, \"Go to the lake.\" They saw the lake. The pals had cake. No gold yet at the lake.", newWords: ["cake", "go", "no"] },
    ],
  },
  {
    page: 3,
    chapters: [
      { chapter: 9, text: "Red Whale had a nose. Red Whale had teeth. Pink Frog had ham. A kitten will eat ham too.", newWords: ["nose", "teeth", "ham", "kitten"] },
      { chapter: 10, text: "Pink Frog saw an old kitten. The kitten sat on sand. Green Shark said, \"Take the kitten on the gold quest.\" The kitten is tame.", newWords: ["old", "take", "tame"] },
      { chapter: 11, text: "The kitten and Red Whale felt the same. Blue Fox saw lots of rocks past the lake. Lots of rocks on the gold quest.", newWords: ["lots", "rocks", "same"] },
      { chapter: 12, text: "They have lots of sacks. Pink Frog will make sacks. Blue Fox will save the sacks. The pals had ham in the sacks.", newWords: ["make", "sacks", "save"] },
    ],
  },
  {
    page: 4,
    chapters: [
      { chapter: 13, text: "The sea is cold. Blue Fox had a coat. Red Whale gave a coat to Pink Frog. The coat is for the cold gold quest.", newWords: ["coat", "cold", "for", "gave"] },
      { chapter: 14, text: "Green Shark said, \"I need a goat.\" They need ham or a goat for the trek. Pink Frog had a goat for gold.", newWords: ["goat", "need", "or"] },
      { chapter: 15, text: "They have socks. Pink Frog had socks. Green Shark had socks. They saw goats. The goats had coats and gold socks.", newWords: ["socks", "coats", "goats"] },
      { chapter: 16, text: "Blue Fox saw a car. A cop sat in the car. Blue Fox had a hat. Pink Frog had hats. The cop will help the gold quest.", newWords: ["hat", "hats", "car", "cop"] },
    ],
  },
  {
    page: 5,
    chapters: [
      { chapter: 17, text: "The cop had thick ears. The cop will go far. Blue Fox said, \"Hop on the gold quest!\" The cop felt happy.", newWords: ["ears", "far", "hop"] },
      { chapter: 18, text: "Green Shark saw tar. Tar is on the top of the rocks. Pink Frog had a mop. Blue Fox will mop the tar.", newWords: ["mop", "tar", "top"] },
      { chapter: 19, text: "A dog will come. The dog said, \"I have hope. The gold is here.\" The pot is here too. Blue Fox had hope.", newWords: ["dog", "hope", "pot"] },
      { chapter: 20, text: "Pink Frog and Blue Fox ran. The cops ran. They ran in the fog. The fog hits the sheep. Gold is past the fog.", newWords: ["ran", "cops", "fog", "sheep"] },
    ],
  },
  {
    page: 6,
    chapters: [
      { chapter: 21, text: "The sheep are tame. Cars came. The cars are far from us. The four pals had a thick shell. A wish for gold!", newWords: ["are", "came", "cars"] },
      { chapter: 22, text: "They will chop a log. Pink Frog saw a park. Blue Fox saw a shop. Red Whale had the shell. \"A wish for gold!\"", newWords: ["chop", "park", "shop"] },
      { chapter: 23, text: "Each pal had cakes at the farm. The farm is near the sea. Green Shark will wish on the shell. \"A wish for gold!\"", newWords: ["cakes", "each", "farm"] },
      { chapter: 24, text: "The farm girl had a home on a ship. The ship had an arm. The girl will help the gold quest.", newWords: ["girl", "home", "ship", "arm"] },
    ],
  },
  {
    page: 7,
    chapters: [
      { chapter: 25, text: "The girl had a charm. The charm had pots. It will rain. Red Whale set the shell on the rocks. Gold quest!", newWords: ["charm", "pots", "rain"] },
      { chapter: 26, text: "Pots had wet tops. The pots will rain. Blue Fox and Red Whale will do this on the gold quest.", newWords: ["tops", "wet", "do"] },
      { chapter: 27, text: "They went down the road. Those rocks. Blue Fox sat on the road. The pals went past. Gold is past the rocks.", newWords: ["down", "road", "those", "went"] },
      { chapter: 28, text: "They saw dogs. The dogs had a pet. Then the four pals will pet the dogs. The dogs ran past them on the gold quest.", newWords: ["dogs", "pet", "them"] },
    ],
  },
  {
    page: 8,
    chapters: [
      { chapter: 29, text: "Red Whale gave them a big ham. A big bug bit Blue Fox. The bug is big. Green Shark will help with gold.", newWords: ["big", "bit", "bug"] },
      { chapter: 30, text: "Pink Frog saw chicks. Green Shark saw a pig. There was a pig. The chicks ran past. Gold quest!", newWords: ["chicks", "pig", "there"] },
      { chapter: 31, text: "The pig is well. The pig was in the well. Blue Fox and Red Whale will be happy. Bugs are eating the ham.", newWords: ["well", "be", "bugs", "eating"] },
      { chapter: 32, text: "How did the bug hit Blue Fox? They are getting sad. The bugs hit Pink Frog too. Gold quest will go on.", newWords: ["getting", "hit", "how"] },
    ],
  },
  {
    page: 9,
    chapters: [
      { chapter: 33, text: "Pink Frog sat on a leaf. The leaf is a bed. A bug will bite Green Shark. Gold quest will go on.", newWords: ["leaf", "bed", "bite"] },
      { chapter: 34, text: "\"Let's go fishing,\" said Blue Fox. Red Whale will sleep. Green Shark said, \"I like fishing for the gold quest.\"", newWords: ["fishing", "let's", "sleep"] },
      { chapter: 35, text: "Blue Fox had ten fish. Red Whale had five fish in a tub. It is the end of fishing. Gold quest will go on.", newWords: ["ten", "tub", "end", "five"] },
      { chapter: 36, text: "Red Whale likes the tub. Red Whale likes to rub. Pink Frog is sitting on the rocks. Gold quest!", newWords: ["likes", "rub", "sitting"] },
    ],
  },
  {
    page: 10,
    chapters: [
      { chapter: 37, text: "Blue Fox said, \"Stop sitting.\" Green Shark said, \"Let us walk and talk on the gold quest.\" They walk on the road.", newWords: ["stop", "talk", "walk"] },
      { chapter: 38, text: "It was dark. Red Whale will dive. Blue Fox said, \"I will live near the sea.\" They saw a dime. A gold dime!", newWords: ["dark", "dime", "dive", "live"] },
      { chapter: 39, text: "They are rich! Pink Frog is sleeping. Blue Fox said, \"You are a pal. The gold quest is on.\"", newWords: ["rich", "sleeping", "you"] },
      { chapter: 40, text: "A boy came. The boy had a deer. They saw the boy at the farms. The boy will help the gold quest.", newWords: ["boy", "deer", "farms"] },
    ],
  },
  {
    page: 11,
    chapters: [
      { chapter: 41, text: "The boy was hunting. The boy led the deer into the farms. Blue Fox felt happy. Gold is near!", newWords: ["hunting", "into", "led"] },
      { chapter: 42, text: "The waves came. Blue Fox said, \"Yes, this is past a year.\" They were stopping at the rocks. Gold is near.", newWords: ["stopping", "waves", "year", "yes"] },
      { chapter: 43, text: "Blue Fox said, \"Find a card.\" Red Whale said, \"I will find her card.\" Pink Frog had a card. Card has a gold clue!", newWords: ["card", "find", "her"] },
      { chapter: 44, text: "Green Shark said, \"I love mother.\" Pink Frog will hunt for mother. Blue Fox will hunt for gold too.", newWords: ["hunt", "love", "mother"] },
    ],
  },
  {
    page: 12,
    chapters: [
      { chapter: 45, text: "They have seen the road. The four pals will bring the other pal. Red Whale gave a nod. Gold is near!", newWords: ["other", "seen", "bring"] },
      { chapter: 46, text: "An eagle came up. The eagle was going up. The eagle saw the brother of Red Whale. Eagle will help the gold quest.", newWords: ["brother", "up", "eagle", "going"] },
      { chapter: 47, text: "The shore had a toy. Blue Fox will take the toy. The toy is over the rocks. Gold clue on the toy?", newWords: ["over", "shore", "toy"] },
      { chapter: 48, text: "\"It is on the side,\" said Blue Fox. \"We must take it.\" Did Red Whale ever see the toy? Toy is a gold clue!", newWords: ["must", "side", "ever"] },
    ],
  },
  {
    page: 13,
    chapters: [
      { chapter: 49, text: "Blue Fox said, \"I will leave.\" Red Whale lived in the sea. The moon was up. The four pals jump.", newWords: ["jump", "leave", "lived", "moon"] },
      { chapter: 50, text: "Red Whale said, \"I will never leave.\" They saw a pool. Some pals will jump in for gold.", newWords: ["never", "pool", "some"] },
      { chapter: 51, text: "They swim in the pool. The pool broke. Pink Frog will come soon. Gold clue lost?", newWords: ["soon", "swim", "broke"] },
      { chapter: 52, text: "Every day they will trek. The pals jumped over the rocks. Day by day, gold is near.", newWords: ["day", "every", "jumped"] },
    ],
  },
  {
    page: 14,
    chapters: [
      { chapter: 53, text: "The pal jumps over the rocks. Men start the trek with the pals. Blue Fox said, \"We must start the gold quest.\" Red Whale was swimming.", newWords: ["jumps", "men", "start", "swimming"] },
      { chapter: 54, text: "Red Whale walked back to camp. \"Tell us!\" said Pink Frog. Blue Fox said, \"I have the big gold map!\" The pals felt happy.", newWords: ["tell", "walked", "back"] },
      { chapter: 55, text: "Red Whale gave a hand. \"Nine pals will teach us of gold,\" said Red Whale. Gold quest is on.", newWords: ["hand", "nine", "teach"] },
      { chapter: 56, text: "They went away. Blue Fox had a bag for gold. The bill is in the bag. Gold quest is on.", newWords: ["away", "bag", "bill"] },
    ],
  },
  {
    page: 15,
    chapters: [
      { chapter: 57, text: "The bag is filled. They saw a white tree. Inside the tree was a stone. The stone had a clue to gold!", newWords: ["filled", "inside", "tree", "white"] },
      { chapter: 58, text: "The eagle's nest was up. Blue Fox yelled. The pals had a brush. Eagle will help the gold quest!", newWords: ["yelled", "brush", "eagle's"] },
      { chapter: 59, text: "The pals look at the eagle. They looked. The eagle saved a pal. They saw a chest. Gold inside?", newWords: ["look", "looked", "saved"] },
      { chapter: 60, text: "The eagle had a smile. A tiger came. The tiger was brushing his teeth. The tiger fell. The chest had a map of gold.", newWords: ["smile", "tiger", "brushing", "fell"] },
    ],
  },
  {
    page: 16,
    chapters: [
      { chapter: 61, text: "The pals liked the tree. The room had a stone. The stone had shine. Gold shine!", newWords: ["liked", "room", "shine"] },
      { chapter: 62, text: "The eagle smiled. \"I have a tooth,\" said the eagle. They were walking past steep rocks. Gold quest is on.", newWords: ["smiled", "tooth", "walking"] },
      { chapter: 63, text: "They saw a barn. Red Whale said, \"I will fly!\" The horse came near the barn. The horse will help the gold quest!", newWords: ["barn", "fly", "horse"] },
      { chapter: 64, text: "The horse said, \"My pal is teaching pals. Where are we?\" Pink Frog said, \"We hunt the gold.\" The horse was born here.", newWords: ["my", "teaching", "where", "born"] },
    ],
  },
  {
    page: 17,
    chapters: [
      { chapter: 65, text: "The horse said, \"I had corn.\" The eagles came. Blue Fox got the gold map. The quest is near.", newWords: ["corn", "eagles", "got"] },
      { chapter: 66, text: "Red Whale said, \"I sold a bag.\" The horse told them. They fold the gold map. The first clue is on a post.", newWords: ["sold", "told", "fold"] },
      { chapter: 67, text: "Blue Fox is talking. The map was torn. Red Whale brushed his teeth. Pink Frog saw a star on the post. Gold clue!", newWords: ["talking", "torn", "brushed"] },
      { chapter: 68, text: "Blue Fox said, \"I hear the eagles.\" The map makes a mile to gold. They saw lots of trees.", newWords: ["hear", "makes", "mile", "trees"] },
    ],
  },
  {
    page: 18,
    chapters: [
      { chapter: 69, text: "They felt fine. Gas was on the road. They started. Yet the gold is past more rocks.", newWords: ["fine", "gas", "started"] },
      { chapter: 70, text: "They stopped at a town. The way had a hat. Green Shark and Pink Frog will help find gold.", newWords: ["stopped", "town", "way"] },
      { chapter: 71, text: "They saw a black rock. Blue Fox had a book. The book meets the gold map. They are having fun.", newWords: ["black", "book", "having", "meets"] },
      { chapter: 72, text: "The pals sing. Pals are singing. The pals talked of gold. Gold is so near!", newWords: ["sing", "singing", "talked"] },
    ],
  },
  {
    page: 19,
    chapters: [
      { chapter: 73, text: "Blue Fox talks of the gold. Pals had things in the bag. It is time to go to gold!", newWords: ["talks", "things", "time"] },
      { chapter: 74, text: "They took the gold map. They went fast. Blue Fox said, \"Ho! Gold is near!\"", newWords: ["took", "fast", "ho"] },
      { chapter: 75, text: "\"I mean we must go,\" said Blue Fox. Blue Fox saw a note. \"Read this part.\" Pink Frog felt sore. The gold note!", newWords: ["mean", "note", "part", "sore"] },
      { chapter: 76, text: "Pink Frog swam. They felt very sad. They left the sore. Gold quest will go on.", newWords: ["swam", "very", "left"] },
    ],
  },
  {
    page: 20,
    chapters: [
      { chapter: 77, text: "\"As we go, we deal with rocks,\" said Blue Fox. \"Good.\" They zoom past. Gold is near!", newWords: ["deal", "good", "zoom"] },
      { chapter: 78, text: "They saw grass. They felt just fine. The pals had bad rocks past them. Gold quest is on!", newWords: ["grass", "just", "bad"] },
      { chapter: 79, text: "They were on the road. Blue Fox gave a yell. Red Whale was yelling. They will hold on. They will start digging for gold.", newWords: ["hold", "yell", "yelling", "digging"] },
      { chapter: 80, text: "They dug. They get sand on them. They saw a hole. Gold in the hole?", newWords: ["dug", "get", "hole"] },
    ],
  },
  {
    page: 21,
    chapters: [
      { chapter: 81, text: "They saw a yard. The yard had holes. Blue Fox said, \"Stay near the gold quest.\"", newWords: ["stay", "yard", "holes"] },
      { chapter: 82, text: "Red Whale said, \"I quit the gold quest.\" Blue Fox said, \"Stop quitting. Be quick!\" A beagle came.", newWords: ["quick", "quit", "quitting", "beagle"] },
      { chapter: 83, text: "The beagle is Biff. \"Boo!\" said Biff. The pals held the beagle. Biff will help gold quest!", newWords: ["biff", "boo", "held"] },
      { chapter: 84, text: "Biff had a smell of gold. They saw a store. Biff had a story. The story is of gold.", newWords: ["smell", "store", "story"] },
    ],
  },
  {
    page: 22,
    chapters: [
      { chapter: 85, text: "The thing was the gold map tore. Red Whale said, \"It tore!\" The pals went, \"Zzzz.\"", newWords: ["thing", "tore", "zzzz"] },
      { chapter: 86, text: "Biff picked them up. They were on the rail. A pal comes back. The pal gets a gold card.", newWords: ["picked", "rail", "comes", "gets"] },
      { chapter: 87, text: "The pal is loud. \"Our pal is back!\" They pick the gold card.", newWords: ["loud", "our", "pick"] },
      { chapter: 88, text: "They hear a sound of gold. A chick saw them. The chick saw the logs.", newWords: ["sound", "chick", "logs"] },
    ],
  },
  {
    page: 23,
    chapters: [
      { chapter: 89, text: "The logs are outside. The pals shouted. The chick came to play. Gold quest is on!", newWords: ["outside", "shouted", "play"] },
      { chapter: 90, text: "Blue Fox had to say what. Blue Fox want the gold. The chick hid in the logs. \"Let's hide,\" said Blue Fox.", newWords: ["say", "want", "hid", "hide"] },
      { chapter: 91, text: "They saw a line. They saw notes. There was something on it. Gold notes!", newWords: ["line", "notes", "something"] },
      { chapter: 92, text: "It was hard for the leg. \"Don't stop!\" said Blue Fox. They saw a green leaf. Gold past the leaf!", newWords: ["hard", "leg", "don't"] },
    ],
  },
  {
    page: 24,
    chapters: [
      { chapter: 93, text: "Red Whale had a pail. The pail had pain. They had paint. \"Blap!\" went the paint. Gold paint!", newWords: ["pail", "pain", "paint", "blap"] },
      { chapter: 94, text: "They went deep. \"Ding!\" Pink Frog had a ruck. The gold is so near.", newWords: ["deep", "ding", "ruck"] },
      { chapter: 95, text: "The sounds were loud. They saw spots. \"We will use these spots,\" said Blue Fox. \"Spots will help us to gold!\"", newWords: ["sounds", "spots", "these"] },
      { chapter: 96, text: "Another big rock. They went around the rock. The biggest rock had a clue. Gold is past it!", newWords: ["another", "around", "biggest"] },
    ],
  },
  {
    page: 25,
    chapters: [
      { chapter: 97, text: "They felt the dust. They found a house in the dust. A mouse lived in the house. \"Gold is here!\" said the mouse.", newWords: ["dust", "found", "house", "mouse"] },
      { chapter: 98, text: "The mouse felt proud. A spring came up. The bug was biting. The mouse led the pals to gold.", newWords: ["proud", "spring", "biting"] },
      { chapter: 99, text: "\"Blam!\" went the bug. The four pals saw tigers. The last tiger had a clue: gold is here!", newWords: ["blam", "tigers", "last"] },
      { chapter: 100, text: "Blue Fox, Red Whale, Pink Frog, and Green Shark licked the gold. They had their noses up. \"Thank you for the gold!\" said the four pals.", newWords: ["licked", "noses", "thank"] },
    ],
  },
];

export function getStoryPage(pageNumber: number): StoryPage | undefined {
  return storyPages.find(p => p.page === pageNumber);
}
