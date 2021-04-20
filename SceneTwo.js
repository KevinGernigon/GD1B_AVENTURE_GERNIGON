var player;
var ennemis;
var pattern_1;
var pattern_2;
var pattern_3;
var pattern_4;
var numeroPattern;
var moving = false;
var keys;
var swing;
var canSwing = true;
var newSwing;

class SceneTwo extends Phaser.Scene{
    constructor(){
        super("sceneTwo");
    }
    init(data){
    }
    preload(){
        this.load.image('tiles', 'assets/tileset_placeholder.jpg');
        this.load.tilemapTiledJSON('map_2_placeholder', 'map_2_placeholder.json');
        //this.load.image('player', 'assets/player.png'); 
        this.load.image('ennemi_1', 'assets/ennemi_1.png');
        this.load.image('chest', 'assets/chest.png');
        this.load.spritesheet('player', 'assets/player_spritesheet.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('swing', 'assets/swing_spritesheet.png', {frameWidth: 24, frameHeight: 24});
    }
    create(){
        
        
        const map = this.make.tilemap({key: 'map_2_placeholder'});
        const tileset = map.addTilesetImage('tileset_placeholder', 'tiles');
        const terrain = map.createStaticLayer('terrain', tileset, 0, 0);
        const bloquant = map.createStaticLayer('bloquant', tileset, 0, 0);
        const zone = map.createStaticLayer('zone', tileset, 0, 0);
        const ennemisObjects = map.getObjectLayer('ennemis').objects;
        const itemObjects = map.getObjectLayer('item').objects;
        
        bloquant.setCollisionByExclusion(-1, true);

        player = this.physics.add.sprite(300, 300, 'player');
        
        var items = this.physics.add.group({});
        
        ennemis = this.physics.add.group();
        swing = this.physics.add.group();
        
        for (const ennemi of ennemisObjects){
            ennemis.create(ennemi.x, ennemi.y, 'ennemi_1')
                .setScale(0.2)
        }
        
        for (const item of itemObjects){
            items.create(item.x, item.y, 'chest')
                .setPosition(item.x+32, item.y-32)
                .setScale(1)
        }

        this.physics.add.collider(player, bloquant);
        this.physics.add.collider(ennemis, bloquant);
        this.physics.add.overlap(swing, ennemis, cutCut, null, this);
        this.physics.add.overlap(player, zone, changementZone, null, this);
        //this.physics.add.overlap(player, zone, changementZone);
        
        keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up : Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
        keys.left.reset();
        keys.right.reset();
        keys.up.reset();
        keys.down.reset();
        keys.space.reset();
        
        function getRandom(min, max) {
            return Math.random() * (max - min) + min;
        }
        
        function getRoundRandom(min, max){
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min +1)) + min;
        }
        
        function cutCut(swing, ennemis){
            console.log("cut");
            ennemis.destroy();
        }
        

          
        function changementZone(player, zone){
            if (player.y <= 60 && player.x >= 400 && player.x <= 560){
                player.body.stop();
                this.scene.start("sceneOne");
                console.log("changement");
            }
        }
        
        
        this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 1, end: 1 }),
        frameRate: 10,
        repeat: -1
        });
        this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 2, end: 2 }),
        frameRate: 10,
        repeat: -1
        });
        this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
        });
        this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { start: 3, end: 3}),
        frameRate: 10,
        repeat: -1
        });
        
        this.anims.create({
        key: 'swing_right',
        frames: this.anims.generateFrameNumbers('swing', { start: 1, end: 1 }),
        frameRate: 10,
        repeat: -1
        });
        this.anims.create({
        key: 'swing_left',
        frames: this.anims.generateFrameNumbers('swing', { start: 2, end: 2 }),
        frameRate: 10,
        repeat: -1
        });
        this.anims.create({
        key: 'swing_up',
        frames: this.anims.generateFrameNumbers('swing', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
        });
        this.anims.create({
        key: 'swing_down',
        frames: this.anims.generateFrameNumbers('swing', { start: 3, end: 3}),
        frameRate: 10,
        repeat: -1
        });
        
        pattern_1 = getRandom(1,2);
        pattern_2 = getRandom(1,2);
        pattern_3 = getRandom(1,2);
        pattern_4 = getRandom(1,2);
        numeroPattern = getRoundRandom(1,4);
            
        
        
    }
     
    update(){
        
            console.log(game.loop.actualFps);  

            if (canSwing == true){
                if (keys.right.isDown){
                    player.setVelocityX(200);
                    player.anims.play('right', true);
                }
                else if (keys.left.isDown){
                    player.setVelocityX(-200);
                    player.anims.play('left', true);
                }
                else if (keys.right.isUp && keys.left.isUp){
                    player.setVelocityX(0);
                }
                if (keys.up.isDown){
                    player.setVelocityY(-200);
                    player.anims.play('up', true);
                }
                else if (keys.down.isDown){
                    player.setVelocityY(200);
                    player.anims.play('down', true);
                }
                else if (keys.up.isUp && keys.down.isUp){
                    player.setVelocityY(0);
                }

                if (keys.left.isDown && keys.space.isDown && keys.right.isUp && keys.up.isUp && keys.down.isUp){
                    canSwing = false;
                    player.setVelocity(0);
                    attaque(-32,0);
                    newSwing.anims.play('swing_left', true);
                    setTimeout(function(){newSwing.destroy()}, 200);
                    setTimeout(function(){canSwing = true}, 200);
                }
                if (keys.right.isDown && keys.space.isDown && keys.left.isUp && keys.up.isUp && keys.down.isUp){
                    canSwing = false;
                    player.setVelocity(0);
                    attaque(32,0);
                    newSwing.anims.play('swing_right', true);
                    setTimeout(function(){newSwing.destroy()}, 200);
                    setTimeout(function(){canSwing = true}, 200);
                }
                if (keys.up.isDown && keys.space.isDown && keys.right.isUp && keys.left.isUp && keys.down.isUp){
                    canSwing = false;
                    player.setVelocity(0);
                    attaque(0,-32);
                    newSwing.anims.play('swing_up', true);
                    setTimeout(function(){newSwing.destroy()}, 200);
                    setTimeout(function(){canSwing = true}, 200);
                }
                if (keys.down.isDown && keys.space.isDown && keys.right.isUp && keys.up.isUp && keys.left.isUp){
                    canSwing = false;
                    player.setVelocity(0);
                    attaque(0,32);
                    newSwing.anims.play('swing_down', true);
                    setTimeout(function(){newSwing.destroy()}, 200);
                    setTimeout(function(){canSwing = true}, 200);
                }
            }
        
        for (const ennemi of ennemis.children.entries){
            if (ennemi.body.blocked.right){
                ennemi.setVelocityX(-100);
            }
            if (ennemi.body.blocked.left){
                ennemi.setVelocityX(100);
            }
            if (moving == false){
                ennemis.setVelocityX(-100);
                moving = true;
            }
        }
        
    }   
        
}

function attaque(x, y){
    newSwing = swing.create(player.x + x, player.y + y, 'swing');
}