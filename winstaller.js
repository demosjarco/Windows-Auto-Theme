'use strict';

const { argv } = require('process');

require('electron-winstaller')
	.createWindowsInstaller({
		appDirectory: `builds/packaged/windows-auto-theme-win32-${argv[2]}`,
		outputDirectory: 'builds/installers',
		exe: 'windows-auto-theme.exe',
		iconUrl: 'https://raw.githubusercontent.com/demosjarco/Windows-Auto-Theme/main/images/logo/icon.ico',
		setupIcon: 'images/logo/icon.ico',
		setupExe: `windows-auto-theme-installer-${argv[2]}.exe`,
		// setupMsi: `windows-auto-theme-installer-${argv[2]}.msi`,
		noMsi: true,
	})
	.then(
		() => {
			console.log(`${argv[2]} Installer created`);
		},
		(error) => {
			throw error;
		},
	);
