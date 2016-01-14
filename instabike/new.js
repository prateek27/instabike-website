// base height of positioning things on road is h-230
var w = window.innerWidth;
var h = window.innerHeight;
var bgColor = "#2ECCFA";
var platformLength= 6000*4; 
var section1 = 0;
var section2 = 3000;
var section3 = 7000;
var section4 = 10000;
var section5 = 13000;
var debug = true;
var game = new Phaser.Game(w,h,Phaser.CANVAS,'canvas',{preload:preload,create:create,update:update,render:render});
var style1 = { font:"50px Arial", fill: "#fff", align: "center" };
var hero;
var cursors;
var tree1;
var plant1;
var speed = 40;
var starting_point =0;
var direction = "right";

function preload(){
	//game.load.image('hero','assets/hero.png');
	game.load.image('ground','assets/ground.png');
	game.load.image('grass','assets/grass.png');
	game.load.image('tree1','assets/tree-bright-e.png');
	game.load.image('hero','assets/hero.png');
	game.load.image('plant1','assets/plant-lotus.png');
	game.load.image('cloud','assets/cloud.png');
	game.load.image('birds','assets/birds.png');
	game.load.image('school','assets/school.png');
	
	
	game.load.image('hometown','assets/hometown.png');
	game.load.image('hill','assets/mountain.png');
	game.load.image('treeS','assets/tree-dark-d.png');
	game.load.image('road','assets/road.png');
	game.load.image('banner','assets/banner.png');
	game.load.image('people','assets/people.png');
	game.load.image('building','assets/building.png');
	game.load.image('light','assets/streetlight.png');
	game.load.image('box','assets/box.png');
	game.load.image('board','assets/board.png');
	game.load.image('water','assets/water_corrected.png');
	game.load.image('water','assets/water_orange.png');
	game.load.image('bridge','assets/bridge.png');
	game.load.image('dock','assets/dock-floor.png');
	game.load.image('crane','assets/crane.png');
	game.load.image('board1','assets/board1.png');
	game.load.image('levelboard','assets/levelboard.png');
	game.load.image('gate','assets/gate.png');
	game.load.image('bus','assets/bus.png');
	game.load.image('review','assets/review.png');
	game.load.image('night','assets/night.png');

	game.load.atlasJSONHash('waterAtlas','assets/water_corrected.png','assets/water_running.json');
	


}

