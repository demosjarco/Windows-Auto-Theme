'use strict';

require('electron-winstaller').createWindowsInstaller({
	appDirectory: 'builds/packaged/windows-auto-theme-win32-ia32',
	outputDirectory: 'builds/installers',
	exe: 'windows-auto-theme.exe',
	iconUrl: 'https://raw.githubusercontent.com/demosjarco/Windows-Auto-Theme/main/images/logo/icon.ico',
	setupIcon: 'images/logo/icon.ico',
	setupExe: 'windows-auto-theme-installer-x32.exe',
	// setupMsi: 'windows-auto-theme-installer-x32.msi',
	noMsi: true
}).then(() => {
	console.log('x32 Installer created');
	require('electron-winstaller').createWindowsInstaller({
		appDirectory: 'builds/packaged/windows-auto-theme-win32-x64',
		outputDirectory: 'builds/installers',
		exe: 'windows-auto-theme.exe',
		iconUrl: 'https://raw.githubusercontent.com/demosjarco/Windows-Auto-Theme/main/images/logo/icon.ico',
		setupIcon: 'images/logo/icon.ico',
		setupExe: 'windows-auto-theme-installer-x64.exe',
		// setupMsi: 'windows-auto-theme-installer-x64.msi',
		noMsi: true
	}).then(() => {
		console.log('x64 Installer created');
	}, (error) => {
		throw error;
	});
}, (error) => {
	throw error;
});