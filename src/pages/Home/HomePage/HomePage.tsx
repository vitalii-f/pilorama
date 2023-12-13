import { DatabaseService } from "@/services/database.service"
import { supabase } from "@/utils/supabase"

function HomePage() {
  
  return (
    <div className='relative'>
      <h2> HOME PAGE </h2>
      <button onClick={async () =>{
        const admin = supabase.auth.getUser()
        console.log(admin)
        
        const { data } = await supabase.auth.updateUser({})
        console.log(data)
        // const articles = DatabaseService.getСategoriesList()
        // console.log(articles)
      }}> ЗАПРОС </button>
    </div>
  )
}
export default HomePage
