import styled from "styled-components";

//Content.jsx

export const TitleWrapper = styled.div`
  margin-top: ${(props) => (props.$isDesktop ? "48px" : "")};
  gap: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px 20px;
`;

export const Title = styled.div`
  color: var(--text-primary, #222);
  font-family: "PretendardSemiBold";
  font-size: ${(props) => (props.$isDesktop ? "28px" : "22px")};
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const InfoContainer = styled.div`
  display: flex;
  gap: 48px;
  margin-left: 5px;
  justify-content: space-between;
  font-size: ${(props) => (props.$isDesktop ? "16px" : "14px")};
`;

export const Info = styled.div`
  color: var(--text-grey600, #92a5b5);
  font-family: "PretendardRegular";
  font-style: normal;
  font-weight: 500;
`;

export const Line = styled.div`
  height: 1.5px;
  align-self: stretch;
  background-color: #92a5b5;
`;

export const ContentWrapper = styled.div`
  margin-top: ${(props) => (props.$isDesktop ? "48px" : "30px")};
  margin-bottom: 68px;
`;

export const ContentImgContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const ContentImg = styled.img`
  margin-bottom: 48px;
`;

export const ContentText = styled.div`
  color: var(--text-grey1000, #323f49);
  font-family: PretendardRegular;
  font-size: ${(props) => (props.$isDesktop ? "20px" : "12px")};
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 150% */
  letter-spacing: -0.05px;
`;

//showlist.jsx

export const ShowListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => (props.$isDesktop ? "48px" : "20px")};
`;

export const ShowListContainer = styled.div`
  border-radius: var(--XXL, 100px);
  border: 1px solid #0a0b0a;
  opacity: var(--sds-size-stroke-border);
  display: flex;
  padding: 20px 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 120px;
  color: #0a0b0a;
  text-align: center;
  font-family: "MonSemiBold";
  font-size: ${(props) => (props.$isDesktop ? "20px" : "12px")};
  font-style: normal;
  font-weight: 600;
  cursor: pointer;
`;

export const NoResult = styled.div`
  width: 100%;
  padding-top: 50px;
  padding-bottom: 100px;
  display: flex;
  justify-content: center;
`;