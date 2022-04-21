'use strict';

require('electron-winstaller').createWindowsInstaller({
	appDirectory: 'builds/packaged/Windows Auto Theme-win32-x64',
	outputDirectory: 'builds/installers',
	exe: 'Windows Auto Theme.exe',
	// iconUrl: 'images/logo/icon.ico',
	setupExe: 'windows-auto-theme-installer.exe',
	// setupMsi: 'windows-auto-theme-installer-x64.msi',
	noMsi: true
}).then(() => {
	console.log('Installer created');
}, (error) => {
	throw error;
});