import {cars as carsData} from './car-data';
import {Car} from './car';

class Player {
	cars;
	car;
	credits;

	constructor({cars, car, credits}) {
		this.cars = cars;
		this.car = car ?? this.cars[0];
		this.credits = credits;
		this.carActor = new Car(carsData[this.car]);

		this.save();
	}

	save() {
		localStorage.setItem(
			'player',
			JSON.stringify({
				cars: this.cars,
				car: this.car,
				credits: this.credits
			})
		);
	}
}

const player = new Player(
	JSON.parse(localStorage.getItem('player')) ?? {
		cars: Object.keys(carsData),
		credits: 0
	}
);

export {player};
