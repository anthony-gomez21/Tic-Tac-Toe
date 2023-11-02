// ================= Save ======================

export const saveGameToStorage = ({ board, turn }) => {
  // guardar aqui partida
  window.localStorage.setItem('board', JSON.stringify(board));
  window.localStorage.setItem('turn', turn);
};

// ================= Reset ======================

export const resetGameStorage = () => {
  window.localStorage.removeItem('board');
  window.localStorage.removeItem('turn');
};

// ================= Winner ======================

export const winnerStorage = ({ newWinner }) => {
  window.localStorage.setItem('winner', newWinner);
};

export const resetWinnerStorage = () => {
  localStorage.removeItem('winner');
};

// ================= Score ======================

export const scoreStorage = ({ newScore }) => {
  window.localStorage.setItem('score', JSON.stringify(newScore));
};
