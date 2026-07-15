import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* ---------------------- shared UI helpers ---------------------- */

export type Difficulty = "easy" | "medium" | "hard";

export function GameShell({ children, controls, status, extra }: { children: React.ReactNode; controls?: React.ReactNode; status?: React.ReactNode; extra?: React.ReactNode }) {
  return (
    <div className="game-board-frame mx-auto flex w-full max-w-xl flex-col items-center gap-4 p-4 sm:p-6">
      {status && <div className="text-center text-sm font-medium text-foreground">{status}</div>}
      <div className="flex w-full justify-center">{children}</div>
      {extra}
      {controls && <div className="flex flex-wrap items-center justify-center gap-2">{controls}</div>}
    </div>
  );
}

export function GameButton({ children, onClick, variant = "primary", ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "accent" }) {
  const styles: Record<string, string> = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "bg-secondary text-secondary-foreground hover:bg-secondary/70",
    accent: "bg-accent text-accent-foreground hover:bg-accent/80",
  };
  return (
    <button
      onClick={onClick}
      disabled={rest.disabled}
      className={`rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition-colors disabled:opacity-50 ${styles[variant]}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function DifficultyPicker({ value, onChange, disabled }: { value: Difficulty; onChange: (d: Difficulty) => void; disabled?: boolean }) {
  const opts: Difficulty[] = ["easy", "medium", "hard"];
  return (
    <div className="flex gap-2">
      {opts.map(o => (
        <button
          key={o}
          disabled={disabled}
          onClick={() => onChange(o)}
          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition-colors disabled:opacity-50 ${value === o ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/70"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/* ============================================================== */
/* 1. TIC TAC TOE — vs computer w/ difficulty                      */
/* ============================================================== */

type TCell = "X" | "O" | null;
function tttWinner(b: TCell[]): TCell {
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (const [a,b1,c] of lines) if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
  return null;
}
function tttEmpties(b: TCell[]) { return b.map((v,i) => v ? -1 : i).filter(i => i >= 0); }
function tttMinimax(b: TCell[], me: "X"|"O", turn: "X"|"O"): { score: number; move: number } {
  const w = tttWinner(b);
  if (w === me) return { score: 10, move: -1 };
  if (w) return { score: -10, move: -1 };
  const empties = tttEmpties(b);
  if (empties.length === 0) return { score: 0, move: -1 };
  let best = { score: turn === me ? -Infinity : Infinity, move: empties[0] };
  for (const i of empties) {
    const nb = b.slice(); nb[i] = turn;
    const { score } = tttMinimax(nb, me, turn === "X" ? "O" : "X");
    if (turn === me ? score > best.score : score < best.score) best = { score, move: i };
  }
  return best;
}
function tttAIMove(b: TCell[], ai: "X"|"O", diff: Difficulty): number {
  const empties = tttEmpties(b);
  if (!empties.length) return -1;
  if (diff === "easy") return empties[Math.floor(Math.random()*empties.length)];
  if (diff === "medium") {
    // win if possible, else block, else random
    const human: "X"|"O" = ai === "X" ? "O" : "X";
    for (const i of empties) { const nb = b.slice(); nb[i] = ai; if (tttWinner(nb) === ai) return i; }
    for (const i of empties) { const nb = b.slice(); nb[i] = human; if (tttWinner(nb) === human) return i; }
    if (b[4] === null) return 4;
    return empties[Math.floor(Math.random()*empties.length)];
  }
  return tttMinimax(b, ai, ai).move;
}

export function TicTacToe({ onReset }: { onReset: () => void }) {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [board, setBoard] = useState<TCell[]>(Array(9).fill(null));
  const [xNext, setXNext] = useState(true); // human is X
  const [thinking, setThinking] = useState(false);
  const winner = useMemo(() => tttWinner(board), [board]);
  const draw = !winner && board.every(Boolean);

  const play = (i: number) => {
    if (board[i] || winner || !xNext || thinking) return;
    const next = board.slice(); next[i] = "X"; setBoard(next); setXNext(false);
  };

  // AI move
  useEffect(() => {
    if (xNext || winner || draw) return;
    setThinking(true);
    const t = setTimeout(() => {
      setBoard(prev => {
        if (tttWinner(prev)) return prev;
        const mv = tttAIMove(prev, "O", difficulty);
        if (mv < 0) return prev;
        const nb = prev.slice(); nb[mv] = "O"; return nb;
      });
      setXNext(true);
      setThinking(false);
    }, 550);
    return () => { clearTimeout(t); setThinking(false); };
  }, [xNext, winner, draw, difficulty]);

  const reset = () => { setBoard(Array(9).fill(null)); setXNext(true); setThinking(false); onReset(); };

  return (
    <GameShell
      status={<span>{winner ? (winner === "X" ? "🎉 You win!" : "🤖 Computer wins.") : draw ? "It's a draw." : thinking ? "🤖 Computer thinking…" : "Your turn (X)"}</span>}
      controls={<><DifficultyPicker value={difficulty} onChange={d => { setDifficulty(d); reset(); }} /><GameButton onClick={reset}>New Game</GameButton></>}
    >
      <div className="grid grid-cols-3 gap-2">
        {board.map((c, i) => (
          <button
            key={i}
            onClick={() => play(i)}
            className="grid h-20 w-20 place-items-center rounded-xl bg-card font-display text-4xl font-bold shadow-sm ring-1 ring-border transition-all duration-300 hover:bg-secondary sm:h-24 sm:w-24"
          >
            <span className={`transition-opacity duration-300 ${c ? "opacity-100" : "opacity-0"} ${c === "X" ? "text-primary" : "text-accent"}`}>{c}</span>
          </button>
        ))}
      </div>
    </GameShell>
  );
}

/* ============================================================== */
/* 2. CONNECT 4 — vs computer w/ difficulty                        */
/* ============================================================== */

type C4 = 0 | 1 | 2;
const C4_R = 6, C4_C = 7;
function c4Winner(g: C4[][]): 0 | 1 | 2 {
  const dirs = [[0,1],[1,0],[1,1],[1,-1]];
  for (let r = 0; r < C4_R; r++) for (let c = 0; c < C4_C; c++) {
    const v = g[r][c]; if (!v) continue;
    for (const [dr,dc] of dirs) {
      let k = 1;
      while (k < 4 && r+dr*k>=0 && r+dr*k<C4_R && c+dc*k>=0 && c+dc*k<C4_C && g[r+dr*k][c+dc*k]===v) k++;
      if (k === 4) return v;
    }
  }
  return 0;
}
function c4Drop(g: C4[][], col: number, p: 1|2): C4[][] | null {
  for (let r = C4_R - 1; r >= 0; r--) {
    if (g[r][col] === 0) {
      const ng = g.map(row => row.slice() as C4[]);
      ng[r][col] = p; return ng;
    }
  }
  return null;
}
function c4Score(g: C4[][], p: 1|2): number {
  // count windows of 4
  const opp: 1|2 = p === 1 ? 2 : 1;
  let s = 0;
  const dirs = [[0,1],[1,0],[1,1],[1,-1]];
  for (let r = 0; r < C4_R; r++) for (let c = 0; c < C4_C; c++) for (const [dr,dc] of dirs) {
    const er = r + dr*3, ec = c + dc*3;
    if (er < 0 || er >= C4_R || ec < 0 || ec >= C4_C) continue;
    let mine = 0, theirs = 0;
    for (let k = 0; k < 4; k++) { const v = g[r+dr*k][c+dc*k]; if (v === p) mine++; else if (v === opp) theirs++; }
    if (mine && theirs) continue;
    if (mine === 4) s += 1000;
    else if (mine === 3) s += 10;
    else if (mine === 2) s += 2;
    if (theirs === 3) s -= 15;
    if (theirs === 2) s -= 2;
  }
  // prefer center
  for (let r = 0; r < C4_R; r++) if (g[r][3] === p) s += 3;
  return s;
}
function c4Minimax(g: C4[][], depth: number, alpha: number, beta: number, maximizing: boolean, ai: 1|2): { score: number; col: number } {
  const w = c4Winner(g);
  if (w === ai) return { score: 100000 - (6 - depth), col: -1 };
  if (w && w !== ai) return { score: -100000 + (6 - depth), col: -1 };
  if (depth === 0) return { score: c4Score(g, ai), col: -1 };
  const cols = [3,2,4,1,5,0,6].filter(c => g[0][c] === 0);
  if (!cols.length) return { score: 0, col: -1 };
  const player: 1|2 = maximizing ? ai : (ai === 1 ? 2 : 1);
  let best = { score: maximizing ? -Infinity : Infinity, col: cols[0] };
  for (const c of cols) {
    const ng = c4Drop(g, c, player); if (!ng) continue;
    const { score } = c4Minimax(ng, depth - 1, alpha, beta, !maximizing, ai);
    if (maximizing) { if (score > best.score) best = { score, col: c }; alpha = Math.max(alpha, score); }
    else { if (score < best.score) best = { score, col: c }; beta = Math.min(beta, score); }
    if (beta <= alpha) break;
  }
  return best;
}
function c4AIMove(g: C4[][], diff: Difficulty): number {
  const cols = Array.from({length: C4_C}, (_,i) => i).filter(c => g[0][c] === 0);
  if (!cols.length) return -1;
  if (diff === "easy") return cols[Math.floor(Math.random()*cols.length)];
  const depth = diff === "medium" ? 3 : 5;
  return c4Minimax(g, depth, -Infinity, Infinity, true, 2).col;
}

export function Connect4({ onReset }: { onReset: () => void }) {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const empty = (): C4[][] => Array.from({ length: C4_R }, () => Array<C4>(C4_C).fill(0));
  const [grid, setGrid] = useState<C4[][]>(empty);
  const [turn, setTurn] = useState<1|2>(1); // 1 = human red, 2 = AI yellow
  const [thinking, setThinking] = useState(false);
  const winner = useMemo(() => c4Winner(grid), [grid]);
  const full = grid[0].every(v => v !== 0);

  const drop = (col: number) => {
    if (winner || turn !== 1 || thinking) return;
    const ng = c4Drop(grid, col, 1); if (!ng) return;
    setGrid(ng); setTurn(2);
  };

  useEffect(() => {
    if (turn !== 2 || winner || full) return;
    setThinking(true);
    const t = setTimeout(() => {
      setGrid(prev => {
        if (c4Winner(prev)) return prev;
        const col = c4AIMove(prev, difficulty);
        if (col < 0) return prev;
        return c4Drop(prev, col, 2) ?? prev;
      });
      setTurn(1); setThinking(false);
    }, 650);
    return () => { clearTimeout(t); setThinking(false); };
  }, [turn, winner, full, difficulty]);

  const reset = () => { setGrid(empty()); setTurn(1); setThinking(false); onReset(); };

  return (
    <GameShell
      status={<span>{winner === 1 ? "🎉 You win!" : winner === 2 ? "🤖 Computer wins." : full ? "Draw." : thinking ? "🤖 Computer thinking…" : "Your turn (Red)"}</span>}
      controls={<><DifficultyPicker value={difficulty} onChange={d => { setDifficulty(d); reset(); }} /><GameButton onClick={reset}>New Game</GameButton></>}
    >
      <div className="rounded-xl bg-primary/90 p-2 shadow-md">
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${C4_C}, minmax(0,1fr))` }}>
          {Array.from({ length: C4_C }).map((_, col) => (
            <button
              key={`h${col}`}
              onClick={() => drop(col)}
              disabled={turn !== 1 || !!winner}
              className="col-span-1 h-6 rounded bg-primary/50 text-xs text-primary-foreground hover:bg-primary/70 disabled:opacity-40"
              aria-label={`Drop in column ${col + 1}`}
            >↓</button>
          ))}
          {grid.flatMap((row, r) => row.map((v, c) => (
            <div key={`${r}-${c}`} className="grid h-9 w-9 place-items-center sm:h-10 sm:w-10">
              <div className={`h-8 w-8 rounded-full transition-all duration-500 ${v === 0 ? "bg-background" : v === 1 ? "bg-destructive" : "bg-accent"} shadow-inner sm:h-9 sm:w-9`} />
            </div>
          )))}
        </div>
      </div>
    </GameShell>
  );
}

