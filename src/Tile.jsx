import { Box } from "@chakra-ui/react";

export function Tile({ content: Content, flip, state }) {
  switch (state) {
    case "start":
      return (
        <Box
          onClick={flip}
          display="inline-block"
          width={8}
          height={8}
          bg="blue.300"
          textAlign="center"
        >
          ?
        </Box>
      );
    case "flipped":
      return (
        <Box
          display="inline-block"
          width={8}
          height={8}
          bg="green.500"
          textAlign="center"
        >
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Box>
      );
    case "matched":
      return (
        <Box
          display="inline-block"
          width={8}
          height={8}
          bg="gray.300"
          textAlign="center"
        >
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Box>
      );
    default:
      throw new Error("Invalid state " + state);
  }
}
