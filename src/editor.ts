import * as monaco from 'monaco-editor'

declare global {
  interface Window {
    MonacoEnvironment: any
  }
}

// https://github.com/vitejs/vite/discussions/1791
self.MonacoEnvironment = {
  getWorker: async function () {
    const worker = await import(
      'monaco-editor/esm/vs/editor/editor.worker?worker'
    )
    return new worker.default()
  }
}

interface Snippet {
  label: string
  documentation: string
  insertText: string
}

// https://microsoft.github.io/monaco-editor/playground.html?source=v0.44.0#example-extending-language-services-completion-provider-example
const snippets: Snippet[] = [
  {
    label: 'SELECT * FROM table',
    documentation: 'select',
    insertText: 'SELECT ${1:*} FROM ${2:table}'
  },
  {
    label: 'FROM',
    documentation: 'select',
    insertText: 'FROM'
  },
  {
    label: 'ORDER BY',
    documentation: 'SELECT * FROM table ORDER BY attribute ASC',
    insertText: 'ORDER BY ${1:attribute}'
  },
  {
    label: 'WHERE',
    documentation: 'SELECT * FROM table WHERE <bedingung>',
    insertText: 'WHERE'
  }
]

// https://github.com/SadeghPM/sql-vscode-snipptes/blob/master/snippets/snippets.json
monaco.languages.registerCompletionItemProvider('sql', {
  provideCompletionItems: (model, position) => {
    const word = model.getWordUntilPosition(position)
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn
    }

    const suggestions = []

    for (const snippet of snippets) {
      suggestions.push({
        label: snippet.label,
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: snippet.documentation,
        insertText: snippet.insertText,
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range
      })
    }

    return {
      suggestions
    }
  }
})

export let editor: monaco.editor.IStandaloneCodeEditor | null
// https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneEditorConstructionOptions.html
export function create(
  element: HTMLElement
): monaco.editor.IStandaloneCodeEditor {
  editor = monaco.editor.create(element, {
    language: 'sql',
    theme: 'vs-dark',
    fontSize: 32,
    lineNumbers: 'off',
    lineDecorationsWidth: 0,
    minimap: { enabled: false },
    scrollbar: {
      vertical: 'hidden',
      horizontal: 'hidden'
    },
    renderLineHighlight: 'none',
    overviewRulerLanes: 0,
    padding: { top: 15, bottom: 15 },
    wordWrap: 'on'
  })
  return editor
}
