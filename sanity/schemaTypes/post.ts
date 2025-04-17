import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Posts',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      validation: (Rule) => Rule.min(20).required().error("Enter a description for the post")
    }),
    defineField({
      title: "Author",
      name: 'author',
      type: 'reference',
      // options: { to: {type: "user"}},
      to: { type: 'user' },
      validation: (Rule) => Rule.required()

    }),
    
    defineField({
      name: 'view',
      type: 'number'
    }),
    defineField({
      name: 'category',
      type: 'string',
      validation: (Rule) => Rule.min(2).max(20).required().error("Enter a category")
    }),
    defineField({
      name: 'mainImage',
      type: 'url',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'content',
      type: 'markdown',
    }),
  ],
  // preview: {
  //   select: {
  //     title: "title",
  //     author: "author",
  //     description: "description",
  //     image: "mainImage"
  //   }
  // }
})
