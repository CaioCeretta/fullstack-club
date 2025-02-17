# File for components that i found useful

## Folder Structure

**Even though it is a personal preference, in projects with more developers, it's always better to always follow the
structure preferred and chosen by the team, this comment is only for personal projects**

One thing the instructor does, that is not so common and i don't think it's the correct, is that he creates the folder
components inside the app, aswell as the shadcn components/utils.

This approach is not the best one, because when we put components inside app, even though it may work, it can possibly
cause some problems such as:

1. Separation of Concerns

   The folder app/ is specifically for the routing structure of the pages inside app router. Reusable components are not
   exclusive of a specific route and can be used in different parts of the application, so it makes more sense for it to
   be outside app/

2. Avoid Unnecessary Re-render

   By puting components/ inside app/ it can lead to extra re-renderings, specially because any change inside app/ may af-
   fect next's cache behavior. Keeping the components folder outside of the app, will improve the predictability of the
   cache behavior and react server components

So the best approach, in my view is

src/
├── app/ # Pages and Layouts
├── components/ # Reusable Components
├── utils/ # Auxiliary functions
├── lib/ # Third-party configuring (ex: shadcn, prisma)
├── styles/ # Global Styling

and if there are specific components of a route

src/
├── app/
│ ├── dashboard/|  
│ │ ├── page.tsx
│ │ ├── components/ # Dashboard exclusive component

## Naming conventions

1. Prefix with \_ folders that won't have a page inside of it, in practice, it will make this a private folder for next, so
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

## Next image optimization

Just as the fonts, next also optimizes our images and prevent the layout shift, that is like the font one, but if, for example
in our layout we have a specific space where one image was supposed to load and that image takes up to 500px height, the
layout shift would be that the DOM is structured the whole content, but without this image, but as soon as the image
loads, everything below it, is pushed to the bottom, and this is one of the things that next helps us on the Image
component. The image is also quicker, there is an automatic cache to the image.

One other benefit is that an Image from next, is only loaded as soon as it enters on the viewport, while it can't be
visible, it won't be loaded

## Shadcn

Shadcn is a collection of components b ased in RadixUI and TailwindCSS, designed for being copied, adapted and kept in our
code base, it combines accessibility, performance and flexibility, allowing us to create modern and cosistent interfaces
without being stuck in heavy or closed libraries

### Shadcn Button Breakdown Example

#### 1. Needed imports

. React: Necessary to create components

. Slot (Radix): Slot is an utilitary component provided by RadixUI that allow us to "replace" the element which a component
renders, without losing the functionality, accessibility or style from the original component. In simple terms, Slot acts
like a placeholder that can be filled by other element or component, this is useful to compose layouts or personalize
internal elements of components without altering its internal structure.

Slots are useful when, for example, we create a reusable component, such as the button, and sometimes we wish to render
something different than a default <button>, and we might want that this button act like an achor <a>, so we should
the button to be part of other component that already defines its own parent, which means, that for example

Imagine we have a parent component that already decides which will be the basis component, be it anchor, div, etc. when
we use Slot, the button can be **integrated** to this parent component without creating unnecessary DOM elements. and this
prevents situations like having a button inside an anchor, which is invalid when talking about semantic HTML

#### 2. Definition of Style Variants

. CVA (Class Variance Authority): A library to manage conditional css classes and variants

. cn: utilitary function to dynamically concatenate css

. Style Variations:

cva: Creates a class variant system.
Base classes: Global styles shared by all buttons (e.g. inline-flex, round-md, text-sm).

Variants:
variant: Set styles such as default, destructive, ghost, etc.
size: Set button sizes, such as default, sm, lg, and icon.
defaultVariants: Set default values ​​(variant: default, size: default).

#### 3. Properties and interfaces

`export interface ButtonProps
   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
   asChild?: boolean;
   }`

. This interface will extend all the native properties from a button (e.g. onClick, type, etc)
. Includes support to variants created by the cva (e.g. variant, size), by using the imported type of VariantProps and
determining its type as the typeof buttonVariants, the constant we created.

e. g.

`const buttonVariants: (props?: (ConfigVariants<{
    variant: {
        default: string;
        destructive: string;
        outline: string;
        secondary: string;
        ghost: string;
        link: string;
    };
    size: {
        default: string;
        sm: string;
        lg: string;
        icon: string;
    };
}> & ClassProp) | undefined) => string`

. Adds to property asChild to render other element that is not an <a>, <div>, etc.

#### 4. Main Component

e.g.

`const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";`

. React.forwardRef: Allow us to pass a reference to the "underlying" DOM, this DOM refers to the internal structure of a
DOM that the browser maintains to represent a web page. When we say something affects it, we mean changes that happen
direcly in the actual DOM tree, impacting the rendered HTML document.

##### Underlying DOM explanation

1.  Direct DOM manipulation (Vanilla JS)

document.getElementById("myButton").innerText = "Click Here";

Here the button text is being changed directly in the underlying DOM

2.  React and the Virtual DOM (React)

In React, changes are not applied directly to the underlying DOM. Instead, the Virtual DOM efficiently compared (diffs)
changes and updates only the necessary parts of the real DOM. Example

function MyComponent() {
const [text, setText] = React.useState("Click Here");

return <button onClick={() => setText("Clicked!")}>{text}</button>;
}

react handles changes internally before updating the underlying DOM

Why does this matter?

- Efficiency: Directly manipulating the underlying DOM can be slow because every change might trigger expensive re-rendering
- Abstraction: Libraries like React avoid direct DOM manipulation to improve performance and maintainability

. asChild

if true, the components uses <Slot> to render a custom element, e.g. <a>, or else, it renders a button

. cn and buttonVariants

concatenates classes based on chosen variants and aditional classes (className)

### 5. Exports

export { Button, buttonVariants }

export the main component that will be used in the app and the buttonVariants if we need to use the styles somewhere else

