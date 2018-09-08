'use strict';

const assert = require('assertthat');

const nodeModule = require('../../node-module');
const changelogTemplate = require('../../changelog-template');

suite('nodeModule', () => {
  test('is an object', async () => {
    assert.that(nodeModule).is.ofType('object');
  });

  test('contains the expected contents.', async () => {
    assert.that(nodeModule).is.equalTo({
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
          message: '[ci skip] Release ${nextRelease.version}'
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
        }
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
      npmPublish: true
    });
  });
});
