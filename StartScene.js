class StartScene extends Phaser.Scene {
	constructor() {
		super({ key: 'StartScene' })
	}
  preload() {
 this.load.image('startSpace', 'https://aws1.discourse-cdn.com/codecademy/original/5X/6/6/a/a/66aa0c9e9af3ef8116e05ea5cc6dfc4198b4277f.jpeg');
  
  }
	create() {
		let bg=this.add.image(195,250, "startSpace");
    this.add.text( 100, 230, 'Use the arrow keys to dodge the enemies', {fill: '#ffffff', fontSize: '12px'})
    this.add.text( 100, 250, 'Gain points by dodging enemies', {fill: '#ffffff', fontSize: '12px'})
    this.add.text( 100, 270, 'Click anywhere on the screen to begin', {fill: '#ffffff', fontSize: '12px'})
		this.input.on('pointerdown', () => {
			this.scene.stop('StartScene')
			this.scene.start('GameScene')
		})
	}
}