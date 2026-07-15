export interface GameFAQ {
  q: string;
  a: string;
}

export interface GameMeta {
  slug: string;
  name: string;
  tagline: string;
  emoji: string;
  category: "board" | "puzzle" | "arcade" | "word" | "memory";
  featured?: boolean;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  about: string[];
  howToPlay: string[];
  faqs: GameFAQ[];
  related: string[];
  keywords: string[];
}

export const GAMES: GameMeta[] = [
  {
    slug: "tic-tac-toe",
    name: "Tic Tac Toe",
    tagline: "The classic 3x3 duel — first to three in a row wins.",
    emoji: "❌⭕",
    category: "board",
    featured: true,
    shortDescription: "Play free Tic Tac Toe online, two players on the same device. No sign up, no download.",
    metaTitle: "Play Free Tic Tac Toe Online — 2 Player, No Download | SimpleBrainGames",
    metaDescription: "Free online Tic Tac Toe for two players on one device. Instant play in your browser, no sign-up, works on mobile and desktop.",
    about: [
      "Tic Tac Toe is the game almost everyone learns first — two players, a 3x3 grid, and a race to line up three of your marks in a row. It looks simple, and it is, but the reason it survives is that it teaches turn-taking, pattern spotting, and forward thinking in about thirty seconds of explanation.",
      "The game has been played for thousands of years in some form. Roman children scratched a version called Terni Lapilli into stone, and modern kids scribble it in the corners of school notebooks. Same idea, same appeal.",
      "On SimpleBrainGames you can play free tic tac toe online with a friend on the same phone or laptop. There is no download, no sign up, and no ad-heavy launch screen to wade through. Tap a square and go.",
      "If you play carefully, tic tac toe always ends in a draw — that is part of the fun. Once both players know the basic strategy, the game becomes a small puzzle about who blinks first."
    ],
    howToPlay: [
      "Player X goes first. Tap any empty square to place your mark.",
      "Players alternate turns placing X and O.",
      "The first player to line up three of their marks horizontally, vertically, or diagonally wins.",
      "If every square is filled and no one has three in a row, the game is a draw.",
      "Press New Game to reset the board at any time."
    ],
    faqs: [
      { q: "Is Tic Tac Toe free to play here?", a: "Yes. Every game on SimpleBrainGames is free forever, with no account or download required." },
      { q: "Can I play Tic Tac Toe with a friend on the same device?", a: "That is exactly how this version works. Pass the phone or share a laptop and alternate turns as X and O." },
      { q: "Is there a strategy that always wins Tic Tac Toe?", a: "No. If both players play optimally the game always ends in a draw. The trick is to force your opponent into a mistake by creating two winning threats at once." },
      { q: "Why does Tic Tac Toe feel so easy?", a: "The board only has 255,168 possible games, and most of them are decided within a few moves. Simplicity is what makes it a great warm-up game for kids and adults alike." },
      { q: "Does this Tic Tac Toe work on mobile?", a: "Yes. The board is fully touch-friendly and scales to phone screens." },
      { q: "Can I play against the computer?", a: "This version is two-player local. We may add a single-player computer mode in a future update." }
    ],
    related: ["connect-4", "reversi", "dots-and-boxes", "checkers"],
    keywords: ["tic tac toe", "free tic tac toe online", "2 player tic tac toe", "tic tac toe no download"]
  },
  {
    slug: "connect-4",
    name: "Connect 4",
    tagline: "Drop your disc, stack four in a row, beat your friend.",
    emoji: "🔴🟡",
    category: "board",
    featured: true,
    shortDescription: "Free two-player Connect 4 in your browser — drop discs and be the first to line up four.",
    metaTitle: "Play Free Connect 4 Online — 2 Player, No Sign Up | SimpleBrainGames",
    metaDescription: "Classic Connect 4 in your browser. Two players, one device. Drop your discs and be first to line up four in a row. Free, no download.",
    about: [
      "Connect 4 is the game where gravity does half the work. You take turns dropping coloured discs into a 7-column, 6-row grid, and the first player to line up four of their colour in a row — vertically, horizontally, or diagonally — wins.",
      "It was launched commercially in the 1970s and has been a family classic ever since. Beneath the friendly plastic frame is real strategy: mathematicians solved Connect 4 in 1988 and proved that with perfect play, the first player wins if they start in the centre column.",
      "This free online Connect 4 gives you the same experience without the storage box. It works for two players on the same phone, tablet, or laptop, and there is nothing to install.",
      "Play a quick round while you wait for coffee, or run a best-of-five with a friend. Related searches like connect four online free, connect 4 two player, and drop four in a row all lead people here — because Connect 4 is one of those games nobody stops enjoying."
    ],
    howToPlay: [
      "Red goes first. Tap a column to drop your disc into the lowest empty slot in that column.",
      "Take turns dropping discs. Discs always fall to the bottom of the column.",
      "The first player to line up four of their colour horizontally, vertically, or diagonally wins.",
      "If the board fills up and nobody has four in a row, the game is a draw.",
      "Tap New Game to clear the board and start over."
    ],
    faqs: [
      { q: "Is there a winning strategy for Connect 4?", a: "Yes. With perfect play the first player wins by starting in the centre column. In casual play, controlling the middle three columns is almost always the strongest move." },
      { q: "How many possible Connect 4 games are there?", a: "There are just over 4.5 trillion possible positions on a standard 7x6 board — one reason it never feels stale." },
      { q: "Can I play Connect 4 with a friend on the same device?", a: "Yes, this version is designed for two-player local play. Alternate turns on the same phone or laptop." },
      { q: "Does Connect 4 improve thinking skills?", a: "It practices short-term planning, pattern recognition, and forced-move calculation — small but real workouts for problem-solving." },
      { q: "What is the difference between Connect 4 and Tic Tac Toe?", a: "Both require lining up your marks, but Connect 4 uses gravity — you can only place a disc on top of an existing disc — which makes strategy much deeper." },
      { q: "Do I need to download anything?", a: "No. Connect 4 runs entirely in your browser, on desktop or mobile." }
    ],
    related: ["tic-tac-toe", "checkers", "reversi", "dots-and-boxes"],
    keywords: ["connect 4 online", "free connect four", "connect 4 two player", "connect 4 no download"]
  },
  {
    slug: "checkers",
    name: "Checkers",
    tagline: "Classic 8x8 draughts — jump, chain, and crown your kings.",
    emoji: "⚫🔴",
    category: "board",
    shortDescription: "Free two-player checkers online. Full 8x8 board with jumps, kings, and multi-captures.",
    metaTitle: "Play Free Checkers Online — 2 Player Draughts | SimpleBrainGames",
    metaDescription: "Play free online checkers (draughts) in your browser. Two-player local, full 8x8 board, jumps and king promotions. No download or sign up.",
    about: [
      "Checkers — known as draughts across most of Europe — has been played in some form for more than 3,000 years. Ancient boards have been dug up in Iraq and Egypt, which tells you something about how long humans have enjoyed watching pieces jump each other.",
      "The modern American version uses a standard 8x8 board with twelve pieces per player. You move diagonally, capture by jumping over an opponent's piece, and when one of your pieces reaches the far row it becomes a king that can move backwards.",
      "This free checkers game runs entirely in your browser, so you can play free checkers online with a friend on the same device without installing anything. It is a great choice for a slower, more thoughtful game than something like Snake or 2048.",
      "Casual searches like online checkers no download, checkers 2 player, and draughts online free all describe the same game — this one. Grab an opponent and go."
    ],
    howToPlay: [
      "Black moves first. Pieces move one square diagonally forward.",
      "To capture, jump over an adjacent opponent piece into an empty square beyond it. Chain jumps are allowed and required if available.",
      "When one of your pieces reaches the far row, it is promoted to a king and can move and capture diagonally in any direction.",
      "You win by capturing all of your opponent's pieces or leaving them with no legal moves.",
      "Tap a piece to see its legal moves highlighted, then tap the destination to move."
    ],
    faqs: [
      { q: "Do I have to jump if I can?", a: "Yes. In standard American checkers, captures are mandatory. If you have a jump available you must take it." },
      { q: "What is a king in checkers?", a: "A king is a promoted piece that has reached the far row. Kings can move and capture diagonally in both directions." },
      { q: "How is checkers different from chess?", a: "Both are strategic board games, but checkers has one piece type (upgraded to a king), diagonal-only movement, and mandatory captures — it is faster to learn but still deep." },
      { q: "Is checkers a solved game?", a: "Yes. In 2007, researchers proved that with perfect play by both sides, checkers is a draw. Casual games are far from perfect, so you will still win and lose plenty." },
      { q: "Can I play checkers on my phone?", a: "Yes. This checkers game is fully responsive and works with taps on mobile devices." },
      { q: "How long does a game of checkers usually take?", a: "A casual game takes about 10 to 20 minutes, depending on how carefully each player thinks." }
    ],
    related: ["reversi", "tic-tac-toe", "connect-4", "dots-and-boxes"],
    keywords: ["checkers online", "free draughts", "checkers 2 player", "online checkers no download"]
  },
  {
    slug: "sudoku",
    name: "Sudoku",
    tagline: "Fill the 9x9 grid so every row, column, and box has 1–9.",
    emoji: "🔢",
    category: "puzzle",
    featured: true,
    shortDescription: "Free daily-style Sudoku puzzles online. Easy, medium, and hard difficulty. No download, no sign-up.",
    metaTitle: "Play Free Sudoku Online — Easy, Medium, Hard | SimpleBrainGames",
    metaDescription: "Free sudoku online with easy, medium, and hard difficulty. Play in your browser on mobile or desktop. No download, no sign-up, unlimited puzzles.",
    about: [
      "Sudoku is the number puzzle that took over the world in the mid-2000s and never really left. The rules are simple — place the digits 1 through 9 in a 9x9 grid so no row, column, or 3x3 box repeats a digit — but the reasoning ladder gets tall fast.",
      "Modern sudoku traces back to an 18th-century Swiss mathematician named Leonhard Euler and his work on Latin squares. The specific 9x9 format was popularised in Japan in the 1980s under the name Sudoku (数独, meaning \"single number\"), and became a global newspaper staple.",
      "This free sudoku online generator makes a new puzzle every time you press New Game, at your choice of easy, medium, or hard. It is a great option if you like a daily sudoku puzzle style challenge but want unlimited retries.",
      "Sudoku is especially popular with people searching for free sudoku no download, sudoku for beginners, and hard sudoku online. All of that runs in your browser here — nothing to install."
    ],
    howToPlay: [
      "Tap an empty cell to select it, then tap a number 1 through 9 to place it.",
      "Each row, each column, and each 3x3 box must contain the digits 1 through 9 exactly once.",
      "The given clues cannot be changed. Only fill in the empty cells.",
      "Use pencil marks to jot down candidates while you narrow things down.",
      "The puzzle is solved when the whole grid is filled with no conflicts."
    ],
    faqs: [
      { q: "Is Sudoku good for your brain?", a: "It practices working memory, logical reasoning, and pattern recognition. Studies suggest regular puzzle solving keeps those skills sharper as you age, though it is not a magic cure for anything." },
      { q: "What is the fastest way to solve a Sudoku puzzle?", a: "Scan first — look for rows, columns, or boxes that already have most of their digits filled and finish them off. Only fall back on pencil-mark logic when scanning runs out." },
      { q: "Can I play Sudoku offline?", a: "Once the page has loaded, the puzzle runs locally in your browser, so brief connection drops will not interrupt a game." },
      { q: "What is the difference between easy and expert Sudoku?", a: "Easy puzzles can be solved by simple scanning. Expert puzzles require chained logic like naked pairs, hidden triples, and X-wings — techniques you have to build up over time." },
      { q: "Is there always a unique solution?", a: "A well-formed sudoku has exactly one solution. Our generator only produces uniquely solvable puzzles." },
      { q: "Do I have to guess to solve hard Sudoku?", a: "No. Every well-formed puzzle can be solved by pure logic, even at expert level. Guessing usually leads to dead ends." }
    ],
    related: ["2048", "minesweeper", "sliding-puzzle", "mastermind"],
    keywords: ["sudoku online", "free sudoku", "sudoku no download", "daily sudoku", "sudoku for beginners"]
  },
  {
    slug: "memory-match",
    name: "Memory Match",
    tagline: "Flip cards, match pairs, beat your best time.",
    emoji: "🃏",
    category: "memory",
    shortDescription: "Free memory match card game with timer and move counter. Great brain training in short sessions.",
    metaTitle: "Play Free Memory Match Card Game Online | SimpleBrainGames",
    metaDescription: "Classic memory match (concentration) card game in your browser. Flip and match pairs, beat your best time. Free, no download.",
    about: [
      "Memory Match — also called Concentration or Pairs — is the card game every child seems to master before their parents. Cards start face down, you flip two at a time, and you keep the pair if they match. The goal is to clear the board in as few moves as possible.",
      "It is one of the most-studied brain training games because it is a clean workout for short-term memory. Every mismatched pair you turn over adds new information you have to hold on to.",
      "This free memory game is quick to play — a full round usually takes two or three minutes — and you can chase a better time or a lower move count each round. It is a good pick for kids, but grown-ups who think they will breeze through often get humbled.",
      "Popular search phrases like memory match online free, concentration card game, and matching pairs game all describe this classic. There is nothing to download, and it works well on phones."
    ],
    howToPlay: [
      "All cards start face down. Tap any card to flip it face up.",
      "Tap a second card. If the two cards match, they stay face up. If not, they flip back down after a moment.",
      "Try to remember where each symbol is so you can pair them up in later turns.",
      "The game ends when every pair has been matched.",
      "Your time and move count are displayed — try to beat them on the next round."
    ],
    faqs: [
      { q: "Is Memory Match good for the brain?", a: "It is one of the simplest working-memory workouts around. Short daily sessions can help with recall, especially for kids and older adults." },
      { q: "How many cards are on the board?", a: "This version uses 16 cards (8 pairs) by default — enough to be tricky, quick enough to replay often." },
      { q: "What is a good score?", a: "Under 20 moves is respectable. Under 15 moves and you are showing off." },
      { q: "What is the difference between Memory and Concentration?", a: "Nothing — they are two names for the same game. \"Concentration\" is more common in the UK, \"Memory\" in the US." },
      { q: "Can I play Memory Match on mobile?", a: "Yes. Cards are large enough to tap easily on phones." },
      { q: "Does the card layout change each round?", a: "Yes. Cards are shuffled every time you press New Game." }
    ],
    related: ["simon-says", "sliding-puzzle", "sudoku", "mastermind"],
    keywords: ["memory match", "concentration game", "matching pairs online", "free memory game"]
  },
  {
    slug: "minesweeper",
    name: "Minesweeper",
    tagline: "Clear the field, flag the mines, don't blow up.",
    emoji: "💣",
    category: "puzzle",
    shortDescription: "Classic Minesweeper online — reveal safe squares, flag hidden mines, use logic to survive.",
    metaTitle: "Play Free Minesweeper Online — Classic Windows Game | SimpleBrainGames",
    metaDescription: "Classic Minesweeper in your browser. Reveal safe squares, flag the mines, and race the clock. Free, no download, no sign-up.",
    about: [
      "Minesweeper is the game that ate more work hours in the 1990s than any manager wants to think about. It came pre-installed on Windows, and generations of office workers spent their lunch breaks clicking little grey squares.",
      "The rules are pure logic: some hidden squares contain mines, and the numbers on revealed squares tell you how many mines are adjacent. You use those clues to figure out where it is safe to click and where to place a flag.",
      "This free online Minesweeper gives you the same beginner, intermediate, and expert boards. It is a great pick if you want a game you can drop in and out of, and it plays cleanly on mobile with tap-and-hold to flag.",
      "Search terms like play minesweeper free, minesweeper no download, and classic windows minesweeper online all point here. It is the same game — just modernised for the browser."
    ],
    howToPlay: [
      "Tap a square to reveal what is under it.",
      "A number tells you how many mines are in the eight adjacent squares.",
      "Long-press (or right-click) to place a flag on a square you suspect is a mine.",
      "Reveal every safe square to win. Reveal a mine and the game is over.",
      "The timer starts on your first move — try to beat your best."
    ],
    faqs: [
      { q: "How do I flag a mine on mobile?", a: "Long-press a square to toggle a flag. Tap normally to reveal." },
      { q: "Is Minesweeper solvable with pure logic?", a: "Most positions are, but occasionally you will have to guess between two equally likely squares. Expert players call that a 50/50 and it is part of the game." },
      { q: "What are the standard board sizes?", a: "Beginner is 9x9 with 10 mines, intermediate is 16x16 with 40 mines, expert is 30x16 with 99 mines." },
      { q: "What is a good time for expert Minesweeper?", a: "Under 100 seconds is very strong. World records dip under 40 seconds, but those players have practiced for years." },
      { q: "Why does clicking sometimes clear a big area?", a: "If you reveal a square with zero adjacent mines, the game automatically opens all connected zero squares to save you the clicks." },
      { q: "Is my first click ever a mine?", a: "No. The first square you reveal is always safe — the mines are placed after your first click." }
    ],
    related: ["sudoku", "2048", "mastermind", "sliding-puzzle"],
    keywords: ["minesweeper online", "free minesweeper", "classic minesweeper", "minesweeper no download"]
  },
  {
    slug: "2048",
    name: "2048",
    tagline: "Slide, merge, and chase the 2048 tile.",
    emoji: "🔢",
    category: "puzzle",
    featured: true,
    shortDescription: "Play 2048 online free. Slide tiles, merge matching numbers, and try to reach 2048 and beyond.",
    metaTitle: "Play 2048 Online Free — Slide and Merge Puzzle | SimpleBrainGames",
    metaDescription: "Play 2048 free in your browser. Slide tiles with arrow keys or swipes, merge matching numbers, and try to build the 2048 tile.",
    about: [
      "2048 came out of nowhere in 2014 and had every phone screen in the world running the same little grid of tiles. It was built as a weekend project by Italian developer Gabriele Cirulli, and it exploded because the game loop is almost perfect: slide, merge, repeat, one more try.",
      "The rules take ten seconds to explain. Tiles slide across a 4x4 grid, and two tiles with the same number merge into one tile with double the number. Get two 1024 tiles to meet and you have hit the goal — 2048.",
      "Almost nobody stops there. Chasing 4096, 8192, or even higher becomes the real game. This free 2048 online game runs in your browser with arrow-key controls on desktop and swipe controls on mobile, so you can pick it up any time.",
      "Related searches like play 2048 free, 2048 unblocked, and 2048 no download all end at the same place: a tab, a grid, and the same addictive rhythm."
    ],
    howToPlay: [
      "Use arrow keys on desktop or swipe on mobile to slide all tiles in that direction.",
      "When two tiles with the same number touch, they merge into one tile with double the value.",
      "A new tile (2 or 4) appears on the board after every move.",
      "Reach a 2048 tile to win. Keep playing to build even higher tiles.",
      "The game ends when the board is full and no more merges are possible."
    ],
    faqs: [
      { q: "How do I win 2048?", a: "Merge tiles until you build a 2048 tile. You can then keep playing for higher scores like 4096 or 8192." },
      { q: "What is a good strategy for 2048?", a: "Pick a corner (usually top-left or bottom-right), keep your highest tile there, and never let it move. Build a chain of descending values along the edge." },
      { q: "Can I play 2048 on my phone?", a: "Yes. Swipe up, down, left, or right to move the tiles." },
      { q: "What is the highest tile possible in 2048?", a: "In theory 131,072, but reaching even 8192 takes hours of careful play. Almost nobody ever sees 16384 in a real game." },
      { q: "Why do I keep losing at 2048?", a: "Usually because tiles get scattered. Try keeping your biggest tile locked in a corner and only move in three directions instead of all four." },
      { q: "Is 2048 the same as Threes?", a: "It was heavily inspired by Threes, an earlier iOS game with a similar merge mechanic. 2048 simplified the rules and became the runaway hit." }
    ],
    related: ["sudoku", "sliding-puzzle", "snake", "minesweeper"],
    keywords: ["2048 online", "play 2048 free", "2048 unblocked", "2048 game no download"]
  },
  {
    slug: "word-search",
    name: "Word Search",
    tagline: "Find hidden words in a grid of letters.",
    emoji: "🔤",
    category: "word",
    shortDescription: "Free word search puzzles online. Different categories, click and drag to circle each word.",
    metaTitle: "Play Free Word Search Puzzles Online | SimpleBrainGames",
    metaDescription: "Free word search puzzles by category. Click and drag to circle hidden words in the letter grid. Play in your browser, no download.",
    about: [
      "Word search puzzles have been a staple of newspapers, activity books, and long car journeys since the 1960s. The rules are welcoming — you are given a grid of letters and a list of hidden words, and your job is to find every word.",
      "Words can run horizontally, vertically, or diagonally, and they can appear forwards or backwards. That flexibility is what turns a small grid into a proper hunt.",
      "This free word search online gives you a fresh puzzle every round, with different themes so the vocabulary stays interesting. It is a great low-stakes brain game: no timer pressure by default, just you and the grid.",
      "People searching for free word search puzzles, word find online, and word search no download tend to land here. It works well on mobile — you tap and drag across the letters to circle a word."
    ],
    howToPlay: [
      "Look at the word list beside the grid.",
      "Click or tap the first letter of a word you spot, then drag to its last letter.",
      "If the letters match a word in the list, it gets circled and crossed off the list.",
      "Words can run horizontally, vertically, or diagonally, forwards or backwards.",
      "You win when every word on the list has been found."
    ],
    faqs: [
      { q: "Are word searches good for your brain?", a: "They practice pattern recognition and vocabulary recall in a low-pressure way, which makes them a favourite in classrooms and memory-care settings." },
      { q: "Do the words go diagonally?", a: "Yes. In this version words can run horizontally, vertically, or diagonally, and forwards or backwards." },
      { q: "How do I find hidden words faster?", a: "Scan the grid for unusual letters first — like Q, Z, or X — because they narrow down which word you are hunting." },
      { q: "Can I play word search on my phone?", a: "Yes. Tap the first letter and drag your finger to the last letter to circle a word." },
      { q: "How many words are in each puzzle?", a: "Puzzles usually contain 8 to 15 words on themed grids." },
      { q: "Do I need to download anything?", a: "No. Word search runs entirely in your browser." }
    ],
    related: ["hangman", "wordle-clone", "sudoku", "memory-match"],
    keywords: ["word search online", "free word search", "word find puzzle", "word search no download"]
  },
  {
    slug: "hangman",
    name: "Hangman",
    tagline: "Guess the word before you run out of tries.",
    emoji: "🔡",
    category: "word",
    shortDescription: "Play Hangman free online. Guess the hidden word one letter at a time across themed categories.",
    metaTitle: "Play Free Hangman Online — Word Guessing Game | SimpleBrainGames",
    metaDescription: "Classic Hangman word guessing game online. Guess the hidden word one letter at a time. Free, no sign-up, several word categories.",
    about: [
      "Hangman has been played with scraps of paper for longer than anyone has been able to date it exactly. The rules are simple: someone picks a word, the other player guesses letters one at a time, and each wrong guess adds another line to the drawing.",
      "The version here uses a friendlier balloon animation instead of a gallows — same game, less grim visual. You get six wrong guesses before the round ends.",
      "There are multiple word categories to choose from, so the same rules can feel very different: animals, countries, food, movies, and more. It is a lightweight vocabulary workout that adults and older kids both enjoy.",
      "Search terms like hangman online free, word guessing game, and hangman no download all describe this classic — nothing to install, nothing to sign up for."
    ],
    howToPlay: [
      "Pick a category. The game picks a random word from that category and shows blanks for each letter.",
      "Tap a letter to guess it. Correct letters fill in every position they appear.",
      "Wrong guesses add a piece to the drawing. Six wrong guesses and the game is over.",
      "Guess every letter in the word before running out of tries to win.",
      "Tap New Game to start again with a fresh word."
    ],
    faqs: [
      { q: "What is the best first letter to guess in Hangman?", a: "The vowels E and A, followed by common consonants R, S, T, and N, are almost always safe first guesses in English words." },
      { q: "How many wrong guesses do I get?", a: "Six. After the sixth wrong letter, the round is over." },
      { q: "Are the words case sensitive?", a: "No. Uppercase and lowercase are treated the same." },
      { q: "Are there different difficulty levels?", a: "Yes — different categories use longer or more obscure words. Countries and animals tend to be easier than movies." },
      { q: "Can kids play Hangman here?", a: "Yes. This version uses a friendly balloon animation instead of a gallows figure." },
      { q: "How is Hangman good for learning?", a: "It builds letter-frequency intuition and vocabulary. It is often used to help English learners practice spelling." }
    ],
    related: ["word-search", "wordle-clone", "memory-match", "sudoku"],
    keywords: ["hangman online", "free hangman", "word guessing game", "hangman no download"]
  },
  {
    slug: "simon-says",
    name: "Simon Says",
    tagline: "Watch the pattern, repeat it, don't slip up.",
    emoji: "🟢🔴",
    category: "memory",
    shortDescription: "Free online Simon Says memory game. Repeat the growing colour sequence for as long as you can.",
    metaTitle: "Play Simon Says Online Free — Memory Sequence Game | SimpleBrainGames",
    metaDescription: "Classic Simon Says memory game online. Watch the growing colour sequence and repeat it back. Free, no download, no sign-up.",
    about: [
      "Simon was a hit electronic toy in 1978, a chunky plastic disc with four coloured buttons and one very demanding voice. The game plays a sequence of colours and sounds, and you have to repeat it back exactly. Each round adds another step.",
      "The genius of the design is how quickly it goes from easy to impossible. Five or six steps and you feel like a memory champion. Twelve or fifteen and your brain simply gives up.",
      "This free online Simon Says works the same way. Four colour pads, each with its own tone, and a sequence that grows by one every round. It is a fantastic short brain game — a single round takes seconds and you keep going until you slip.",
      "Related terms like simon says game online, colour memory game, and simon electronic game all describe this one. There is nothing to download and it plays fine on both phones and desktops."
    ],
    howToPlay: [
      "Press Start. The game will flash and sound one colour.",
      "Tap the same colour to repeat it. If you are correct, the game will play a longer sequence.",
      "Each round adds one more colour to the end of the sequence.",
      "Repeat the full sequence exactly to advance. One wrong tap ends the game.",
      "Try to beat your longest streak on the next round."
    ],
    faqs: [
      { q: "How high can you get in Simon Says?", a: "Casual players usually top out between 8 and 12 steps. Serious memory players have hit 20 or more." },
      { q: "Does Simon Says train memory?", a: "It is a well-known short-term memory workout. It targets working memory specifically — the same capacity used for remembering phone numbers or shopping lists." },
      { q: "Is Simon Says timed?", a: "There is a short window between steps and between your responses, but you are not racing against a clock the whole time." },
      { q: "What was the original Simon toy?", a: "It was released in 1978 by Milton Bradley and became one of the best-selling electronic toys of the late 1970s." },
      { q: "Does sound help me remember the pattern?", a: "Yes. Each colour has a distinct tone, and most players find pairing the sound and colour together is easier than remembering colours alone." },
      { q: "Can I play with sound off?", a: "Yes. The game is fully playable with just the visual cues." }
    ],
    related: ["memory-match", "whack-a-mole", "snake", "mastermind"],
    keywords: ["simon says online", "simon memory game", "colour sequence game", "simon says free"]
  },
  {
    slug: "whack-a-mole",
    name: "Whack-a-Mole",
    tagline: "Tap the moles as fast as they pop up.",
    emoji: "🔨",
    category: "arcade",
    shortDescription: "Whack-a-Mole reaction game — tap the moles as they appear. Free, in your browser.",
    metaTitle: "Play Whack-a-Mole Online Free — Reaction Speed Game | SimpleBrainGames",
    metaDescription: "Classic Whack-a-Mole reaction game online. Tap the moles as fast as they pop up. Free, no download, works on mobile.",
    about: [
      "Whack-a-Mole started as a coin-operated arcade game in the 1970s and became a metaphor for any problem that keeps popping back up. The digital version keeps the fun and skips the mallet.",
      "The rules are pure reaction time. Moles appear at random spots on a grid for a fraction of a second, and you tap them before they duck back down. Every hit scores a point. Miss too many and the round ends.",
      "This free online Whack-a-Mole runs a 60-second round with increasing speed, which is a great little burst of hand-eye coordination in the middle of a slow afternoon. It plays especially well on phones with a thumb.",
      "Searches like whack a mole game online, reaction speed game, and arcade whack a mole free all describe this one. Nothing to install and no sign-up."
    ],
    howToPlay: [
      "Press Start. Moles appear at random spots on the grid.",
      "Tap a mole before it disappears to score a point.",
      "The moles get faster as the round goes on.",
      "The round lasts 60 seconds. Your final score is your total hits.",
      "Beat your high score on the next round."
    ],
    faqs: [
      { q: "How long is a Whack-a-Mole round?", a: "One minute by default. The moles get faster as the round progresses." },
      { q: "Does Whack-a-Mole improve reaction time?", a: "Short reaction games do give a small workout for hand-eye coordination, though it is not going to turn you into a professional gamer." },
      { q: "Can I play with the mouse?", a: "Yes. Click a mole to hit it. Touch works on mobile." },
      { q: "What is a good Whack-a-Mole score?", a: "Above 40 hits in a minute is respectable. Above 70 and you are moving very quickly." },
      { q: "Where did Whack-a-Mole come from?", a: "It was invented in the mid-1970s in Japan and quickly spread to arcades around the world." },
      { q: "Does the game work offline?", a: "Once loaded, the game runs entirely in your browser." }
    ],
    related: ["snake", "simon-says", "rock-paper-scissors", "2048"],
    keywords: ["whack a mole", "reaction game", "arcade whack a mole", "whack a mole online free"]
  },
  {
    slug: "snake",
    name: "Snake",
    tagline: "Grow longer, don't bite yourself.",
    emoji: "🐍",
    category: "arcade",
    featured: true,
    shortDescription: "Play the classic Snake game online. Eat food, grow longer, avoid your own tail. Free in your browser.",
    metaTitle: "Play Snake Game Online Free — Classic Nokia Snake | SimpleBrainGames",
    metaDescription: "Classic Snake game online. Eat food, grow longer, avoid the walls and your own tail. Free, no download, works on mobile and desktop.",
    about: [
      "Snake became a household game because it was preloaded on Nokia phones in the late 1990s. Whole generations of commuters learned to steer a chain of pixels around a tiny screen with the number keys.",
      "The rules could not be simpler. You control a snake that moves in a straight line. When it eats a piece of food, it grows longer. Hit a wall, or your own tail, and the game is over.",
      "What starts as a lazy stroll becomes a claustrophobic panic. By the time the snake fills half the board you are planning routes three moves ahead — which is exactly why the game has aged well.",
      "This free online snake game supports arrow keys on desktop and swipes on mobile. Related searches like play snake online free, classic nokia snake, and snake game no download all end here."
    ],
    howToPlay: [
      "Use arrow keys on desktop or swipe on mobile to change direction.",
      "The snake moves continuously. Eat the food to grow longer.",
      "Do not hit the walls of the board.",
      "Do not run into your own tail.",
      "Your score goes up by one for every piece of food eaten."
    ],
    faqs: [
      { q: "How do I control the snake on mobile?", a: "Swipe up, down, left, or right on the board to change the snake's direction." },
      { q: "What is a good Snake score?", a: "A score of 30 or more takes real concentration. Above 60 is very impressive." },
      { q: "Can I pause the game?", a: "Yes. Press Space (or tap the pause button on mobile) to pause and resume." },
      { q: "Does the game speed up?", a: "Yes. The snake moves faster as it grows longer, which is what makes the late game so hard." },
      { q: "Why was Snake so popular on Nokia phones?", a: "It came preloaded on nearly every Nokia phone from 1998 onwards, so it introduced billions of people to mobile gaming almost by accident." },
      { q: "Can I play Snake offline?", a: "Once the page has loaded, the game runs entirely in your browser." }
    ],
    related: ["2048", "whack-a-mole", "sliding-puzzle", "simon-says"],
    keywords: ["snake game online", "classic snake", "nokia snake", "play snake free"]
  },
  {
    slug: "reversi",
    name: "Reversi",
    tagline: "Also called Othello — flip your opponent's tiles.",
    emoji: "⚪⚫",
    category: "board",
    shortDescription: "Play Reversi (Othello) online for two players. Flip your opponent's discs to control the board.",
    metaTitle: "Play Reversi (Othello) Online Free — 2 Player | SimpleBrainGames",
    metaDescription: "Classic Reversi / Othello board game online for two players. Flip your opponent's discs to control the board. Free, no download.",
    about: [
      "Reversi — sold since the 1970s under the trademark Othello — is one of those games that takes a minute to learn and a lifetime to master. Two players place discs on an 8x8 board, and every time you sandwich a row of your opponent's discs between two of yours, those discs flip to your colour.",
      "The catch is that the score can change dramatically on the very last move. Corner tiles cannot be flipped, so a lot of high-level play is about controlling the corners while denying them to your opponent.",
      "This free online Reversi is designed for two players on the same device — a great pick if you want something more thoughtful than tic tac toe but faster than chess.",
      "Search terms like reversi online free, othello online 2 player, and free othello game all describe this classic. It works cleanly in a browser on desktop or mobile."
    ],
    howToPlay: [
      "The board starts with four discs in the middle — two black, two white. Black moves first.",
      "On your turn, place a disc so that at least one of your opponent's discs is sandwiched between the new disc and another of your discs.",
      "Every sandwiched disc flips to your colour.",
      "If you cannot make a valid move, your turn is skipped. If neither player can move, the game ends.",
      "The player with more discs on the board at the end wins."
    ],
    faqs: [
      { q: "Is Reversi the same as Othello?", a: "Yes — Othello is the trademarked modern name for Reversi with slightly formalised starting rules. The play is identical." },
      { q: "Why are the corners so important?", a: "Corner discs can never be flipped, so they act as anchors for the rest of your position. Controlling the four corners often wins the game." },
      { q: "What is the best opening move?", a: "There are only four legal opening moves and they are all equivalent by symmetry. Real strategy kicks in from move two onwards." },
      { q: "How long does a game last?", a: "Casual games take about 10 to 15 minutes. Every board fills up in exactly 60 moves." },
      { q: "Can I play with a friend on the same device?", a: "Yes. This version is two-player local — pass the phone or share a laptop." },
      { q: "Is Reversi solved?", a: "Not yet. It has been solved on smaller boards, but the standard 8x8 game is still an open problem in game theory." }
    ],
    related: ["checkers", "tic-tac-toe", "connect-4", "dots-and-boxes"],
    keywords: ["reversi online", "othello online", "reversi 2 player", "free othello"]
  },
  {
    slug: "rock-paper-scissors",
    name: "Rock Paper Scissors",
    tagline: "Best of five against the computer.",
    emoji: "✊✋✌️",
    category: "arcade",
    shortDescription: "Play Rock Paper Scissors online against the computer. Best of five rounds, running score.",
    metaTitle: "Play Rock Paper Scissors Online Free — vs Computer | SimpleBrainGames",
    metaDescription: "Rock Paper Scissors online against the computer. Best of five rounds with running score. Free, no download, works on mobile.",
    about: [
      "Rock Paper Scissors is the world's most-played tie-breaker. Kids use it to decide who bats first, adults use it to settle who does the dishes, and international tournaments genuinely exist for the game.",
      "The rules are famously balanced. Rock crushes scissors, scissors cut paper, and paper covers rock. In a single round the odds are exactly one third for each outcome, which is what makes it a fair way to decide things.",
      "This version pits you against the computer over a best-of-five round. The computer is not psychic — it picks randomly — but human players are surprisingly bad at random, and the game keeps a running score to prove it.",
      "Searches like rock paper scissors online, rps game, and rock paper scissors free all point here. It plays in seconds on any device."
    ],
    howToPlay: [
      "Tap Rock, Paper, or Scissors to make your choice.",
      "The computer picks at the same time.",
      "Rock beats scissors. Scissors beat paper. Paper beats rock.",
      "First to three wins takes the match.",
      "Tap New Match to start a fresh best-of-five."
    ],
    faqs: [
      { q: "Does the computer cheat?", a: "No. The computer picks its move at random every round, without looking at yours." },
      { q: "Is there any strategy to Rock Paper Scissors?", a: "Against another human, yes — most people are biased away from repeating their last throw. Against a random computer, there is no strategy that beats one-third." },
      { q: "How many rounds is a match?", a: "Best of five by default. First player to three wins takes the match." },
      { q: "Are there variants like Rock Paper Scissors Lizard Spock?", a: "There are, but we stick with the classic three-move version to keep things quick." },
      { q: "Can two people play on the same device?", a: "This version is player-vs-computer. For a two-player version, hide the screen between throws." },
      { q: "Is this the same as the World RPS Championships?", a: "It is the same core game. Tournament play just adds ceremony and predictable tells to read." }
    ],
    related: ["whack-a-mole", "simon-says", "snake", "tic-tac-toe"],
    keywords: ["rock paper scissors", "rps online", "rock paper scissors vs computer", "free rps game"]
  },
  {
    slug: "sliding-puzzle",
    name: "Sliding Puzzle",
    tagline: "The classic 15 puzzle — slide tiles into order.",
    emoji: "🧩",
    category: "puzzle",
    shortDescription: "Free 15-puzzle online. Slide numbered tiles into order in as few moves as possible.",
    metaTitle: "Play the 15 Sliding Puzzle Online Free | SimpleBrainGames",
    metaDescription: "Classic 15-puzzle in your browser. Slide numbered tiles into order in as few moves as possible. Free, no download.",
    about: [
      "The 15 puzzle first went viral in the 1880s — long before the internet — when a version of it swept across the United States and Europe as a full-blown craze. Newspapers printed the layout, prizes were offered for solutions that turned out to be impossible, and people spent hours sliding wooden tiles around 4x4 trays.",
      "The digital version is exactly the same. You have a 4x4 grid with tiles numbered 1 to 15 and one empty square. The tiles can only slide into the empty square, and the goal is to arrange them in numerical order.",
      "It is a very clean puzzle in that half of all random shuffles are unsolvable — a fact that stumped mathematicians well into the 20th century. Our shuffle is guaranteed to be solvable, so you always have a real target.",
      "Related search terms like 15 puzzle online free, sliding number puzzle, and slide tile puzzle no download all describe this one. It plays especially well on phones."
    ],
    howToPlay: [
      "Tap a tile next to the empty square. It slides into the empty spot.",
      "Arrange the tiles in numerical order, 1 through 15, with the empty square in the bottom right.",
      "The move counter tracks how many moves you have made.",
      "The timer starts on your first move.",
      "Press New Game to shuffle again."
    ],
    faqs: [
      { q: "Is every shuffle solvable?", a: "Only half of the random arrangements of a 15 puzzle are solvable. Our shuffle only produces solvable positions." },
      { q: "How many moves does a solved puzzle take?", a: "In theory any solvable position can be solved in 80 moves or fewer. Casual players usually take a few hundred." },
      { q: "What is a good time for the 15 puzzle?", a: "Under two minutes is very strong. Speedrunners can finish in well under a minute." },
      { q: "What is the trick to solving the 15 puzzle?", a: "Solve the top row and left column first, then the next row and column, working your way toward the bottom right. Trying to fix one tile at a time in random order is what makes people stuck." },
      { q: "Can I play on mobile?", a: "Yes. Tap a tile to slide it." },
      { q: "Where did the 15 puzzle come from?", a: "It was invented in 1874 by Noyes Chapman, a postmaster in New York, and became a global craze in 1880." }
    ],
    related: ["sudoku", "2048", "mastermind", "minesweeper"],
    keywords: ["15 puzzle", "sliding puzzle online", "slide tile puzzle", "number puzzle free"]
  },
  {
    slug: "mastermind",
    name: "Mastermind",
    tagline: "Crack the secret colour code.",
    emoji: "🎨",
    category: "puzzle",
    shortDescription: "Play Mastermind online — deduce the hidden colour code in as few guesses as possible.",
    metaTitle: "Play Mastermind Online Free — Code Breaking Game | SimpleBrainGames",
    metaDescription: "Classic Mastermind code-breaking game online. Guess the hidden colour pattern using logic and clues. Free, no download.",
    about: [
      "Mastermind was published in 1970 by Israeli postmaster Mordecai Meirowitz, and the packaging is iconic — a rectangular board and a set of tiny coloured pegs. The rules are pure deduction. One player sets a secret four-peg code, and the other player has ten guesses to crack it.",
      "After every guess the codesetter gives back a small clue: how many pegs are the right colour in the right position, and how many are the right colour in the wrong position. The magic is how much you can learn from a single well-chosen guess.",
      "This free online Mastermind gives you the same challenge against the computer. It picks a hidden code, you guess, and the clues arrive after every attempt. There is nothing to install and nothing to sign up for.",
      "Related terms like mastermind online free, colour code guessing game, and mastermind board game online all describe this one. It is a great pick if you enjoy logic puzzles like sudoku or minesweeper."
    ],
    howToPlay: [
      "The computer picks a secret code of four coloured pegs.",
      "Choose four colours and submit a guess.",
      "Black pegs mean the right colour in the right position. White pegs mean the right colour in the wrong position.",
      "Use the clues to narrow down the code with each guess.",
      "You have ten guesses to crack the code."
    ],
    faqs: [
      { q: "Can the code repeat colours?", a: "Yes. The secret code may include repeated colours in this version." },
      { q: "How many guesses do I get?", a: "Ten. If you have not cracked the code by the tenth guess, the game reveals the answer." },
      { q: "What is the best first guess in Mastermind?", a: "A guess with two different colours (like Red Red Blue Blue) tends to give the most useful information early on." },
      { q: "Is Mastermind good for problem solving?", a: "Yes. It is one of the cleanest deduction puzzles around and is used in classrooms to teach logical reasoning." },
      { q: "How is Mastermind different from Sudoku?", a: "Both are logic puzzles, but Mastermind is interactive — every guess gives you feedback — while sudoku is static and self-contained." },
      { q: "Can I set the code and let the computer guess?", a: "Not in this version. You are always the code-breaker." }
    ],
    related: ["sudoku", "minesweeper", "sliding-puzzle", "memory-match"],
    keywords: ["mastermind online", "code breaking game", "mastermind free", "colour code puzzle"]
  },
  {
    slug: "dots-and-boxes",
    name: "Dots and Boxes",
    tagline: "Draw lines, close boxes, out-plan your friend.",
    emoji: "▫️",
    category: "board",
    shortDescription: "Two-player Dots and Boxes online. Draw lines, complete boxes, control the board.",
    metaTitle: "Play Dots and Boxes Online Free — 2 Player | SimpleBrainGames",
    metaDescription: "Classic Dots and Boxes online for two players. Draw lines, complete boxes, and out-strategise your opponent. Free, no download.",
    about: [
      "Dots and Boxes is the game every kid has doodled in a notebook. You start with a grid of dots. Players take turns drawing a single horizontal or vertical line between two adjacent dots. Whenever a player completes the fourth side of a box, they claim that box and take another turn.",
      "It sounds simple, and for the first few moves it is. Then a critical thing happens — every remaining line starts to open up a chain of boxes for the opponent. Serious players learn to sacrifice small chains to keep the big ones.",
      "This free online Dots and Boxes is designed for two players on one device. It is a great pick if you enjoy short strategy games with a bit of geometry.",
      "Search phrases like dots and boxes online, dot game 2 player, and pen and paper dots game all describe this classic. It works well on a phone in landscape mode."
    ],
    howToPlay: [
      "Players take turns drawing a single horizontal or vertical line between two adjacent dots.",
      "When you complete the fourth side of a box, you claim it and take another turn.",
      "The game ends when every possible line has been drawn.",
      "The player with more claimed boxes wins.",
      "Tap between two dots to draw a line."
    ],
    faqs: [
      { q: "Is Dots and Boxes a strategy game?", a: "Yes — despite the schoolyard vibe, high-level play involves chain theory, parity, and deliberate sacrifices. It is much deeper than it looks." },
      { q: "Can I play with a friend on the same device?", a: "Yes. Two-player local is the default here." },
      { q: "What size is the board?", a: "The default board is a 5x5 grid of boxes (6x6 dots). We may add larger sizes in a future update." },
      { q: "Who claims a box?", a: "The player who draws the fourth side of a box claims it, regardless of who drew the first three." },
      { q: "Why do I keep losing after making the last move?", a: "That is the classic Dots and Boxes trap. Whoever is forced to open the last long chain usually loses. Learning when to short-sacrifice is the main skill." },
      { q: "Is this the same as Squares?", a: "Yes — Dots and Boxes is also known as Squares, Line Game, or Pigs in a Pen depending on where you grew up." }
    ],
    related: ["connect-4", "reversi", "checkers", "tic-tac-toe"],
    keywords: ["dots and boxes", "dot game", "squares game", "dots and boxes 2 player"]
  },
  {
    slug: "wordle-clone",
    name: "Word Guess",
    tagline: "Guess the five-letter word in six tries.",
    emoji: "🟩🟨",
    category: "word",
    featured: true,
    shortDescription: "Free Wordle-style word guess game. Six tries to find the hidden five-letter word.",
    metaTitle: "Play Word Guess Online Free — 5 Letter Word Game | SimpleBrainGames",
    metaDescription: "Wordle-style five-letter word guessing game online. Six tries, colour-coded clues. Free, no download, unlimited plays.",
    about: [
      "The five-letter word guess game exploded in popularity in 2021, but the format is much older — it descends from a 1970s game called Jotto. Six guesses, a five-letter target, and colour clues after every attempt.",
      "The clues are what make it work. Green means the letter is in the word and in the right spot. Yellow means it is in the word but somewhere else. Grey means it is not in the word at all. That is enough information to narrow down the answer surprisingly fast, if you pick your guesses well.",
      "This free version gives you unlimited plays — no once-a-day rationing — so you can chase a streak, share the puzzle with a friend, or just warm up your brain before starting the day. Everything runs in your browser.",
      "Popular searches like wordle clone online, five letter word game, and unlimited wordle all describe this one. There is nothing to install and no account required."
    ],
    howToPlay: [
      "Type a five-letter word and press Enter to guess.",
      "Green means the letter is in the word and in the correct spot.",
      "Yellow means the letter is in the word but in a different spot.",
      "Grey means the letter is not in the word at all.",
      "You have six guesses to find the word."
    ],
    faqs: [
      { q: "How many guesses do I get?", a: "Six. If you have not found the word by the sixth guess, the game reveals it." },
      { q: "What is the best first word to guess?", a: "Words with lots of common letters and vowels like CRANE, SLATE, or ADIEU are popular openers because they eliminate a big chunk of possibilities in one guess." },
      { q: "Can I play more than once a day?", a: "Yes. Unlike the official Wordle, this version gives you a fresh word every time you press New Game." },
      { q: "Does it use real English words?", a: "Yes. The target word is always a valid English five-letter word." },
      { q: "Why was my guess rejected?", a: "Guesses have to be real five-letter words. Random letter combinations are not accepted, to keep the game honest." },
      { q: "How is this different from the original Wordle?", a: "The mechanics are the same, but this version has no daily limit and no ties to a specific account." }
    ],
    related: ["hangman", "word-search", "sudoku", "mastermind"],
    keywords: ["wordle clone", "wordle unlimited", "five letter word game", "word guess online"]
  }
];

export const GAMES_BY_SLUG = new Map(GAMES.map(g => [g.slug, g]));

export function getGame(slug: string): GameMeta | undefined {
  return GAMES_BY_SLUG.get(slug);
}

export function getRelatedGames(slugs: string[]): GameMeta[] {
  return slugs.map(s => GAMES_BY_SLUG.get(s)).filter((g): g is GameMeta => Boolean(g));
}

export const FEATURED_GAMES = GAMES.filter(g => g.featured);
