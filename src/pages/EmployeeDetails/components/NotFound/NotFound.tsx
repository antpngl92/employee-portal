import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from "@/components"
import { ChevronLeft, Frown } from "lucide-react"
import { Link } from "react-router"

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto overflow-hidden shadow-lg rounded-lg">
        <CardHeader className="flex items-center justify-center bg-white border-b px-6 py-4 ">
          <CardTitle className="text-2xl font-semibold flex items-center gap-4">
            <Frown />
            Employee cannot be found
          </CardTitle>
        </CardHeader>

        <CardContent className="px-6 py-4 text-center">
          <Button variant='outline' asChild>
            <Link to="/">
              <ChevronLeft />
              Back to employee list
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default NotFound