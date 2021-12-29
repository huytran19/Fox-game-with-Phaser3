import Phaser from 'phaser'

export default class GameWin extends Phaser.Scene
{
    constructor()
    {
        super('game-win')
    }

    create()
    {
        const { width, height } = this.scale

        const x = width * 0.5
        const y = height * 0.5
        // this.add.image(this.scale.width / 2, this.scale.height - 50, 'enter')
        this.add.bitmapText(width / 2, height / 2, '8bit', 'YOU WIN!', 10).setOrigin(0.5, 0.5)

        this.input.keyboard.once('keydown-ENTER', () => {
            this.scene.start('game')
        })
    }
}