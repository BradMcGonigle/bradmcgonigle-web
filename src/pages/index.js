import React from "react";
import Script from "react-load-script";


const Hero = () => (
  <div className="hero is-info is-fullheight is-bold">
    <div className="hero-body">
      <div className="container">
        <div className="columns">
          <div className="column is-5 content">
            <h1 className="title">Hi, I'm Brad.</h1>
            <h2 className="subtitle">I build things on the internet.</h2>
            <p>I'm a frontend developer and product designer with a broad range of skills and expertise in user experience design.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default class IndexPage extends React.Component {
  handleScriptLoad() {
    if (typeof window !== `undefined` && window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
    window.netlifyIdentity.init();
  }

  render() {
    return (
      <div>
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={() => this.handleScriptLoad()}
        />
        <Hero />
      </div>
    );
  }
}
