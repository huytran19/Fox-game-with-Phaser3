import Phaser from 'phaser'
import TextureKeys from '~/consts/TextureKeys'

export default class Preloader extends Phaser.Scene
{
    constructor()
    {
        super('preloader')
    }

    preload()
    {
        this.load.image('background', 'tiles/background.png')
        this.load.image('ground', 'tiles/platform1.png')
        this.load.atlas('fox', 'spritesheet/fox.png', 'spritesheet/fox.json')
        this.load.atlas('enemies', 'spritesheet/enemies.png', 'spritesheet/enemies.json')
        this.load.atlas('destroy', 'spritesheet/enemy-death.png', 'spritesheet/enemy-death.json')
        this.load.atlas('piranha', 'spritesheet/piranha.png', 'spritesheet/piranha.json')
        this.load.audio('jump', 'audio/cartoon-jump.mp3')
        this.load.audio('attack', 'audio/attack.wav')
        this.load.audio('losing', 'audio/losing.wav')
        this.load.audio('platform', 'audio/platform.mp3')
    }

    create()
    {

        // PLAYER
        this.anims.create({
            key: TextureKeys.FoxRun,
            frames: this.anims.generateFrameNames(TextureKeys.Fox, 
            {
                start: 1,
                end: 6,
                prefix: 'player-run-',
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: TextureKeys.FoxJump,
            frames: 
            [{
                key: TextureKeys.Fox,
                frame: 'player-jump-1.png'
            }]
        })
        this.anims.create({
            key: TextureKeys.FoxFall,
            frames: 
            [{
                key: TextureKeys.Fox,
                frame: 'player-jump-2.png'
            }]
        })
        this.anims.create({
            key: TextureKeys.FoxCrouch,
            frames: this.anims.generateFrameNames(TextureKeys.Fox, 
            {
                start: 1,
                end: 2,
                prefix: 'player-crouch-',
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: TextureKeys.FoxHurt,
            frames: 
            [{
                key: TextureKeys.Fox,
                frame: 'player-hurt-1.png'
            }]
        })
        

        // OPOSSUM
        this.anims.create({
            key: TextureKeys.OpossumRun,
            frames: this.anims.generateFrameNames(TextureKeys.Enemies, 
            {
                start: 1,
                end: 6,
                prefix: 'opossum-',
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        })

        // PIRANHA

        this.anims.create({
            key: TextureKeys.Piranha,
            frames: this.anims.generateFrameNames(TextureKeys.Piranha, 
            {
                start: 1,
                end: 8,
                prefix: 'piranha-plant-hurt',
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: TextureKeys.Destroy,
            frames: this.anims.generateFrameNames(TextureKeys.Destroy,
            {
                start: 1,
                end: 6,
                prefix: 'enemy-death-',
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: 0
        })

        this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background')
        .setOrigin(0, 0)
        .setScrollFactor(0, 0)

        const { width, height } = this.scale

        const x = width * 0.5
        const y = height * 0.5

        this.add.text(x, y, 'Press SPACE to Play', {
            fontSize: '28px',
            color: '#000000',
            shadow: { fill: true, blur: 0, offsetY: 0},
            padding: { left: 15, right: 15, top: 10, bottom: 10 }
        })
        .setOrigin(0.5)
        
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('game')
        })
    }
}