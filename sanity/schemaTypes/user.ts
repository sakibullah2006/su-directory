
import { defineField, defineType } from 'sanity'

export const user = defineType({
  name: 'user',
  title: 'Users',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      type: 'number',
    }),
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'username',
      type: 'string',
    }),
    defineField({
      name: 'email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      type: 'string',
      validation: Rule => Rule.min(14)
    }),
    defineField({
      name: 'gender',
      type: 'string',
    }),
    defineField({
      name: 'imageUrl',
      type: 'url'
    }),
    defineField({
      name: 'bio',
      type: 'text',
      // validation: (Rule) => Rule.min(120)
    }),   
    defineField({
      name: 'location',
      type: 'text',
      // validation: (Rule) => Rule.min(120)
    }),
  ],
  preview: {
    select: {
      title: "name",
      username: "username"
    }
  }
})
