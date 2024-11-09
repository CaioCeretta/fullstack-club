# What are route groups

In the app directory, nested folders are normally mapped to URL paths. However, we can mark a folder as a "Route Group"
to prevent the folder from being included in the route's URL path.

This allows us to organize the route segment and project files into logical groups without affecting the URL path structure.

Route groups are useful for:
- Organizing routes into groups e.g. by site sectio, intent or team.
- Enabling nested layouts in the same route segment level
- Adding a loading skeleton to specific route in a common segment

## Convention

A route group can be created by wrapping a folder's name in parenthesis: (foldername), but even though routes inside
(marketing) and (shop) share the same URL hierarchy. We can create a different layour for each group by adding a layout.ts
file inside their folders

## Opting specific segments into a layout

To opt specific routes into a layout, create a new route group (e.g. (shop)) and move the routes that share the same layout
into the group (e.g. account and cart). The routes outside of the group will not share the layout.

## Opting for a loading skeletons on a specific route

To apply a loading skeleton via loading.ts file to a specific route, create a new route group (e.g. /(overview)) and then
move the loading.tsx inside that route group, now the loading.tsx file will only apply to our dashboard -> overview page
instead of all your dashboard pages without affecting the URL path structure.





