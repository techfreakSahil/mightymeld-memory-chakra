import { useState } from "react";
import confetti from "canvas-confetti";
import * as icons from "react-icons/gi";
import { Box, Button } from "@chakra-ui/react";
import { Tile } from "./Tile";

export const possibleTileContents = [
  icons.GiHearts,
  icons.GiWaterDrop,
  icons.GiDiceSixFacesFive,
  icons.GiUmbrella,
  icons.GiCube,
  icons.GiBeachBall,
  icons.GiDragonfly,
  icons.GiHummingbird,
  icons.GiFlowerEmblem,
  icons.GiOpenBook,
];

export function StartScreen({ start }) {
  return (
    <>
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          w="330px"
          bg="#EBF8FF"
          display="flex"
          alignItems="center"
          flexDir="column"
          borderRadius="xl"
          gap="32px"
          paddingY="80px"
          cursor="pointer"
        >
          <Box
            fontSize="xx-large"
            fontWeight="700"
            color="#319795"
            textAlign="center"
          >
            Memory
          </Box>
          <Box
            fontSize="md"
            color="#38B2AC"
            textAlign="center"
            fontWeight="400"
          >
            Flip over tiles looking for pairs
          </Box>
          <Button
            borderRadius="25px"
            size="lg"
            width="40%"
            bgGradient="linear(to-b,#4FD1C5,#38B2AC,#319795)"
            color="#F7FAFC"
            colorScheme="teal"
            shadow="lg"
            onClick={start}
          >
            Play
          </Button>
        </Box>
      </Box>
    </>
  );
}

export function PlayScreen({ end }) {
  const [tiles, setTiles] = useState(null);
  const [tryCount, setTryCount] = useState(0);

  const getTiles = (tileCount) => {
    // Throw error if count is not even.
    if (tileCount % 2 !== 0) {
      throw new Error("The number of tiles must be even.");
    }

    // Use the existing list if it exists.
    if (tiles) return tiles;

    const pairCount = tileCount / 2;

    // Take only the items we need from the list of possibilities.
    const usedTileContents = possibleTileContents.slice(0, pairCount);

    // Double the array and shuffle it.
    const shuffledContents = usedTileContents
      .concat(usedTileContents)
      .sort(() => Math.random() - 0.5)
      .map((content) => ({ content, state: "start" }));

    setTiles(shuffledContents);
    return shuffledContents;
  };

  const flip = (i) => {
    // Is the tile already flipped? We don’t allow flipping it back.
    if (tiles[i].state === "flipped") return;

    // How many tiles are currently flipped?
    const flippedTiles = tiles.filter((tile) => tile.state === "flipped");
    const flippedCount = flippedTiles.length;

    // Don't allow more than 2 tiles to be flipped at once.
    if (flippedCount === 2) return;

    // On the second flip, check if the tiles match.
    if (flippedCount === 1) {
      setTryCount((c) => c + 1);

      const alreadyFlippedTile = flippedTiles[0];
      const justFlippedTile = tiles[i];

      let newState = "start";

      if (alreadyFlippedTile.content === justFlippedTile.content) {
        confetti();
        newState = "matched";
      }

      // After a delay, either flip the tiles back or mark them as matched.
      setTimeout(() => {
        setTiles((prevTiles) => {
          const newTiles = prevTiles.map((tile) => ({
            ...tile,
            state: tile.state === "flipped" ? newState : tile.state,
          }));

          // If all tiles are matched, the game is over.
          if (newTiles.every((tile) => tile.state === "matched")) {
            setTimeout(end, 0);
          }

          return newTiles;
        });
      }, 1000);
    }

    setTiles((prevTiles) => {
      return prevTiles.map((tile, index) => ({
        ...tile,
        state: i === index ? "flipped" : tile.state,
      }));
    });
  };

  return (
    <>
      <Box
        h="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        flex="column"
      >
        <Box
          mb={8}
          textColor="#25855A"
          fontWeight="semi-bold"
          fontSize="larger"
        >
          Tries
          <Box
            bg={"#9AE6B4"}
            display="inline-block"
            fontSize="medium"
            px={2}
            borderRadius="8px"
            ml={2}
          >
            {tryCount}
          </Box>
        </Box>

        <Box
          bg="#F0FFF4"
          w="330px"
          display="flex"
          justifyContent="center"
          gap={4}
          borderRadius="12px"
          flexWrap="wrap"
          paddingY={3}
        >
          {getTiles(16).map((tile, i) => (
            <Tile key={i} flip={() => flip(i)} {...tile} />
          ))}
        </Box>
        {/* <Button
          bg="#63B3ED"
          borderRadius="12px"
          marginTop={6}
          color="#fdfdfd"
          w="20%"
          onClick={end}
          colorScheme="blue"
        >
          End
        </Button> */}
      </Box>
    </>
  );
}
