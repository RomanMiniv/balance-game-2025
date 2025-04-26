
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Menu extends Phaser.Scene {

	constructor() {
		super("Menu");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// menuItems
		const menuItems = this.add.container(564.9999833106995, 173.75);

		// menuItem_1
		const menuItem_1 = this.add.container(75.00001668930054, 75.00000000000003);
		menuItems.add(menuItem_1);

		// text_1
		const text_1 = this.add.text(0, 0, "", {});
		text_1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 253, 29), Phaser.Geom.Rectangle.Contains);
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "Start new game";
		text_1.setStyle({ "fontSize": "3em" });
		menuItem_1.add(text_1);

		// ellipse_1
		const ellipse_1 = this.add.ellipse(0, 29, 14, 14);
		ellipse_1.isFilled = true;
		menuItem_1.add(ellipse_1);

		// menuItem
		const menuItem = this.add.container(75, 175.50000000000003);
		menuItems.add(menuItem);

		// text
		const text = this.add.text(0, 0, "", {});
		text.setInteractive(new Phaser.Geom.Rectangle(0, 0, 127, 29), Phaser.Geom.Rectangle.Contains);
		text.setOrigin(0.5, 0.5);
		text.text = "Options";
		text.setStyle({ "fontSize": "3em" });
		menuItem.add(text);

		// ellipse
		const ellipse = this.add.ellipse(0, 29, 14, 14);
		ellipse.isFilled = true;
		menuItem.add(ellipse);

		// menuItem_2
		const menuItem_2 = this.add.container(75, 276);
		menuItems.add(menuItem_2);

		// text_2
		const text_2 = this.add.text(0, 0, "", {});
		text_2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 127, 29), Phaser.Geom.Rectangle.Contains);
		text_2.setOrigin(0.5, 0.5);
		text_2.text = "Credits";
		text_2.setStyle({ "fontSize": "3em" });
		menuItem_2.add(text_2);

		// ellipse_2
		const ellipse_2 = this.add.ellipse(0, 29, 14, 14);
		ellipse_2.isFilled = true;
		menuItem_2.add(ellipse_2);

		this.menuItems = menuItems;

		this.events.emit("scene-awake");
	}

	private menuItems!: Phaser.GameObjects.Container;

	/* START-USER-CODE */


	// Write your code here

	create() {
		this.editorCreate();

		this.setEvents();

		(this.menuItems.list as Phaser.GameObjects.Container[]).forEach((menuItem, index) => {
			this.setMenuItem(menuItem, index, "Level");
		});

	}

	setEvents(): void {
		this.input.on("pointerover", () => {
			this.input.manager.setDefaultCursor("pointer");
		});
		this.input.on("pointerout", () => {
			this.input.manager.setDefaultCursor("auto");
		});
		this.events.on("shutdown", () => {
			this.input.manager.setDefaultCursor("auto");
		});
	}

	setMenuItem(menuItem: Phaser.GameObjects.Container, index: number, sceneName: string) {
		const [text, ellipse] = menuItem.list as [Phaser.GameObjects.Text, Phaser.GameObjects.Ellipse];

		const angle: number = (index % 2 == 0 ? 1 : -1) * 5;

		text.on("pointerover", () => {
			this.tweens.add({
				targets: text,
				angle,
				duration: 200
			});
			ellipse.fillColor = 0xf9f871;
		});
		text.on("pointerout", () => {
			this.tweens.add({
				targets: text,
				angle: 0,
				duration: 200
			});
			ellipse.fillColor = 0xffffff;
		});
		text.on("pointerdown", () => {
			text.removeInteractive();
			this.scene.start(sceneName);
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
