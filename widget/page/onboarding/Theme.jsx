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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  align-items: center;
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
    /* display: flex;
    gap: 16px;
    padding: 16px;
    border-radius: 16px;
    align-items: stretch;
    border: 1px solid var(--Gray-6, #e2e2e2); */
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin: 0 auto;
    align-items: center;
    justify-content: center;

    .radio-input {
      max-width: 442px !important;
      position: relative;
      display: flex;
      flex-direction: column;
      border-radius: var(--_16, 16px);
      border: 2px solid var(--Gray-4, #ededed);
      background: var(--Gray-1, #fcfcfc);

      .image-src {
        border-radius: 16px 16px 0 0;
        border: 1px solid var(--Gray-4, #ededed);
      }
      .radio-icon {
        padding: 12px;
        display: flex;
        gap: 8px;

        align-items: center;
        justify-content: flex-start;
        .text {
          margin: 0;
          padding: 0;

          color: var(--Gray-12, #171717);

          /* Text/M - 16px/Medium */
          font-family: Poppins;
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: 150%; /* 24px */
          letter-spacing: -0.16px;
        }
      }
      &.active {
        border-radius: var(--_16, 16px);
        border: 2px solid var(--Gray-12, #171717);
        background: var(--Gray-1, #fcfcfc);
      }
    }
    .input {
      align-items: stretch;
      flex: 1;
    }
  }
`;

const [content, setContent] = useState("Default");
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
      <h1 className="heading">Profile template</h1>
      <p className="subheading">
        Select your profile template. It will be visible to you and to anyone
        viewing your profile.
      </p>
    </div>
    <div className="content">
      <div
        className={`radio-input ${content === "Default" ? "active" : ""}`}
        onClick={() => setContent("Default")}
      >
        <img
          className="image-src"
          src="https://ipfs.near.social/ipfs/bafkreieugdxqqlfip5ha2gwkw7563wzf6i54oqwph5ozeeydfyc2hpndya"
        />
        <div className="radio-icon">
          {content === "Default" ? (
            <i className="bi bi-circle-fill"></i>
          ) : (
            <i className="bi bi-circle"></i>
          )}
          <p className="text">Default</p>
        </div>
      </div>
      <div
        className={`radio-input ${content === "Modern" ? "active" : ""}`}
        onClick={() => setContent("Modern")}
      >
        <img
          className="image-src"
          src="https://ipfs.near.social/ipfs/bafkreidjykod3umkz2arnlxloplwau3cjcf476nbbsha7c3isb3a6mlyyy"
        />

        <div className="radio-icon">
          {content === "Modern" ? (
            <i className="bi bi-circle-fill"></i>
          ) : (
            <i className="bi bi-circle"></i>
          )}
          <p className="text">Modern</p>
        </div>
      </div>
      <div
        className={`radio-input ${content === "Pixel" ? "active" : ""}`}
        onClick={() => setContent("Pixel")}
      >
        <img
          className="image-src"
          src="https://ipfs.near.social/ipfs/bafkreicripj2lp7uqkuazs4t62gdkyddbdtvkptm6dvbmx3flidvnqrkse"
        />
        <div className="radio-icon">
          {content === "Pixel" ? (
            <i className="bi bi-circle-fill"></i>
          ) : (
            <i className="bi bi-circle"></i>
          )}
          <p className="text">Pixel</p>
        </div>
      </div>
    </div>
    <Button
      style={{
        width: "442px",
      }}
      variant="primary"
      onClick={onSubmit}
    >
      continue
    </Button>
  </Container>
);
