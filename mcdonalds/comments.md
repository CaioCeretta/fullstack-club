## Running seed.ts

To populate the initial database, we created a seed.ts file, inside the prisma folder, and in order to execute this, we
need to install the ts-node library, which is a library that executes typescript files.

After the installation, we create a new script in our package.json, here we'll name it "prisma" with the content of
"prisma": {
"seed": "ts-node ./prisma/seed.ts"
}

Now, by running "npx prisma db seed", this is the script it will look for

## Standardize imports

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

## Server components params and searchParams need to be awaited on Next.js 13+

On the dynamic route (e.g. app/[slug]/menu) by trying to assign the params and the searchParams to a variable, next "said"
it should be awaited before using its properties.

This happens because of the way Next.JS deals with dynamic routes and the use of params and searchParams on async functions
specially in routes within app folder.

In Next.js 13+ with the new routing API, when we work with dynamic routes such as this one, both the params and the searchParams
need to be treated in an asynchronous manner to ensure Next.js is able to access the data correctly.

This error happens because next says that we must await the values of params and searchParams. This happens because, in
the architecture of Next.JS with the app folder, these objects are returned with Promises instead of simple objects.

In other words, params and searchParams are async objects that need to be "unpacked" with await before being accessed.
Therefore, dynamic routes in Next.js with the app folder structure, bring this new approach for accessing URL parameters
and query strings asynchronously, and if it isn't an async component, we wouldn't need the awaits and it would also work.

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

## In case content too big, make only the details scrollable, with the page layout remaining the same

We can achieve this simply by using shadcn scroll view, and on the div of the ingredients and about, add an overflow
hidden to it

## Server components can be rendered inside client components

In this example, the context is a client component, and it wraps a server component such as the restaurant page.
Since server components can be passed as children to client components, they can still be rendered inside client-side
provider. This allows us to manage a global state on the client while still leveraging the benefits of server components

## Cart context initial value empty parameters

```ts
export interface ICartContext {
  products: CartProduct[];
  isOpen: boolean;
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  isOpen: false,
  toggleCart: () => {
    throw new Error("toggleCart was called out of the CartProvider");
  },
  addProduct: () => {},
});
```

In typescript, when we define a function this way on the CartContext, e.g. addProduct: () => {};

we are not explicitly stating that it receives a product. However, this works because TypeScript already knows, from the
ICartContext needs to have the following signature

addProduct: (product: CartProduct) => void;

Therefore, even if the initial implementation of addProduct, is simply as () => {}, ts already infers that this function
needs to accept an argument for it to be compatible with the interface. This happens because TS allows functions to have
non used parameters without generating an error

In other words, internally ts knows that addProduct has the correct signature, but simply do not use the argument. If we
want to let this even more explicit, we can write it as

addProduct: (\_product) => {},

the use of \_product indicates that the parameter exists, but won't be used (common practice when the parameter is required
for the interface, but won't be used in that specific implementation)

## Properties being passed to a function with more information then needed

```ts

  // Cart Context

  export interface CartProduct
  extends Pick<Product, "name" | "price" | "imageUrl"> {
  qty: number;
}

  export interface ICartContext {
  products: CartProduct[];
  isOpen: boolean;
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;


  addProduct({ ...product, qty: quantity  });

// Product Details Component

export interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
          slug: true;
        };
      };
    };
  }>;
}

```

What's happening here, when we call the AddProduct, the product cart expects to receive some properties from the product
and the qty, but the product we are passing when calling the AddProduct function, has all the properties from product and
some of the restaurant, so why does it work?

Typescript is allowing this assignment because the spread operator ({...product, qty: quantity}) results in an object that
contains all the properties of product, while adding the quantity property.

However, the addProduct only expects an object of type CartProduct, which must have at least the properties name, price,
imageUrl and qty.

Even though the object contains extra properties, typescript does not prevent passing the objects with additional properties
as long as they include at least the required ones. This behavior is known as "excess property allowance in assignments",
as long as the object is created dynamically with ...product.

Without the spreading it would not work because product does not have quantity.

By making addProduct({ ...product, qty: quantity }), typescript will now allow because the new object has all the minimum
properties required by CartProduct and ignores the extras.

## Adding products to cart

The logic here is the same as the one used in every cart, when we add a new product it will be added to the products state,
now we are going to iterate these products.

we check first, if the product we're trying to add, if it's already on the cart, if yes, it will

Step by Step

1. Use the state setter to the set the new products object, here we'll use a const named prevProducts to store the state
   previous products
2. create a constant of existing products, holding the value of a prevProducts.find, and seeing if any product id matches
   the id of an existing cart product
3. If yes, it will return another iteration over the prevProducts, and if the prevProduct id is the same as the product
   we are trying to add, it will create an object that will spread all of the attributes, but summing the qty to the one
   being passed
4. If not, it will simply return the product
5. Outside of the if, return an array containing the prevProducts and the new product being added

On the way coded,we utilized map to preserve the immutability, which is that we NEVER SHOULD directly modify a state, because
it can lead to problems on components update and lost of performance. So instead, we always create a new version of the
state, updating only the necessary code
