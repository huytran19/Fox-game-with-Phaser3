import Phaser from 'phaser'
import TextureKeys from '~/consts/TextureKeys'

export default class Fox extends Phaser.GameObjects.Container
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private isJump: boolean = false
    private isGrounded: boolean = true
    private fox!: Phaser.GameObjects.Sprite
    private bodyFox!: Phaser.Physics.Arcade.Body

    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y)

        this.fox = scene.add.sprite(0, 0, TextureKeys.Fox, 'player-idle-1.png')
            .setOrigin(0.5, 1)
            .play(TextureKeys.FoxRun)
        
        this.add(this.fox)

        scene.physics.add.existing(this)

        this.bodyFox = this.body as Phaser.Physics.Arcade.Body
        this.bodyFox.setSize(this.fox.width - 8, this.fox.height - 8)
        this.bodyFox.setOffset(this.fox.width * -.5 + 4, -this.fox.height + 8)
        this.cursors = scene.input.keyboard.createCursorKeys()
    }

    preUpdate()
    {
        if (this.cursors.up.isDown && this.bodyFox.onFloor())
        { 
            this.bodyFox.velocity.y = -220
        }

        if (this.cursors.down.isDown && this.bodyFox.onFloor())
        {
            this.fox.play(TextureKeys.FoxCrouch, true)
            this.bodyFox.setSize(this.fox.width - 8, this.fox.height - 16)
            this.bodyFox.setOffset(this.fox.width * -.5 + 4, -this.fox.height + 16)
        }
        else
        {
            this.fox.play(TextureKeys.FoxRun, true)
            this.bodyFox.setSize(this.fox.width - 8, this.fox.height - 8)
            this.bodyFox.setOffset(this.fox.width * -.5 + 4, -this.fox.height + 8)
        }

        if (this.bodyFox.velocity.y < 0) 
        {
            this.fox.play(TextureKeys.FoxJump, true)
        }
        else if (this.bodyFox.velocity.y > 0)
        {
            this.fox.play(TextureKeys.FoxFall, true)
        }
        
    }
}