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

        this.add.text(x, y, 'Press SPACE to Play Again', {
            fontSize: '28px',
            color: '#000000',
            shadow: { fill: true, blur: 0, offsetY: 0},
            padding: { left: 15, right: 15, top: 10, bottom: 10 }
        })
        .setOrigin(0.5)
    }
}