const poppinsCSS = fetch(
  "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
);

const CSS = styled.div`
  ${poppinsCSS}
  font-family: "Poppins", sans-serif;
`;

const config = {
  theme: {},
  layout: {
    src: "devs.near/widget/Layout",
    props: {
      variant: "standard",
    },
  },
  blocks: {
    Header: () => <></>,
    Footer: () => <></>,
  },
  router: {
    param: "page",
    routes: {
      welcome: {
        path: "${config_account}/widget/page.welcome.Index",
        blockHeight: "final",
        init: {
          name: "Welcome",
        },
        default: true,
        hide: true,
      },
      onboarding: {
        path: "${config_account}/widget/page.onboarding.Index",
        blockHeight: "final",
        init: {
          name: "Onboarding",
        },
        hide: true,
      },
      profile: {
        path: "blueprints.near/widget/Profile",
        blockHeight: "final",
        init: {
          name: "Profile",
        },
        hide: true,
      },
    },
  },
};
return (
  <CSS>
    <Widget
      src="${config_account}/widget/app.View"
      props={{ config, ...props }}
    />
  </CSS>
);
