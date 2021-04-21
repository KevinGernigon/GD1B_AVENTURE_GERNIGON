class SceneThree extends Phaser.Scene{
    constructor(){
        super("sceneThree");
        this.pad = null;
    }
    init(data){
    }
    preload(){   
        this.load.tilemapTiledJSON('house_1_placeholder', 'house_1_placeholder.json');
    }
    create(){
        
        //map
        const map = this.make.tilemap({key: 'house_1_placeholder'});
        const tileset = map.addTilesetImage('tileset_placeholder', 'tiles');
        const terrain = map.createLayer('terrain', tileset, 0, 0);
        const bloquant = map.createLayer('bloquant', tileset, 0, 0);
        const zone = map.createLayer('zone', tileset, 0, 0);
        const itemObjects = map.getObjectLayer('item').objects

        bloquant.setCollisionByExclusion(-1, true);
        zone.setCollisionByExclusion(-1, true);

        //sprites
        player = this.physics.add.sprite(610, 360, 'player');
        
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
        saphirs = this.physics.add.group({
            setScrollFactor : 0
        });
        saphirs_compte = this.add.text(370, 35, nombre_saphir, { fontSize: '32px', fill: '#FFF' }).setScrollFactor(0);
        
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
        
        items = this.physics.add.group();
        
        swing = this.physics.add.group();
        //collisions et overlaps
        this.physics.add.collider(player, bloquant);
        this.physics.add.collider(player, items, collecteCoffre, null, this);
        this.physics.add.overlap(player, zone, changementZone, null, this);

        for (const item of itemObjects){
            items.create(item.x, item.y, 'chest')
                .setPosition(item.x+32, item.y-32)
                .setScale(1)
        }
        
        function collecteCoffre(player, items){
            items.destroy();
            canSwing = true;
            sword_icon.setVisible(true);
        }
        //changement de scene vers scene 1
        function changementZone(player, zone){
            if (player.y >= 400){
                //player.body.stop();
                this.scene.start("sceneOne");
            }
        }
        
        
        //animations joueur
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
        frames: this.anims.generateFrameNumbers('player', { start: 3, end: 3 }),
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
            //console.log(game.loop.actualFps);    
            /*if (gotSword == true){
                sword_icon.setVisible(true);
            }*/
        
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
            }
        
            //controles clavier
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
                    if (keys.right.isDown){
                        player.setVelocityX(200 * dash);
                        player.anims.play('right', true);
                    }
                    else if (keys.left.isDown){
                        player.setVelocityX(-200 * dash);
                        player.anims.play('left', true);
                    }
                    else if (keys.right.isUp && keys.left.isUp){
                        player.setVelocityX(0);
                    }
                    if (keys.up.isDown){
                        player.setVelocityY(-200 * dash);
                        player.anims.play('up', true);
                    }
                    else if (keys.down.isDown){
                        player.setVelocityY(200 * dash);
                        player.anims.play('down', true);
                    }
                    else if (keys.up.isUp && keys.down.isUp){
                        player.setVelocityY(0);
                    }
                }

                //controles manette
                if (padConnected){

                    if(paddle.right || keys.right.isDown){
                        player.setVelocityX(200 * dash);
                        player.anims.play('right', true);
                    }
                    else if(paddle.left || keys.left.isDown){
                        player.setVelocityX(-200 * dash);
                        player.anims.play('left', true);
                    }
                    else if(!paddle.right && !paddle.left || keys.right.isUp && keys.left.isUp){
                        player.setVelocityX(0);
                    }
                    if(paddle.up || keys.up.isDown){
                        player.setVelocityY(-200 * dash);
                        player.anims.play('up', true);
                    }
                    else if(paddle.down || keys.down.isDown){
                        player.setVelocityY(200 * dash);
                        player.anims.play('down', true);
                    }
                    else if(!paddle.up && !paddle.down || keys.up.isUp && keys.down.isUp){
                        player.setVelocityY(0);
                    }
                }
            }
        
            if (canSwing == true){
                
                //clavier
                if (!padConnected){
                    if (keys.right.isDown){
                        player.setVelocityX(200 * dash);
                        player.anims.play('right', true);
                    }
                    else if (keys.left.isDown){
                        player.setVelocityX(-200 * dash);
                        player.anims.play('left', true);
                    }
                    else if (keys.right.isUp && keys.left.isUp){
                        player.setVelocityX(0);
                    }
                    if (keys.up.isDown){
                        player.setVelocityY(-200 * dash);
                        player.anims.play('up', true);
                    }
                    else if (keys.down.isDown){
                        player.setVelocityY(200 * dash);
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
                
                //manette
                if (padConnected){
                
                    if(paddle.right || keys.right.isDown){
                        player.setVelocityX(200 * dash);
                        player.anims.play('right', true);
                    }
                    else if(paddle.left || keys.left.isDown){
                        player.setVelocityX(-200 * dash);
                        player.anims.play('left', true);
                    }
                    else if(!paddle.right && !paddle.left && keys.right.isUp && keys.left.isUp){
                        player.setVelocityX(0);
                    }
                    if(paddle.up || keys.up.isDown){
                        player.setVelocityY(-200 * dash);
                        player.anims.play('up', true);
                    }
                    else if(paddle.down || keys.down.isDown){
                        player.setVelocityY(200 * dash);
                        player.anims.play('down', true);
                    }
                    else if(!paddle.up && !paddle.down && keys.up.isUp && keys.down.isUp){
                        player.setVelocityY(0);
                    }

                    if (keys.left.isDown && keys.space.isDown && keys.right.isUp && keys.up.isUp && keys.down.isUp && !paddle.right && !paddle.up && !paddle.down || paddle.left && paddle.A && keys.right.isUp && keys.up.isUp && keys.down.isUp && !paddle.right && !paddle.up && !paddle.down){
                        canSwing = false;
                        player.setVelocity(0);
                        attaque(-32,0);
                        newSwing.anims.play('swing_left', true);
                        setTimeout(function(){newSwing.destroy()}, 200);
                        setTimeout(function(){canSwing = true}, 200);
                    }
                    if (keys.right.isDown && keys.space.isDown && keys.left.isUp && keys.up.isUp && keys.down.isUp && !paddle.left && !paddle.up && !paddle.down|| paddle.right && paddle.A && keys.left.isUp && keys.up.isUp && keys.down.isUp && !paddle.left && !paddle.up && !paddle.down){
                        canSwing = false;
                        player.setVelocity(0);
                        attaque(32,0);
                        newSwing.anims.play('swing_right', true);
                        setTimeout(function(){newSwing.destroy()}, 200);
                        setTimeout(function(){canSwing = true}, 200);
                    }
                    if (keys.up.isDown && keys.space.isDown && keys.right.isUp && keys.left.isUp && keys.down.isUp && !paddle.left && !paddle.right && !paddle.down || paddle.up && paddle.A && keys.right.isUp && keys.left.isUp && keys.down.isUp && !paddle.left && !paddle.right && !paddle.down){
                        canSwing = false;
                        player.setVelocity(0);
                        attaque(0,-32);
                        newSwing.anims.play('swing_up', true);
                        setTimeout(function(){newSwing.destroy()}, 200);
                        setTimeout(function(){canSwing = true}, 200);
                    }
                    if (keys.down.isDown && keys.space.isDown && keys.right.isUp && keys.up.isUp && keys.left.isUp && !paddle.left && !paddle.right && !paddle.up || paddle.down && paddle.A && keys.right.isUp && keys.up.isUp && keys.left.isUp && !paddle.left && !paddle.right && !paddle.up){
                        canSwing = false;
                        player.setVelocity(0);
                        attaque(0,32);
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