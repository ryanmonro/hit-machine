
function chordSequence(){
  const progressions = [
   "1 4 6 5",
   "1 4 5 4",
   "6 6 5 5",
   "4 5 1 1",
   "4 4 3 3",
   "1 4 5 5",
   "4 5 6 6",
   "1 1 2 2",
  ];
  return progressions[Math.floor(Math.random() * progressions.length)].split(' ');
}

export default chordSequence;