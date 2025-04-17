export class Character {
  constructor(data) {
    this.name = data.name;
    this.archetype = data.archetype;
    this.stats = { ...data.stats };
    this.abilities = [...data.abilities];
    this.weaknesses = [...data.weaknesses];
    this.isDefeated = false;
    
    // Add additional properties
    this.level = data.level || 1;
    this.exp = data.exp || 0;
    this.maxHP = data.stats.hp;
    this.maxPP = data.stats.pp || 0;
  }
  
  heal(amount) {
    this.stats.hp = Math.min(this.maxHP, this.stats.hp + amount);
  }
  
  restorePP(amount) {
    this.stats.pp = Math.min(this.maxPP, this.stats.pp + amount);
  }
  
  gainEXP(amount) {
    this.exp += amount;
    
    // Simple level up check (can be refined)
    const expNeeded = this.level * 100;
    if (this.exp >= expNeeded) {
      this.levelUp();
    }
    
    return {
      levelUp: this.exp >= expNeeded,
      exp: this.exp,
      expNeeded
    };
  }
  
  levelUp() {
    this.level++;
    
    // Increase stats based on archetype
    switch (this.archetype) {
      case "Fighter":
        this.stats.str += 3;
        this.stats.con += 2;
        this.stats.dex += 1;
        break;
      case "Tech Mage":
        this.stats.int += 3;
        this.stats.pp += 5;
        this.stats.dex += 1;
        break;
      case "Support":
        this.stats.chr += 3;
        this.stats.int += 2;
        this.stats.pp += 3;
        break;
      case "Scout":
        this.stats.dex += 3;
        this.stats.spd += 2;
        this.stats.str += 1;
        break;
    }
    
    // Increase HP for all archetypes
    this.maxHP += 5 + Math.floor(this.stats.con / 2);
    this.stats.hp = this.maxHP;
    
    // Increase PP for magic users
    if (this.stats.pp) {
      this.maxPP += 3 + Math.floor(this.stats.int / 3);
      this.stats.pp = this.maxPP;
    }
  }
}