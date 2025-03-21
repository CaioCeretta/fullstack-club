# Programming Concepts

## Differences between a library and a framework
### Library

React is a library, a library specialized in creating UI interfaces. A library typycally has certain characteristics: it
focuses on doing one thing well, and takes a non-opiniated approach to how developers use it.

A non-opiniated approach means that, in a react application we have the freedom to build it however we want. For instance, 
we can use either function components, class components and structure our application according to our preferences

In summary, as a library, react provides flexibility and allow developers to choose how they want to implement the solutions

### Framework

On the other hand, a framework often combines on or more libraries to provide a more comprehensive solution that addresses
a wider range of challenges developers might encounter

A framework is generally more opiniated. For example, Next.js, unlike react, is a framework. It uses react, as a library,
to render the interface, but also includes additional features, like image optimization, fonts optimizatrion, server components, built-in data fetching mechanism, server actions, its own approach to implementing a middleware, and so on.

Because of these features, Next.js offer a more complete solution by integrating multiple tools and functionalities into
a single package;

## CSR / SPA

When a user accesses a client-side rendered (CSR) application, such as a Single Page Application (SPA) built with React,
the process happens as follows:

In CSR, the entire page content is generated in the user browser using JS. A SPA, on the other hand, is a type of application
where the navigation between "pages" happens without reloading the main HTML document. Instead of loading mulitple HTML
documents as in traditional websites, JS manages the navigation, handling different pages within a single HTML file


What happens when a user accesses an application which is client side rendered?

1. Initial file loading: 

As soon as the user enters a webpage (e.g site.com), the breowser sends a request to the server to fetch the necessary
files (the main HTML, CSS and JS file), These files can be hosted on a server or a static hosting service, like s3, netlify,
or Vercel.

2. HTML Initially sent to the browser:

The HTML, sent by the server for CSR applications is almost empty. It contains only a basic structure and an entry point
where React will render the content. A typical HTML example will be basically

```
  <!DOCTYPE html>
    <body>
      <div id="root></div>
      <script src="/static/js/bundle.js></script>
    </body>
  </html>
```

The html which is sent to the website, is like this, is basically an empty html, that has a div with the id root and has
a script that points to a js and that js will insert the content inside our page.

3. Role of React
  
Once the browser downloads the JS, React is loaded and generate the code which will then be placed inside the <div id="root">
This allows the user to see the complete interface of the application

In summary, a SPA, which is what react creates by default, is an application rendered on the server side, and when we host
this application, when we build this app, what we are going to have is simply the empty html, the css and the js that will
populate this html.

1. Navigation in a SPA:

Since a SPA doesn’t reload the HTML document when navigating between pages, JavaScript (and libraries like React Router)
is responsible for dynamically updating the DOM and the interface. This gives the user the feeling of navigating between pages.

## SSR - Server Side Rendering

With SSRs, we have several benefits. including: 
. The server sends the app html with the content as soon as the user enters the page, different from SPAs

. When we are working with SPAs, with CSR applications, there is the processing time from the js file being downloaded,
which in cases that the file is too big, it can be a problem, and we also have the processing time for JS to be processed,
because that is also not immediate.
This is something that an application rendered by the server is going to deal better with, because the content that comes
initially, is already viewable by the user. 

Which problems does SSR solves?

SEO: As the application HTML already has some content, search engines like Google, are able to track it.

Smaller JS load: Instead of the application being mounted totally by JS (React), a lighter and faster process, called
hydration, will be executed.

Because React, in this case, it will already have content, so it won't be needed to utilize js to insert that content,
react will only add interativity, so React won't have the task of mounting the content, the DOM, he will only need to
obtain that already built tree, and add interativity to it, such as onClicks, states, reactivity, and others, because
that html is going to come pure, empty, without any JS, and who is going to add that JS, that such as a showing a popup
on click, and it will be done by a process faster and lighter named hydration.

Hydration is basically the react process of getting an HTML tree already mounted, and add JS to it, so for example, if
we have a button, that comes "raw" with only the content and we need to add an onclick on it, react, by the hydration,
will do it for us, so it will see that this raw button, needs a onClick on it, and insert on it

Summarizing it, hydration is the process where React "associates" the dynamic behavior to a static html that has already
been delivered by the server. This involves attaching event listeners, controlling states, animations, etc., to the DOM
elements that are already present


Which problems does SSR have?

The infrastructure is more expensive, since it requires a running server
Depending on the speed of the server, the time to exhibit the initial page can be slow
Each access to a page requires a new call to the server.

## GetServerSideProps

The getServerSideProps function in Next.JS is used to fetch or prepare data server-side on each request. Some use cases
and why it's recommended to use them, will be as follows: 