/* ============================================================== */
/* 3. CHECKERS — vs computer w/ difficulty                         */
/* ============================================================== */

type CkPiece = { p: 1|2; king: boolean } | null;
type CkBoard = CkPiece[][];
type CkMove = { fr: number; fc: number; tr: number; tc: number; caps: [number, number][] };

function ckInit(): CkBoard {
  const b: CkBoard = Array.from({ length: 8 }, () => Array<CkPiece>(8).fill(null));
  for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) if ((r + c) % 2 === 1) b[r][c] = { p: 2, king: false };
  for (let r = 5; r < 8; r++) for (let c = 0; c < 8; c++) if ((r + c) % 2 === 1) b[r][c] = { p: 1, king: false };
  return b;
}
function ckPieceMoves(b: CkBoard, r: number, c: number): CkMove[] {
  const p = b[r][c]; if (!p) return [];
  const dirs = p.king ? [[-1,-1],[-1,1],[1,-1],[1,1]] : p.p === 1 ? [[-1,-1],[-1,1]] : [[1,-1],[1,1]];
  const out: CkMove[] = [];
  for (const [dr, dc] of dirs) {
    const nr = r + dr, nc = c + dc;
    if (nr>=0&&nr<8&&nc>=0&&nc<8 && !b[nr][nc]) out.push({ fr: r, fc: c, tr: nr, tc: nc, caps: [] });
    const jr = r + dr*2, jc = c + dc*2;
    if (jr>=0&&jr<8&&jc>=0&&jc<8 && !b[jr][jc] && b[nr]?.[nc] && b[nr]![nc]!.p !== p.p) {
      out.push({ fr: r, fc: c, tr: jr, tc: jc, caps: [[nr, nc]] });
    }
  }
  return out;
}
function ckAllMoves(b: CkBoard, p: 1|2): CkMove[] {
  const all: CkMove[] = [];
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) if (b[r][c]?.p === p) all.push(...ckPieceMoves(b, r, c));
  const caps = all.filter(m => m.caps.length);
  return caps.length ? caps : all;
}
function ckApply(b: CkBoard, m: CkMove): CkBoard {
  const nb = b.map(row => row.slice());
  const piece = { ...nb[m.fr][m.fc]! };
  nb[m.fr][m.fc] = null;
  m.caps.forEach(([cr, cc]) => nb[cr][cc] = null);
  if ((piece.p === 1 && m.tr === 0) || (piece.p === 2 && m.tr === 7)) piece.king = true;
  nb[m.tr][m.tc] = piece;
  return nb;
}
function ckScore(b: CkBoard, ai: 1|2): number {
  let s = 0;
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
    const p = b[r][c]; if (!p) continue;
    const val = (p.king ? 5 : 3) + (p.p === 1 ? (7 - r) * 0.1 : r * 0.1);
    s += p.p === ai ? val : -val;
  }
  return s;
}
function ckMinimax(b: CkBoard, depth: number, alpha: number, beta: number, turn: 1|2, ai: 1|2): { score: number; move: CkMove | null } {
  const moves = ckAllMoves(b, turn);
  if (depth === 0 || !moves.length) return { score: ckScore(b, ai) - (moves.length ? 0 : (turn === ai ? 1000 : -1000)), move: null };
  const maximizing = turn === ai;
  let best: { score: number; move: CkMove | null } = { score: maximizing ? -Infinity : Infinity, move: moves[0] };
  for (const m of moves) {
    const nb = ckApply(b, m);
    const { score } = ckMinimax(nb, depth - 1, alpha, beta, turn === 1 ? 2 : 1, ai);
    if (maximizing) { if (score > best.score) best = { score, move: m }; alpha = Math.max(alpha, score); }
    else { if (score < best.score) best = { score, move: m }; beta = Math.min(beta, score); }
    if (beta <= alpha) break;
  }
  return best;
}
function ckAIMove(b: CkBoard, diff: Difficulty): CkMove | null {
  const moves = ckAllMoves(b, 2);
  if (!moves.length) return null;
  if (diff === "easy") return moves[Math.floor(Math.random()*moves.length)];
  const depth = diff === "medium" ? 3 : 5;
  return ckMinimax(b, depth, -Infinity, Infinity, 2, 2).move;
}

