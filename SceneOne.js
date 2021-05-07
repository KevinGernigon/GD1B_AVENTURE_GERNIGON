var player;
var ennemis;
var items;
var coffres;
var murs;
var keys;

var gamepad;
var paddle;
var padConnected;
var pad;

var player_hp = 5;
var invincible = false;

var full_heart_1;
var full_heart_2;
var full_heart_3;
var full_heart_4;
var full_heart_5;
var empty_heart_1;
var empty_heart_2;
var empty_heart_3;
var empty_heart_4;
var empty_heart_5;

var saphirs;
var swing;
var canSwing = false;
var newSwing;
var newSaphir;
var saphirs_compte;
var nombre_saphir = 0;
var saphirs_icon;
var gotSword = false;
var sword_icon;

var dash_icon;
var canDash = false;
var dash = 1;
var justDashed = false;

var flute;
var hasFlute = false;

var password = 0;
var newItem;
var new_mur_1;
var new_mur_2;
var new_mur_3;
var new_mur_4;
var green_tiles;

var moving = false;
var canCollect;

var position_x = 300;
var position_y = 300;

class SceneOne extends Phaser.Scene{
    constructor(){
        super("sceneOne");
        this.pad = null;
    }
    init(data){
    }
    preload(){   
        this.load.image('tiles', 'assets/tileset_placeholder.jpg');
        this.load.image('real_tiles', 'assets/map_1_placeholder_v4.png');
        this.load.tilemapTiledJSON('map_1', 'map_1.json')
        this.load.image('saphir', 'assets/gem_2.png'); 
        this.load.image('ennemi_1', 'assets/ennemi_1.png');
        this.load.image('chest', 'assets/chest.png');
        this.load.spritesheet('player', 'assets/spritesheet_3.png', {frameWidth: 73, frameHeight: 71});
        this.load.spritesheet('swing', 'assets/swing_spritesheet_2.png', {frameWidth: 72, frameHeight: 72});
        this.load.image('full_heart', 'assets/soul.png');
        this.load.image('empty_heart', 'assets/soul_perdue.png');
        this.load.image('sword_icon', 'assets/sword_icon.png');
        this.load.image('dash_icon', 'assets/dash_icon_2.png');
        this.load.image('stone_circle', 'assets/stone_circle.png');
        this.load.image('lock', 'assets/lock.png');
        this.load.image('tile_green', 'assets/tile_green.jpg');
        this.load.image('flute', 'assets/flute.png');
    }
    create(){
        
        //map
        //placeholder
        /*const map = this.make.tilemap({key: 'map_1_placeholder'});
        const tileset = map.addTilesetImage('tileset_placeholder', 'tiles');
        const terrain = map.createLayer('terrain', tileset, 0, 0);
        const bloquant = map.createLayer('bloquant', tileset, 0, 0);
        const zone = map.createLayer('zone', tileset, 0, 0);*/
        
        //real map
        const map = this.make.tilemap({key: 'map_1'});
        const tileset = map.addTilesetImage('map_1_placeholder_v4', 'real_tiles');
        const terrain = map.createLayer('terrain', tileset, 0, 0);
        const bloquant = map.createLayer('bloquant', tileset, 0, 0);
        const zone = map.createLayer('zone', tileset, 0, 0);

        bloquant.setCollisionByExclusion(-1, true);
        zone.setCollisionByExclusion(-1, true);

        //sprites
        player = this.physics.add.sprite(position_x, position_y, 'player');
        
        full_heart_1 = this.add.sprite(50,50, 'full_heart');
        full_heart_2 = this.add.sprite(100,50, 'full_heart');
        full_heart_3 = this.add.sprite(150,50, 'full_heart');
        full_heart_4 = this.add.sprite(200,50, 'full_heart');
        full_heart_5 = this.add.sprite(250,50, 'full_heart');
        
        empty_heart_1 = this.add.sprite(50,50, 'empty_heart').setVisible(false);
        empty_heart_2 = this.add.sprite(100,50, 'empty_heart').setVisible(false);
        empty_heart_3 = this.add.sprite(150,50, 'empty_heart').setVisible(false);
        empty_heart_4 = this.add.sprite(200,50, 'empty_heart').setVisible(false);
        empty_heart_5 = this.add.sprite(250,50, 'empty_heart').setVisible(false);
        
        saphirs_icon = this.add.sprite(350, 50, 'saphir').setScale(0.5);
        saphirs_icon.setScrollFactor(0);

        
        saphirs_compte = this.add.text(370, 35, nombre_saphir, { fontSize: '32px', fill: '#FFF' }).setScrollFactor(0);
        
        swing = this.physics.add.group();
        
        sword_icon = this.physics.add.sprite(50, 600, 'sword_icon');
        sword_icon.setScale(2);
        if (!canSwing){
            sword_icon.setVisible(false);
        }
        sword_icon.setScrollFactor(0);
        
        dash_icon = this.physics.add.sprite(100, 650, 'dash_icon');
        dash_icon.setScale(2);
        if (!canDash){
            dash_icon.setVisible(false);
        }
        dash_icon.setScrollFactor(0);
        
        flute = this.physics.add.sprite(150, 700, 'flute');
        flute.setScale(2);
        if (!hasFlute){
            flute.setVisible(false);
        }
        flute.setScrollFactor(0);
        
        //collisions et overlaps
        this.physics.add.collider(player, bloquant);
        this.physics.add.overlap(player, zone, changementZone, null, this);

        
        //changement de scene vers scene 2
        function changementZone(player, zone){
            if (player.y >= 730 && player.x >= 400 && player.x <= 560){
                //player.body.stop();
                this.scene.start("sceneTwo");
            }
            if (player.x >= 840 && player.x <= 880 && player.y >= 418 && player.y <= 421){
                this.scene.start("sceneThree");
            }
            if (player.x >= 1160){
                this.scene.start("sceneFour");
            }
            if (player.y <= 70){
                this.scene.start("sceneFive");
            }
        }
        
        
        //animations joueur
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'idle',
            frames: this.anims.generateFrameNumbers('player', {start:0, end: 0}),
            frameRate: 10,
            repeat: -1
        }),
        
        this.anims.create({
        key: 'swing_right',
        frames: this.anims.generateFrameNumbers('swing', { start: 3, end: 5}),
        frameRate: 10,
        repeat: -1
        });
        this.anims.create({
        key: 'swing_left',
        frames: this.anims.generateFrameNumbers('swing', { start: 6, end: 8 }),
        frameRate: 10,
        repeat: -1
        });
        this.anims.create({
        key: 'swing_up',
        frames: this.anims.generateFrameNumbers('swing', { start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
        });
        this.anims.create({
        key: 'swing_down',
        frames: this.anims.generateFrameNumbers('swing', { start: 9, end: 11}),
        frameRate: 10,
        repeat: -1
        });
        
        
        //clavier
        keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up : Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
        });
        
        //manette
        if (this.input.gamepad.total === 0){
            this.input.gamepad.once('connected', function (pad, button, index) {
                paddle = pad;
                padConnected = true;
            }); 
        }
        else {
            paddle = this.input.gamepad.pad1;
        }
            
    }
    
    update(){
            
            if (moving == true){
                moving = false;
            }
            //console.log(game.loop.actualFps);    
            if (player_hp == 4){
                full_heart_5.setVisible(false);
                empty_heart_5.setVisible(true);
            }
            else if (player_hp == 3){
                full_heart_5.setVisible(false);
                empty_heart_5.setVisible(true);
                full_heart_4.setVisible(false);
                empty_heart_4.setVisible(true);
            }
            else if (player_hp == 2){
                full_heart_5.setVisible(false);
                empty_heart_5.setVisible(true);
                full_heart_4.setVisible(false);
                empty_heart_4.setVisible(true);
                full_heart_3.setVisible(false);
                empty_heart_3.setVisible(true);
            }
            else if (player_hp == 1){
                full_heart_5.setVisible(false);
                empty_heart_5.setVisible(true);
                full_heart_4.setVisible(false);
                empty_heart_4.setVisible(true);
                full_heart_3.setVisible(false);
                empty_heart_3.setVisible(true);
                full_heart_2.setVisible(false);
                empty_heart_2.setVisible(true);
            }
            else if (player_hp == 0){
                full_heart_5.setVisible(false);
                empty_heart_5.setVisible(true);
                full_heart_4.setVisible(false);
                empty_heart_4.setVisible(true);
                full_heart_3.setVisible(false);
                empty_heart_3.setVisible(true);
                full_heart_2.setVisible(false);
                empty_heart_2.setVisible(true);
                full_heart_1.setVisible(false);
                empty_heart_1.setVisible(true);
                this.physics.pause();
                player.setTint(0xff0000);
                this.add.text(200, 280, 'You died, press F5 to try again !', { font: "48px Arial Black", fill: "#000" }).setScrollFactor(0);
            }    
        
            //mise à jour du compteur de saphirs
            saphirs_compte.setText(nombre_saphir);
            if (canDash){
                if (padConnected){
                    if (keys.shift.isDown && !justDashed || paddle.B && !justDashed){
                        justDashed = true;
                        dash = 3;
                        setTimeout(function(){dash = 1}, 600);
                    }
                    if (keys.shift.isUp && !paddle.B){
                        justDashed = false;
                    }
                }
                if (!padConnected){
                    if (keys.shift.isDown && !justDashed){
                        justDashed = true;
                        dash = 3;
                        setTimeout(function(){dash = 1}, 600);
                    }
                    if (keys.shift.isUp){
                        justDashed = false;
                    }
                }
            }
            //controles clavier
            if (!canSwing){
            //controles clavier
                if (!padConnected){
                    if (keys.right.isDown && keys.space.isUp && keys.up.isUp && keys.down.isUp){
                        player.setVelocityX(200 * dash);
                        player.anims.play('right', true);
                    }
                    else if (keys.left.isDown && keys.space.isUp && keys.up.isUp && keys.down.isUp){
                        player.setVelocityX(-200 * dash);
                        player.anims.play('left', true);
                    }
                    else if (keys.right.isUp && keys.left.isUp){
                        player.setVelocityX(0);
                    }
                    if (keys.up.isDown && keys.space.isUp && keys.left.isUp && keys.right.isUp){
                        player.setVelocityY(-200 * dash);
                        player.anims.play('up', true);
                    }
                    else if (keys.down.isDown && keys.space.isUp && keys.left.isUp && keys.right.isUp){
                        player.setVelocityY(200 * dash);
                        player.anims.play('down', true);
                    }
                    else if (keys.up.isUp && keys.down.isUp){
                        player.setVelocityY(0);
                    }
                    if (keys.up.isUp && keys.down.isUp && keys.left.isUp && keys.right.isUp){
                        player.anims.play('idle', true);
                    }
                }

                //controles manette
                if (padConnected){

                    if(paddle.right && !paddle.A && !paddle.up && !paddle.down || keys.right.isDown && keys.space.isUp && keys.up.isUp && keys.down.isUp){
                        player.setVelocityX(200 * dash);
                        player.anims.play('right', true);
                    }
                    else if(paddle.left && !paddle.A && !paddle.up && !paddle.down|| keys.left.isDown && keys.space.isUp && keys.up.isUp && keys.down.isUp){
                        player.setVelocityX(-200 * dash);
                        player.anims.play('left', true);
                    }
                    else if(!paddle.right && !paddle.left || keys.right.isUp && keys.left.isUp){
                        player.setVelocityX(0);
                    }
                    if(paddle.up && !paddle.A && !paddle.left && !paddle.right || keys.up.isDown && keys.space.isUp && keys.left.isUp && keys.right.isUp){
                        player.setVelocityY(-200 * dash);
                        player.anims.play('up', true);
                    }
                    else if(paddle.down && !paddle.A && !paddle.left && !paddle.right || keys.down.isDown && keys.space.isUp && keys.left.isUp && keys.right.isUp){
                        player.setVelocityY(200 * dash);
                        player.anims.play('down', true);
                    }
                    else if(!paddle.up && !paddle.down || keys.up.isUp && keys.down.isUp){
                        player.setVelocityY(0);
                    }
                    if (keys.up.isUp && keys.down.isUp && keys.left.isUp && keys.right.isUp && !paddle.up && !paddle.down && !paddle.left && !paddle.right){
                        player.anims.play('idle', true);
                    }
                }
            }
        
            if (canSwing == true){
                
                //clavier
                if (!padConnected){
                    if (keys.right.isDown && keys.space.isUp && keys.up.isUp && keys.down.isUp){
                        player.setVelocityX(200 * dash);
                        player.anims.play('right', true);
                    }
                    else if (keys.left.isDown && keys.space.isUp && keys.up.isUp && keys.down.isUp){
                        player.setVelocityX(-200 * dash);
                        player.anims.play('left', true);
                    }
                    else if (keys.right.isUp && keys.left.isUp){
                        player.setVelocityX(0);
                    }
                    if (keys.up.isDown && keys.space.isUp && keys.left.isUp && keys.right.isUp){
                        player.setVelocityY(-200 * dash);
                        player.anims.play('up', true);
                    }
                    else if (keys.down.isDown && keys.space.isUp && keys.left.isUp && keys.right.isUp){
                        player.setVelocityY(200 * dash);
                        player.anims.play('down', true);
                    }
                    else if (keys.up.isUp && keys.down.isUp){
                        player.setVelocityY(0);
                    }
                    if (keys.up.isUp && keys.down.isUp && keys.left.isUp && keys.right.isUp){
                        player.anims.play('idle', true);
                    }
                    if (keys.left.isDown && keys.space.isDown && keys.right.isUp && keys.up.isUp && keys.down.isUp){
                        canSwing = false;
                        player.setVelocity(0);
                        attaque(-50,0);
                        newSwing.anims.play('swing_left', true);
                        setTimeout(function(){newSwing.destroy()}, 200);
                        setTimeout(function(){canSwing = true}, 200);
                    }
                    if (keys.right.isDown && keys.space.isDown && keys.left.isUp && keys.up.isUp && keys.down.isUp){
                        canSwing = false;
                        player.setVelocity(0);
                        attaque(50,0);
                        newSwing.anims.play('swing_right', true);
                        setTimeout(function(){newSwing.destroy()}, 200);
                        setTimeout(function(){canSwing = true}, 200);
                    }
                    if (keys.up.isDown && keys.space.isDown && keys.right.isUp && keys.left.isUp && keys.down.isUp){
                        canSwing = false;
                        player.setVelocity(0);
                        attaque(0,-50);
                        newSwing.anims.play('swing_up', true);
                        setTimeout(function(){newSwing.destroy()}, 200);
                        setTimeout(function(){canSwing = true}, 200);
                    }
                    if (keys.down.isDown && keys.space.isDown && keys.right.isUp && keys.up.isUp && keys.left.isUp){
                        canSwing = false;
                        player.setVelocity(0);
                        attaque(0,50);
                        newSwing.anims.play('swing_down', true);
                        setTimeout(function(){newSwing.destroy()}, 200);
                        setTimeout(function(){canSwing = true}, 200);
                    }
                }
                
                //manette
                if (padConnected){
                
                    if(paddle.right && keys.space.isUp && !paddle.up && !paddle.down || keys.right.isDown && keys.space.isUp && keys.up.isUp && keys.down.isUp){
                        player.setVelocityX(200 * dash);
                        player.anims.play('right', true);
                    }
                    else if(paddle.left && keys.space.isUp && !paddle.up && !paddle.down || keys.left.isDown && keys.space.isUp && keys.up.isUp && keys.down.isUp){
                        player.setVelocityX(-200 * dash);
                        player.anims.play('left', true);
                    }
                    else if(!paddle.right && !paddle.left && keys.right.isUp && keys.left.isUp){
                        player.setVelocityX(0);
                    }
                    if(paddle.up && keys.space.isUp && !paddle.left && !paddle.right|| keys.up.isDown && keys.space.isUp && keys.left.isUp && keys.right.isUp){
                        player.setVelocityY(-200 * dash);
                        player.anims.play('up', true);
                    }
                    else if(paddle.down && keys.space.isUp && !paddle.left && !paddle.right || keys.down.isDown && keys.space.isUp && keys.left.isUp && keys.right.isUp){
                        player.setVelocityY(200 * dash);
                        player.anims.play('down', true);
                    }
                    else if(!paddle.up && !paddle.down && keys.up.isUp && keys.down.isUp){
                        player.setVelocityY(0);
                    }
                    if (keys.up.isUp && keys.down.isUp && keys.left.isUp && keys.right.isUp && !paddle.up && !paddle.down && !paddle.left && !paddle.right){
                        player.anims.play('idle', true);
                    }

                    if (keys.left.isDown && keys.space.isDown && keys.right.isUp && keys.up.isUp && keys.down.isUp && !paddle.right && !paddle.up && !paddle.down || paddle.left && paddle.A && keys.right.isUp && keys.up.isUp && keys.down.isUp && !paddle.right && !paddle.up && !paddle.down){
                        canSwing = false;
                        player.setVelocity(0);
                        attaque(-50,0);
                        newSwing.anims.play('swing_left', true);
                        setTimeout(function(){newSwing.destroy()}, 200);
                        setTimeout(function(){canSwing = true}, 200);
                    }
                    if (keys.right.isDown && keys.space.isDown && keys.left.isUp && keys.up.isUp && keys.down.isUp && !paddle.left && !paddle.up && !paddle.down|| paddle.right && paddle.A && keys.left.isUp && keys.up.isUp && keys.down.isUp && !paddle.left && !paddle.up && !paddle.down){
                        canSwing = false;
                        player.setVelocity(0);
                        attaque(50,0);
                        newSwing.anims.play('swing_right', true);
                        setTimeout(function(){newSwing.destroy()}, 200);
                        setTimeout(function(){canSwing = true}, 200);
                    }
                    if (keys.up.isDown && keys.space.isDown && keys.right.isUp && keys.left.isUp && keys.down.isUp && !paddle.left && !paddle.right && !paddle.down || paddle.up && paddle.A && keys.right.isUp && keys.left.isUp && keys.down.isUp && !paddle.left && !paddle.right && !paddle.down){
                        canSwing = false;
                        player.setVelocity(0);
                        attaque(0,-50);
                        newSwing.anims.play('swing_up', true);
                        setTimeout(function(){newSwing.destroy()}, 200);
                        setTimeout(function(){canSwing = true}, 200);
                    }
                    if (keys.down.isDown && keys.space.isDown && keys.right.isUp && keys.up.isUp && keys.left.isUp && !paddle.left && !paddle.right && !paddle.up || paddle.down && paddle.A && keys.right.isUp && keys.up.isUp && keys.left.isUp && !paddle.left && !paddle.right && !paddle.up){
                        canSwing = false;
                        player.setVelocity(0);
                        attaque(0,50);
                        newSwing.anims.play('swing_down', true);
                        setTimeout(function(){newSwing.destroy()}, 200);
                        setTimeout(function(){canSwing = true}, 200);
                    }
                }
            }
        }
    }
function attaque(x, y){
    newSwing = swing.create(player.x + x, player.y + y, 'swing');
}