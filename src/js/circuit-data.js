import {Color, Vector} from 'excalibur';

const circuits = {};

class CircuitData {
	name; // : string = id of the circuit
	trackWidth; // : number = width of asphalt
	grassWidth; // : number = width of grass exceeding asphalt on either side
	waypoints; // : array = {x : number, y : number, checkpoint : boolean, start : boolean, finish : boolean}
	requiredCheckpoints; // : number (amount of checkpoints in this circuit)
	color; // : excalibur color object

	constructor(name, trackWidth, grassWidth, requiredCheckpoints, color, waypoints) {
		this.name = name;
		this.trackWidth = trackWidth;
		this.grassWidth = grassWidth;
		this.waypoints = waypoints;
		this.requiredCheckpoints = requiredCheckpoints;
		this.color = color;
	}

	getTrackJointsData() {
		const jointsData = [];
		this.waypoints.forEach((waypoint, index) => {
			const {x, y, checkpoint, start, finish} = waypoint;
			const next = (({x, y}) => ({x, y}))(this.waypoints[index + 1] || this.waypoints[0]);
			const rotation = Math.atan2(y - next.y, x - next.x);
			jointsData.push({
				pos: new Vector(x, y),
				rotation,
				checkpoint,
				start,
				finish,
				radius: this.trackWidth / 2,
				color: this.color,
				grassWidth: this.grassWidth
			});
		});
		return jointsData;
	}

	getTrackStraightsData() {
		const straightsData = [];
		this.waypoints.forEach((waypoint, index) => {
			const a = (({x, y}) => ({x, y}))(waypoint);
			const b = (({x, y}) => ({x, y}))(this.waypoints[index + 1] ?? this.waypoints[0]);
			const distance = Vector.distance(a, b);
			const rotation = Math.atan2(b.y - a.y, b.x - a.x);
			straightsData.push({
				pos: new Vector(a.x, a.y),
				distance,
				rotation,
				trackWidth: this.trackWidth,
				grassWidth: this.grassWidth,
				color: this.color
			});
		});
		return straightsData;
	}
}

