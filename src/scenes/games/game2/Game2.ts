
// You can write more code here

import Game from "../Game";
import { Player } from "./entities/Player";

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Game2 extends Game {

	constructor() {
		super({
			key: "Game2",
			physics: {
				default: "arcade",
				arcade: {
					// debug: true
				},
			}
		});

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.initGame();

		this.editorCreate();

		this.createBackground();

		this.createGame();
	}

	initGame(): void {
		const rectanglePlaceholder = this.scene.settings.data as Phaser.GameObjects.Rectangle;

		const { x, y, width, height } = rectanglePlaceholder.getBounds();
		this.cameras.main.setViewport(x, y, width, height);
		this.physics.world.setBounds(0, 0, width, height);
	}

	createGame(): void {
		this.createPlayer();
	}

	readonly tankTextureName: string = "tank_942658";

	playerTank!: Phaser.Physics.Arcade.Image;
	createPlayer(): void {
		this.playerTank = new Player(this, this.cameras.main.width / 2, this.cameras.main.height / 2, this.tankTextureName)
			.setOrigin(.5)
			.setTintFill(0xf9f871);
	}

	update(time: number, delta: number): void {
		this.playerTank.update();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
