import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import { defaultDocumentNode } from './structure/defaultDocumentNode'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'

export default defineConfig({
  name: 'default',
  title: 'Dev blog',

  projectId: 'kdgqg3rt',
  dataset: 'production',

  plugins: [structureTool({
    structure,
    defaultDocumentNode
  }), 
  visionTool(), vercelDeployTool()],

  schema: {
    types: schemaTypes,
  },
})
