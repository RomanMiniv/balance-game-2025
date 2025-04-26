export class CarManager {
    scene: Phaser.Scene;

    carTextureName: string;
    roadLaneCentersX: number[];

    cars: Phaser.Types.Physics.Arcade.ImageWithDynamicBody[][];

    constructor(scene: Phaser.Scene, carTextureName: string, roadLaneCentersX: number[]) {
        this.scene = scene;

        this.carTextureName = carTextureName;
        this.roadLaneCentersX = roadLaneCentersX;

        this.cars = [];
        for (let i = 0; i < this.roadLaneCentersX.length; i++) {
            this.cars.push([]);
        }

        this.carGenerator();
    }

    carGenerator(): void {
        const delay: number = Phaser.Math.Between(1, 3) * 1000;
        this.scene.time.addEvent({
            delay,
            repeat: -1,
            callback: () => {
                this.populateCars(Phaser.Math.Between(1, 3));
            }
        });
    }
    populateCars(amount: number): void {
        for (let i = 0; i < amount; i++) {
            this.createCar();
        }
    }

    createCar(): void {
        const roadLane: number = Phaser.Math.Between(0, this.roadLaneCentersX.length - 1);

        const carHeight: number = this.scene.textures.getFrame(this.carTextureName).height;
        const minCarSpace: number = carHeight * 2;

        const isSkip = this.cars[roadLane].some(car => car.getTopCenter().y <= minCarSpace);
        if (isSkip) {
            return;
        }

        const roadLaneCenterX: number = this.roadLaneCentersX[roadLane];

        const car = this.scene.physics.add.image(roadLaneCenterX, -carHeight, this.carTextureName)
            .setOrigin(.5)
            .setAngle(180)
            .setTintFill(0x00c6cf)
            .setVelocityY(Phaser.Math.Between(100, 200));
        this.cars[roadLane].push(car);
    }
}
