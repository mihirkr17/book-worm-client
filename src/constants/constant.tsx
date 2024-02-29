export const SERVER_URI = process.env.NEXT_PUBLIC_VERCEL_SERVER_URL || "";

export const ROLES = {
   user: "User",
   editor: "Editor"
}

export const BASE_URLS = {
   root: "/",
   bookUrl: function (bookId: any = "") {
      return `/book/${bookId}`;
   },
   bookModifyUrl: function (bookId: string = "") {
      return `/manage-books/book/modify?id=${bookId}`
   },
   loginPage: "/login",
   editorSignUpPage: "/editor/signup",
   signUpPage: "/signup"
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
   },
   editorSignUpUrl: '/auth/editor/signup',
   createArticleUrl: `/articles/create`,
   deleteArticleUrl: function (articleId = "") {
      return `/articles/delete/${articleId}`;
   },
   modifyArticleUrl: function (articleId = "") {
      return `/articles/modify/${articleId}`;
   },
   addBookByCsvUrl: `/books/add-book-by-csv`,
   createBookUrl: `/books/create-book`,
   modifyBookUrl: function (bookId = "") {
      return `/books/modify/${bookId}`;
   },
   pwdChangeUrl: `/auth/credential/change-password`,
   userDeleteUrl: function (userId = "") {
      return `/users/delete-user/${userId}`;
   },
   commentDeleteUrl: function (commentId = "") {
      return `/books/comment/delete-comment/${commentId}`;
   },
   userSignUpUrl: `/auth/user/signup`,
   loginUrl: `/auth/login`,
   checkAccUrl: `/users/credential/check-account`,
   resetPwdUrl: `/auth/credential/reset-password`
}