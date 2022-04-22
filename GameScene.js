class GameScene extends Phaser.Scene {
	constructor(){
		super({ key: 'GameScene' })
	}

  preload() {
  this.load.image('bug1', 'https://aws1.discourse-cdn.com/codecademy/original/5X/c/b/d/7/cbd7a5afa62b0b27a574526432cc78bf63d7b5b4.png');
  this.load.image('bug2', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_2.png');
  this.load.image('bug3', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_3.png');
  this.load.image('platform', 'https://aws1.discourse-cdn.com/codecademy/original/5X/2/b/3/e/2b3e553d8ef8adaacb75b60995bccfb4987612c2.png');
  this.load.image('cheatPlatform', 'https://aws1.discourse-cdn.com/codecademy/original/5X/2/b/3/e/2b3e553d8ef8adaacb75b60995bccfb4987612c2.png');
  this.load.image('codey', 'https://aws1.discourse-cdn.com/codecademy/original/5X/a/9/8/9/a989f29e9ffc8666251e902a3c8a5d6b9d8a98bd.png');
  this.load.image('space', 'https://aws1.discourse-cdn.com/codecademy/original/5X/6/6/a/a/66aa0c9e9af3ef8116e05ea5cc6dfc4198b4277f.jpeg');
}

create() {
  let bg=this.add.image(195,250, "space");
  gameState.player = this.physics.add.sprite(225, 44, 'codey').setScale(.9);
  
  //Main Platform
  const platforms = this.physics.add.staticGroup();
 
  this.physics.add.collider(gameState.player, platforms);
 
  platforms.create(220, 10, 'platform').setScale(300, 2).refreshBody();
 
  gameState.scoreText = this.add.text(195, 5, 'Score: 0', { fontSize: '15px', fill: '#ffffff' });
 
  gameState.player.setCollideWorldBounds(true);
 
  gameState.cursors = this.input.keyboard.createCursorKeys();
 
//Cheat Platform
const cheatPlatform = this.physics.add.staticGroup();
 
this.physics.add.collider(gameState.player, cheatPlatform);
 
cheatPlatform.create(5, 73, 'cheatPlatform').setScale(2.6, .9).refreshBody();
this.add.text(3, 65, 'Cheater...', { fontSize: '11px', fill: '#FFFFFF' });

  const bugs = this.physics.add.group();
 
  function bugGen () {
    const xCoord = Math.random() * 440;
    bugs.create(xCoord, 750, 'bug1');
  }
 
  const bugGenLoop = this.time.addEvent({
    delay: 150,
    callback: bugGen,
    callbackScope: this,
    loop: true,
  });
  //Main Platform score
  this.physics.add.collider(bugs, platforms, function (bug) {
    bug.destroy();
    gameState.score += 200;
    gameState.scoreText.setText(`Score: ${gameState.score}`);
  })
 
  //Cheat Platform score
  this.physics.add.collider(bugs, cheatPlatform, function (bug) {
    bug.destroy();
    gameState.score -= 100; 
    gameState.scoreText.setText(`Score: ${gameState.score}`);
  })
  
  this.physics.add.collider(gameState.player, bugs, () => {
    bugGenLoop.destroy();
    this.physics.pause();   
    this.input.on('pointerup', () =>{
      gameState.score = 0;
      this.scene.stop('GameScene');
      this.scene.start('EndScene');
    });
  });
}

update() {
  if (gameState.cursors.left.isDown) {
    gameState.player.setVelocityX(-500);
  } else if (gameState.cursors.right.isDown) {
    gameState.player.setVelocityX(500);
  } else {
    gameState.player.setVelocityX(0);
  }
}
}