import { Player } from "./Player";

export interface IPosition {
    x: number;
    y: number;
}

interface IZone {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export function getRandomPositionAtZone(innerZone: IZone, outerZone: IZone): IPosition {
    return {
        x: Phaser.Math.Between(0, 1) ? Phaser.Math.Between(outerZone.x1, innerZone.x1) : Phaser.Math.Between(innerZone.x2, outerZone.x2),
        y: Phaser.Math.Between(0, 1) ? Phaser.Math.Between(outerZone.y1, innerZone.y1) : Phaser.Math.Between(innerZone.y2, outerZone.y2)
    };
}

export class TankManager {
    scene: Phaser.Scene;

    tankTextureName: string;

    tanks: Phaser.Types.Physics.Arcade.ImageWithDynamicBody[];

    constructor(scene: Phaser.Scene, tankTextureName: string) {
        this.scene = scene;

        this.tankTextureName = tankTextureName;

        this.tanks = [];

        this.tankGenerator();
    }

    tankGenerator(): void {
        const delay: number = Phaser.Math.Between(1, 3) * 2000;
        this.scene.time.addEvent({
            delay,
            repeat: 1,
            callback: () => {
                this.populateTanks(Phaser.Math.Between(1, 3));
            }
        });
    }
    populateTanks(amount: number): void {
        for (let i = 0; i < amount; i++) {
            this.createTank();
        }
    }

    createTank(): void {
        const { x, y } = this.getRandomPositionOutPlayerSafeZone();

        const velocity = {
            x: this.getRandomVelocity(),
            y: this.getRandomVelocity()
        };
        
        const angularVelocity: number = (velocity.x - velocity.y) / 5;

        const tank = this.scene.physics.add.image(x, y, this.tankTextureName)
            .setOrigin(.5)
            .setAngle(180)
            .setTintFill(0x00c6cf)
            .setAngle(Phaser.Math.Between(0, 360))
            .setCollideWorldBounds()
            .setVelocity(velocity.x, velocity.y)
            .setBounce(1)
            .setAngularVelocity(angularVelocity);
        this.tanks.push(tank);
    }

    getRandomPositionOutPlayerSafeZone(): IPosition {
        const { x: pX, y: pY, safeZoneOffset } = (this.scene.data.get("player") as Player);
        const worldBounds = this.scene.physics.world.bounds;
        return getRandomPositionAtZone(
            { x1: pX - safeZoneOffset, y1: pY - safeZoneOffset, x2: pX + safeZoneOffset, y2: pY + safeZoneOffset },
            { x1: worldBounds.left, y1: worldBounds.top, x2: worldBounds.right, y2: worldBounds.bottom },
        );
    }

    getRandomVelocity(): number {
        const direction: number = Phaser.Utils.Array.GetRandom([-1, 1]);
        return direction * Phaser.Math.Between(25, 100);
    }
}
