import { Divider, Checkbox, Radio, Input} from "antd"
import { useEffect, useState } from "react"
import {filters} from "../../../assets/filters";
import { useProducts } from "../../../context/productContext";
const CheckboxGroup=Checkbox.Group;
export default function Filters() {
    const {filterProducts} = useProducts();
    const [sortBy,setSortBy]=useState("");
    const [brands,setBrands]=useState([]);
    const [idealFor,setIdealFor]=useState([]);
    const [sizes,setSizes]=useState([]);
    const [discounts,setDiscounts]=useState([]);
    const [inStock,setInStock]=useState(false);
    const [search,setSearch] = useState("");

    useEffect(()=>{
        filterProducts(sortBy,brands,idealFor,sizes,discounts,inStock,search);
    },[sortBy,brands,idealFor,sizes,discounts,inStock,search])
    

    const resetFilters=()=>{
        setSortBy("");
        setBrands([]);
        setIdealFor([]);
        setSizes([]);
        setDiscounts([]);
        setInStock(false);
    }
    return (
        <div className="p-2 px-4 m-2 border-2">
            <span className="flex flex-row justify-between mb-2 font-medium">
                <span>FILTERS</span>
                <small className="cursor-pointer" onClick={resetFilters}>Clear All</small>
            </span>
            <Divider className="m-0 mb-1"/>
            <Input.Search placeholder="Search Product" onChange={({target}) => setSearch(target.value)} />
            <div className="py-2 pb-4">
                <span className="font-medium">Sort By:</span>
                <Radio.Group className="flex flex-col" options={filters.sortByOption} onChange={(e)=>setSortBy(e.target.value)} value={sortBy} />
                <Checkbox className="mt-2" checked={inStock} onChange={(e)=>setInStock(e.target.checked)}>Include Out of Stock</Checkbox>
            </div>
            <Divider className="m-0 mb-1"/>
            <div className="py-2 pb-4">
                <span className="my-2 font-medium">Brand:</span>
                <CheckboxGroup className="flex flex-col" options={filters.brandFilterOption} value={brands} onChange={(list)=>setBrands(list)} />
            </div>
            <Divider className="m-0 mb-1"/>
            <div className="py-2 pb-4">
                <span className="my-2 font-medium">Ideal For:</span>
                <CheckboxGroup className="flex flex-col" options={filters.idealForOption} value={idealFor} onChange={(list)=>setIdealFor(list)} />
            </div>
            <Divider className="m-0 mb-1"/>
            <div className="py-2 pb-4">
                <span className="my-2 font-medium">Sizes:</span>
                <CheckboxGroup className="flex flex-col" options={filters.sizesOption} value={sizes} onChange={(list)=>setSizes(list)} />
            </div>
            <Divider className="m-0 mb-1"/>
            <div className="py-2 pb-4">
                <span className="my-2 font-medium">Discounts:</span>
                <CheckboxGroup className="flex flex-col" options={filters.discountOption} value={discounts} onChange={(list)=>setDiscounts(list)} />
            </div>
        </div>
    )
}