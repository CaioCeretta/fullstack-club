import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from './_components/header'
import { Button } from './_components/ui/button'

export default function Home() {
  return (
    <div className="ml-8 mt-8 w-full space-y-8 bg-white p-8 py-8">
      <Header>
        <HeaderLeft>
          <HeaderTitle>Dashboard</HeaderTitle>
          <HeaderSubtitle>Overview</HeaderSubtitle>
        </HeaderLeft>
        <HeaderRight>
          <Button>Add</Button>
        </HeaderRight>
      </Header>
    </div>
  )
}
