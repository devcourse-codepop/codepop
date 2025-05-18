# CodePop

![codepop](https://github.com/user-attachments/assets/caadaabc-ecd8-4fbd-a981-e776dcb154d9)

<br>

## 프로젝트 소개

- CodePop은 개발 지식과 일상을 함께 나누는 개발자 커뮤니티입니다.
- 개발에 대한 이야기를 가볍고 편하게 나눌 수 있는 공간을 지향합니다.
- 질문과 정보 공유 뿐 아니라 일상적인 소통도 환영합니다.
- 데스크 셋업 공유 콘텐츠로 관심 있는 주제를 자유롭게 이야기할 수 있습니다.
- 투표 기능을 통해 누구나 쉽게 참여하고 의견을 나눌 수 있습니다.

<br>

## 팀원 구성

| **박서영** | **한유빈** | **조소정** | **김태연** | **유강민** |
| :------: | :------: | :------: | :------: | :------: | 

<br>

## 1. 개발 환경

<br>

## 2. 폴더 구조

```bash

📦src
 ┣ 📂api
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜login.ts
 ┃ ┃ ┗ 📜signup.ts
 ┃ ┣ 📂follow
 ┃ ┃ ┗ 📜follow.ts
 ┃ ┣ 📂memberbox
 ┃ ┃ ┗ 📜member.ts
 ┃ ┣ 📂message
 ┃ ┃ ┗ 📜message.ts
 ┃ ┣ 📂notification
 ┃ ┃ ┗ 📜notification.ts
 ┃ ┣ 📂post
 ┃ ┃ ┗ 📜post.ts
 ┃ ┣ 📂profileInfo
 ┃ ┃ ┗ 📜profile.ts
 ┃ ┣ 📂write
 ┃ ┃ ┗ 📜write.ts
 ┃ ┗ 📜axios.ts
 ┣ 📂assets
 ┃ ┗ 📂images
 ┣ 📂components
 ┃ ┣ 📂avatar
 ┃ ┃ ┗ 📜Avatar.tsx
 ┃ ┣ 📂btn
 ┃ ┃ ┣ 📜PostBtn.tsx
 ┃ ┃ ┗ 📜VoteBtn.tsx
 ┃ ┣ 📂channel
 ┃ ┃ ┗ 📜ChannelName.tsx
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜Button.tsx
 ┃ ┃ ┗ 📜Input.tsx
 ┃ ┣ 📂editor
 ┃ ┃ ┣ 📂extensions
 ┃ ┃ ┃ ┗ 📜CustomImage.ts
 ┃ ┃ ┣ 📜CommentEditor.tsx
 ┃ ┃ ┣ 📜CommentEditorToolbar.tsx
 ┃ ┃ ┣ 📜Editor.tsx
 ┃ ┃ ┗ 📜EditorToolbar.tsx
 ┃ ┣ 📂header
 ┃ ┃ ┗ 📜Header.tsx
 ┃ ┣ 📂icon
 ┃ ┃ ┣ 📜BoldIcon.tsx
 ┃ ┃ ┣ 📜CodeEditIcon.tsx
 ┃ ┃ ┣ 📜ImageIcon.tsx
 ┃ ┃ ┣ 📜ItalicIcon.tsx
 ┃ ┃ ┗ 📜VoteIcon.tsx
 ┃ ┣ 📂main-content
 ┃ ┃ ┣ 📜Banner.tsx
 ┃ ┃ ┣ 📜PopularPost.tsx
 ┃ ┃ ┗ 📜PopularPostCkeleton.tsx
 ┃ ┣ 📂notification
 ┃ ┃ ┗ 📜Notification.tsx
 ┃ ┣ 📂poll
 ┃ ┃ ┣ 📜PollCreater.tsx
 ┃ ┃ ┣ 📜PollOptionsView.tsx
 ┃ ┃ ┗ 📜PollOptionsVoteView.tsx
 ┃ ┣ 📂post
 ┃ ┃ ┣ 📜CheckDeleteModal.tsx
 ┃ ┃ ┣ 📜CommentListItem.tsx
 ┃ ┃ ┣ 📜DeletedUserModal.tsx
 ┃ ┃ ┣ 📜DropSort.tsx
 ┃ ┃ ┣ 📜NotLoginModal.tsx
 ┃ ┃ ┣ 📜PostDetailItem.tsx
 ┃ ┃ ┣ 📜PostDetailSkeleton.tsx
 ┃ ┃ ┣ 📜PostListItem.tsx
 ┃ ┃ ┣ 📜PostSkeleton.tsx
 ┃ ┃ ┣ 📜SearchPost.tsx
 ┃ ┃ ┣ 📜WriteCommentItem.tsx
 ┃ ┃ ┗ 📜WritePostItem.tsx
 ┃ ┣ 📂reaction
 ┃ ┃ ┗ 📜LikeComment.tsx
 ┃ ┣ 📂sidebar
 ┃ ┃ ┣ 📜ChannelBox.tsx
 ┃ ┃ ┗ 📜MemberBox.tsx
 ┃ ┗ 📂toggle
 ┃ ┃ ┗ 📜DarkMode.tsx
 ┣ 📂css
 ┃ ┣ 📂layout
 ┃ ┃ ┗ 📜layout.css
 ┃ ┣ 📂main-content
 ┃ ┃ ┗ 📜main-content.css
 ┃ ┣ 📜editor.css
 ┃ ┣ 📜index.css
 ┃ ┗ 📜tailwind.css
 ┣ 📂layout
 ┃ ┗ 📜MainLayout.tsx
 ┣ 📂pages
 ┃ ┣ 📂login
 ┃ ┃ ┗ 📜Login.tsx
 ┃ ┣ 📂message
 ┃ ┃ ┣ 📜ChatHeader.tsx
 ┃ ┃ ┣ 📜ChatModal.tsx
 ┃ ┃ ┣ 📜ChatRoom.tsx
 ┃ ┃ ┗ 📜ChatUserList.tsx
 ┃ ┣ 📂profile
 ┃ ┃ ┣ 📂profile-edit
 ┃ ┃ ┃ ┣ 📜EditMenu.tsx
 ┃ ┃ ┃ ┣ 📜EditProfile.tsx
 ┃ ┃ ┃ ┣ 📜EditProfilePage.tsx
 ┃ ┃ ┃ ┗ 📜PhotoUploadModal.tsx
 ┃ ┃ ┣ 📜FollowMember.tsx
 ┃ ┃ ┣ 📜FollowModal.tsx
 ┃ ┃ ┣ 📜Profile.tsx
 ┃ ┃ ┣ 📜ProfileLeft.tsx
 ┃ ┃ ┣ 📜ProfilePage.tsx
 ┃ ┃ ┗ 📜ProfileRight.tsx
 ┃ ┣ 📂signup
 ┃ ┃ ┗ 📜SignUp.tsx
 ┃ ┣ 📂update
 ┃ ┃ ┣ 📜UpdateCodePost.tsx
 ┃ ┃ ┣ 📜UpdateSetPost.tsx
 ┃ ┃ ┗ 📜UpdateVotePost.tsx
 ┃ ┣ 📂write
 ┃ ┃ ┣ 📜CreateCodePost.tsx
 ┃ ┃ ┣ 📜CreateSetPost.tsx
 ┃ ┃ ┗ 📜CreateVotePost.tsx
 ┃ ┣ 📜Error.tsx
 ┃ ┣ 📜MainContent.tsx
 ┃ ┣ 📜PostDetail.tsx
 ┃ ┗ 📜PostList.tsx
 ┣ 📂route
 ┃ ┣ 📜UpdatePostRouter.tsx
 ┃ ┗ 📜WritePostRouter.tsx
 ┣ 📂stores
 ┃ ┣ 📜authStore.ts
 ┃ ┣ 📜channelStore.ts
 ┃ ┣ 📜messageStore.ts
 ┃ ┗ 📜postStore.ts
 ┣ 📂types
 ┃ ┣ 📜channelItem.d.ts
 ┃ ┣ 📜darkModeTypes.d.ts
 ┃ ┣ 📜global.d.ts
 ┃ ┣ 📜index.d.ts
 ┃ ┣ 📜model.d.ts
 ┃ ┣ 📜notification.d.ts
 ┃ ┗ 📜user.d.ts
 ┣ 📂utils
 ┃ ┣ 📜changeMessageIcon.ts
 ┃ ┣ 📜darkModeUtils.ts
 ┃ ┣ 📜followHandlers.ts
 ┃ ┣ 📜getDatetime.ts
 ┃ ┣ 📜updateNewMessageCount.ts
 ┃ ┗ 📜validators.ts
 ┣ 📜App.tsx
 ┣ 📜main.tsx
 ┣ 📜swiper.d.ts
 ┗ 📜vite-env.d.ts

```

<br>

## 3. 역할 분담

<br>

## 4. 개발 기간

- 전체 개발 기간 : 2025/4/25/금 ~ 2025/5/19/월

<br>

## 5. 주요 기능

### 5.1. 로그인

### 5.2. 회원가입

<br>

## 6. 트러블 슈팅

<br>

## 7. 프로젝트 후기

**🐶 박서영**

정말 많은 것을 배울 수 있었던 3주였습니다. 정규 수업이 끝나자마자 바로 프로젝트에 들어가면서, 배운 내용을 활용해 코드 구현을 하거나 깃을 다루는 일이 쉽지만은 않았지만, 돌아보면 익숙해진 부분도 많았고, 어떤 점이 부족한 지도 분명히 알 수 있었던 시간이었습니다. 개인적으로 아쉬웠던 점은 구현에 집중하다 보니 협업 중 발생했던 문제 해결 과정을 체계적으로 기록하지 못한 부분입니다. 앞으로는 이런 경험도 꼼꼼히 정리하며 개발해야겠다는 다짐을 하게 되었습니다. 4월 말부터 5월 중순까지, 정말 치열하게 열심히 살았던 것 같고, 그만큼 값진 시간이었습니다. 다들 정말 고생 많으셨습니다!!!
