
import { useRouter } from "next/router";
import Link from "next/link";
import ArticleModifier from "./_ArticleModifier";
import EditorProtectedPage from "@/Functions/EditorProtectedPage";

export default EditorProtectedPage(function () {

   const router = useRouter();

   const { slug, id } = router?.query as { slug: string, id: string };

   return (
      <div>
         <div className="py-2">
            <Link href={`/manage-articles`} className="btn btn-sm btn-info" style={{ display: "inline-block" }}>Go Back</Link>
         </div>
         <ArticleModifier articleId={id} type={slug}></ArticleModifier>
      </div>
   )
});