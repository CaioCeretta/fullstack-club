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

## Cart context

We've created the cart context inside the [slug]/menu folder instead of in a more generic place, such as data/contexts/cart.tsx

The reason for it was, the cart context, even though it is a global state manager, it will only be accessed and used inside
of the products and cart components, and no other place. So it's completely fair to make it more "exclusive".

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

## Cart Item Component

In the way done until now, the sidebar, with the products, displays only the products name, price and quantity, and this
component will be used to make it more beautiful to the user.

on the cart product item, we will simply create a div, that is flex, on one extremity it will be the name, price and
quantity, on top of the other, and the delete button on the other extremity.

Problems we faced:

1. Some products names were too close to the delete button

   to fix this, on the p element that rendered the name, a max-w-[90%], just so the p tag don't take the whole available
   width. The line will break, if we want to avoid this, we have two options

   - truncate text-ellipsis
   - Works only in one line, the overflowing text will be cropped and the ... will automatically show if there is no
   - available width. However it depends of overflow-hidden to work correctly

   . line-clamp-1

   - Will also cut the text in one line, but uses display: -webkit-box and -webkit-line-clamp.
   - It depends on this display property, so it can not work well in all browsers
   - line-clamp-1 doesn't FORCE the text to stay in one line, if no max-width is set, it can expand.

Because there is a max-width on the element, i'll choose for the line-clamp-1

2. Handling the addition and the subtraction quantity

We were handling this only on the products page. Since more than one component will need this functionality, we'll start
handling it on the context.

On the product details page, it will remain the same, because that quantity we initially add on a product, is not yet
part of the state. However the new function to deal with the increase and decrease on the sheet, is going to be on the
context, this will basically remain the same but iterating over the products state array.

3. Pushing down the finish order button

For this we separated in two divs, one with the product item and the other one with the button and the total and made
the cart items div to take all the available height, and the div that wraps both of these divs contain a h-full, meaning
that it would take the rest of the available height, a flex and flex-col.

h-full inside flex works by taking the whole available space, respecting the space already taken (e.g. by the header)

## Array functions, when to use {} and return

Here we had the following use case:

I was using the setter of a state with {} and with returns, but i asked chatGPT for it to help me, because i thought there
were too many returns, and it gave me the following explanation.

The {} happens because of the syntax of arrow functions inside of JS/TS.

The setter function with returns is

```ts
function handleIncreaseQuantity(productId: string) {
  setProducts((prevProducts) =>
    prevProducts.map((prevProduct) => {
      if (prevProduct.id === productId) {
        return {
          ...prevProduct,
          quantity: Math.min(prevProduct.quantity + 1, 99),
        };
      } else {
        return prevProduct;
      }
    }),
  );
}
```

here use the {} because there are several instructions inside of the map, since we are using {}, we need to explicitly
return to inform what the function returns.

however, there is a simpler way to do the same.

If the function returns immediately a value, without no extra information, we can omit the {} and the return

The setter without {} and return.

```ts
setProducts((prevProducts) =>
  prevProducts.map((prevProduct) =>
    prevProduct.id === productId
      ? {
          ...prevProduct,
          quantity: Math.min(prevProduct.quantity + 1, 99),
        }
      : prevProduct,
  ),
);
```

This works, because when an arrow function has only one expression, JS understands that the expression is the return.

In this case, map needs a function that returns a new value for each item in the array, and we're directly returning the
object {...prevProduct, quantity: ...} or prevProduct without {}

In a quick comparison

. Code with {} and return

- Uses {} when there's more than one line of code
- requires explicit return
- slightly more verbose

- simple example

  const double = (n) => {
  return n \* 2
  }

. Code without {} and return

- Doesn't use {} if the function returns a single expression
- implicit return
- more concise and direct

- simple example

const double = (n) => n \* 2

Back to our example, even though the setProducts take more than one line, everything is one single expression

a expression in javascript is any piece of code that produce a valor, therefore, const resultado = 2 + 3 is an expression.

