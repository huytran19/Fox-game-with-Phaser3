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
    }

    create()
    {
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

        this.scene.start('game')
    }
}