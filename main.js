'use strict';

require('dotenv').config();
const { app } = require('electron');
const { MainPopup } = require('./classes/MainPopup.js');

app.whenReady().then(() => {
	new MainPopup();
});