And taking a look at our code of setProducts, we are able to see that is just a big expression being passed to setProducts.

The reason is that the prevProducts.map is an expression which returns an array, and this is an expression. Because the body
of the map function does not use {}, each call to prevProduct => ... also directly returns a value

An example of a code that is not a single expression would be if on the map, we assigned the value to a new constant, and
returned it on the set, so because we are creating a variable and then calling a return, it will now need {}

## Shadcn Drawer

Drawer is a UI component used to show content on a sliding panel, it can slide horizontally or vertically, it's commonly used as navigation menus or configuration panels.

On our case, it will be used as a sliding component for the order confirmation, inside of it, we'll have both the header
and a form for the user to insert their information.

The form is made with shadcn form, and in order for it to work, we use a <FormProvider> and a <form>, we spread the form
constant, created by the useForm function in the <FormProvider>, and the <form> will have the onSubmit from useForm.

FormProvider is passing the rhf context to the form and all the fields inside of it. Form will be a UI component, dealing
with the appearance and structure of the Form, whilst FormProvider handles the formLogic (state, validation, etc.)

another option would be of using <Form><form> is incorrect, because nesting of form elements is generally unnecessary and
can cause issues with submission, handling, formState and event propagation.

## Issue about the drawer content not being unregistered on cancel

One change we've made, is that we wanted unRegister the drawer whenever we click on the cancel button, we wouldn't be able
to do so

Because the finish order button, triggered the opening of the drawer for the user to type the name and CPF. However, if the
user closed the drawer and reopened it, the data of the form would still be stored in react state

FinishOrderButton was moved inside of the sheet and a isOpen state was created to control
the opening and closing of the drawer

In order to fix this issue, these steps were followed:

. FinishOrderButton was moved back to the sheet
. A isOpenState was created to control the opening and closing of the drawer
. The dialog interface begin receiving the isOpen and setIsOpen
. shouldUnregister: true was used on the form to ensure that the fields of the form to be unregistered when the drawer was
closed

In Summary:

- Before the change

