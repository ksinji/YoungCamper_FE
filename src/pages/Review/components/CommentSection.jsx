import React, { useState, useEffect, useRef } from "react";
import Comment from "./CommentItem";
import {
  CommentsContainer,
  PaginationContainer,
  PageButton,
  CurrentPageButton,
} from "../components/CommentStyle";
import { getReviews } from "../../../lib/apis/api/getReviews";
import Loading from "../../../components/ui/Loading"; // 로딩 컴포넌트 추가

const itemsPerPage = 5;
const maxPageButtons = 5;

const CommentSection = ({ refresh }) => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 페이지 상태를 1부터 시작
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const commentsRef = useRef(null);
  const isFetching = useRef(false); // fetchComments가 반복 호출되는 것을 방지하기 위한 플래그

  const fetchComments = async (page = 1, forceFirstPage = false) => {
    if (isFetching.current) return; // fetch가 이미 실행 중이라면 중단
    isFetching.current = true;
    setLoading(true); // 로딩 시작
    try {
      // refresh가 발생하면 항상 1페이지를 페치
      const fetchPage = forceFirstPage ? 1 : page;
      const data = await getReviews(
        fetchPage - 1,
        itemsPerPage,
        "createdAt,desc"
      );

      if (data && data.content) {
        // 공백을 "%20"로 인코딩하여 이미지 URL을 처리
        const processedComments = data.content.map((comment) => ({
          ...comment,
          imageUrls: comment.imageUrls.map((url) => url.replace(/\s/g, "%20")),
        }));
        setComments(processedComments);
        setTotalPages(data.totalPages);
      } else {
        console.error("Unexpected data structure:", data);
        setComments([]);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false); // 로딩 종료
      isFetching.current = false; // fetch 종료 플래그
    }
  };

  // 새 리뷰 등록 시 무조건 1페이지로 이동 및 페치
  useEffect(() => {
    if (refresh) {
      setCurrentPage(1); // 리뷰 등록 시 currentPage를 1로 설정
      fetchComments(1, true); // refresh가 발생하면 1페이지를 페치
    }
  }, [refresh]);

  // 현재 페이지 변경 시 댓글 페치
  useEffect(() => {
    fetchComments(currentPage);
  }, [currentPage]);

  // comments 상태가 변경되면 리렌더링
  useEffect(() => {
    if (comments.length === 0 && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [comments]);

  const getPageRange = () => {
    const start =
      Math.floor((currentPage - 1) / maxPageButtons) * maxPageButtons + 1;
    const end = Math.min(start + maxPageButtons - 1, totalPages);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page); // 클릭된 페이지 번호로 상태 업데이트
    if (commentsRef.current) {
      commentsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleNextPageGroup = () => {
    const nextPage = Math.min(currentPage + maxPageButtons, totalPages);
    setCurrentPage(nextPage); // 다음 페이지 그룹으로 이동
    if (commentsRef.current) {
      commentsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handlePrevPageGroup = () => {
    const prevPage = Math.max(currentPage - maxPageButtons, 1);
    setCurrentPage(prevPage); // 이전 페이지 그룹으로 이동
    if (commentsRef.current) {
      commentsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // 댓글 삭제 후 현재 페이지를 다시 페치하는 함수
  const handleDeleteComment = async (deletedCommentId) => {
    try {
      // 실제 삭제 로직 수행 후 현재 페이지 다시 페치
      await fetchComments(currentPage);
    } catch (error) {
      console.error("Error refreshing comments after delete:", error);
    }
  };

  // 로딩 중일 때 로딩 컴포넌트를 보여주고, 로딩이 끝나면 댓글과 페이지네이션을 렌더링
  return loading ? (
    <Loading />
  ) : (
    <CommentsContainer ref={commentsRef}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onDelete={handleDeleteComment} // 삭제 핸들러 전달
        />
      ))}
      <PaginationContainer>
        {currentPage > maxPageButtons && (
          <PageButton onClick={handlePrevPageGroup}>{"<"}</PageButton>
        )}
        {getPageRange().map((page) =>
          page === currentPage ? (
            <CurrentPageButton key={page}>{page}</CurrentPageButton>
          ) : (
            <PageButton key={page} onClick={() => handlePageClick(page)}>
              {page}
            </PageButton>
          )
        )}
        {Math.floor((currentPage - 1) / maxPageButtons) <
          Math.floor((totalPages - 1) / maxPageButtons) && (
          <PageButton onClick={handleNextPageGroup}>{">"}</PageButton>
        )}
      </PaginationContainer>
    </CommentsContainer>
  );
};

export default CommentSection;
