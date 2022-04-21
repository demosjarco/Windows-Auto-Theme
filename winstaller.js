'use strict';

require('electron-winstaller').createWindowsInstaller({
	appDirectory: 'builds/packaged/windows-auto-theme-win32-x64',
	outputDirectory: 'builds/installers',
	exe: 'windows-auto-theme.exe',
	setupExe: 'windows-auto-theme-installer.exe',
}).then(() => {
	console.log('Installer created');
}, (error) => {
	throw error;
});