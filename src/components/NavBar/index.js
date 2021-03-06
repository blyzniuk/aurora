/* eslint react/prefer-stateless-function: off */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import classNames from "classnames";

import colors from "../../theme/colors";
import spacing from "../../theme/spacing";
import constants from "../../theme/constants";
import typography from "../../theme/typography";
import { mediumAndUp, smallAndUp } from "../../theme/mediaQueries";

import Links from "./Links";
import Buttons from "./Buttons";
import Row from "../Grid/Row";
import Column from "../Grid/Column";

const mainStyle = `
  background-color: transparent;
  color: ${colors.white.base};
  font-weight: ${typography.weight.semiBold};
`;
const invertedStyle = `
  background-color: ${colors.white.base};
  border-bottom: 1px solid ${colors.moonstone};
  color: ${colors.onyx.base};
  font-weight: ${typography.weight.regular};
`;

const Nav = styled.nav.attrs({
  role: "navigation"
})`
  top: 0;
  left: 0;
  right: 0;
  min-height: 60px;
  width: 100%;
  font-size: ${typography.size.kilo};
  ${mainStyle} &.nav--relative {
    position: relative;
  }

  &.nav--absolute {
    position: absolute;
  }

  &.nav--fixed {
    position: fixed;
  }

  & .linkItem:visited {
    color: ${colors.white.base};
  }

  &.nav--inverted {
    ${invertedStyle} .linkItem:visited {
      color: ${colors.onyx.base};
    }
  }

  &.nav--overlay:after {
    content: "";
    opacity: 0.4;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    height: 60px;
    z-index: 4;
    background-image: linear-gradient(77deg, rgba(0, 0, 0, 0), #000000);
    ${smallAndUp`
        background-image: linear-gradient(82deg, rgba(0, 0, 0, 0), #000000);
      `};

    ${mediumAndUp`
      background-image: linear-gradient(86deg, rgba(0, 0, 0, 0), #000000);
      `};
  }

  &.nav--fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }

  &.nav--fade-out {
    animation: fadeOut 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
      position: fixed;
      ${invertedStyle};
    }
    99% {
      opacity: 0;
      position: fixed;
      ${mainStyle};
    }
    100% {
      opacity: 0;
      position: absolute;
      ${mainStyle};
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: 60px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  z-index: 5;
  ${mediumAndUp`
    margin: 0 auto;
  `};

  @media ${constants.breakpoints.xLarge} {
    padding: 0 44px;
  }
`;

const Right = styled.div`
  display: flex;
  flex: 1 0 auto;
  justify-content: flex-end;
  height: 60px;
`;

const Left = styled.div`
  flex: 0 1 auto;
  width: 310px;
  min-width: 310px;
  max-width: 310px;
  align-items: center;
  height: 60px;
  display: flex;
  padding-left: ${parseInt(spacing.normal, 10) / 2}px;
  ${mediumAndUp`width: 50%;`};
`;

const MessageContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  text-align: center;
  font-size: ${typography.size.uno};
  font-weight: ${typography.weight.regular};
  padding-top: 2px;
  padding-bottom: 2px;
`;

class NavBar extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    position: PropTypes.oneOf(["relative", "absolute", "fixed"]),
    invert: PropTypes.bool,
    message: PropTypes.node,
    backgroundColor: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.string)
  };

  static defaultProps = {
    className: null,
    children: null,
    position: "relative",
    invert: false,
    message: null,
    backgroundColor: null,
    style: {}
  };

  render() {
    const {
      children,
      position,
      invert,
      className,
      backgroundColor,
      style,
      message,
      ...props
    } = this.props;

    return (
      <Nav
        {...props}
        className={classNames(
          position && `nav--${position}`,
          invert && "nav--inverted",
          !!backgroundColor && "nav--overlay",
          className,
          "nav--fade-in"
        )}
        invert={invert}
        style={{ ...style, backgroundColor }}
      >
        {message ? (
          <MessageContainer>
            <Row>
              <Column role="note">{message}</Column>
            </Row>
          </MessageContainer>
        ) : null}
        <Container>{children}</Container>
      </Nav>
    );
  }
}

NavBar.MenuButton = Buttons.MenuButton;
NavBar.SearchButton = Buttons.SearchButton;
NavBar.UserButton = Buttons.UserButton;
NavBar.TextButton = Buttons.TextButton;
NavBar.LinkRow = Links.LinkRow;
NavBar.LinkList = Links.LinkList;
NavBar.LinkListItem = Links.LinkListItem;
NavBar.Link = Links.Link;
NavBar.Right = Right;
NavBar.Left = Left;
NavBar.LogoContainer = Buttons.LogoContainer;

export default NavBar;
