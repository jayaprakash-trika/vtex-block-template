import React, { useState } from "react";
import { FaGreaterThan } from "react-icons/fa6";

interface HeaderProps {
  menuLayout: MenuLayout[];
}

interface MenuLayout {
  mainMenuTitle: string;
  mainMenuItems: MenuItems[];
}

interface MenuItems {
  firstSubMenu: string;
  href: string;
  subMenuItems?: SubItems[]; 
}

interface SubItems {
  __editorItemTitle: string;
  subMenuItemLabel: string;
  href: string;
}

const HeaderDesktop: StorefrontFunctionComponent<HeaderProps> = (props) => {
  const [mainMenu, setMainMenu] = useState(-1);
  const [firstSubMenuIndex, setFirstSubMenuIndex] = useState(-1);

  return (
    <div onMouseLeave={() => setMainMenu(-1)} className="bg-red">
      <div className="flex white b ml8 mr8">
        {props.menuLayout?.map((menu, index) => {
          return (
            <a href="#" className={`no-underline white `} key={index}>
              <div
                className={` pa5 ml2 ${
                  mainMenu === index ? "bg-white red" : ""
                } `}
                onMouseEnter={() => setMainMenu(index)}
              >
                {menu.mainMenuTitle}
              </div>
            </a>
          );
        })}
	  </div>
      <div className="w-100 flex absolute bg-white">
        <div className="h-25 br w-20 b--black ml8 ">
          {props.menuLayout?.map((menu, index) => {
            return (
              <div key={index}>
                {mainMenu === index &&
                  menu.mainMenuItems?.map((item, itemIndex) => {
                    return (
                      <div
                        key={itemIndex}
                        className={" bb b--black pv4 pl3 mh3 "}
                      >
                        <div
                          key={itemIndex}
                          className={`flex justify-between mr2  ${
                            firstSubMenuIndex === itemIndex
                              ? "red"
                              : "near-black"
                          } `}
                          onMouseEnter={() => setFirstSubMenuIndex(itemIndex)}
                        >
                          <a href="#" className="no-underline  b">
                            <div
                              className={`near-black ${
                                firstSubMenuIndex === itemIndex
                                  ? "red"
                                  : "near-black"
                              } `}
                            >
                              {item.firstSubMenu}
                            </div>
                          </a>

                          
                            <span className="mr2">
                              <FaGreaterThan />
                            </span>
                          
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
        <div className="w-80 ">
          {props.menuLayout?.map((firstMenu, menuIndex) => {
            return (
              <div key={menuIndex}>
                {mainMenu === menuIndex &&
                  firstMenu.mainMenuItems?.map((item, menuIndex) => {
                    return (
                      <div key={menuIndex} className=" ml8">
                        {firstSubMenuIndex === menuIndex &&
                          item.subMenuItems?.map((subItem, subItemIndex) => {
                            return (
                              <div
                                className="fl w-100 w-third-ns pa2"
                                key={subItemIndex}
                              >
                                <a
                                  href={subItem.href}
                                  className="no-underline white b "
                                >
                                  <div className="near-black black hover-red mt3">
                                    {subItem.subMenuItemLabel}
                                  </div>
                                </a>
                              </div>
                            );
                          })}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

HeaderDesktop.schema = {
  title: "Mega Menu Desktop",
  type: "object",
  properties: {
    menuLayout: {
      title: "Enter The Main Menu",
      type: "array",
      items: {
        type: "object",
        properties: {
          __editorItemTitle: {
            title: "Menu Display Name",
            type: "string",
          },
          mainMenuTitle: {
            title: "Enter The Main Menu Title",
            type: "string",
          },
          mainMenuItems: {
            title: "Enter The Main Menu Items",
            type: "array",
            items: {
              type: "object",
              properties: {
                __editorItemTitle: {
                  title: "Menu Display Name",
                  type: "string",
                },
                firstSubMenu: {
                  title: "Enter the SubMenu Header",
                  type: "string",
                },
                href: {
                  title: "Label URL",
                  type: "string",
                  default: "#",
                },
                subMenuItems: {
                  title: "Enter The SubMenu Items",
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      __editorItemTitle: {
                        title: "Menu Display Name",
                        type: "string",
                      },
                      subMenuItemLabel: {
                        title: "SubMenuItem Label",
                        type: "string",
                      },
                      href: {
                        title: "Label URL",
                        type: "string",
                        default: "#",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default HeaderDesktop;
