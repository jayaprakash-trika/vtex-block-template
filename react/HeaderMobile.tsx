import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";

interface HeaderMobileProps {
  menuLayout: MenuLayout[];
}

interface MenuLayout {
  mainMenuTitle: string;
  menuItems: MenuItems[];
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

const HeaderMobile: StorefrontFunctionComponent<HeaderMobileProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mainMenu, setMainMenu] = useState(-1);
  const [secondMenu, setSecondMenu] = useState(-1);
  const [selectFirstMenu, setSelectFirstMenu] = useState(false);
  const [selectSecondMenu, setSelectSecondMenu] = useState(false);

  return (
    <div>
      <div>
        <button onClick={() => setIsOpen(true)} className="br4">
          <IoMdMenu />
        </button>
      </div>
      {isOpen === true && (
        <div className="fixed top-0 left-0 w-100 h-screen bg-white">
          <span
            onClick={() => setIsOpen(false)}
            className="b flex flex-row-reverse mt2 mr2 pointer"
          >
            CLOSE
          </span>{" "}
          <div>
            <div className=" white mt3">
              {!selectFirstMenu &&
                !selectSecondMenu &&
                props.menuLayout?.map((menu, index) => {
                  return (
                    <div key={index}>
                      <div
                        className={`flex near-black justify-between items-center b bb hover-red pointer`}
                        onClick={() => {
                          if (menu.menuItems) {
                            setMainMenu(index);
                            setSelectFirstMenu(true);
                          }
                        }}
                      >
                        <a className="flex no-underline ">
                          <div className={`pa3  `}>{menu.mainMenuTitle}</div>
                        </a>
                       
                          <div>
                            <span className="mr2">
                              <FaGreaterThan />
                            </span>
                          </div>
                     
                      </div>
                    </div>
                  );
                })}
            </div>
            <div>
              <div className="b ml3">
                {selectFirstMenu &&
                  !selectSecondMenu &&
                  props.menuLayout?.map((menu, index) => {
                    return (
                      <div key={index}>
                        {mainMenu === index && (
                          <>
                            <div
                              className="flex mt2 pointer"
                              onClick={() => setSelectFirstMenu(false)}
                            >
                              <FaLessThan />
                              <span className="ml2">Go Back</span>
                            </div>
                            <div>
                              <div
                                className="red underline pointer"
                                onClick={() => setSelectFirstMenu(false)}
                              >
                                <h3 className="pointer">{menu.mainMenuTitle}</h3>
                              </div>
                            </div>
                            <div>
                              <a className=" no-underline pointer ">
                                {menu.menuItems?.map((subItem, index) => {
                                  return (
                                    <div
                                      className={`flex justify-between hover-red hover-underline ${
                                        index !== menu.menuItems?.length - 1
                                          ? "bb"
                                          : ""
                                      } items-center`}
                                    >
                                      <div
                                        className="pa3  "
                                        key={index}
                                        onClick={() => {
                                          if (subItem.subMenuItems) {
                                            setSecondMenu(index);
                                            setSelectSecondMenu(true);
                                            setSelectFirstMenu(true);
                                          }
                                        }}
                                      >
                                        {subItem.firstSubMenu}
                                      </div>
                                      <div>
                                        
                                          <div>
                                            <span className="mr2 mt4">
                                              <FaGreaterThan />
                                            </span>
                                          </div>
                                        
                                      </div>
                                    </div>
                                  );
                                })}
                              </a>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className=" ">
              {selectSecondMenu &&
                selectFirstMenu &&
                props.menuLayout?.map((menu, index) => {
                  return (
                    <div key={index}>
                      {mainMenu === index && (
                        <>
                          <div
                            className="flex pointer "
                            onClick={() => {
                              setSelectSecondMenu(false);
                            }}
                          >
                            <FaLessThan />
                            <span className="ml2 fw6">Go Back</span>
                          </div>
                          <div
                            className="red underline ml3 mb0"
                            onClick={() => {
                              setSelectFirstMenu(false);
                              setSelectSecondMenu(false);
                            }}
                          >
                            <h3 className="pointer">{menu.mainMenuTitle}</h3>
                          </div>
                          <div className="ml5">
                            {menu.menuItems?.map((subitem, index) => {
                              return (
                                <div>
                                  <div>
                                    {secondMenu === index && (
                                      <>
                                        <div
                                          className="red underline"
                                          onClick={() => {
                                            setSelectSecondMenu(false);
                                          }}
                                        >
                                          <h3 className="pointer">{subitem.firstSubMenu}</h3>
                                        </div>

                                        <div
                                          className="flex-column ml2 "
                                          key={index}
                                        >
                                          {subitem.subMenuItems?.map(
                                            (subitems) => {
                                              return (
                                                <div
                                                  className={`dark-black pa3  hover-red ${
													index !==   (subitem.subMenuItems ? subitem.subMenuItems.length - 1 : 0)
													  ? "bb"
													  : ""
												  } `}
                                                >
                                                  <a
                                                    href={subitems.href}
													className={`no-underline  b `} style={{color:"black"}}
                                                  >
                                                    {subitems.subMenuItemLabel}
                                                  </a>
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

HeaderMobile.schema = {
  title: "Mega Menu Mobile",
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
          menuItems: {
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

export default HeaderMobile;