export function Checkers({ onReset }: { onReset: () => void }) {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [board, setBoard] = useState<CkBoard>(ckInit);
  const [turn, setTurn] = useState<1|2>(1);
  const [sel, setSel] = useState<[number, number] | null>(null);
  const [thinking, setThinking] = useState(false);

  const humanLegal = useMemo(() => turn === 1 ? ckAllMoves(board, 1) : [], [board, turn]);
  const cellMoves = sel ? humanLegal.filter(m => m.fr === sel[0] && m.fc === sel[1]) : [];

  const click = (r: number, c: number) => {
    if (turn !== 1 || thinking) return;
    if (sel) {
      const m = cellMoves.find(m => m.tr === r && m.tc === c);
      if (m) { setBoard(ckApply(board, m)); setSel(null); setTurn(2); return; }
    }
    if (board[r][c]?.p === 1 && humanLegal.some(m => m.fr === r && m.fc === c)) setSel([r, c]);
    else setSel(null);
  };

  useEffect(() => {
    if (turn !== 2) return;
    setThinking(true);
    const t = setTimeout(() => {
      const m = ckAIMove(board, difficulty);
      if (m) setBoard(prev => ckApply(prev, m));
      setTurn(1); setThinking(false);
    }, 700);
    return () => { clearTimeout(t); setThinking(false); };
  }, [turn, board, difficulty]);

  const reset = () => { setBoard(ckInit()); setTurn(1); setSel(null); setThinking(false); onReset(); };
  const p1 = board.flat().filter(v => v?.p === 1).length;
  const p2 = board.flat().filter(v => v?.p === 2).length;
  const winner = p1 === 0 ? 2 : p2 === 0 ? 1 : (turn === 1 && !humanLegal.length ? 2 : null);

  return (
    <GameShell
      status={<span>{winner === 1 ? "🎉 You win!" : winner === 2 ? "🤖 Computer wins." : thinking ? "🤖 Computer thinking…" : `Your turn (Red) — You ${p1} · CPU ${p2}`}</span>}
      controls={<><DifficultyPicker value={difficulty} onChange={d => { setDifficulty(d); reset(); }} /><GameButton onClick={reset}>New Game</GameButton></>}
    >
      <div className="grid grid-cols-8 overflow-hidden rounded-lg border border-border">
        {board.flatMap((row, r) => row.map((cell, c) => {
          const dark = (r + c) % 2 === 1;
          const isSel = sel && sel[0] === r && sel[1] === c;
          const isMove = cellMoves.some(m => m.tr === r && m.tc === c);
          return (
            <button
              key={`${r}-${c}`}
              onClick={() => click(r, c)}
              className={`grid h-9 w-9 place-items-center transition-all duration-300 sm:h-10 sm:w-10 ${dark ? "bg-primary/70" : "bg-secondary"} ${isSel ? "ring-2 ring-accent" : ""} ${isMove ? "ring-2 ring-success" : ""}`}
            >
              {cell && (
                <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold shadow-inner transition-transform duration-300 ${cell.p === 1 ? "bg-destructive text-destructive-foreground" : "bg-foreground text-background"}`}>
                  {cell.king ? "★" : ""}
                </span>
              )}
            </button>
          );
        }))}
      </div>
    </GameShell>
  );
}

/* ============================================================== */
/* 4. SUDOKU — with keyboard input                                 */
/* ============================================================== */

export function Sudoku({ onReset }: { onReset: () => void }) {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [{ puzzle, solution }, setGame] = useState(() => generateSudoku("easy"));
  const [grid, setGrid] = useState<number[]>(() => puzzle.slice());
  const [selected, setSelected] = useState<number | null>(null);
  const solved = grid.every((v, i) => v === solution[i]);

  const newGame = (d: Difficulty) => {
    const g = generateSudoku(d);
    setGame(g); setGrid(g.puzzle.slice()); setSelected(null); setDifficulty(d); onReset();
  };

  const setCell = useCallback((n: number) => {
    setGrid(prev => {
      if (selected === null || puzzle[selected] !== 0) return prev;
      const g = prev.slice(); g[selected] = n; return g;
    });
  }, [selected, puzzle]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (selected === null) return;
      if (/^[1-9]$/.test(e.key)) { e.preventDefault(); setCell(parseInt(e.key, 10)); }
      else if (e.key === "0" || e.key === "Backspace" || e.key === "Delete") { e.preventDefault(); setCell(0); }
      else if (e.key.startsWith("Arrow")) {
        e.preventDefault();
        const r = Math.floor(selected / 9), c = selected % 9;
        let nr = r, nc = c;
        if (e.key === "ArrowUp") nr = Math.max(0, r - 1);
        if (e.key === "ArrowDown") nr = Math.min(8, r + 1);
        if (e.key === "ArrowLeft") nc = Math.max(0, c - 1);
        if (e.key === "ArrowRight") nc = Math.min(8, c + 1);
        setSelected(nr * 9 + nc);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [selected, setCell]);

  return (
    <GameShell
      status={<span>{solved ? "🎉 Solved!" : `Difficulty: ${difficulty} · Click a cell then type 1-9 or use the pad`}</span>}
      controls={
        <>
          <DifficultyPicker value={difficulty} onChange={newGame} />
          <GameButton onClick={() => newGame(difficulty)}>New Game</GameButton>
        </>
      }
    >
      <div className="flex flex-col items-center gap-4">
        <div className="grid grid-cols-9 overflow-hidden rounded-md border-2 border-foreground/70">
          {grid.map((v, i) => {
            const row = Math.floor(i / 9), col = i % 9;
            const given = puzzle[i] !== 0;
            const conflict = v !== 0 && v !== solution[i];
            const selRow = selected !== null ? Math.floor(selected / 9) : -1;
            const selCol = selected !== null ? selected % 9 : -1;
            const highlight = selected !== null && (row === selRow || col === selCol || (Math.floor(row/3) === Math.floor(selRow/3) && Math.floor(col/3) === Math.floor(selCol/3)));
            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`grid h-8 w-8 place-items-center text-sm font-medium sm:h-10 sm:w-10 sm:text-base transition-colors
                  ${(col+1)%3===0 && col!==8 ? "border-r-2 border-r-foreground/70" : "border-r border-r-border"}
                  ${(row+1)%3===0 && row!==8 ? "border-b-2 border-b-foreground/70" : "border-b border-b-border"}
                  ${given ? "bg-secondary text-foreground" : "bg-card text-primary"}
                  ${highlight && selected !== i ? "bg-primary/10" : ""}
                  ${selected === i ? "ring-2 ring-primary ring-inset bg-primary/20" : ""}
                  ${conflict ? "text-destructive" : ""}`}
              >
                {v || ""}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap justify-center gap-1">
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <button key={n} onClick={() => setCell(n)} className="h-9 w-9 rounded-lg bg-primary/10 text-sm font-semibold text-primary hover:bg-primary/20">{n}</button>
          ))}
          <button onClick={() => setCell(0)} className="h-9 w-9 rounded-lg bg-secondary text-sm text-muted-foreground hover:bg-secondary/70">⌫</button>
        </div>
      </div>
    </GameShell>
  );
}

function generateSudoku(diff: Difficulty): { puzzle: number[]; solution: number[] } {
  const base = 3, side = 9;
  const pattern = (r: number, c: number) => (base * (r % base) + Math.floor(r/base) + c) % side;
  const rBase = [0,1,2];
  const rows = shuffle(rBase).flatMap(g => shuffle(rBase).map(r => g*base+r));
  const cols = shuffle(rBase).flatMap(g => shuffle(rBase).map(c => g*base+c));
  const nums = shuffle([1,2,3,4,5,6,7,8,9]);
  const solution: number[] = Array(81).fill(0);
  rows.forEach((r,i)=>cols.forEach((c,j)=>{solution[i*9+j]=nums[pattern(r,c)];}));
  const puzzle = solution.slice();
  const holes = diff === "easy" ? 36 : diff === "medium" ? 46 : 54;
  const idxs = shuffle(Array.from({length:81},(_,i)=>i)).slice(0, holes);
  idxs.forEach(i => puzzle[i] = 0);
  return { puzzle, solution };
}

/* ============================================================== */
/* 5. MEMORY MATCH — 3 difficulties, unique symbols per game       */
/* ============================================================== */

const MEMORY_POOL = ["🍎","🎈","🎲","🎧","🌈","🚀","🐧","🌵","🍇","🎯","🎨","🎸","🌸","⚽","🐙","🦋","🍕","🐳","🌟","🦁","🍓","🎃","🎁","🐢","🍉","🎷","🏀","🐼","🍩","🌻","🐝","🐘","🎡","🚂","🍄","🌍"];

export function MemoryMatch({ onReset }: { onReset: () => void }) {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const configs: Record<Difficulty, { pairs: number; cols: number }> = {
    easy: { pairs: 8, cols: 4 }, medium: { pairs: 12, cols: 4 }, hard: { pairs: 18, cols: 6 },
  };
  const build = (d: Difficulty) => {
    const { pairs } = configs[d];
    const symbols = shuffle(MEMORY_POOL).slice(0, pairs);
    return shuffle([...symbols, ...symbols]).map((s, i) => ({ id: `${Date.now()}-${i}`, s, flipped: false, matched: false }));
  };
  const [cards, setCards] = useState(() => build("easy"));
  const [picks, setPicks] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const won = cards.length > 0 && cards.every(c => c.matched);

  const flip = (i: number) => {
    if (picks.length === 2 || cards[i].flipped || cards[i].matched) return;
    const c = cards.slice(); c[i] = { ...c[i], flipped: true }; setCards(c);
    const p = [...picks, i];
    setPicks(p);
    if (p.length === 2) {
      setMoves(m => m + 1);
      setTimeout(() => {
        setCards(cur => {
          const nx = cur.slice();
          if (nx[p[0]].s === nx[p[1]].s) { nx[p[0]] = {...nx[p[0]], matched: true}; nx[p[1]] = {...nx[p[1]], matched: true}; }
          else { nx[p[0]] = {...nx[p[0]], flipped: false}; nx[p[1]] = {...nx[p[1]], flipped: false}; }
          return nx;
        });
        setPicks([]);
      }, 900);
    }
  };
  const reset = (d: Difficulty = difficulty) => { setDifficulty(d); setCards(build(d)); setPicks([]); setMoves(0); onReset(); };

  const cfg = configs[difficulty];
  return (
    <GameShell
      status={<span>{won ? `🎉 Won in ${moves} moves!` : `Moves: ${moves} · ${cfg.pairs} pairs`}</span>}
      controls={<><DifficultyPicker value={difficulty} onChange={reset} /><GameButton onClick={() => reset(difficulty)}>New Game</GameButton></>}
    >
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cfg.cols}, minmax(0,1fr))` }}>
        {cards.map((c, i) => (
          <button
            key={c.id}
            onClick={() => flip(i)}
            className={`grid h-14 w-14 place-items-center rounded-xl text-2xl shadow-sm transition-all duration-500 sm:h-16 sm:w-16 sm:text-3xl ${c.flipped || c.matched ? "bg-card rotate-0" : "bg-primary text-primary-foreground [transform:rotateY(180deg)]"} ${c.matched ? "opacity-60" : ""}`}
          >
            {(c.flipped || c.matched) ? c.s : ""}
          </button>
        ))}
      </div>
    </GameShell>
  );
}

/* ============================================================== */
/* 6. MINESWEEPER                                                  */
/* ============================================================== */

export function Minesweeper({ onReset }: { onReset: () => void }) {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const cfg: Record<Difficulty, { R: number; C: number; M: number }> = {
    easy: { R: 9, C: 9, M: 10 }, medium: { R: 12, C: 12, M: 24 }, hard: { R: 14, C: 14, M: 40 },
  };
  type Cell = { mine: boolean; open: boolean; flag: boolean; n: number };
  const build = (d: Difficulty): Cell[][] => {
    const { R, C, M } = cfg[d];
    const g: Cell[][] = Array.from({length: R}, () => Array.from({length: C}, () => ({ mine: false, open: false, flag: false, n: 0 })));
    let placed = 0;
    while (placed < M) {
      const r = Math.floor(Math.random()*R), c = Math.floor(Math.random()*C);
      if (!g[r][c].mine) { g[r][c].mine = true; placed++; }
    }
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
      let n = 0;
      for (let dr=-1;dr<=1;dr++) for (let dc=-1;dc<=1;dc++) {
        const nr=r+dr,nc=c+dc; if (nr>=0&&nr<R&&nc>=0&&nc<C&&g[nr][nc].mine) n++;
      }
      g[r][c].n = n;
    }
    return g;
  };
  const [grid, setGrid] = useState<Cell[][]>(() => build("easy"));
  const [dead, setDead] = useState(false);
  const R = grid.length, C = grid[0].length;
  const won = !dead && grid.flat().every(c => c.mine || c.open);

  const reveal = (r: number, c: number) => {
    if (dead || won || grid[r][c].flag || grid[r][c].open) return;
    const g = grid.map(row => row.map(cell => ({...cell})));
    const stack: [number, number][] = [[r,c]];
    while (stack.length) {
      const [x, y] = stack.pop()!;
      if (g[x][y].open || g[x][y].flag) continue;
      g[x][y].open = true;
      if (g[x][y].mine) { setDead(true); g.forEach(row => row.forEach(cc => { if (cc.mine) cc.open = true; })); break; }
      if (g[x][y].n === 0) for (let dr=-1;dr<=1;dr++) for (let dc=-1;dc<=1;dc++) {
        const nr=x+dr,ny=y+dc; if (nr>=0&&nr<R&&ny>=0&&ny<C && !g[nr][ny].open) stack.push([nr,ny]);
      }
    }
    setGrid(g);
  };
  const flag = (r: number, c: number, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (grid[r][c].open) return;
    const g = grid.map(row => row.map(cell => ({...cell})));
    g[r][c].flag = !g[r][c].flag; setGrid(g);
  };
  const reset = (d: Difficulty = difficulty) => { setDifficulty(d); setGrid(build(d)); setDead(false); onReset(); };

  return (
    <GameShell
      status={<span>{dead ? "💥 Boom! You hit a mine." : won ? "🎉 Field cleared!" : `${cfg[difficulty].M} mines · long-press or right-click to flag`}</span>}
      controls={<><DifficultyPicker value={difficulty} onChange={reset} /><GameButton onClick={() => reset(difficulty)}>New Game</GameButton></>}
    >
      <div className="grid" style={{ gridTemplateColumns: `repeat(${C}, minmax(0,1fr))` }}>
        {grid.flatMap((row, r) => row.map((cell, c) => (
          <button
            key={`${r}-${c}`}
            onClick={() => reveal(r, c)}
            onContextMenu={(e) => flag(r, c, e)}
            onTouchStart={(e) => { const t = setTimeout(() => flag(r, c, e), 400); const cancel = () => clearTimeout(t); e.currentTarget.addEventListener("touchend", cancel, { once: true }); }}
            className={`grid h-7 w-7 place-items-center border border-border text-xs font-bold sm:h-8 sm:w-8 sm:text-sm ${cell.open ? "bg-secondary" : "bg-card hover:bg-accent/40"}`}
          >
            {cell.open ? (cell.mine ? "💣" : cell.n || "") : cell.flag ? "🚩" : ""}
          </button>
        )))}
      </div>
    </GameShell>
  );
}

/* ============================================================== */
/* 7. 2048 — smooth animated tiles                                 */
/* ============================================================== */

type Tile2048 = { id: number; v: number; r: number; c: number; isNew?: boolean; merging?: boolean };
let tileIdCounter = 1;

function empties2048(grid: (number | 0)[][], N: number): [number, number][] {
  const out: [number, number][] = [];
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (!grid[r][c]) out.push([r, c]);
  return out;
}
function spawn2048(tiles: Tile2048[], N: number): Tile2048[] {
  const grid: number[][] = Array.from({ length: N }, () => Array(N).fill(0));
  for (const t of tiles) grid[t.r][t.c] = 1;
  const es = empties2048(grid, N);
  if (!es.length) return tiles;
  const [r, c] = es[Math.floor(Math.random() * es.length)];
  return [...tiles, { id: tileIdCounter++, v: Math.random() < 0.9 ? 2 : 4, r, c, isNew: true }];
}

// One pass of the reference slide+merge, but on tile IDs so we can animate.
// Returns per-tile target positions and the merged tile spec.
type MoveResult = {
  moving: Tile2048[];      // every source tile with new r,c (both merge participants share target)
  after: Tile2048[];       // final board after merges resolve (new id for merged tiles)
  changed: boolean;
  gained: number;
};

function move2048(tiles: Tile2048[], dir: "up" | "down" | "left" | "right", N: number): MoveResult {
  const byPos = new Map<string, Tile2048>();
  for (const t of tiles) byPos.set(`${t.r}-${t.c}`, t);

  const vert = dir === "up" || dir === "down";
  const reverse = dir === "down" || dir === "right";

  const moving: Tile2048[] = [];
  const after: Tile2048[] = [];
  let changed = false;
  let gained = 0;

  for (let idx = 0; idx < N; idx++) {
    // gather line tiles in movement order (toward index 0)
    const line: Tile2048[] = [];
    for (let k = 0; k < N; k++) {
      const kk = reverse ? N - 1 - k : k;
      const r = vert ? kk : idx;
      const c = vert ? idx : kk;
      const t = byPos.get(`${r}-${c}`);
      if (t) line.push(t);
    }
    // slide + merge (reference logic), tracking positions
    let write = 0;
    for (let i = 0; i < line.length; i++) {
      const cur = line[i];
      const nxt = line[i + 1];
      const destK = reverse ? N - 1 - write : write;
      const destR = vert ? destK : idx;
      const destC = vert ? idx : destK;
      if (nxt && cur.v === nxt.v) {
        // Both source tiles slide to destination; a new merged tile replaces them.
        moving.push({ ...cur, r: destR, c: destC, isNew: false });
        moving.push({ ...nxt, r: destR, c: destC, isNew: false, merging: true });
        after.push({ id: tileIdCounter++, v: cur.v * 2, r: destR, c: destC, isNew: true });
        gained += cur.v * 2;
        changed = true;
        i++; // critical: skip already-merged partner
      } else {
        if (cur.r !== destR || cur.c !== destC) changed = true;
        const t = { ...cur, r: destR, c: destC, isNew: false };
        moving.push(t);
        after.push(t);
      }
      write++;
    }
  }
  return { moving, after, changed, gained };
}

function canMove2048(tiles: Tile2048[], N: number): boolean {
  const grid: number[][] = Array.from({ length: N }, () => Array(N).fill(0));
  for (const t of tiles) grid[t.r][t.c] = t.v;
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    if (!grid[r][c]) return true;
    if (c < N - 1 && grid[r][c] === grid[r][c + 1]) return true;
    if (r < N - 1 && grid[r][c] === grid[r + 1][c]) return true;
  }
  return false;
}

export function Game2048({ onReset }: { onReset: () => void }) {
  const N = 4;
  const CELL = 72;
  const GAP = 10;
  const init = (): Tile2048[] => spawn2048(spawn2048([], N), N);
  const [tiles, setTiles] = useState<Tile2048[]>(init);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const busy = useRef(false);

  const move = useCallback((dir: "up" | "down" | "left" | "right") => {
    if (busy.current || gameOver) return;
    setTiles(prev => {
      const { moving, after, changed, gained } = move2048(prev, dir, N);
      if (!changed) return prev;
      busy.current = true;
      setScore(s => s + gained);
      // Phase A: animate slide (both merge partners move to same cell)
      setTimeout(() => {
        // Phase B: collapse to final board and spawn exactly one new tile
        setTiles(() => {
          const withNew = spawn2048(after, N);
          if (!canMove2048(withNew, N)) setGameOver(true);
          return withNew;
        });
        busy.current = false;
      }, 170);
      return moving;
    });
  }, [gameOver]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") { e.preventDefault(); move("up"); }
      else if (e.key === "ArrowDown") { e.preventDefault(); move("down"); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); move("left"); }
      else if (e.key === "ArrowRight") { e.preventDefault(); move("right"); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [move]);

  const touch = useRef<{ x: number; y: number } | null>(null);
  const reset = () => { setTiles(init()); setScore(0); setGameOver(false); busy.current = false; onReset(); };

  const tileColor = (v: number) => {
    const map: Record<number, string> = {
      2: "bg-card text-foreground", 4: "bg-secondary text-foreground", 8: "bg-accent/60 text-accent-foreground",
      16: "bg-accent text-accent-foreground", 32: "bg-warning text-warning-foreground",
      64: "bg-destructive/70 text-destructive-foreground", 128: "bg-primary/70 text-primary-foreground",
      256: "bg-primary/80 text-primary-foreground", 512: "bg-primary text-primary-foreground",
      1024: "bg-success/80 text-success-foreground", 2048: "bg-success text-success-foreground",
    };
    return map[v] || "bg-success text-success-foreground";
  };

  const boardSize = N * CELL + (N + 1) * GAP;

  return (
    <GameShell
      status={<span>Score: {score} {gameOver && "· Game over"}</span>}
      controls={<GameButton onClick={reset}>New Game</GameButton>}
    >
      <div
        className="relative rounded-xl bg-muted touch-none"
        style={{ width: boardSize, height: boardSize, padding: GAP }}
        onTouchStart={e => { const t = e.touches[0]; touch.current = { x: t.clientX, y: t.clientY }; }}
        onTouchEnd={e => {
          if (!touch.current) return;
          const t = e.changedTouches[0];
          const dx = t.clientX - touch.current.x, dy = t.clientY - touch.current.y;
          if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) { touch.current = null; return; }
          if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? "right" : "left");
          else move(dy > 0 ? "down" : "up");
          touch.current = null;
        }}
      >
        {Array.from({length: N * N}).map((_, i) => {
          const r = Math.floor(i / N), c = i % N;
          return <div key={i} className="absolute rounded-lg bg-background/40" style={{ width: CELL, height: CELL, top: GAP + r * (CELL + GAP), left: GAP + c * (CELL + GAP) }} />;
        })}
        {tiles.map(t => (
          <div
            key={t.id}
            className={`absolute grid place-items-center rounded-lg text-xl font-bold shadow-sm ${tileColor(t.v)} ${t.isNew ? "animate-[pop_180ms_ease-out]" : ""}`}
            style={{
              width: CELL, height: CELL,
              transform: `translate(${GAP + t.c * (CELL + GAP)}px, ${GAP + t.r * (CELL + GAP)}px)`,
              transition: "transform 160ms ease-in-out",
              zIndex: t.merging ? 1 : 2,
            }}
          >
            {t.v}
          </div>
        ))}
        <style>{`@keyframes pop { 0% { transform: translate(var(--x,0), var(--y,0)) scale(0.4); opacity: 0; } 100% { transform: translate(var(--x,0), var(--y,0)) scale(1); opacity: 1; } }`}</style>
      </div>
    </GameShell>
  );
}

/* ============================================================== */
/* 8. WORD SEARCH                                                  */
/* ============================================================== */

const WS_WORDS = ["APPLE","BANANA","CHERRY","GRAPE","LEMON","MANGO","PEACH","PLUM"];
export function WordSearch({ onReset }: { onReset: () => void }) {
  const N = 10;
  const build = () => {
    const grid: string[][] = Array.from({length: N}, () => Array(N).fill(""));
    const dirs = [[0,1],[1,0],[1,1],[1,-1]];
    const placed: { word: string; cells: [number,number][] }[] = [];
    for (const w of WS_WORDS) {
      for (let tries = 0; tries < 60; tries++) {
        const dir = dirs[Math.floor(Math.random()*dirs.length)];
        const r = Math.floor(Math.random()*N), c = Math.floor(Math.random()*N);
        const er = r + dir[0]*(w.length-1), ec = c + dir[1]*(w.length-1);
        if (er<0||er>=N||ec<0||ec>=N) continue;
        let ok = true;
        for (let i = 0; i < w.length; i++) {
          const nr = r+dir[0]*i, nc = c+dir[1]*i;
          if (grid[nr][nc] && grid[nr][nc] !== w[i]) { ok = false; break; }
        }
        if (ok) {
          const cells: [number,number][] = [];
          for (let i = 0; i < w.length; i++) { const nr = r+dir[0]*i, nc = c+dir[1]*i; grid[nr][nc] = w[i]; cells.push([nr,nc]); }
          placed.push({ word: w, cells }); break;
        }
      }
    }
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (!grid[r][c]) grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random()*26));
    return { grid, placed };
  };
  const [data, setData] = useState(build);
  const [found, setFound] = useState<Set<string>>(new Set());
  const [drag, setDrag] = useState<{ from: [number,number]; to: [number,number] } | null>(null);

  const cellsBetween = (a: [number,number], b: [number,number]): [number,number][] => {
    const dr = Math.sign(b[0]-a[0]), dc = Math.sign(b[1]-a[1]);
    const len = Math.max(Math.abs(b[0]-a[0]), Math.abs(b[1]-a[1])) + 1;
    const straight = (b[0]-a[0] === 0) || (b[1]-a[1] === 0) || Math.abs(b[0]-a[0]) === Math.abs(b[1]-a[1]);
    if (!straight) return [];
    return Array.from({length: len}, (_, i) => [a[0]+dr*i, a[1]+dc*i] as [number,number]);
  };
  const submit = () => {
    if (!drag) return;
    const cs = cellsBetween(drag.from, drag.to);
    const s = cs.map(([r,c]) => data.grid[r]?.[c] || "").join("");
    const rev = s.split("").reverse().join("");
    const w = WS_WORDS.find(w => w === s || w === rev);
    if (w) setFound(f => new Set(f).add(w));
    setDrag(null);
  };
  const reset = () => { setData(build()); setFound(new Set()); setDrag(null); onReset(); };
  const highlight = drag ? new Set(cellsBetween(drag.from, drag.to).map(([r,c]) => `${r}-${c}`)) : new Set();
  const foundCells = new Set(data.placed.filter(p => found.has(p.word)).flatMap(p => p.cells.map(([r,c]) => `${r}-${c}`)));

  return (
    <GameShell
      status={<span>Found {found.size}/{WS_WORDS.length}</span>}
      controls={<GameButton onClick={reset}>New Puzzle</GameButton>}
    >
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
        <div className="grid select-none" style={{ gridTemplateColumns: `repeat(${N}, minmax(0,1fr))` }}>
          {data.grid.flatMap((row, r) => row.map((ch, c) => {
            const k = `${r}-${c}`;
            const hi = highlight.has(k);
            const fnd = foundCells.has(k);
            return (
              <button
                key={k}
                onMouseDown={() => setDrag({ from: [r,c], to: [r,c] })}
                onMouseEnter={() => drag && setDrag({ ...drag, to: [r,c] })}
                onMouseUp={submit}
                onTouchStart={() => setDrag({ from: [r,c], to: [r,c] })}
                onTouchMove={(e) => {
                  const t = e.touches[0];
                  const el = document.elementFromPoint(t.clientX, t.clientY) as HTMLElement | null;
                  const d = el?.dataset?.pos; if (d && drag) { const [nr,nc] = d.split("-").map(Number); setDrag({ ...drag, to: [nr,nc] }); }
                }}
                onTouchEnd={submit}
                data-pos={k}
                className={`grid h-7 w-7 place-items-center border border-border text-xs font-semibold sm:h-8 sm:w-8 sm:text-sm ${fnd ? "bg-success text-success-foreground" : hi ? "bg-primary/40" : "bg-card"}`}
              >{ch}</button>
            );
          }))}
        </div>
        <ul className="grid grid-cols-2 gap-1 text-sm sm:grid-cols-1">
          {WS_WORDS.map(w => (
            <li key={w} className={found.has(w) ? "line-through text-muted-foreground" : "text-foreground"}>{w}</li>
          ))}
        </ul>
      </div>
    </GameShell>
  );
}

