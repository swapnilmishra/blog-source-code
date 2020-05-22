import React, { Fragment } from "react"
import { Styled, css } from "theme-ui"

/**
 * Change the content to add your own bio
 */

export default () => (
  <Fragment>
    A <Styled.a
      href="/notes/about"
      target="_blank"
      rel="noopener noreferrer"
    >
      Software developer
                    </Styled.a> who lives in Berlin and talks about Web, Frontend and Javascript.
  </Fragment>
)
