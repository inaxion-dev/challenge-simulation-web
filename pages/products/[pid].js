import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Center,
  useColorMode,
  Tooltip,
  IconButton,
  SunIcon,
  MoonIcon,
  Image,
  HStack,
  Text,
  Heading,
  Link,
  VStack,
  Flex,
  AspectRatio,
  useBreakpointValue
} from "native-base";
import Header from '../_header';
// Start editing here, save and see your changes.
export default function ProductDetails(props) {
  const flexDir = useBreakpointValue({
    base: "column",
    md: "row"
  });
  const router = useRouter();
  const { pid } = router.query;
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const callAPI = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`http://localhost:3000/api/products/${pid}`)
        const data = await res.json()
        setProduct(data)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
    callAPI();
  }, [pid])
  if (!isLoading && !product.id) return <Text>Product not found</Text>
  return (
    <Center
      flex={1}
      _dark={{ bg: "gray.900" }}
      _light={{ bg: "gray.50" }}
    >
      <VStack alignItems="center" space="md">
        <HStack alignItems="center" space="2xl">
          <Link href="/">
            <AspectRatio w={24} ratio={5 / 3}>
              <Image
                source={{ uri: "/images/jordan_and_jumpman_logo.png" }}
                alt="Jordan and Jumpman"
                resizeMode="contain"
              />
            </AspectRatio>
          </Link>
          <Header />
        </HStack>
        {isLoading ? <Heading>Loading...</Heading> :
          <Flex>
            <Heading size="2xl">{product.name} ({product.year})</Heading>
            <Flex maxW={600} gap={1}>
              <Heading>Description</Heading>
              <Text>{product.description}</Text>
            </Flex>
            <Flex maxW={600} flexDirection={flexDir} gap={3} flexWrap="wrap" justifyContent="space-between">
              {product.images.map((image, key) => (
                <AspectRatio key={key} w={64} ratio={5 / 3}>
                  <Image
                    source={{ uri: `/${image}` }} alt={product.name}
                  />
                </AspectRatio>
              ))}
            </Flex>
          </Flex>
        }
      </VStack>
      <ColorModeSwitch />
    </Center>
  );
}
// Color Switch Component
function ColorModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Tooltip
      label={colorMode === "dark" ? "Enable light mode" : "Enable dark mode"}
      placement="bottom right"
      openDelay={300}
      closeOnClick={false}
    >
      <IconButton
        position="absolute"
        top={12}
        right={8}
        onPress={toggleColorMode}
        icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        accessibilityLabel="Color Mode Switch"
      />
    </Tooltip>
  );
}
