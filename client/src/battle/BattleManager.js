export class BattleManager {
  constructor(playerTeam, enemyTeam) {
    this.playerTeam = playerTeam;
    this.enemyTeam = enemyTeam;
    this.currentTurn = 0;
    this.turnOrder = [];
    this.battleState = "ready"; // ready, playerTurn, enemyTurn, victory, defeat
    this.activeCharacter = null;
    this.targetEnemy = null;
  }
  
  initializeBattle() {
    // Combine all combatants
    const allCombatants = [...this.playerTeam, ...this.enemyTeam];
    
    // Sort by speed stat
    this.turnOrder = allCombatants.sort((a, b) => b.stats.spd - a.stats.spd);
    
    this.battleState = "playerTurn";
    this.activeCharacter = this.playerTeam[0];
    this.targetEnemy = this.enemyTeam[0];
    
    return {
      battleState: this.battleState,
      activeCharacter: this.activeCharacter,
      targetEnemy: this.targetEnemy
    };
  }
  
  performAction(action, source, target) {
    let result = {};
    
    switch (action.type) {
      case "attack":
        // Basic attack formula
        const damage = Math.max(1, source.stats.atk - target.stats.def);
        target.stats.hp -= damage;
        
        result = {
          action: "attack",
          source: source.name,
          target: target.name,
          damage,
          targetHP: target.stats.hp
        };
        break;
        
      case "skill":
        // Skill logic to be implemented
        break;
        
      case "item":
        // Item usage logic to be implemented
        break;
    }
    
    // Check if target is defeated
    if (target.stats.hp <= 0) {
      target.isDefeated = true;
      result.defeated = true;
    }
    
    return result;
  }
  
  enemyTurn() {
    // Simple AI for enemy
    const enemy = this.turnOrder[this.currentTurn];
    const randomTarget = this.playerTeam[Math.floor(Math.random() * this.playerTeam.length)];
    
    const action = {
      type: "attack"
    };
    
    const result = this.performAction(action, enemy, randomTarget);
    
    // Check for game over
    const allPlayersDefeated = this.playerTeam.every(p => p.isDefeated);
    if (allPlayersDefeated) {
      this.battleState = "defeat";
    } else {
      this.advanceTurn();
    }
    
    return {
      result,
      battleState: this.battleState
    };
  }
  
  playerAction(action, targetIndex) {
    const player = this.activeCharacter;
    const target = this.enemyTeam[targetIndex];
    
    const result = this.performAction(action, player, target);
    
    // Check for victory
    const allEnemiesDefeated = this.enemyTeam.every(e => e.isDefeated);
    if (allEnemiesDefeated) {
      this.battleState = "victory";
    } else {
      this.advanceTurn();
    }
    
    return {
      result,
      battleState: this.battleState
    };
  }
  
  advanceTurn() {
    this.currentTurn = (this.currentTurn + 1) % this.turnOrder.length;
    
    // Skip defeated combatants
    while (this.turnOrder[this.currentTurn].isDefeated) {
      this.currentTurn = (this.currentTurn + 1) % this.turnOrder.length;
    }
    
    // Check if it's player or enemy turn
    const isPlayerTurn = this.playerTeam.includes(this.turnOrder[this.currentTurn]);
    this.battleState = isPlayerTurn ? "playerTurn" : "enemyTurn";
    
    if (isPlayerTurn) {
      this.activeCharacter = this.turnOrder[this.currentTurn];
    }
    
    return {
      battleState: this.battleState,
      activeCharacter: this.activeCharacter
    };
  }
  
  getEXPReward() {
    return this.enemyTeam.reduce((total, enemy) => total + enemy.expReward, 0);
  }
}