import type {StructureResolver} from 'sanity/structure'
import {DocumentsIcon, DocumentTextIcon, UserIcon, ProjectsIcon, FilterIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
        S.documentTypeListItem('post').title('All posts').icon(DocumentTextIcon),
        S.listItem()
        .title('Short format posts')
        .schemaType('post')
        .icon(DocumentsIcon)
        .child(S.documentList().title('Short form').filter('format match short-format')),
        S.listItem()
        .title('Long format posts')
        .schemaType('post')
        .icon(DocumentsIcon)
        .child(S.documentList().title('Long form').filter('format match long-format')),
        
        S.divider(),

        S.documentTypeListItem('author').title('Authors').icon(UserIcon),
        S.documentTypeListItem('project').title('Projects').icon(ProjectsIcon),
        S.documentTypeListItem('category').title('Categories').icon(FilterIcon),
    ])