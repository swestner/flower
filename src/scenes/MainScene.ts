import { Cloud } from '../objects/Cloud'
import { Sun } from '../objects/Sun'
import { Flower } from '../objects/flower';

class MainScene extends Phaser.Scene {
	sun : Sun;
	cloud : Cloud;
	flower : Flower;
	writer : Phaser.GameObjects.Text;

	constructor() {
    super({
			key: 'Grows'
		});

	}
	
	preload() {
		Cloud.preLoad(this);
		Sun.preLoad(this);
		Flower.preLoad(this);	
	}

	create() {
		this.createSun();
		this.createCloud();
		this.createFlower();
		this.writer = this.add.text(400, 200, "");

	}

	update(time: number, delta:number) {
		const text = new Array<string>();
		this.flower.report(text);
		this.writer.setText(text);
	}

	

	createCloud(){
		this.cloud = new Cloud(this);
	}
	createSun(){
		this.sun = new Sun(this);
	}
	createFlower(){
		this.flower = new Flower(this, this.sun, this.cloud);
	}
}

export default MainScene;