circuits['spa-francorchamps'] = new CircuitData('spa-francorchamps', 130, 38, 3, Color.fromHex('#282525'), [
	{x: 897, y: 2050, checkpoint: false, start: true, finish: true},
	{x: 695, y: 2189, checkpoint: false, start: false, finish: false},
	{x: 229, y: 2491, checkpoint: false, start: false, finish: false},
	{x: 177, y: 2525, checkpoint: false, start: false, finish: false},
	{x: 120, y: 2535, checkpoint: false, start: false, finish: false},
	{x: 97, y: 2491, checkpoint: false, start: false, finish: false},
	{x: 225, y: 2209, checkpoint: false, start: false, finish: false},
	{x: 252, y: 2155, checkpoint: false, start: false, finish: false},
	{x: 280, y: 2100, checkpoint: false, start: false, finish: false},
	{x: 310, y: 2045, checkpoint: false, start: false, finish: false},
	{x: 342, y: 1990, checkpoint: false, start: false, finish: false},
	{x: 377, y: 1940, checkpoint: false, start: false, finish: false},
	{x: 416, y: 1893, checkpoint: false, start: false, finish: false},
	{x: 460, y: 1848, checkpoint: false, start: false, finish: false},
	{x: 504, y: 1805, checkpoint: false, start: false, finish: false},
	{x: 811, y: 1502, checkpoint: false, start: false, finish: false},
	{x: 856, y: 1458, checkpoint: false, start: false, finish: false},
	{x: 891, y: 1409, checkpoint: false, start: false, finish: false},
	{x: 918, y: 1354, checkpoint: false, start: false, finish: false},
	{x: 952, y: 1301, checkpoint: false, start: false, finish: false},
	{x: 994, y: 1256, checkpoint: false, start: false, finish: false},
	{x: 1046, y: 1222, checkpoint: false, start: false, finish: false},
	{x: 1103, y: 1200, checkpoint: false, start: false, finish: false},
	{x: 1163, y: 1185, checkpoint: false, start: false, finish: false},
	{x: 1225, y: 1175, checkpoint: false, start: false, finish: false},
	{x: 1278, y: 1146, checkpoint: false, start: false, finish: false},
	{x: 1329, y: 1112, checkpoint: false, start: false, finish: false},
	{x: 1675, y: 852, checkpoint: false, start: false, finish: false},
	{x: 1725, y: 815, checkpoint: false, start: false, finish: false},
	{x: 1776, y: 782, checkpoint: false, start: false, finish: false},
	{x: 1830, y: 750, checkpoint: false, start: false, finish: false},
	{x: 1884, y: 724, checkpoint: false, start: false, finish: false},
	{x: 1943, y: 700, checkpoint: false, start: false, finish: false},
	{x: 2001, y: 681, checkpoint: false, start: false, finish: false},
	{x: 2059, y: 662, checkpoint: false, start: false, finish: false},
	{x: 3279, y: 195, checkpoint: true, start: false, finish: false},
	{x: 3337, y: 173, checkpoint: false, start: false, finish: false},
	{x: 3396, y: 158, checkpoint: false, start: false, finish: false},
	{x: 3457, y: 163, checkpoint: false, start: false, finish: false},
	{x: 3507, y: 200, checkpoint: false, start: false, finish: false},
	{x: 3547, y: 245, checkpoint: false, start: false, finish: false},
	{x: 3600, y: 275, checkpoint: false, start: false, finish: false},
	{x: 3661, y: 266, checkpoint: false, start: false, finish: false},
	{x: 3717, y: 239, checkpoint: false, start: false, finish: false},
	{x: 3773, y: 216, checkpoint: false, start: false, finish: false},
	{x: 3833, y: 198, checkpoint: false, start: false, finish: false},
	{x: 3894, y: 199, checkpoint: false, start: false, finish: false},
	{x: 3944, y: 233, checkpoint: false, start: false, finish: false},
	{x: 3987, y: 278, checkpoint: false, start: false, finish: false},
	{x: 4311, y: 650, checkpoint: false, start: false, finish: false},
	{x: 4350, y: 698, checkpoint: false, start: false, finish: false},
	{x: 4375, y: 755, checkpoint: false, start: false, finish: false},
	{x: 4369, y: 815, checkpoint: false, start: false, finish: false},
	{x: 4327, y: 859, checkpoint: false, start: false, finish: false},
	{x: 4268, y: 876, checkpoint: false, start: false, finish: false},
	{x: 4209, y: 859, checkpoint: false, start: false, finish: false},
	{x: 4166, y: 815, checkpoint: false, start: false, finish: false},
	{x: 4128, y: 768, checkpoint: false, start: false, finish: false},
	{x: 4052, y: 669, checkpoint: false, start: false, finish: false},
	{x: 4014, y: 621, checkpoint: false, start: false, finish: false},
	{x: 3962, y: 591, checkpoint: false, start: false, finish: false},
	{x: 3902, y: 598, checkpoint: false, start: false, finish: false},
	{x: 3845, y: 617, checkpoint: false, start: false, finish: false},
	{x: 3083, y: 861, checkpoint: true, start: false, finish: false},
	{x: 3023, y: 877, checkpoint: false, start: false, finish: false},
	{x: 2965, y: 898, checkpoint: false, start: false, finish: false},
	{x: 2913, y: 931, checkpoint: false, start: false, finish: false},
	{x: 2870, y: 975, checkpoint: false, start: false, finish: false},
	{x: 2850, y: 1033, checkpoint: false, start: false, finish: false},
	{x: 2845, y: 1095, checkpoint: false, start: false, finish: false},
	{x: 2845, y: 1157, checkpoint: false, start: false, finish: false},
	{x: 2849, y: 1218, checkpoint: false, start: false, finish: false},
	{x: 2863, y: 1278, checkpoint: false, start: false, finish: false},
	{x: 2884, y: 1335, checkpoint: false, start: false, finish: false},
	{x: 2918, y: 1387, checkpoint: false, start: false, finish: false},
	{x: 2966, y: 1426, checkpoint: false, start: false, finish: false},
	{x: 3019, y: 1459, checkpoint: false, start: false, finish: false},
	{x: 3075, y: 1484, checkpoint: false, start: false, finish: false},
	{x: 3134, y: 1503, checkpoint: false, start: false, finish: false},
	{x: 3194, y: 1518, checkpoint: false, start: false, finish: false},
	{x: 3667, y: 1655, checkpoint: false, start: false, finish: false},
	{x: 3726, y: 1675, checkpoint: false, start: false, finish: false},
	{x: 3778, y: 1704, checkpoint: false, start: false, finish: false},
	{x: 3818, y: 1753, checkpoint: false, start: false, finish: false},
	{x: 3829, y: 1813, checkpoint: false, start: false, finish: false},
	{x: 3817, y: 1873, checkpoint: false, start: false, finish: false},
	{x: 3794, y: 1931, checkpoint: false, start: false, finish: false},
	{x: 3777, y: 1989, checkpoint: false, start: false, finish: false},
	{x: 3782, y: 2051, checkpoint: false, start: false, finish: false},
	{x: 3809, y: 2106, checkpoint: false, start: false, finish: false},
	{x: 3859, y: 2143, checkpoint: false, start: false, finish: false},
	{x: 3911, y: 2174, checkpoint: false, start: false, finish: false},
	{x: 4079, y: 2253, checkpoint: false, start: false, finish: false},
	{x: 4135, y: 2278, checkpoint: false, start: false, finish: false},
	{x: 4188, y: 2309, checkpoint: false, start: false, finish: false},
	{x: 4237, y: 2348, checkpoint: false, start: false, finish: false},
	{x: 4270, y: 2399, checkpoint: false, start: false, finish: false},
	{x: 4270, y: 2461, checkpoint: false, start: false, finish: false},
	{x: 4242, y: 2516, checkpoint: false, start: false, finish: false},
	{x: 4208, y: 2568, checkpoint: false, start: false, finish: false},
	{x: 4155, y: 2648, checkpoint: false, start: false, finish: false},
	{x: 4118, y: 2696, checkpoint: false, start: false, finish: false},
	{x: 4072, y: 2738, checkpoint: false, start: false, finish: false},
	{x: 4016, y: 2763, checkpoint: false, start: false, finish: false},
	{x: 3954, y: 2768, checkpoint: false, start: false, finish: false},
	{x: 3893, y: 2762, checkpoint: false, start: false, finish: false},
	{x: 3833, y: 2749, checkpoint: false, start: false, finish: false},
	{x: 3773, y: 2731, checkpoint: false, start: false, finish: false},
	{x: 3658, y: 2687, checkpoint: false, start: false, finish: false},
	{x: 3550, y: 2627, checkpoint: false, start: false, finish: false},
	{x: 3451, y: 2553, checkpoint: false, start: false, finish: false},
	{x: 3359, y: 2471, checkpoint: false, start: false, finish: false},
	{x: 3234, y: 2334, checkpoint: false, start: false, finish: false},
	{x: 3093, y: 2134, checkpoint: true, start: false, finish: false},
	{x: 2989, y: 1981, checkpoint: false, start: false, finish: false},
	{x: 2949, y: 1932, checkpoint: false, start: false, finish: false},
	{x: 2905, y: 1889, checkpoint: false, start: false, finish: false},
	{x: 2855, y: 1853, checkpoint: false, start: false, finish: false},
	{x: 2802, y: 1824, checkpoint: false, start: false, finish: false},
	{x: 2747, y: 1796, checkpoint: false, start: false, finish: false},
	{x: 2690, y: 1771, checkpoint: false, start: false, finish: false},
	{x: 2633, y: 1748, checkpoint: false, start: false, finish: false},
	{x: 2575, y: 1728, checkpoint: false, start: false, finish: false},
	{x: 2516, y: 1709, checkpoint: false, start: false, finish: false},
	{x: 2455, y: 1693, checkpoint: false, start: false, finish: false},
	{x: 2396, y: 1679, checkpoint: false, start: false, finish: false},
	{x: 2335, y: 1669, checkpoint: false, start: false, finish: false},
	{x: 2274, y: 1668, checkpoint: false, start: false, finish: false},
	{x: 2214, y: 1678, checkpoint: false, start: false, finish: false},
	{x: 2155, y: 1702, checkpoint: false, start: false, finish: false},
	{x: 2101, y: 1729, checkpoint: false, start: false, finish: false},
	{x: 1883, y: 1847, checkpoint: false, start: false, finish: false},
	{x: 1829, y: 1874, checkpoint: false, start: false, finish: false},
	{x: 1771, y: 1896, checkpoint: false, start: false, finish: false},
	{x: 1712, y: 1913, checkpoint: false, start: false, finish: false},
	{x: 1291, y: 2009, checkpoint: false, start: false, finish: false},
	{x: 1239, y: 2019, checkpoint: false, start: false, finish: false},
	{x: 1188, y: 2024, checkpoint: false, start: false, finish: false},
	{x: 1161, y: 2001, checkpoint: false, start: false, finish: false},
	{x: 1164, y: 1966, checkpoint: false, start: false, finish: false},
	{x: 1167, y: 1921, checkpoint: false, start: false, finish: false},
	{x: 1154, y: 1889, checkpoint: false, start: false, finish: false},
	{x: 1123, y: 1885, checkpoint: false, start: false, finish: false},
	{x: 1085, y: 1907, checkpoint: false, start: false, finish: false},
	{x: 1049, y: 1933, checkpoint: false, start: false, finish: false}
]);

export {circuits};
