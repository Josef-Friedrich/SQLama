import { expect, test } from 'vitest'
import { query } from './sql.js'

test('getSqliteVersion()', () => {
  const result = query.getSqliteVersion()
  expect(result).toBe('3.49.1')
})
