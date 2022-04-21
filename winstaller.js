'use strict';

require('electron-winstaller').createWindowsInstaller({
	appDirectory: 'builds/packaged/windows-auto-theme-win32-x64',
	outputDirectory: 'builds/installers',
	exe: 'windows-auto-theme.exe',
	// iconUrl: 'images/logo/icon.ico',
	setupExe: 'windows-auto-theme-installer-x64.exe',
	// setupMsi: 'windows-auto-theme-installer-x64.msi',
	noMsi: true
}).then(() => {
	console.log('Installer created');
}, (error) => {
	throw error;
});