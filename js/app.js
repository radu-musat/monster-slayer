//Blank
new Vue({
    el: "#app",
    data: {
        player: {
            life: 100,
            remainingHeals: 4,
            healDisabled: false
        },
        monster: {
            life: 100
        },
        combatLog: [],
        gameOver: true
    },
    watch: {
        'monster.life': function () {
            if (this.monster.life <= 0) {
                alert('You defeated the monster! Congratulations!');
                this.resetGame();
            }
        },
        'player.life': function () {
            if (this.player.life <= 0) {
                alert('The monster defeated you! Game over!');
                this.resetGame();
            }
        }
    },
    methods: {
        attack: function (attacker, mode) {
            if (mode === 'basic') {
                new Audio('./audio/PUNCH1.mp3').play();
                if (attacker === 'player') {
                    let damage = this.getRandomNumber(1, 10);
                    this.monster.life -= damage;

                    if (this.monster.life < 0) {
                        this.monster.life = 0;
                    }
                    this.combatLog.push(this.generateReport('attack',damage.toString(),'player','monster'));
                } else if (attacker === 'monster') {
                    let damage = this.getRandomNumber(1, 10);
                    this.player.life -=  damage;

                    if (this.player.life < 0) {
                        this.player.life = 0;
                    }
                    this.combatLog.push(this.generateReport('attack',damage.toString(),'monster','player'));
                }
            } else if (mode === 'special') {
                new Audio('./audio/PUNCH2.mp3').play();
                if (attacker === 'player') {
                    let damage = this.getRandomNumber(7, 14);
                    this.monster.life -= damage;

                    if (this.monster.life < 0) {
                        this.monster.life = 0;
                    }
                    this.combatLog.push(this.generateReport('attack',damage.toString(),'player','monster'));
                } else if (attacker === 'monster') {
                    let damage  = this.getRandomNumber(7, 14);
                    this.player.life -= damage;

                    if (this.player.life < 0) {
                        this.player.life = 0;
                    }
                    this.combatLog.push(this.generateReport('attack',damage.toString(),'monster','player'));
                }
            }
        },

        startRound: function (mode) {
            if (mode === 'basic') {
                this.attack('player', 'basic');
                this.attack('monster', 'basic');
            } else if (mode === 'special') {
                this.attack('player', 'special');
                this.attack('monster', 'special');
            }
        },

        heal: function () {
            if (this.player.remainingHeals > 0) {
                this.player.remainingHeals--;
                let healValue = this.getRandomNumber(6, 11);
                if (this.player.life < 100) {
                    this.player.life += healValue
                    if (this.player.life >= 100) {
                        this.player.life = 100;
                    }
                    this.combatLog.push(this.generateReport('heal', healValue.toString()));
                }

                this.attack('monster', 'basic');
            } else {
                this.player.healDisabled = true;
            }
        },

        getRandomNumber: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },

        startGame: function () {
            this.gameOver = !this.gameOver;
        },

        resetGame: function () {
            this.gameOver = true;
            this.player.life = 100;
            this.monster.life = 100;
            this.combatLog = [];
            this.player.healDisabled = false;
            this.player.remainingHeals = 4;
        },

        generateReport(mode, value, entity, enemyEntity,) {
            if( mode === 'attack') {
                return `The ${entity} has damaged the ${enemyEntity} for ${value}% points of damage!`;
            } else if( mode === 'heal') {
                return `The player has been healed for a total of ${value}% hit points!`;
            }
        }
    }
});
