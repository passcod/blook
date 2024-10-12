include <BOSL2/std.scad>

eps = 0.01;
width = 120;
depth = 120;
water_h = 50;
plant_h = 100;
side_wall = 6;
back_wall_extra = 3;
bottom_wall = 5;
flange_h = 10;
flange_wall = 3;
flange_tolerance = 0.4;
water_hole_r = 3;
water_hole_spacing = 25;
water_hole_gap_to_wall = 10;
overflow_r = 2;

keyhole_top = 5;
keyhole_bot = keyhole_top * 2;
keyhole_len = keyhole_top/2 * 3;
keyhole_dep = 2.5;
keyhole_hol = side_wall - keyhole_dep;

// water hold
down(water_h + 20)
//!projection(cut = true) down(35)
difference() {
	union() {
		cuboid([width, depth, water_h], rounding=2, except=TOP, anchor=[-1,-1,-1]);

		// extra wall at back for screw support
		fwd(back_wall_extra) right(width*0.08) up(keyhole_bot)
		cuboid([width*0.84, back_wall_extra, water_h-keyhole_bot], rounding=1, except=[TOP,BACK], anchor=[-1,-1,-1]);
	}
	
	translate([side_wall-flange_tolerance, side_wall-flange_tolerance, bottom_wall]) cuboid(
		[width-side_wall*2+flange_tolerance*2, depth-side_wall*2+flange_tolerance*2, water_h-bottom_wall+0.01],
		rounding=2, except=TOP, anchor=[-1,-1,-1]
	);
	
	// overflows
	xcopies(2*width/9, n=4, sp=[width/6,0,0])
	translate([0, depth-side_wall/2, water_h+eps])
	back(eps) bottom_half()
	ycyl(h = side_wall+eps*2, r = overflow_r);

	// keyholes for screws
	xcopies(2*width/3, n=2, sp=[width/6,0,0]) up(-keyhole_top/2 + water_h - flange_h) {
		$fn = 20;

		back(keyhole_dep-back_wall_extra) xrot(90)
		linear_extrude(keyhole_dep+0.01)
		keyhole(l=keyhole_len, r1=keyhole_top/2, r2=keyhole_bot/2);

		back(keyhole_dep+keyhole_hol-back_wall_extra) xrot(90)
		linear_extrude(keyhole_hol+0.01)
		keyhole(l=keyhole_len, r1=keyhole_bot/2, r2=keyhole_bot/2);
	}
}

// plant pot
difference() {
	union() {
		// main body
		difference() {
			cuboid([width, depth, plant_h], rounding=2, except=BOTTOM, anchor=[-1,-1,-1]);
			translate([side_wall, side_wall, bottom_wall]) {
				cuboid(
					[width-side_wall*2, depth-side_wall*2, plant_h-bottom_wall+0.01],
					rounding=2, except=TOP, anchor=[-1,-1,-1]
				);
				up(plant_h-2-bottom_wall-0.01) cuboid(
					[width-side_wall*2, depth-side_wall*2, 2.02],
					rounding=-2, edges=TOP, anchor=[-1,-1,-1]
				);
			}
		}

		// flange
		translate([side_wall, side_wall, -flange_h]) cuboid(
			[width-side_wall*2, depth-side_wall*2, flange_h],
			rounding=2, except=TOP, anchor=[-1,-1,-1]
		);
	}

	// dropped floor
	translate([side_wall+flange_wall, side_wall+flange_wall, -flange_h+bottom_wall-0.01]) cuboid([
		width-(side_wall*2+flange_wall*2),
		depth-(side_wall*2+flange_wall*2),
		(flange_h)+0.02
	], rounding=-2, edges=TOP, anchor=[-1,-1,-1]);

	// drainage
	translate([width/2, depth/2, -flange_h-0.01]) grid_copies(water_hole_spacing, size=[
		width-side_wall*2-flange_wall*2-water_hole_gap_to_wall*2,
		depth-side_wall*2-flange_wall*2-water_hole_gap_to_wall*2
	]) let($fn = 8) cylinder(h = bottom_wall+0.01, r = water_hole_r);
}