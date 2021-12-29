import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
import GameOver from './scenes/GameOver'
import GameWin from './scenes/GameWin'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 500,
	height: 200,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 500 },
			debug: false
		}
	},
	scene: [Preloader, Game, GameOver, GameWin],
	scale: {
		zoom: 2.5
	},
	audio: {
		disableWebAudio: true
	}
}

export default new Phaser.Game(config)
