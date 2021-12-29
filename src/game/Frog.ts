import Phaser from 'phaser'
import TextureKeys from '~/consts/TextureKeys'

export default class Frog extends Phaser.GameObjects.Container
{
    private frog!: Phaser.GameObjects.Sprite
    private bodyFrog!: Phaser.Physics.Arcade.Body
    private timeIdle: number

    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y)

        this.frog = scene.add.sprite(0, 0, TextureKeys.Enemies, 'frog-idle-1.png')
            .setOrigin(0.5, 1)
            .play(TextureKeys.FrogIdle)

        this.add(this.frog)

        scene.physics.add.existing(this)

        this.bodyFrog = this.body as Phaser.Physics.Arcade.Body
        this.bodyFrog.setSize(this.frog.width, this.frog.height - 12)
        this.bodyFrog.setOffset(this.frog.width * .5 - 36, -this.frog.height + 8)
        this.timeIdle = 0
    }

    preUpdate(t: number, dt: number)
    {
        if (this.bodyFrog.onFloor())
        {
            this.frog.play(TextureKeys.FrogIdle, true)
            this.timeIdle ++

            if (this.timeIdle >= 210) 
            {
                this.bodyFrog.velocity.y = -350
                this.timeIdle = 0
            }
        }
        else
        {
            if (this.bodyFrog.velocity.y < 0) {
                this.frog.play(TextureKeys.FrogJump, true)
            } else this.frog.play(TextureKeys.FrogFall, true)
        }
        
    }

    stopAnims()
    {
        this.frog.stop()
    }
}