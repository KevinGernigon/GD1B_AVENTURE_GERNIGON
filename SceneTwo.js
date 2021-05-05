class SceneTwo extends Phaser.Scene{
    constructor(){
        super("sceneTwo");
        this.pad = null;
    }
    init(data){
    }
    preload(){
        this.load.tilemapTiledJSON('map_2_placeholder', 'map_2_placeholder.json');
        //this.load.image('player', 'assets/player.png'); 

    }
    create(){
        
        //map
        const map = this.make.tilemap({key: 'map_2_placeholder'});
        const tileset = map.addTilesetImage('tileset_placeholder', 'tiles');
        const terrain = map.createLayer('terrain', tileset, 0, 0);
        const bloquant = map.createLayer('bloquant', tileset, 0, 0);
        const zone = map.createLayer('zone', tileset, 0, 0);
        const ennemisObjects = map.getObjectLayer('ennemis').objects;
        const itemObjects = map.getObjectLayer('item').objects;
        
        bloquant.setCollisionByExclusion(-1, true);

        //sprites
        player = this.physics.add.sprite(485, 85, 'player');
        
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
         
        
        items = this.physics.add.group();
        
        ennemis = this.physics.add.group();
        
        saphirs = this.physics.add.group({
            setScrollFactor : 0
        });
        
        
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
        
        for (const ennemi of ennemisObjects){
            ennemis.create(ennemi.x, ennemi.y, 'ennemi_1')
                .setScale(0.2)
        }
        
        for (const item of itemObjects){
            items.create(item.x, item.y, 'chest')
                .setPosition(item.x+32, item.y-32)
                .setScale(1)
        }

        
        //collisions et overlaps
        this.physics.add.collider(player, bloquant);
        this.physics.add.collider(ennemis, bloquant);
        this.physics.add.collider(player, ennemis, hitOnPlayer, null, this);
        this.physics.add.overlap(swing, ennemis, cutCut, null, this);
        this.physics.add.overlap(player, zone, changementZone, null, this);
        this.physics.add.overlap(player, saphirs, collecteSaphir, null, this);
        this.physics.add.overlap(player, items, collecteCoffre, null, this);

        //this.physics.add.overlap(player, zone, changementZone);
        
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
        this.input.gamepad.once('connected', function (pad) {
            paddle = pad;
            this.padConnected = true;
        });
        
        if (this.input.gamepad.total === 0){
            this.input.gamepad.once('connected', function (pad, button, index) {
                paddle = pad;
                padConnected = true;
            }); 
        }
        else {
            paddle = this.input.gamepad.pad1;
        }
        
        
        //random UNUSED
        function getRandom(min, max) {
            return Math.random() * (max - min) + min;
        }
        
        function getRoundRandom(min, max){
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min +1)) + min;
        }
        
        //coup d'épée
        function cutCut(swing, ennemis){
            //console.log("cut");
            ennemis.destroy();
            newSaphir = saphirs.create(ennemis.x, ennemis.y, 'saphir').setScale(0.3);
            newSaphir.setAcceleration(0, -250);
            canCollect = false;
            setTimeout(function(){newSaphir.setAcceleration(0,200)}, 300);
            setTimeout(function(){newSaphir.setAcceleration(0,0); newSaphir.setVelocityY(0); canCollect = true}, 1200);
        }
        

        //retour scene 1  
        function changementZone(player, zone){
            if (player.y <= 60 && player.x >= 400 && player.x <= 560){
                //player.body.stop();
                position_x = 470;
                position_y = 680;
                moving = false;
                this.scene.start("sceneOne");
            }
        }
        
        //la thune
        function collecteSaphir(player, saphirs){
            if (canCollect){
                nombre_saphir = nombre_saphir +1;
                saphirs.destroy();
            }
        }
        
        //perte de vie quand un monstre est touché et frame d'invincibilité
        function hitOnPlayer(player, ennemis){
            if (invincible == false){
                player_hp = player_hp - 1;
                invincible = true;
                setTimeout(function(){invincible = false}, 1000);
            }
        }
        
        //le coffre
        function collecteCoffre(player, items){
            items.destroy();
            for (let i = 1; i < 11; i++){
                canCollect = false;
                setTimeout(function(){newSaphir = saphirs.create(items.x, items.y, 'saphir').setScale(0.3)}, i*300);
                setTimeout(function(){newSaphir.setVelocityY(-200)}, i*300);
                setTimeout(function(){newSaphir.setVelocityY(200)}, i*300 + 150);
                setTimeout(function(){newSaphir.setVelocityY(0)}, 300*(i+1) - 1);
                //setTimeout(function(){if (newSaphir.y >= 670){newSaphir.setVelocityY(0); newSaphir.setAcceleration(0,0)}}, 300*i + 1000);
            }
            setTimeout(function(){canCollect = true}, 3400);

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
        frames: this.anims.generateFrameNumbers('player', { start: 3, end: 3}),
        frameRate: 10,
        repeat: -1
        });
        
        //animation épée
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
        
        //pattern UNUSED
        /*pattern_1 = getRandom(1,2);
        pattern_2 = getRandom(1,2);
        pattern_3 = getRandom(1,2);
        pattern_4 = getRandom(1,2);
        numeroPattern = getRoundRandom(1,4);*/
            
        
        
    }
     
    update(){
            
            //gère la barre de vie
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
            //console.log(game.loop.actualFps);  
        
            //mise à jour du compteur de saphirs
            saphirs_compte.setText(nombre_saphir);
        
            //mouvement et gère les coups d'épée
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
                        attaque(0,80);
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
                
        
        //mouvement des ennemis
        for (const ennemi of ennemis.children.entries){
            if(!hasFlute){
                if (ennemi.body.blocked.right){
                    ennemi.setVelocityX(-100);
                }
                else if (ennemi.body.blocked.left){
                    ennemi.setVelocityX(100);
                }
                else if (moving == false){
                    ennemis.setVelocityX(-100);
                    moving = true;
                }
            }
            else{
                ennemi.setVelocity(0);
                ennemi.setTint(2E2);
            }
        }
        
    }   
        
}

//création des sprites épée
function attaque(x, y){
    newSwing = swing.create(player.x + x, player.y + y, 'swing');
}
