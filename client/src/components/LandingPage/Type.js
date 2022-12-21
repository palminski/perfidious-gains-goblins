import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Why Choose Globo Gains?",
          "Get Them Gains!",
          "Tanning Beds Included",
          "Badassery",
        ],
        autoStart: true,
        loop: true,
      }}
    />
  );
}

export default Type;
