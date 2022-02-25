const { Menu, Tray } = require('electron');

module.exports.MainPopup = class {
	constructor() {
		this.tray = new Tray('./images/logo/icon.png');
	}
}