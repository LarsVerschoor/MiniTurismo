import '../css/style.css';
import {Engine, DisplayMode} from 'excalibur';
import {ResourceLoader} from './resources.js';
import {circuits} from './circuit-data.js';
import {Circuit} from './circuit-scene.js';
import {Menu} from './menu-scene.js';

export class Game extends Engine {
	circuitIds = [];

	constructor() {
		super({
			width: 1440,
			height: 900,
			maxFps: Infinity,
			displayMode: DisplayMode.FitScreen
		});

		// adding circuit scenes
		this.circuitIds = Object.keys(circuits);
		this.circuitIds.forEach((circuitId) => {
			const circuitData = circuits[circuitId];
			this.addScene(circuitId, new Circuit(circuitId, circuitData.getTrackJointsData(), circuitData.getTrackStraightsData()));
		});

		// adding other scenes
		this.addScene('menu', new Menu());

		this.start(ResourceLoader).then(() => this.startGame());
	}

	startGame() {
		this.goToScene('menu');
	}
}

new Game();
