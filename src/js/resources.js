import {ImageSource, Sound, Resource, Loader} from 'excalibur';

// voeg hier jouw eigen resources toe
const Resources = {
	Porsche: new ImageSource('images/porsche.png'),
	Ford: new ImageSource('images/ford.png'),
	Ferrari: new ImageSource('images/ferrari.png'),
	SteeringWheel: new ImageSource('images/steering-wheel.png'),
	MenuBackground: new ImageSource('images/menu-background.png'),
	GarageBackground: new ImageSource('images/garage-background.png'),
	PlayButton: new ImageSource('images/play-button.png'),
	GarageButton: new ImageSource('images/garage-button.png'),
	DealershipButton: new ImageSource('images/dealership-button.png'),
	EquipButton: new ImageSource('images/equip-button.png'),
	EquipButtonGrey: new ImageSource('images/equip-button-grey.png'),
	EquippedButton: new ImageSource('images/equipped-button.png'),
	ExitButton: new ImageSource('images/exit-button.png')
};

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
	ResourceLoader.addResource(res);
}

export {Resources, ResourceLoader};
