var ecran_controles;
var ecran_credits

var surOptions = false;
var surCredits = false;

class EcranTitre extends Phaser.Scene{
    constructor(){
        super("ecranTitre");
        this.pad = null;
    }
    init(data){
    }
    preload(){   
        this.load.image('fond_ecran_titre', 'assets/ecrans_titre_background.png');
        this.load.image('play_button', 'assets/play_button.png');
        this.load.image('credits_button', 'assets/credits_button.png');
        this.load.image('options_button', 'assets/options_button.png');
        this.load.image('controles', 'assets/ecran_controles.png');
        this.load.image('credits', 'assets/ecran_credits.png');
    }
    create(){
        
        keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up : Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            escape : Phaser.Input.Keyboard.KeyCodes.ESC
        });
        
        this.add.sprite(608, 384, 'fond_ecran_titre');
        var button_play = this.add.sprite(608, 300, 'play_button').setInteractive();
        var button_credits = this.add.sprite(458, 460, 'credits_button').setInteractive();
        var button_options = this.add.sprite(758, 460, 'options_button').setInteractive();
        
        
        button_play.on('pointerdown', function(){
            if (surCredits == false && surOptions == false){
                this.scene.start("sceneOne");
            }
        }, this);

        button_options.on('pointerdown', function(){
            ecran_controles.setVisible(true);
            surOptions = true;
        });

        button_credits.on('pointerdown', function(){
            ecran_credits.setVisible(true);
            surCredits = true;
        })
        
        
        ecran_credits = this.add.sprite(608, 384, 'credits').setVisible(false);
        ecran_controles = this.physics.add.sprite(608, 384, 'controles').setVisible(false).setScale(1.1);
    }
    update(){
        if (keys.escape.isDown){
            ecran_controles.setVisible(false);
            ecran_credits.setVisible(false);
            surOptions = false;
            surCredits = false;
        }
    }
}