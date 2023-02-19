module.exports = {
	packagerConfig: {},
	rebuildConfig: {},
	makers: [
		// https://www.electronforge.io/config/makers/appx
		{
			name: '@electron-forge/maker-appx',
			config: {
				containerVirtualization: true,
				// publisher: 'CN=developmentca',
				// devCert: 'C:\\devcert.pfx',
				// certPass: 'abcd',
			},
		},
		{
			name: '@electron-forge/maker-squirrel',
			config: {
				// appDirectory: `builds/packaged/windows-auto-theme-win32-${argv[2]}`,
				iconUrl: 'https://raw.githubusercontent.com/demosjarco/Windows-Auto-Theme/main/images/logo/icon.ico',
				name: 'windowsautotheme',
				outputDirectory: 'builds/installers',
				// exe: 'windows-auto-theme.exe',
				setupIcon: 'images/logo/icon.ico',
			},
		},
		{
			name: '@electron-forge/maker-wix',
			config: {
				features: {
					autoLaunch: true,
					// autoUpdate: true,
				},
				icon: './images/logo/icon.ico',
				manufacturer: 'DemosJarco',
				name: 'Windows Auto Theme',
				shortName: 'windowsautotheme',
				upgradeCode: '0bbfea7c-55aa-456b-9b43-a5fa7295361a',
			},
		},
		{
			name: '@electron-forge/maker-zip',
		},
	],
	publishers: [
		{
			name: '@electron-forge/publisher-github',
			config: {
				repository: {
					owner: 'demosjarco',
					name: 'Windows-Auto-Theme',
				},
				draft: true,
				prerelease: true,
			},
		},
	],
	plugins: [
		{
			name: '@electron-forge/plugin-auto-unpack-natives',
			config: {},
		},
	],
};
