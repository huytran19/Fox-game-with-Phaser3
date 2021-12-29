import Phaser from 'phaser'
import TextureKeys from '~/consts/TextureKeys'
import Fox from '~/game/fox'
import Frog from '~/game/Frog'
import Opossum from '~/game/Opossum'
import Piranha from '~/game/Piranha'

export default class Game extends Phaser.Scene
{
    private fox!: Fox
    private opossum!: Opossum
    private piranha!: Piranha
    private frog!: Frog
    private ground!: Phaser.GameObjects.TileSprite
    private background!: Phaser.GameObjects.TileSprite
    private gameSpeed!: number
    private scoreLabel!: Phaser.GameObjects.BitmapText
    private highScoreLabel!: Phaser.GameObjects.BitmapText
    private highScore = 0
    private gameRunning!: number

	constructor() 
    {
		super('game')
        this.highScore = 0
        this.gameSpeed
	}

    create() 
    {
        this.gameSpeed = 150
        this.gameRunning = 1
        this.sound.play('platform', {loop: true})
        const { width, height } = this.scale
        this.background = this.add.tileSprite(0, 0, width, height, 'background')
            .setOrigin(0, 0)
            .setScrollFactor(0, 0)
        this.ground = this.add.tileSprite(0, height - 32, width, height, 'ground')
            .setOrigin(0, 0)
            .setScrollFactor(0, 0)
        this.scoreLabel = this.add.bitmapText(10, 10, '8bit', `Score: 0`, 8).setScrollFactor(0).setOrigin(0)
        this.highScoreLabel = this.add.bitmapText(150, 10, '8bit', `Highscore: ${this.highScore}`, 8).setScrollFactor(0).setOrigin(0)
        this.fox = new Fox(this, width * 0.2, height * 0.5)
        this.add.existing(this.fox)

        this.frog = new Frog(this, width + Phaser.Math.Between(1000, 1700), height - 32)
        this.opossum = new Opossum(this, width + Phaser.Math.Between(100, 300), height - 32)
        this.piranha = new Piranha(this, width + Phaser.Math.Between(300, 500), height - 32)
        
        this.add.existing(this.opossum)
        this.add.existing(this.piranha)
        this.add.existing(this.frog)

        const bodyFox = this.fox.body as Phaser.Physics.Arcade.Body
        const bodyOpossum = this.opossum.body as Phaser.Physics.Arcade.Body
        const bodyPiranha = this.piranha.body as Phaser.Physics.Arcade.Body
        const bodyFrog = this.frog.body as Phaser.Physics.Arcade.Body
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
        bodyFrog.setCollideWorldBounds(true)
        this.physics.add.overlap(this.fox, this.opossum, this.handleHitEnemies, undefined, this)
        this.physics.add.overlap(this.fox, this.piranha, this.handleHitEnemies, undefined, this)
        this.physics.add.overlap(this.fox, this.frog, this.handleHitEnemies, undefined, this)
    }
    
    private handleHitEnemies(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
    {
        const fox = obj1 as Fox
        const enemy = obj2 as Opossum | Piranha | Frog
        
        if (this.fox.attack) 
        {
            fox.body.velocity.y = -150
            enemy.setVisible(false)
        } 
        else 
        {
            // if (this.fox.shieldOn)
            // {
            //     console.log('ALIVE')
            // }
            // else 
            // {
                if (this.fox.score > this.highScore)
                {
                    this.highScore = this.fox.score
                    this.highScoreLabel.text = `Highscore: ${this.highScore}`
                }
                fox.killed()
                this.gameRunning = 0
                this.opossum.stopAnims()
                this.piranha.stopAnims()
            // }
            
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
            this.opossum.setVisible(true)
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

            if (this.piranha.x - this.frog.x < 200) {
                this.frog.x += 200
            }

            this.piranha.y = this.scale.height * 0.8
            this.piranha.setVisible(true)
        }
    }

    private loopFrog()
    {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width
        const width = this.frog.width

        if (this.frog.x + width < scrollX)
        {
            this.frog.x = Phaser.Math.Between(
                rightEdge + 600,
                rightEdge + 1000
            )
            if (this.piranha.x - this.frog.x < 200) {
                this.frog.x += 200
            }

            this.frog.y = this.scale.height - 32
            this.frog.setVisible(true)
        }
    }

    update(t: number, dt: number)  
    {
        this.background.setTilePosition(this.cameras.main.scrollX)
        this.ground.setTilePosition(this.cameras.main.scrollX)
        this.loopOpossum()
        this.loopPiranha()
        this.loopFrog()
        this.scoreLabel.text = `Score: ${this.fox.score}`
        this.gameSpeed += 0.0005 
        this.fox.body.velocity.x = this.gameSpeed
        this.opossum.body.velocity.x = -this.gameSpeed * 0.4 * this.gameRunning
    }
}

