'use strict';

const assert = require('assertthat');

const nodeBinary = require('../../node-binary');
const changelogTemplate = require('../../changelog-template');

suite('nodeBinary', () => {
  test('is an object', async () => {
    assert.that(nodeBinary).is.ofType('object');
  });

  test('contains the expected contents.', async () => {
    assert.that(nodeBinary).is.equalTo({
      verifyConditions: [
        '@semantic-release/changelog',
        '@semantic-release/npm',
        '@semantic-release/git'
      ],
      prepare: [
        '@semantic-release/changelog',
        '@semantic-release/npm',
        {
          path: '@semantic-release/git',
          /* eslint-disable no-template-curly-in-string */
          message: 'Release ${nextRelease.version}'
          /* eslint-enable no-template-curly-in-string */
        }
      ],
      /* eslint-disable no-template-curly-in-string */
      tagFormat: '${version}',
      /* eslint-enable no-template-curly-in-string */
      analyzeCommits: {
        preset: 'angular',
        parserOpts: {
          noteKeywords: [
            'BREAKING CHANGES'
          ]
        },
        releaseRules: [
          { type: 'chore', release: 'patch' }
        ]
      },
      generateNotes: {
        preset: 'angular',
        parserOpts: {
          issuePrefixes: [
            'gh-',
            'jira-'
          ],
          noteKeywords: [
            'BREAKING CHANGES'
          ],
          referenceActions: null
        },
        writerOpts: changelogTemplate
      },
      npmPublish: false
    });
  });
});
