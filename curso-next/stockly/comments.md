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

it will work
