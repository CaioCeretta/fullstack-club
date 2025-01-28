# File for components that i found useful

## Naming conventions

1. Prefix with _ folders that won't have a page inside of it, in practice, it will make this a private folder for next, so
it will never consider this page as a route, even if we create a page.tsx inside of it

## HTML and body occupy the full height of the page

One thing the instructor likes to do, is to go on the globals.css, remove all the default styling from next, up to :root,
and add a 

html, body {
  @apply h-full;
}

this will make our body and our html, occupy 100% of the parent, but why does this work if the html is the root of the dom?

The implicit parent of the html, is the viewport of the browser, and the height of the viewport is defined, basically
as 100% of the visible height of the browser

so now by simply putting the height as full on the div that wraps the sidebar or any direct children of the body, it will
take the full screen


## Customized Fonts

By default, nextjs automatically optimizes our fonts, when we are working with csr, the fonts we use, they also have to be
inserted through js, so we can have something called font shift, that is basically, when a user accesses an app he sees a
font, that is not the one we've configured, just a fallback font, and after the ones we are using loads, it then shifts to
it. 

But next is a little different, he optimizes our app so the font shifting doesn't happen

## Prettier plugin format classes

To format the classes on save, it's important to use the prettier-plugin-tailwindcss an put it inside .prettierrc inside
the "plugins" array


 
