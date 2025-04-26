
// You can write more code here

import Game from "../Game";
import { Player } from "./entities/Player";
import { TankManager } from "./entities/TankManager";

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class TankBattleGame extends Game {

	constructor() {
		super({
			key: "TankBattleGame",
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

		this.createTankManager();

		this.physics.add.collider(this.tankManager.tanks, this.tankManager.tanks);
		this.physics.add.collider(this.playerTank, this.tankManager.tanks, this.hitTank, undefined, this);

		// this.createScore();
	}

	readonly tankTextureName: string = "tank_942658";

	playerTank!: Player;
	createPlayer(): void {
		this.playerTank = new Player(this, this.cameras.main.width / 2, this.cameras.main.height / 2, this.tankTextureName)
			.setOrigin(.5)
			.setTintFill(0xf9f871);
		this.data.set("player", this.playerTank);
	}

	tankManager!: TankManager;
	createTankManager(): void {
		this.tankManager = new TankManager(this, this.tankTextureName);
	}

	hitTank(): void {
		this.playerTank.setTintFill(0xff0000);
		this.scene.get("Level").input.emit("lose");
	}

	// score: number = 0;
	// scoreText!: Phaser.GameObjects.Text;
	// createScore(): void {
	// 	this.scoreText = this.add.text(20, 0, "", { color: "#fcb667", fontStyle: "bold" });
	// 	this.scoreText.setOrigin(0).setDepth(1);
	// 	this.scoreText.text = `Score: ${this.score}`;
	// 	this.scoreText.setStyle({ "fontSize": "3em" });
	// }
	// updateScore() {
	// 	this.scoreText.text = `Score: ${this.score}`;
	// }

	update(time: number, delta: number): void {
		this.playerTank.update();

		// this.updateScore();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
