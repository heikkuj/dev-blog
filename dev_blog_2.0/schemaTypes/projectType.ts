import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'projectTitle',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'string',
    }),
  ],
})