# Differences about server components and client components

React as a whole is going into the direction of the server, the server helping even more the user. Server components take
this even further.

Before we talk about what motivated the server components creation, there are some concepts we need to understand

## SSR Problems

The problems server components come to solve, are some problems we end up facing with ssr

**. Works only on page level**

When we are working with SSG or SSG, for us to decide if a code is executed on the server or not, we can only one do this
on a page level. For example: Inside the home page we have an enormous component tree, so inside the home we have a
products component, and inside the products component, we have a products details component, and inside the product details,
we have a product category and inside of it, a category item, and. Then we have another component named categories, a users
component, and so on.

### Examples 

#### Example 1

Now let's suppose this products component need a prop of products to build the page, the categories a categories prop and
the users a users props.

Then we will want to execute a fetching of these props inside our server.

In next 14, with the app router, the getServerSide props and the others render methods are deprecated, but let's use them as
an example.

The fetchings would be inside of each of those components a, for example,

export const getServerSideProps = async () => {
  const products = await getProducts()
  const categories = await getcategories()
  const users = await getUsers()

  return {
    props: {
      products,
      categories,
      users
    }
  }
}

This would work, but it would take too long for the client, because even if we use a 
await Promise.all([ŕoducts, categories, users]), and execute this in parallel, let's say that to get the categories it took
5 seconds, the products 15, and the users 5. Our page is going to be inaccessible for 15 seconds, and this is a ssr problem.

#### Example 2

Other problem is that we can only get the server data from components that are "high" on the tree, because let's say that
this ProductCategories component also receive these categories, but these categories come from its Product parent component,
and it would be something like product.categories[]. If we try to access it like this, we wouldn't be able to get this data
from the server, we will have to get those from the client, so we'll have to, for example, to do a useEffect, execute a fetch,
and things like this.

So basically, we can only do the fetching from components that are close to our page, because we are passing these datas
as props.

#### Example 3

Let's say, hypothetically, that on this component tree we have, inside the CategoryItem component, we also want to keep track
of the Users, and this Users use the same user props from the Users component, we would have to prop drill this user, starting
from the Product, on ssr we can control what is executed on the server, if we call an api or not, but we can only control this
on page level. And the loading will be even bigger, as the number of queries increases.  

Now, let's say that this User component is only going to be rendered after a button click, so as soon as the user accesses
the app, it will have not been shown, but this user list will already need to be loaded, because for any reason we don't
want to get this user list from our client side

### End of examples

i.e. we can only can execute the data fetching on components that are at the start of the component tree


**. All the components are going to pass through the hydration process even if they don't have interactivity**

We have seen that this hydration process is basically react getting the "raw" html and adding interactivity to the components,
but even if a component doesn't have one, such as a onClick, useState, useEffect, on ssr he will need to pass through this
process because react is not smart enough to look at the component, see that it doesn't have interactions, and don't make
hydration of the page, and it may lead to a performance loss that could be avoided.

## What are server components?

. What are they?

- Server components are react components that are entirely rendered by the server

. Characteristics

- They don't have a state neither interactivity, e. g. useState, useEffect, onClick
- They allow the use of resources that are only accessible from the server
- Currently, they can only be used in conjunction with a framework (Next.js)

. Benefits

- Reducing the size of the JS sent to the client
  
  Let's say a conventional react components, that is not a server components, these components are sent inside the JS, by
  the bundle created when we do the build of the app and is sent to the user whenever he accesses the app.

  The server component, because it's rendered only on the server, the js size being sent to the user, is reduced, and
  consequently the time for the user to make these downloads, is also smaller. Because server components and its dependencies
  are not included on the app js bundle.

  Because let's say that we are importing a library inside our component, this library is included on the final bundle
  of our app, and for each library, these libraries need more libraries that are also going to be loaded, and it will
  make our js even bigger. 

  So by using a server component, neither the server component, nor its dependencies, are going to be included inside this
  bundle. 

- Faster loading and other benefits that come with this approach

One example of this, would be, as shown on the class, a todolist that is being retrieved by the database on the first line
of a component, so for example, the query is, on the first line of the component {}

const tasks = (await pool.query("SELECT * FROM tasks ORDER BY due_date ASC))
  .rows;

now this tasks component is populated with all the tasks, and now, on the return of the function, he is mapping througha all
the tasks and returning them to the client.

Because next all components are server components, if we don't say they are client components, by doing this we won't even
need JS for this page to work, it's going to work just as expected

In next.js, the behavior of the JS bundle sent to the client, is carefully optimized to include only the required resources
for each page.

1. What is sent in the bundle for the client?

When a user accesses a page inside a next application, he downloads a js bundle with:

. The necessary code to render the accessed page
. Any additional logic used in the page, e. g. event handlers
. The components or dependencies EXPLICTLY utilized in the page

________________________________________________________________________________________________________________________

2. Does the imported libraries come inside the bundle?

Not directly, if we import a library inside a page, what is going to be included inside the bundle is only the necessary
code of this library for what is being used in the page. This technique is called tree-shaking, so for example

```ts
import { debounce } from 'lodash'

function MyComponent() {
  return <div>{debounce(() => console.log('ciao'), 300)}</div>
}
```

In this example, only the code related to the debounce function is going to be included in the bundle, and not the
whole lodash.
If no functionalities of the library is being used directly, the library won't be included in the bundle.

________________________________________________________________________________________________________________________

3. What about the component?

The component itself (e.g. the JSX/React code) that is going to be rendered is sent to the client in the bundle

But there are important optimizations

. Code splitting by page: Each page in next.js generates its own bundle. This means that the client downloads only the
necessary code for the page hs is accessing, and no the code from all the app pages.

. Dynamic components (Lazy loading): If we use the dynamic of next.js or the lazy from react, the component will only be
loaded when necessary

dynamic() example

```ts
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent), {
  ssr: false // The component will only be loaded in the client
})

export default function Page() {
  return <HeavyComponent />
}
```

In this case, HeavyComponent is only going to be loaded by the client when the page is RENDERED on the browser

________________________________________________________________________________________________________________________

4. What does not go into the bundle?

What is not sent to the client includes:

. Code previously executed on the server, such as GSSP, GSP, GIP
. Variables or server side logic, such as DB operations
. Dependencies or libraries imported only on the server


________________________________________________________________________________________________________________________

5. Benefits of the optimizations

. Reduce the size of the bundle
. Improves the performance of the client's app
. Guarantees the security by keeping the sensitive logic on the server side