/* ============================================================== */
/* 9. HANGMAN — real hanging figure                                */
/* ============================================================== */

const HM_CATEGORIES: Record<string, string[]> = {
  Animals: ["ELEPHANT","GIRAFFE","DOLPHIN","PENGUIN","CHEETAH","KANGAROO","OCTOPUS","BUTTERFLY","RHINOCEROS","CROCODILE","SQUIRREL","HEDGEHOG"],
  Countries: ["BRAZIL","JAPAN","CANADA","GERMANY","AUSTRALIA","NORWAY","EGYPT","THAILAND","ARGENTINA","PORTUGAL","VIETNAM","MOROCCO"],
  Food: ["PIZZA","BURGER","SUSHI","PANCAKE","CHOCOLATE","STRAWBERRY","NOODLES","AVOCADO","LASAGNA","CROISSANT","DUMPLING","OMELETTE"],
};

function HangmanFigure({ wrong }: { wrong: number }) {
  return (
    <svg viewBox="0 0 120 160" className="h-40 w-32">
      {/* gallows */}
      <line x1="10" y1="150" x2="80" y2="150" stroke="currentColor" strokeWidth="3" />
      <line x1="30" y1="150" x2="30" y2="10" stroke="currentColor" strokeWidth="3" />
      <line x1="30" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="3" />
      <line x1="80" y1="10" x2="80" y2="30" stroke="currentColor" strokeWidth="3" />
      {/* head */}
      {wrong >= 1 && <circle cx="80" cy="42" r="12" fill="none" stroke="currentColor" strokeWidth="3" />}
      {/* body */}
      {wrong >= 2 && <line x1="80" y1="54" x2="80" y2="95" stroke="currentColor" strokeWidth="3" />}
      {/* arms */}
      {wrong >= 3 && <line x1="80" y1="65" x2="65" y2="80" stroke="currentColor" strokeWidth="3" />}
      {wrong >= 4 && <line x1="80" y1="65" x2="95" y2="80" stroke="currentColor" strokeWidth="3" />}
      {/* legs */}
      {wrong >= 5 && <line x1="80" y1="95" x2="68" y2="115" stroke="currentColor" strokeWidth="3" />}
      {wrong >= 6 && (
        <>
          <line x1="80" y1="95" x2="92" y2="115" stroke="currentColor" strokeWidth="3" />
          {/* face — dead */}
          <line x1="76" y1="40" x2="80" y2="44" stroke="currentColor" strokeWidth="2" />
          <line x1="80" y1="40" x2="76" y2="44" stroke="currentColor" strokeWidth="2" />
          <line x1="82" y1="40" x2="86" y2="44" stroke="currentColor" strokeWidth="2" />
          <line x1="86" y1="40" x2="82" y2="44" stroke="currentColor" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}

export function Hangman({ onReset }: { onReset: () => void }) {
  const [category, setCategory] = useState<keyof typeof HM_CATEGORIES>("Animals");
  const pickWord = (c: keyof typeof HM_CATEGORIES) => HM_CATEGORIES[c][Math.floor(Math.random()*HM_CATEGORIES[c].length)];
  const [word, setWord] = useState(() => pickWord("Animals"));
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const wrong = [...guessed].filter(l => !word.includes(l)).length;
  const won = [...word].every(l => guessed.has(l));
  const lost = wrong >= 6;

  const guess = (l: string) => { if (won || lost) return; setGuessed(g => new Set(g).add(l)); };
  const reset = (c: keyof typeof HM_CATEGORIES = category) => { setCategory(c); setWord(pickWord(c)); setGuessed(new Set()); onReset(); };

  return (
    <GameShell
      status={<span>{won ? "🎉 You saved him!" : lost ? `☠️ Out of tries. Word: ${word}` : `Category: ${category} · Wrong: ${wrong}/6`}</span>}
      controls={
        <>
          {(Object.keys(HM_CATEGORIES) as (keyof typeof HM_CATEGORIES)[]).map(c => (
            <GameButton key={c} onClick={() => reset(c)} variant={c === category ? "primary" : "ghost"}>{c}</GameButton>
          ))}
        </>
      }
    >
      <div className="flex flex-col items-center gap-4">
        <div className="text-foreground"><HangmanFigure wrong={wrong} /></div>
        <div className="flex flex-wrap justify-center gap-2 text-2xl font-mono tracking-widest">
          {[...word].map((l, i) => (
            <span key={i} className="border-b-2 border-foreground/70 px-1">{guessed.has(l) || lost ? l : "_"}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 sm:grid-cols-9">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l => {
            const used = guessed.has(l);
            const correct = used && word.includes(l);
            return (
              <button key={l} disabled={used || won || lost} onClick={() => guess(l)}
                className={`h-9 w-9 rounded-md text-sm font-bold transition-colors ${used ? (correct ? "bg-success text-success-foreground" : "bg-destructive/60 text-destructive-foreground") : "bg-secondary hover:bg-primary hover:text-primary-foreground"}`}>
                {l}
              </button>
            );
          })}
        </div>
      </div>
    </GameShell>
  );
}

/* ============================================================== */
/* 10. SIMON SAYS — 3 difficulties                                  */
/* ============================================================== */

export function SimonSays({ onReset }: { onReset: () => void }) {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const speeds: Record<Difficulty, { flash: number; gap: number }> = {
    easy: { flash: 650, gap: 400 }, medium: { flash: 450, gap: 250 }, hard: { flash: 280, gap: 150 },
  };
  const colors = ["green","red","yellow","blue"] as const;
  type Color = typeof colors[number];
  const [seq, setSeq] = useState<Color[]>([]);
  const [userIdx, setUserIdx] = useState(0);
  const [playing, setPlaying] = useState<Color | null>(null);
  const [status, setStatus] = useState<"idle"|"showing"|"input"|"over">("idle");
  const [score, setScore] = useState(0);

  const playSeq = useCallback(async (s: Color[]) => {
    setStatus("showing");
    const sp = speeds[difficulty];
    for (const c of s) {
      await new Promise(r => setTimeout(r, sp.gap));
      setPlaying(c); await new Promise(r => setTimeout(r, sp.flash)); setPlaying(null);
    }
    setStatus("input"); setUserIdx(0);
  }, [difficulty]);

  const next = useCallback((cur: Color[]) => {
    const s = [...cur, colors[Math.floor(Math.random()*4)]];
    setSeq(s); setScore(s.length - 1); playSeq(s);
  }, [playSeq]);

  const tap = (c: Color) => {
    if (status !== "input") return;
    setPlaying(c); setTimeout(() => setPlaying(null), 180);
    if (seq[userIdx] === c) {
      if (userIdx + 1 === seq.length) setTimeout(() => next(seq), 500);
      else setUserIdx(userIdx + 1);
    } else { setStatus("over"); }
  };

  const start = () => { setSeq([]); setUserIdx(0); setScore(0); setStatus("idle"); setTimeout(() => { const s: Color[] = [colors[Math.floor(Math.random()*4)]]; setSeq(s); playSeq(s); }, 200); onReset(); };

  const cls: Record<Color, string> = { green: "bg-success", red: "bg-destructive", yellow: "bg-warning", blue: "bg-primary" };

  return (
    <GameShell
      status={<span>{status === "over" ? `Game over — score: ${score}` : status === "showing" ? "Watch..." : status === "input" ? `Repeat (${userIdx}/${seq.length})` : "Press Start"}</span>}
      controls={<><DifficultyPicker value={difficulty} onChange={d => { setDifficulty(d); setStatus("idle"); setSeq([]); }} disabled={status === "showing" || status === "input"} /><GameButton onClick={start}>{status === "over" || status === "idle" ? "Start" : "Restart"}</GameButton></>}
    >
      <div className="grid grid-cols-2 gap-3">
        {colors.map(c => (
          <button
            key={c}
            onClick={() => tap(c)}
            className={`h-24 w-24 rounded-2xl shadow-md transition-all duration-200 sm:h-32 sm:w-32 ${cls[c]} ${playing === c ? "brightness-150 scale-105" : "brightness-75"}`}
            aria-label={c}
          />
        ))}
      </div>
    </GameShell>
  );
}

/* ============================================================== */
/* 11. WHACK-A-MOLE — 3 difficulties                                */
/* ============================================================== */

export function WhackAMole({ onReset }: { onReset: () => void }) {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const cfg: Record<Difficulty, { showMs: number; gapMs: number; duration: number }> = {
    easy: { showMs: 1100, gapMs: 500, duration: 45 },
    medium: { showMs: 750, gapMs: 300, duration: 45 },
    hard: { showMs: 500, gapMs: 200, duration: 30 },
  };
  const [active, setActive] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const moleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleMole = useCallback(() => {
    const { showMs, gapMs } = cfg[difficulty];
    moleRef.current = setTimeout(() => {
      setActive(Math.floor(Math.random()*9));
      moleRef.current = setTimeout(() => { setActive(null); scheduleMole(); }, showMs);
    }, gapMs);
  }, [difficulty]);

  useEffect(() => {
    if (!running) return;
    const dur = cfg[difficulty].duration;
    tickRef.current = setInterval(() => setTime(t => {
      if (t >= dur) { setRunning(false); setActive(null); return t; }
      return t + 1;
    }), 1000);
    scheduleMole();
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
      if (moleRef.current) clearTimeout(moleRef.current);
    };
  }, [running, scheduleMole, difficulty]);

  const start = () => { setScore(0); setTime(0); setActive(null); setRunning(true); onReset(); };
  const whack = (i: number) => { if (i === active) { setScore(s => s + 1); setActive(null); } };
  const timeLeft = Math.max(0, cfg[difficulty].duration - time);

  return (
    <GameShell
      status={<span>Score: {score} · Time left: {timeLeft}s</span>}
      controls={<><DifficultyPicker value={difficulty} onChange={d => { setDifficulty(d); setRunning(false); setActive(null); setTime(0); setScore(0); }} disabled={running} /><GameButton onClick={start}>{running ? "Restart" : "Start"}</GameButton></>}
    >
      <div className="grid grid-cols-3 gap-3">
        {Array.from({length: 9}).map((_, i) => (
          <button
            key={i}
            onClick={() => whack(i)}
            className="grid h-20 w-20 place-items-center rounded-full bg-primary/20 text-4xl shadow-inner transition-transform duration-150 active:scale-90 sm:h-24 sm:w-24"
          >
            <span className={`transition-transform duration-200 ${active === i ? "scale-100" : "scale-0"}`}>🐹</span>
            {active !== i && "🕳️"}
          </button>
        ))}
      </div>
    </GameShell>
  );
}

/* ============================================================== */
/* 12. SNAKE                                                       */
/* ============================================================== */

export function Snake({ onReset }: { onReset: () => void }) {
  const N = 15;
  type Point = { x: number; y: number };
  const [snake, setSnake] = useState<Point[]>([{ x: 7, y: 7 }]);
  const [dir, setDir] = useState<Point>({ x: 1, y: 0 });
  const dirRef = useRef(dir);
  useEffect(() => { dirRef.current = dir; }, [dir]);
  const [food, setFood] = useState<Point>({ x: 3, y: 3 });
  const [alive, setAlive] = useState(true);
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!alive || paused) return;
    const speed = Math.max(80, 200 - score * 5);
    const t = setInterval(() => {
      setSnake(prev => {
        const head = { x: prev[0].x + dirRef.current.x, y: prev[0].y + dirRef.current.y };
        if (head.x < 0 || head.x >= N || head.y < 0 || head.y >= N || prev.some(p => p.x === head.x && p.y === head.y)) { setAlive(false); return prev; }
        const grew = head.x === food.x && head.y === food.y;
        const next = [head, ...prev];
        if (!grew) next.pop(); else {
          setScore(s => s + 1);
          let f: Point; do { f = { x: Math.floor(Math.random()*N), y: Math.floor(Math.random()*N) }; } while (next.some(p => p.x === f.x && p.y === f.y));
          setFood(f);
        }
        return next;
      });
    }, speed);
    return () => clearInterval(t);
  }, [alive, paused, food, score]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const d = dirRef.current;
      if (e.key === "ArrowUp" && d.y !== 1) setDir({ x: 0, y: -1 });
      else if (e.key === "ArrowDown" && d.y !== -1) setDir({ x: 0, y: 1 });
      else if (e.key === "ArrowLeft" && d.x !== 1) setDir({ x: -1, y: 0 });
      else if (e.key === "ArrowRight" && d.x !== -1) setDir({ x: 1, y: 0 });
      else if (e.key === " ") { e.preventDefault(); setPaused(p => !p); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const touch = useRef<{x: number; y: number} | null>(null);
  const reset = () => { setSnake([{ x: 7, y: 7 }]); setDir({ x: 1, y: 0 }); setFood({ x: 3, y: 3 }); setAlive(true); setScore(0); setPaused(false); onReset(); };

  return (
    <GameShell
      status={<span>Score: {score} {!alive && "· Game over"}</span>}
      controls={<><GameButton onClick={reset}>New Game</GameButton><GameButton onClick={() => setPaused(p => !p)} variant="ghost">{paused ? "Resume" : "Pause"}</GameButton></>}
    >
      <div
        className="grid gap-px bg-border p-1 touch-none rounded-lg"
        style={{ gridTemplateColumns: `repeat(${N}, minmax(0,1fr))` }}
        onTouchStart={e => { const t = e.touches[0]; touch.current = { x: t.clientX, y: t.clientY }; }}
        onTouchEnd={e => {
          if (!touch.current) return;
          const t = e.changedTouches[0]; const dx = t.clientX - touch.current.x, dy = t.clientY - touch.current.y; const d = dirRef.current;
          if (Math.abs(dx) > Math.abs(dy)) { if (dx > 0 && d.x !== -1) setDir({x:1,y:0}); else if (dx < 0 && d.x !== 1) setDir({x:-1,y:0}); }
          else { if (dy > 0 && d.y !== -1) setDir({x:0,y:1}); else if (dy < 0 && d.y !== 1) setDir({x:0,y:-1}); }
          touch.current = null;
        }}
      >
        {Array.from({length: N*N}).map((_, i) => {
          const x = i % N, y = Math.floor(i / N);
          const isSnake = snake.some(p => p.x === x && p.y === y);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isFood = food.x === x && food.y === y;
          return <div key={i} className={`h-5 w-5 sm:h-6 sm:w-6 ${isHead ? "bg-primary" : isSnake ? "bg-primary/70" : isFood ? "bg-accent" : "bg-card"}`} />;
        })}
      </div>
    </GameShell>
  );
}

/* ============================================================== */
/* 13. REVERSI — vs computer + rules                                */
/* ============================================================== */

type RCell = 0 | 1 | 2;
const R_DIRS: [number,number][] = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

function rvFlips(b: RCell[][], r: number, c: number, p: 1|2): [number,number][] {
  if (b[r][c] !== 0) return [];
  const opp = p === 1 ? 2 : 1;
  const out: [number,number][] = [];
  for (const [dr,dc] of R_DIRS) {
    const line: [number,number][] = [];
    let nr = r+dr, nc = c+dc;
    while (nr>=0&&nr<8&&nc>=0&&nc<8 && b[nr][nc] === opp) { line.push([nr,nc]); nr+=dr; nc+=dc; }
    if (line.length && nr>=0&&nr<8&&nc>=0&&nc<8 && b[nr][nc] === p) out.push(...line);
  }
  return out;
}
function rvLegalMoves(b: RCell[][], p: 1|2): [number,number][] {
  const out: [number,number][] = [];
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) if (rvFlips(b, r, c, p).length) out.push([r, c]);
  return out;
}
function rvApply(b: RCell[][], r: number, c: number, p: 1|2): RCell[][] {
  const nb = b.map(row => row.slice());
  nb[r][c] = p;
  for (const [fr, fc] of rvFlips(b, r, c, p)) nb[fr][fc] = p;
  return nb;
}
const RV_WEIGHTS = [
  [100,-20,10,5,5,10,-20,100],
  [-20,-50,-2,-2,-2,-2,-50,-20],
  [10,-2,1,1,1,1,-2,10],
  [5,-2,1,1,1,1,-2,5],
  [5,-2,1,1,1,1,-2,5],
  [10,-2,1,1,1,1,-2,10],
  [-20,-50,-2,-2,-2,-2,-50,-20],
  [100,-20,10,5,5,10,-20,100],
];
function rvAIMove(b: RCell[][], diff: Difficulty): [number,number] | null {
  const moves = rvLegalMoves(b, 2);
  if (!moves.length) return null;
  if (diff === "easy") return moves[Math.floor(Math.random()*moves.length)];
  if (diff === "medium") {
    let best = moves[0], bestScore = -Infinity;
    for (const [r, c] of moves) { const s = rvFlips(b, r, c, 2).length + RV_WEIGHTS[r][c]; if (s > bestScore) { bestScore = s; best = [r, c]; } }
    return best;
  }
  // hard: 3-ply minimax on positional score
  const score = (bd: RCell[][]) => {
    let s = 0;
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
      if (bd[r][c] === 2) s += RV_WEIGHTS[r][c];
      else if (bd[r][c] === 1) s -= RV_WEIGHTS[r][c];
    }
    return s;
  };
  const mm = (bd: RCell[][], depth: number, turn: 1|2, alpha: number, beta: number): { s: number; m: [number,number] | null } => {
    const mvs = rvLegalMoves(bd, turn);
    if (depth === 0 || !mvs.length) return { s: score(bd), m: null };
    const max = turn === 2;
    let best: { s: number; m: [number,number] | null } = { s: max ? -Infinity : Infinity, m: mvs[0] };
    for (const [r, c] of mvs) {
      const nb = rvApply(bd, r, c, turn);
      const { s } = mm(nb, depth - 1, turn === 1 ? 2 : 1, alpha, beta);
      if (max ? s > best.s : s < best.s) best = { s, m: [r, c] };
      if (max) alpha = Math.max(alpha, s); else beta = Math.min(beta, s);
      if (beta <= alpha) break;
    }
    return best;
  };
  return mm(b, 3, 2, -Infinity, Infinity).m;
}

