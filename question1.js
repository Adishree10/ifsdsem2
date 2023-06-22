const prompt = require('prompt-sync')();

class Leg {
  constructor(city1, city2, cost) {
    this.city1 = city1;
    this.city2 = city2;
    this.cost = cost;
  }
}

class Route {
  constructor() {
    this.legs = [];
  }

  addLeg(leg) {
    this.legs.push(leg);
  }

  calculateTotalCost() {
    let totalCost = 0;
    for (let leg of this.legs) {
      totalCost += leg.cost;
    }
    return totalCost;
  }
}

function main() {
  const route = new Route();

  const numLegs = parseInt(prompt("Enter the number of legs in the route:"));

  for (let i = 0; i < numLegs; i++) {
    const city1 = prompt(`Enter the name of first city of leg ${i + 1}:`);
    const city2 = prompt(`Enter the name of second city of leg ${i + 1}:`);
    const cost = parseInt(prompt(`Enter the cost for leg ${i + 1}:`));
    const leg = new Leg(city1, city2, cost);
    route.addLeg(leg);
  }

  const totalCost = route.calculateTotalCost();
  console.log("Total cost of the trip:", totalCost);
}

main();