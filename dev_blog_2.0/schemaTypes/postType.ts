import {defineField, defineType} from 'sanity'
import {DocumentIcon, DocumentTextIcon} from '@sanity/icons'
import { form } from 'sanity/structure'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'general', title: 'General'},
    {name: 'details', title: 'Details'},
  ],
  fields: [
    defineField({
      name: 'format',
      type: 'string',
      group: ['general', 'details'],
      options: {
        list: ['long format', 'short format'],
        layout: 'radio'
      },
      validation: (rule) => rule
      .required()
      .error('Format must be defined'),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      group: 'details',
      to: [{type: 'author'}],
    }),
    defineField({
      name: 'title',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'details',
      options: {source: 'title'},
      validation: (rule) => rule
      .required()
      .error('Slug needed to generate a page on the website'),
      hidden: ({document}) => !document?.title,
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: ['details', 'general'],
    }),
    defineField({
      name: 'body',
      type: 'array',
      group: 'general',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'project',
      description: 'Project related to the blog post',
      type: 'reference',
      to: [{type: 'project'}],
      group: 'details',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      group: 'details',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      image: 'image',
    },
  }
})