export function Reversi({ onReset }: { onReset: () => void }) {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const init = (): RCell[][] => { const b: RCell[][] = Array.from({length: 8}, () => Array<RCell>(8).fill(0)); b[3][3]=2; b[3][4]=1; b[4][3]=1; b[4][4]=2; return b; };
  const [board, setBoard] = useState<RCell[][]>(init);
  const [turn, setTurn] = useState<1|2>(1);
  const [thinking, setThinking] = useState(false);

  const legal = useMemo(() => rvLegalMoves(board, turn), [board, turn]);

  const play = (r: number, c: number) => {
    if (turn !== 1 || thinking) return;
    if (!rvFlips(board, r, c, 1).length) return;
    setBoard(rvApply(board, r, c, 1));
    setTurn(2);
  };

  useEffect(() => {
    if (turn !== 2) return;
    // if AI has no move but human has, pass
    if (!rvLegalMoves(board, 2).length) {
      if (rvLegalMoves(board, 1).length) setTurn(1);
      return;
    }
    setThinking(true);
    const t = setTimeout(() => {
      const m = rvAIMove(board, difficulty);
      if (m) setBoard(prev => rvApply(prev, m[0], m[1], 2));
      // give turn back to human if they have a move; else back to AI (both pass = end)
      setTurn(prev => {
        void prev;
        return 1;
      });
      setThinking(false);
    }, 700);
    return () => { clearTimeout(t); setThinking(false); };
  }, [turn, board, difficulty]);

  // handle case: after AI, human has no moves → pass back
  useEffect(() => {
    if (turn === 1 && !rvLegalMoves(board, 1).length && rvLegalMoves(board, 2).length) {
      setTurn(2);
    }
  }, [turn, board]);

  const reset = () => { setBoard(init()); setTurn(1); setThinking(false); onReset(); };
  const p1 = board.flat().filter(v => v === 1).length;
  const p2 = board.flat().filter(v => v === 2).length;
  const noMoves = !rvLegalMoves(board, 1).length && !rvLegalMoves(board, 2).length;
  const gameOver = noMoves || (p1 + p2 === 64);

  return (
    <GameShell
      status={<span>{gameOver ? (p1 > p2 ? "🎉 You win!" : p1 < p2 ? "🤖 Computer wins." : "Draw") : thinking ? "🤖 Computer thinking…" : "Your turn (Black)"} — You {p1} · CPU {p2}</span>}
      controls={<><DifficultyPicker value={difficulty} onChange={d => { setDifficulty(d); reset(); }} /><GameButton onClick={reset}>New Game</GameButton></>}
      extra={
        <details className="max-w-md rounded-lg border border-border bg-card/50 p-3 text-xs text-muted-foreground">
          <summary className="cursor-pointer font-semibold text-foreground">Rules of Reversi (Othello)</summary>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>You play Black, the computer plays White. Black moves first.</li>
            <li>A move must outflank at least one opposing disc between your new disc and another of yours (in any direction: row, column, diagonal).</li>
            <li>All outflanked discs flip to your color.</li>
            <li>If you have no legal move, your turn is passed automatically.</li>
            <li>Game ends when neither player can move. Most discs wins.</li>
          </ul>
        </details>
      }
    >
      <div className="grid grid-cols-8 rounded-lg bg-success/40 p-1">
        {board.flatMap((row, r) => row.map((v, c) => {
          const isLegal = turn === 1 && legal.some(([lr, lc]) => lr === r && lc === c);
          return (
            <button
              key={`${r}-${c}`}
              onClick={() => play(r, c)}
              className={`grid h-9 w-9 place-items-center border border-success/60 bg-success/30 sm:h-10 sm:w-10 ${isLegal ? "hover:bg-success/50" : ""}`}
            >
              {v !== 0 ? <div className={`h-7 w-7 rounded-full transition-all duration-300 ${v === 1 ? "bg-foreground" : "bg-background"} shadow-md`} /> : isLegal ? <div className="h-2 w-2 rounded-full bg-foreground/40" /> : null}
            </button>
          );
        }))}
      </div>
    </GameShell>
  );
}

