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



