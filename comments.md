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

If we want the body and the html, to occupy the whole height, we change the global.css and we add

  html {
    @apply h-full
  }

  body {
    @apply bg-background text-foreground h-full;
  }

the h-full inside the @layer base { }


## Docker explanations

### Bind Mount - 
  for the postgres container we used the bind mount, which means that Docker is linking directory from our host machine
  (./.postgres-data) to a directory inside the container (/var/lib/postgresdata)

  When the container first runs it will check if that folder exist in the host
  if not it will create on the host machine, then docker will bind this directory to that one inside the container

  In subsequent runs, any changes made inside /var/lib... in the container will be reflected on the host machine in
  .postgres-data because of the link, and any file inside the host machine folder will be managed by the postgres user
  which is the default user in the container, this may lead to permissions users.

## Computed Property

Computed Property Names in JS, object keys are typically strings. However, computed property names allows us to use expressions
inside brackets to compute the key's name dynamically, this is useful when we need to use variables or expressions as the object
keys.

Example:

const key = 'name';
const obj = {
[key]: 'Fulano'
}

console.log(obj.name) // Outouts: Fulano

in an example we used in columns, we did something like

const TRANSACTION_CATEGORY_LABEL = {
  [TransactionCategory.HOUSING]: 'Moradia',
  [TransactionCategory.EDUCATION]: 'Educação',
  [TransactionCategory.ENTERTAINMENT]: 'Entretenimento',
  [TransactionCategory.FOOD]: 'Comida',
  [TransactionCategory.HEALTH]: 'Saúde',
  [TransactionCategory.OTHER]: 'Outro',
  [TransactionCategory.SALARY]: 'Salário',
  [TransactionCategory.TRANSPORATION]: 'Transporte',
  [TransactionCategory.UTILITY]: 'Utilidades',
}

here we are using those variables, as keys inside the object, those values (e.g. TransactionCategory.HOUSING), as the keys
are presumably variables or constants that hold some predefined values.

In our example we used

cell: ({ row: { original: transaction } }) =>
  TRANSACTION_CATEGORY_LABEL[transaction.category], 
...

Here we are expecting transaction.category to hold one of the values from TransactionCategory, and the
TRANSACTION_CATEGORY_LABEL[transaction.category] looks up the corresponding label, like Moradia

So in summary, using bracketr notation on the object keys allows for dynamic and flexible key definitions based on the
values, which is why it works so well with enums or other constant set of values  

## Why using the "use server" if everything in next is server side?

The reason for it, is primarily related to the app router and its way of distinguishing between server-side and client-side
logic. While next.js does automatically run certain functions on the server (like API routes, server-side rendering, etc),
it also offers a more explicit way to designate server-only code, specially in the context of reat server components and
how they interact with the client.

So explicity declaring the use server directive is part of next.js new RSC system. In Next.js 13, when we use the app router
app/ directory, the framework introduces server-side actions and server-side functions that can be called from client-side
components, but are explicitly run on the server. By making the function with 'use server', you're telling next that this
function is server-only. 

You don't need to explicitly mark every server-side function with 'use server'. However, if you're using a function inside a Server Component or a function that’s meant to be used exclusively on the server (like database calls, authentication, etc.), you can use 'use server' to clarify that.

Here's the distinction:

Without 'use server': Functions can be run both on the server and client, depending on how you invoke them.
With 'use server': Functions are explicitly marked to run on the server, which is especially useful for actions or
functions that should never execute on the client (like database queries or server-side authentication).
