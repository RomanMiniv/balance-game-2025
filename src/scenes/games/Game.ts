export default class Game extends Phaser.Scene {
    createBackground(): void {
		const rectangle_1 = this.add.rectangle(0, 0, this.scale.width, this.scale.height).setOrigin(0);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 0x242424;
	}
}
