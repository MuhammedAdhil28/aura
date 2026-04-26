const symbols = ["Crown","Anchor","Diamond","Spade","Heart","Club"];

let bets = {
  Crown:0, Anchor:0, Diamond:0,
  Spade:0, Heart:0, Club:0
};

let round = 1;

// add ₹50
function addBet(symbol){
  bets[symbol] += 50;
  document.getElementById(symbol).innerText = bets[symbol];
  updateTotal();
}

// total
function updateTotal(){
  let total = 0;
  symbols.forEach(s => total += bets[s]);
  document.getElementById("totalBet").innerText = total;
}

// REAL TIME TIMER
function updateTimer(){

  let now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let totalSeconds = minutes * 60 + seconds;
  let cycle = 180;

  let remaining = cycle - (totalSeconds % cycle);

  let m = Math.floor(remaining / 60);
  let s = remaining % 60;

  document.getElementById("timer").innerText =
    m + ":" + (s < 10 ? "0"+s : s);

  let newRound = Math.floor(totalSeconds / cycle) + 1;

  if(newRound !== round){
    round = newRound;
    document.getElementById("round").innerText = round;

    symbols.forEach(s => {
      bets[s] = 0;
      document.getElementById(s).innerText = 0;
    });

    updateTotal();
  }

  document.getElementById("clock").innerText =
    now.toLocaleTimeString("en-IN");
}

setInterval(updateTimer, 1000);

// pay
function payNow(){
  let total = document.getElementById("totalBet").innerText;

  if(total == 0){
    alert("Add bet first");
  } else {
    alert("Round #" + round + " | Pay ₹" + total);
  }
}

// copy UPI
function copyUPI(){
  let upi = document.getElementById("upiId").innerText;

  navigator.clipboard.writeText(upi).then(() => {
    alert("UPI ID copied: " + upi);
  }).catch(() => {
    alert("Copy failed");
  });
}