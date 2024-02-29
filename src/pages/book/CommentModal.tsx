import { getDateTime } from '@/Functions/common';
import { faFlag, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const CommentModal = ({ comments, reportCommentHandler, handleDeleteOwnComment, user, bookId }: any) => {
   return (
      <div>
         <div className="modal fade" id="showAllCommentsModal" tabIndex={-1} aria-labelledby="showAllCommentsModalLabel" aria-hidden="true">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h1 className="modal-title fs-5" id="showAllCommentsModalLabel">Total Comments ({comments && comments.length || 0})</h1>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>

                  <div className="modal-body">



                     {
                        comments.map((comment: any) => {
                           return (
                              <React.Fragment key={comment?._id}>
                                 <div className="be-comment">
                                    <div className="be-comment-content">
                                       <div >
                                          <span className="be-comment-name">
                                             <a>{comment?.commentAuthorName}</a>
                                          </span>
                                          <span className="be-comment-time">
                                             <i className="fa fa-clock-o"></i>
                                             {getDateTime(comment?.commentCreatedAt)}
                                          </span>
                                       </div>
                                       <p className="be-comment-text">
                                          {
                                             comment?.content
                                          }
                                       </p>
                                       <span className="be-comment-report">

                                          <button className='btn btn-sm' style={{ background: "transparent" }} title="Report this comment" onClick={() => reportCommentHandler(comment?._id)}>
                                             <FontAwesomeIcon icon={faFlag} />
                                          </button>

                                          {
                                             comment?.userId === user?._id && <button className="btn btn-sm" onClick={() => handleDeleteOwnComment(comment?._id, bookId)}>
                                                <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                                             </button>
                                          }
                                       </span>
                                    </div>
                                 </div>
                                 <hr />
                              </React.Fragment>
                           )
                        })
                     }
                  </div>
               </div>
            </div>
         </div>

      </div>
   );
};

export default CommentModal;