#### How does is the Button used in components

import { Button } from "@/components/ui/button";

<Button>Default</Button>
<Button variant="destructive">Delete</Button>
<Button size="lg" variant="outline">Large Outline</Button>
<Button asChild>
<a href="/contact">Link</a>
</Button>

1. The component receives variant, size and asChild as props
2. The classes are generated dynamically with buttonVariants
3. It can render different elements (button or anchor) with consistent styling
4. Default stylings are applieds, but we can customize passing the className

So basically, className defaults to "" when omitted, variant defaults to "default", if empty, same for size, and asChild
defaults to false.

The variants and the size do not need to be passed because the cva already defines default values to them, if we don't pass
anything, the button will still work normally, because the cva has the defaultVariants, so if we do a simple
<Button>Click me!</Button>

it will still work.

the cva defaultVariants make this button to not need any property by using the defaults

## Projects that already have migrations

In these cases, we simply execute a npx prisma db push and this will get our migrations inside the code and apply them to
our db

## Extending Interfaces

In the $extend from where we create the PrismaClient instance inside prisma.ts, we used it to create a generated column
named status to say if a product is in stock or out of stock, but later, we used the same product in the table, and
typed it as a Product from prisma, but what happenned here is that the prisma product does not have a status, so a turn
around is to import that Prisma product, rename it as anything we'd like, then, create a new interface, extending the
product and adding the status property, this way, we wouldn't have any more errors

## Data Access Layer

We usually don't utilize queries on client components, because there is a possibility that the query return sensitive data
and for this reason, is better for us to create every server communication, on a separate file, in most cases, in a data
access layer folder, where we will separate every database table calls into functions for REST operations.

But we need to be careful of one thing, if we wished to make the component that uses this dal, a client component, to use
the data retrieved as a state, we'll see that we couldn't have done this, because we will be trying to run the prisma
environment in a browser environment, which occasionally would crash, but even after this crash, we will still be importing
the file that makes this fetch, has access to our db credentials, and there is a high risk of this file go into the js
bundle to the client. So when we have functions that are part of the dal, there is one option to prevent this, that is
using a library named server-only.

### Server-Only Library

Aqui está a explicação corrigida e mais clara em inglês:

Server-Only Library
This library ensures that certain modules, such as those in the data access layer (DAL), cannot be imported into client
components.

To use it, simply import "server-only" in the file that should not be accessible to the client. This prevents client
components from mistakenly importing functions meant to run only on the server.

If a client component tries to import a server-only function, the application will throw an error immediately, rather
than breaking after the bundle is loaded. Even if the server file could theoretically be included in the client’s
JavaScript bundle, "server-only" ensures that the error occurs beforehand, maintaining the security and integrity of
server-side logic.

## Data Table Interfaces

It took a certain while to understand, first, we created a file named table-columns.tsx, where created the columns the
data table would get

1. What ColumnDef<Product> does?

when we create the productTableColumns like this

export const productTableColumns: ColumnDef<Product>[] = [
{ accessorKey: "name", header: "Product" },
{ accessorKey: "price", header: "Unit Value" },
];

here, ColumnDef<Product> means that, each column uses data of the type Product, which means that we are saying that the
data shown on the screen, come from the structure of Product, so ts now knows that
. "name" needs to be a property in Product
. "price" also needs to exist in Product
. If we use a wrong property, it will give an error

2. How does data table uses the generics?
   Our Datatable was created like this

export function DataTable<TData, TValue>({
columns,
data,
}: DataTableProps<TData, TValue>){...}

here we are saying that TData represents the type of the table values, which is Product
TValue represents the values of the columns automatically

This means that TData is not "fixed" in the code. He is only defined when we pass the DataTable and pass the data

3. What happens when we pass the DataTable

We are passing like this <DataTable columns={productTableColumns} data={products} />

now typescript makes the following reasoning

1. looks at data={products}

.He sees that products is of type Product[]
.since data in DataTable is an array of Data[] he understands that TData = Product

2. Looks at columns={productTableColumns}.

. ColumnDef<Product> is already defined
. since TData = Product, the DataTable knows that the columns and data are from the same type

so it infers automatically that TData = Product with no need to write <DataTable<Product, TValue>>

The TValue, in the context of ColumnDef, represent the types of the cell, for each specific column of the table.

For example, if we have a column that shows the name of the product (string), the value of the cell will be of the type
string, if a column is the price of the product (a number), the value of the cell will be of type Number, but where is
TValue applied?

ColumnDef has the following structure

interface ColumnDef<TData, TValue = unknown> {
/// other fields
acessorKey?: keyof TData; // Key field that maps a property of TData
cell?: (row: Row<TData>) => TValue; // Function that defines the value of each cell
}

so here is the part of TValue

. accessorKey: Tells ts which property of TData will be accessible to obtain the value of the cell

. cell: the function cell can be mused to define how the cell value will be rendered, the return type of cell is a TValue,
the real value of the Cell

So TValue is the final output of the cell value, that can be a simple value, such as string, number, boolean, or a JSX
component, like the Badge we used

So in a practical example, let's look at our columns example

For the culumns name and price, the cell values is simply the value of the property Product, that can be a string "name",
or number to "price". TS will now infer the type of cell after the acessorKey, for the column status, its infered as
React.jsx (Badge Component). This happens because the function cell returns a JSX, and TValue is automatically adjusted
for this type.

Final Summary Of TValue Type

