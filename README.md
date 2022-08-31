![header](https://capsule-render.vercel.app/api?type=wave&color=auto&height=400&section=header&text=Finder&fontSize=70)

<div>
    <div>
      <img style="border-radius:10px" height="70" src="./assets/logo.jpeg" /> 
      <a display="block" href="https://finder-web.netlify.app/" >
      https://finder-web.netlify.app/
    </a>
    </div>
    <br />
</div>

<br /><br />

## Content

- 🛠 [Built with](#built-with)
- 🚀 [Project](#project)
- ✓ [Features](#features)
- 🔥 [Code](#code)
- 👍 [느낀점](#느낀점)

---

### Front-end

- `React`
- `Typescript`
- `Styled-components`
- `Framer-motion`
- `React-hook-form`
- `Apollo-client`
- code : <a>https://github.com/jangth0655/finder-client/edit/main/README.md</a>

### Back-end

- `Apollo-server`
- `Express`
- `Graphql`
- `PostgresSQL`
- `Prisma`
- `AWS S3`

### Deploy

- Client : `Netlify`
- Server : `Heroku` , `AWS S3`

### Project

- **모델**
  <div style="margin-top:10px">
    <img style="border-radius:10px" height="140" src="./assets/logo.jpeg" />  
  </div>
  <br /><br />

> 서버

- 토큰을 헤더로 이용하기위해 express서버와 통합했습니다.
- context에 검증된 로그인 유저를 넣어 활용했습니다.

```typescript
import express from "express";
import { ApolloServer } from "apollo-server-express";

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  cache: "bounded",
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token as string),
    };
  },
});
await apollo.start();
app.use(graphqlUploadExpress());
apollo.applyMiddleware({ app });
// ....
```

<br/><br/>

> 회원가입, 로그인, 로그아웃

- 유저네임, 이름, 이메일, 지역, 커리어, 비밀번호를 입력하여 로그인 할 수 있습니다.
- 유저네임과 이메일은 필수조건이며, 중복이 불가하도록 하였습니다.(유니크)
- 회원가입시 유저가 입력한 비밀번호는 `bcrypt`를 사용하여 해쉬하고 저장됩니다.
- 로그인시 유저가 입력한 비밃번호는 `bcrypt`로 이전 해쉬화된 비밀번호와 비교하여 확인했습니다.  
  → 비교가 같다면, `jwt` 활용하여 토큰을 반환합니다.  
  → 같지 않다면, 에러메시지를 반환합니다.

```typescript
const passwordOk = await bcrypt.compare(newPassword, user.password);
if (!passwordOk) {
  return {
    ok: false,
    error: "Incorrect info.",
  };
}
const token = await jwt.sign({ id: user.id }, process.env.SECRETE_KEY!);
return {
  ok: true,
  token,≈
};
```

<br/><br/>

> 프로필

- 유저는 로그인 유저 혹은 다른 유저의 프로필을 확인할 수 있습니다.
- 로그인 유저가 게시한 샵, "좋아요"를 한 해당 샵을 확인할 수 있습니다.
- 해당 유저를 "팔로워"를 확인할 수 있고, "팔로워"를 할 수 있습니다.

<br/><br/>

> 프로필 수정

- `User` type의 `computed field`를 활용하여 프로필 유저가 로그인 유저인지 확인합니다.
- 유저의 정보 (이메일, 유저네임, 아바타, 패스워드 등등)을 변경할 수 있습니다.
- 아바타를 수정하는 경우 새로운 아바타는 `AWS`에 저장되고 이전 아바타는 삭제됩니다.
- 이메일과, 유저네임은 유니크하므로 이미 존재여부를 체크하고 업데이트합니다.
- 새로운 비밀번호는 `bcrypt`를 이용하여 해쉬한다음 업데이트 합니다.

```typescript
if (username !== currentUser.username) {
  if (username === existUser.username) {
    return {
      ok: false,
      error: "Username is already taken.",
    };
  }
  await client.user.update({
    where: { id: loggedInUser.id },
    data: { username },
  });
}
```

<br/><br/>

> 계정 삭제

- 해당 로그인 유저의 아이디를 받아 유저를 한번 더 체크하고 데이터베이스에서 계정을 삭제합니다.
- 유저가 삭제되면 유저가 게시한 비디오와 팔로워가 모두 삭제됩니다.
- 계정 삭제할 경우, 유저의 아바타가 있다면 `AWS S3`에 저장된 이미지도 함께 삭제됩니다.

<br/><br/>

> 샵 업로드

- 슬러그, 샵이름, 전화번호, 지역, 사진 등 정보를 입력하여 업로드 할 수 있습니다.
- 샵이름과 슬러그는 유니크하기 때문에 존재하는지 여부를 체크하여 업로드할 수 있습니다.
- 샵의 이미지가 존재한다면 `AWS S3`에 저장됩니다.

<br/><br/>

> 샵 수정

- 슬러그, 샵이름, 전화번호, 지역, 사진 등 정보를 수정할 수 있습니다.
- 샵이름과 슬러그는 유니크하기 때문에 존재여부를 체크하여 수정할 수 있습니다.
- 사진을 수정할 경우 새로운 사진이 있다면 현재 사진을 삭제하고 새로운 사진을 저장합니다.  
  → 'AWS S3'와 데이터베이스에서 삭제 및 업데이트
- 샵을 삭제할 수 있습니다.

<br/><br/>

> About Shop (상세정보)

- 샵이름, 슬러그, 샵 게시한 유저네임 등 샵의 정보를 확인할 수 있습니다.
- 샵에서 게시한 삽의 사진을 확인할 수 있습니다.
- 로그인 여부를 체크하여 샵의 댓글을 확인할 수 있으며 샵의 댓글을 작성할 수 있습니다.
- 해당 샵의 유저라면 샵의 사진을 추가로 업로드할 수 있습니다.
- '좋아요' 기능을 사용할 수 있습니다.  
  → '좋아요'가 있다면 '좋아요'를 삭제하고, '좋아요' 없다면 '좋아요' 생성
  ```typescript
  if (fav) {
    await client.fav.delete({
      where: {
        id: fav.id,
      },
    });
    return {
      ok: true,
    };
    await client.fav.create({
      data: {
        userId: loggedInUser.id,
        shopId: id,
      },
    });
    return {
      ok: true,
    };
  }
  ```

<br/><br/>

> 검색 기능

- 키워드에 샵 이름이 포함된다면 포함된 모든 샵을 검색할 수 있습니다.

<br/><br/>

## Features

## 🌈 Shop

- Info
- 게시한 사진 (AWS S3 저장)
- 사진 업로드 (AWS S3 저장)
- 샵 수정 (새로운 사진 AWS S3 저장, 현재 사진 삭제)
  <br />

### 🙋‍♂️ User

- 회원가입 / 로그인
- 아바타 업로드 (AWS S3 저장)
- 프로필 수정 (새로운 아바타 AWS S3 저장, 현재아바타 삭제)
- 회원정보 변경
  <br />

### Comment

- 댓글 작성 및 삭제
- 즉각적인 반응

### Deploy

- Heroku

## Code

<a href="https://github.com/jangth0655/finder-server">🔥 GitHub</a>

<br /><br />

## 느낀점

```
서버측 느낀점..
Apollo Server와 Express를 통합하고 typeDefs와 resolvers를 서버에 설정하는 것등을 알게되었으며,
스키마와 타입시스템을 정의하고 Graphql의 Query와 Mutation을 좀 더 이해하게 되었습니다. 또한 Computed Flied를 통해
쿼리 할 수 있다는 점에서 흥미로웠습니다. 또한 모델간의 관계(모델의 참조 관계)를 설정하고 Prisma(ORM)을
이용하여 데이터베이스로 부터 데이터를 쿼라, 조작하는 것 등을 배울 수 있었습니다.
그리고 Heroku를 통해 Heroku cli, 환경변수 설정하여 배포하는것을 좀 더 이해하는 계기가 되었습니다.
하지만 아직 모델간의 관계를 이해하는 부분에 있어서 부족함이 있다고 느꼈고, 모델간의 관계를 어떤식으로
풀어나가야할지 부족함을 느꼈습니다.
초기에 프로젝트의 궁극적인 목적과 기능, 모델등을 좀 더 신중하게 고민할 필요가 있다고 생각이 들었습니다.
```
