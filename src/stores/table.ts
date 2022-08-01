import { defineStore } from 'pinia'

type Cell = string | number | boolean | null | Uint8Array

export type Row = Cell[]

export interface Table {
  name: string
  columns: string[]
  rows: Row[]
}

interface State {
  tables: { [name: string]: Table }
  result: Table
  errorMsg: string | null
}

export const useTableStore = defineStore('table', {
  state: (): State => {
    return {
      tables: {},
      result: {
        name: 'Result',
        columns: [],
        rows: []
      },
      errorMsg: null
    }
  },
  getters: {
    table: state => {
      return (name: string) => state.tables[name]
    },
    result: (state): Table | undefined => {
      if (state.result?.rows?.length > 0) {
        return state.result
      }
    }
  },
  actions: {
    add (name: string, columns: string[], rows: Row[]) {
      this.tables[name] = {
        name,
        columns,
        rows
      }
    },
    setResult (columns: string[], rows: Row[]) {
      this.errorMsg = null
      this.result.columns = columns
      this.result.rows = rows
    },
    setError(msg: string) {
      this.errorMsg = msg
    }
  }
})
