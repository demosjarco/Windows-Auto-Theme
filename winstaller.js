'use strict';

const { argv } = require('process');

let config = {
	name: 'windowsautotheme',
	appDirectory: `builds/packaged/windows-auto-theme-win32-${argv[2]}`,
	outputDirectory: 'builds/installers',
	exe: 'windows-auto-theme.exe',
	iconUrl: 'https://raw.githubusercontent.com/demosjarco/Windows-Auto-Theme/main/images/logo/icon.ico',
	setupIcon: 'images/logo/icon.ico',
};

switch (argv[3]) {
	case 'exe':
		config.setupExe = `windows-auto-theme-installer-${argv[2]}.exe`;
		config.noMsi = true;
		break;
	case 'msi':
		config.setupMsi = `windows-auto-theme-installer-${argv[2]}.msi`;
		config.noMsi = false;
		break;
}

require('electron-winstaller')
	.createWindowsInstaller(config)
	.then(
		() => {
			console.log(`${argv[2]} ${argv[3]} installer created`);
		},
		(error) => {
			throw error;
		},
	);
