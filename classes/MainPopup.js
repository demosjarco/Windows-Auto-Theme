const { Menu, Tray } = require('electron');

module.exports.MainPopup = class {
	constructor() {
		this.tray = new Tray('./images/logo/icon.png');
		const contextMenu = Menu.buildFromTemplate([
			{ label: 'Item1', type: 'radio' },
			{ label: 'Item2', type: 'radio' },
			{ label: 'Item3', type: 'radio', checked: true },
			{ label: 'Item4', type: 'radio' }
		]);
		this.tray.setToolTip('This is my application.');
		this.tray.setContextMenu(contextMenu);
	}
}