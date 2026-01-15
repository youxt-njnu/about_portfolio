#!/usr/bin/env node
/* eslint-disable no-undef */

import fs from 'fs-extra'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const sourceDir = path.join(__dirname, '../dist/about_portfolio')
const targetDir = path.join(__dirname, '../dist')

try {
  console.log('Copying dist/about_portfolio/** to dist/...')
  // 递归复制所有文件，覆盖已存在的文件
  fs.copySync(sourceDir, targetDir, { overwrite: true })
  console.log('Copy complete!')

  console.log('Removing dist/about_portfolio...')
  fs.removeSync(sourceDir)
  console.log('Remove complete!')

  console.log('Running gh-pages...')
  execSync('gh-pages -d dist', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
  })
  console.log('Deploy complete!')
} catch (err) {
  console.error(
    'Deploy failed:',
    err instanceof Error ? err.message : String(err)
  )
  process.exit(1)
}
