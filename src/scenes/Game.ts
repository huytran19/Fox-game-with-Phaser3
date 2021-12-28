import Phaser from 'phaser'
import TextureKeys from '~/consts/TextureKeys'
import Fox from '~/game/fox'
import Enemies from '~/game/Enemies'
import Piranha from '~/game/Piranha'

export default class Game extends Phaser.Scene
{
    private fox!: Fox
    private opossum!: Enemies
    private piranha!: Piranha
    private ground!: Phaser.GameObjects.TileSprite
    private background!: Phaser.GameObjects.TileSprite
    private gameSpeed: number = 150

	constructor() 
    {
		super('game')
	}

    create() 
    {
        this.sound.play('platform', {loop: true})
        const { width, height } = this.scale
        this.background = this.add.tileSprite(0, 0, width, height, 'background')
            .setOrigin(0, 0)
            .setScrollFactor(0, 0)
        this.ground = this.add.tileSprite(0, height - 32, width, height, 'ground')
            .setOrigin(0, 0)
            .setScrollFactor(0, 0)
        
        this.fox = new Fox(this, width * 0.2, height * 0.5)
        
        this.add.existing(this.fox)

        this.opossum = new Enemies(this, width + Phaser.Math.Between(100, 300), height * 0.7)
        this.piranha = new Piranha(this, width + Phaser.Math.Between(300, 500), height * 0.7)
        
        this.add.existing(this.opossum)
        this.add.existing(this.piranha)

        const bodyFox = this.fox.body as Phaser.Physics.Arcade.Body
        const bodyOpossum = this.opossum.body as Phaser.Physics.Arcade.Body
        const bodyPiranha = this.piranha.body as Phaser.Physics.Arcade.Body
        bodyFox.setCollideWorldBounds(true)
        this.physics.world.setBounds(
            0, 0,
            Number.MAX_SAFE_INTEGER, height - 32
        )
        this.cameras.main.startFollow(this.fox)
        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)
        this.cameras.main.setFollowOffset(-200, 0)

        bodyOpossum.setCollideWorldBounds(true)
        bodyPiranha.setCollideWorldBounds(true)
        bodyFox.setVelocityX(this.gameSpeed)
        bodyOpossum.setVelocityX(-this.gameSpeed * 0.4)
        this.physics.add.overlap(this.fox, this.opossum, this.handleHitEnemies, undefined, this)
        this.physics.add.overlap(this.fox, this.piranha, this.handleHitEnemies, undefined, this)
    }
    
    private handleHitEnemies(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
    {
        const fox = obj1 as Fox
        const enemy = obj2 as Enemies
        
        if (this.fox.attack) 
        {
            fox.body.velocity.y = -200
            
        } 
        else 
        {
            fox.killed()
            this.opossum.body.velocity.x = 0
            this.opossum.stopAnims()
            this.piranha.stopAnims()
        }
    }

    private loopOpossum()
    {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width
        const width = this.opossum.width

        if (this.opossum.x + width < scrollX)
        {
            this.opossum.x = Phaser.Math.Between(
                rightEdge + 100,
                rightEdge + 200
            )

            this.opossum.y = this.scale.height * 0.8
        }
    }

    private loopPiranha()
    {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width
        const width = this.piranha.width

        if (this.piranha.x + width < scrollX)
        {
            this.piranha.x = Phaser.Math.Between(
                rightEdge + 200,
                rightEdge + 300
            )

            this.piranha.y = this.scale.height * 0.8
        }
    }

    update(t: number, dt: number)  
    {
        this.background.setTilePosition(this.cameras.main.scrollX)
        this.ground.setTilePosition(this.cameras.main.scrollX)
        this.loopOpossum()
        this.loopPiranha()
    }
}

