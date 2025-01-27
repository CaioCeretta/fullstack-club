# Comments about next routes

## Route Groups

Let's say all of our pages have the same sidebar and we would place this sidebar on the layout.tsx, but let's suppose we
have a login page, where we wouldn't want this sidebar to be displayed, in next there is something called "route groups".

We will create to exemplify this, a (sales) folder inside of our app, even though we have a page.tsx inside (sales), if
we try to access localhost:3000/sales, we are now going to receive a 404...

Why does this happen?

This happens, because when we put a parentheses in a folder name, we are willing to group the files inside of it, but it
will not count on the url address, because it won't be treated as a route.

If we create, inside the route group, a folder named login, with a page.tsx. it is going to be available in localhost:3000/login

This part is never considered in the route system, even if it has a page.tsx inside of it.

## Use cases of this

We might think of: "there is no practical use for this", but one thing we could do, other than grouping the routes of the
same purpose, such as (home), where we will have all the routes of home and so on, and make it easier to find, we can also
have the same layout.tsx for this, and this layout will be applied to all the routes inside the route group.

Let's say we have another route group named (dashboard), and inside of it, place our page and layout we were using on the
root. This way, we are separating the main layout, which has the sidebar, just for pages inside the dashboard group
