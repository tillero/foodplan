import { forwardRef, useState } from "react";
import { Group, Text, Autocomplete } from "@mantine/core";
import Image from "next/image";

const getProductInfo = async (ids) => {
  if (!ids || ids.length < 1) {
    console.log("invalidIDs", ids);
    return [];
  }
  try {
    const res = await fetch(
      `https://www.migros.ch/product-display/public/v2/product-cards?uids=${ids}&storeType=OFFLINE&region=gmaa`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    return data.map((item) => {
      const brand = item.product?.brand;
      const versioning = item.versioning;
      const line = item.brandLine;
      const quantity = item.product?.quantity;
      let label = item.name;
      let brandLabel;
      let detailLabel;
      let uid = item.product?.uid;
      if (brand && line) {
        brandLabel = brand + " " + line;
        label = brandLabel + "\n" + label;
      } else if (brand) {
        brandLabel = brand;
        label = brand + "\n" + label;
      } else if (line) {
        brandLabel = line;
        label = line + "\n" + label;
      }
      if (quantity && versioning) {
        detailLabel = versioning + ", " + quantity;
        label += " - " + detailLabel;
      } else if (versioning) {
        detailLabel = versioning;
        label += " - " + versioning;
      } else if (quantity) {
        detailLabel = quantity;
        label += " - " + quantity;
      }
      return {
        name: item.name,
        value: label + " " + quantity + " " + uid.toString(),
        uid: uid,
        brandLabel,
        versioning,
        detailLabel,
        label,
        quantity,
        image: item.product.images[0].url,
        group: "Produkte",
      };
    });
  } catch (err) {
    console.log(err);
  }
};

//change so that requests chache and that as soon as nothing comes back it stops
const getProducts = async (input) => {
  if (!input || input.length > 40) {
    console.log("invalidProducts", input);
    return [];
  }
  try {
    const res = await fetch(
      `https://www.migros.ch/onesearch-oc-autapi/public/v3/autocomplete/languages/DE/regions/gmaa/suggestions/${input}?algorithm=DEFAULT`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    const product_ids = data?.fullProducts;
    const ids = product_ids.map((product) => product.id).join();
    const products = await getProductInfo(ids);
    const productFilter = products.map((item) => item.name);
    const suggestionsCleaned = data?.suggestions.map((label) => {
      const test = label.replaceAll(/(<\/?strong>)/g, "");
      return {
        name: test,
        label,
        value: test,
        group: "Vorschläge",
      };
    });
    const suggestions = suggestionsCleaned.filter(
      (suggestion) => !productFilter.includes(suggestion.name)
    );
    return products.concat(suggestions);
  } catch (err) {
    console.log(err);
  }
};

const testSearchData = [
  {
    brandLabel: "Pepsi",
    group: "Produkte",
    image:
      "https://image.migros.ch/{stack}/e4289d82c868e44d64af55389dfa05a5bad34049/pepsi-max.jpg",
    label: "Pepsi\nPepsi Max",
    name: "Pepsi Max",
    uid: 100051284,
    value: "Pepsi\nPepsi Max 100051284",
    versioning: "Max",
    quantity: "1L",
  },
  {
    brandLabel: "Coca-Cola",
    group: "Produkte",
    image:
      "https://image.migros.ch/{stack}/8684beef0da9e4f4b98b521d5d32eccc250d06ac/coca-cola.jpg",
    label: "Coca-Cola\nCoca-Cola",
    name: "Coca-Cola",
    uid: 100051545,
    value: "Coca-Cola\nCoca-Cola 100051545",
    versioning: "zero",
    quantity: "500ml",
  },
  {
    group: "Vorschläge",
    label: "<strong>Coca-</strong>Cola<strong> Zero</strong>",
    name: "Coca-Cola Zero",
    value: "Coca-Cola Zero",
  },
];

const AutoCompleteItem = forwardRef(function myAutoCompleteItem(
  { name, label, image, brandLabel, detailLabel, group, ...others },
  ref
) {
  return (
    <div ref={ref} {...others}>
      {group === "Produkte" ? (
        <Group noWrap>
          {image && (
            <Image
              src={image.replace(/\{stack\}/, "mo-boxed/v-w-96-h-96")}
              alt={label}
              width={48}
              height={48}
            />
          )}
          <div>
            {brandLabel && <Text size="xs">{brandLabel}</Text>}
            <Text fw={500}>{name}</Text>
            {detailLabel && (
              <Text size="xs" color="dimmed">
                {detailLabel}
              </Text>
            )}
          </div>
        </Group>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: label }} />
      )}
    </div>
  );
});

export default function ProductSearch({ selectProduct }) {
  const [productSearch, setProductSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  const onProductSelected = (item) => {
    if (item.group === "Produkte") {
      //console.log("Added to ingredients", item);
      selectProduct(item);
      onSearchInput("");
      setSearchData([]);
    }
  };

  const inputNew = (input) => {
    if (!searchData || searchData.length < 1) {
      return true;
    }
    const search = searchData.map((item) => {
      return item.group === "Produkte" ? item.value : null;
    });
    return !search.includes(input);
  };

  const onSearchInput = (input) => {
    setProductSearch(input);
    if (input.split(" ").at(-1).length < 2) {
      return;
    } else if (
      input &&
      input.length > 2 &&
      inputNew(input) &&
      /[\p{Letter}\p{Mark}\s-]+/gu.test(input)
    ) {
      getProducts(input)
        .then((data) => {
          if (data) {
            setSearchData(data);
          }
        })
        .catch();
    } else {
      setSearchData([]);
    }
  };

  return (
    <Autocomplete
      label="Zutaten"
      limit={10}
      placeholder="Suchen"
      value={productSearch}
      onChange={onSearchInput}
      onItemSubmit={onProductSelected}
      itemComponent={AutoCompleteItem}
      data={searchData}
      nothingFound={productSearch > 2 ? "Keine Ergebnisse" : undefined}
      filter={(v, i) => true}
      dropdownPosition="bottom"
    />
  );
}
