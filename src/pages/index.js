import React from "react";
import Script from "react-load-script";

const background = [
  'is-danger',
  'is-dark',
  'is-info',
  'is-light',
  'is-primary',
  'is-success',
  'is-warning',
];

const randomBackground = background[Math.floor(Math.random() * background.length)];

const Hero = () => (
  <div className={`hero is-fullheight is-bold ${randomBackground}`}>
    <div className="hero-body">
      <div className="container">
        <div className="columns">
          <div className="column is-5 content">
            <h1 className="title is-size-1">👋</h1>
            <h2 className="subtitle">Hi, I'm Brad.</h2>
            <p>I'm a frontend developer and product designer from Orlando, Florida building things on the internet.</p>
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
