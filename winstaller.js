'use strict';

require('electron-winstaller').createWindowsInstaller({
	appDirectory: 'builds/packaged/Windows Auto Theme-win32-x64',
	outputDirectory: 'builds/installers',
	exe: 'Windows Auto Theme.exe',
	setupExe: 'windows-auto-theme-installer.exe',
	setupMsi: 'windows-auto-theme-installer.msi',
	noMsi: false
}).then(() => {
	console.log('Installer created');
}, (error) => {
	throw error;
});