. TValue is the type of the value for each cell
. It can be automatically inferred after the accessorKey (if it's a simple property such as name or price) or it can be
explicitly defined inside the cell function (such as JSX and other custom types)

The reason for this is

- When we define accessorKey: "name", we are saying: "This value is showing the value of the property name from the Product
- It knows that the type Product has a property name of type string
- Typescript defines that the TValue is string
- TValue is infered as Product['name'] = string

Behind the scenes, in a case of { accessorKey: "name", header: "Name", {accessorKey: "price", header: "Unit Value}}

1. Typescript sees that ColumnDef<Product> means that TData = Product
2. When it sees that accessorKey: "name" , it knows that "name" is a valid key inside Product
3. Since Product["name"] is string, ts defines tvalue = string
4. the same happens with price, that TValue = number

And it all happens because, as the TData is Product, typescript will know the type of the value an accessorKey holds, and
even if TValue hasn't been specifically specified, because we didn' define a cell, typescript then assumes that the column
uses the value firectly from the accesssorKey

The reason it is infered even without cell is that ts does not explicitly know that TValue must be TData[keyof TData] inside
the interface definition, but it infers by default by:

1. ColumnDef<Product> fixes TData as Product
2. acessorKey: "name" implies that the cell will show Product["name"]
3. There is no cell, so it assumes that the value type is TData[acessorKey]
4. And the interface of ColumnDef is <TData, TValue = unknown>

And TValue type will be equal to (row: { row: { original: TData}}) => TValue

but if no cell is specified, he sees that TData is product, and he assumes the TValue is of type of acessorKey, this
happens because by typing ColumnDef<Product>[], typescript analyzes each object and maps TValue implicitly to TData[acessorKey]
because the key indicates the shown value

5. That's why it automatically adjusts the TValue

## Only plain objects can be passed to client components from server components error

This error is caused when we pass objects that are not plain objects, we need to understand that the data is going from
the network, kind of like a request is being made in the "middle" of it, and in this communication, we can only pass
objects that are transferable, which are:

. Primitive types
. String
. Array
. Map
. Set
. FormData instances
. Date
. Promises
. Plain objects, that are created with object initializers, with serializible properties
. Functions that are server actions

not supported types are

. React elements, or JSX
. Functions, including component functions or any other function that is not a Server Action
. Classes
. Objects that are instances of any class (other than the built-ins mentioned) or objects with a null prototype
. Symbols not registered globally ex: Symbol('my new symbol')

But here we are having a problem in the product where the type of the price is Decimal, so we are not being able to send
this product because his type is not acceptable by tsx. so to fix this, on our data, we must do

JSON.parse(JSON.stringify(product))

This will make the error go away, because JSON.stringify transforms the whole object in a JSON strinc, and JSON.parse
rebuildes the objeto after this string. This removes any type of special data that is not serializable for JSON, such
as Decimal from prisma

there could also be another option where we create, for exemple

const parsedProduct = product.map(product => ({
...product,
price: produce.price.toNumber(), // Converts decimal to number
}))

This solution fixes most of these problems, i wouldn't say all because i'm not sure

## Route handlers

With Route handlers in Next.JS we can create HTTP routes in our application, utilizing all CRUD operations.

If we were to create a route /products, it will be accessible from the server.

Inside the app/api/products we create a route.ts file. This file will define the API routes for our application.

Within route.ts, we define functions named after CRUD operations, When we makle a request, such as
fetch('/api/products', {
method: "POST"
})

ou fetch('/api/products')

the corresponding functions (e. g. POST or GET) inside route.ts will be triggered.

In a GET operation, we can retrieve various pieces of information from the request, such as cookies and headers. We can also return a response with different headers, set cookies, and so on.

In the fetch operation, we need to use the absolute path instead or relative, because in the server, by calling an api
with fetch, the relative path (/api/products) may not be resolved correctly, so we should or set and use environment,
variables for these calls, or use window.location.origin, or explictly pass the URL.

We've created the product api route to get and create new products, but instead of doing this on a server component, like
we previously did with the DAL that would do practically the same thing, we ended up creating an api route for this.

According to the instructor, that is a situation where does not make much sense for us to create the route, because creating
an http route like this, makes more sense in two situations

1. When we are working with a webhook, such as integrating our app with Stripe or any platform that needs to call an app
   route, after some operation finishes (e.g. We have an integration with Stripe and when we complete a purchase, stripe will
   process this purchase and, via a webhook, it will call a route of our app and this route will update our db with the purchase
   status), in a case like this, is more indicated to create a route handler, when we wish to expose any behavior of our app
   to a third party app.

2. When we have other application, so for example, we have our web app that's made with next and we want to expose a
   specific route for a mobile app, for example

So in most cases, we might prefer to make this communication with the db, through a server component and use the dal
instead of api routes, because we could see, in the development process, that the api route does not have any typing,
we had to do it in our own, is not like the function from our dal that we already typed the return as Promise<Product[]>
a route handler don't have this, we had to do something like

const "products: Product[] = await db.product.findMany();" on the route handler, then on the component

"const response = await fetch(`${baseUrl}/api/products`);

const products: Product[] = await response.json();"

if we didn't explicitly typed it like this, it would be any.

The same error would occur in the post method, our body wouldn't have a typing, and wouldn't argue if we passed a nonexistent
property.

While using DAL, we can type the arguments it will receive.

## Destructuring Reminder

if data was is an object that exports an object containing more properties than just the products, we couldn't do it
like this, because it is not an array, but an object with various keys, for example, products, totalProducts, lastUpdated

in cases like an object with more keys we can simply use

interface ProductResponse {
products: Product[];
totalProducts: number;
lastUpdated: string;
}

const data: ProductResponse = await fetchData();

then we do simply

const { products } = data

If we want to manually type for some reason, would be like

cost { products }: { products: Product[] } = data, or assigning a type to a variable
const product: Product[] = data.products

and if we do something like const { product: Product } = data; it would be interpreted as

get products from data and rename products to Product

another reminder

when we are destructuring (extracting values of an object), the name before the : is the original key and after the : is
the new variable name

when we are creating an object or defining properties

before the : is the key of the new object and after it, is an existing variable value

## Error in the API, NextResponse e NextRequest

I faced an error, where i tried using in the arguments of the functions, res: NextResponse, then when i return a response
i used res.json({..}), and i got an error saying that the function res.json wasn't expecting any arguments and i passed
one or more.

1. res doesn't exist there

. Next.js doesn't pass the NextResponse as an argument to the route handlers
. Different from Express, we don't manipulate the responses directly

2. We need to use NextResponse.json()

. Because res does not exist, we can't call the res.json()

So in summary

In express, route handlers receive two arguments, req and res, and on express, res is necessary, because we need to call
it manually to send the response

However in Next.js app router, there is no explicit res because the route handler shall return the response directly, it
follows the fetch pattern, where a response is directly returned instead of being manipulated, so it is not pure node.js
it's an approach focused on being compatible with all sorts of environments (e.g. serverless environments and native web APIs)

So we must not use res: NextResponse as an argument to route handlers

## Dynamic Route Handlers

We can also receive parameters in our route handlers, so for instance, we want to create a route GET /products/{id} to
fetch a specific product. Inside of the api/products folder, like we do for dynamic routes, with the dynamic parameter
being enclosed in brackets, we'll also create an [id] folder inside of the api/products folder, and a route.ts inside.

Now we export our GET function just as we did on the "default" route.ts file, usually is not all the CRUDs we focus on
these dynamic files, just some files that this route is going to support, then we do something as

export async function GET(
request: NextRequest,
{ params }: { params: { id: string } },
)

One other thing we can do is retrieve the query parameters, so if we get have a URL like http://localhost:3000/products/1234?teste="teste"
in this request, we can do something like

const searchParams = request.nextUrl.searchParams
const teste = searchParam.get('teste')

## Request Caching and ISR

In the product route, which retrieves the products object, we created a new constant which holds a `randomNumber` from 0
to 1, and export it together with the products, by retrieving its value inside the product page, and rendering it, even
though we might think that it would be calculated again, this doesn't happen, it stays the same

This happens because everytime we do a fetch, with the GET method, every get we execute with NextJS fetch, it is cached
by default, even if we now use an anonymous tab and visit the page, it will also render the same number. Because this
cache is in a server level, so all the users of our app, will see the same number.

This behavior is similar to static site generation, if we run a build, we will see that all pages that don't use
ssr, will to be rendered as static

Even though the fetch request runs on the server to populate the products, at build time, it runs only once and stores
the result in the cache. As a result, both the products and randomNumber become static.

If we want to get a new response on each API fetch, we can use the cache option in the second parameter of the `fetch`.
This allow us to specify the maximum caching duration or disable caching entirely.

By running npm run dev again, after disabling the cache, the randomNumber is going to be calculated again.

However, when we run a npm run build, the products folder is now being generated dynamically (server-rendered on demand).
This means that everytime we access the page, the server generates it using SSR, therefore, each time we run a npm run start
our random number will always be different. This happens because NextJS is smart enough to recognize that if we don't want
the response to be cached, it should continuously render a new page everytime a user accesses it.

But let's suppose we want to unite the "two worlds" with incremental static generation, which means, we want to generate
a static page, but from time to time we want to update the cache, we do like this

fetch('/api/products', {
next: {
revalidate: 5
}
})

Now, basically every 5 seconds the cache will be revalidated and be recalculated.

By running a npm run build, we'll see the page being rendered as static.

This happens because in ISG we generate a static page with SSG, but from time to time, it gets updated with a running
server.

If we perform a fetch with revalidation in a file and then make another fetch without revalidation in the same component,
the second fetch will still be re-executed when the first one revalidates. This happens because we can't mix `ISG` with
non ISR fetches at component level. To modify this behavior, the only option is increase the revalidation interval for the
second fetch

And also keep in mind that cache only works in server components, not on client components

## Request Memoization

For this example, we created a new products-list component, which receives the products as prop and renders them
in a <ul>.
Now let's say this ProductList is at the bottom of the component hierarchy, so the products page, hypotetically renders
5 components, and then last component renders the ProductList, for example:

a renders b that renders c that renders d that renders e that renders the ProductList, which then renders ProductList.
In this case, ProductList receives the products that were originally loaded in the component A.

This situation is an example of prop drilling, that happens when we pass down the prop to more than one level below,
most of the times, some components in the middle of the hierarchy receive the prop only to pass it further down.

And for these cases, where ProductList is a server component, we are able to use the request memoization.

To do this, we can basically do the request on the component 'a', we remove the requirement for the products prop
inside the ProductList and make the same request to products that we did on the component a.

Even though it looks like we are making two identical requests on the same page, the request is only being made once,
because Next.js recognizes that two server components are making the same request, with the same parameters, same path, etc.
Now, instead of performing two separate fetches requests, Next.js executes the request once and automatically passes the
result.

Keep in mind that we can only use the request memoization if we don't remove cache from fetches

## Database Caching

On our app, we use the getProducts from data access layer to fetch the products from the database.

By building the app, the product page will be generated as a static one, meaning that this component is being executed
with its HTML being generated based on that call. Now, if we create a new product on the database, the page will not be
re-rendered.

To prevent this from happen, we have two options

1. export const dynamic = "force-dynamic"

This forces the page to be always rendered on demand, which means that it will render everytime a user accesses the page,
by using SSR

2. using a fetch and pass to it, on the options, the next { revalidate } with the desired interval or cache: "no-cache"

There are also options less used for these cases, such as invoking functions to get the header or cache values from the
request.

Other important thing to remember is, if the page receives any parameter, like the [id] one, our page will always be
dynamic.

We can also use ISG for this getProducts, function, to do so, we use unstable_cache from next/cache, now, where we define
this function, we create another function named something like cachedGetProducts, and creates the function like

export const cachedGetProducts = unstable_cache(getProducts, ["get-products"], {
revalidate: 5
}),

where getProducts is the function that has an unstableCache, the second parameter is the key used when we want to invalidate
this cache, and as third parameter the time interval in which we want to revalidate this cache.

## Function Memoization with React Cache

It's possible to use the request memoization also on db queries. Previously we have seen that if there are multiple GET
requests to the same url, params, we can condensate 2 or more requests using request memoization. The same thing is possible
for database calls.

Now, we are making the same request twice, one on the product page component and other one on product list component, and
we will like to do it only once.

There's an option not using ISG, that is, instead of us using the unstable_cache, we'll simply use

export const cachedProducts = cache(getProducts)

This will also memoize any type of function

## Difference between `unstable_cache` and `cache(getProducts)`

1. Unstable Cache
   . Allows us to store the response of getProducts in cache
   . Cache is shared between all requests and will be invalidated after the specified time interval
   . If multiple calls occur within the same period, all of them will receive the same cached response

2. cache(getProducts)

   . Uses in-memory(RAM) caching at the function level
   . The cache lasts only during the function execution and does not "persist across" server restarts
   . There is no automatic revalidation, it simply avoids the re-execution of the same function within the **same rendering
   cycle**

In summary

. If we need a global, persistent, and automatically revalidated cache, use unstable_cache
. If we only want to avoid repetitive calls during the same execution, use `cache`

## SWR and Tannstack Query

1. SWR

   . What is SWR ?

   SWR is a library used for data fetching. Its name is Stale-While-Revalidate, which means that the data are initially
   provided by the cache (stale) and, at the same time, they are updated (revalidated), on the background. SWR aids on
   performance improvement by minimizing requests, storing data on cache and re-fetching it again when necessary.

   The main idea is to supply data immediately why they are revalidate synchronously

   ```ts
      import useSWR from 'swr'

      const fetchProduct = async (id) => {
         const res = await fetch(/api/products/${id});
         return res.json();
      }

      export default function Product({id}) {
         const { data: product, mutate} = useSWR(`/api/products/${id}`, fetchProduct)

         const updatePrice = async (newPrice) => {
            await fetch(`/api/products/${id}`, {
               method: "PUT",
               headers: {"Content-Type": "application/json" },
               body: JSON.stringify({price: newPrice}),
               })
               mutate(); // Revalidates cache data
         }

         return (
            <div>
               <p>Price: {product?.price}</p>
               <button onClick={() => updatePrice(99.99)}> Update Price </button>
            </div>
         )
      }

      /*
         In this example useSWR is used to fetch data of a product. By updating it, we call the mutate(), that forces a
         cache revalidation and keeps it updated, reflecting on UI changes
      */
   ```

2. TanStack Query

   TansStack Query is a more robust library for assynchronous data management in React. In addition to fetch data like
   SWR, it offers us more advanced functionalities, like the support to mutations (change in data), automatic refetch,
   cache control, optimistic updates, etc.

   Example:

```ts

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const fetchProduct = async (id) => {
  const res = await fetch(`/api/products/${id}`);
  return res.json();
};

export default function Product({ id }) {
  const queryClient = useQueryClient();

  const { data: product } = useQuery({
    queryKey: ["product", id], // Unique key for cache
    queryFn: () => fetchProduct(id), // Function that fetches data
  });

  const mutation = useMutation({
    mutationFn: async (newPrice) => {
      await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: newPrice }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["product", id]); // Revalida os dados no cache
    },
  });

  return (
    <div>
      <p>Price: {product?.price}</p>
      <button onClick={() => mutation.mutate(99.99)}>Update Price</button>
    </div>
  );
}

/*

   Code breakdown:

      1. useQueryClient() returns a query client instance, that is responsible to manage the cache and allow invalidation


      2. useQuery to fetch the product

         . useQuery is being used to fetch the product
         . it receives a configuration object with two main properties
            1. queryKey: defines a unique identifier to store data incache
            2. queryFn: defines the function that fetches data

         How does the caching works?

            . If ["product", id] are already on cache, react query immediately returns the data

            . Otherwise, the fetchProduct(id) will be called

      3. useMutation to update the price

         . useMetation avoids unnecessary re-fetches, being invoked only when the mutation is triggered (different from
         useQuery that is automatic)
         . It has an automated state management, tanstackq query deals with the states of loading, error and success, so
         we do not need to controll it manually
         . Efficient cache updates, when we use (e.g. queryClient.invalidateQueries(["product", id])) the product cache is
         updated after the mutation, avoiding inconsistences
         . useMutation is used to perform the mutation (i.e. changing data on server)
         . It receives a configuration object with two main properties
            1. mutationFn: assynchronous function that sends the PUT request to update the product data
            2. onSuccess: After the mutation success, we call the queryClient.invalidateQueries(["product", id]), which
            forces the cache revalidation

         . In conclusion it allows us to modify in data server with no need to manage the state manually, allowing us to
         invalidate the cache in an efficient manner, ensuring that the frontend will always show updated information.



      4. Flow of execution in tanstack query

         1. Component is rendered - useQuery tries to fetch the data
            . If there is already a cache, the data will be loaded immediately
            . Otherwise, fetchProduct(id) is called

         2. User clicks on the update price button - mutation.mutate(99.99)
            . Dispatch the PUT request to update the price on the server
            . After the success, invalidates the query

         3. Cache is invalidated.
            . This makes that the UI show the updated data automatically


*/

```

###🔍 Comparison: `useSWR` (Vercel) vs `useQuery` (TanStack)

| **Feature**               | **useSWR (Vercel)**         | **useQuery (TanStack)**              |
| ------------------------- | --------------------------- | ------------------------------------ |
| **Default Fetching**      | Stale-while-revalidate      | Background refetching                |
| **Mutations**             | ✅ Yes (`mutate`)           | ✅ Yes (`useMutation`)               |
| **Auto Refetch on Focus** | ✅ Yes                      | ✅ Yes                               |
| **Interval Refetching**   | ✅ Yes (`refreshInterval`)  | ✅ Yes (`refetchInterval`)           |
| **Prefetching Data**      | ✅ Yes                      | ✅ Yes (`queryClient.prefetchQuery`) |
| **Query Key Structure**   | URL-based                   | Flexible (custom query keys)         |
| **Server-Side Support**   | ✅ Yes (Next.js API Routes) | ✅ Yes (`React Query Hydration`)     |

💡 **Conclusion:**

- `useSWR` is great for simple URL-based data fetching and works seamlessly within the Vercel ecosystem.
- `useQuery` provides more control and flexibility, making it a powerful choice for complex applications.

In Summary

SWR - Better for simple requests and cases where performance and simplicity are key

TanStack Query - Best for complex cases involving mutations, real-time synchronization, cache granular control
and advanced optimizations

## Granular Form

The concept of granularity refers to the level of detail details or fragmentation at which something can be controlled,
processed or managed. The more granular, the smaller unit of control. The less granular, the larger and more comprehensive
the unit.

In the real world, we can think of

1. Little Granularity (Batch updates)

   . We rebuild the entire page using getStaticProps().
   . If a price change, the whole catalog needs to be updated.
   . This can be inefficient, because even products that haven't changed, are going to be re-rendered.

2. Moderate Granularity (Revalidation by Category)

   . If one uses ISR (revalidatePath('/products/category/X') ), only products of the category are going to be revalidated
   . Less processing than re-creating the whole site, but still is not the most efficient

3. High Granularity (individual updates by product)

   . With useSWR or react-query, each product can be updated without affecting the others, e.g.

Incremental Static Generation can be used in a "granular form" which can refer to different aspects of the application,
depending on the contex. This wraps up

1. Granular Rendering

. Next.JS allows rendering components or pages in a granular way by choosing the best strategy for each case:
. SSG (Static Site Generation) for static pages.
. SSR (Server-Side Rendering) for dybamic pages on the server.
. ISR (Incremental Static Regeneration) to revalidate pages on demand
. CSR (Client-Side Rendering) for loading in the browser

. One can combine strategies within the same project, applying them to different routes or even with a single page using
`useSWR` (Stale While Revalidate) that is a react hook from the swr library, that is an alternative to TanStack Query for
data fetching, caching, and revalidation in a React app, or the react query (View the topic about the differences)

2. Granular Code Splitting

. Next.js automatically splits code by page, loading the necessary resources.
. One can futher optimize this with
. React.lazy() and next/dynamic to load components on demand
. Dynamic layouts to avoid loading large components unnecessarly

3. Granular Caching

. Next.js 14 introduces Partial Prerendering and improved granular caching with the revalidatePath() function, allowing
one to revalidate only specific parts of a page in ISR
. One can also manually configure caching for different parts of the application using cache-control and revalidate.

4. Granular Permissions and Authentication

. In apps that use authentication, one can define granular permissions, restricting access to specific parts of the app
using Middleware, RSC and useSession()

## Shadcn Dialog & React Hook Form & Zod

### ShadcnDialog

In the dialog component, one error that we may face during the next development is, that the Dialog needs a DialogTrigger
that will fire for opening the dialog, but if we do something as

   <DialogTrigger>
      <button> Open the Dialog </button>
   </DialogTrigger>

DialogTrigger is a component that, at the end of the day, is "just" a button, so when clicking on this trigger, we'll see
a hydration error. This happens when we have something like a button inside antoher button, which is an invalid HTML. As
a result, the server sends this incorrect HTML, and the client needs to fix it, leading to a mismatch between what is
rendered for the user and what the server originally sent.

To fix this, we need to add the `asChild` property to the `DialogTrigger` component. By doing this, we indicate that the
trigger will now render its child element directly. Essentially, the functionality of this component is passed down to
its child, eliminating the outer button and preventing the hydration error.

To keep track if the dialog is open or not, we are going to create a state of isDialogOpen, then on the Dialog it will
receive an attribute open, being equal to this state, and another attribute of openChange, being equal to the setter of
this state. Now, on our onSubmit function, after the tasks are completed, we can set it as false and the dialog will
close as soon as it finishes

### Zod

Zod is a validation library and it can work together with the React Hook Form.

We start by importing { z } from zod, and after this z, we can create many functions with it

We can start by creating a zod schema, by creating something like

const formSchema = z.schema({
name: z.string()
price: z.number().min(1, {
message: 'The minimum value is 1'
})
})

After creating the schema, and by also importing the zodResolver from '@hookform/resolvers/zod', we will be able to
"entangle" the zod resolver to our form instance, from react-hook-form, so after using that resolver on it, whenever we
are going to create a new input, it will now know all the available inputs, and if we try to use any inputs that are not
part of our zodSchema, it will show us an error

### React Hook Form

      We could manage a form with just useState and onChange handlers, but a 3rd party library such as RHF does all the "heavy

lifting" for us, so we don't have to manually track values, handle validations, and deal with unnecessary re-renders

      So while improving the productivity, whereas we don't need to control the form for every field, using useState, and a

separate function for validation, and another one to handle the submit, with it, we can just `register`our inputs and it
tracks everything for us.

      And react's state updates will cause re-renders, which can be a pain in large forms, but because RHF use s uncontrolled

inputs (via refs), meaning React doesn't re-render on every keystroke. Our form will stay 'snappy'.

      RHF has a built-in suppport for validation with libraries, such as Zod, or native HTML, which means that manually coding

validation means writing tons of if checks, and with this, validation is declarative and centralized. It's just a schema
clean and simple. Instead of writing a function to validate an e-mail, whf will just know how to handle these erros, with
something as

      const schema = z.object({
         email: z.string().email('Invalid Email')
      })

      It has an 'Automatic Form State Management', so normally we would track isSubmitting, isDirty, errors manually, and with

useForm: const { formState: { isSubmitting, isDirty, errors } } = useForm();

### Easy Integration with Custom components

      RHF makes easy to integrate custom components into our forms without much extra setup. If we have complex inputs like
      date pickers, dropdowns, or custom checkboxes, we can use the Controller component to bind them to form state

      Instead of manually managing the state of each field, the Controller component handles the interaction between our
      component and rhf's form management

      for example

      ```ts
         import { Controller, useForm } from 'react-hook-form';

         function CustomInput({ control }) {
            return(
               <Controller
                  control={control}
                  name="username"
                  render={({field}) => <input {...field}>}
               />
            );
         }
      ```

      Controller is a rhf compoent used to integrate `uncontrolled components (such as custom components or components
      from UI libraries)` with rhf's form managing. When we need to use a component that does not manages its internal
      state using a native form, such as an input, the controller is the tool that conects this component to the RHF,
      allowing it to participate on the validation and the form state

      code breakdown

         1 - Custom Component

            . CustomInput component receives the control as a prop, this control is passed from the parent component, from
            where the useForm() was called
            . Inside of it, Controller is used to conect the custom component, (simple input in this case) to the rhf's
            managing system

         2. Controller

            . control={control} hwere we are passing the control, which came from useForm, to the Controller, this is needed
            for the Controller to know the state of the form it must control
            . name="username: name of the input field that Controller will register in the form state and how we'll access
            it from the data when submitted
            . render=(({field}) => <input {...field} />): Here we are using the render prop of the controller to render
            the input, function render receives an object field, which contain necessary properties like onChange, onBlur,
            etc.

      - And when should we use it?

         If we were using only one basic html input, we could use only register from seForm, but when the input is a custom
         component, such as a DatePicker, Select or anything from an external library, Controller is REQUIRED to ensure
         the value of this field will be correctly managed by RHF

### Dynamic Forms Explanation

      It also works well with Dynamic Forms. Adding/removing fields dynamically with manual state management is quite troublesome

but with RHF it is easier, so if we have something as

      const { fields. append remove} = useFieldArray({name: "items"})

      useFieldArray is one of the best resources from rhf, because it's pretty useful when we need to add or remove fields

dynamically.

      If we were to use controlled forms with a useState, we would have to generate a fieldArray with a useState([]), then

create a function to add/remoe items, then ensuring that each field has a unique identifier and then synchronize the values
correctly with onChange, and this would be really laborious.

      `useFieldArray` allow us to manipulate field arrays inside the form without the need of a useState

      For instance:

      Example Code will be on the Dynamic Form component

### Our example

      On our example, on rhf, the inputs were coded like this

      <FormField
         control={form.control}
         name="name"
         render={({field}) => (
            <FormItem>
               <FormLabel>Product Name</FormLabel>
               <FormControl>
               <Input placeholder="Enter product name" {...field} />
               </FormControl>
               <FormMessage />
            </FormItem>
         )}
      />

      this happens because this coded with the FormField from shadcn, field passed inside render already contains the properties
      from register, so the <Input> is still used as an control field, and this allows us to use shadcn/ui in a more "integrated"
      manner.

      The benefits of FormField includes:
         . Best integration with react-hook-form: it already takes care of field state binding
         . More patternized componentization: it helps us keeping a consistent styling on big forms
         . Integrated validation and error messages: Such as the FormMessage, that shows errors automatically

      The reason why it has integration with typescript, lies on the <Form> component that receives the form object that
      useForm gives us.

      To be able to fill the form, but unregister the data used, we added on the options of the useForm a property named
      shouldUnregister: true,

      To format the price input, the installed a npm library called react-number-format, and as the input, instead of using
      a <input type="number"> we used the NumericFormat from this library where we add our prefixes and separators as props
      to the component

      By default, the react-number-format and the FormField whenever we don't pass the type as a number, it will always
      interpret it as a string

      so in order two fix we'll have two different approaches

      for the NumericFormat, we add the attributes
      onValueChange={(value) =>
         field.onChange(value.floatValue)
      }
      onChange={() => {}}

      the need for this onChange, is because onValueChange he gives us all the values including the numeric value, so we
      are calling the onChange from react-hook-form passing the numeric value and this will make rhf to save the numeric
      value as the value of the input, and the onChange is needed afterwards, because the default onChange from the formfield
      will pass the value as a string

      and for the FormField we can

      stock: z.coerce.number().positive().int({message: 'Stock must be positive'}).min(0, { message: "Stock is required" }),

      OR

      add a onChange into the input field  onChange={(value) => {field.onChange(Number(value.target.value))}}

      because rhf's onChange needs to be called correctly, so that's why we use the fields.onChange() and not just
      onChange

      one issue we may face on this, is that, for example, the defaultValue is 0, and the input field treats the number
      as a string, and when we type, for example 123, it will remain 123 until parsed. Since we're using onChange to convert
      it into a NUmber, the value inside useForm will be correct, but the input display still allows leading zeros

      To prevent this, we can modify the onChange handler, like this

          onChange={(event) => {
            const value = event.target.value
            const parsedValue = value ? Number(value) : 0 // Aqui, converte para número
            field.onChange(parsedValue) // Passa o número diretamente
          }}

## Server Actions

Server actions are asynchronous functions that are executed on the server.They can be called in Server and Client
components to deal with form submissions and datra mutations in Next.JS Applications.

In our example, we are going to create the product with the form, and run a code on the server to create the product.

So we created a folder actions/product/create-product.ts a file where we will create our server action, on top of everything
we must pass a "use server", to determine it will only be executed on the server

Even though it may seem so, Next.js is not completely server by default, only inside the app/ folder, so whenever we create
a folder/file anywhere on the app, outside of the app folder, we must ensure that it is a server component

We may add server actions inside the app folder, but it would still be recommended that we ensure the "use server" at the
beggining. When we create a server action sinde of app/, next.js already understands that the function will be executed
on the server. However, we can still explicitly mark this function with use server so next will know that it should run
on the server.

Next.js does not automatically assumes that action functions must be executed on the server, specially if they involve
APIs calls, db data handling, or other sensitive operation. The "use server" tag makes it clear for Next.js that this
function must be tratedd on the server, preventing it from being leaked to the client.

The difference from server components to server actions, is that server components inside app/ are automatically executed
on the server, whereas server actions, even within the app, they are not automatically trated as server-side. They need
"use server" to ensure that the execution only occurs in the backend.

In summary we need to understand that server components inside app/ are server by default, but server actions, need
"use server" to ensure they will be executed on the server.

## server-only X use-server

`server-only` ensures that a function can only be imported and executed in a server component, or a server action, It
prevents accidental imports into Client Components, making it ideal for functions that handle sensitive data, such as
retrieving user data.

If we want to call a function from the client, such as `getProduct`, which retrieves data from the database, we can do so,
but we must ensure that it does nbot return any sensitive data

However, if we want to call, from the client, a getProduct function that retrieves the data from the database, we can
call it, but we need to take care of not returning any sensitive data.

The pattern recommended by Next.js is:

. Data retrieval functions should be part of the DAL and should be marked as server-only to ensure they are never executed
on the client

. Functions that modify data, (such as creating, updating, or deleting) can be server actions, allowing them to be called
directly from the client while keeping execution on the server. (But the mutation can also be made by API routes, it
is not exclusive to server actions)

### Server-Action Revalidation and Behavior

We could notice, that whenever we send a post request via a server action, the new product is added, but it won't reflect
on the page until a refresh.

To fix this, in our createProduct action, we must call the function revalidatePath from 'next/cache', after the product
creation finishes.The revalidatePath it receives, as argument, the path we want to revalidate, which in this case, is the
products page so it will be revalidatePath("/products")

If we ommit the revalidatePath, when we go into the network tab, we will see that the request hasn't had a response, but
as soon as we revalidate, the response is going to be the new generated page, a bit different from the usual html, but it
is a code that next.js understands and converts it to a jsx, meaning that we are only going to have a single request to
the server.

By opening the network tab in the developer tools, we can see that the first POST request to create a product is sent to
/products, which is the server action. However, after the next render, it behaves like an HTTP route.

If a server action, requires it to be executed if a user is logged in, we need, inside that server action, to verify if
the user is logged in. The reason is, because this is an http route, we can simply call that route as cURL from our terminal,
and this is a security breach.

So it is important to understand that a server action is a function that is exported as a http route, and depending on it,
we must make sure that the user is logged in.

Since we can call the url as a cURL on our terminal, we would likely want to create a validation on the action, not only
on the client page. One way to handle this is by replicating the createProductSchema using zod

Now, we type the function parameters using the same type as CreateProductType (e.g. name, stock, price), which we are
already doing

the difference is that instead of destructuring

await.products.create({
data: {
name,
price,
stock
}
})

we simply pass the data arguments as a CreateProductType object. This implicitly
ensure that the expected arguments, include those three properties.

So when we call:
create({
data
})

we are already enforcing that structure

## Exporting schemas and types

When we have a use server file, the ideal for us is to only export functions that we want to use, because by Exporting
interfaces, types, and other variables is not the best option, because next will always handle what we export from these
files as server resources.
Because of this, the indicated approach is to, inside the actions folder, to create a folder for each action, where the index.ts is going to be the action and
a schema.ts file, where we will export our types and schemas, since it is no longer
a server component

## Import x Import Type

### Normal Import ( import { Nome } from 'module' )

. Imports both values (functions, classes, objects, etc.) and types
. Can be used for something of the generated JAVASCRIPT

### Imports with Type (import { type Nome } from 'module')

. Imports only the types and its removed on the ganerated javascript
. Improves the performance by avoiding unnecessary imports
. Avoids warnings of not used imports

⚠ Cannot be used to import values, only types

### When to use?

✔ Use `import { type Nome }` if we are only importing the type
✔ Use import { Nome } if it's a value or we need both the type and the value
✔ If we need both, its ok to mix it:
import { createSchema, type CreateProductType } from './schema';

## revalidatePath & revalidateTag

on our getProducts function, we can also revalidate our getProducts using ISG in a server action.

Similar to the function where we used the unstable cache, its syntax is

unstableCache(functionName, ['key-name'], {
tag: ['keyName']
})

even though we usually use the second parameter for the key to invalidate, in this case, what we'll use to invalidate is
the tag, calling the revalidateTag with it

To exemplify this we are creating a getCachedRandomNumber, which will await a Promise of 1 second to resolve, then invoke
a Math.random(), and its tag will be get-random-number with a automatic revalidation of 10.

We now call this getCachedGetRandomNumber in the page and it will work, it will show the number and change it after 10
seconds.

Both the new call and the getCachedProducts, are now on the body of the component function, but when we add a new product
we just want to revalidate the products list, and not the randomNumber together with it. Because let's say that instead
the call to a simple Math.random(), is a more costly call for our app performance.

We now have two functions, one from our dal, that is dealing with the products fetching, caching and revalidation, and
in the actions file we have the function to add a product. Let's now add the function to revalidate path of /products,
after every product is added and on the dal functions (getProducts and getRandomNumber), the revalidation to 60 seconds.

Even though both our functions have a revalidation of 60 seconds, because of the revalidatePath from the addProduct, now
both calls are being executed right away.

This happens because revalidatePath will revalidate everything that is on that page, including the calls to external functions.

However, if instead of revalidating the path, we revalidate the tags we defined on our cached functions, it will now only
revalidate what we want, in this case, the get-products.

RevalidateTag is useful when we have more than one method that revalidates on the same component, but we don't want both
to be revalidated at the same time when some specific call is invoked

We can also revalidate a fetch request, example:

const response = await fetch('http://localhost:3000/api/products', {
next: {
revalidate: 60,
tags: ['get-products-fetch'],
},
})

const products: Product[] = await response.json()

and the same thing for the randomNumber.

This is just another approach we could take
