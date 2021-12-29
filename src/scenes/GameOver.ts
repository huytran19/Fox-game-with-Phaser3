import Phaser from 'phaser'

export default class GameOver extends Phaser.Scene
{
    constructor()
    {
        super('game-over')
    }

    create()
    {
        const { width, height } = this.scale

        const x = width * 0.5
        const y = height * 0.5

        const title = this.add.image(this.scale.width / 2, 60, 'title')
        title.setOrigin(0.5, 0.5)
        // this.add.image(this.scale.width / 2, this.scale.height - 50, 'enter')
        this.add.bitmapText(width / 2, height - 100, '8bit', 'Press ENTER to play', 10).setOrigin(0.5, 0.5)
        this.add.bitmapText(width / 2, height - 70, '8bit', 'How to play', 8).setOrigin(0.5, 0.5)
        this.add.bitmapText(width / 2, height - 50, '8bit', 'Arrow Up: Jump', 6).setOrigin(0.5, 0.5)
        this.add.bitmapText(width / 2, height - 40, '8bit', 'Arrow Down: Fall attack', 6).setOrigin(0.5, 0.5)

        this.input.keyboard.once('keydown-ENTER', () => {
            this.scene.start('game')
        })
    }
}