function create(){
	game.stage.backgroundColor =bgColor;
	game.world.setBounds(0, 0,platformLength,h);


	//Add Clouds
	for(var i=1000;i<platformLength;i+=1700){
		game.add.sprite(i,120,'cloud');
		game.add.sprite(i+400,75,'cloud');
	}
	
	//Add night mode
	night = game.add.tileSprite(0,0,platformLength,h,'night');
	night.alpha = 0;
	
	nightTween = game.add.tween(night);
	nightTween.to({alpha:1},5000);


	//Add Ground and Grass
	var ground = game.add.tileSprite(0,h-100,platformLength*2,200,'ground');
	ground.scale.setTo(0.5,0.5);

	var grass = game.add.tileSprite(0,h-100,platformLength*2,50,'grass');
	grass.scale.setTo(0.5,0.5);

	var grass2 = game.add.tileSprite(0,h-100,platformLength*2,50,'grass');
	grass2.scale.setTo(0.75,-0.75);

	
	var road = game.add.tileSprite(0,h-124,platformLength*2,24,'road');
	road.scale.setTo(1.5,1.5);


	//Add Street Lights
	for(var i=2000;i<platformLength;i+=1500){
		var light1 = game.add.sprite(i,h-430,'light');
		light1.scale.setTo(.85,.85);
	}

	// start gate
	var gate = game.add.sprite(section1+900,h-450,'gate');
	gate.scale.setTo(1.1,1.1);
	// add text
	
	game.add.text(section1 + 900 +90,h-400,"START", style1);

	//Add Main Banner
	var banner = game.add.sprite(section1+400,h-640,'banner');
	banner.scale.setTo(0.75,0.75);
	//nner = game.add.sprite(200,h-200-235,'mainbanner');

	//Add People
	var people = game.add.sprite(section1+1300,h-380,'people');
	people.scale.setTo(1,1);
	
	// Add level board why us
	var levelboard = game.add.sprite(section3,h-460,'levelboard');
	levelboard.scale.setTo(1.5,1.5);
	// add text
	
	var levelboard_about = game.add.sprite(section2,h-510,'levelboard');
	levelboard_about.scale.setTo(1.3,1.3);
	game.add.text(section2 + 50,h-450,"About \n Us", style1);
	// add text
	
	game.add.text(section3 + 50,h-370,"Why Us ?", style1);
	var levelboard = game.add.sprite(section4,h-460,'levelboard');
	levelboard.scale.setTo(1.1,1.1);
	// add text
	
	game.add.text(section4 + 50,h-370,"Team", style1);
	


	//Add trees
	tree1 = game.add.sprite(section1 + 2030,h-150-0.75*200,'tree1');
	tree1.scale.setTo(.4,.4);
	//Add trees

	tree2 = game.add.sprite(section1 +  1960,h-120-0.75*190,'treeS');
	tree2.scale.setTo(.45,.45);


	//Add Building
	var building = game.add.sprite(section1 + 2100,h-470,'building');
	building.scale.setTo(0.8,0.8);

	//Add trees
	tree1 = game.add.sprite(section1 + 2360,h-150-0.75*200,'tree1');
	tree1.scale.setTo(.4,.4);


	//Add trees
	tree2 = game.add.sprite(section1 + 2500,h-120-0.75*190,'treeS');
	tree2.scale.setTo(.45,.45);

	//add water
	var water = game.add.tileSprite(section2 + 1900,h-75,2190,600,'waterAtlas');
	water.scale.setTo(.5,.5);
	water.animations.add('run');
	water.animations.play('run',2,true);

	//Add bridge
	bridge = game.add.sprite(section2 + 2000,h-340,'bridge');
	bridge.alpha = .5;
	bridge.scale.setTo(1,.7);

	//Add why us
	for(var i=100;i<500;i+=45){
		var crane1 = game.add.sprite(section3 + 500,h-80-i,'crane');
		crane1.scale.setTo(0.5,0.5);
		var crane2 = game.add.sprite(section3 + 2400,h-80-i,'crane');
		crane2.scale.setTo(0.5,0.5);
	}

	for(var i=section3 + 500 ;i<section3 + 2400 + 50;i+=50){
		var crane1 = game.add.sprite(i,h-540,'crane');
		crane1.scale.setTo(0.5,-0.5);
		var crane2 = game.add.sprite(i,h-580,'crane');
		crane2.scale.setTo(0.5,0.5);
	
	}

	//Add boards
	/*
	for(var i=100;i<1700;i+=450){
		var board1 = game.add.sprite(4410+i,h-570,'board1');
		boards.push(board1);
		board1.scale.setTo(1,1);
		
	}*/
	board1 = game.add.sprite(section3 + 1950,h-570,'board1');
	board2 = game.add.sprite(section3 + 1950,h-570,'board1');
	board3 = game.add.sprite(section3 + 1950,h-570,'board1');
	board4 = game.add.sprite(section3 + 1950,h-570,'board1');

	Tween1 = game.add.tween(board1);
	Tween1.to({x:section3+580,y:h-570},1000);

	Tween2 = game.add.tween(board2);
	Tween2.to({x:section3 + 1030,y:h-570},1000);

	Tween3 = game.add.tween(board3);
	Tween3.to({x:section3 + 1500,y:h-570},1000);


    // add text
	var style = { font:"30px monospace", fill: "#fff", align: "left" };
	game.add.text(section3 + 580 + 50,h-450,"CHEAP \n Rs 5 \n Rs 10", style);
	game.add.text(section3 + 1030 + 50,h-450,"FAST \n Less waiting time \n ", style);
	game.add.text(section3 + 1500 + 50,h-450,"SAFETY \n Trained Drivers \n Helmets for Riders", style);
	game.add.text(section3 + 1950 + 50,h-450,"USER EXPERIENCE \n Friendly \n Easy to Book \n", style);


	//add bus
	bus = game.add.sprite(section3,h-350,'bus');
	bus.scale.setTo(1,1);

	busTween = game.add.tween(bus);
	busTween.to({x:section3,y:h-350},1000);

	//add cutomer reviews
	var review = game.add.sprite(section5,h-500,'review');
	review.scale.setTo(1,1);

	

	//Add hero 
	hero = game.add.sprite(100,-180-20,'hero');
	hero.scale.setTo(0.8,0.8);

	bridge2 = game.add.sprite(section2 + 1900,h-374,'bridge');
	bridge2.scale.setTo(1,1);

	var entryTween = game.add.tween(hero);
   	entryTween = game.add.tween(hero).to( { x:100,y: h-300 }, 2000, Phaser.Easing.Bounce.Out, true);
	entryTween.start();
	
	cursors = game.input.keyboard.createCursorKeys();
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.enable(hero);
	game.physics.arcade.enable(bus);



	//hero.fixedToCamera = true;
	game.camera.follow(hero);
	game.camera.follow(hero,Phaser.Camera.FOLLOW_PLATFORMER);

}	
function update(){
	hero.body.velocity.x = 0;
	if(cursors.right.isDown){
		hero.x +=speed;
		direction = "right";
		hero.scale.setTo(0.8,0.8);
	}
	else if(cursors.left.isDown){
		hero.x -=speed;
		direction ="left";
		hero.scale.setTo(-0.8,0.8);
	}
	if(hero.x<=200){
		hero.x = 200;
	}
	if(hero.x>platformLength/2 ){
		//hero.body.velocity.y += 10;
	}

	if(hero.x > section3 - 500){
		Tween1.start();
		Tween2.start();
		Tween3.start();
	}

	if(hero.x>4500){
		 bus.body.velocity.x = -200;
	}

	if(hero.x>section2 + 2900){
		 nightTween.start();
	}


	if(hero.x > 400){
				
	}


}

function showPlantsFromBottom(){

	var plantsTween = game.add.tween(hero);
	plantsTween.to({x:600,y:h-200-plant1.height},1000);
	entryTween.start();
}
function render(){
if(debug)
		{ 
			game.debug.spriteInfo(hero,32,32);
		
		}
}
