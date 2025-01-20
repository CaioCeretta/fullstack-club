/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
	// GetServerSideProps,
	GetStaticProps,
} from 'next'

// type Item = {
//   id: number;
//   name: string;
// }

// type Props = {
//   items: Item[];
//   searchTerm: string;
// }

export default function Home({
	tasks,
	randomNumber,
}: {
	tasks: any[]
	randomNumber: number
}) {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<h1>Server Side Rendering / Static Props</h1>

			<h1>{randomNumber}</h1>
			<main>
				{tasks.map((task) => (
					<div key={task.id}>
						<h3>{task.title}</h3>
						<p>
							{task.completed
								? 'Completed'
								: 'Not Completed'}
						</p>
					</div>
				))}
			</main>

			{/* 
      **************** getServerSideProps (Dynamic) *************************
      
      In this example of the getServerSideProps, it would be accessed on the Home like this
      
        we usually would have a type informing the types, so if, for example, the items returned had an id: int and a name:string

        then it would be something like

        type Item = {
          id: number;
          name: string;
        }

        Then we would have another type for the props being passed by the server, so if we returned the searchTerm of the
        query and the items, it would be somehthinglike

        type Props = {
          items: Item[]; 
          searchTerm: string;
        }

        now on the component creation we would do something like

        function Home({items, sarchTerm}: Props) {
          <div>
            <h1>Search Results for: {searchTerm}</h1>

            <ul>
              {items.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}

              </ul>
          </div>
        }
      
      **************** getStaticProps (static) ****************

      We are able to see below that the structure of them, is pretty similar, however, while in the gssp, we are using the
      query parameters to get the result of the searchTerm to structure our page dynamically based on the searchTerm, in
      the static paths we are not doing it like this, we are simply, statically, fetching the todos from the api, limiting
      it by 5, and returning it in the props: { tasks: data }, just like the gssp

      different from the gssp that this request will be done every time a user accesses the page, this function will only
      be executed once the applications builds.

      Now, if we build, and go on the next folder -> server -> pages -> index.html

      We are going to see that these todos we are loading and sending as props to this file, is already been stored on this
      builded index.html. Now everytime we access this page, it is going to be what's rendered.

      Now if we keep refreshing the page, we'll see the page isn't being loaded because everything is on cache, there won't
      be a call to an api

      If we build with a GSSP, it will be noticeably slower, because it will render the html, and also will make a new
      call to the api



      */}
		</div>
	)
}

// export const getServerSideProps: GetServerSideProps<Props> =
// 	async (context) => {
// 		const { query } = context
// 		const searchTerm = query.term || ''

// 		const res = await fetch(
// 			`https://api.example.com/items?search=${searchTerm}`
// 		)

// 		const items = await res.json()

// 		return {
// 			props: {
// 				items,
// 				searchTerm,
// 			},
// 		}
// 	}

export const getStaticProps: GetStaticProps = async () => {
	const res = await fetch(
		'https://jsonplaceholder.typicode.com/todos?_limit=5'
	)

	const data = await res.json()

	const randomNumber = Math.random() * 10

	return {
		props: {
			tasks: data,
			randomNumber,
		},
		revalidate: 10, //This function will be called every 10 seconds
	}
}
