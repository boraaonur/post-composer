import { HStack, Button } from "@chakra-ui/react";
import { HiHome, HiCog } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <HStack
      w="full"
      h="60px"
      position="fixed" // Set the position to fixed
      bottom="0" // Stick it to the bottom of the viewport
      left="0" // Align it to the left
      zIndex="sticky" // Set a zIndex to ensure it's above other content
      bgColor="white" // Optional: Set a background color to ensure content behind isn't visible
    >
      <Button w="full" h="full" onClick={() => navigate("/")}>
        <HiHome />
      </Button>
      <Button
        w="full"
        h="full"
        onClick={() => {
          navigate("/settings");
        }}
      >
        <HiCog />
      </Button>
    </HStack>
  );
}

export default Footer;
