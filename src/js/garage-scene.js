import {Scene, ScreenElement, Actor, Vector, Keys} from 'excalibur';
import {Resources} from './resources';
import {player} from './player';
import {cars as carsData} from './car-data';

class Garage extends Scene {
	ui;

	constructor() {
		super();
	}

	onInitialize() {
		this.ui = new UI();
		this.add(this.ui);
	}

	onPreUpdate(engine) {
		if (engine.input.keyboard.wasPressed(Keys.Esc)) engine.goToScene('menu');
	}
}

console.log(player.cars);

class UI extends ScreenElement {
	background;
	carButtons = [];
	selectedCar = null;
	equipButton;
	exitButton;

	constructor() {
		super();
		this.background = Resources.GarageBackground;
	}

	onInitialize(engine) {
		this.graphics.use(this.background.toSprite());
		player.cars.forEach((carName, index) => {
			this.carButtons[carName] = new CarButton(carsData[carName], new Vector(200 + index * 150, 220), carName === player.car);
		});
		Object.keys(this.carButtons).forEach((name) => {
			this.carButtons[name].on('pointerup', () => {
				this.selectCar(name);
			});
			this.addChild(this.carButtons[name]);
		});
		this.equipButton = new EquipButton(new Vector(engine.drawWidth / 2 - 150, 575));
		this.exitButton = new ExitButton(new Vector(engine.drawWidth / 2 + 150, 575));
		this.addChild(this.equipButton);
		this.addChild(this.exitButton);
		this.selectCar(player.car);
	}

	selectCar(name) {
		this.selectedCar = name;

		Object.keys(this.carButtons).forEach((name) => {
			this.carButtons[name].deSelect();
		});

		this.carButtons[name].select();

		this.equipButton.carSelected(name);
	}
}

class CarButton extends Actor {
	carData;
	current;
	name;

	constructor(carData, pos, current) {
		super({pos});
		this.carData = carData;
		this.current = current;
		this.name = carData.name;
	}

	onInitialize() {
		this.graphics.use(this.carData.image.toSprite());
		this.on('pointerenter', () => {
			document.body.style.cursor = 'pointer';
		});
		this.on('pointerleave', () => {
			document.body.style.cursor = 'default';
		});
	}

	select() {
		this.scale = new Vector(1.5, 1.5);
	}

	deSelect() {
		this.scale = new Vector(1, 1);
	}
}

class EquipButton extends Actor {
	selectedCar = null;

	constructor(pos) {
		super({pos});
	}

	onInitialize() {
		this.graphics.use(Resources.EquippedButton.toSprite());
		this.on('pointerenter', () => {
			document.body.style.cursor = 'pointer';
		});
		this.on('pointerleave', () => {
			document.body.style.cursor = 'default';
		});
		this.on('pointerup', () => {
			if (!this.selectedCar) return;
			player.changeCar(this.selectedCar);
			this.graphics.use(Resources.EquippedButton.toSprite());
		});
	}

	carSelected(carName) {
		if (carName !== player.car) {
			this.selectedCar = carName;
			this.graphics.use(Resources.EquipButton.toSprite());
			return;
		}
		this.selectedCar = null;
		this.graphics.use(Resources.EquippedButton.toSprite());
	}
}

class ExitButton extends Actor {
	constructor(pos) {
		super({pos});
	}

	onInitialize(engine) {
		this.graphics.use(Resources.ExitButton.toSprite());
		this.on('pointerenter', () => {
			document.body.style.cursor = 'pointer';
		});
		this.on('pointerleave', () => {
			document.body.style.cursor = 'default';
		});
		this.on('pointerup', () => {
			engine.goToScene('menu');
		});
	}
}

export {Garage};
