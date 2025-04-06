import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'string',
    }),
  ],
})