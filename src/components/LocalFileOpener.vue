<script setup lang="ts">
import { getStore } from '@/store'
const store = getStore()

async function readFile(event: Event) {
  const element = event.target as HTMLInputElement
  if (element.files != null) {
    const file = element.files[0]
    if (file != null) {
      if (file.type === 'application/sql') {
        await store.openDatabase(await file.text())
      } else if (file.type === 'application/vnd.sqlite3') {
        await store.openDatabase(new Uint8Array(await file.arrayBuffer()))
      }
    }
  }
}
</script>

<template>
  <div>
    <label for="file">File:</label>
    <input type="file" name="file" @change="readFile" />
  </div>
</template>
