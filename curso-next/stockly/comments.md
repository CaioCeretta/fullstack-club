# File for components that i found useful

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
something different than a default <button>, and we might want that this button act like an achor <a>, so we would like
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
