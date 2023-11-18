

import { expect, test } from 'vitest'
import { parse } from './sql.js'

import * as fs from 'node:fs'

test('sql-parser()', () => {
  const result = parse('SELECT * FROM test;')
  expect(result.ast.columns.type).toBe('star')
})

test('mysql-dump', () => {
  const data = fs.readFileSync('./tests/files/Sportverein3.sql', 'utf8');

  const result = parse(data)
  expect(result.ast.columns.type).toBe('star')
})