/* ============================================================== */
/* 14. ROCK PAPER SCISSORS                                         */
/* ============================================================== */

export function RockPaperScissors({ onReset }: { onReset: () => void }) {
  const opts = ["✊","✋","✌️"] as const;
  const names = ["Rock","Paper","Scissors"];
  const [you, setYou] = useState<number | null>(null);
  const [cpu, setCpu] = useState<number | null>(null);
  const [result, setResult] = useState<string>("Pick a move");
  const [scoreYou, setScoreYou] = useState(0);
  const [scoreCpu, setScoreCpu] = useState(0);

  const matchOver = scoreYou >= 3 || scoreCpu >= 3;

  const play = (i: number) => {
    if (matchOver) return;
    const c = Math.floor(Math.random()*3);
    setYou(i); setCpu(c);
    if (i === c) setResult("Draw");
    else if ((i === 0 && c === 2) || (i === 1 && c === 0) || (i === 2 && c === 1)) { setResult(`You win: ${names[i]} beats ${names[c]}`); setScoreYou(s => s + 1); }
    else { setResult(`CPU wins: ${names[c]} beats ${names[i]}`); setScoreCpu(s => s + 1); }
  };
  const reset = () => { setYou(null); setCpu(null); setResult("Pick a move"); setScoreYou(0); setScoreCpu(0); onReset(); };

  return (
    <GameShell
      status={<span>You {scoreYou} · CPU {scoreCpu} — {matchOver ? (scoreYou > scoreCpu ? "🏆 You won the match!" : "CPU took the match.") : result}</span>}
      controls={<GameButton onClick={reset}>New Match</GameButton>}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-6 text-6xl">
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-secondary">{you !== null ? opts[you] : "?"}</div>
          <span className="text-2xl text-muted-foreground">vs</span>
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-secondary">{cpu !== null ? opts[cpu] : "?"}</div>
        </div>
        <div className="flex gap-2">
          {opts.map((o, i) => (
            <button key={i} onClick={() => play(i)} className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-3xl text-primary-foreground shadow-md hover:bg-primary/90 sm:h-20 sm:w-20 sm:text-4xl" aria-label={names[i]}>{o}</button>
          ))}
        </div>
      </div>
    </GameShell>
  );
}

/* ============================================================== */
/* 15. SLIDING PUZZLE — 3 difficulties                              */
/* ============================================================== */

