/*
Create folder structure
  <Page_name>/
    index.js
    modules.js
    test.js
    styles.js
*/
import mkdirp from 'mkdirp'
import path from 'path'
import fs from 'fs'

import templates from './templates'
import { capitalizeFirstLetter } from '../src/utils'

const name = capitalizeFirstLetter(process.argv[2])

const pagePath = path.join(__dirname, `../src/pages/${name}`)

// create files
const files = {
  'index.js': templates.indexTemplate(name),
  'modules.js': templates.modulesTemplate(name),
  'test.js': templates.testTemplate(name),
  'styles.js': templates.stylesTemplate()
}

// create folder
mkdirp(pagePath, async(err) => {
  if (err) console.log(err)
  for (let fileName in files) {
    // create files
    await new Promise((resolve, reject) => {
      fs.writeFile(path.join(pagePath, fileName), files[fileName], (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  }
  console.log(`SUCCESS: ${name} page created. Remember to add it to the router!`)
})

// add it to router? this seems untrivial
