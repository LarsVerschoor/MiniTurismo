import {cars as carsData} from './car-data';
import {Car} from './car';
import {circuits as circuitsData} from './circuit-data';

class Player {
	cars;
	carActors = [];
	car;
	credits;
	carActor;
	bestLaps = {};

	constructor({cars, car, credits}) {
		this.cars = cars; // array of id's
		this.cars.forEach((carName) => {
			this.carActors[carName] = new Car(carsData[carName]); // array of car actors
		});
		this.car = car ?? this.cars[1];
		this.carActor = this.carActors[this.car];
		this.credits = credits;
		Object.keys(circuitsData).forEach((circuitName) => {
			this.bestLaps[circuitName] = null;
		});
	}

	changeCar(carName) {
		this.car = carName;
		this.carActor = this.carActors[carName];
	}
}

const player = new Player({
	cars: ['porsche', 'ford', 'ferrari'],
	credits: 0
});

export {player};