export function SlidingPuzzle({ onReset }: { onReset: () => void }) {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const N = difficulty === "easy" ? 3 : difficulty === "medium" ? 4 : 5;
  const solved = useMemo(() => Array.from({length: N*N}, (_, i) => (i + 1) % (N*N)), [N]);
  const isSolvable = (arr: number[]) => {
    let inv = 0;
    for (let i = 0; i < arr.length; i++) for (let j = i+1; j < arr.length; j++) if (arr[i] && arr[j] && arr[i] > arr[j]) inv++;
    const blankRow = N - Math.floor(arr.indexOf(0) / N);
    return N % 2 === 1 ? inv % 2 === 0 : (inv + blankRow) % 2 === 1;
  };
  const doShuffle = useCallback((): number[] => {
    let a: number[];
    do { a = solved.slice(); for (let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} } while (!isSolvable(a) || a.every((v,i) => v === solved[i]));
    return a;
  }, [solved, N]);
  const [tiles, setTiles] = useState<number[]>(() => doShuffle());
  const [moves, setMoves] = useState(0);
  const won = tiles.every((v, i) => v === solved[i]);

  const slide = (i: number) => {
    if (won) return;
    const empty = tiles.indexOf(0);
    const dr = Math.abs(Math.floor(i/N) - Math.floor(empty/N));
    const dc = Math.abs((i%N) - (empty%N));
    if (dr + dc !== 1) return;
    const t = tiles.slice(); [t[i], t[empty]] = [t[empty], t[i]]; setTiles(t); setMoves(m => m + 1);
  };
  const reset = (d: Difficulty = difficulty) => {
    setDifficulty(d);
    const NN = d === "easy" ? 3 : d === "medium" ? 4 : 5;
    const sv = Array.from({length: NN*NN}, (_, i) => (i + 1) % (NN*NN));
    let a: number[];
    const solvable = (arr: number[]) => {
      let inv = 0; for (let i = 0; i < arr.length; i++) for (let j = i+1; j < arr.length; j++) if (arr[i] && arr[j] && arr[i] > arr[j]) inv++;
      const blankRow = NN - Math.floor(arr.indexOf(0) / NN);
      return NN % 2 === 1 ? inv % 2 === 0 : (inv + blankRow) % 2 === 1;
    };
    do { a = sv.slice(); for (let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} } while (!solvable(a) || a.every((v,i) => v === sv[i]));
    setTiles(a); setMoves(0); onReset();
  };

  const size = N === 3 ? "h-20 w-20 text-3xl sm:h-24 sm:w-24" : N === 4 ? "h-14 w-14 text-xl sm:h-16 sm:w-16 sm:text-2xl" : "h-11 w-11 text-base sm:h-14 sm:w-14 sm:text-lg";

  return (
    <GameShell
      status={<span>{won ? `🎉 Solved in ${moves} moves!` : `Moves: ${moves} · ${N}×${N}`}</span>}
      controls={<><DifficultyPicker value={difficulty} onChange={reset} /><GameButton onClick={() => reset(difficulty)}>New Puzzle</GameButton></>}
    >
      <div className="grid gap-2 rounded-xl bg-muted p-2" style={{ gridTemplateColumns: `repeat(${N}, minmax(0,1fr))` }}>
        {tiles.map((v, i) => (
          <button
            key={i}
            onClick={() => slide(i)}
            className={`grid place-items-center rounded-lg font-bold shadow-sm transition-all duration-200 ${size} ${v === 0 ? "bg-transparent" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
          >
            {v || ""}
          </button>
        ))}
      </div>
    </GameShell>
  );
}

/* ============================================================== */
/* 16. MASTERMIND — 3 difficulties + 1 hint                         */
/* ============================================================== */

export function Mastermind({ onReset }: { onReset: () => void }) {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const cfg: Record<Difficulty, { pegs: number; colors: number; guesses: number }> = {
    easy: { pegs: 4, colors: 5, guesses: 12 },
    medium: { pegs: 4, colors: 6, guesses: 10 },
    hard: { pegs: 5, colors: 7, guesses: 10 },
  };
  const allColors = ["red","blue","green","yellow","purple","orange","cyan"] as const;
  const clsMap: Record<string, string> = { red: "bg-destructive", blue: "bg-primary", green: "bg-success", yellow: "bg-warning", purple: "bg-chart-5", orange: "bg-accent", cyan: "bg-chart-3" };
  const active = allColors.slice(0, cfg[difficulty].colors);
  const [code, setCode] = useState<string[]>(() => Array.from({length: cfg["medium"].pegs}, () => allColors[Math.floor(Math.random()*cfg["medium"].colors)]));
  const [current, setCurrent] = useState<(string|null)[]>(() => Array(cfg["medium"].pegs).fill(null));
  const [guesses, setGuesses] = useState<{ guess: string[]; black: number; white: number }[]>([]);
  const [pos, setPos] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [hintReveal, setHintReveal] = useState<{ idx: number; color: string } | null>(null);
  const won = guesses.length > 0 && guesses[guesses.length-1].black === cfg[difficulty].pegs;
  const lost = guesses.length >= cfg[difficulty].guesses && !won;

  const newGame = (d: Difficulty = difficulty) => {
    setDifficulty(d);
    const c = cfg[d];
    setCode(Array.from({length: c.pegs}, () => allColors[Math.floor(Math.random()*c.colors)]));
    setCurrent(Array(c.pegs).fill(null));
    setGuesses([]); setPos(0); setHintUsed(false); setHintReveal(null); onReset();
  };

  const setColor = (color: string) => {
    if (won || lost) return;
    const c = current.slice(); c[pos] = color; setCurrent(c);
    setPos(Math.min(cfg[difficulty].pegs - 1, pos + 1));
  };
  const submit = () => {
    if (current.some(c => !c) || won || lost) return;
    const g = current as string[];
    let black = 0; const codeRem: string[] = []; const guessRem: string[] = [];
    for (let i = 0; i < g.length; i++) if (g[i] === code[i]) black++; else { codeRem.push(code[i]); guessRem.push(g[i]); }
    let white = 0;
    for (const gg of guessRem) { const idx = codeRem.indexOf(gg); if (idx >= 0) { white++; codeRem.splice(idx, 1); } }
    setGuesses(gs => [...gs, { guess: g.slice(), black, white }]);
    setCurrent(Array(cfg[difficulty].pegs).fill(null)); setPos(0);
  };
  const hint = () => {
    if (hintUsed || won || lost) return;
    const idx = Math.floor(Math.random() * code.length);
    setHintReveal({ idx, color: code[idx] });
    setHintUsed(true);
  };

  const Peg = ({ c }: { c: string | null }) => <div className={`h-6 w-6 rounded-full border border-border ${c ? clsMap[c] : "bg-card"}`} />;

  return (
    <GameShell
      status={<span>{won ? "🎉 You cracked the code!" : lost ? `Out of guesses — code: ${code.join(", ")}` : `Guess ${guesses.length + 1}/${cfg[difficulty].guesses}${hintReveal ? ` · Hint: peg #${hintReveal.idx + 1} is ${hintReveal.color}` : ""}`}</span>}
      controls={
        <>
          <DifficultyPicker value={difficulty} onChange={newGame} />
          <GameButton onClick={submit}>Submit</GameButton>
          <GameButton onClick={hint} variant="accent" disabled={hintUsed || won || lost}>{hintUsed ? "Hint used" : "Hint (1)"}</GameButton>
          <GameButton onClick={() => newGame(difficulty)} variant="ghost">New Game</GameButton>
        </>
      }
    >
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col gap-1">
          {guesses.map((g, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg bg-secondary/50 p-1">
              {g.guess.map((c, j) => <Peg key={j} c={c} />)}
              <span className="ml-2 text-xs text-muted-foreground">● {g.black} ○ {g.white}</span>
            </div>
          ))}
          {!won && !lost && (
            <div className="flex items-center gap-2 rounded-lg bg-primary/10 p-1">
              {current.map((c, j) => (
                <button key={j} onClick={() => setPos(j)} className={`rounded-full ${pos === j ? "ring-2 ring-primary" : ""}`}><Peg c={c} /></button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {active.map(c => (
            <button key={c} onClick={() => setColor(c)} className={`h-8 w-8 rounded-full shadow-sm ${clsMap[c]}`} aria-label={c} />
          ))}
        </div>
      </div>
    </GameShell>
  );
}

/* ============================================================== */
/* 17. DOTS AND BOXES — vs computer                                 */
/* ============================================================== */

type DbState = { h: boolean[][]; v: boolean[][]; boxes: (0|1|2)[][] };
const DB_N = 5;

function dbBoxSides(s: DbState, br: number, bc: number): number {
  let n = 0;
  if (s.h[br][bc]) n++;
  if (s.h[br+1][bc]) n++;
  if (s.v[br][bc]) n++;
  if (s.v[br][bc+1]) n++;
  return n;
}
function dbApply(s: DbState, kind: "h"|"v", r: number, c: number, p: 1|2): { state: DbState; claimed: boolean } {
  const nh = s.h.map(row => row.slice());
  const nv = s.v.map(row => row.slice());
  const nb = s.boxes.map(row => row.slice()) as (0|1|2)[][];
  if (kind === "h") nh[r][c] = true; else nv[r][c] = true;
  let claimed = false;
  for (let br = 0; br < DB_N; br++) for (let bc = 0; bc < DB_N; bc++) {
    if (nb[br][bc] === 0 && nh[br][bc] && nh[br+1][bc] && nv[br][bc] && nv[br][bc+1]) { nb[br][bc] = p; claimed = true; }
  }
  return { state: { h: nh, v: nv, boxes: nb }, claimed };
}
function dbAllMoves(s: DbState): { kind: "h"|"v"; r: number; c: number }[] {
  const out: { kind: "h"|"v"; r: number; c: number }[] = [];
  for (let r = 0; r <= DB_N; r++) for (let c = 0; c < DB_N; c++) if (!s.h[r][c]) out.push({ kind: "h", r, c });
  for (let r = 0; r < DB_N; r++) for (let c = 0; c <= DB_N; c++) if (!s.v[r][c]) out.push({ kind: "v", r, c });
  return out;
}
function dbAIMove(s: DbState, diff: Difficulty): { kind: "h"|"v"; r: number; c: number } | null {
  const moves = dbAllMoves(s);
  if (!moves.length) return null;
  if (diff === "easy") return moves[Math.floor(Math.random()*moves.length)];
  // score each move
  const scored = moves.map(m => {
    const after = dbApply(s, m.kind, m.r, m.c, 2);
    let completes = 0;
    for (let br = 0; br < DB_N; br++) for (let bc = 0; bc < DB_N; bc++) {
      if (after.state.boxes[br][bc] !== 0 && s.boxes[br][bc] === 0) completes++;
    }
    // creates a 3-sided box (gift to opponent)?
    let gives = 0;
    for (let br = 0; br < DB_N; br++) for (let bc = 0; bc < DB_N; bc++) {
      if (after.state.boxes[br][bc] === 0 && dbBoxSides(after.state, br, bc) === 3) gives++;
    }
    return { m, score: completes * 10 - gives * 5 + (diff === "hard" ? -Math.random() : Math.random()) };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored[0].m;
}

export function DotsAndBoxes({ onReset }: { onReset: () => void }) {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const init = (): DbState => ({
    h: Array.from({length: DB_N+1}, () => Array(DB_N).fill(false)),
    v: Array.from({length: DB_N}, () => Array(DB_N+1).fill(false)),
    boxes: Array.from({length: DB_N}, () => Array<0|1|2>(DB_N).fill(0)),
  });
  const [state, setState] = useState<DbState>(init);
  const [turn, setTurn] = useState<1|2>(1);
  const [thinking, setThinking] = useState(false);

  const draw = (kind: "h"|"v", r: number, c: number) => {
    if (turn !== 1 || thinking) return;
    if (kind === "h" ? state.h[r][c] : state.v[r][c]) return;
    const { state: ns, claimed } = dbApply(state, kind, r, c, 1);
    setState(ns);
    if (!claimed) setTurn(2);
  };

  useEffect(() => {
    if (turn !== 2) return;
    const remaining = dbAllMoves(state).length;
    if (!remaining) return;
    setThinking(true);
    const t = setTimeout(() => {
      setState(prev => {
        let cur = prev;
        // AI keeps playing while it claims boxes
        while (true) {
          const m = dbAIMove(cur, difficulty);
          if (!m) break;
          const { state: ns, claimed } = dbApply(cur, m.kind, m.r, m.c, 2);
          cur = ns;
          if (!claimed) break;
        }
        return cur;
      });
      setTurn(1); setThinking(false);
    }, 600);
    return () => { clearTimeout(t); setThinking(false); };
  }, [turn, state, difficulty]);

  const reset = (d: Difficulty = difficulty) => { setDifficulty(d); setState(init()); setTurn(1); setThinking(false); onReset(); };
  const p1 = state.boxes.flat().filter(v => v === 1).length;
  const p2 = state.boxes.flat().filter(v => v === 2).length;
  const done = p1 + p2 === DB_N*DB_N;

  return (
    <GameShell
      status={<span>{done ? `Game over — You ${p1} · CPU ${p2} — ${p1 > p2 ? "🎉 You win!" : p2 > p1 ? "🤖 Computer wins." : "Draw"}` : thinking ? "🤖 Computer thinking…" : `Your turn — You ${p1} · CPU ${p2}`}</span>}
      controls={<><DifficultyPicker value={difficulty} onChange={reset} /><GameButton onClick={() => reset(difficulty)}>New Game</GameButton></>}
    >
      <div className="inline-block">
        {Array.from({length: DB_N*2+1}).map((_, i) => {
          const row = i;
          if (row % 2 === 0) {
            const hr = row / 2;
            return (
              <div key={i} className="flex items-center">
                {Array.from({length: DB_N}).map((_, c) => (
                  <div key={c} className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-foreground" />
                    <button onClick={() => draw("h", hr, c)} className={`h-2 w-10 sm:w-12 transition-colors ${state.h[hr][c] ? "bg-primary" : "bg-border/40 hover:bg-primary/60"}`} />
                  </div>
                ))}
                <div className="h-2 w-2 rounded-full bg-foreground" />
              </div>
            );
          } else {
            const vr = (row - 1) / 2;
            return (
              <div key={i} className="flex items-center">
                {Array.from({length: DB_N+1}).map((_, c) => (
                  <div key={c} className="flex items-center">
                    <button onClick={() => draw("v", vr, c)} className={`h-10 w-2 sm:h-12 transition-colors ${state.v[vr][c] ? "bg-primary" : "bg-border/40 hover:bg-primary/60"}`} />
                    {c < DB_N && <div className={`h-10 w-10 sm:h-12 sm:w-12 grid place-items-center text-xs font-bold transition-colors ${state.boxes[vr][c] === 1 ? "bg-primary/30 text-primary" : state.boxes[vr][c] === 2 ? "bg-accent/40 text-accent-foreground" : ""}`}>{state.boxes[vr][c] === 1 ? "You" : state.boxes[vr][c] === 2 ? "CPU" : ""}</div>}
                  </div>
                ))}
              </div>
            );
          }
        })}
      </div>
    </GameShell>
  );
}

/* ============================================================== */
/* 18. WORD GUESS — Wordle-style with difficulty, hints, big list  */
/* ============================================================== */

const WG_EASY = ["APPLE","HOUSE","LIGHT","CLOUD","HEART","MUSIC","BEACH","BREAD","CHAIR","TABLE","WATER","PLANT","MONEY","SMILE","HAPPY","BROWN","GREEN","BLACK","WHITE","SUGAR","SLEEP","TRAIN","MOUSE","HORSE","PIANO","PAPER","PHONE","CANDY","JUICE","LEMON","MANGO","GRAPE","PEACH","APPLE","HONEY","CLOUD","STORM","EARTH","OCEAN","RIVER","TIGER","EAGLE","ROBIN","SWANS","ZEBRA","SHEEP","FIELD","FRUIT","BROOM"];
const WG_MEDIUM = ["CRANE","DELTA","FROST","GLOBE","HAVEN","IVORY","JELLY","KNEEL","LATCH","NORTH","PLUMB","QUIET","RAVEN","STONE","THORN","UNITY","VIVID","WHEAT","XENON","YACHT","BLAZE","CIVIC","DODGE","EQUIP","FJORD","GRIND","HYENA","INEPT","JOKER","KAYAK","LYRIC","MOUTH","NYMPH","OPERA","PRISM","QUILT","ROGUE","SNARL","TWIST","UDDER","VOWEL","WALTZ","YEARN","ZONAL","ABYSS","BRAVE","CANDY","DRAFT","ELBOW","FABLE"];
const WG_HARD = ["FJORD","GLYPH","LYMPH","NYMPH","CRYPT","PSALM","QUIRK","SQUAB","SWARM","THUMB","VYING","WALTZ","XYLYL","YAWNS","ZINCS","AZURE","BLITZ","CHUCK","DWARF","EPOXY","FUZZY","GHYLL","HAZED","JUMBO","KHADI","LOOPY","MUMMY","NIXED","OOZED","PIXEL","QUARK","RUMMY","SLUMP","TROPHY".slice(0,5),"UMBRA","VIXEN","WAXED","YIELD","ZAPPY","ABBEY","BEEFY","CRICK","DINGY","ETHIC","FIERY","GAUZY","HUMPH","INBOX","JAZZY","KAPUT"];
const WG_BY_DIFF: Record<Difficulty, string[]> = { easy: [...new Set(WG_EASY)], medium: [...new Set(WG_MEDIUM)], hard: [...new Set(WG_HARD)] };
const WG_ALL = new Set([...WG_EASY, ...WG_MEDIUM, ...WG_HARD]);

const WG_HINTS: Record<string, string> = {
  APPLE: "A common red or green fruit",
  HOUSE: "A place where people live",
  LIGHT: "Opposite of dark",
  CLOUD: "Fluffy shape in the sky",
  HEART: "Pumps blood in your body",
  MUSIC: "Organized sound you enjoy",
  BEACH: "Sandy shore by the sea",
  BREAD: "Baked staple food",
  CHAIR: "You sit on it",
  TABLE: "Flat surface with legs",
  WATER: "Essential liquid for life",
  PLANT: "Green living organism",
  MONEY: "Used to buy things",
  SMILE: "Facial expression of joy",
  HAPPY: "Feeling pleased",
  SUGAR: "Sweet white crystalline",
  SLEEP: "Restful state at night",
  TRAIN: "Rides on rails",
  HORSE: "Four-legged animal you can ride",
  PIANO: "Musical instrument with keys",
  PAPER: "Made from wood pulp",
  PHONE: "Device to make calls",
  CANDY: "Sweet treat",
  JUICE: "Squeezed from fruit",
  LEMON: "Sour yellow citrus",
  MANGO: "Tropical orange fruit",
  GRAPE: "Small round berry, makes wine",
  PEACH: "Fuzzy stone fruit",
  HONEY: "Made by bees",
  STORM: "Bad weather with wind and rain",
  EARTH: "The planet we live on",
  OCEAN: "Large salt-water body",
  RIVER: "Flowing freshwater",
  TIGER: "Big striped cat",
  EAGLE: "Large bird of prey",
  CRANE: "Tall wading bird or lifting machine",
  FROST: "Icy coating on cold mornings",
  GLOBE: "Spherical model of Earth",
  IVORY: "Off-white color from tusks",
  NORTH: "Direction toward the pole",
  QUIET: "Making little sound",
  STONE: "A piece of rock",
  UNITY: "State of being one",
  VIVID: "Bright and intense",
  WHEAT: "Grain used for bread",
  YACHT: "Recreational sailing boat",
  BLAZE: "A large fire",
};

export function WordleClone({ onReset }: { onReset: () => void }) {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [answer, setAnswer] = useState(() => WG_BY_DIFF["easy"][Math.floor(Math.random()*WG_BY_DIFF["easy"].length)]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [hintShown, setHintShown] = useState(false);
  const [error, setError] = useState("");
  const won = guesses.includes(answer);
  const lost = guesses.length >= 6 && !won;

  const submit = useCallback(() => {
    if (current.length !== 5) { setError("5 letters required"); return; }
    if (!WG_ALL.has(current)) { setError(`"${current}" isn't in our word list`); return; }
    setError("");
    setGuesses(g => [...g, current]);
    setCurrent("");
  }, [current]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (won || lost) return;
      if (e.key === "Enter") { e.preventDefault(); submit(); }
      else if (e.key === "Backspace") { setCurrent(c => c.slice(0, -1)); setError(""); }
      else if (/^[a-zA-Z]$/.test(e.key)) { setCurrent(c => c.length < 5 ? c + e.key.toUpperCase() : c); setError(""); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [submit, won, lost]);

  const reset = (d: Difficulty = difficulty) => {
    setDifficulty(d);
    const list = WG_BY_DIFF[d];
    setAnswer(list[Math.floor(Math.random()*list.length)]);
    setGuesses([]); setCurrent(""); setHintShown(false); setError(""); onReset();
  };

  const cellColor = (letter: string, i: number) => {
    if (letter === answer[i]) return "bg-success text-success-foreground border-success";
    if (answer.includes(letter)) return "bg-warning text-warning-foreground border-warning";
    return "bg-muted-foreground/50 text-background border-muted-foreground";
  };
  const rows = Array.from({length: 6}, (_, i) => guesses[i] ?? (i === guesses.length ? current.padEnd(5) : ""));
  const keyRows = ["QWERTYUIOP","ASDFGHJKL","ZXCVBNM"];
  const keyStatus = (l: string) => {
    let s: "hit"|"present"|"miss"|null = null;
    for (const g of guesses) for (let i = 0; i < 5; i++) {
      if (g[i] === l) {
        if (answer[i] === l) return "hit";
        if (answer.includes(l)) s = "present"; else s = s ?? "miss";
      }
    }
    return s;
  };
  const type = (l: string) => { if (won || lost) return; setCurrent(c => c.length < 5 ? c + l : c); setError(""); };
  const back = () => setCurrent(c => c.slice(0, -1));
  const hint = WG_HINTS[answer] || `Starts with "${answer[0]}", ${answer.length} letters, category: general vocabulary`;

  return (
    <GameShell
      status={
        <span>
          {won ? "🎉 Solved!" : lost ? `Answer: ${answer}` : `Guess ${guesses.length + 1}/6 — ${difficulty} mode`}
          {error && <span className="ml-2 text-destructive">· {error}</span>}
        </span>
      }
      controls={
        <>
          <DifficultyPicker value={difficulty} onChange={reset} />
          <GameButton onClick={() => setHintShown(true)} variant="accent" disabled={hintShown || won || lost}>
            {hintShown ? "Hint shown" : "Hint"}
          </GameButton>
          <GameButton onClick={() => reset(difficulty)}>New Word</GameButton>
        </>
      }
      extra={hintShown && !won && !lost ? <div className="rounded-lg bg-accent/20 px-3 py-1 text-xs text-foreground">💡 {hint}</div> : null}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="grid gap-1">
          {rows.map((row, ri) => (
            <div key={ri} className="flex gap-1">
              {Array.from({length: 5}).map((_, ci) => {
                const l = row[ci] || "";
                const isGuess = ri < guesses.length;
                return (
                  <div key={ci} className={`grid h-10 w-10 place-items-center rounded-md border-2 text-lg font-bold transition-colors sm:h-12 sm:w-12 ${isGuess && l ? cellColor(l, ci) : "border-border bg-card"}`}>
                    {l.trim()}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-1">
          {keyRows.map((r, i) => (
            <div key={i} className="flex gap-1">
              {i === 2 && <button onClick={submit} className="rounded-md bg-secondary px-2 text-xs font-bold hover:bg-primary hover:text-primary-foreground">ENTER</button>}
              {r.split("").map(l => {
                const st = keyStatus(l);
                const bg = st === "hit" ? "bg-success text-success-foreground" : st === "present" ? "bg-warning text-warning-foreground" : st === "miss" ? "bg-muted-foreground/50 text-background" : "bg-secondary";
                return <button key={l} onClick={() => type(l)} className={`h-9 w-7 rounded-md text-sm font-semibold sm:w-8 ${bg}`}>{l}</button>;
              })}
              {i === 2 && <button onClick={back} className="rounded-md bg-secondary px-2 text-xs font-bold hover:bg-primary hover:text-primary-foreground">⌫</button>}
            </div>
          ))}
        </div>
      </div>
    </GameShell>
  );
}

/* ============================================================== */
/* Slug → Component registry                                       */
/* ============================================================== */

export const GAME_COMPONENTS: Record<string, (props: { onReset: () => void }) => React.ReactElement> = {
  "tic-tac-toe": TicTacToe,
  "connect-4": Connect4,
  "checkers": Checkers,
  "sudoku": Sudoku,
  "memory-match": MemoryMatch,
  "minesweeper": Minesweeper,
  "2048": Game2048,
  "word-search": WordSearch,
  "hangman": Hangman,
  "simon-says": SimonSays,
  "whack-a-mole": WhackAMole,
  "snake": Snake,
  "reversi": Reversi,
  "rock-paper-scissors": RockPaperScissors,
  "sliding-puzzle": SlidingPuzzle,
  "mastermind": Mastermind,
  "dots-and-boxes": DotsAndBoxes,
  "wordle-clone": WordleClone,
};
