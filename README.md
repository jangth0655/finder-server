![header](https://capsule-render.vercel.app/api?type=rounded&color=auto&height=120&section=header&text=Finder&fontSize=70)

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
- 📖 [Pages](#pages)
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

### Projects

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
- 해당 유저를 팔로워를 확인할 수 있고, 팔로워를 할 수 있습니다.

<br/><br/>

> 프로필 수정

- `User` type의 `computed field`를 활용하여 프로필 유저가 로그인 유저인지 확인합니다.
- 유저의 정보 (이메일, 유저네임, 아바타, 패스워드 등등)을 변경할 수 있습니다.
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
