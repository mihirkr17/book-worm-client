export const BASE_URLS = {
   bookUrl: function (bookId: any = "") {
      return `/book/${bookId}`;
   },
   bookModifyUrl: function (bookId: string = "") {
      return `/manage-books/book/modify?id=${bookId}`
   }
}


export const API_URLS = {
   deleteBookUrl: function (bookId: string) {
      return `/books/delete/${bookId}`;
   },
   bookRateUrl: function (bookId: string) {
      return `/books/rate/${bookId}`;
   },
   bookCommentUrl: function (bookId: string) {
      return `/books/add-comment/${bookId}`;
   },
   bookReadToReadUrl: function (bookId = "") {
      return `/books/read-to-read/${bookId}`;
   },
   bookCommentReportUrl: function (commentId = "") {
      return `/books/comment/report/${commentId}`;
   },
   bookDeleteOwnCommentUrl: function (commentId = "", bookId = "") {
      return `/books/delete-own-comment/${commentId}/${bookId}`
   },
   deleteReadToReadBookUrl: function (bookId = "") {
      return `/books/delete-read-category/book/${bookId}`;
   }
}