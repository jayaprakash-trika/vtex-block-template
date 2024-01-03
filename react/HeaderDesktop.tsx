import React, { useState } from "react";
import { FaGreaterThan } from "react-icons/fa6";

interface HeaderProps {
	menuLayout: menuLayout[];
}
type menuLayout = {
	mainMenuHeader: string;
	menuItems: menuItems[];
};

type menuItems = {
	length: number;
	firstSubMenu: "string";
	href: "string";
	subItems: subItems[];
};

type subItems = {
	__editorItemTitle: string;
	label: "string";
	href: "string";
};
const HeaderDesktop: StorefrontFunctionComponent<HeaderProps> = (props) => {
	const [mainMenu, setMainMenu] = useState(-1);
	const [firstSubMenuIndex, setFirstSubMenuIndex] = useState(-1);
	return (
		<div onMouseLeave={() => setMainMenu(-1)} className="bg-red">
			<div className="flex white b  ">
				{props.menuLayout?.map((menu, index) => {
					return (
						<a href="#" className={`no-underline white bb`}>
							<div
								className={`ml4 pa3  ${
									mainMenu === index ? "bg-white red" : ""
								} `}
								onMouseEnter={() => setMainMenu(index)}
							>
								{menu.mainMenuHeader}
							</div>
						</a>
					);
				})}
			</div>
			<div className="w-100 flex absolute bg-white">
				<div className=" h-25 br w-20 b--black ">
					{props.menuLayout?.map((menu, index) => {
						return (
							<div key={index}>
								{mainMenu === index &&
									menu.menuItems?.map((item, itemIndex) => {
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
															className={` ${
																firstSubMenuIndex === itemIndex
																	? "red"
																	: "near-black"
															} `}
														>
															{item.firstSubMenu}
														</div>
													</a>

													{item.subItems && (
														<span className="mr2">
															<FaGreaterThan />
														</span>
													)}
												</div>
											</div>
										);
									})}
							</div>
						);
					})}
				</div>
				<div className="w-80 ">
					{props.menuLayout.map((firstMenu, menuIndex) => {
						return (
							<div key={menuIndex}>
								{mainMenu === menuIndex &&
									firstMenu.menuItems?.map((item, menuIndex) => {
										return (
											<div key={menuIndex} className=" ml8">
												{firstSubMenuIndex === menuIndex &&
													item.subItems?.map((subItem) => {
														return (
															<div className="fl w-100 w-third-ns pa2">
																<a
																	href={subItem.href}
																	className="no-underline white b "
																>
																	<div className="near-black black hover-red">
																		{" "}
																		{subItem.label}
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
	title: "editor.Header.title",
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
					mainMenuHeader: {
						title: "Enter The Main Menu Header",
						type: "string",
					},
					menuItems: {
						title: "Enter The first subMenu",

						type: "array",
						items: {
							type: "object",
							properties: {
								__editorItemTitle: {
									title: "Menu Display Name",
									type: "string",
								},
								firstSubMenu: {
									title: "Enter the fitst subMenu Header",
									type: "string",
								},
								href: {
									title: "label URL",
									type: "string",
									default: "#",
								},
								subItems: {
									title: "Enter The second subMenu",
									type: "array",

									items: {
										type: "object",
										properties: {
											__editorItemTitle: {
												title: "Menu Display Name",
												type: "string",
											},
											label: {
												title: "label name",
												type: "string",
											},
											href: {
												title: "label URL",
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
