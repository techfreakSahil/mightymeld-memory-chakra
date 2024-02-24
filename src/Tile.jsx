import { Box, keyframes } from "@chakra-ui/react";

export function Tile({ content: Content, flip, state }) {
  //FOR CREATIVE BUILD SESSIONS

  // const shake = keyframes`
  // 0%{transform: rotate(0deg);}
  // 25%{transform: rotate(5deg);}
  // 50%{transform: rotate(0deg);}
  // 75%{transform: rotate(-5deg);}
  // 100%{transform: rotate(0deg);}
  // `;
  // const shakeAnimation = `${shake} linear 1s infinite`;
  switch (state) {
    case "start":
      return (
        <Box
          onClick={flip}
          display="inline-block"
          width={16}
          height={16}
          textAlign="center"
          bg="#68D391"
          borderRadius="10px"
        ></Box>
      );
    case "flipped":
      return (
        <Box
          display="flex"
          width={16}
          height={16}
          textAlign="center"
          bg="#25855A"
          justifyContent="center"
          alignItems="center"
          borderRadius="10px"
          padding={1}
          //animation={`${shakeAnimation}`}
          //transitionDuration="10ms"
        >
          <Content
            style={{
              display: "inline-block",
              width: "90%",
              height: "90%",
              verticalAlign: '"center"',
            }}
            color="white"
          />
        </Box>
      );
    case "matched":
      return (
        <Box
          display="flex"
          width={16}
          height={16}
          textAlign="center"
          color="gray.300"
          justifyContent="center"
          alignItems="center"
          borderRadius="10px"
        >
          <Content
            style={{
              display: "inline-block",
              width: "80%",
              height: "80%",
              verticalAlign: '"center"',
            }}
            color="#C6F6D5"
          />
        </Box>
      );
    default:
      throw new Error("Invalid state " + state);
  }
}
