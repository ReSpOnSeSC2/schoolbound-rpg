import { audioManager } from "../audio";
import { BattleManager } from "../battle/BattleManager";
import { Character } from "../battle/Character";
import { Enemy } from "../battle/Enemy";

export function battle(k) {
  k.scene("battle", (params = {}) => {
    // Play battle music
    audioManager.playMusic("battle");
    
    // Create sample data (this would come from game state)
    const playerTeam = [
      new Character({
        name: "Hero",
        archetype: "Fighter",
        stats: { hp: 50, atk: 12, def: 8, spd: 10, res: 5 },
        abilities: ["Slash", "Guard"],
        weaknesses: ["Fire"]
      })
    ];
    
    const enemyTeam = [
      new Enemy({
        name: "School Bully",
        role: "Grunt",
        stats: { hp: 30, atk: 8, def: 4, spd: 6, res: 3 },
        abilities: ["Punch", "Taunt"],
        aiPattern: "aggressive",
        expReward: 15
      })
    ];
    
    // Initialize battle
    const battleManager = new BattleManager(playerTeam, enemyTeam);
    battleManager.initializeBattle();
    
    // Background
    k.add([
      k.rect(800, 600),
      k.color(20, 20, 60),
      k.pos(0, 0),
    ]);
    
    // Enemy sprites
    const enemySprites = enemyTeam.map((enemy, index) => {
      return k.add([
        k.rect(64, 64), // Placeholder
        k.color(255, 0, 0),
        k.pos(600, 150 + index * 100),
        k.text(enemy.name, 12),
        "enemy"
      ]);
    });
    
    // Player character sprites
    const playerSprites = playerTeam.map((character, index) => {
      return k.add([
        k.rect(48, 48), // Placeholder
        k.color(0, 200, 255),
        k.pos(200, 300 + index * 80),
        k.text(character.name, 12),
        "player"
      ]);
    });
    
    // Health bars
    enemyTeam.forEach((enemy, index) => {
      // Health background
      k.add([
        k.rect(100, 10),
        k.color(100, 100, 100),
        k.pos(enemySprites[index].pos.x - 20, enemySprites[index].pos.y - 30),
      ]);
      
      // Health bar
      const healthBar = k.add([
        k.rect(enemy.stats.hp, 10),
        k.color(255, 50, 50),
        k.pos(enemySprites[index].pos.x - 20, enemySprites[index].pos.y - 30),
        "healthBar",
        { entityIndex: index, isEnemy: true }
      ]);
      
      // Update the health bar
      healthBar.onUpdate(() => {
        const currentHP = enemyTeam[index].stats.hp;
        healthBar.width = (currentHP / enemy.stats.hp) * 100;
      });
    });
    
    playerTeam.forEach((character, index) => {
      // Health background
      k.add([
        k.rect(100, 10),
        k.color(100, 100, 100),
        k.pos(playerSprites[index].pos.x - 20, playerSprites[index].pos.y - 30),
      ]);
      
      // Health bar
      const healthBar = k.add([
        k.rect(character.stats.hp, 10),
        k.color(50, 255, 50),
        k.pos(playerSprites[index].pos.x - 20, playerSprites[index].pos.y - 30),
        "healthBar",
        { entityIndex: index, isEnemy: false }
      ]);
      
      // Update the health bar
      healthBar.onUpdate(() => {
        const currentHP = playerTeam[index].stats.hp;
        healthBar.width = (currentHP / character.maxHP) * 100;
      });
    });
    
    // Battle UI
    const actionMenu = k.add([
      k.rect(600, 120),
      k.color(0, 0, 0),
      k.outline(2, k.rgb(255, 255, 255)),
      k.pos(100, 470),
    ]);
    
    const attackBtn = k.add([
      k.text("Attack", 16),
      k.pos(150, 500),
      k.area(),
      k.color(255, 255, 255),
      "button",
      { action: "attack" }
    ]);
    
    const skillBtn = k.add([
      k.text("Skill", 16),
      k.pos(250, 500),
      k.area(),
      k.color(255, 255, 255),
      "button",
      { action: "skill" }
    ]);
    
    const itemBtn = k.add([
      k.text("Item", 16),
      k.pos(350, 500),
      k.area(),
      k.color(255, 255, 255),
      "button",
      { action: "item" }
    ]);
    
    const runBtn = k.add([
      k.text("Run", 16),
      k.pos(450, 500),
      k.area(),
      k.color(255, 255, 255),
      "button",
      { action: "run" }
    ]);
    
    // Status text
    const statusText = k.add([
      k.text("Battle started! Your turn!", 20),
      k.pos(400, 400),
      k.origin("center"),
      k.color(255, 255, 255),
    ]);
    
    // Button interactions
    k.onHover("button", (btn) => {
      btn.color = k.rgb(255, 255, 0);
    });
    
    k.onHoverEnd("button", (btn) => {
      btn.color = k.rgb(255, 255, 255);
    });
    
    // Game state
    let selectedAction = null;
    let selectedTarget = 0;
    let isSelectingTarget = false;
    
    // Handle button clicks
    k.onClick("button", (btn) => {
      if (battleManager.battleState !== "playerTurn") return;
      
      audioManager.playSound("menuSelect");
      
      if (btn.action === "run") {
        // 50% chance to escape
        const escapeChance = Math.random();
        if (escapeChance > 0.5) {
          statusText.text = "Got away safely!";
          
          k.wait(1, () => {
            k.go("overworld");
          });
        } else {
          statusText.text = "Couldn't escape!";
          
          // Skip to enemy turn
          const turnInfo = battleManager.advanceTurn();
          handleEnemyTurn();
        }
      } else {
        selectedAction = btn.action;
        isSelectingTarget = true;
        statusText.text = "Select a target!";
        
        // Highlight enemies as selectable
        enemySprites.forEach((sprite) => {
          sprite.color = k.rgb(255, 200, 200);
        });
      }
    });
    
    // Target selection
    k.onClick("enemy", (enemy) => {
      if (!isSelectingTarget) return;
      
      audioManager.playSound("menuSelect");
      
      // Find the index of the clicked enemy
      const targetIndex = enemySprites.indexOf(enemy);
      
      // Perform action
      const actionResult = battleManager.playerAction({ type: selectedAction }, targetIndex);
      
      // Play attack sound
      audioManager.playSound("attack");
      
      // Update UI
      statusText.text = `${playerTeam[0].name} attacks ${enemyTeam[targetIndex].name} for ${actionResult.result.damage} damage!`;
      
      // Reset selection state
      isSelectingTarget = false;
      selectedAction = null;
      
      // Reset enemy highlighting
      enemySprites.forEach((sprite) => {
        sprite.color = k.rgb(255, 0, 0);
      });
      
      // Check battle state
      if (actionResult.battleState === "victory") {
        handleVictory();
      } else if (actionResult.battleState === "enemyTurn") {
        // Wait a moment before enemy turn
        k.wait(1, () => {
          handleEnemyTurn();
        });
      }
    });
    
    function handleEnemyTurn() {
      const enemyAction = battleManager.enemyTurn();
      
      // Play enemy attack sound
      audioManager.playSound("attack");
      
      statusText.text = `${enemyTeam[0].name} attacks ${playerTeam[enemyAction.result.target].name} for ${enemyAction.result.damage} damage!`;
      
      // Check for defeat
      if (enemyAction.battleState === "defeat") {
        k.wait(1, () => {
          statusText.text = "Game Over!";
          
          k.wait(2, () => {
            k.go("mainMenu");
          });
        });
      } else {
        // Wait before returning to player turn
        k.wait(1, () => {
          statusText.text = "Your turn!";
        });
      }
    }
    
    function handleVictory() {
      audioManager.playSound("victory");
      
      statusText.text = "Victory!";
      
      // Calculate and award EXP
      const expReward = battleManager.getEXPReward();
      const levelUpResult = playerTeam[0].gainEXP(expReward);
      
      k.wait(1, () => {
        statusText.text = `Gained ${expReward} EXP!`;
        
        k.wait(1, () => {
          if (levelUpResult.levelUp) {
            statusText.text = `${playerTeam[0].name} leveled up to level ${playerTeam[0].level}!`;
            
            k.wait(2, () => {
              k.go("overworld");
            });
          } else {
            k.wait(1, () => {
              k.go("overworld");
            });
          }
        });
      });
    }
  });
}