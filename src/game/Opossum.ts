import Phaser from 'phaser'
import TextureKeys from '~/consts/TextureKeys'

export default class Opossum extends Phaser.GameObjects.Container
{
    private opossum!: Phaser.GameObjects.Sprite
    private bodyOpossum!: Phaser.Physics.Arcade.Body

    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y)

        this.opossum = scene.add.sprite(0, 0, TextureKeys.Enemies, 'opossum-1.png')
            .setOrigin(0.5, 1)
            .play(TextureKeys.OpossumRun)

        this.add(this.opossum)

        scene.physics.add.existing(this)

        this.bodyOpossum = this.body as Phaser.Physics.Arcade.Body
        this.bodyOpossum.setSize(this.opossum.width, this.opossum.height - 8)
        this.bodyOpossum.setOffset(this.opossum.width * .5 - 36, -this.opossum.height + 8)
    }

    stopAnims()
    {
        this.opossum.stop()
    }
}