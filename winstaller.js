'use strict';

const { argv } = require('process');

require('electron-winstaller')
	.createWindowsInstaller({
		name: 'windowsautotheme',
		appDirectory: `builds/packaged/windows-auto-theme-win32-${argv[2]}`,
		outputDirectory: 'builds/installers',
		exe: 'windows-auto-theme.exe',
		iconUrl: 'https://raw.githubusercontent.com/demosjarco/Windows-Auto-Theme/main/images/logo/icon.ico',
		setupIcon: 'images/logo/icon.ico',
		setupExe: argv[3] == 'exe' ? `windows-auto-theme-installer-${argv[2]}.exe` : null,
		setupMsi: argv[3] == 'msi' ? `windows-auto-theme-installer-${argv[2]}.msi` : null,
		noMsi: argv[3] == 'msi',
	})
	.then(
		() => {
			console.log(`${argv[2]} ${argv[3]} installer created`);
		},
		(error) => {
			throw error;
		},
	);
