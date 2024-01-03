import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { FaGreaterThan } from "react-icons/fa6";
import { FaLessThan } from "react-icons/fa6";

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
const HeaderMobile: StorefrontFunctionComponent<HeaderProps> = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const [mainMenu, setMainMenu] = useState(-1);
	const [secondMenu, setSecondMenu] = useState(-1);
	const [selectFirstMenu, setSelectFirstMenu] = useState(false);
	const [selectSecondMenu, setSelectSecondMenu] = useState(false);

	return (
		<div>
			<div>
				<button onClick={() => setIsOpen(true)}>
					<IoMdMenu />
				</button>
			</div>
			{isOpen === true && (
				<div className="fixed top-0 left-0 w-100 h-screen bg-white">
					<span
						onClick={() => setIsOpen(false)}
						className="b flex flex-row-reverse mt2 mr2 "
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
												className={`flex near-black justify-between items-center bb hover-red`}
												onClick={() => {
													if (menu.menuItems) {
														setMainMenu(index);
														setSelectFirstMenu(true);
													}
												}}
											>
												<a className="flex no-underline ">
													<div className={`pa3  `}>{menu.mainMenuHeader}</div>
												</a>
												{menu.menuItems && (
													<div>
														<span className="mr2">
															<FaGreaterThan />
														</span>
													</div>
												)}
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
															className="flex mt2"
															onClick={() => setSelectFirstMenu(false)}
														>
															<FaLessThan />
															<span className="ml2">back</span>
														</div>
														<div>
															<div
																className="red underline"
																onClick={() => setSelectFirstMenu(false)}
															>
																<h3>{menu.mainMenuHeader}</h3>
															</div>
														</div>
														<div>
															<a className=" no-underline ">
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
																					if (subItem.subItems) {
																						setSecondMenu(index);
																						setSelectSecondMenu(true);
																						setSelectFirstMenu(true);
																					}
																				}}
																			>
																				{subItem.firstSubMenu}
																			</div>
																			<div>
																				{subItem.subItems && (
																					<div>
																						<span className="mr2 mt4">
																							<FaGreaterThan />
																						</span>
																					</div>
																				)}
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
														className="flex "
														onClick={() => {
															setSelectSecondMenu(false);
														}}
													>
														<FaLessThan />
														<span className="ml2 b">back</span>
													</div>
													<div
														className="red underline ml3 mb0"
														onClick={() => {
															setSelectFirstMenu(false);
															setSelectSecondMenu(false);
														}}
													>
														<h3>{menu.mainMenuHeader}</h3>
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
																					<h3>{subitem.firstSubMenu}</h3>
																				</div>

																				<div
																					className="flex-column ml2 "
																					key={index}
																				>
																					{subitem.subItems?.map(
																						(subitems, index) => {
																							return (
																								<div
																									className={`dark-black${
																										index !==
																										subitem.subItems?.length - 1
																											? "bb"
																											: ""
																									} pa3  hover-red `}
																								>
																									<a
																										href={subitems.href}
																										className="no-underline dark-black"
																									>
																										{subitems.label}
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
	title: "editor.HeaderMobile.title",
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

export default HeaderMobile;
