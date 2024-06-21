import {ImageSource, Sound, Resource, Loader} from 'excalibur';

// voeg hier jouw eigen resources toe
const Resources = {
	Porsche: new ImageSource('images/porsche.png'),
	SteeringWheel: new ImageSource('images/steering-wheel.png'),
	MenuBackground: new ImageSource('images/menu-background.png'),
	PlayButton: new ImageSource('images/play-button.png'),
	GarageButton: new ImageSource('images/garage-button.png'),
	DealershipButton: new ImageSource('images/dealership-button.png')
};

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
	ResourceLoader.addResource(res);
}

export {Resources, ResourceLoader};
