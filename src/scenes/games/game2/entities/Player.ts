interface IInputControl {
    up: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    space: Phaser.Input.Keyboard.Key;
}

export class Player extends Phaser.Physics.Arcade.Image {
    private _inputControl!: IInputControl;

    private _velocity: number = 400;
    private _angle: number = 90;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        this._inputControl = (this.scene.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin).addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
        }) as IInputControl;
    }

    update() {
        this.move();
    }

    move(): void {
        if (this._inputControl.up.isDown) {
            this.setVelocityY(-this._velocity);
            this.angle = 0;
        }
        if (this._inputControl.down.isDown) {
            this.setVelocityY(this._velocity);
            this.angle = this._angle * 2;
        }
        if (this._inputControl.right.isDown) {
            this.setVelocityX(this._velocity);
            this.angle = this._angle;
        }
        if (this._inputControl.left.isDown) {
            this.setVelocityX(-this._velocity);
            this.angle = -this._angle;
        }
        if (!this.isMovable()) {
            this.setVelocity(0);
        }
    }
    isMovable(): boolean {
        return this._inputControl.down.isDown || this._inputControl.right.isDown || this._inputControl.left.isDown || this._inputControl.up.isDown;
    }
}
