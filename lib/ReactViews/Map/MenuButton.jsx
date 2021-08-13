import React from "react";
import Icon from "../Icon.jsx";
import PropTypes from "prop-types";
import Styles from "./menu-button.scss";

/**
 * Basic button for use in the menu part at the top of the map.
 *
 * @constructor
 */
function MenuButton(props) {
  let target;
  let rel;
  if (props.href !== "#") {
    target = "_blank";
    rel = "noreferrer";
  }
  return (
    <div>
      <a
        className={Styles.btnAboutLink}
        href={props.href}
        target={target}
        rel={rel}
        title={props.caption}
      >
        {props.href !== "#" && <Icon glyph={Icon.GLYPHS.externalLink} />}
        <span>{props.caption}</span>
      </a>
    </div>
  );
}

MenuButton.defaultProps = {
  href: "#"
};

MenuButton.propTypes = {
  href: PropTypes.string,
  caption: PropTypes.string.isRequired
};

export default MenuButton;
