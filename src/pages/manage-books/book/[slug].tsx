
import { useRouter } from "next/router";
import BookModifier from "./_BookModifier";
import Link from "next/link";
import EditorProtectedPage from "@/Functions/EditorProtectedPage";

export default EditorProtectedPage(function (props: any) {

   const router = useRouter();

   const { slug, id } = router?.query as { slug: string, id: string };

   return (
      <div>
         <div className="py-2">
            <Link href={`/manage-books`} className="btn btn-sm btn-info" style={{ display: "inline-block" }}>Back</Link>
         </div>
         <BookModifier bookId={id} type={slug} auth={props?.auth}></BookModifier>
      </div>
   )
});