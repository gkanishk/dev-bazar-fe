"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
function Navbar() {
    return (React.createElement("nav", { className: "flex items-center justify-between w-full px-12 py-4" },
        React.createElement("span", null, "Logo"),
        React.createElement("span", null,
            React.createElement("span", null, "home"),
            React.createElement("span", null, "Products")),
        React.createElement("div", { className: "w-5/12" },
            React.createElement(antd_1.Input, { placeholder: "Search Product", size: "middle" })),
        React.createElement("div", { className: "flex w-36 justify-evenly" },
            React.createElement(antd_1.Button, { shape: "circle", icon: React.createElement(icons_1.UserOutlined, null) }),
            React.createElement(antd_1.Button, { shape: "circle", icon: React.createElement(icons_1.ShoppingCartOutlined, null) }))));
}
exports["default"] = Navbar;
