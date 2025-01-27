# Explanation of the param in a next js page


## Single [param] folder

A dynamic page, has its parameter, what is inside the square brackets, and it can be accessed directly through the
property `param`  that is passed to the page components, and in our case, of the [id], we'll extract the id from the
url using the param, so it would be, creating an interface, something as

interface ProductDetailsPageProps {
	params: {
		id: number
	}
}

than, inside the components, we cam type the component as ({params}: ProductDetailsPageProps)

or

({ params: { id } }: ProductDetailsPageProps)

then on this way we can access directly the id, because the id is part of a object params that is part of that interface

we might end up thinking that {id: { params }: ProductDetailsPage} is more intuitive because of the way we declare consts
such as const { id } = params, but on this case, we are inverting the structure of the object and it wouldn't work as expected
in the destructuring context. This happens because in the expected istructure in next, the component of the page receives
the props with the following structure

params: {
  id: number;
}

therefore, the destructuring shall follow this hierarchy: First we access params, and only then the id. The idea of
{ id: { params }} wouldn't be valid because we are saying "extract the id directly as a external property" and then
 look for an internal object called params. But the id is a field inside param

So here's an example

if we want to access directly the id, the correct manner would be to use the nested destructuring, like this

const ProductDetailsPage = ({ params: { id } }: ProductDetailsPageProps)

tghe destructuring gets the property param that is passed from the object to the component, and inside the param, the id
is exteacted and set as a variable for use in the component

Why not { id: { params }}: ProductDetailsPageProps, just like when we are doing something as

const { id } = params

the difference lies on the destructuring of the params of the component

When we destructure directly the parameters of the component, we are telling js to automatically destructure the object
received in the momen it is passed to the function

const ProductDetailsPage = ({ params: { id } }: ProductDetailsPageProps)

Here we are saying: 

- Extract the property params from the object that is passed as an argument
- Inside the params, extract the id
- Create a variable id available in the body of the function

while when we destructure inside the function body, in a constant, the process occurs after the object is received as an
argument, so 

And to remember this, we just need to think of destructuring as a "reflection of the real obj structure"

so when the object already exists in the scope "params", the structure is direct

when we are receiving this object as an argument of the function, the destructuring needs to respect the hierarchy of the
object in a single step

so, if the object is { params: { id: 123 } } the destructuring in the params of the function need to respect this hierarchy
so it will be { params: { id } }, which will express this hierarchy

Summary

So, the summary is, in a dynamic route, such as [id], by using next app router, thye component receives, by default, an
object `params` containing this dybamic value, so for example, a /product/123, params object will have the value of
{id: "123"}

The difference in destructuring, is that the params is first accessed and then the destructuring to extract the id occurs
const { id } = params

Here the params is the default object that contain the key id, so first we access param and then the id, whereas
const { id } = params means "create a constant id and then assign the value of params.id to it"

while ({params: { id }}: { params: { id: string }}) we are destructuring the object params directly on the function, before
entering the body of the component. This expression inside the parameters of the function means to destructure the property
param, and, inside params, destructure the id

So in the signature {params: { id }} we receive params already destructured directly by passing the parameters to the function


## Inner folder inside [param]

Let's say now, instead of accessing a page of localhost:3000/products/123 we know want to access localhost:3000/products/test/123

if we do it like this in the current folder structure, we will receive a 404, but if we want to show to the user, in this
screen, the products table, we can change the folder name from [id] to [...id], the difference will be, that on the [id]
object we get from the params now, it will contain both the url parameters, so by printing the id we get from the param
we will get the value of test123. This happens because now, with the ... we are basically spreading the parameters we send
onto it, so we can use as many dynamic parameters as we want, but we need to know that, inside the id param, we will now
have an array with all the parameters we are passing to the url in order


