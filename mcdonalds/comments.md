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

## Option chosen by user

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
