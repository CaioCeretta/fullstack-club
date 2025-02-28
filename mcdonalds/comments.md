## Running seed.ts

To populate the initial database, we created a seed.ts file, inside the prisma folder, and in order to execute this, we
need to install the ts-node library, which is a library that executes typescript files.

After the installation, we create a new script in our package.json, here we'll name it "prisma" with the content of
"prisma": {
"seed": "ts-node ./prisma/seed.ts"
}

Now, by running "npx prisma db seed", this is the script it will look for

## Patternize imports

eslint-plugin-simple-import-sort@12.1.1 <- This library is used for us to create a pattern on the imports, such as the
libraries imports come first, then the files, etc.

To use it on our code we change the eslint.config.js and that this rules for the eslintConfig array

    {
    	plugins: {
    		'simple-import-sort': simpleImportSort,
    	},
    	rules: {
    		'simple-import-sort/imports': 'error',
    		'simple-import-sort/exports': 'error',
    	},
    },

## Option chosen by user 1/2

In the code, we are dealing with restaurants and we have the consumption methods a user can choose, if it is takeaway or
to eat in the restaurant, and we added fields on the database to save this order method, because we must have this order
information.
However, when the user is creating its order, there are somo approaches we can take for passing its option.

1. Global State Tool, such as redux or context api
2. Pass it on the URL

So let's suppose the user is on the initial screen of localhost:3000/fsw-donalds and the user clicked on the 'dine_in'
option, now we can take him to the menu page with a new parameter on the URL, such as localhost:3000/fsw-donalds/menu?consumption=dine_in.

This means that are many things we can pass directly on the URL and we don't need a context API, or similar

## Cards where the image don't occupy the same height

We may face difficulties with Flexbox, for example, when images don't always have the same height. This happens because
next adapts the images to maintain their aspect-ratio. However, if we want an image to always have a fixed height and width,
one solution is to create a div, with relative positioning and set the the desired height and width (in this example, 80px).

Inside this div, we place the image without setting a width or height explicitly, but using the fill property so that it
occupies its parent's dimension. Additionally, we apply the class object contain to ensure that the image shrinks to fit
within the container while maintaning object ratio

We also have another solution to deal in this cases:

    The problem with the solution above is that the <Image /> works well when the container has a fixed width, but the behavior
    of object-contain may not be the ideal in all cases.

    The better approach would be instead of a fixed div with relative, we use tailwind's aspect-w and the aspect-h to ensure
    a fixed proportion.

    If the exact size is required, w-20 h-20 can work well, but if all the images need the same size, using object-cover may
    be even better than object-contain, depending on the desired effect.

    The object contain will shrink in order to fit its parent dimensions, and the object-cover crops the extra parts instead
    of shrinking

    The example with the aspect would be

    	<div className="relative w-20 aspect-square">
    		<Image
    			src="/image.jpg"
    			alt="Example"
    			fill
    			className="object-cover"
    		/>
    	</div>

    	the w-20 defines the fixed width in 80px, aspect square will maintain the height same as the width (1:1), and relative
    	is required because <Image fill /> requires a positioned container

## Prisma include

If we are going to fetch something, that has a foreign key to another table, an this other table, have a foreign key to
other table, we can do something like

```ts
const restaurant = await db.restaurant.findUnique({
  where: { slug },
  include: {
    menuCategories: {
      include: { products: true },
    },
  },
});
```

this way when we fetch the restaurant based on the slug, we are also going to fetch the menuCategories related to this
restaurant and the products related to the category, now, if we pass down this restaurant as a property to a child we
type the interface as

```ts
interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: {
          products: true;
        };
      };
    };
  }>;
}
```

Prisma offers us that TableGetPayload and in the generic we pass the tables it includes. Since our interface expects to
receive the categories and the products, by removing this includes on the findMany, it will now show an error

## Option chosen by user 2/2

For storing the restaurant category in this case, we can simply store it in state, However, there's a problem: When we
change pages or reload the page, we'll have to select the category again.

To avoid this, we can also store it in the url. This ensures that the selected category persists even after a page reload
or navigation. However, another issue arise: If thhe application is designed to reload the entire page whenever we change
the category, a new request to the database will be triggered.

Navigation is handled via Server Components and Client Components. If we store the category in the URL and use shallow
routing (e.g. router.push) with { scroll: false }, we can update the URL without triggering a full page reload or a new server
request. This way we can benefit of the URL persistence without unnecessary API calls.

In the end, everything is a trade-off. The instructor prefers storing the category in state to avoid full-page reloads.
However in Next.js App Router setup, a combined approach works best

    . store the selected category in the URL for persistence
    . use local state to manage ui updates without unnecessary re-fetching
    . optimize cache with strategies like ReactQuery, useMemo, or Next.js caching mechanisms to prevent reduntant database
    requests.

## Function calls

variant={getCategoryButtonVariant(category)}

We are passing an argument to this function call, so why we don't need to create an anonymous function for it?

This happens because the function is already being called directly at render time, so we don't need to wrap it in an anonymous
function. Since it is executed immediately, it's return value (a string such as "default" or "secondary") is directly passed
as the variant prop.

If we wrapped it in an anonymous function, we would be passing getCategoryButtonVariant as prop, instead of its returned
value.

This would onlyu make sense if variant expected a function rather than a direct value, which is not the case.

The variant prop expects a string, such as "default" or "secondary" and the function already returns this value.

If it were something like onClick, which expects a function to be called afterwards, then we would need to pass an anonymous
function. This ensures that the execution only happens when the button is clicked, rather than immediately during rendering

## Product Page

Product page will be a dynamic route inside the [slug] dynamic route, so it will receive two parameters in order for this
page be viewed, [slug]/[productId]. Since [slug] is on the route of the app, every dynamic route, accessed after the
domain is going to target the [slug] folder and every page accessed after it, will have access to the slug.

For us to retrieve the parameters on the url, is by using the useParam hook or receiving it as a prop.

This component is going to be a server component that has two other child components, which are server components that
handle dynamic operations

## Product Details Page

On here, whenever we choose a product from a restaurant, we'll use a icon on the side to show which restaurant we're talking
about. However in this case we're we are dealing with small icons and not big displaying images, we are not going to create
an external relative div, set its width, then place an image inside with the fill property, here we'll simply use next image
width and height property for the dimensions.

We choose the other approach mainly in cases where we want the image to occupy 100% of the height and width of the container
or when we have images several different images that are going to be rendered by the component and we want them to always
have the same dimensions.

By using next image, with width and height, there is a possibility that it changes the image dimensions.

One is able to get the restaurants linked with the product by using the same approach as the one before, with

Prisma.ProductsGetPayload<{ include: { restaurant: true }}>

If only some columns are needed on an include, we can use the select, that is a property of the include, so it would be
for example

```ts
Prisma.ProductsGetPayload<{
   include: {
     restaurant: {
        select: {
          name: true
        }
      }
    }
  }>

  and on the fetch
```

## Placing the button on the bottom of the component

1. Change globals.css and apply a h-full to the html selector
2. Change the productsPage, which wraps the details and the header, to have a flex h-full flex-col
3. Change the outer div of the product details to have a flex-auto, which is similar to flex-1, except that the flex-shrink
   added by flex-1 is 0% instead of 1
4. Change the product details component, by wrapping the whole code, except for the button, into a flex-auto, pushing the
   button downwards