. FinishOrderDialog remained mounted (didn't unmount on closing the drawer)
. useForm stored the state of inputs even if the drawer closes
. This happened because the FinishOrderDialog continued existing in the component
tree, only with open={false} but the form remained mounted and preserved the values

- After the change

. Now, FinishOrderDialog is only rendered when the dialog open state is true
. When the user closes the drawer, that state changes to false and the FinishOrderDialog is unmounted
. As the useForm is inside the FinishOrderDialog, he fades out with the component, resetting the values
. shouldUnregister: true reinforces that, ensuring that the fields are completely removed

This means that before the form always existed, even if it was hidden, so the values persisted. Now, by unmounting and recreate
the component, the form starts from zero every time the user opens the drawer.

Other observation:

The finish order dialog was being rendered outside of the sheet so it always existed on the component tree.
So when the user closed the drawer, it only was hidden (open=false), but the form inside was being kept in memory.

## Add new order to the db

We created an interface to the server action, that will be the data sent to the server action of adding new order to the
db

interface CreateOrderInput {
customerName: string;
customerCpf: string;
products: Array<{
id: string;
price: string;
quantity: number;
}>;
consumptionMethod: ConsumptionMethod;
restaurantId: string;
}

the problem with this first approach is that when we are dealing with a db that deals with prices, we never want to receive
it like this. We have to remember, a server action in the end, it becomes an API route, it's an abstraction that Next.js
makes.

Let's think of a big e-commerce, with many products, if we receive the price of each one of them in the front end, this
would open for several vulnerabilities. Therefore, we'll not receive the price on this interface, receive just the id of
the product, and inside of the server action, and then we'll get the price of the product.

The code is equal to the ones i'm used to do, with the difference that is that since the order products is an array, the
code is:

```ts
await db.order.create({
  data: {
    customerName: input.customerName,
    customerCpf: input.customerCpf,
    consumption_method: input.consumptionMethod,
    status: "PENDING",
    orderProducts: {
      createMany: {
        data: productsWithPricesAndNumbers,
      },
    },
    total: productsWithPricesAndNumbers.reduce(
      (acc, prod) => acc + prod.price * prod.quantity,
      0,
    ),
    restaurantId: input.restaurantId,
  },
});
```

where this productsWithPrices is:

```ts
const productsWithPricesAndNumbers = input.products.map((product) => ({
  productId: product.id,
  quantity: product.quantity,
  price: productsWithPrices.find((p) => p.id === product.id)!.price,
}));
```

We needed the restaurant, so to find that restaurant id, we are expecting the call to the server action to pass the restaurant
slug, then, it will find the restaurant that matches this slug, and the restaurantId of the order will be the fetched
restaurant.id.

## useTransition

On the dialog where we call this function we introduced a new feature which is react hook useTransition, that is a hook used
to manage asynchronous state transitions and avoid blockings on the user interface. It allows us to mark state updates as
"transitional" or of lower priority, ensuring that the UI will keep responsive while the updates occur

useTransition returns us an array with two values

1. isPending: A boolean that indicates if the transition is still running
2. startTransition: A function that allows us to mark an update as one with lower priority

in our example, we wrapped the whole createOrder inside a startTransition, so we can manage the loading state until the
creation finishes

## Order Page

In the order page, for the person to view his orders need to inform their cpf to track them. However, if no CPF is inserted
on the route param, a dialog will appear for the user to type in the CPF. and once it is entered,to avoid a new refresh,
we'll simply move the user to the same page that it is in, but now, with the CPF as a route param.

To get the current url it is simply the pathname, that comes from the usePathname hook of next/navigation, then, with this
CPF, we'll trigger a fetch to all the orders that were made by this person and call the orders list component

## Orders List

The orders list receives as a parameter, all the orders made by him.

Since we are dealing with the fetch of orders that needs to include the restaurant name and avatar, on the order typing
inside order-item, we'll say that order is of type

```ts
const orders = await db.order.findMany({
  where: {
    customerCpf: cpf,
  },
  include: {
    restaurant: {
      select: {
        name: true,
        avatarImageUrl: true,
      },
    },
    orderProducts: {
      include: {
        product: true,
      },
    },
  },
});

interface OrdersItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}
```

The query for orders, is getting all the orders, as well as the restaurants and the products of that order, but one thing
to keep in mind, orderProducts is a table, which has a column product, which indicates which product on the product table
we are talking about, and by default, the order product only has the price and not the name of the product, so this is how
we are going to be able to fetch it

In the interface code we are using Prisma from @prisma/client and telling it's of type OrderGetPayload and as generic, the
same values we are receiving on the original query. This is used when we are using, not only the type of order, but also
its restaurant, that is a foreign key.

## Clsx utility

One change we had to made is because of prettier, not dealing so well with template literals, in terms of breaking lines
we had two options, one is of where we want the line to break, we add close the quotes add a plus sign, and break the line
or the option we chose that is by using the clsx library

clsx is a small utility library used to conditionally join CSS classes names in JS. It helps building dynamic className
strings based on certain conditions.
It works by evaluating its arguments, which can be string, objects or arrays, and then only including the classes names that
evaluate to true or are present
We used this library because it fixed the prettier line breaks on save, as well as handling the conditionals, at the end
it was:

className={clsx(
"w-fit rounded-full px-2 py-1 text-xs font-semibold text-muted-foreground",
order.status === OrderStatus.FINISHED
? "bg-green-400 text-gray-50"
: "bg-gray-300",
)}

In the clsx, the first set of classes are the default styling, while the second set are the conditional classes.

## Final touches

1. Fixing the create order action, by adding the CPF on the redirect
2. Added an order by to the orders query
3. When creating an order, at the bottom of the page, added a div to keep track of the order total and products qty
4. Button to view cart on the new div (I had a problem with this one that i'll later revisit this code... )
5. On the constant, create a constant of cart product total quantity, with a reduce
