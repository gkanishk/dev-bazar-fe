const sortByOption = [
    { label: "Low to High", value: "low" },
    { label: "High To Low", value: "high" },
    { label: "Relavance", value: "" }];
const brandFilterOption = ["Levis", "Roadster", "HRX", "Wills", "Only", "Nautica"];
const idealForOption = [{ label: "Men", value: "men" }, { label: "Women", value: "women" }];
const sizesOption = [{ label: "S", value: "s" }, { label: "M", value: "m" }, { label: "L", value: "l" }, { label: "XL", value: "xl" }];
const discountOption =
    [{ label: "10%", value: 10 },
    { label: "20%", value: 20 },
    { label: "30%", value: 30 },
    { label: "40%", value: 40 }
    ];

export const filters = {
    sortByOption,
    brandFilterOption,
    idealForOption,
    sizesOption,
    discountOption
}