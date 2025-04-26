
// You can write more code here

import Game from "../Game";
import { CarManager } from "./entities/player/CarManager";
import { Player } from "./entities/player/Player";

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class CarTrafficGame extends Game {

	constructor() {
		super({
			key: "CarTrafficGame",
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

	create(): void {
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
		this.createRoad();

		this.createPlayer();

		this.createCarManager();

		this.carManager.cars.forEach(laneCars => {
			this.physics.add.collider(laneCars, laneCars);
			this.physics.add.collider(this.playerCar, laneCars, this.hitCar, undefined, this);
		});

		this.createScore();
	}

	readonly roadLaneCentersX: number[] = [52, 146, 240, 334, 428];
	road: Phaser.GameObjects.TileSprite[] = [];
	createRoad(): void {
		const roadTextureName: string = "road-ezgif.com-resize (2) (1)";
		const { width, height } = this.textures.getFrame(roadTextureName);
		for (let i = 0; i < this.cameras.main.height / height; i++) {
			const roadPart = this.add.tileSprite(0, 0, width, height, roadTextureName).setOrigin(0);
			roadPart.y = roadPart.height * i;
			this.road.push(roadPart);
		}
	}
	updateRoad(): void {
		this.road.forEach(roadPart => {
			roadPart.tilePositionY -= 1;
		});
	}

	readonly carTextureName: string = "car-top-view-icon (1) (1)";

	playerCar!: Phaser.Physics.Arcade.Image;
	createPlayer(): void {
		this.playerCar = new Player(this, this.roadLaneCentersX[2], this.cameras.main.height / 2, this.carTextureName)
			.setOrigin(.5)
			.setTintFill(0xf9f871);
	}

	carManager!: CarManager;
	createCarManager(): void {
		this.carManager = new CarManager(this, this.carTextureName, this.roadLaneCentersX);
	}

	score: number = 0;
	scoreText!: Phaser.GameObjects.Text;
	createScore(): void {
		this.scoreText = this.add.text(20, 0, "", { color: "#fcb667", fontStyle: "bold" });
		this.scoreText.setOrigin(0).setDepth(1);
		this.scoreText.text = `Score: ${this.score}`;
		this.scoreText.setStyle({ "fontSize": "3em" });
	}
	updateScore() {
		this.scoreText.text = `Score: ${this.score}`;
	}

	hitCar(): void {
		this.playerCar.setTintFill(0xff0000);
		this.scene.get("Level").input.emit("lose");
	}

	update(time: number, delta: number): void {
		this.updateRoad();

		this.playerCar.update();

		this.carManager.cars.forEach((laneCars) => {
			laneCars.forEach((car, index) => {
				if (car.getBottomCenter().y >= this.cameras.main.height) {
					this.score++;
					laneCars.splice(index, 1).forEach(_ => _.destroy(true));
				}
			});
		});

		this.updateScore();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
