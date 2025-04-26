
// You can write more code here

import CarTrafficGame from "../games/carTraffic/CarTrafficGame";
import TankBattleGame from "../games/tankBattle/TankBattleGame";

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// container_2
		const container_2 = this.add.container(315, 332);

		// container_1
		const container_1 = this.add.container(626, 0);
		container_2.add(container_1);

		// ellipse_1
		const ellipse_1 = this.add.ellipse(12, 232, 128, 128);
		ellipse_1.scaleX = 4.5;
		ellipse_1.isStroked = true;
		ellipse_1.lineWidth = 2;
		container_1.add(ellipse_1);

		// rectangle
		const rectangle = this.add.rectangle(12, 0, 480, 480);
		rectangle.isFilled = true;
		container_1.add(rectangle);

		// container
		const container = this.add.container(0, 0);
		container_2.add(container);

		// ellipse
		const ellipse = this.add.ellipse(12, 232, 128, 128);
		ellipse.scaleX = 4.5;
		ellipse.isStroked = true;
		ellipse.lineWidth = 2;
		container.add(ellipse);

		// rectangle_1
		const rectangle_1 = this.add.rectangle(12, 0, 480, 480);
		rectangle_1.isFilled = true;
		container.add(rectangle_1);

		this.ellipse_1 = ellipse_1;
		this.rectangle = rectangle;
		this.container_1 = container_1;
		this.ellipse = ellipse;
		this.rectangle_1 = rectangle_1;
		this.container = container;

		this.events.emit("scene-awake");
	}

	private ellipse_1!: Phaser.GameObjects.Ellipse;
	private rectangle!: Phaser.GameObjects.Rectangle;
	private container_1!: Phaser.GameObjects.Container;
	private ellipse!: Phaser.GameObjects.Ellipse;
	private rectangle_1!: Phaser.GameObjects.Rectangle;
	private container!: Phaser.GameObjects.Container;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		this.setWeightLines(this.ellipse, 0xffffff);
		this.setWeightLines(this.ellipse_1, 0xffffff);

		this.setGames();
	}

	carTrafficGame!: Phaser.Scene;
	tankBattleGame!: Phaser.Scene;
	games!: Phaser.Scene[];

	setWeightLines(ellipse: Phaser.GameObjects.Ellipse, color: number): void {
		const { x, y, width, scaleX } = ellipse;

		const erx = width / 2 * scaleX;
		const lx = x - erx;

		const line = this.add.graphics({ lineStyle: { width: 2, color } });
		line.name = "weightLine";
		ellipse.parentContainer.add(line);
		const y1 = -this.scale.height * 4;
		line.lineBetween(lx, y, x, y1);
		line.lineBetween(x, y1, x + erx, y);
	}

	setGames(): void {
		this.carTrafficGame = this.scene.add("CarTrafficGame", CarTrafficGame) as Phaser.Scene;
		this.rectangle_1.setVisible(false);
		this.scene.launch(this.carTrafficGame, this.rectangle_1);
		this.carTrafficGame.scene.pause();

		this.tankBattleGame = this.scene.add("TankBattleGame", TankBattleGame) as Phaser.Scene;
		this.rectangle.setVisible(false);
		this.scene.launch(this.tankBattleGame, this.rectangle);
		this.tankBattleGame.scene.pause();

		this.games = [this.carTrafficGame, this.tankBattleGame];

		this.input.on("lose", () => {
			this.finish(false);
		});

		this.input.keyboard?.on("keydown", (event: any) => {
			console.log("event", event.code);
			if (event.code === "Digit1") {
				this.setActiveGame(0);
			} else if (event.code === "Digit2") {
				this.setActiveGame(1);
			}
		});
	}

	activeGameIndex!: number;
	setActiveGame(gameIndex: number): void {
		this.activeGameIndex = gameIndex;
		this.games.forEach((game, index) => {
			const isActive: boolean = index === gameIndex;
			if (isActive) {
				if (game.scene.isPaused()) {
					game.scene.resume();
				}
			} else {
				if (game.scene.isActive()) {
					game.scene.pause();
				}
			}
		});
		this.setWeights();
	}

	tweenGames!: Phaser.Tweens.Tween[];
	setWeights(): void {
		this.tweenGames?.forEach(tweenGame => {
			tweenGame.stop();
			tweenGame.destroy();
		});

		let activeContainer: Phaser.GameObjects.Container;
		let notActiveContainer: Phaser.GameObjects.Container;
		if (!this.activeGameIndex) {
			activeContainer = this.container;
			notActiveContainer = this.container_1;
		} else {
			activeContainer = this.container_1;
			notActiveContainer = this.container;
		}

		const stepY = 10;		
		const maxDistance = this.scale.height - (activeContainer.getBounds().bottom + stepY);
		const stepsAmount = Math.floor(maxDistance / stepY);


		const offsetY: number = stepY * stepsAmount + stepY;
		// const duration: number = stepsAmount * 1000;
		const duration: number = 1 * 1000;

		const callback1 = () => {
			if (activeContainer.getBounds().bottom + stepY >= this.scale.height) {
				this.finish(false);
			}
		};
		const tweenGame1 = this.tweens.add({
			targets: activeContainer,
			y: activeContainer.y + offsetY,
			duration,
			onUpdate: () => {
				this.carTrafficGame.cameras.main.y = this.rectangle_1.getBounds().y;
			},
			onComplete: () => {
				callback1();
			},
			onStop: () => {
				callback1();
			}
		});

		const callback2 = () => {	// not needed
			// if (notActiveContainer.getBounds().top - stepY <= 0) {
			// 	this.finish(false);
			// }
		}
		const tweenGame2 = this.tweens.add({
			targets: notActiveContainer,
			y: notActiveContainer.y - offsetY,
			duration,
			onUpdate: () => {
				this.tankBattleGame.cameras.main.y = this.rectangle.getBounds().y;
			},
			onComplete: () => {
				callback2();
			},
			onStop: () => {
				callback2();
			}
		});
		this.tweenGames = [tweenGame1, tweenGame2];
	}

	finish(isWin: boolean): void {
		console.log("finish");
		if (isWin) {

		} else {
			this.games.forEach(game => {
				if (game.scene.isActive()) {
					game.scene.pause();
				}
			});

			let activeContainer: Phaser.GameObjects.Container;
			let activeEllipse: Phaser.GameObjects.Ellipse;
			if (!this.activeGameIndex) {
				activeContainer = this.container;
				activeEllipse = this.ellipse;
			} else {
				activeContainer = this.container_1;
				activeEllipse = this.ellipse_1;
			}

			activeEllipse.strokeColor = 0xff0000;

			const line = activeContainer.getByName("weightLine") as Phaser.GameObjects.Graphics;
			activeContainer.remove(line, true);

			this.setWeightLines(activeEllipse, 0xff0000);

			this.scene.pause();
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
