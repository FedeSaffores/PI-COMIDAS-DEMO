export const ordAlf = (a, b) => {
  if (a.name < b.name) return -1;
  if (b.name < a.name) return 1;
  return 0;
};
export const ordScore = (a, b) => {
  return a.healthscore - b.healthscore;
};
