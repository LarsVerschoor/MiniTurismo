import '../css/style.css';
import {Actor, Engine, Vector, DisplayMode} from 'excalibur';
import {Resources, ResourceLoader} from './resources.js';
import {circuits} from './circuit-data.js';
import {Circuit} from './circuit-scene.js';

export class Game extends Engine {
	circuitIds = [];

	constructor() {
		super({
			width: 1440,
			height: 900,
			maxFps: 60,
			displayMode: DisplayMode.FitScreen
		});
		this.circuitIds = Object.keys(circuits);
		this.circuitIds.forEach((circuitId) => {
			const circuitData = circuits[circuitId];
			this.addScene(circuitId, new Circuit(circuitId, circuitData.getTrackJointsData(), circuitData.getTrackStraightsData()));
		});
		this.start(ResourceLoader).then(() => this.startGame());
	}

	startGame() {
		this.goToScene(this.circuitIds[0]);
	}
}

new Game();
