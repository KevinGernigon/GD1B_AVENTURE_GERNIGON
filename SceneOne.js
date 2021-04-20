var player;
var keys;

class SceneOne extends Phaser.Scene{
    constructor(){
        super("sceneOne");
    }
    init(data){
    }
    preload(){   
        this.load.image('tiles', 'assets/tileset_placeholder.jpg');
        this.load.tilemapTiledJSON('map_1_placeholder', 'map_1_placeholder.json');
        this.load.spritesheet('player', 'assets/player_spritesheet.png', {frameWidth: 32, frameHeight: 32});
    }
    create(){
        
        const map = this.make.tilemap({key: 'map_1_placeholder'});
        const tileset = map.addTilesetImage('tileset_placeholder', 'tiles');
        const terrain = map.createStaticLayer('terrain', tileset, 0, 0);
        const bloquant = map.createStaticLayer('bloquant', tileset, 0, 0);
        const zone = map.createStaticLayer('zone', tileset, 0, 0);

        bloquant.setCollisionByExclusion(-1, true);
        zone.setCollisionByExclusion(-1, true);

        player = this.physics.add.sprite(300, 300, 'player');

        this.physics.add.collider(player, bloquant);
        this.physics.add.overlap(player, zone, changementZone, null, this);

        
        
        function changementZone(player, zone){
            if (player.y >= 730 && player.x >= 400 && player.x <= 560){
                player.body.stop();
                this.scene.start("sceneTwo");
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
        frames: this.anims.generateFrameNumbers('player', { start: 3, end: 3 }),
        frameRate: 10,
        repeat: -1
        });
        
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
            
    }
    
    update(){
            
            console.log(game.loop.actualFps);    
        
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
    }
}