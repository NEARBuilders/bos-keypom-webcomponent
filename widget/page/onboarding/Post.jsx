const { Avatar } = VM.require("${config_account}/widget/components.Avatar") || {
  Avatar: () => <></>,
};
const { Button } = VM.require("${config_account}/widget/components.Button") || {
  Button: () => <></>,
};
const { href } = VM.require("devs.near/widget/lib.url") || {
  href: () => {},
};

const MemoizedAvatar = useMemo(
  () => <Avatar accountId={context.accountId} size="40px" />,
  [context.accountId]
);

const Container = styled.div`
  max-width: 442px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  align-items: stretch;
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: none;
    .heading {
      color: var(--Gray-12, #171717);
      text-align: center;
      font-size: 28px;
      font-weight: 500;
      letter-spacing: -1.12px;
    }
    .subheading {
      color: var(--Gray-11, #6f6f6f);
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      line-height: 140%;
      letter-spacing: -0.14px;
    }
  }
  .content {
    display: flex;
    gap: 16px;
    padding: 16px;
    border-radius: 16px;
    align-items: stretch;
    border: 1px solid var(--Gray-6, #e2e2e2);
    .avatar {
    }
    .input {
      align-items: stretch;
      flex: 1;
    }
  }
`;

const [content, setContent] = useState("");
const [posted, setPosted] = useState(false);

const onSubmit = () => {
  const data = {
    post: {
      main: JSON.stringify({ type: "md", text: content }),
    },
    index: {
      post: JSON.stringify({
        key: "main",
        value: {
          type: "md",
        },
      }),
    },
  };

  Social.set(data, {
    force: true,
    onCommit: () => {
      setPosted(true);
    },
  });
};

return (
  <Container>
    <div className="header">
      <h1 className="heading">Write your first post</h1>
      <p className="subheading">
        Writing that first post is always tough, but don't worry, we've all been
        there! Share your thoughts and connect with fellow DAO enthusiasts. Your
        ideas could spark something great.{" "}
      </p>
    </div>
    <div className="content">
      <div className="avatar">{MemoizedAvatar}</div>
      <div className="input">
        <textarea
          type="text"
          class="form-control"
          id="post"
          placeholder="introduce yourself or share something about your latest project"
          style={{
            minHeight: "192px",
            paddingTop: "8px",
            paddingBottom: "8px",
            paddingLeft: "0px",
            paddingRight: "0px",
            border: "none",
          }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
    </div>
    {posted ? (
      <Button
        linkClassName="p-2 border align-self-stretch text-center"
        href={href({
          widgetSrc: "${config_account}/widget/Index",
          params: {
            page: "profile",
          },
        })}
        style={{
          borderRadius: "12px",
        }}
      >
        go to profile
      </Button>
    ) : (
      <Button variant="primary" onClick={onSubmit}>
        post
      </Button>
    )}
  </Container>
);
