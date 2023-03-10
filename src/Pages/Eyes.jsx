import { Box, Flex, GridItem, Grid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  Button,
} from "@chakra-ui/react";
import ProductBox from "../components/ProductBox/ProductBox";

function Eyes() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [order, setOrder] = useState("");
  const [prod, setProd] = useState("");
  async function getData(url) {
    try {
      //setLoading(true)
      var res = await fetch(url);
      var res2 = await res.json();
      setData(res2);
    } finally {
      setLoading(false);
    }
  }
  function changeUrlOrder(order) {
    setOrder(order);
  }
  function changeUrlType(prod) {
    setProd(prod);
  }
  useEffect(() => {
    let url = "https://gearbest-database.onrender.com/brushes";
    if (prod.length !== 0 && order.length !== 0)
      url = `https://gearbest-database.onrender.com/brushes?_sort=price&_order=${order}&q=${prod}`;
    else if (prod.length !== 0)
      url = `https://gearbest-database.onrender.com/brushes?q=${prod}`;
    else if (order.length !== 0)
      url = `https://gearbest-database.onrender.com/brushes?_sort=price&_order=${order}`;

    getData(url);
  }, [order, prod]);
  //getData();
  if (loading) {
  }

  return (
    <div>
      <Flex>
        <Box
          display="flex"
          flexDirection="column"
          w="25%"
          h="min-content"
          m="15px"
          gap="10px"
        >
          <Box>
            <Menu matchWidth="true">
              <MenuButton as={Button} bg="white" w="80%">
                <Flex>
                  <Flex justifyContent="flex-start" gap="10px">
                    <Text>Sort By:</Text>
                    <Text>Relevance</Text>
                  </Flex>
                  <Box m="auto" ml="35px">
                    <GoChevronDown />
                  </Box>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItemOption onClick={() => changeUrlOrder("")}>
                  Relevance
                </MenuItemOption>
                <MenuItemOption onClick={() => changeUrlOrder("asc")}>
                  Price:Low To High
                </MenuItemOption>
                <MenuItemOption onClick={() => changeUrlOrder("desc")}>
                  Price:Hight To Low
                </MenuItemOption>
              </MenuList>
            </Menu>
          </Box>
          <Box>
            <Menu matchWidth="true">
              <MenuButton as={Button} bg="white" w="80%">
                <Flex>
                  <Flex justifyContent="flex-start" gap="10px">
                    <Text>Filter By:</Text>
                    <Text>Product Type</Text>
                  </Flex>
                  <Box m="auto">
                    <GoChevronDown />
                  </Box>
                </Flex>
              </MenuButton>
              <MenuList>
              <MenuItemOption onClick={() => changeUrlType("eyes")}>
                    Eye Shadow Brushes
                  </MenuItemOption>
                  <MenuItemOption onClick={() => changeUrlType("blush")}>
                    Blush Brushes
                  </MenuItemOption>
                  <MenuItemOption onClick={() => changeUrlType(" face")}>
                    Face Brushes
                  </MenuItemOption>
                  <MenuItemOption onClick={() => changeUrlType("powder")}>
                    Powder Brushes
                  </MenuItemOption>
                  <MenuItemOption onClick={() => changeUrlType("")}>
                    Reset Filters
                  </MenuItemOption>
              </MenuList>
            </Menu>
          </Box>
        </Box>
        <Grid
          display="grid"
          templateColumns={{
            lg: "repeat(3,1fr)",
            md: "repeat(2,1fr)",
            sm: "repeat(1,1fr)",
          }}
          w="75%"
          m="10px"
        >
          {data.map(
            (elem) =>
              elem.price !== undefined && (
                <GridItem>
                  <ProductBox
                    rating={elem.rating}
                    catg={elem.catg}
                    id={elem.id}
                    url={elem.image}
                    description={elem.name}
                    price={elem.price}
                  />
                </GridItem>
              )
          )}
        </Grid>
      </Flex>
    </div>
  );
}

export default Eyes;
