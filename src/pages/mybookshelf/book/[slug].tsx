import { useRouter } from "next/router";
import BookModifier from "./_BookModifier";
import Link from "next/link";
import UserProtectedPage from "@/Functions/UserProtectedPage";

export default UserProtectedPage(function () {

   const router = useRouter();

   const { slug, id } = router?.query as { slug: string, id: string };

   return (
      <div>
         <div className="py-2">
            <Link href={`/mybookshelf`} className="btn btn-sm btn-info" style={{ display: "inline-block" }}>Back</Link>
         </div>
         <BookModifier bookId={id} type={slug}></BookModifier>
      </div>
   )
});