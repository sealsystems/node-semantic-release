'use strict';

module.exports = {
  verifyConditions: [
    '@semantic-release/changelog',
    '@semantic-release/git'
  ],
  prepare: [
    {
      path: '@semantic-release/changelog',
      issuePrefixes: [ 'gh-', 'jira-' ],
      referenceActions: null
    },
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
  generateNotes: {
    preset: 'angular',
    parserOpts: {
      noteKeywords: [
        'BREAKING CHANGES'
      ]
    },
    writerOpts: {
      mainTemplate: `
{{> header}}

{{#each commitGroups}}

{{#if title}}
#### {{title}}

{{/if}}
{{#each commits}}
{{> commit root=@root}}
{{/each}}
{{/each}}

{{> footer}}`,

      headerPartial: `
### {{version}}
  {{~#if date}} ({{date}})
  {{~/if~}}`,

      commitPartial: `
* {{subject}}

{{~!-- commit references --}}
{{~#if references~}}
  {{~#each references}}, {{this.raw}}
  {{~/each~}}
{{~/if}}

{{~!-- commit link --}} {{#if @root.linkReferences~}}
  ([{{hash}}](
  {{~#if @root.repository}}
    {{~#if @root.host}}
      {{~@root.host}}/
    {{~/if}}
    {{~#if @root.owner}}
      {{~@root.owner}}/
    {{~/if}}
    {{~@root.repository}}
  {{~else}}
    {{~@root.repoUrl}}
  {{~/if}}/
  {{~@root.commit}}/{{hash}}))
{{~else}}
  {{~hash}}
{{~/if}}

{{#if body}}

{{body}}

{{~/if}}`,

      footerPartial: `
{{#if noteGroups}}
{{#each noteGroups}}

#### {{title}}

{{#each notes}}
* {{text}}
{{/each}}
{{/each}}
{{/if}}`
    }
  }
};
