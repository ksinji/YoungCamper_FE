import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as S from "./Style";
import Urgent from "../main/Urgent";
import ShowList from "./ShowList";
import useMediaQueries from "../../../hooks/useMediaQueries";
import { fetchNoticeDetail } from "../../../lib/apis/api/getNoticeDetail";

const Content = () => {
  const { num } = useParams();
  const [notice, setNotice] = useState(null);
  const { isDesktop } = useMediaQueries();
  const mediaUrl = import.meta.env.VITE_MEDIA_URL;

  //받아오는 날짜 데이터 포맷팅
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchNoticeDetail(num);
        setNotice(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching notice detail: ", error);
      }
    };

    fetchData();
  }, [num]);

  if (!notice) {
    return (
      <>
        <S.NoResult>해당 공지사항을 찾을 수 없습니다.</S.NoResult>
        <ShowList />
      </>
    );
  }

  return (
    <>
      <S.TitleWrapper $isDesktop={isDesktop}>
        {notice.isPinned === "yes" && (
          <S.UrgentWrapper>
            <Urgent />
          </S.UrgentWrapper>
        )}
        <S.Title $isDesktop={isDesktop}>{notice.title}</S.Title>
        <S.InfoContainer $isDesktop={isDesktop}>
          <S.Info>작성인: 관리자</S.Info>
          <S.Info>{formatDate(notice.createdAt)}</S.Info>
        </S.InfoContainer>
        <S.Line />
        <S.ContentWrapper $isDesktop={isDesktop}>
          <S.ContentImgContainer>
            {notice.image && (
              <S.ContentImgContainer>
                <S.ContentImg
                  src={`${mediaUrl}Notification/${notice.imageUrl}`}
                  alt="공지 이미지"
                />
              </S.ContentImgContainer>
            )}
          </S.ContentImgContainer>

          <S.ContentText $isDesktop={isDesktop}>{notice.content}</S.ContentText>
        </S.ContentWrapper>
        <ShowList />
      </S.TitleWrapper>
    </>
  );
};

export default Content;
