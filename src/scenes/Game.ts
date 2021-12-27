import Phaser from 'phaser'
import TextureKeys from '~/consts/TextureKeys'
import Fox from '~/game/fox'

export default class Game extends Phaser.Scene
{
    private fox!: Fox
    private ground!: Phaser.GameObjects.TileSprite
    private background!: Phaser.GameObjects.TileSprite
    private gameSpeed: number = 100

	constructor() 
    {
		super('game')
	}

	preload() 
    {
         
    }

    create() 
    {
        const { width, height } = this.scale
        this.background = this.add.tileSprite(0, 0, width, height, 'background')
            .setOrigin(0, 0)
            .setScrollFactor(0, 0)
        this.ground = this.add.tileSprite(0, height - 32, width, height, 'ground')
            .setOrigin(0, 0)
            .setScrollFactor(0, 0)
        
        this.fox = new Fox(this, width * 0.2, height * 0.7)
        
        this.add.existing(this.fox)

        const body = this.fox.body as Phaser.Physics.Arcade.Body
        body.setCollideWorldBounds(true)
        this.physics.world.setBounds(
            0, 0,
            Number.MAX_SAFE_INTEGER, height - 32
        )
        this.cameras.main.startFollow(this.fox)
        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)
        this.cameras.main.setFollowOffset(-200, 0)

        body.setVelocityX(this.gameSpeed)

    }
    
    update(t: number, dt: number)  
    {
        this.background.setTilePosition(this.cameras.main.scrollX)
        this.ground.setTilePosition(this.cameras.main.scrollX)
    }
}

