export class Enemy {
  constructor(data) {
    this.name = data.name;
    this.role = data.role;
    this.stats = { ...data.stats };
    this.abilities = [...data.abilities];
    this.aiPattern = data.aiPattern;
    this.isDefeated = false;
    
    // Additional properties
    this.expReward = data.expReward || 10;
    this.itemDrops = data.itemDrops || [];
  }
  
  chooseAction(playerTeam) {
    // Implement different AI patterns
    switch (this.aiPattern) {
      case "aggressive":
        // Target lowest HP
        const weakestTarget = playerTeam.reduce(
          (prev, curr) => (!curr.isDefeated && curr.stats.hp < prev.stats.hp) ? curr : prev,
          playerTeam.find(p => !p.isDefeated)
        );
        
        return {
          type: "attack",
          target: playerTeam.indexOf(weakestTarget)
        };
        
      case "defensive":
        // Random target, possible defensive ability
        const randomIndex = Math.floor(Math.random() * playerTeam.length);
        return {
          type: "attack",
          target: randomIndex
        };
        
      case "support":
        // Support abilities (to be implemented)
        return {
          type: "attack",
          target: Math.floor(Math.random() * playerTeam.length)
        };
        
      default:
        // Random target
        return {
          type: "attack",
          target: Math.floor(Math.random() * playerTeam.length)
        };
    }
  }
}