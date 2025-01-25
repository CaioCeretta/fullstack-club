# Explanation of the param in a next js page



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