Basically, it is a special Next.JS function that runs only on the server and it enables ssr by preparing data before
rendering a page, some key uses are

### Key Use Cases

1. Dynamic Data Fetching

  . Use it when our page depends on data that changes frequently or is unique per request
  . Example:
    . Fetching data from an exernal API that returns dynamic on real-time data.
    . Querying a database for a user specific information
  
  . Example Code:

    export const getServerSideProps: GetServerSideProps = async () => {
        const res = await fetch('https://api.example.com/data');
        const data = await res.json();

        return {
          props: {
            data
          }
        }

2. User-Specific Pages (Authentication / Authorization)

  . Use it to serve pages tailored for the user

  . Example:

    . Fetching user-specific data based on cookies, tokens, or session information passed in the request
    . Redirecting users if they lack the proper permissions.

  . Example Code:

    export const getServerSideProps: GetServerSideProps = async (context) => {
      const { req } = context;

      const token = req.cookies.authToken;

      if(!token) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          }
        }
      }

      const user = await fetchUserFromToken(token);

      return {
        props: {
          user
        }
      }
    }

    Now these props are going to be passed as a parameter to the component of the page at render time. One pratical example
    would be

    export default function ProfilePage({user}: {user: { id: number; name: string} }) => {
      return (
        <div>
          <h1>Bem vindo, {user.name}!</h1>
          <p>Id do usuário: {user.id}</p>
        </div>
      )
    }

    The page component indeed receives an object named props, which contain the properties returned by GSSP, but when
    we use the destructuring directly on the function parameters, the word props does nort appear explictly, but it is
    implicit.

    So in Next.js, the page component receives automatically the props returned, and those properties are passed as the
    first argument to the function component, so if we didn't destructured the parameter, the component will receive the
    object props explictly, such as (props: {user: {id: number; name: string}}) ...

    So the destructuring "skips" it, leaving only the variables we want, which would be the equivalent of doing

    const ProfilePage = (props) => {
      const { user } = props
    }

    One thing we might notice is, in the way it's done above, we returned a CHUMBATED object, and it would be better to specify the types of the `getServerSideProps` return, by doing something as

    type User = {
      id: number;
      name: string
    }

    export const getServerSideProps: GetServerSIdeProps<user: User> = async (context) => {
      ...
    }




    Code Breakdown

      1. Context: The context argument received by this function is a "server-side context object" provided by Next.JS. It contains
      important request-specific data that you can use to tailor the responsive for a specific request.

      2. Params: the params of the type ParsedUrlQuery or undefined, it contains route params for dynamic routes.

      We use them to access dybamic route segments in the [params] or [...params] files, so for example, if we had a file
      named /pages/post/[id].tsx, we would access it like:

        export const getServerSideProps = async (context) => {
          const { id } = context.params; // `id` is a route parameter
          return { props: { id } };
        };

      3. req

      type: IncomingMessage, it is the Node.JS HTTP request object, which contains the access headers, cookies,
      or other request specific data

      e.g. const token == context.req.cookies.authToken;

      4. res

      type: ServerResponse, it is a NodeJS HTTP respose object, often used to modify the response directly, such as
      setting the cookies or headers or perform custom logic, like handling redirects manually

      e.g. context.res.setHeader('Cache-Control', 'no-store')

      5. query

      type: ParsedUrlQuery, it's the query string parameters from the URL, it's used to read query parameters passed in
      the URL, example for page with the url like /search?term=nextjs

      const { term } = context.query // term === "nextjs" 

  1. SEO Optimization
   
  . GSSP is useful for ensuring content is fully rendered on the server for search engine crawlers

  . Example

    . Pages where data must be indexed by search engines immediately such as blog posts or product pages

  4. Handling Query Parameters

  . GSSP allows us to handle query parameters dynamically

  . Example

    export const getServerSideProps: GetServerSideProps = async (context) => {

      const { query } = context;

      const res = await fetch(`https://api.example.com/items?search=${query.term})

      const items = await res.json();

      return {
        props: {
          items
        }
      }
    }

### When to use?

There are some use cases for us to keep in mind of, so we should use when

1. You need fresh data on every request.
2. The page depends on request specific information (e.g. auth, headers, cookiers, query parameters)
3. You're optimizing for SEO with dynamic content that changes frequently
4. You need to handle server-side redirects or respond with a 404 status

### What GSSP Guarantees

. Server-Side Execution: Code in getServerSideProps NEVER runs in the browser
. No Client-Side Data Leakage: Sensitive information (like database queries) stays on the server
. Automatic Props Passing: The props returned are automatically passed to our page component
. Improved SEO: Content is rendered server-side before sent to the client

### Combining Typing with Use Cases

When we type getServerSideProps, it enhances the developer experience for all these use cases

. Querying APIS: you get auto-completion for contet.query
. Handling Authentication: context.req and context.res are properly typed, reducing errors in handling cookies or headers
. Returning props: The type ensures you return the correct structure, helping maintain consistency between server-side
code and your page components


## SSR (Netflix) / CSR (Linkedin)

### Use case example:

Linkedin have a small performance issue when the user accesses the page, because one thing we already discussed about csr
is that the user will only see something after the js being downloaded, then after the it has has been processed, but
on large applications, such as Linkedin, it might take a while

However, in netflix, we use `SSR` to optimize this loading process.

#### How Netflix Uses Performance to Improve User Experience

##### 1. Test Setup
- Access the Netflix page.
- In the developer tools, set the network speed to the slowest possible.
- Filter the network requests to only display `.js` files.

##### 2. SSR in Action
- Netflix uses **SSR (Server-Side Rendering)** but still requests JavaScript files to perform **hydration** with React.
- During the download of these `.js` files, the initial page is not entirely blank:
  - Basic elements like the **header**, **footer**, and **styles** are rendered before all JavaScript files are fully downloaded.
  - This differs from CSR (Client-Side Rendering), where the screen would be completely blank until all JavaScript is loaded.

##### 3. Benefits of SSR
- Users do not need to wait for all JavaScript files to download to see something on the page.
- Requests to the Netflix API are only initiated after the initial JavaScript files are loaded and hydrated.
- This improves the initial user experience by displaying visible content quickly.

##### 4. SSR vs. CSR
- **SSR:**
  - Renders basic content directly on the server.
  - Provides a faster initial experience, even on slow networks.
- **CSR:**
  - Fully relies on JavaScript to render any content.
  - On slow networks, users see a blank page until all JavaScript is downloaded and processed.

##### 5. Performance Decisions in SSR
- In SSR, API calls can be made as soon as the user accesses a page.
- However, making API calls on the server, such as within `getServerSideProps (GSSP)`, can pose challenges:
  - If the API call is slow, it delays the page load for the user.
  - To mitigate this:
    - Avoid making the API call on the server.
    - Use client-side requests with tools like React's `useEffect`.
    - This approach ensures the interface loads quickly while API requests occur in the background.

##### 6. Netflix Example
- When accessing the Netflix page:
  - Only the header and footer are rendered initially by the server.
  - API requests are triggered only after the JavaScript is loaded and hydration is completed.
  - This ensures a more responsive user interface.
## 7. Comparison with LinkedIn
- LinkedIn uses **CSR**:
  - On slow networks, the user sees a blank page until all JavaScript files are downloaded and processed.
  - This highlights the key differences between SSR and CSR in terms of user experience.


## SSG (Static Site Generation) 

### How does it work?

. The HTML of the application is generated ONLY ONCE, on build time. Different from SSR, when we use SSR in our app, everytime
a user accesses the page, we generate a html for it, no matter how many times the user access it.
  In SSG it do not work this way, it does not require a server being executed. We saw before, that everytime we access a
page, on a server side rendered application, it will call the server, it will run during the lifecycle of our app, while it
is still running, it is required to have one.
  
### Which problems does it solve?

  SEO: One of the main problems it solves, is the SEO one, because with the app HTML being already loaded with content, search
  engines such as google, are able to track it more easily. 
  
  Lower js load: For the same reason as the ssr, with the html already "coming" with content, it is not an empty html
  that the csr apps have, and  we also have the same hydration process.

## Which problems does the SSG have?

  The content may turn obsolete, because the HTML is generated only once. So if the content is updated, our app won't be
  also updated, because different from ssr, that generated a html for each time we enter a page. So if we look at our
  previous example with the getServerSideProps, it will execute this gssp function, everytime we enter the page, but if we
  are using SSG, this does not happen. We still can fetch an api, call the database, but this will happen only once, so it
  is not indicated for dynamic applications.

  SSG is only recommended for applications we are sure the content won't change, such as a landing page, for a specific
  product selling, in these cases we won't need to have a server running unnecessarily. 

  But we need to make sure we are not using it on ecommerces products, which the stock of the product may vary and places
  like this.

  
  ## ISR - Incremental Static Generation

  `ISR` is very similar to `SSG`, the application html is generated in the build momento, but different from SSG, it can
  be modified, which explains its name, and it has this name because the html can be regenerated during the app lifecycle

  ### Which problems does it solve?

  It solves the same problems which SSG have, that are

  SEO: The page html already have content, search engines, such as google, can track it.
  Lower Load of JS: Instead of the application being mounted entirely by JS (React), a quicker and faster way, which we
  call Hydration, is done.

  ### Problems of ISR

  Even though it is possible to regenerate the app html during its lifecycle, there are still possibility that the data
  will become obsolete.  

  So, basically, we can add a property to the getStaticProps, which is the revalidate, where we will pass the number of
  seconds after which the page will be revalidated. This revalidation, can also be done, programatically, for example, we
  have a product listing and we generated this page utilizing isr, but we want to revalidate this list whenever we add
  a new product, and this can also be done.

  One thing we need to keep in mind is, ISR also needs a running server, because this html regeneration will occur from
  time to time, so a server is needed for it, is not like a ssg where we need a server, it has updates on the page, but
  they are not frequent.

  ## Conclusion

  The rendering methods in Next.js, include Static Site Generation (SSG), Server-Side Rendering (SSR), Incremental Static
  Regeneration (ISR) and Client Side Rendering (CSR). Each method serves different purposes, balancing performance, data
  freshness and user experience

  ## Server Side Rendering (SSR)

  When is it executed? in each client request

  Where is it executed? In the server, each time a request is done for the page.

  What it does? Uses the function getServerSideProps to fetch api data, databases, or other operations in the server on each
  request. The page is generated dynamically, personalized and always updated

  Benefits:
    . Personalization: It allows page personalization based on informations specific of each user, such as login data
    or preferences

    . Security: There is no code running on the client, which means that sensitive data are kept on the server

    . When to use? For pages that requires real time data or personalization (ex: Dashboards, Profile pages, Result Search
    Pages)


  ### Static Site Generation (SSG)

  - When is it executed? During the build of the project

  Where is it executed? In the server, but only once, during build

  What it does? Uses the function getServerSideProps to fetch api data, databases, or other operations generating a static
  page that will be exhjibited and served directly from a CDN. This results in quick loading time and high escability

  Benefits:

    - Performance: Pages are pre-generated and stored in a CDN, offering quick loading

    - Security: There is no code running on the client, which means that sensitive data are kept on the server

    - When to use it: For pages that the content does not change frequently, (ex: Blogs, Product pages that do not change
    frequently )

  ### Incremental Static Regeneration (ISR)

    . When is it executed?
    
    During the build of the project, but allow pages to be revalidated in an incremental way after
    the deployment

    . Where is it executad?
    
    In the server, but in an incremental way, which means that the pages can be generated static generated
    in the beginning, and afterwards, revalidated on configured intervals

    . What it does?

    It combines the benefits from SSG, the capacity of updating static pages without the need to rebuild the whole site.
    The paparameter revalidate defines the time interval after which the page will be revalidated on the server, generating
    a new dynamic way

    . Benefits

      - Performance: Keep the pages quick just like the ssg, but allows revalidation for fresh data
      - When to use it? Pages that can be static, but need to be updated from time to time with new data (ex: products
      catalog, blogs with new articles, news)

  ### CSR (Client Side Rendering)

    . When is it executed?
    
    On the client's browser, after the page is loaded

    . Where is it executad?
    
    On the browser, after the initial HTML is loaded

    . What it does?

    It does not depends on the server rendering. Instead, it usews js on the client to load the data after the page loading.
    The rendering is made directly on the browser

    . Benefits

      - Interactivity: Ideal to web sites that require a lot of interactivity or dynamic functionalities
      - When to use it? For SPAs (Single Page Applications) where the data is loaded and manipulated on the server side
        after the HTML has been served (ex: real time chats, social media feed)

  ### Quick Comparison

  **SSG** - Executed during build, on the server (only once), for pages with static data or that do not change frequently
  **SSR** - Executed on each request, in the server (each request), for pages that need real time data or personalized
  **ISR** - Executed during build, with incremental revalidation, in the server (with revalidation), for pages that are static
  but need to be updated from time to time
  **CSR** - Executed on client side, on the browser, dynamic pages that load data after the initial loading
    
  ### Summary

SSG and ISR are ideal for static pages, with ISR allowing incremental content updates without the need for a full rebuild.
Both methods ensure high performance, fast load times, and security by keeping sensitive data and logic on the server,
ensuring that no private information is exposed to the client. In ISR, after the initial static generation, pages can be
revalidated at set intervals to keep content fresh.

SSR is more suitable for dynamic pages that need real-time data based on the current client, such as personalized content
or live information. Since the code is executed on the server for every request, sensitive data is kept safe on the server
side, preventing any exposure to the client. This is ideal for pages that require up-to-date, user-specific data or highly
dynamic content.

CSR is more commonly used for fully dynamic and interactive pages, where the rendering happens entirely on the client after
the initial page load. CSR allows the page to be interactive and reactive to changes on the client side without reloading
the page. However, CSR needs special care regarding security, as it’s important to ensure that no sensitive data or logic
is exposed to the client through JavaScript.


  