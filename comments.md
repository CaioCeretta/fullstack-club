# Comments i find useful about the course

## File placement

One thing, for example, is that we placed the utils inside the app folder, we know that in the app folder we usually have
just pages for the UI, but if we don't create a page.tsx inside the folder, this won't act as a page.

In next we have something called private folders, they are folders that will never be treated as routes, even if we have
a page.tsx inside of them, and for creating one of these, we just need to use a _ before its name.

We are also going to need the components.json created by shadcn.

## Global styling

By creating the class dark on the @layer.base { .dark { ... } } we will be able to alter the layout css, add this dark class
and it's going to be applied to the whole layout

