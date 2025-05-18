/*const cards = [
  { name: "Sword Slash", type: "attack", value: 20 },
  { name: "Shield Block", type: "defense", value: 15 },
  { name: "Fireball", type: "attack", value: 25 },
  { name: "Heal", type: "defense", value: 20 },
  { name: "Double Strike", type: "special", value: 10, effect: "double attack" }
];



const Cards = document.querySelectorAll('.card');
const selectSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-game-click-1114.mp3');
const hoverSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-click-error-1110.mp3');*/


// cards.js
const cards = [
  { name: "Sword Slash", type: "attack", value: 20, description: "A basic sword attack" },
  { name: "Shield Block", type: "defense", value: 15, description: "Block incoming damage" },
  { name: "Fireball", type: "attack", value: 25, description: "Launch a fiery projectile" },
  { name: "Heal", type: "defense", value: 20, description: "Restore health points" },
  { name: "Double Strike", type: "special", value: 10, effect: "double attack", description: "Attack twice in one turn" },
 

  { name: "Vampiric Touch", type: "special", value: 15, effect: "steal health", description: "Steal health from your opponent" }
];

const selectSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-game-click-1114.mp3');
const hoverSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-click-error-1110.mp3');
