const { Avatar } = VM.require("${config_account}/widget/components.Avatar") || {
  Avatar: () => <></>,
};

const { Button } = VM.require("${config_account}/widget/components.Button") || {
  Button: () => <></>,
};

const { Image } = VM.require("${config_account}/widget/icons") || {
  Image: () => <></>,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 32px;

  .heading {
    color: var(--profile-heading-color, #171717);
    text-align: center;
    font-size: 28px;
    letter-spacing: -1.12px;
    margin: 0px;
  }

  label {
    color: var(--Gray-12, #171717);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 19.6px */
    letter-spacing: -0.14px;
    margin-bottom: 8px;
  }
`;

const [images, setImages] = useState({});

const onSubmit = () => {
  if (
    Object.keys(images.image ?? {}).length === 0 &&
    Object.keys(images.backgroundImage ?? {}).length === 0
  ) {
    props.toggleNextPage();
  } else {
    const data = {
      ...(Object.keys(images.image ?? {}).length && { image: images.image }),
      ...(Object.keys(images.backgroundImage ?? {}).length && {
        backgroundImage: images.backgroundImage,
      }),
    };

    Social.set(
      { profile: data },
      {
        force: true,
        onCommit: () => {
          props.toggleNextPage();
        },
      }
    );
  }
};

const CoverPreview = ({ img }) => {
  return img ? (
    <Widget
      src="mob.near/widget/Image"
      props={{
        image: img,
        style: {
          width: "100%",
          height: "80px",
          borderRadius: "8px",
          objectFit: "cover",
        },
      }}
    />
  ) : (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        width: "100%",
        height: "80px",
        background: "#EDEDED",
        borderRadius: "8px",
      }}
    >
      <Image />
    </div>
  );
};

const AvatarPreview = ({ img }) => {
  return img ? (
    <Widget
      src="mob.near/widget/Image"
      props={{
        image: img,
        style: {
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          objectFit: "cover",
        },
      }}
    />
  ) : (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        width: "48px",
        height: "48px",
        background: "#EDEDED",
        borderRadius: "50%",
      }}
    >
      <Avatar />
    </div>
  );
};

return (
  <Container>
    <h1 className="heading">Upload Photo</h1>
    <div>
      <label>Profile picture</label>
      <Widget
        src="${config_account}/widget/components.onboarding.ImageUploader"
        props={{
          onChange: (e) =>
            setImages({
              ...images,
              image: e,
            }),
          preview: AvatarPreview,
        }}
      />
    </div>
    <div>
      <label>Cover image</label>
      <Widget
        src="${config_account}/widget/components.onboarding.ImageUploader"
        props={{
          onChange: (e) =>
            setImages({
              ...images,
              backgroundImage: e,
            }),
          preview: CoverPreview,
          layout: "column",
        }}
      />
    </div>
    <Button variant="primary" onClick={onSubmit}>
      continue
    </Button>
  </Container>
);
