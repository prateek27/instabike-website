
//Input Keys
cursors = game.input.keyboard.createCursorKeys();




//Adding an input listener (Can be on any object including game)

	game.input.onDown.add(myfunc,this);

// Movements
//Either Camera can be moved or Object can be moved.

	if(camera_move==true && cursors.left.isDown){
		game.camera.x -= 10;
	}

	if(object_move==true && cursor.up.isDown){
		hero.x += 10;
	}

//Debug and Rendering
	game.debug.cameraInfo(game.camera, 500, 32);
    game.debug.spriteInfo(card, 32, 32);
    game.debug.text('Click to toggle sprite / camera movement with cursors', 32, 550);
    game.debug.inputInfo(input,32,32);

   //Follow a player
   game.camera.follow(player);

  //DeadZone in camera (Window in which camera wont move)
  	game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);



 //Game World
 game.world.setBounds(0,0,1920*2,1080);
//OR
  game.world.resize(6000, 600);


//Coordinates
game.world.centerX , game.world.centerY 
game.world.randomX , game.world.randomY



//Text in the game
 game.add.text(32, 32, "this text is on the background\nuse arrows to scroll", { font: "32px Arial", fill: "#f26c4f", align: "left" });


 //Adding sprites and fixing to camera.
  logo1 = game.add.sprite(100, 300, 'phaser');
  
  //Fixing to Camera
  logo1.fixedToCamera = true;
  mytext.fixedToCamera = true;

// An animated Tween
  game.add.tween(logo2.cameraOffset).to( { y: 200 }, 2000, Phaser.Easing.Back.InOut, true, 0, 2000, true);

 //Setting Anchor
 ufo.anchor.setTo(0.5, 0.5);
  
  //Set Angle
  ufo.angle = 15;


 //Camera Styles
 function lockonFollow() {
    game.camera.follow(ufo, Phaser.Camera.FOLLOW_LOCKON);
    style = 'STYLE_LOCKON';
}

function platformerFollow() {
    game.camera.follow(ufo, Phaser.Camera.FOLLOW_PLATFORMER);
    style = 'STYLE_PLATFORMER';
}

function topdownFollow() {
    game.camera.follow(ufo, Phaser.Camera.FOLLOW_TOPDOWN);
    style = 'STYLE_TOPDOWN';
}

function topdownTightFollow() {
    game.camera.follow(ufo, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
    style = 'STYLE_TOPDOWN_TIGHT';
}

//Adding a button
btn3 = game.add.button(6, 280, 'button', function(),this, 3, 3, 3);
// 3,3,3 are the frames.




