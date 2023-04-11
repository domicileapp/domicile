module.exports = {
  branches: ['main', 'next'],
  repositoryUrl: 'https://github.com/thecodinganalyst/semantic-java',
  plugins: [
    ['@semantic-release/commit-analyzer'],
    ['@semantic-release/release-notes-generator'],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
        changelogTitle: '# Domicile Changelog',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md'],
      },
    ],
    [
      '@semantic-release/github',
      {
        failTitle: 'Automated release is failing',
        labels: false,
      },
    ],
  ],
}
module.exports = {
  // branches: [
  //   'main',
  //   {
  //     name: 'next',
  //     prerelease: true,
  //   },
  // ],
  repositoryUrl: 'https://github.com/thecodinganalyst/semantic-java',
  plugins: [
    ['@semantic-release/commit-analyzer'],
    ['@semantic-release/release-notes-generator'],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
        changelogTitle: '# Domicile Changelog',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md'],
      },
    ],
    [
      '@semantic-release/github',
      {
        failTitle: 'Automated release is failing',
        labels: false,
      },
    ],
  ],
}
