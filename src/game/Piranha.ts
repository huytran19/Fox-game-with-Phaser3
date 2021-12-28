import Phaser from 'phaser'
import TextureKeys from '~/consts/TextureKeys'

export default class Piranha extends Phaser.GameObjects.Container
{
    private piranha!: Phaser.GameObjects.Sprite
    private bodyPiranha!: Phaser.Physics.Arcade.Body

    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y)

        this.piranha = scene.add.sprite(0, 0, TextureKeys.Piranha, 'piranha-plant-hurt1.png')
            .setOrigin(0.5, 1)
            .play(TextureKeys.Piranha)
            .setScale(0.7)

        this.add(this.piranha)

        scene.physics.add.existing(this)

        this.bodyPiranha = this.body as Phaser.Physics.Arcade.Body
        this.bodyPiranha.setSize(this.piranha.width * 0.35, this.piranha.height * 0.5)
        this.bodyPiranha.setOffset(this.piranha.width * .5 - this.piranha.width * 0.7, -this.piranha.height +  this.piranha.height * 0.5) 
    }

    stopAnims()
    {
        this.piranha.stop()
    }
}