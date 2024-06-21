import {Scene, ScreenElement, Vector, Actor} from 'excalibur';
import {player} from './player';
import {Resources} from './resources';

class Menu extends Scene {
	ui;

	constructor() {
		super();
	}

	onInitialize() {
		this.ui = new UI();
		this.add(this.ui);
	}
}

class UI extends ScreenElement {
	background;
	constructor() {
		super();
		this.background = Resources.MenuBackground;
	}

	onInitialize(engine) {
		this.graphics.use(this.background.toSprite());
		this.playButton = new Button(new Vector(engine.drawWidth / 2 - 300, 575), Resources.PlayButton, 'spa-francorchamps');
		this.addChild(this.playButton);
		this.garageButton = new Button(new Vector(engine.drawWidth / 2, 575), Resources.GarageButton, '');
		this.addChild(this.garageButton);
		this.dealershipButton = new Button(new Vector(engine.drawWidth / 2 + 300, 575), Resources.DealershipButton, '');
		this.addChild(this.dealershipButton);
	}
}

class Button extends Actor {
	image;
	sceneId;

	constructor(pos, image, sceneId) {
		super({pos});
		this.image = image;
		this.sceneId = sceneId;
	}
	onInitialize(engine) {
		this.graphics.use(this.image.toSprite());
		this.on('pointerenter', () => {
			document.body.style.cursor = 'pointer';
		});
		this.on('pointerleave', () => {
			document.body.style.cursor = 'default';
		});
		this.on('pointerup', () => {
			engine.goToScene(this.sceneId);
		});
	}
}

export {Menu};
