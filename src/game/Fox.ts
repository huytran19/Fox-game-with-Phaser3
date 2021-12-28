import Phaser from 'phaser'
import TextureKeys from '~/consts/TextureKeys'

enum FoxState
{
    Running,
    Killed
}

export default class Fox extends Phaser.GameObjects.Container
{
    private foxState = FoxState.Running
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private fox!: Phaser.GameObjects.Sprite
    private bodyFox!: Phaser.Physics.Arcade.Body
    attack!: boolean
    loopSound!: boolean

    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y)

        this.fox = scene.add.sprite(0, 0, TextureKeys.Fox, 'player-idle-1.png')
            .setOrigin(0.5, 1)
            .play(TextureKeys.FoxRun)
        
        this.add(this.fox)

        scene.physics.add.existing(this)

        this.bodyFox = this.body as Phaser.Physics.Arcade.Body
        this.bodyFox.setSize(this.fox.width - 16, this.fox.height - 8)
        this.bodyFox.setOffset(this.fox.width * -.5 + 6, -this.fox.height + 8)
        this.cursors = scene.input.keyboard.createCursorKeys()
        this.attack = false
        this.loopSound = false
    }

    preUpdate()
    {
        const jumpSound = this.scene.sound.add('jump')
        const attackSound = this.scene.sound.add('attack')
        switch(this.foxState)
        {
            case FoxState.Running:
                {
                    if (this.bodyFox.onFloor())
                    {
                        this.attack = false
                        this.loopSound = false
                            if (this.cursors.up.isDown)
                            {   
                                this.bodyFox.velocity.y = -200
                                this.playSound(jumpSound, false)
                            }

                            else if (this.cursors.down.isDown)
                            {
                                this.fox.play(TextureKeys.FoxCrouch, true)
                                this.bodyFox.setSize(this.fox.width - 16, this.fox.height - 16)
                                this.bodyFox.setOffset(this.fox.width * -.5 + 10, -this.fox.height + 16)
                            } 

                            else
                            {
                                this.fox.play(TextureKeys.FoxRun, true)
                                this.bodyFox.setSize(this.fox.width - 16, this.fox.height - 8)
                                this.bodyFox.setOffset(this.fox.width * -.5 + 6, -this.fox.height + 8)
                            }
                    }
                    else
                    {
                        if (this.cursors.down.isDown)
                        {
                            this.bodyFox.velocity.y = 250
                            this.fox.play(TextureKeys.FoxFall, true)
                            this.playSound(attackSound, this.loopSound)
                            this.attack = true
                            this.loopSound = true
                        }

                        if (this.bodyFox.velocity.y < 0)
                        {
                            this.fox.play(TextureKeys.FoxJump, true)
                        }
                        else
                        {
                            this.fox.play(TextureKeys.FoxFall, true)
                        }
                    }
                    
                    break
                }

            case FoxState.Killed:
                {
                    this.bodyFox.setVelocity(0, 0)
                    setTimeout(() => {
                        // this.fox.play(TextureKeys.Destroy, true)
                    }, 1000)
                    setTimeout(() => {
                        this.fox.setVisible(false)
                        
                    }, 1600)
                    if (!this.fox.visible)
                    {
                        this.scene.scene.run('game-over')
                        if (this.cursors.space.isDown)
                        {
                            this.scene.scene.stop('game-over')
                            this.scene.scene.restart()
                        }
                    }
                    break
                }
        }


        
        
    }

    playSound(s: Phaser.Sound.BaseSound, loop: boolean)
    {
        if (!loop)
        {
            s.play()
        }
    }

    killed()
    {
        if (this.foxState != FoxState.Running)
        {
            return
        }
        this.foxState = FoxState.Killed
        this.fox.play(TextureKeys.FoxHurt)
        const losingSoung = this.scene.sound.add('losing')
        this.playSound(losingSoung, false)
    }
}