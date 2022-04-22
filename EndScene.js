class EndScene extends Phaser.Scene {
	constructor() {
		super({ key: 'EndScene' })
	}
 preload() {
 this.load.image('endSpace', 'https://aws1.discourse-cdn.com/codecademy/original/5X/6/6/a/a/66aa0c9e9af3ef8116e05ea5cc6dfc4198b4277f.jpeg');
  }
	create() {
    let bg=this.add.image(195,250, "endSpace");
    this.add.text(70, 250, 'You lost, wow, youre not very good at this huh', {fontSize: '12px', fill: '#FFFFFF'});
    
		this.input.on('pointerdown', () => {
			this.scene.stop('EndScene')
			this.scene.start('StartScene')
		})
	}
}